import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import bcrypt from 'bcryptjs';
import { prisma } from './db.js';
import { appRouter } from './routers/index.js';
import { createContext } from './trpc.js';
import { requireAuth, requireAdmin, signToken } from './auth-middleware.js';
import projectsRouter from './routes/projects.js';
import adminRouter from './routes/admin.js';
import sellerRouter from './routes/seller.js';
import messagesRouter from './routes/messages.js';
import purchasesRouter from './routes/purchases.js';
import customProjectsRouter from './routes/custom-projects.js';
import notificationsRouter from './routes/notifications.js';
import userRouter from './routes/user.js';
const app = express();
const port = process.env.PORT || 4000;
app.use(cors({
    origin: [
        'http://localhost:3000', // Next.js frontend
        'https://grad-mart.vercel.app',
        ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : [])
    ],
    credentials: true,
}));
app.use(express.json());
// ── JWT Login endpoint ──────────────────────────────────────────
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ error: 'Email and password required' });
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password)
            return res.status(401).json({ error: 'Invalid email or password' });
        const valid = await bcrypt.compare(password, user.password);
        if (!valid)
            return res.status(401).json({ error: 'Invalid email or password' });
        const token = signToken({ id: user.id, email: user.email, name: user.name || '', role: user.role });
        res.json({ token, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});
// ── Session check endpoint (for AuthContext) ─────────────────────
app.get('/api/auth/session', requireAuth, (req, res) => {
    res.json({ user: req.user });
});
// Registration endpoint (Alternative to tRPC for simple fetch)
app.post('/api/register', async (req, res) => {
    try {
        const { fullName, email, password, phone, college, department } = req.body;
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name: fullName,
                email,
                password: hashedPassword,
                phone,
                college,
                department,
            },
        });
        res.json({ id: user.id, email: user.email, name: user.name });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed' });
    }
});
// Logout (client-side: just delete the token from localStorage)
app.post('/api/logout', (req, res) => {
    res.json({ success: true });
});
// Get current user info (role, name, etc)
app.get('/api/user/me', requireAuth, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: { id: true, email: true, name: true, role: true }
        });
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        res.json(user);
    }
    catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});
// Dashboard stats endpoint
app.get('/api/user/dashboard', requireAuth, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            include: {
                purchases: {
                    include: {
                        project: true,
                    },
                    orderBy: { purchasedAt: 'desc' },
                },
            },
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const projectsBought = user.purchases.length;
        const totalDownloads = user.purchases.reduce((acc, curr) => acc + curr.downloadCount, 0);
        const formattedPurchases = user.purchases.map((p) => ({
            id: p.id,
            title: p.project.title,
            category: p.project.category,
            date: p.purchasedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            image: p.project.thumbnail || p.project.imageColor,
            driveUrl: p.project.driveUrl,
            project: p.project
        }));
        res.json({
            stats: {
                projectsBought,
                totalDownloads,
            },
            purchases: formattedPurchases,
        });
    }
    catch (error) {
        console.error('Dashboard error:', error);
        res.status(500).json({ error: 'Failed to fetch dashboard data' });
    }
});
// Admin analytics stats endpoint
app.get('/api/admin/stats', requireAdmin, async (req, res) => {
    try {
        const [totalUsers, totalProjects, allPurchases, recentPurchases, categoryData] = await Promise.all([
            prisma.user.count(),
            prisma.project.count(),
            prisma.purchase.findMany({ include: { project: { select: { price: true, category: true, title: true } }, user: { select: { name: true } } }, orderBy: { purchasedAt: 'desc' } }),
            prisma.purchase.findMany({ include: { project: { select: { price: true, title: true } }, user: { select: { name: true } } }, orderBy: { purchasedAt: 'desc' }, take: 10 }),
            prisma.project.groupBy({ by: ['category'], _count: { _all: true }, _sum: { sales: true } }),
        ]);
        const totalRevenue = allPurchases.reduce((sum, p) => sum + (p.project?.price || 0), 0);
        const totalOrders = allPurchases.length;
        // Revenue by day of week (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentByDay = {};
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            recentByDay[days[d.getDay()]] = 0;
        }
        allPurchases.forEach(p => {
            const d = new Date(p.purchasedAt);
            if (d >= sevenDaysAgo) {
                const dayName = days[d.getDay()];
                if (dayName in recentByDay)
                    recentByDay[dayName] += p.project?.price || 0;
            }
        });
        const revenueByDay = Object.entries(recentByDay).map(([name, revenue]) => ({ name, revenue }));
        // Category sales
        const categorySales = categoryData.map(c => ({ name: c.category || 'Other', sales: c._count._all }));
        // Top projects by purchases
        const projectPurchaseCounts = {};
        allPurchases.forEach(p => {
            const pid = p.projectId;
            if (!projectPurchaseCounts[pid]) {
                projectPurchaseCounts[pid] = { title: p.project?.title || '', category: p.project?.category || '', revenue: 0, count: 0 };
            }
            projectPurchaseCounts[pid].revenue += p.project?.price || 0;
            projectPurchaseCounts[pid].count++;
        });
        const topProjects = Object.values(projectPurchaseCounts).sort((a, b) => b.revenue - a.revenue).slice(0, 5);
        // Recent activity from purchases
        const activity = recentPurchases.map(p => ({
            time: new Date(p.purchasedAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            event: `${p.user?.name || 'Someone'} purchased '${p.project?.title || 'a project'}'`,
            type: 'purchase'
        }));
        res.json({ totalRevenue, totalOrders, totalUsers, totalProjects, revenueByDay, categorySales, topProjects, activity });
    }
    catch (error) {
        console.error('Admin stats error:', error);
        res.status(500).json({ error: 'Failed to fetch admin stats' });
    }
});
// Register Phase 3 APIs
app.use('/api/projects', projectsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/purchases', purchasesRouter);
app.use('/api/custom-projects', customProjectsRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/user', userRouter);
// tRPC route handler
app.use('/trpc', trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
}));
app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
