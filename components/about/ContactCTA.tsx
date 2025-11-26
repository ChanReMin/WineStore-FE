"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

const ICONS = [Phone, Mail, MapPin];

export default function ContactCTA() {
  const t = useTranslations("about.contactCTA");

  const CONTACT_METHODS = Array.from({ length: 3 }, (_, index) => ({
    icon: ICONS[index],
    title: t(`methods.${index}.title`),
    info: t(`methods.${index}.info`),
    subtext: t(`methods.${index}.subtext`),
  }));
  return (
    <section className="relative w-full overflow-hidden bg-linear-to-br from-[#3b4417] via-[#4a5520] to-[#3b4417] py-24 md:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="text-[32px] md:text-[42px] lg:text-[52px] font-bold leading-tight tracking-[0.15em] text-white uppercase">
            {t("title")}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-white/85">
            {t("subtitle")}
          </p>

          {/* Contact Methods */}
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {CONTACT_METHODS.map((method, index) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-all group-hover:bg-white/20">
                    <Icon size={28} strokeWidth={1.5} className="text-white" />
                  </div>
                  <h3 className="text-[18px] font-semibold tracking-wide text-white">
                    {method.title}
                  </h3>
                  <p className="mt-2 text-[16px] text-white/90">
                    {method.info}
                  </p>
                  <p className="mt-1 text-[13px] text-white/60">
                    {method.subtext}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* CTA Buttons */}
          <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/shop"
                className="group flex items-center gap-3 bg-white px-10 py-5 text-[12px] tracking-[0.25em] text-[#3b4417] transition-all hover:bg-[#f5f3e8] uppercase"
              >
                {t("buttons.browseWines")}
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/our-story"
                className="group flex items-center gap-3 border-2 border-white/60 bg-white/10 px-10 py-5 text-[12px] tracking-[0.25em] text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/20 uppercase"
              >
                {t("buttons.ourStory")}
              </Link>
            </motion.div>
          </div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 flex items-center justify-center gap-8 text-[13px] text-white/60"
          >
            <span>{t("socialProof.customers")}</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">{t("socialProof.rating")}</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">{t("socialProof.service")}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
