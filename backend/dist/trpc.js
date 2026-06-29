import { initTRPC } from '@trpc/server';
import jwt from 'jsonwebtoken';
import { prisma } from './db.js';
const JWT_SECRET = process.env.AUTH_SECRET || 'secret123';
// The context for each request
export const createContext = async ({ req, res, }) => {
    // Try to get user from JWT Bearer token
    let user = null;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        try {
            const token = authHeader.split(' ')[1];
            user = jwt.verify(token, JWT_SECRET);
        }
        catch {
            user = null;
        }
    }
    return {
        req,
        res,
        prisma,
        user,
    };
};
const t = initTRPC.context().create();
export const router = t.router;
export const publicProcedure = t.procedure;
// Protected procedure that throws if not authenticated
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
    if (!ctx.user) {
        throw new Error('UNAUTHORIZED');
    }
    return next({
        ctx: {
            user: ctx.user,
        },
    });
});
