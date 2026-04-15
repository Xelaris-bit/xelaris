import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import BackToTopButton from "@/components/layout/back-to-top-button";
import ScrollProgressBar from "@/components/layout/scroll-progress-bar";
import PromoPopup from "@/components/promo-popup";
import TechBot from "@/components/TechBot";
import { getSiteSettings, getSiteMedia } from "@/app/admin/data-actions";
import GlobalLoader from "@/components/ui/global-loader";

const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Xelaris - Centre of Excellence in Technology & Innovation",
  description:
    "Xelaris is a Centre of Excellence delivering end-to-end solutions in Software Development, eLearning, 3D & Multimedia, Digital Marketing, and Data Analysis. We empower businesses to achieve excellence by combining creativity, technology, and strategy.",
  keywords: [
    "Software Development",
    "eLearning",
    "3D Multimedia",
    "Digital Marketing",
    "Data Analysis",
    "Technology Innovation",
    "Xelaris",
    "Centre of Excellence",
    "Digital Solutions"
  ],
  openGraph: {
    title: "Xelaris - Centre of Excellence in Technology & Innovation",
    description: "Empowering businesses to achieve excellence through creativity, technology, and strategy. End-to-end solutions for a digital world.",
    type: "website",
    locale: "en_US",
    siteName: "Xelaris",
  },
  twitter: {
    card: "summary_large_image",
    title: "Xelaris - Centre of Excellence in Technology & Innovation",
    description: "Empowering businesses to achieve excellence through creativity, technology, and strategy.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const media = await getSiteMedia();



  return (
    <html lang="en" className="!scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body 
        className={cn("font-body antialiased relative", inter.variable)}
        style={{
          '--logo-size': `${settings?.logoSize ?? 32}px`,
          '--techbot-size': `${settings?.techBotSize ?? 64}px`
        } as React.CSSProperties}
      >
        <GlobalLoader>
          <ScrollProgressBar />
          {children}
          <Toaster />
          <BackToTopButton />
          <PromoPopup settings={settings || {}} promoImage={media['promo-banner']?.data} />
          <TechBot
            enabled={settings?.techBotEnabled ?? true}
            videoUrl={media['techbot-video']?.data || settings?.techBotVideoUrl}
          />
        </GlobalLoader>
      </body>
    </html>
  );
}
