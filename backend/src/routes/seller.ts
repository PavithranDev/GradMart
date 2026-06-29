import express from 'express';
import { prisma } from '../db.js';
import { getSession } from '@auth/express';
import { authConfig } from '../index.js';

const router = express.Router();

// Middleware to check if user is logged in
router.use(async (req, res, next) => {
  const session = await getSession(req, authConfig);
  if (!session?.user?.email) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const dbUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!dbUser || (dbUser.role !== 'ADMIN' && dbUser.role !== 'SELLER')) {
    return res.status(403).json({ error: 'Forbidden. Sellers only.' });
  }

  (req as any).user = dbUser;
  next();
});

// GET /api/seller/dashboard - Get seller stats
router.get('/dashboard', async (req, res) => {
  try {
    const user = (req as any).user;

    // Get all projects by this seller
    const projects = await prisma.project.findMany({
      where: { sellerId: user.id },
      include: {
        purchases: true
      }
    });

    const totalProjects = projects.length;
    let totalRevenue = 0;
    let totalDownloads = 0;
    let totalSales = 0;

    projects.forEach(project => {
      totalDownloads += project.downloads;
      totalSales += project.sales;
      project.purchases.forEach(purchase => {
        // Since Purchase doesn't store price at time of purchase currently, 
        // we'll calculate based on project's current price. In a real app, store purchase price.
        totalRevenue += project.price; 
      });
    });

    res.json({
      totalRevenue,
      totalDownloads,
      totalProjects,
      totalSales
    });
  } catch (error) {
    console.error('Error fetching seller dashboard:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// GET /api/seller/withdrawals - Get withdrawal history
router.get('/withdrawals', async (req, res) => {
  try {
    const user = (req as any).user;
    const withdrawals = await prisma.withdrawal.findMany({
      where: { sellerId: user.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(withdrawals);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch withdrawals' });
  }
});

// POST /api/seller/withdrawals - Request new withdrawal
router.post('/withdrawals', async (req, res) => {
  try {
    const user = (req as any).user;
    const { amount } = req.body;

    if (amount < 1000) {
      return res.status(400).json({ error: 'Minimum withdrawal amount is ₹1000' });
    }

    const withdrawal = await prisma.withdrawal.create({
      data: {
        amount: Number(amount),
        sellerId: user.id,
        status: "PENDING"
      }
    });

    res.json(withdrawal);
  } catch (error) {
    res.status(500).json({ error: 'Failed to request withdrawal' });
  }
});

export default router;
