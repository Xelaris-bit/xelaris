'use client';

import Image from "next/image";
import placeholderImages from "@/lib/placeholder-images.json";
import { motion } from "framer-motion";

const Tools = ({ tools = [] }: { tools?: any[] }) => {
  // If no tools provided, fallback to empty or handle gracefully
  // const toolsData = tools;
  // Duplicate array for infinite scroll effect
  const duplicatedTools = [...tools, ...tools];

  return (
    <section id="tools" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl mb-6"
          >
            Tools & <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Technologies</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            We Leverage The Latest And Most Effective Tools To Build Robust,
            Scalable, And Innovative Solutions.
          </motion.p>
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <div className="flex scrolling-animation">
          {duplicatedTools.map((tool, index) => {
            return (
              <div
                key={`${tool.id}-${index}`}
                className="flex flex-shrink-0 flex-col items-center justify-center gap-4 mx-8 group w-48"
              >
                <div className="h-24 w-40 rounded-md bg-muted flex items-center justify-center p-4 overflow-hidden">
                  <Image
                    src={tool.imageUrl}
                    alt={tool.description || tool.name}
                    width={100}
                    height={100}
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                    data-ai-hint={tool.imageHint}
                  />
                </div>
                <p className="text-sm font-medium text-foreground/80 text-center">{tool.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Tools;
