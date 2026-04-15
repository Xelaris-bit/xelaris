"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, PlayCircle } from "lucide-react";
import Link from "next/link";
import { getIcon } from "@/lib/icons";

// Removed mock default departments

const Hero = ({ videoUrl, services = [] }: { videoUrl?: string; services?: any[] }) => {
  const displayDepartments = services && services.length > 0 ? services : [];
  const [currentDeptIndex, setCurrentDeptIndex] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDeptIndex((prevIndex) => (prevIndex + 1) % displayDepartments.length);
      setAnimationKey(prevKey => prevKey + 1);
    }, 2000); // Change department every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute left-0 top-0 h-full w-full object-cover"
        poster="https://picsum.photos/seed/xelaris-hero/1920/1080"
      >
        <source
          src={videoUrl || "https://videos.pexels.com/video-files/3254012/3254012-hd_1920_1080_25fps.mp4"}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="absolute left-0 top-0 h-full w-full bg-black/40"></div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground">
        <div className="container mx-auto px-4">
          <h1 className="animate-in fade-in slide-in-from-bottom-12 duration-1000 font-headline text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            Centre of <span className="text-accent">Excellence</span> in Technology & <span className="text-accent">Innovation</span>
          </h1>

          {displayDepartments.length > 0 && (
            <div className="mt-8 h-12 flex justify-center items-center">
              <div
                key={animationKey}
                className="animate-in fade-in slide-in-from-bottom-8 duration-500 inline-flex items-center gap-3 rounded-full bg-background/20 px-4 py-2"
              >
                <div className="flex-shrink-0 bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center p-1">
                  {(() => {
                      const currentService = displayDepartments[currentDeptIndex];
                      if (!currentService) return null;
                      const IconComponent = getIcon(currentService?.icon);
                      return IconComponent ? <IconComponent className="h-full w-full" /> : null;
                  })()}
                </div>
                <p className="text-lg font-semibold text-primary-foreground">
                  {displayDepartments[currentDeptIndex]?.title}
                </p>
              </div>
            </div>
          )}

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-in fade-in slide-in-from-bottom-20 duration-1000">
            <Button
              size="lg"
              className="w-full sm:w-auto gradient-hover"
              asChild
            >
              <Link href="/services">
                <PlayCircle className="mr-2 h-5 w-5" />
                Explore Our Work
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-primary-foreground text-primary hover:bg-accent hover:text-accent-foreground hover:border-accent"
              asChild
            >
              <Link href="/contact">Request a Consultation</Link>
            </Button>
          </div>
        </div>
        <a
          href="#who-we-are"
          className="absolute bottom-10 animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-8 w-8 text-primary-foreground/80" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
