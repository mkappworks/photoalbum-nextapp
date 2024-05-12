import { authOptions } from "@/server/auth";
import NextAuth from "next-auth";

const handler: unknown = NextAuth(authOptions);
export { handler as GET, handler as POST };
