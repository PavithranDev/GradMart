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

  if (!dbUser) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  (req as any).user = dbUser;
  next();
});

// POST /api/purchases
// Create a new purchase
router.post('/', async (req, res) => {
  try {
    const { projectId } = req.body;
    
    // Auth middleware ensures req.user exists
    const userId = (req as any).user.id;

    if (!projectId) {
      return res.status(400).json({ error: 'Project ID is required' });
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    if (project.sales > 0) {
      return res.status(400).json({ error: 'This project is already sold out!' });
    }

    // Check if user already purchased this project
    const existingPurchase = await prisma.purchase.findFirst({
      where: {
        userId,
        projectId,
      },
    });

    if (existingPurchase) {
      return res.status(400).json({ error: 'You have already purchased this project' });
    }

    // Create the purchase record
    const purchase = await prisma.purchase.create({
      data: {
        userId,
        projectId,
      },
      include: {
        project: true,
      }
    });

    // Increment project sales
    await prisma.project.update({
      where: { id: projectId },
      data: { sales: { increment: 1 } },
    });

    res.json(purchase);
  } catch (error) {
    console.error('Error creating purchase:', error);
    res.status(500).json({ error: 'Failed to process purchase' });
  }
});

// GET /api/purchases/check/:projectId
// Check if logged-in user has purchased a specific project
router.get('/check/:projectId', async (req, res) => {
  try {
    const { projectId } = req.params;
    let hasPurchased = false;

    const session = await getSession(req, authConfig);
    if (session?.user?.email) {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        select: { id: true }
      });

      if (user) {
        const purchase = await prisma.purchase.findFirst({
          where: {
            userId: user.id,
            projectId,
          }
        });
        if (purchase) {
          hasPurchased = true;
        }
      }
    }
    
    res.json({ hasPurchased });
  } catch (error) {
    console.error('Error checking purchase:', error);
    res.status(500).json({ error: 'Failed to check purchase' });
  }
});

// GET /api/purchases/me
// Get all purchases for the logged-in user
router.get('/me', async (req, res) => {
  try {
    const userId = (req as any).user!.id;

    const purchases = await prisma.purchase.findMany({
      where: { userId },
      include: {
        project: true,
      },
      orderBy: {
        purchasedAt: 'desc',
      },
    });

    res.json(purchases);
  } catch (error) {
    console.error('Error fetching purchases:', error);
    res.status(500).json({ error: 'Failed to fetch purchases' });
  }
});

export default router;
