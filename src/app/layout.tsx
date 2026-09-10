import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://therunhouse.example"),
  title: {
    template: "%s | theRunhouse",
    default: "theRunhouse | Where runners belong.",
  },
  description:
    "A modern running club for casual joggers, 5K runners, and marathon trainers who want community and momentum.",
  openGraph: {
    title: "theRunhouse",
    description: "Where runners belong.",
    url: "https://therunhouse.example",
    siteName: "theRunhouse",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "theRunhouse",
    description: "Where runners belong.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${syne.variable} bg-background text-foreground antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#1B2A4A]"
        >
          Skip to main content
        </a>
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
