"use client";

import { useSession } from "next-auth/react";
import { FAQ } from "../../_components/home/faq";
import { Features } from "../../_components/home/features";
import { Hero } from "../../_components/home/hero";
import { Pricing } from "../../_components/home/pricing";
import { Testimonials } from "../../_components/home/testimonials";
import { Footer } from "../../_components/layout/footer";
import { Navbar } from "../../_components/layout/navbar";

export const HomeContent = () => {
  const { data: session } = useSession();

  return (
    <>
      <Navbar />
      {session ? (
        <div></div>
      ) : (
        <>
          <main>
            <Hero />
            <Features />
            <Testimonials />
            <Pricing />
            <FAQ />
          </main>

          <Footer />
        </>
      )}
    </>
  );
};
