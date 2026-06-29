import express from 'express';
import { PrismaClient } from '@prisma/client';
import { getSession } from '@auth/express';
import { authConfig } from '../index.js';
const router = express.Router();
const prisma = new PrismaClient();
// GET /api/notifications - Get all notifications for the authenticated user
router.get('/', async (req, res) => {
    try {
        const session = await getSession(req, authConfig);
        if (!session || !session.user || !session.user.id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const notifications = await prisma.notification.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: 'desc' },
            take: 50, // Limit to recent 50
        });
        res.json(notifications);
    }
    catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});
// PUT /api/notifications/mark-read - Mark notifications as read
router.put('/mark-read', async (req, res) => {
    try {
        const session = await getSession(req, authConfig);
        if (!session || !session.user || !session.user.id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const { id } = req.body; // if id is provided, mark specific; else all
        if (id) {
            await prisma.notification.update({
                where: { id, userId: session.user.id },
                data: { isRead: true },
            });
        }
        else {
            await prisma.notification.updateMany({
                where: { userId: session.user.id, isRead: false },
                data: { isRead: true },
            });
        }
        res.json({ success: true });
    }
    catch (error) {
        console.error('Error marking notifications read:', error);
        res.status(500).json({ error: 'Failed to mark notifications read' });
    }
});
export default router;
