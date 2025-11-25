"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";
import { useTranslations } from 'next-intl';

const IMAGES = [
  "/team/member-1.jpg",
  "/team/member-2.jpg",
  "/team/member-3.jpg",
  "/team/member-4.jpg",
  "/team/member-5.jpg",
];

export default function Team() {
  const t = useTranslations('ourStory.team');
  
  const TEAM_MEMBERS = Array.from({ length: 5 }, (_, index) => ({
    name: t(`members.${index}.name`),
    role: t(`members.${index}.role`),
    bio: t(`members.${index}.bio`),
    image: IMAGES[index],
  }));
  return (
    <section className="w-full bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-bold tracking-wide text-[#3b4417] uppercase">
            {t('title')}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[17px] text-neutral-600">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              {/* Image */}
              <div className="relative aspect-3/4 overflow-hidden bg-neutral-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Social Links */}
                <div className="absolute bottom-4 left-4 flex gap-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <motion.button
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#3b4417] backdrop-blur-sm transition-colors hover:bg-white"
                  >
                    <Linkedin size={18} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#3b4417] backdrop-blur-sm transition-colors hover:bg-white"
                  >
                    <Mail size={18} />
                  </motion.button>
                </div>
              </div>

              {/* Info */}
              <div className="mt-6">
                <h3 className="text-[20px] font-semibold tracking-wide text-[#3b4417]">
                  {member.name}
                </h3>
                <p className="mt-1 text-[14px] font-medium tracking-wider text-neutral-500 uppercase">
                  {member.role}
                </p>
                <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">
                  {member.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
