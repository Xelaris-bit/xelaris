'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, PenTool, MonitorPlay, Blocks, Rocket, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ElearningProcessProps {
  processSteps: { title: string; description: string }[];
}

// Fallback steps if the admin deletes everything
const defaultSteps = [
  { title: 'Analysis', description: 'Identifying learner needs and objectives' },
  { title: 'Content Design', description: 'Structuring engaging and effective modules' },
  { title: 'Development', description: 'Creating interactive and multimedia content' },
  { title: 'Integration', description: 'Connecting with LMS and platforms' },
  { title: 'Launch & Support', description: 'Delivering and continuously improving courses' },
];

const ELEARNING_ICONS = [BookOpen, PenTool, MonitorPlay, Blocks, Rocket, CheckCircle2];

export default function ElearningProcess({ processSteps }: ElearningProcessProps) {
  const stepsToRender = processSteps && processSteps.length > 0 ? processSteps : defaultSteps;

  return (
    <section className="relative w-full overflow-hidden py-24" style={{ backgroundColor: '#102058' }}>
      {/* Subtle background gradient lighting */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.15] pointer-events-none rounded-full blur-[120px]" style={{ backgroundColor: '#83C204' }} />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-[0.1] pointer-events-none rounded-full blur-[100px]" style={{ backgroundColor: '#ffffff' }} />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6"
          >
            The eLearning Journey
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-3xl mx-auto text-lg leading-relaxed"
            style={{ color: 'rgba(255, 255, 255, 0.8)' }}
          >
            Our comprehensive 5-step methodology ensures that every training solution we develop is accessible, engaging, and perfectly aligned with your educational goals.
          </motion.p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Desktop connecting straight line (Horizontal) */}
          <div className="hidden lg:block absolute top-[2.5rem] left-[10%] right-[10%] h-[4px] bg-white/10 z-0 rounded-full">
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full shadow-[0_0_10px_#83C204]"
              style={{ backgroundColor: '#83C204' }}
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>

          {/* Mobile connecting vertical line */}
          <div className="block lg:hidden absolute top-[5%] bottom-[5%] left-[2.5rem] w-[3px] bg-white/10 z-0 rounded-full">
            <motion.div
              className="absolute top-0 left-0 w-full rounded-full shadow-[0_0_10px_#83C204]"
              style={{ backgroundColor: '#83C204' }}
              initial={{ height: '0%' }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-6 relative z-10">
            {stepsToRender.map((step, index) => {
              // Cyclically assign icons if there are more steps than icons
              const Icon = ELEARNING_ICONS[index % ELEARNING_ICONS.length];
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                  className={cn(
                    "group relative flex flex-row lg:flex-col items-center lg:items-center gap-6 lg:gap-6 rounded-[2.5rem] transition-all duration-300"
                  )}
                >
                  {/* Circular Icon Node */}
                  <div 
                    className="relative flex items-center justify-center w-[5rem] h-[5rem] shrink-0 rounded-full transition-all duration-500 z-10 bg-[#102058] group-hover:bg-[#83C204]"
                    style={{ border: '3px solid #83C204' }}
                  >
                    <Icon className="w-8 h-8 transition-colors duration-500 text-[#83C204] group-hover:text-[#102058]" />
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: '0 0 25px rgba(131, 194, 4, 0.8)' }} />
                  </div>

                  {/* Soft Rounded Card Content */}
                  <div 
                    className="flex flex-col flex-1 lg:text-center p-6 lg:p-6 transition-all duration-500 border border-white/10 bg-white/5 group-hover:bg-white/10 w-full group-hover:border-[#83C204]/50"
                    style={{ 
                      borderRadius: '2rem',
                      boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)', 
                      backdropFilter: 'blur(8px)' 
                    }}
                  >
                    <div className="text-xs font-bold uppercase tracking-widest text-[#83C204] mb-2 opacity-80">
                      Step {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#83C204] transition-colors">{step.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
