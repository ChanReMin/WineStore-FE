'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/lib/blogData';

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
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
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </motion.div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500" />
          
          {/* Category Badge */}
          <div className="absolute top-6 left-6">
            <span className="bg-white/90 backdrop-blur-sm px-4 py-2 text-[10px] tracking-[0.25em] uppercase text-[#3b4417] font-medium">
              {post.categoryLabel}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="mt-6 space-y-4">
          {/* Meta */}
          <div className="flex items-center gap-4 text-[10px] tracking-[0.2em] uppercase text-neutral-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" strokeWidth={1.5} />
              {post.date}
            </span>
            <span className="h-px w-4 bg-neutral-300" />
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
              {post.readTime}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-[20px] md:text-[24px] leading-tight tracking-[0.05em] uppercase text-[#3b4417] group-hover:text-[#4c5b23] transition-colors duration-300 font-semibold">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-[15px] leading-relaxed text-neutral-600 tracking-wide line-clamp-3">
            {post.excerpt}
          </p>

          {/* Read More */}
          <div className="flex items-center gap-2 text-[11px] tracking-[0.25em] uppercase text-[#3b4417] group-hover:gap-3 transition-all duration-300">
            <span>ĐỌC THÊM</span>
            <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
