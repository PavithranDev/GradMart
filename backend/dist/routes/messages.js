import express from 'express';
import { prisma } from '../db.js';
import { getSession } from '@auth/express';
import { authConfig } from '../index.js';
const router = express.Router();
router.use(async (req, res, next) => {
    const session = await getSession(req, authConfig);
    if (!session?.user?.email) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email },
    });
    if (!dbUser)
        return res.status(401).json({ error: 'Unauthorized' });
    req.user = dbUser;
    next();
});
// GET /api/messages - Fetch all conversations for logged in user
router.get('/', async (req, res) => {
    try {
        const user = req.user;
        const conversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    { sellerId: user.id },
                    { buyerId: user.id }
                ]
            },
            include: {
                seller: { select: { id: true, name: true, role: true } },
                buyer: { select: { id: true, name: true, role: true } },
                messages: {
                    orderBy: { createdAt: 'desc' },
                    take: 1
                }
            },
            orderBy: { updatedAt: 'desc' }
        });
        res.json(conversations);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch conversations' });
    }
});
// GET /api/messages/:id - Fetch messages for a specific conversation
router.get('/:id', async (req, res) => {
    try {
        const user = req.user;
        const { id } = req.params;
        const conversation = await prisma.conversation.findUnique({
            where: { id },
            include: {
                seller: { select: { id: true, name: true, role: true } },
                buyer: { select: { id: true, name: true, role: true } },
                messages: {
                    orderBy: { createdAt: 'asc' },
                    include: {
                        sender: { select: { id: true, name: true, role: true } }
                    }
                }
            }
        });
        if (!conversation)
            return res.status(404).json({ error: 'Conversation not found' });
        if (conversation.sellerId !== user.id && conversation.buyerId !== user.id) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        res.json(conversation);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch conversation' });
    }
});
// POST /api/messages/:conversationId - Send a new message in existing conversation
router.post('/:conversationId', async (req, res) => {
    try {
        const user = req.user;
        const { conversationId } = req.params;
        const { content } = req.body;
        const conversation = await prisma.conversation.findUnique({ where: { id: conversationId } });
        if (!conversation)
            return res.status(404).json({ error: 'Conversation not found' });
        if (conversation.sellerId !== user.id && conversation.buyerId !== user.id) {
            return res.status(403).json({ error: 'Forbidden' });
        }
        const message = await prisma.message.create({
            data: {
                content,
                senderId: user.id,
                conversationId,
            },
            include: {
                sender: { select: { id: true, name: true, role: true } }
            }
        });
        // Update conversation updatedAt
        await prisma.conversation.update({
            where: { id: conversationId },
            data: { updatedAt: new Date() }
        });
        res.json(message);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
});
// POST /api/messages - Start a new conversation
router.post('/', async (req, res) => {
    try {
        const user = req.user;
        const { subject, sellerId, content, projectId } = req.body;
        const conversation = await prisma.conversation.create({
            data: {
                subject,
                buyerId: user.id,
                sellerId,
                projectId: projectId || null,
                messages: {
                    create: {
                        senderId: user.id,
                        content
                    }
                }
            },
            include: {
                messages: true
            }
        });
        res.json(conversation);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create conversation' });
    }
});
export default router;
