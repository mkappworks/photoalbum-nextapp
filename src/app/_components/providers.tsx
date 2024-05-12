"use client";

import { SessionProvider, type SessionProviderProps } from "next-auth/react";

import { ThemeProvider } from "@components/layout/theme-toggle/theme-provider";

export const Providers = ({
  session,
  children,
}: {
  session: SessionProviderProps["session"];
  children: React.ReactNode;
}) => {
  return (
    <>
      <SessionProvider session={session}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </SessionProvider>
    </>
  );
};
