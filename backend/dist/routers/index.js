import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';
export const appRouter = router({
    hello: publicProcedure
        .input(z.object({ text: z.string() }))
        .query(({ input }) => {
        return {
            greeting: `Hello ${input.text}`,
        };
    }),
    getSecretMessage: protectedProcedure.query(() => {
        return "You can now see this secret message!";
    }),
});
