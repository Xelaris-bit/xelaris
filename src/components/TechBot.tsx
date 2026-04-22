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

  useEffect(() => {
    setMounted(true);
  }, []);

  // Greeting logic
  useEffect(() => {
    if (!mounted) return;

    const showGreeting = () => {
      if (!isOpen) {
        setGreetingVisible(true);
        setTimeout(() => setGreetingVisible(false), 5000);
      }
    };

    const initialTimer = setTimeout(showGreeting, 2000);
    const interval = setInterval(showGreeting, 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [isOpen, mounted]);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
    setGreetingVisible(false);
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
            className="w-56 sm:w-64 bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-2xl overflow-hidden mb-2"
          >
            <div className="p-3 sm:p-4 bg-muted/50 border-b border-border flex justify-between items-center">
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

            <div className="p-3 sm:p-4 space-y-3">
              <p className="text-xs sm:text-sm text-muted-foreground mb-3">
                How can I help you today?
              </p>

              <Button
                asChild
                variant="outline"
                className="w-full justify-start gap-2 h-auto py-2 sm:py-3 text-xs sm:text-sm group hover:border-cyan-500/50 hover:bg-cyan-500/5"
              >
                <a href="/services">
                  <ExternalLink className="w-4 h-4" />
                  <span>Browse Services</span>
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                className="w-full justify-start gap-2 h-auto py-2 sm:py-3 text-xs sm:text-sm group hover:border-cyan-500/50 hover:bg-cyan-500/5"
              >
                <a href="/contact">
                  <MessageCircle className="w-4 h-4" />
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
        {videoUrl ? (
          <div className="relative hover:scale-105 transition-transform duration-300 ease-out">
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="
                object-contain drop-shadow-2xl w-auto
                max-h-[110px]
                sm:max-h-[130px]
                md:max-h-[150px]
                lg:max-h-[170px]
                xl:max-h-[190px]
              "
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
              
              w-12 h-12
              sm:w-14 sm:h-14
              md:w-16 md:h-16
              lg:w-18 lg:h-18
              xl:w-20 xl:h-20
            "
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

// "use client";

// import React, { useState, useEffect } from "react";
// import { MessageCircle, X, ExternalLink } from "lucide-react";
// import { Button } from "./ui/button";
// import { motion, AnimatePresence } from "framer-motion";

// interface TechBotProps {
//     enabled?: boolean;
//     videoUrl?: string;
// }

// const TechBot = ({ enabled = true, videoUrl }: TechBotProps) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [greetingVisible, setGreetingVisible] = useState(false);
//     const [isHovered, setIsHovered] = useState(false);
//     const [mounted, setMounted] = useState(false);

//     useEffect(() => {
//         setMounted(true);
//     }, []);

//     // Show greeting automatically every 30 seconds
//     useEffect(() => {
//         if (!mounted) return;

//         const showGreeting = () => {
//             if (!isOpen) { // Don't show if menu is open
//                 setGreetingVisible(true);
//                 setTimeout(() => setGreetingVisible(false), 5000); // Hide after 5s
//             }
//         };

//         // Initial greeting delay
//         const initialTimer = setTimeout(showGreeting, 2000);

//         // Periodic greeting
//         const interval = setInterval(showGreeting, 30000);

//         return () => {
//             clearTimeout(initialTimer);
//             clearInterval(interval);
//         };
//     }, [isOpen]);

//     const toggleOpen = () => {
//         setIsOpen(!isOpen);
//         setGreetingVisible(false); // Hide greeting when clicked
//     };

//     if (!mounted || enabled === false) return null;

//     return (
//         <div className="fixed bottom-6 right-6 z-50 flex items-end flex-col gap-4">
//             {/* Expanded Menu */}
//             <AnimatePresence>
//                 {isOpen && (
//                     <motion.div
//                         initial={{ opacity: 0, scale: 0.9, y: 20 }}
//                         animate={{ opacity: 1, scale: 1, y: 0 }}
//                         exit={{ opacity: 0, scale: 0.9, y: 20 }}
//                         className="w-64 bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-2xl overflow-hidden mb-2"
//                     >
//                         <div className="p-4 bg-muted/50 border-b border-border flex justify-between items-center">
//                             <div className="flex items-center gap-2">
//                                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                                 <span className="font-semibold text-sm">TechBot Assistant</span>
//                             </div>
//                             <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
//                                 <X className="h-4 w-4" />
//                             </Button>
//                         </div>

//                         <div className="p-4 space-y-3">
//                             <p className="text-sm text-muted-foreground mb-4">
//                                 How can I help you today?
//                             </p>

//                             <Button asChild variant="outline" className="w-full justify-start gap-2 h-auto py-3 group hover:border-cyan-500/50 hover:bg-cyan-500/5 hover:text-foreground transition-all">
//                                 <a href="/services">
//                                     <div className="p-1.5 rounded-md bg-primary/10 group-hover:bg-cyan-500/10 text-primary group-hover:text-cyan-500">
//                                         <ExternalLink className="w-4 h-4" />
//                                     </div>
//                                     <span>Browse Services</span>
//                                 </a>
//                             </Button>

//                             <Button asChild variant="outline" className="w-full justify-start gap-2 h-auto py-3 group hover:border-cyan-500/50 hover:bg-cyan-500/5 hover:text-foreground transition-all">
//                                 <a href="/contact">
//                                     <div className="p-1.5 rounded-md bg-primary/10 group-hover:bg-cyan-500/10 text-primary group-hover:text-cyan-500">
//                                         <MessageCircle className="w-4 h-4" />
//                                     </div>
//                                     <span>Contact Support</span>
//                                 </a>
//                             </Button>
//                         </div>

//                         <div className="p-3 bg-muted/30 text-xs text-center text-muted-foreground border-t border-border">
//                             Powered by Xelaris AI
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//             {/* Greeting Bubble */}
//             <AnimatePresence>
//                 {(greetingVisible || isHovered) && !isOpen && (
//                     <motion.div
//                         initial={{ opacity: 0, y: 10, scale: 0.9 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: 10, scale: 0.9 }}
//                         className="bg-card border border-border p-3 rounded-lg shadow-lg mb-2 mr-2 max-w-[200px] relative bubble-triangle"
//                     >
//                         <p className="text-sm font-medium text-foreground">
//                             Hello! Welcome to the future of technology 🚀
//                         </p>
//                     </motion.div>
//                 )}
//             </AnimatePresence>

//             {/* Robot Container */}
//             <div
//                 className="relative group cursor-pointer"
//                 onMouseEnter={() => setIsHovered(true)}
//                 onMouseLeave={() => setIsHovered(false)}
//                 onClick={toggleOpen}
//             >
//                 {/* Hover Glow Effect */}
//                 {videoUrl ? (
//                     <div className="relative cursor-pointer hover:scale-105 transition-transform duration-300 ease-out z-10">
//                         <video
//                             src={videoUrl}
//                             autoPlay
//                             loop
//                             muted
//                             playsInline
//                             className="max-h-[200px] w-auto object-contain drop-shadow-2xl"
//                         />
//                     </div>
//                 ) : (
//                     <div className="relative w-16 h-16 bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-700 dark:to-gray-900 rounded-2xl shadow-xl flex items-center justify-center border border-white/20 animate-float hover:scale-105 transition-transform duration-300 ease-out overflow-hidden">
//                         {/* Antenna */}
//                         <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-3 bg-gray-400 rounded-full"></div>
//                         <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse-glow shadow-[0_0_8px_rgba(34,211,238,0.8)]"></div>

//                         {/* Face Screen */}
//                         <div className="w-12 h-10 bg-black rounded-lg relative overflow-hidden flex items-center justify-center gap-1.5 shadow-inner">
//                             {/* Eyes */}
//                             <div className="w-2.5 h-3.5 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-blink"></div>
//                             <div className="w-2.5 h-3.5 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-blink"></div>

//                             {/* Smile */}
//                             {isHovered && (
//                                 <div className="absolute bottom-1.5 w-4 h-1 border-b-2 border-cyan-400 rounded-full"></div>
//                             )}
//                         </div>

//                         {/* Holographic Ring (Decorative) */}
//                         <div className="absolute -bottom-2 w-12 h-1 bg-cyan-500/30 blur-sm rounded-[100%] animate-pulse"></div>
//                     </div>
//                 )}
//             </div>


//         </div>
//     );
// };

// export default TechBot;
