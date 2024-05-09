import { FAQ } from "./_components/home/faq";
import { Features } from "./_components/home/features";
import { Hero } from "./_components/home/hero";
import { Pricing } from "./_components/home/pricing";
import { Testimonials } from "./_components/home/testimonials";

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
