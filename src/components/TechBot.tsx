"use client";

import React, { useState, useEffect } from "react";
import { MessageCircle, X, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface TechBotProps {
  enabled?: boolean;
  videoUrl?: string;
}

const TechBot = ({ enabled = true, videoUrl }: TechBotProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [greetingVisible, setGreetingVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Greeting logic
  useEffect(() => {
    if (!mounted) return;

    const showGreeting = () => {
      if (!isOpen) { // Don't show if menu is open
        setGreetingVisible(true);
        setTimeout(() => setGreetingVisible(false), 5000); // Hide after 5s
      }
    };

    // Initial greeting delay
    const initialTimer = setTimeout(showGreeting, 2000);

    // Periodic greeting
    const interval = setInterval(showGreeting, 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isOpen, mounted]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setGreetingVisible(false); // Hide greeting when clicked
  };

  if (!mounted || enabled === false) return null;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-end flex-col gap-3 sm:gap-4">
      
      {/* Expanded Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-48 sm:w-56 bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-2xl overflow-hidden mb-2"
          >
            <div className="p-2 sm:p-3 bg-muted/50 border-b border-border flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="font-semibold text-xs sm:text-sm">
                  TechBot Assistant
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="p-2 sm:p-3 space-y-2">
              <p className="text-xs text-muted-foreground mb-2">
                How can I help you today?
              </p>

              <Button
                asChild
                variant="outline"
                className="w-full justify-start gap-2 h-auto py-1.5 sm:py-2 text-xs hover:border-cyan-500/50 hover:bg-cyan-50 hover:text-cyan-900 dark:hover:bg-cyan-900/20 dark:hover:text-cyan-100 transition-colors"
              >
                <a href="/services">
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Browse Services</span>
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full justify-start gap-2 h-auto py-1.5 sm:py-2 text-xs hover:border-cyan-500/50 hover:bg-cyan-50 hover:text-cyan-900 dark:hover:bg-cyan-900/20 dark:hover:text-cyan-100 transition-colors"
              >
                <a href="/contact">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Contact Support</span>
                </a>
              </Button>
            </div>

            <div className="p-2 sm:p-3 bg-muted/30 text-[10px] sm:text-xs text-center text-muted-foreground border-t border-border">
              Powered by Xelaris AI
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Greeting Bubble */}
      <AnimatePresence>
        {(greetingVisible || isHovered) && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="bg-card border border-border p-2 sm:p-3 rounded-lg shadow-lg mb-2 mr-2 max-w-[160px] sm:max-w-[200px]"
          >
            <p className="text-xs sm:text-sm font-medium text-foreground">
              Hello! Welcome to the future of technology 🚀
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Robot Container */}
      <div
        className="relative group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={toggleOpen}
      >
        {videoUrl && videoUrl.trim() !== '' && videoUrl !== 'null' && !videoError ? (
          <div className="relative hover:scale-105 transition-transform duration-300 ease-out">
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              onError={() => setVideoError(true)}
              className="object-contain drop-shadow-2xl w-auto transition-all"
              style={{ maxHeight: 'var(--techbot-size, 150px)' }}
            />
          </div>
        ) : (
          <div
            className="
              relative flex items-center justify-center overflow-hidden
              rounded-2xl shadow-xl border border-white/20
              bg-gradient-to-b from-gray-100 to-gray-300
              dark:from-gray-700 dark:to-gray-900
              animate-float hover:scale-105 transition-transform duration-300
            "
            style={{ 
              width: 'var(--techbot-size, 64px)', 
              height: 'var(--techbot-size, 64px)' 
            }}
          >
            {/* Antenna */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-2 bg-gray-400 rounded-full"></div>
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>

            {/* Face */}
            <div className="w-8 h-7 md:w-10 md:h-8 bg-black rounded-lg flex items-center justify-center gap-1">
              <div className="w-2 h-2.5 md:w-2.5 md:h-3 bg-cyan-400 rounded-full"></div>
              <div className="w-2 h-2.5 md:w-2.5 md:h-3 bg-cyan-400 rounded-full"></div>

              {isHovered && (
                <div className="absolute bottom-1 w-3 md:w-4 h-1 border-b-2 border-cyan-400 rounded-full"></div>
              )}
            </div>

            {/* Glow */}
            <div className="absolute -bottom-1 w-8 md:w-10 h-1 bg-cyan-500/30 blur-sm rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TechBot;
