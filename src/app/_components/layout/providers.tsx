"use client";

import { SessionProvider, type SessionProviderProps } from "next-auth/react";
import { ThemeProvider } from "./theme-toggle/theme-provider";

export const Providers = ({
  session,
  children,
}: {
  session: SessionProviderProps["session"];
  children: React.ReactNode;
}) => {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider session={session}>{children}</SessionProvider>
      </ThemeProvider>
    </>
  );
};
