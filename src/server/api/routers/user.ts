import { MagicLinkSchema } from "@/schema/magic-link";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { users } from "@/server/db/schema";
import { v4 as uuidv4 } from "uuid";

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(MagicLinkSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(users).values({
        id: uuidv4(),
        email: input.email,
      });
    }),
  createMagicLinkUser: publicProcedure
    .input(MagicLinkSchema)
    .mutation(async ({ ctx, input }) => {
      const existingUser = await ctx.db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, input.email),
      });

      let updatedUser;

      if (!existingUser) {
        updatedUser = await ctx.db.insert(users).values({
          id: uuidv4(),
          email: input.email,
        });
      } else {
      }

      return updatedUser;
    }),
});
