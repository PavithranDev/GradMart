import express from 'express';
import { prisma } from '../db.js';
import { requireAuth } from '../auth-middleware.js';

const router = express.Router();

// Middleware: must be ADMIN or SELLER
router.use(requireAuth, (req: any, res, next) => {
  if (req.user.role !== 'ADMIN' && req.user.role !== 'SELLER') {
    return res.status(403).json({ error: 'Forbidden' });
  }
  next();
});

// GET /api/admin/projects - Get projects for the admin table
router.get('/projects', async (req, res) => {
  try {
    const user = (req as any).user;
    
    // Admins see all, sellers see only their own
    const where = user.role === 'SELLER' ? { sellerId: user.id } : {};

    const projects = await prisma.project.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        seller: { select: { name: true, email: true } },
      }
    });

    res.json(projects);
  } catch (error) {
    console.error('Error fetching admin projects:', error);
    res.status(500).json({ error: 'Failed to fetch admin projects' });
  }
});

// POST /api/admin/project - Create project
router.post('/project', async (req, res) => {
  try {
    const user = (req as any).user;
    
    let { slug } = req.body;
    if (!slug) slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    let baseSlug = slug;
    let counter = 1;
    while (await prisma.project.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // Add sellerId automatically
    const data = { ...req.body, slug, sellerId: user.id };

    const project = await prisma.project.create({
      data,
    });

    res.json(project);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// PUT /api/admin/project/:id - Update project
router.put('/project/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const user = (req as any).user;

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Project not found' });

    // Sellers can only edit their own projects
    if (user.role === 'SELLER' && existing.sellerId !== user.id) {
      return res.status(403).json({ error: 'Forbidden. You can only edit your own projects.' });
    }

    const project = await prisma.project.update({
      where: { id },
      data: updateData,
    });

    res.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// DELETE /api/admin/project/:id - Delete project
router.delete('/project/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = (req as any).user;

    const existing = await prisma.project.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Project not found' });

    // Sellers can only delete their own projects
    if (user.role === 'SELLER' && existing.sellerId !== user.id) {
      return res.status(403).json({ error: 'Forbidden. You can only delete your own projects.' });
    }

    await prisma.project.delete({
      where: { id },
    });
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// GET /api/admin/custom-projects - Get all custom project requests
router.get('/custom-projects', async (req, res) => {
  try {
    const projects = await prisma.customProjectRequest.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { name: true, email: true, phone: true }
        }
      }
    });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching custom projects for admin:', error);
    res.status(500).json({ error: 'Failed to fetch custom projects' });
  }
});

// PUT /api/admin/custom-projects/:id/status - Update custom project status
router.put('/custom-projects/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const project = await prisma.customProjectRequest.update({
      where: { id },
      data: { status },
      include: {
        user: {
          select: { name: true, email: true, phone: true }
        }
      }
    });

    res.json(project);
  } catch (error) {
    console.error('Error updating custom project status:', error);
    res.status(500).json({ error: 'Failed to update custom project status' });
  }
});

// PUT /api/admin/custom-projects/:id/quote - Admin sends a budget quote
router.put('/custom-projects/:id/quote', async (req, res) => {
  try {
    const { id } = req.params;
    const { quotedBudget } = req.body;

    const project = await prisma.customProjectRequest.update({
      where: { id },
      data: { 
        quotedBudget,
        status: 'QUOTED'
      },
      include: {
        user: {
          select: { name: true, email: true, phone: true }
        }
      }
    });

    res.json(project);
  } catch (error) {
    console.error('Error updating custom project quote:', error);
    res.status(500).json({ error: 'Failed to update custom project quote' });
  }
});

// PUT /api/admin/custom-projects/:id/payment - Admin marks payment received
router.put('/custom-projects/:id/payment', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, amount, note } = req.body;
    // type: 'advance' | 'final'

    let data: any = { paymentNote: note };

    if (type === 'advance') {
      data.advanceAmount = Number(amount);
      data.advancePaid = true;
      data.advancePaidAt = new Date();
    } else if (type === 'final') {
      data.finalAmount = Number(amount);
      data.finalPaid = true;
      data.finalPaidAt = new Date();
    }

    const project = await prisma.customProjectRequest.update({
      where: { id },
      data,
      include: { user: { select: { name: true, email: true, phone: true } } }
    });

    res.json(project);
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).json({ error: 'Failed to update payment' });
  }
});

// PUT /api/admin/custom-projects/:id/request-payment - Admin requests online payment from student
router.put('/custom-projects/:id/request-payment', async (req, res) => {
  try {
    const { id } = req.params;
    const { type, amount } = req.body;
    // type: 'advance' | 'final'

    const data: any = {};
    if (type === 'advance') {
      data.advanceAmount = Number(amount);
      data.advanceRequested = true;
      data.advancePaid = false;
    } else if (type === 'final') {
      data.finalAmount = Number(amount);
      data.finalRequested = true;
      data.finalPaid = false;
    }

    const project = await prisma.customProjectRequest.update({
      where: { id },
      data,
      include: { user: { select: { name: true, email: true, phone: true } } }
    });

    res.json(project);
  } catch (error) {
    console.error('Error requesting payment:', error);
    res.status(500).json({ error: 'Failed to request payment' });
  }
});


router.put('/custom-projects/:id/payment-amounts', async (req, res) => {
  try {
    const { id } = req.params;
    const { advanceAmount, finalAmount } = req.body;

    const project = await prisma.customProjectRequest.update({
      where: { id },
      data: {
        ...(advanceAmount !== undefined && { advanceAmount: Number(advanceAmount) }),
        ...(finalAmount !== undefined && { finalAmount: Number(finalAmount) }),
      },
      include: { user: { select: { name: true, email: true, phone: true } } }
    });

    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update payment amounts' });
  }
});

export default router;
