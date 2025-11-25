"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'vi', label: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', label: 'English', flag: '🇺🇸' }
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
    }
    setIsOpen(false);
  };

  const currentLanguage = languages.find(l => l.code === locale);

  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-neutral-700 transition-all hover:bg-white/50 rounded-sm border border-transparent hover:border-neutral-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe size={16} className="text-neutral-600" />
        <span className="text-[14px] uppercase tracking-[0.25em]">
          {currentLanguage?.code.toUpperCase()}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-neutral-200 z-50 overflow-hidden"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-neutral-50 flex items-center gap-3 transition-colors ${
                    locale === lang.code ? 'bg-neutral-100 font-semibold' : ''
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="flex-1">{lang.label}</span>
                  {locale === lang.code && (
                    <span className="text-[10px] text-neutral-500">✓</span>
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

