"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import type { BlogPost } from "@/lib/blogData";
import { useTranslations } from "next-intl";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  const t = useTranslations("blog");
  const tPosts = useTranslations("blog.posts");

  // Get translated category label
  const getCategoryLabel = (label: string) => {
    return t(`detail.categoryLabels.${label}` as any) || label;
  };

  // Get post data from translations
  const title = tPosts(`${post.postIndex}.title`);
  const excerpt = tPosts(`${post.postIndex}.excerpt`);
  const author = tPosts(`${post.postIndex}.author`);
  const date = tPosts(`${post.postIndex}.date`);
  const readTime = tPosts(`${post.postIndex}.readTime`);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`}>
        {/* Image */}
        <div className="relative h-80 overflow-hidden bg-neutral-100">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6 }}
            className="h-full w-full"
          >
            <ImageWithFallback 
              src={post.image} 
              alt={title} 
              fill 
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover" 
              priority={index < 3}
            />
          </motion.div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500" />

          {/* Category Badge */}
          <div className="absolute top-6 left-6">
            <span className="bg-white/90 backdrop-blur-sm px-4 py-2 text-[10px] tracking-[0.25em] uppercase text-[#3b4417] font-medium">
              {getCategoryLabel(post.categoryLabel)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-4">
          {/* Meta */}
          <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-neutral-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
              {date}
            </span>
            <span className="h-px w-4 bg-neutral-300" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
              {readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-[20px] md:text-[24px] leading-tight tracking-[0.05em] uppercase text-[#3b4417] group-hover:text-[#4c5b23] transition-colors duration-300 font-semibold">
            {title}
          </h3>

          {/* Excerpt */}
          <p className="text-[15px] leading-relaxed text-neutral-600 tracking-wide line-clamp-3">
            {excerpt}
          </p>

          {/* Read More */}
          <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[#3b4417] group-hover:gap-3 transition-all duration-300">
            <span>{t("card.readMore")}</span>
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
