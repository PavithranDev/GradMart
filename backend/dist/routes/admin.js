import express from 'express';
import { prisma } from '../db';
import { getSession } from '@auth/express';
import { authConfig } from '../index';
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
        return res.status(403).json({ error: 'Forbidden' });
    }
    // Attach user to req for later routes
    req.user = dbUser;
    next();
});
// GET /api/admin/projects - Get projects for the admin table
router.get('/projects', async (req, res) => {
    try {
        const user = req.user;
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
    }
    catch (error) {
        console.error('Error fetching admin projects:', error);
        res.status(500).json({ error: 'Failed to fetch admin projects' });
    }
});
// POST /api/admin/project - Create project
router.post('/project', async (req, res) => {
    try {
        const user = req.user;
        let { slug } = req.body;
        if (!slug)
            slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
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
    }
    catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Failed to create project' });
    }
});
// PUT /api/admin/project/:id - Update project
router.put('/project/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const user = req.user;
        const existing = await prisma.project.findUnique({ where: { id } });
        if (!existing)
            return res.status(404).json({ error: 'Project not found' });
        // Sellers can only edit their own projects
        if (user.role === 'SELLER' && existing.sellerId !== user.id) {
            return res.status(403).json({ error: 'Forbidden. You can only edit your own projects.' });
        }
        const project = await prisma.project.update({
            where: { id },
            data: updateData,
        });
        res.json(project);
    }
    catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Failed to update project' });
    }
});
// DELETE /api/admin/project/:id - Delete project
router.delete('/project/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = req.user;
        const existing = await prisma.project.findUnique({ where: { id } });
        if (!existing)
            return res.status(404).json({ error: 'Project not found' });
        // Sellers can only delete their own projects
        if (user.role === 'SELLER' && existing.sellerId !== user.id) {
            return res.status(403).json({ error: 'Forbidden. You can only delete your own projects.' });
        }
        await prisma.project.delete({
            where: { id },
        });
        res.json({ success: true });
    }
    catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Failed to delete project' });
    }
});
export default router;
