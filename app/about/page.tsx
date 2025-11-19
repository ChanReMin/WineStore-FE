"use client";

import { Playfair_Display } from "next/font/google";
import AboutHero from "@/components/about/AboutHero";
import Mission from "@/components/about/Mission";
import Difference from "@/components/about/Difference";
import WineJourney from "@/components/about/WineJourney";
import Certifications from "@/components/about/Certifications";
import Process from "@/components/about/Process";
import Community from "@/components/about/Community";
import FAQ from "@/components/about/FAQ";
import ContactCTA from "@/components/about/ContactCTA";

const displaySerif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-serif",
});

export default function AboutPage() {
  return (
    <main className={`${displaySerif.variable} relative min-h-screen bg-white`}>
      <AboutHero />
      <Mission />
      <WineJourney />
      <Difference />
      <Certifications />
      <Community />
      <FAQ />
      <ContactCTA />
    </main>
  );
}
