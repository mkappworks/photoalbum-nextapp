import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { Navbar } from "~/app/_components/layout/Navbar";
import { ThemeProvider } from "./_components/ThemeProvider";
import { settings } from "~/lib/settings";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Photo Album",
  description: "Photo Album is a simple photo album app",
  icons: [{ rel: "icon", url: "/logo.svg" }],
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-background text-primary`}
      >
        {" "}
        <TRPCReactProvider>
          {settings.themeToggleEnabled ? (
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Navbar />
              {children}
            </ThemeProvider>
          ) : (
            <ThemeProvider attribute="class" forcedTheme="light" enableSystem>
              <Navbar />
              {children}
            </ThemeProvider>
          )}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
