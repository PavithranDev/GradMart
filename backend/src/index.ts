import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { ExpressAuth, getSession } from '@auth/express';
import { PrismaAdapter } from '@auth/prisma-adapter';
import CredentialsProvider from '@auth/express/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './db';
import { appRouter } from './routers';
import { createContext } from './trpc';

import projectsRouter from './routes/projects';
import adminRouter from './routes/admin';
import sellerRouter from './routes/seller';
import messagesRouter from './routes/messages';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: ['http://localhost:3000'], // Next.js frontend
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
        };
      }
    })
  ],
  session: { 
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.AUTH_SECRET || 'secret123',
  trustHost: true,
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
  res.redirect('http://localhost:3000/login');
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

    const formattedPurchases = user.purchases.map(p => ({
      id: p.id,
      title: p.project.title,
      category: p.project.category,
      date: p.purchasedAt.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      image: p.project.imageColor,
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

// Register Phase 3 APIs
app.use('/api/projects', projectsRouter);
app.use('/api/admin', adminRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/messages', messagesRouter);

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
