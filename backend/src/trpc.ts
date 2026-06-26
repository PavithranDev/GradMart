import { initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { getSession } from '@auth/express';
import { prisma } from './db';

// The context for each request
export const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  // Try to get Auth.js session from request
  // NOTE: Requires @auth/express middleware to be set up correctly
  const session = await getSession(req, {
    // We pass req to Auth.js, we also need to provide authConfig if using custom setup.
    // For basic usage, standard req might be enough depending on auth config.
  } as any);

  return {
    req,
    res,
    prisma,
    session,
  };
};

type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

// Protected procedure that throws if not authenticated
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new Error('UNAUTHORIZED');
  }
  return next({
    ctx: {
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});
