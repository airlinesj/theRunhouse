import type { Metadata } from "next";

import { Hero } from "@/components/sections/hero";
import { HomeSections } from "@/components/sections/home-sections";

export const metadata: Metadata = {
  title: "Run with your people",
  description: "theRunhouse is a welcoming community running club for easy km, good energy, and runners who want to belong.",
  openGraph: {
    title: "theRunhouse | Run with your people",
    description: "A welcoming community running club for easy km, good energy, and runners who want to belong.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://therunhouse.vercel.app",
    images: ["https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1800&q=80"],
  },
};

export default function HomePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://therunhouse.vercel.app";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "theRunhouse",
        url: siteUrl,
        logo: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80",
        areaServed: { "@type": "City", name: "Resim Mall" },
        sameAs: ["https://www.instagram.com/therunhouse___?stkn=MXJud2RxazJhOGg%3D&utm_source=qr"],
        description: "A social running club for young adults focused on easy km, weekly community energy, and a welcoming pace.",
      },
      {
        "@type": "SportsClub",
        name: "theRunhouse",
        sport: "Running",
        url: siteUrl,
        location: { "@type": "Place", name: "Resim Mall" },
        foundingDate: "2026",
        description: "A community running club with a launch run at Resim Mall and future Karina sessions for young adults.",
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <Hero />
      <HomeSections />
    </>
  );
}
