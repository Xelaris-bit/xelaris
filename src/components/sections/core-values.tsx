"use client";

import { useState } from "react";
import { Gem, Handshake, Award, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const values = [
  {
    icon: Gem,
    title: "Integrity",
    description:
      "We uphold the highest standards of integrity and transparency in all our actions, building trust with our clients and partners.",
  },
  {
    icon: Handshake,
    title: "Customer Commitment",
    description:
      "We are dedicated to our clients' success, developing relationships that make a positive and lasting difference.",
  },
  {
    icon: Award,
    title: "Quality",
    description:
      "We provide outstanding, unsurpassed service that delivers premium value and ensures flawless product performance.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We constantly pursue new ideas and creative solutions to drive success and stay ahead in a dynamic industry.",
  },
];

const CoreValues = () => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  return (
    <section className="section-padding bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl mb-6"
          >
            Our Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Values</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            The principles that guide our work and define our culture.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={value.title}
                className="flip-card-container animate-in fade-in zoom-in-95 duration-500"
                onMouseEnter={() => setFlippedCard(index)}
                onMouseLeave={() => setFlippedCard(null)}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div
                  className={cn(
                    "flip-card-inner",
                    flippedCard === index && "flipped"
                  )}
                >
                  <div className="flip-card-front">
                    <Card className="flex h-full w-full flex-col items-center justify-center text-center transition-all duration-300 border-white/20 bg-white/10 backdrop-blur-md rounded-3xl shadow-lg">
                      <CardHeader>
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                          <Icon className="h-10 w-10 text-accent" />
                        </div>
                        <CardTitle className="text-xl font-bold text-white">
                          {value.title}
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  </div>
                  <div className="flip-card-back">
                    <Card className="flex h-full w-full flex-col items-center justify-center text-center transition-all duration-300 border-white/20 bg-slate-900/60 backdrop-blur-md rounded-3xl shadow-lg">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                        <p className="text-slate-200">
                          {value.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
