import type { Metadata } from "next";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phasebook - 3D Interactive Journal",
  description: "A hardware-accelerated 3D interactive book and live journaling platform.",
  openGraph: {
    title: "Phasebook",
    description: "A hardware-accelerated 3D interactive book and live journaling platform.",
    url: "https://phasebook.vercel.app",
    siteName: "Phasebook",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Phasebook Preview Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phasebook",
    description: "A hardware-accelerated 3D interactive book and live journaling platform.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-black selection:text-white min-h-screen flex flex-col">
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
