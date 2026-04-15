"use client";

import React from "react";
import { motion } from "framer-motion";

export const XelarisLoader = ({ fullScreen = true }: { fullScreen?: boolean }) => {
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-b from-[#010409] via-[#050C22] to-[#0A122E] relative overflow-hidden ${
        fullScreen ? "fixed inset-0 z-[100] w-full h-screen" : "w-full h-full min-h-[400px]"
      }`}
    >
      {/* Dynamic Ambient Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.3, 0.15],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#102058]/20 rounded-full blur-[100px] pointer-events-none z-0"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.25, 0.1],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#62b800]/20 rounded-full blur-[80px] pointer-events-none z-0"
      />

      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Animated Orbital Rings Container */}
        <div className="relative w-40 h-40 flex items-center justify-center">
          {/* Outer Ring */}
          <motion.svg
            className="absolute inset-0 w-full h-full drop-shadow-[0_0_12px_rgba(16,32,88,0.5)]"
            viewBox="0 0 100 100"
            animate={{ rotate: 360 }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
          >
            <defs>
              <linearGradient id="gradientOuter" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#102058" stopOpacity="1" />
                <stop offset="50%" stopColor="#102058" stopOpacity="0" />
                <stop offset="100%" stopColor="#62b800" stopOpacity="1" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="url(#gradientOuter)"
              strokeWidth="1.5"
              strokeDasharray="80 120"
              strokeLinecap="round"
            />
          </motion.svg>

          {/* Middle Ring */}
          <motion.svg
            className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] drop-shadow-[0_0_10px_rgba(98,184,0,0.6)]"
            viewBox="0 0 100 100"
            animate={{ rotate: -360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          >
            <defs>
              <linearGradient id="gradientMiddle" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#62b800" stopOpacity="1" />
                <stop offset="50%" stopColor="#62b800" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#102058" stopOpacity="1" />
              </linearGradient>
            </defs>
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="url(#gradientMiddle)"
              strokeWidth="2"
              strokeDasharray="60 100"
              strokeLinecap="round"
            />
          </motion.svg>

          {/* Inner Dashed Ring */}
          <motion.svg
            className="absolute inset-6 w-[calc(100%-48px)] h-[calc(100%-48px)] opacity-60"
            viewBox="0 0 100 100"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="#27272a"
              strokeWidth="1"
              strokeDasharray="4 6"
              strokeLinecap="round"
            />
          </motion.svg>

          {/* Inner Glowing Core */}
          <motion.div
            animate={{
              scale: [0.8, 1.1, 0.8],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#102058] to-[#62b800] blur-[10px] z-10"
          />
          <motion.div
            animate={{
              scale: [0.9, 1, 0.9],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-6 h-6 rounded-full bg-white blur-[3px] opacity-80 z-20"
          />
        </div>

        {/* Branding & Status Text */}
        <div className="absolute top-[180px] flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl font-extrabold tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-[#102058] via-white to-[#62b800] uppercase mb-3"
          >
            Xelaris
          </motion.h1>

          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center gap-3 bg-white/5 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-sm shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          >
            <div className="h-1.5 w-1.5 bg-[#102058] rounded-full shadow-[0_0_5px_rgba(16,32,88,0.8)]" />
            <span className="text-[#a0b2cc] text-[10px] tracking-[0.3em] font-semibold uppercase font-mono">
              Initializing
            </span>
            <div className="h-1.5 w-1.5 bg-[#62b800] rounded-full shadow-[0_0_5px_rgba(98,184,0,0.8)]" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default XelarisLoader;
