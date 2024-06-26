import { FAQ } from "@components/home/faq";
import { Features } from "@components/home/features";
import { Hero } from "@components/home/hero";
import { Pricing } from "@components/home/pricing";
import { Testimonials } from "@components/home/testimonials";
import { Footer } from "@components/layout/footer";
import { Navbar } from "@components/layout/navbar";

export default async function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
