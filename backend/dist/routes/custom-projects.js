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
        return res.status(403).json({ error: 'Forbidden' });
    }
    req.user = dbUser;
    next();
});
// GET /api/custom-projects - Get all requests for the logged in user
router.get('/', async (req, res) => {
    try {
        const user = req.user;
        const projects = await prisma.customProjectRequest.findMany({
            where: { userId: user.id },
            orderBy: { createdAt: 'desc' }
        });
        res.json(projects);
    }
    catch (error) {
        console.error('Error fetching custom projects:', error);
        res.status(500).json({ error: 'Failed to fetch custom projects' });
    }
});
// POST /api/custom-projects - Create a new request
router.post('/', async (req, res) => {
    try {
        const user = req.user;
        const { title, description, budget, deadline } = req.body;
        if (!title || !description) {
            return res.status(400).json({ error: 'Title and description are required' });
        }
        const project = await prisma.customProjectRequest.create({
            data: {
                userId: user.id,
                title,
                description,
                budget: budget || null,
                deadline: deadline || null,
                status: "SUBMITTED"
            }
        });
        res.json(project);
    }
    catch (error) {
        console.error('Error creating custom project:', error);
        res.status(500).json({ error: 'Failed to create custom project' });
    }
});
// PUT /api/custom-projects/:id/accept-quote - User accepts quote
router.put('/:id/accept-quote', async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const project = await prisma.customProjectRequest.findUnique({
            where: { id }
        });
        if (!project || project.userId !== user.id) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        if (project.status !== 'QUOTED' || !project.quotedBudget) {
            return res.status(400).json({ error: 'Project is not in QUOTED state or lacks a quoted budget' });
        }
        const updatedProject = await prisma.customProjectRequest.update({
            where: { id },
            data: {
                budget: project.quotedBudget,
                status: 'ASSIGNED'
            }
        });
        res.json(updatedProject);
    }
    catch (error) {
        console.error('Error accepting quote:', error);
        res.status(500).json({ error: 'Failed to accept quote' });
    }
});
// PUT /api/custom-projects/:id/pay-online - Student completes online payment
// In a real app this would verify with Razorpay. For now marks as paid.
router.put('/:id/pay-online', async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const { type } = req.body; // 'advance' | 'final'
        const project = await prisma.customProjectRequest.findUnique({ where: { id } });
        if (!project || project.userId !== user.id) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        const data = {};
        if (type === 'advance' && project.advanceRequested && !project.advancePaid) {
            data.advancePaid = true;
            data.advancePaidAt = new Date();
        }
        else if (type === 'final' && project.finalRequested && !project.finalPaid) {
            data.finalPaid = true;
            data.finalPaidAt = new Date();
        }
        else {
            return res.status(400).json({ error: 'No pending payment of this type' });
        }
        const updated = await prisma.customProjectRequest.update({ where: { id }, data });
        res.json(updated);
    }
    catch (error) {
        console.error('Error processing online payment:', error);
        res.status(500).json({ error: 'Failed to process payment' });
    }
});
export default router;
