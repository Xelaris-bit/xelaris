'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { getIcon } from '@/lib/icons';
import Image from 'next/image';

interface Offering {
  title: string;
  description: string;
  icon?: string;
  customIconUrl?: string;
}

interface ServiceOfferingsProps {
  offerings: Offering[];
}

export default function ServiceOfferings({ offerings }: ServiceOfferingsProps) {
  if (!offerings || offerings.length === 0) return null;

  return (
    <section className="w-full pt-10 pb-20 relative overflow-hidden bg-slate-50 dark:bg-slate-900/20">
      {/* Decorative dot pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Soft gradient fade at the top to blend with the white section above */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background to-transparent pointer-events-none" />
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4 pb-2"
          >
            Services to Display
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground"
          >
            Explore our specialized offerings designed to elevate your business.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {offerings.map((offering, index) => {
            const Icon = offering.icon ? getIcon(offering.icon) : null;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative flex flex-col p-6 rounded-2xl bg-card border border-border/50 shadow-md transition-all duration-500 hover:shadow-xl hover:border-primary/30 overflow-hidden"
              >
                {/* Gradient background block that fades in on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Animated Top Border Accent */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:from-primary group-hover:to-accent group-hover:text-primary-foreground shadow-sm">
                      {offering.customIconUrl ? (
                        <div className="relative w-6 h-6 group-hover:brightness-0 group-hover:invert transition-all duration-500">
                          <Image src={offering.customIconUrl} alt={offering.title} fill className="object-contain" />
                        </div>
                      ) : (
                        Icon && <Icon className="w-6 h-6" />
                      )}
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                      {offering.title}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed flex-grow text-sm">
                    {offering.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
