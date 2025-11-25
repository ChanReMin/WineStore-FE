"use client";

import { Playfair_Display } from "next/font/google";
import StoryHero from "@/components/our-story/StoryHero";
import Timeline from "@/components/our-story/Timeline";
import Philosophy from "@/components/our-story/Philosophy";
import Heritage from "@/components/our-story/Heritage";
import Values from "@/components/our-story/Values";
import Team from "@/components/our-story/Team";
import CallToAction from "@/components/our-story/CallToAction";
import ScrollToTopButton from "@/components/homepage/ScrollToTopButton";

const displaySerif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-serif",
});

export default function OurStoryPage() {
  return (
    <main
      className={`${displaySerif.variable} relative min-h-screen bg-[#fdfbf5]`}
    >
      <StoryHero />
      <Philosophy />
      <Timeline />
      <Heritage />
      <Values />
      <Team />
      <CallToAction />
      <ScrollToTopButton />
    </main>
  );
}

