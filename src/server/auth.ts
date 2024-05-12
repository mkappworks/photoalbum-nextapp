import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "@/env";
import { db } from "@/server/db";
import { createTable } from "@/server/db/schema";
import bcrypt from "bcrypt";
import {
  CredentialsSchema,
  type CredentialsSchemaType,
} from "@/schema/credentials";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
  },
  adapter: DrizzleAdapter(db, createTable) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, _) {
        let validatedUser: CredentialsSchemaType;
        try {
          validatedUser = CredentialsSchema.parse(credentials);
        } catch (error) {
          throw new Error("Invalid email and password.");
        }
        const dbUser = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.email, validatedUser.email),
        });

        if (!dbUser) throw new Error("User not found.");

        if (dbUser.password === null) throw new Error("Invalid password.");

        const isValidPassword = await bcrypt.compare(
          validatedUser.password,
          dbUser.password,
        );

        if (!isValidPassword) throw new Error("Invalid password.");

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
