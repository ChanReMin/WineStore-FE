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

  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default as any;
          new LocomotiveScroll();

          setTimeout( () => {
            setIsLoading(false);
            document.body.style.cursor = 'default'
            window.scrollTo(0,0);
          }, 2000)
      }
    )()
  }, [])

  return (
    <main
      className={`${displaySerif.variable} relative flex min-h-screen flex-col overflow-hidden bg-[#120906] text-white`}
    >
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
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
