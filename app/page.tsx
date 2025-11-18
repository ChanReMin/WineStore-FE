'use client';

import Hero from '@/components/homepage/Hero';
import Preloader from '@/components/homepage/Preloader';
import Section from '@/components/homepage/Section';
import StorySection from '@/components/homepage/StorySection';
import WineStoriesSection from '@/components/homepage/WineStoriesSection';
import ValuePropositions from '@/components/homepage/ValuePropositions';
import FeaturedProducts from '@/components/homepage/FeaturedProducts';
import CTASection from '@/components/homepage/CTASection';
import Testimonials from '@/components/homepage/Testimonials';
import Newsletter from '@/components/homepage/Newsletter';
import AgeVerificationModal from '@/components/homepage/AgeVerificationModal';
import LocationModal from '@/components/homepage/LocationModal';
import { AnimatePresence } from 'framer-motion';
import { Playfair_Display } from 'next/font/google';
import { useEffect, useState } from 'react';
import ScrollToTopButton from '@/components/homepage/ScrollToTopButton';

const displaySerif = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display-serif',
});

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);


  useEffect(() => {
  (async () => {
    const LocomotiveScroll = (await import("locomotive-scroll")).default as any;
    new LocomotiveScroll();

    setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = "default";
      window.scrollTo(0, 0);

      // Check localStorage for existing data
      const hasVerifiedAge = localStorage.getItem("age");
      const storedLocation = localStorage.getItem("location");
      const showModalDelay = 1500;

      // Only show age modal if user hasn't verified age yet
      if (!hasVerifiedAge) {
        setTimeout(() => setShowAgeModal(true), showModalDelay);
      } 
      // Only show location modal if age is verified AND is adult AND no location saved
      else if (hasVerifiedAge === 'true' && !storedLocation) {
        setTimeout(() => setShowLocationModal(true), showModalDelay);
      }
    }, 2000);
  })();
}, []);


  const handleAgeVerification = (isAdult: boolean) => {
    localStorage.setItem('age', isAdult.toString());
    setShowAgeModal(false);

    if (isAdult) {
      // Check if location already exists
      const storedLocation = localStorage.getItem("location");
      
      // Only show location modal if no location saved
      if (!storedLocation) {
        setTimeout(() => {
          setShowLocationModal(true);
        }, 600);
      }
    } else {
      // Show message for underage users
      alert('Bạn phải đủ 18 tuổi để truy cập website này.');
    }
  };

  const handleLocationComplete = (data: { city: string; district: string; store: string }) => {
    localStorage.setItem('location', JSON.stringify(data));
    setShowLocationModal(false);

    // Dispatch custom event to notify header about location update
    window.dispatchEvent(new CustomEvent('locationUpdated', { detail: data }));
  };

  return (
    <main
      className={`${displaySerif.variable} relative flex min-h-screen flex-col overflow-hidden bg-[#120906] text-white`}
    >
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>

      {/* Age Verification Modal */}
      <AgeVerificationModal
        isOpen={showAgeModal}
        onVerify={handleAgeVerification}
      />

      {/* Location Modal */}
      <LocationModal
        isOpen={showLocationModal}
        onComplete={handleLocationComplete}
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
