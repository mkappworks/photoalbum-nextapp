import { Hero } from "./_components/Hero";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-white dark:border-b-slate-700 dark:bg-background">
      <Hero />
    </main>
  );
}
