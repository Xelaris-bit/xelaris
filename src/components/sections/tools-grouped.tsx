"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Predefined categories order
const CATEGORY_ORDER = [
  "Software",
  "eLearning",
  "Multimedia",
  "QA/Testing",
  "Digital Marketing",
  "Data Analysis",
  "DevOps",
  "Other"
];

interface Tool {
  _id?: string;
  name: string;
  description: string;
  imageUrl?: string;
  icon?: string;
  category: string;
  link?: string;
}

const ToolCard = ({ tool, index }: { tool: Tool; index: number }) => {
  const content = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-transparent p-6 backdrop-blur-md transition-all duration-300 hover:bg-white/10 dark:hover:bg-white/5 shadow-xl shadow-black/10 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50 hover:-translate-y-1 h-full cursor-pointer"
    >
      {/* Glass sheen effect on hover */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 transition-transform duration-700 group-hover:animate-shimmer" />

      <div className="flex items-start gap-5 relative z-10">
        <div className="relative w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-xl bg-white/10 dark:bg-white/5 p-3 shadow-inner border border-white/10 group-hover:scale-110 transition-transform duration-300">
          {/* Logic: Custom Image > Icon Slug > Placeholder */}
          {tool.imageUrl ? (
            <img
              src={tool.imageUrl}
              alt={`${tool.name} logo`}
              className="w-full h-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
            />
          ) : tool.icon ? (
            <img
              src={`https://cdn.simpleicons.org/${tool.icon}`}
              alt={`${tool.name} logo`}
              className="w-full h-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              loading="lazy"
            />
          ) : (
            // Fallback icon
            <div className="w-full h-full bg-primary/20 rounded-full" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors flex items-center gap-2">
            {tool.name}
            {tool.link && <span className="text-xs opacity-0 group-hover:opacity-100 transition-opacity">↗</span>}
          </h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
            {tool.description}
          </p>
        </div>
      </div>
    </motion.div>
  );

  if (tool.link) {
    return (
      <a href={tool.link} target="_blank" rel="noopener noreferrer" className="block h-full">
        {content}
      </a>
    );
  }

  return content;
};

const ToolsGrouped = ({ tools = [] }: { tools?: Tool[] }) => {
  // Group tools by category
  const groupedTools = useMemo(() => {
    if (!tools || tools.length === 0) return [];

    const groups: Record<string, Tool[]> = {};

    tools.forEach(tool => {
      const category = tool.category || "Other";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(tool);
    });

    // Ensure we include custom categories not in CATEGORY_ORDER
    const orderedCategories = CATEGORY_ORDER.filter(cat => groups[cat] && groups[cat].length > 0);
    const customCategories = Object.keys(groups).filter(cat => !CATEGORY_ORDER.includes(cat));

    return [...orderedCategories, ...customCategories].map(cat => ({
      category: cat,
      items: groups[cat]
    }));
  }, [tools]);

  const [activeCategory, setActiveCategory] = useState<string>(groupedTools[0]?.category || "");

  // Update active category if data changes and current active is invalid
  if (groupedTools.length > 0 && !groupedTools.find(g => g.category === activeCategory)) {
    setActiveCategory(groupedTools[0].category);
  }

  const activeGroup = groupedTools.find((group) => group.category === activeCategory) || groupedTools[0];

  if (groupedTools.length === 0) {
    return null; // Don't render if no tools
  }

  return (
    <section id="tools-grouped" className="py-24 relative overflow-hidden bg-background">
      {/* Background Elements for Glassmorphism Depth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] opacity-20 animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl mb-6"
          >
            Digital <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Ecosystem</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            We leverage a powerful suite of industry-leading tools and technologies optimized for each category.
          </motion.p>
        </div>

        {/* Category Tabs - Glassmorphism Style */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {groupedTools.map((group) => (
            <button
              key={group.category}
              onClick={() => setActiveCategory(group.category)}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border border-transparent backdrop-blur-md",
                activeCategory === group.category
                  ? "bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 scale-105"
                  : "bg-white/5 dark:bg-black/5 hover:bg-white/10 dark:hover:bg-white/5 text-muted-foreground hover:text-foreground border-white/10 hover:border-white/20"
              )}
            >
              {group.category}
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {activeGroup?.items.map((tool, index) => (
                <ToolCard key={tool._id || tool.name} tool={tool} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ToolsGrouped;
