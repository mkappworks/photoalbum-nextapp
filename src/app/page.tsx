import { FAQ } from "./_components/FAQ";
import { Features } from "./_components/Features";
import { Hero } from "./_components/Hero";
import { Pricing } from "./_components/Pricing";
import { Testimonials } from "./_components/Testimonials";

export default async function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
    </main>
  );
}
