import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { ExpressAuth } from '@auth/express';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './db';
import { appRouter } from './routers';
import { createContext } from './trpc';
const app = express();
const port = process.env.PORT || 4000;
app.use(cors({
    origin: ['http://localhost:3000'], // Next.js frontend
    credentials: true,
}));
app.use(express.json());
// Auth.js config
const authConfig = {
    adapter: PrismaAdapter(prisma),
    providers: [
    // Add your providers here, e.g., Credentials, Google, etc.
    ],
    session: { strategy: 'jwt' },
    secret: process.env.AUTH_SECRET || 'secret123',
    trustHost: true,
};
// NextAuth route handler for Express
app.use('/api/auth/*', ExpressAuth(authConfig));
// tRPC route handler
app.use('/trpc', trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
}));
app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
