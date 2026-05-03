'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, ClipboardList, Settings, Bug, ShieldCheck } from 'lucide-react';

interface QaProcessProps {
  processSteps: { title: string; description: string }[];
}

const defaultSteps = [
  { title: 'Requirement Analysis', description: 'Understanding system expectations' },
  { title: 'Test Planning', description: 'Designing structured testing strategies' },
  { title: 'Test Execution', description: 'Running manual and automated tests' },
  { title: 'Bug Tracking', description: 'Identifying and managing issues' },
  { title: 'Final Validation', description: 'Ensuring product quality and readiness' },
];

const QA_ICONS = [Search, ClipboardList, Settings, Bug, ShieldCheck];

export default function QaProcess({ processSteps }: QaProcessProps) {
  const stepsToRender = processSteps && processSteps.length > 0 ? processSteps : defaultSteps;
  const steps = stepsToRender.slice(0, 5); // strict 5-step pipeline

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-32" style={{ backgroundColor: '#102058' }}>
      {/* Background Scanning Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div
          className="w-full h-[200%] absolute top-0 left-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(131, 194, 4, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(131, 194, 4, 0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            animation: 'scan-grid 20s linear infinite'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#102058] via-transparent to-[#102058]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="text-center mb-16 md:mb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Quality Assurance <span className="text-[#83C204]">Pipeline</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg leading-relaxed font-light tracking-wide text-white/70"
          >
            A precise, highly structured testing methodology to guarantee enterprise-grade stability and performance.
          </motion.p>
        </div>

        <div className="relative max-w-[1400px] mx-auto">
          {/* Connector Lines Layer (Desktop) */}
          <div className="hidden lg:block absolute top-[4rem] left-[10%] right-[10%] h-[2px] z-0">
            {/* Base faded line */}
            <div className="absolute inset-0 bg-white/10" />

            {/* Animated draw line */}
            <motion.div
              className="absolute top-0 left-0 h-full bg-[#83C204] shadow-[0_0_15px_#83C204]"
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
            />
          </div>

          {/* Connector Lines Layer (Mobile) */}
          <div className="block lg:hidden absolute top-[5%] bottom-[5%] left-1/2 w-[2px] -translate-x-1/2 z-0">
            {/* Base faded line */}
            <div className="absolute inset-0 bg-white/10" />

            {/* Animated draw line */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-[#83C204] shadow-[0_0_15px_#83C204]"
              initial={{ height: '0%' }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
            />
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-4 relative z-10">
            {steps.map((step, index) => {
              const Icon = QA_ICONS[index % QA_ICONS.length];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.4 }}
                  className="group relative flex flex-col items-center"
                >
                  {/* Icon Node */}
                  <div className="relative z-20 mb-4 md:mb-8">
                    <div
                      className="relative flex items-center justify-center w-[5rem] h-[5rem] md:w-[8rem] md:h-[8rem] rounded-xl bg-[#0a1438] border border-white/10 transition-all duration-500 group-hover:border-[#83C204] group-hover:bg-[#102058] group-hover:shadow-[0_0_30px_rgba(131,194,4,0.3)] overflow-hidden"
                    >
                      {/* Diagnostic Scanning Line (Hover Effect) */}
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-[#83C204] shadow-[0_0_15px_5px_rgba(131,194,4,0.6)] opacity-0 group-hover:opacity-100 group-hover:animate-[scanner_1.5s_ease-in-out_infinite]" />

                      {/* Subtle background pulse */}
                      <div className="absolute inset-0 bg-gradient-to-b from-[#83C204]/0 via-[#83C204]/10 to-[#83C204]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <Icon className="w-8 h-8 md:w-12 md:h-12 text-white/50 transition-all duration-500 group-hover:text-[#83C204] group-hover:scale-110 relative z-10" />

                      {/* Glowing dot indicator (Active State) */}
                      <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#83C204] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_8px_#83C204]" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="text-center p-4 w-[90%] md:w-full relative z-10 bg-[#102058] md:bg-transparent rounded-2xl shadow-[0_0_20px_10px_#102058] md:shadow-none">
                    <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#83C204] mb-2 opacity-80">
                      Phase 0{index + 1}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-[#83C204] transition-colors">{step.title}</h3>
                    <p className="text-xs leading-relaxed text-white/60">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Keyframes for Scanning Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes scanner {
          0% { transform: translateY(-100%); }
          50% { transform: translateY(8rem); }
          100% { transform: translateY(-100%); }
        }
        @keyframes scan-grid {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}} />
    </section>
  );
}
