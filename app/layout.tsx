// Root layout - redirect to locale-specific layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This is just a wrapper, the actual layout is in [locale]/layout.tsx
  return children;
}

// Suppress the missing html/body warning since we have them in [locale]/layout.tsx
export const dynamic = 'force-dynamic';
