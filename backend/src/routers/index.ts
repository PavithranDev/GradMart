import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc.js';
import bcrypt from 'bcryptjs';

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
  
  auth: router({
    register: publicProcedure
      .input(z.object({
        fullName: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        phone: z.string(),
        college: z.string(),
        department: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        const { fullName, email, password, phone, college, department } = input;
        
        // Check if user exists
        const existingUser = await ctx.prisma.user.findUnique({
          where: { email },
        });

        if (existingUser) {
          throw new Error('User already exists');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await ctx.prisma.user.create({
          data: {
            name: fullName,
            email,
            password: hashedPassword,
            phone,
            college,
            department,
          },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
