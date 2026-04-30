import Header from "@/components/layout/header";
import Hero from "@/components/sections/hero";
import WhoWeAre from "@/components/sections/who-we-are";
import OurBestServices from "@/components/sections/our-best-services";
import WhyChooseUs from "@/components/sections/why-choose-us";
import ToolsGrouped from "@/components/sections/tools-grouped";
import ParallaxSection from "@/components/sections/parallax-section";
import Footer from "@/components/layout/footer";
import MissionVision from "@/components/sections/mission-vision";
import CoreValues from "@/components/sections/core-values";
import OurJourney from "@/components/sections/our-journey";
import Stats from "@/components/sections/stats";
import { FadeIn } from "@/components/fade-in";
import { getServices, getTools, getSiteMedia } from "@/app/admin/data-actions";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Innovation & Technology Excellence",
  description: "Xelaris is a Centre of Excellence delivering end-to-end solutions in Software Development, eLearning, 3D & Multimedia, Digital Marketing, and Data Analysis.",
};

export const dynamic = 'force-dynamic'; // Ensure we fetch fresh data

export default async function Home() {
  const [services, tools, media] = await Promise.all([
    getServices(),
    getTools(),
    getSiteMedia()
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header logoUrl={media['logo']?.data} />
      <main className="flex-1">
        <Hero videoUrl={media['home-hero-video']?.data} services={services} />
        <FadeIn>
          <WhoWeAre />
        </FadeIn>

        {/* <MissionVision /> - Temporarily hidden as per user requested specific order */}

        <FadeIn>
          <OurJourney />
        </FadeIn>

        <OurBestServices services={services} />

        <FadeIn>
          <CoreValues />
        </FadeIn>

        <FadeIn>
          <WhyChooseUs logoUrl={media['logo']?.data} />
        </FadeIn>

        <FadeIn>
          <ParallaxSection />
        </FadeIn>

        <FadeIn>
          <Stats />
        </FadeIn>

        <FadeIn>
          <ToolsGrouped tools={tools} />
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}
