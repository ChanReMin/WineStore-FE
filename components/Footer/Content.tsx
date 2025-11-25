"use client";

import type React from "react";
import { useTranslations } from "next-intl";

export default function WineFooter() {
  const t = useTranslations('footer');
  
  return (
    <footer className="bg-[#120906] text-[#f6f3ea] px-6 py-10 md:px-12 md:py-12 w-full flex flex-col justify-between gap-10">
      <SectionTop t={t} />
      <SectionBottom t={t} />
    </footer>
  );
}

const SectionTop = ({ t }: { t: any }) => {
  return (
    <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
      {/* Brand + tagline */}
      <div className="max-w-sm space-y-3">
        <h2 className="text-[22px] tracking-[0.35em] uppercase text-[#f6f3ea]">
          {t('brand.title')}
        </h2>
        <p className="text-sm text-[#e5ddc7]">
          {t('brand.description')}
        </p>
        <p className="text-xs italic text-[#c6bda0]">
          {t('brand.tagline')}
        </p>
      </div>

      {/* Navigation columns */}
      <Nav t={t} />
    </div>
  );
};

const SectionBottom = ({ t }: { t: any }) => {
  return (
    <div className="flex flex-col gap-6 border-t border-white/10 pt-6 md:flex-row md:items-end md:justify-between">
      {/* Big wordmark */}
      <h1 className="text-[10vw] leading-[0.8] tracking-[0.3em] uppercase text-[#f6f3ea]/5 md:text-[7vw]">
        {t('brand.title').replace(' ', '\u00A0')}
      </h1>

      {/* Info + copyright */}
      <div className="space-y-2 text-xs text-[#d5ccb3] md:text-right">
        <p>{t('info.address')}</p>
        <p>{t('info.hours')}</p>
        <p className="text-[11px] text-[#a99f82]">
          © {new Date().getFullYear()} {t('info.copyright')}
        </p>
      </div>
    </div>
  );
};

const Nav = ({ t }: { t: any }) => {
  return (
    <div className="flex flex-wrap gap-10 text-sm">
      <div className="flex flex-col gap-2 min-w-[130px]">
        <h3 className="mb-1 uppercase text-[11px] tracking-[0.25em] text-[#c6bda0]">
          {t('cellar.title')}
        </h3>
        <FooterLink>{t('cellar.shopAll')}</FooterLink>
        <FooterLink>{t('cellar.newArrivals')}</FooterLink>
        <FooterLink>{t('cellar.limitedReleases')}</FooterLink>
        <FooterLink>{t('cellar.giftSets')}</FooterLink>
      </div>

      <div className="flex flex-col gap-2 min-w-[130px]">
        <h3 className="mb-1 uppercase text-[11px] tracking-[0.25em] text-[#c6bda0]">
          {t('visit.title')}
        </h3>
        <FooterLink>{t('visit.tastingRoom')}</FooterLink>
        <FooterLink>{t('visit.privateEvents')}</FooterLink>
        <FooterLink>{t('visit.wineClub')}</FooterLink>
        <FooterLink>{t('visit.bookTasting')}</FooterLink>
      </div>

      <div className="flex flex-col gap-2 min-w-[150px]">
        <h3 className="mb-1 uppercase text-[11px] tracking-[0.25em] text-[#c6bda0]">
          {t('stayInTouch.title')}
        </h3>
        <FooterLink>{t('stayInTouch.ourStory')}</FooterLink>
        <FooterLink>{t('stayInTouch.journal')}</FooterLink>
        <FooterLink>{t('stayInTouch.contact')}</FooterLink>
        <FooterLink>{t('stayInTouch.faq')}</FooterLink>
      </div>
    </div>
  );
};

const FooterLink = ({ children }: { children: React.ReactNode }) => (
  <button
    type="button"
    className="text-left text-[#f6f3ea]/80 transition-all duration-200 hover:text-[#f6f3ea] hover:translate-x-1"
  >
    {children}
  </button>
);
