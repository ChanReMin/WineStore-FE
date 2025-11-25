// Root layout - minimal wrapper that redirects to locale
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
