import express from 'express';
import { PrismaClient } from '@prisma/client';
import { getSession } from '@auth/express';
import { authConfig } from '../index.js';
import bcrypt from 'bcryptjs';
const router = express.Router();
const prisma = new PrismaClient();
// GET /api/user/profile - Get full user profile
router.get('/profile', async (req, res) => {
    try {
        const session = await getSession(req, authConfig);
        if (!session || !session.user || !session.user.id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                college: true,
                department: true,
                image: true,
            }
        });
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        res.json(user);
    }
    catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});
// PUT /api/user/profile - Update user profile
router.put('/profile', async (req, res) => {
    try {
        const session = await getSession(req, authConfig);
        if (!session || !session.user || !session.user.id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const { name, phone, college, department } = req.body;
        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                name,
                phone,
                college,
                department,
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                college: true,
                department: true,
            }
        });
        res.json(updatedUser);
    }
    catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
});
// PUT /api/user/password - Update user password
router.put('/password', async (req, res) => {
    try {
        const session = await getSession(req, authConfig);
        if (!session || !session.user || !session.user.id) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Missing password fields' });
        }
        const user = await prisma.user.findUnique({
            where: { id: session.user.id }
        });
        if (!user || !user.password) {
            return res.status(400).json({ error: 'Cannot update password for this account' });
        }
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Incorrect current password' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: session.user.id },
            data: { password: hashedPassword }
        });
        res.json({ success: true });
    }
    catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Failed to update password' });
    }
});
export default router;
