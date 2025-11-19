import type React from "react";

export default function WineFooter() {
  return (
    <footer className="bg-[#120906] text-[#f6f3ea] px-6 py-10 md:px-12 md:py-12 w-full flex flex-col justify-between gap-10">
      <SectionTop />
      <SectionBottom />
    </footer>
  );
}

const SectionTop = () => {
  return (
    <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
      {/* Brand + tagline */}
      <div className="max-w-sm space-y-3">
        <h2 className="text-[22px] tracking-[0.35em] uppercase text-[#f6f3ea]">
          Wine Store
        </h2>
        <p className="text-sm text-[#e5ddc7]">
          Boutique wine store curating small-batch labels, cellar-aged classics
          and everyday bottles for unhurried evenings.
        </p>
        <p className="text-xs italic text-[#c6bda0]">
          Slowly curated. Thoughtfully poured.
        </p>
      </div>

      {/* Navigation columns */}
      <Nav />
    </div>
  );
};

const SectionBottom = () => {
  return (
    <div className="flex flex-col gap-6 border-t border-white/10 pt-6 md:flex-row md:items-end md:justify-between">
      {/* Big wordmark */}
      <h1 className="text-[10vw] leading-[0.8] tracking-[0.3em] uppercase text-[#f6f3ea]/5 md:text-[7vw]">
        Wine&nbsp;Store
      </h1>

      {/* Info + copyright */}
      <div className="space-y-2 text-xs text-[#d5ccb3] md:text-right">
        <p>12 Rue des Vignes, French Provence • +33 (0)1 23 45 67 89</p>
        <p>Open Tue – Sun · 11:00 – 21:30</p>
        <p className="text-[11px] text-[#a99f82]">
          © {new Date().getFullYear()} Château Wine Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

const Nav = () => {
  return (
    <div className="flex flex-wrap gap-10 text-sm">
      <div className="flex flex-col gap-2 min-w-[130px]">
        <h3 className="mb-1 uppercase text-[11px] tracking-[0.25em] text-[#c6bda0]">
          Cellar
        </h3>
        <FooterLink>Shop All Wines</FooterLink>
        <FooterLink>New Arrivals</FooterLink>
        <FooterLink>Limited Releases</FooterLink>
        <FooterLink>Gift Sets</FooterLink>
      </div>

      <div className="flex flex-col gap-2 min-w-[130px]">
        <h3 className="mb-1 uppercase text-[11px] tracking-[0.25em] text-[#c6bda0]">
          Visit Us
        </h3>
        <FooterLink>Tasting Room</FooterLink>
        <FooterLink>Private Events</FooterLink>
        <FooterLink>Wine Club</FooterLink>
        <FooterLink>Book a Tasting</FooterLink>
      </div>

      <div className="flex flex-col gap-2 min-w-[150px]">
        <h3 className="mb-1 uppercase text-[11px] tracking-[0.25em] text-[#c6bda0]">
          Stay in Touch
        </h3>
        <FooterLink>Our Story</FooterLink>
        <FooterLink>Journal &amp; Pairings</FooterLink>
        <FooterLink>Contact</FooterLink>
        <FooterLink>FAQ &amp; Shipping</FooterLink>
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
