import express from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../auth-middleware.js';
const router = express.Router();
const prisma = new PrismaClient();
// GET /api/notifications - Get all notifications for the authenticated user
router.get('/', requireAuth, async (req, res) => {
    try {
        const notifications = await prisma.notification.findMany({
            where: { userId: req.user.id },
            orderBy: { createdAt: 'desc' },
            take: 50,
        });
        res.json(notifications);
    }
    catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});
// PUT /api/notifications/mark-read - Mark notifications as read
router.put('/mark-read', requireAuth, async (req, res) => {
    try {
        const { id } = req.body;
        if (id) {
            await prisma.notification.update({
                where: { id, userId: req.user.id },
                data: { isRead: true },
            });
        }
        else {
            await prisma.notification.updateMany({
                where: { userId: req.user.id, isRead: false },
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
