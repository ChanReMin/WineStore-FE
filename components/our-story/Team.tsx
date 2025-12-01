"use client";

import { motion } from "framer-motion";
import { Mail, Crown } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Team() {
  const t = useTranslations("ourStory.team");

  const TEAM_MEMBERS = [
    {
      name: "Rainy Nguyen",
      role: "CEO",
      bio: t("members.0.bio"),
      initial: "R",
      isLeader: true,
    },
    {
      name: "Aaron Lai",
      role: "CEO",
      bio: t("members.1.bio"),
      initial: "A",
      isLeader: true,
    },
    {
      name: "Brian Nguyen",
      role: "Mentor",
      bio: t("members.2.bio"),
      initial: "B",
      isLeader: false,
    },
    {
      name: "Tristian Pham",
      role: "Mentor",
      bio: t("members.3.bio"),
      initial: "T",
      isLeader: false,
    },
    {
      name: "Gary Nguyen",
      role: "Mentor",
      bio: t("members.4.bio"),
      initial: "G",
      isLeader: false,
    },
    {
      name: "Brian Cao",
      role: "Mentor",
      bio: t("members.5.bio"),
      initial: "B",
      isLeader: false,
    },
    {
      name: "Bella Pham",
      role: "Mentor",
      bio: t("members.6.bio"),
      initial: "B",
      isLeader: false,
    },
    {
      name: "Cain Nguyen",
      role: "Mentor",
      bio: t("members.7.bio"),
      initial: "C",
      isLeader: false,
    },
    {
      name: "Tony Nguyen",
      role: "Mentor",
      bio: t("members.8.bio"),
      initial: "T",
      isLeader: false,
    },
    {
      name: "Teku Tran",
      role: "Mentor",
      bio: t("members.9.bio"),
      initial: "T",
      isLeader: false,
    },
    {
      name: "Lucas Thai",
      role: "Mentor",
      bio: t("members.10.bio"),
      initial: "L",
      isLeader: false,
    },
    {
      name: "Harry Trinh",
      role: "Mentor",
      bio: t("members.11.bio"),
      initial: "H",
      isLeader: false,
    },
    {
      name: "Greg Kim",
      role: "Mentor",
      bio: t("members.12.bio"),
      initial: "G",
      isLeader: false,
    },
    {
      name: "Nolan Nguyen",
      role: "Mentor",
      bio: t("members.13.bio"),
      initial: "N",
      isLeader: false,
    },
  ];

  const leaders = TEAM_MEMBERS.filter((member) => member.isLeader);
  const teamMembers = TEAM_MEMBERS.filter((member) => !member.isLeader);
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
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[17px] text-neutral-600">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Leaders Section */}
        <div className="mt-16">
          <h3 className="text-center text-[24px] font-semibold text-[#3b4417] mb-8">
            {t("leadership")}
          </h3>
          <div className="grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
            {leaders.map((member, index) => (
              <motion.div
                key={`leader-${index}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative"
              >
                {/* Leader Badge */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 bg-[#3b4417] text-white px-5 py-2 rounded-full shadow-xl border-2 border-[#5a6622]">
                  <Crown
                    size={18}
                    className="fill-yellow-400 text-yellow-400"
                  />
                  <span className="text-[13px] font-bold uppercase tracking-wider">
                    {t("leader")}
                  </span>
                </div>

                {/* Avatar */}
                <div className="relative aspect-3/4 overflow-hidden bg-neutral-100 rounded-xl shadow-2xl ring-4 ring-[#3b4417]/40 border-2 border-[#3b4417]/20">
                  <div className="w-full h-full bg-linear-to-br from-[#5a6622] to-[#3b4417] flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:from-[#6b7728] group-hover:to-[#4a5520]">
                    <span className="text-[140px] font-bold text-white drop-shadow-2xl">
                      {member.initial}
                    </span>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Social Links */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <motion.button
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#3b4417] shadow-lg transition-all hover:shadow-xl"
                    >
                      <Mail size={20} />
                    </motion.button>
                  </div>
                </div>

                {/* Info */}
                <div className="mt-8 text-center">
                  <h3 className="text-[24px] font-bold tracking-wide text-[#3b4417]">
                    {member.name}
                  </h3>
                  <p className="mt-2 text-[16px] font-bold tracking-wider text-[#5a6622] uppercase">
                    {member.role}
                  </p>
                  <p className="mt-4 text-[16px] leading-relaxed text-neutral-600">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team Members Section */}
        <div className="mt-20">
          <h3 className="text-center text-[24px] font-semibold text-[#3b4417] mb-8">
            {t("teamMembers")}
          </h3>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {teamMembers.map((member, index) => (
              <motion.div
                key={`member-${index}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                {/* Avatar */}
                <div className="relative aspect-3/4 overflow-hidden bg-neutral-100 rounded-lg shadow-md">
                  <div className="w-full h-full bg-[#3b4417] flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:bg-[#4a5520]">
                    <span className="text-[80px] font-bold text-white drop-shadow-lg">
                      {member.initial}
                    </span>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Social Links */}
                  <div className="absolute bottom-4 left-4 flex gap-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <motion.button
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#3b4417] shadow-md transition-all hover:shadow-lg"
                    >
                      <Mail size={18} />
                    </motion.button>
                  </div>
                </div>

                {/* Info */}
                <div className="mt-6">
                  <h3 className="text-[18px] font-semibold tracking-wide text-[#3b4417]">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-[13px] font-medium tracking-wider text-neutral-500 uppercase">
                    {member.role}
                  </p>
                  <p className="mt-3 text-[14px] leading-relaxed text-neutral-600">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
