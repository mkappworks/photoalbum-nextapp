import "@/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { getServerAuthSession } from "@/server/auth";
import { Providers } from "@components/providers";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  return (
    <html lang="en">
      <body
        className={`${inter.className} flex min-h-screen flex-col bg-background text-primary`}
      >
        <TRPCReactProvider>
          <Providers session={session}>{children}</Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
