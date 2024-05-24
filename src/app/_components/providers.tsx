"use client";

import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "@components/layout/theme-toggle/theme-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </SessionProvider>
    </>
  );
};
