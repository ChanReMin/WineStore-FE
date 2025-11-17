import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import {
  absoluteUrl,
  defaultStructuredData,
  seoConfig,
  seoVerification,
  themeColor,
} from '@/config/seo';
import Header from '@/components/header';
import Footer from '@/components/Footer/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const structuredData = JSON.stringify(defaultStructuredData);

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.siteUrl),
  title: {
    default: `${seoConfig.siteName} - ${seoConfig.tagline}`,
    template: `%s | ${seoConfig.siteName}`,
  },
  description: seoConfig.description,
  applicationName: seoConfig.siteName,
  keywords: seoConfig.keywords,
  authors: [{ name: seoConfig.siteName }],
  creator: seoConfig.siteName,
  publisher: 'Wine Store Co., Ltd.',
  category: 'ecommerce',
  alternates: {
    canonical: absoluteUrl('/'),
    languages: {
      'vi-VN': absoluteUrl('/vi'),
      'en-US': absoluteUrl('/en'),
    },
  },
  openGraph: {
    title: `${seoConfig.siteName} - ${seoConfig.tagline}`,
    description: seoConfig.description,
    url: absoluteUrl('/'),
    siteName: seoConfig.siteName,
    images: [
      {
        url: absoluteUrl(seoConfig.ogImagePath),
        width: 1200,
        height: 630,
        alt: `${seoConfig.siteName} hero banner`,
      },
    ],
    locale: seoConfig.locale,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: seoConfig.twitterHandle,
    creator: seoConfig.twitterHandle,
    title: `${seoConfig.siteName} - ${seoConfig.tagline}`,
    description: seoConfig.description,
    images: [absoluteUrl(seoConfig.ogImagePath)],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: seoVerification,
  icons: {
    icon: '/favicon.ico',
    shortcut: ['/favicon.ico'],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor,
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
        <Header />
        {children}
         <Footer />
      </body>
    </html>
  );
}
