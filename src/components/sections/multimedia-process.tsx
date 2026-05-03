'use client';

import React from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';
import { Lightbulb, Clapperboard, Camera, Scissors, Eye, Send } from 'lucide-react';

interface MultimediaProcessProps {
  processSteps: { title: string; description: string }[];
}

const defaultSteps = [
  { title: 'Concept', description: 'Crafting creative ideas and direction' },
  { title: 'Storyboarding', description: 'Visualizing scenes and sequences' },
  { title: 'Production', description: 'Capturing and creating raw content' },
  { title: 'Editing', description: 'Refining visuals, audio, and motion' },
  { title: 'QA Testing', description: 'Checking the visuals and flow' },
  { title: 'Delivery', description: 'Finalizing and optimizing for platforms' },
];

const MULTIMEDIA_ICONS = [Lightbulb, Clapperboard, Camera, Scissors, Eye, Send];

export default function MultimediaProcess({ processSteps }: MultimediaProcessProps) {
  const stepsToRender = processSteps && processSteps.length > 0 ? processSteps : defaultSteps;
  const steps = stepsToRender.slice(0, 6);

  // Synchronized Animation State
  const progress = useMotionValue(0);

  useAnimationFrame((t) => {
    // 12 second total loop: 10s movement, 2s pause
    const loopDuration = 12000;
    const moveDuration = 10000;
    const currentT = t % loopDuration;

    if (currentT < moveDuration) {
      // Ease-in-out calculation for smooth start and end
      const rawProgress = currentT / moveDuration;
      // standard ease-in-out cubic formula
      const easeProgress = rawProgress < 0.5 
        ? 4 * rawProgress * rawProgress * rawProgress 
        : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;
        
      progress.set(easeProgress);
    } else {
      progress.set(1);
    }
  });

  const dotLeft = useTransform(progress, [0, 1], ["5%", "95%"]);
  const dotOpacity = useTransform(progress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]);

  return (
    <section className="relative w-full overflow-hidden py-32" style={{ backgroundColor: '#102058' }}>
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] rounded-[100%] blur-[120px] opacity-[0.1]" style={{ backgroundColor: '#83C204' }} />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="text-center mb-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Multimedia Production Flow
            </h2>
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-6xl mx-auto h-auto md:h-[200px] flex flex-col md:flex-row items-center justify-center">
          
          {/* Base Background Line (Desktop) */}
          <div className="absolute left-[5%] right-[5%] h-[2px] bg-white/10 rounded-full hidden md:block" />

          {/* Base Background Line (Mobile) */}
          <div className="absolute top-[5%] bottom-[5%] left-1/2 w-[2px] -translate-x-1/2 bg-white/10 rounded-full block md:hidden z-0" />

          {/* The Glowing Dot Indicator (Desktop) */}
          <motion.div 
            className="absolute hidden md:block w-4 h-4 rounded-full bg-[#83C204] z-20"
            style={{ 
              top: 'calc(50% - 8px)',
              left: dotLeft,
              opacity: dotOpacity,
              boxShadow: '0 0 25px 5px rgba(131,194,4,0.8)'
            }}
          >
            {/* Motion Trail (Tail) */}
            <div className="absolute top-1/2 right-full h-[2px] w-[80px] -translate-y-1/2 bg-gradient-to-l from-[#83C204] to-transparent opacity-80" />
          </motion.div>

          {/* Nodes Container */}
          <div className="relative md:absolute md:inset-0 flex flex-col md:flex-row justify-between items-center w-full md:w-[90%] md:mx-auto h-auto md:h-full gap-16 md:gap-0 mt-8 md:mt-0 z-10">
            {steps.map((step, index) => {
              const Icon = MULTIMEDIA_ICONS[index % MULTIMEDIA_ICONS.length];
              
              const nodeCenter = index / 5; // 0.0, 0.2, 0.4, 0.6, 0.8, 1.0
              
              // Custom transforms mapped to the shared progress value
              const scale = useTransform(progress, [nodeCenter - 0.15, nodeCenter, nodeCenter + 0.15], [1, 1.4, 1]);
              const borderColor = useTransform(progress, [nodeCenter - 0.1, nodeCenter, nodeCenter + 0.1], ["rgba(255,255,255,0.1)", "rgba(131,194,4,1)", "rgba(255,255,255,0.1)"]);
              const boxShadow = useTransform(progress, [nodeCenter - 0.1, nodeCenter, nodeCenter + 0.1], ["0 0 0px rgba(131,194,4,0)", "0 0 35px rgba(131,194,4,0.9)", "0 0 0px rgba(131,194,4,0)"]);
              const textOpacity = useTransform(progress, [nodeCenter - 0.15, nodeCenter, nodeCenter + 0.15], [0.3, 1, 0.3]);
              const textColor = useTransform(progress, [nodeCenter - 0.1, nodeCenter, nodeCenter + 0.1], ["rgba(255,255,255,0.5)", "rgba(131,194,4,1)", "rgba(255,255,255,0.5)"]);
              const textY = useTransform(progress, [nodeCenter - 0.15, nodeCenter, nodeCenter + 0.15], [0, -8, 0]);

              return (
                <div key={index} className="relative z-10 flex flex-col items-center justify-center w-full md:w-auto">
                  {/* Clean Text Label (Hovering above the node - Desktop) */}
                  <motion.div 
                    className="absolute -top-20 text-center w-32 hidden md:block"
                    style={{ opacity: textOpacity, y: textY }}
                  >
                    <motion.div 
                      className="text-[10px] font-black uppercase tracking-[0.2em] mb-2"
                      style={{ color: textColor }}
                    >
                      Phase {index + 1}
                    </motion.div>
                    <div className="text-base font-bold tracking-tight text-white drop-shadow-md">
                      {step.title}
                    </div>
                  </motion.div>

                  {/* Node Icon */}
                  <motion.div 
                    className="flex items-center justify-center w-16 h-16 md:w-14 md:h-14 rounded-full bg-[#0a1438] transition-colors relative z-20"
                    style={{ 
                      borderWidth: '2px', 
                      scale, 
                      borderColor, 
                      boxShadow 
                    }}
                  >
                    <Icon className="w-6 h-6 md:w-6 md:h-6 text-white" />
                  </motion.div>

                  {/* Description Box (Below the node - Desktop) */}
                  <motion.div 
                    className="absolute top-[4.5rem] md:top-[5.5rem] w-32 md:w-40 text-center p-3 rounded-xl bg-[#0a1438]/80 backdrop-blur-sm border transition-colors shadow-xl hidden md:block"
                    style={{ 
                      opacity: textOpacity, 
                      borderColor: borderColor 
                    }}
                  >
                    <p className="text-[11px] md:text-xs leading-relaxed text-white/80 font-light">
                      {step.description}
                    </p>
                  </motion.div>
                  
                  {/* Mobile Text (Static, simplified normal DOM flow) */}
                  <div className="md:hidden mt-6 text-center w-[80%] max-w-sm bg-[#0a1438]/80 p-6 rounded-2xl border border-white/10 shadow-xl relative z-10">
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#83C204] mb-2">
                      Phase {index + 1}
                    </div>
                    <div className="text-lg font-bold text-white mb-2">
                      {step.title}
                    </div>
                    <div className="text-sm text-white/70 leading-relaxed">
                      {step.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
