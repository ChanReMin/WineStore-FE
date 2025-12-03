"use client";

import Hero from "@/components/homepage/Hero";
import Preloader from "@/components/homepage/Preloader";
import Section from "@/components/homepage/Section";
import StorySection from "@/components/homepage/StorySection";
import WineStoriesSection from "@/components/homepage/WineStoriesSection";
import ValuePropositions from "@/components/homepage/ValuePropositions";
import FeaturedProducts from "@/components/homepage/FeaturedProducts";
import CTASection from "@/components/homepage/CTASection";
import Testimonials from "@/components/homepage/Testimonials";
import Newsletter from "@/components/homepage/Newsletter";
import AgeVerificationModal from "@/components/homepage/AgeVerificationModal";
import { AnimatePresence } from "framer-motion";
import { Playfair_Display } from "next/font/google";
import { useEffect, useState } from "react";
import ScrollToTopButton from "@/components/homepage/ScrollToTopButton";
import { toast } from "react-toastify";

const displaySerif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-serif",
});

export default function Home() {
  // Check if preloader should be shown (only on first load in session)
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("preloaderShown");
    }
    return true;
  });
  const [showAgeModal, setShowAgeModal] = useState(false);

  useEffect(() => {
    let scrollInstance: any;

    const init = async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      scrollInstance = new LocomotiveScroll();

      document.body.style.cursor = "default";

      const hasSeenPreloader = sessionStorage.getItem("preloaderShown");
      const hasVerifiedAge = localStorage.getItem("age");

      const showModals = (delay: number) => {
        setTimeout(() => {
          if (!hasVerifiedAge) {
            setShowAgeModal(true);
          }
        }, delay);
      };

      // Đã có preloader → vào thẳng trang
      if (hasSeenPreloader) {
        showModals(500);
        return;
      }

      // Lần đầu vào → chạy preloader
      setTimeout(() => {
        setIsLoading(false);
        sessionStorage.setItem("preloaderShown", "true");
        window.scrollTo(0, 0);
        document.body.style.cursor = "default";
        showModals(1500);
      }, 2000);
    };

    init();

    return () => {
      if (scrollInstance && scrollInstance.destroy) {
        scrollInstance.destroy();
      }
    };
  }, []);

  const handleAgeVerification = (isAdult: boolean) => {
    localStorage.setItem("age", isAdult.toString());
    setShowAgeModal(false);

    if (!isAdult) {
      toast.error("You must be at least 18 years old to enter this site.");
    }
  };

  return (
    <main
      className={`${displaySerif.variable} dark-section relative flex min-h-screen flex-col overflow-hidden bg-[#120906] text-white`}
    >
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>
      {/* Age Verification Modal */}
      <AgeVerificationModal
        isOpen={showAgeModal}
        onVerify={handleAgeVerification}
      />
      <Hero />
      <ValuePropositions />
      <StorySection />
      <FeaturedProducts />
      <Section />
      <WineStoriesSection />
      <CTASection />
      <Testimonials />
      <Newsletter />
      <ScrollToTopButton />
    </main>
  );
}
