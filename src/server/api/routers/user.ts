import { CredentialsSchema } from "@/schema/credentials";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { users } from "@/server/db/schema";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export const userRouter = createTRPCRouter({
  register: publicProcedure
    .input(CredentialsSchema)
    .mutation(async ({ ctx, input }) => {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(input.password, salt);

      await ctx.db.insert(users).values({
        id: uuidv4(),
        email: input.email,
        password: hash,
      });
    }),
});
