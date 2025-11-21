"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, ArrowLeft, Share2, Tag } from "lucide-react";
import { Playfair_Display } from "next/font/google";
import type { BlogPost } from "@/lib/blogData";
import { blogPosts } from "@/lib/blogData";
import BlogCard from "./BlogCard";
import { useRef } from "react";

const displaySerif = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-serif",
});

interface BlogDetailClientProps {
  post: BlogPost;
}

export default function BlogDetailClient({ post }: BlogDetailClientProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Get related posts
  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <main className={`${displaySerif.variable} min-h-screen bg-white`}>
      {/* Hero Section with Parallax */}
      <div ref={containerRef} className="relative h-screen overflow-hidden">
        <motion.div style={{ y: imageY }} className="absolute inset-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-20"
        >
          {/* Back button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-white/90 hover:text-white text-[11px] tracking-[0.25em] uppercase transition-colors duration-300"
            >
              <ArrowLeft
                className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300"
                strokeWidth={1.5}
              />
              BACK TO THE BLOG
            </Link>
          </motion.div>

          {/* Category badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <span className="inline-block bg-white/90 backdrop-blur-sm px-6 py-2 text-[10px] tracking-[0.25em] uppercase text-[#3b4417] font-semibold">
              {post.categoryLabel}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[32px] md:text-[48px] lg:text-[56px] leading-tight tracking-widest uppercase text-white font-semibold max-w-4xl mb-8"
          >
            {post.title}
          </motion.h1>

          {/* Meta info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap items-center gap-6 text-white/90 text-[11px] tracking-[0.2em] uppercase"
          >
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" strokeWidth={1.5} />
              {post.author}
            </span>
            <span className="h-px w-4 bg-white/40" />
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" strokeWidth={1.5} />
              {post.date}
            </span>
            <span className="h-px w-4 bg-white/40" />
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" strokeWidth={1.5} />
              {post.readTime}
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          {/* Share button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 flex justify-end"
          >
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group inline-flex items-center gap-2 border border-[#c8c8a3] px-6 py-3 text-[10px] tracking-[0.25em] uppercase text-[#3b4417] hover:border-[#3b4417] transition-all duration-300"
            >
              <Share2 className="w-4 h-4" strokeWidth={1.5} />
              CHIA SẺ
            </motion.button>
          </motion.div>

          {/* Article content */}
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-[18px] md:text-[20px] leading-relaxed text-neutral-700 tracking-wide mb-12 font-medium">
              {post.excerpt}
            </p>

            <div className="space-y-6 text-[#5d4e37] leading-relaxed text-lg">
              <p>
                Wine is more than just a drink – it is the crystallization of
                history, climate, soil and human hands. Every bottle of wine
                is a story written in time, a moment of intersection
                intersection between art and science. When understanding wine more deeply,
                you will discover a world of rich, delicate and filling flavors
                depth, where every drop of wine carries within its soul
                the land where they were born.
              </p>

              <h2 className="font-display-serif text-4xl font-bold text-[#2c1810] mt-12 mb-6 border-l-4 border-[#8b4513] pl-6">
                History and Origins
              </h2>
              <p>
                The journey of wine began more than 8,000 years ago in the region
                Caucasus – what is now Georgia. From there, wine spread
                Ancient Egypt, Greece, then the Roman Empire – civilizations were
                see the echo as a symbol of religion, philosophy and revival
                prosperous. As Rome expanded its territory, the art of making wine spread throughout
                Europe, especially France, Italy, Spain and Portugal – these
                The country became a pillar of the wine industry.
              </p>
              <p>
                Each wine-growing region has its own unique climate characteristics: Bordeaux is rich and complex, Burgundy is delicate and gentle, Napa Valley is strong and full-bodied. This diversity creates thousands of different wine styles, forming a rich wine culture worldwide.
              </p>

              <h2 className="font-display-serif text-4xl font-bold text-[#2c1810] mt-12 mb-6 border-l-4 border-[#8b4513] pl-6">
                Production Process
              </h2>
              <p>
                Behind every bottle of wine is a meticulous and passionate process. It all starts with vineyard care – where grapevines absorb sunlight, mother soil, and local climate. When harvest season arrives, each bunch of grapes is carefully selected to ensure the best quality.
              </p>
              <p>
                Then, the grapes are crushed and undergo fermentation. For red wine, the grapes are kept with their skins to create color and tannin structure. For white wine, the skins are usually removed to maintain lightness and freshness. Once fermentation is complete, the wine will continue to be aged in oak barrels or steel tanks depending on the desired style.
              </p>
              <p>
                Oak barrels impart flavors of vanilla, caramel, and light smoke; while steel tanks help preserve natural aromas and freshness. Finally, the wine is filtered, blended (if necessary), and bottled. Some types need to "rest" for many years before they are ready to be opened.
              </p>

              <h2 className="font-display-serif text-4xl font-bold text-[#2c1810] mt-12 mb-6 border-l-4 border-[#8b4513] pl-6">
                How to Enjoy
              </h2>
              <p>
                To fully enjoy wine, you don't simply pour it
                then drink. The art of wine appreciation includes four important elements:
                temperature, wine glass, how to swirl the glass and food pairing. Echoing
                Red wine is usually best at 16–18°C, white wine at 8–12°C and sparkling wine
                Needs deeper cooling to maintain freshness and bubbles
                dynamic.
              </p>
              <p>
                The shape of the glass also strongly affects the taste: the glass is shaped like a gourd
                Add red wine to help the aroma spread; narrow-mouthed wine glasses
                Effervescent helps keep the foam longer. When you rotate the glass, you help release the
                scent molecules, opening up a more complex flavor layer before being brought up
                nose and mouth.
              </p>
              <p>
                Wine pairing is the art of balancing flavors
                Taste: red wine goes well with red meat, white wine goes well with seafood and fish
                light dishes; Sweet wine goes great with dessert or spicy food
                great. When combined correctly, you will experience an explosion of flavor
                full of surprises.
              </p>

              <div className="bg-linear-to-br from-[#fef8f0] to-[#fff5eb] border-2 border-[#c9a961] rounded-3xl p-10 my-12 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-[#c9a961]/20 to-transparent rounded-bl-full" />
                <h3 className="font-display-serif text-3xl font-bold text-[#8b4513] mb-4 flex items-center gap-3">
                  <span className="text-4xl">💡</span>
                  Expert Tips
                </h3>
                <p className="text-[#5d4e37] mb-0 text-lg leading-relaxed relative z-10">
                  Let the wine "breathe" in the decanter for 15-30 minutes
                  young wines, and 1–2 hours for older red wines. This process helps
                  The wine is exposed to oxygen, softening the tannins and opening up refined flavors
                  more economical. For premium white wines, breathing is also possible
                  gives rich aroma and better texture.
                </p>
              </div>

              <h2 className="font-display-serif text-4xl font-bold text-[#2c1810] mt-12 mb-6 border-l-4 border-[#8b4513] pl-6">
                Conclusion
              </h2>
              <p>
                Discovering wine is an inspiring journey – where you are
                The more you learn, the deeper you want to learn. Every land, every house
                wine making and each vintage brings a new story. When you
                When you open a bottle of wine, you are opening up a whole world of culture and history
                history and quintessence of humanity. Enjoy it in your own way
                you, because it is your personal feelings that create a valuable experience
                best.
              </p>
            </div>
          </motion.article>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-3 mt-16 pt-12 border-t border-neutral-200"
          >
            <Tag className="w-4 h-4 text-[#3b4417]" strokeWidth={1.5} />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 border border-[#c8c8a3] text-[10px] tracking-[0.2em] uppercase text-[#3b4417] hover:border-[#3b4417] transition-all duration-300 cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="w-full bg-[#f5f3e8] py-20 md:py-32">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-16">
                <h2 className="text-[28px] md:text-[36px] tracking-[0.3em] uppercase text-[#3b4417] font-semibold mb-4">
                  RELATED POSTS
                </h2>
                <div className="flex items-center justify-center gap-3 text-[11px] italic tracking-[0.2em] text-[#4c5b23]">
                  <span className="h-px w-10 bg-[#4c5b23]" />
                  <span>Explore More</span>
                  <span className="h-px w-10 bg-[#4c5b23]" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
                {relatedPosts.map((relatedPost, index) => (
                  <BlogCard
                    key={relatedPost.slug}
                    post={relatedPost}
                    index={index}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </main>
  );
}
