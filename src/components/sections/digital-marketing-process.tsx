'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Target, Rocket, TrendingUp, BarChart } from 'lucide-react';

interface DigitalMarketingProcessProps {
  processSteps: { title: string; description: string }[];
}

const defaultSteps = [
  { title: 'Research', description: 'Analyzing market trends and audience behavior' },
  { title: 'Strategy', description: 'Building data-driven marketing plans' },
  { title: 'Execution', description: 'Launching targeted campaigns across channels' },
  { title: 'Optimization', description: 'Improving performance through insights' },
  { title: 'Reporting', description: 'Delivering measurable results and analytics' },
];

const MARKETING_ICONS = [PieChart, Target, Rocket, TrendingUp, BarChart];

export default function DigitalMarketingProcess({ processSteps }: DigitalMarketingProcessProps) {
  const stepsToRender = processSteps && processSteps.length > 0 ? processSteps : defaultSteps;
  const steps = stepsToRender.slice(0, 5); // strict 5-step dashboard

  return (
    <section className="relative w-full overflow-hidden py-16 md:py-32" style={{ backgroundColor: '#102058' }}>
      {/* Background Analytics Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div 
          className="w-full h-[200%] absolute top-0 left-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        {/* Soft glowing orbs for 'data points' */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#83C204] rounded-full blur-[150px] opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#ffffff] rounded-full blur-[150px] opacity-10" />
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
              Marketing <span className="text-[#83C204]">Performance Workflow</span>
            </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg leading-relaxed font-light tracking-wide text-white/70"
          >
            A strategic, data-driven approach designed to maximize ROI, scale growth, and deliver measurable results.
          </motion.p>
        </div>

        <div className="relative max-w-[1400px] mx-auto">
          {/* Dashboard Connector Lines (Desktop) */}
          <div className="hidden lg:block absolute top-[5rem] left-[10%] right-[10%] h-[1px] z-0">
            {/* Base faded line */}
            <div className="absolute inset-0 bg-white/10" />
            
            {/* Animated data flow line */}
            <motion.div 
              className="absolute top-0 left-0 h-full bg-[#83C204] shadow-[0_0_10px_#83C204]"
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
            />
          </div>

          {/* Dashboard Connector Lines (Mobile) */}
          <div className="block lg:hidden absolute top-[5%] bottom-[5%] left-1/2 w-[1px] -translate-x-1/2 z-0">
            <div className="absolute inset-0 bg-white/10" />
            <motion.div 
              className="absolute top-0 left-0 w-full bg-[#83C204] shadow-[0_0_10px_#83C204]"
              initial={{ height: '0%' }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
            />
          </div>

          {/* Grid Layout - KPI Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, index) => {
              const Icon = MARKETING_ICONS[index % MARKETING_ICONS.length];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="group relative flex flex-col items-center h-full"
                >
                  {/* Floating KPI Card */}
                  <div 
                    className="relative w-full h-full flex flex-col p-6 rounded-2xl bg-[#0a1438]/80 backdrop-blur-md border border-white/5 transition-all duration-500 hover:-translate-y-4 hover:border-[#83C204]/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(131,194,4,0.1)] overflow-hidden"
                  >


                    {/* Top Section: Icon & Upward Indicator */}
                    <div className="flex justify-between items-start mb-6 relative z-10">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 group-hover:bg-[#83C204]/20 group-hover:border-[#83C204]/50 transition-colors duration-500">
                        <Icon className="w-6 h-6 text-white/70 group-hover:text-[#83C204] transition-colors duration-500" />
                      </div>
                      
                      {/* Upward Trend Mini Indicator */}
                      <div className="flex items-center gap-1 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-300">
                        <TrendingUp className="w-4 h-4 text-[#83C204]" />
                        <span className="text-[10px] font-bold text-[#83C204]">+ROI</span>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="relative z-10 flex-1 flex flex-col">
                      <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#83C204] mb-2 opacity-80">
                        Step 0{index + 1}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{step.title}</h3>
                      <p className="text-xs leading-relaxed text-white/60 group-hover:text-white/80 transition-colors duration-500">
                        {step.description}
                      </p>
                    </div>
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
