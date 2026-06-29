import express from 'express';
import { prisma } from '../db.js';
const router = express.Router();
// GET /api/projects - Get all projects with optional filtering/search
router.get('/', async (req, res) => {
    try {
        const { q, category, pricing, tech, sort } = req.query;
        let whereClause = { sales: 0 };
        if (q && typeof q === 'string') {
            whereClause.OR = [
                { title: { contains: q, mode: 'insensitive' } },
                { category: { contains: q, mode: 'insensitive' } },
            ];
        }
        if (category && typeof category === 'string' && category !== 'All Items' && category !== 'All') {
            const categories = category.split(',');
            whereClause.category = { in: categories };
        }
        if (pricing && typeof pricing === 'string') {
            if (pricing === 'Free Projects') {
                whereClause.price = 0;
            }
            else if (pricing === 'Premium Projects') {
                whereClause.price = { gt: 0 };
            }
        }
        if (tech && typeof tech === 'string') {
            // Tech stack is stored as string array. Prisma has array-contains.
            // But let's keep it simple: filter on frontend or use hasSome if using Postgres
            // Assuming SQLite, array filters might be tricky, we'll fetch all and filter in memory if tech exists
            // But actually Prisma SQLite doesn't support array fields natively. Wait, schema.prisma uses Postgres? Let's check.
            // We will skip tech DB filter for now and do it in memory below if needed, or use Prisma `hasSome`.
        }
        let orderByClause = { createdAt: 'desc' };
        if (sort === 'Price: Low to High')
            orderByClause = { price: 'asc' };
        else if (sort === 'Price: High to Low')
            orderByClause = { price: 'desc' };
        else if (sort === 'Most Popular')
            orderByClause = { sales: 'desc' }; // wait, where sales=0... Most popular might be by rating
        else if (sort === 'Highest Rated')
            orderByClause = { rating: 'desc' };
        let projects = await prisma.project.findMany({
            where: whereClause,
            orderBy: orderByClause,
        });
        // In-memory filter for tech stack if provided, because Prisma SQLite/Postgres array filtering can be inconsistent across versions
        if (tech && typeof tech === 'string') {
            const techs = tech.split(',').map(t => t.toLowerCase().trim());
            projects = projects.filter(p => p.techStack.some(t => techs.includes(t.toLowerCase().trim())));
        }
        res.json(projects);
    }
    catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});
// GET /api/projects/:idOrSlug - Get specific project
router.get('/:idOrSlug', async (req, res) => {
    try {
        const { idOrSlug } = req.params;
        const project = await prisma.project.findFirst({
            where: {
                OR: [
                    { id: idOrSlug },
                    { slug: idOrSlug },
                ],
            },
        });
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json(project);
    }
    catch (error) {
        console.error('Error fetching project:', error);
        res.status(500).json({ error: 'Failed to fetch project' });
    }
});
// GET /api/categories - Get unique categories
router.get('/categories/all', async (req, res) => {
    try {
        const projects = await prisma.project.findMany({
            where: { sales: 0 },
            select: { category: true },
            distinct: ['category'],
        });
        const categories = projects.map(p => p.category).filter(Boolean);
        res.json(categories);
    }
    catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});
export default router;
