import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { ExpressAuth, getSession } from '@auth/express';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from '@auth/express/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './db.js';
import { appRouter } from './routers/index.js';
import { createContext } from './trpc.js';

import projectsRouter from './routes/projects.js';
import adminRouter from './routes/admin.js';
import sellerRouter from './routes/seller.js';
import messagesRouter from './routes/messages.js';
import purchasesRouter from './routes/purchases.js';
import customProjectsRouter from './routes/custom-projects.js';
import notificationsRouter from './routes/notifications.js';
import userRouter from './routes/user.js';

const app = express();
app.set('trust proxy', 1);
process.env.AUTH_URL = 'https://grad-mart.duckdns.org/api/auth';
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

// Auth.js config
export const authConfig = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string
          }
        });

        if (!user || !user.password) {
          throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    jwt({ token, user }: any) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    session({ session, token }: any) {
      if (token && session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.AUTH_SECRET || 'secret123',
  trustHost: true,
  cookies: {
    sessionToken: {
      name: `authjs.session-token`,
      options: { httpOnly: true, sameSite: 'none', path: '/', secure: true },
    },
    callbackUrl: {
      name: `authjs.callback-url`,
      options: { sameSite: 'none', path: '/', secure: true },
    },
    csrfToken: {
      name: `authjs.csrf-token`,
      options: { httpOnly: true, sameSite: 'none', path: '/', secure: true },
    },
  },
};

// NextAuth route handler for Express
app.use('/api/auth', ExpressAuth(authConfig));

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
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Logout - clears cookie and redirects to frontend login
app.get('/api/logout', (req, res) => {
  // Clear all possible auth cookie variants
  res.clearCookie('authjs.session-token', { path: '/' });
  res.clearCookie('__Secure-authjs.session-token', { path: '/' });
  res.clearCookie('authjs.csrf-token', { path: '/' });
  res.clearCookie('authjs.callback-url', { path: '/' });
  const frontendUrl = process.env.FRONTEND_URL || 'https://grad-mart.vercel.app';
  res.redirect(`${frontendUrl}/login`);
});

// Get current user info (role, name, etc)
app.get('/api/user/me', async (req, res) => {
  try {
    const session = await getSession(req, authConfig);
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, email: true, name: true, role: true }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Dashboard stats endpoint
app.get('/api/user/dashboard', async (req, res) => {
  try {
    const session = await getSession(req, authConfig);
    if (!session?.user?.email) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
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

    const formattedPurchases = user.purchases.map((p: any) => ({
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
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Admin analytics stats endpoint
app.get('/api/admin/stats', async (req, res) => {
  try {
    const session = await getSession(req, authConfig);
    if (!session?.user?.email) return res.status(401).json({ error: 'Unauthorized' });
    const adminUser = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!adminUser || adminUser.role !== 'ADMIN') return res.status(403).json({ error: 'Forbidden' });

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
    const recentByDay: Record<string, number> = {};
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i);
      recentByDay[days[d.getDay()]] = 0;
    }
    allPurchases.forEach(p => {
      const d = new Date(p.purchasedAt);
      if (d >= sevenDaysAgo) {
        const dayName = days[d.getDay()];
        if (dayName in recentByDay) recentByDay[dayName] += p.project?.price || 0;
      }
    });
    const revenueByDay = Object.entries(recentByDay).map(([name, revenue]) => ({ name, revenue }));

    // Category sales
    const categorySales = categoryData.map(c => ({ name: c.category || 'Other', sales: c._count._all }));

    // Top projects by purchases
    const projectPurchaseCounts: Record<string, { title: string; category: string; revenue: number; count: number }> = {};
    allPurchases.forEach(p => {
      const pid = (p as any).projectId;
      if (!projectPurchaseCounts[pid]) {
        projectPurchaseCounts[pid] = { title: p.project?.title || '', category: (p.project as any)?.category || '', revenue: 0, count: 0 };
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
  } catch (error) {
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
app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
