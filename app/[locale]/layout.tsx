import type { Metadata, Viewport } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "../globals.css";
import {
  absoluteUrl,
  defaultStructuredData,
  seoConfig,
  seoVerification,
  themeColor,
} from "@/config/seo";
import ConditionalLayout from "@/components/ConditionalLayout";
import { AuthProvider } from "@/contexts/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import DevLogin from "@/components/dev/DevLogin";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const structuredData = JSON.stringify(defaultStructuredData);

export function generateStaticParams() {
  return routing.locales.map((locale: string) => ({ locale }));
}

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
  publisher: "Wine Store Co., Ltd.",
  category: "ecommerce",
  alternates: {
    canonical: absoluteUrl("/"),
    languages: {
      "vi-VN": absoluteUrl("/vi"),
      "en-US": absoluteUrl("/en"),
    },
  },
  openGraph: {
    title: `${seoConfig.siteName} - ${seoConfig.tagline}`,
    description: seoConfig.description,
    url: absoluteUrl("/"),
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
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
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
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: seoVerification,
  icons: {
    icon: "/favicon.ico",
    shortcut: ["/favicon.ico"],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor,
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
        <NextIntlClientProvider messages={messages}>
          <AuthProvider>
            <ConditionalLayout>{children}</ConditionalLayout>
            <ToastContainer
              position="top-right"
              autoClose={3500}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              limit={3}
            />
            {/* Dev Login - Only in development */}
            {process.env.NODE_ENV !== "production" && <DevLogin />}
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
