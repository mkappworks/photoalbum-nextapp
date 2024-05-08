import { Features } from "./_components/Features";
import { Hero } from "./_components/Hero";
import { Pricing } from "./_components/Pricing";
import { Testimonials } from "./_components/Testimonials";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white text-white dark:border-b-slate-700 dark:bg-background">
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
    </main>
  );
}
