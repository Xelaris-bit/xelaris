'use client';

import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/ui/border-beam";
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const journeyData = [
  {
    year: "2024",
    title: "Xelaris Is Founded",
    description: "Our journey begins with a team of passionate tech enthusiasts and software developers, ready to innovate and redefine digital solutions.",
  },
  {
    year: "2024",
    title: "First Digital Solutions Launch",
    description: "We successfully delivered our first suite of innovative software solutions, marking our official and impactful entry into the market.",
  },
  {
    year: "2025",
    title: "AI & Cloud Expansion",
    description: "Planning to broaden our horizons with cutting-edge AI-powered solutions and robust, scalable cloud infrastructure services.",
  },
  {
    year: "2026",
    title: "Global Office Opening",
    description: "Aspiring to grow our family and expand our physical presence to serve a diverse global market with localized digital expertise.",
  },
];

const OurJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Height of the glowing progress line
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative py-32 overflow-hidden bg-[#030917]" ref={containerRef}>
      {/* Background Cinematic Gradients - Using the website's original blue/green combo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] -translate-x-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[150px] translate-x-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl mb-6"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Journey</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Tracing our path from a visionary startup to a trusted partner in global digital transformation.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto pb-20">
          {/* Animated Vertical Line Background */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:-translate-x-1/2 rounded-full" />

          {/* Animated Glowing Progress Line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 md:left-1/2 top-0 w-[4px] bg-gradient-to-b from-blue-500 via-green-400 to-transparent md:-translate-x-1/2 z-0 rounded-full shadow-[0_0_20px_rgba(46,204,113,0.5)]"
          />

          <div className="space-y-16 md:space-y-32">
            {journeyData.map((item, index) => (
              <div
                key={index}
                className="relative grid grid-cols-1 md:grid-cols-2 w-full gap-8 md:gap-0 group"
              >
                {/* Content Alignment Logic */}
                <div
                  className={cn(
                    "relative z-10 col-span-1 flex",
                    index % 2 === 0
                      ? "md:pr-12 lg:pr-24 justify-end md:col-start-1 pl-16 md:pl-0" // Left Side (clears left padding on md)
                      : "md:pl-12 lg:pl-24 justify-start md:col-start-2 pl-16" // Right Side (adds left padding on md)
                  )}
                >
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30, rotateY: index % 2 === 0 ? -5 : 5 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 80, damping: 20 }}
                    className="w-full relative perspective-[1000px]"
                  >
                    {/* Simplified aesthetics without overriding color shifts */}
                    <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-slate-900/40 backdrop-blur-2xl p-6 md:p-12 shadow-xl transition-all duration-500 hover:border-white/20 hover:bg-slate-800/60 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(46,204,113,0.15)]">

                      {/* Optional BorderBeam */}
                      <BorderBeam size={300} duration={12} colorFrom="#3b82f6" colorTo="#22c55e" />

                      {/* Text Content */}
                      <div className="relative z-10">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-sm font-semibold text-blue-400 mb-6 transition-colors group-hover:bg-blue-500/20">
                          {item.year}
                        </span>
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6 transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-lg text-slate-400 leading-relaxed transition-colors duration-300 group-hover:text-slate-200">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Timeline Node - Center Dots */}
                <div className="absolute top-1/2 -translate-y-1/2 left-[18px] md:left-1/2 md:-translate-x-1/2 flex items-center justify-center z-20">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
                    className="w-7 h-7 rounded-full bg-[#030917] border-4 border-slate-700 shadow-lg flex items-center justify-center transition-colors duration-500 group-hover:border-green-400"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-500 transition-colors duration-500 group-hover:bg-green-400 group-hover:shadow-[0_0_10px_#4ade80]" />
                  </motion.div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurJourney;
