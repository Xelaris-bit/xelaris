'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, FileText, Code, ShieldCheck, CloudUpload } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  {
    title: 'Discovery',
    description: 'Understanding business needs and technical goals',
    icon: Search,
  },
  {
    title: 'Planning',
    description: 'Defining architecture and project roadmap',
    icon: FileText,
  },
  {
    title: 'Development',
    description: 'Building scalable and secure applications',
    icon: Code,
  },
  {
    title: 'Testing',
    description: 'Ensuring performance, quality, and reliability',
    icon: ShieldCheck,
  },
  {
    title: 'Deployment',
    description: 'Delivering and maintaining the final solution',
    icon: CloudUpload,
  },
];

export default function SoftwareDevelopmentProcess() {
  return (
    <section className="relative w-full overflow-hidden py-24" style={{ backgroundColor: '#102058' }}>
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(#83C204 1px, transparent 1px), linear-gradient(90deg, #83C204 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      
      {/* Soft gradient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20 pointer-events-none rounded-full blur-[100px]" style={{ backgroundColor: '#83C204' }} />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
          >
            Software Development Work Flow
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg"
            style={{ color: 'rgba(255, 255, 255, 0.8)' }}
          >
            A streamlined lifecycle designed to deliver scalable, secure, and innovative digital solutions.
          </motion.p>
        </div>

        <div className="relative">
          {/* Desktop connecting line (Horizontal) */}
          <div className="hidden lg:block absolute top-[2.25rem] left-[10%] right-[10%] h-[2px] bg-white/10 z-0">
            <motion.div
              className="absolute top-0 left-0 h-full"
              style={{ backgroundColor: '#83C204' }}
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          {/* Mobile connecting line (Vertical) */}
          <div className="block lg:hidden absolute top-[5%] bottom-[5%] left-[2.75rem] w-[2px] bg-white/10 z-0">
            <motion.div
              className="absolute top-0 left-0 w-full"
              style={{ backgroundColor: '#83C204' }}
              initial={{ height: '0%' }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  whileHover={{ y: -8 }}
                  className="group relative flex flex-row lg:flex-col items-center lg:items-center gap-4 lg:gap-8 p-2 lg:p-2 rounded-2xl transition-all duration-300"
                >
                  {/* Icon Container */}
                  <div 
                    className="relative flex items-center justify-center w-[4.5rem] h-[4.5rem] shrink-0 rounded-2xl transition-all duration-300 z-10 bg-[#102058]"
                    style={{ border: '2px solid rgba(131, 194, 4, 0.3)' }}
                  >
                    <Icon className="w-8 h-8 transition-colors duration-300 group-hover:text-white" style={{ color: '#83C204' }} />
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 0 20px #83C204' }} />
                  </div>

                  {/* Content Container */}
                  <div className="flex flex-col flex-1 lg:text-center p-4 lg:p-6 rounded-2xl transition-all duration-300 border border-white/5 bg-white/5 group-hover:bg-white/10 w-full"
                       style={{ boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', backdropFilter: 'blur(5px)' }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
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
