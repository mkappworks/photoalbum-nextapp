"use client";

import { useSession } from "next-auth/react";

import { FAQ } from "@components/home/faq";
import { Features } from "@components/home/features";
import { Hero } from "@components/home/hero";
import { Pricing } from "@components/home/pricing";
import { Testimonials } from "@components/home/testimonials";
import { Footer } from "@components/layout/footer";
import { Navbar } from "@components/layout/navbar";

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
