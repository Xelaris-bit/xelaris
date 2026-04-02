"use client";

import { useState } from "react";
import { BrainCircuit, Milestone, ShieldCheck, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import OrbitalMenu from "../orbital-menu";

import { motion } from "framer-motion";

const benefits = [
  {
    icon: BrainCircuit,
    title: "Innovative Solutions",
    description:
      "Our team of experts crafts creative and cutting-edge solutions tailored to your unique needs.",
  },
  {
    icon: Milestone,
    title: "Proven Track Record",
    description:
      "We have a history of delivering successful projects and driving growth for clients across industries.",
  },
  {
    icon: ShieldCheck,
    title: "Quality & Security",
    description:
      "Quality and security are at the core of our process, ensuring your product is robust and reliable.",
  },
  {
    icon: Users,
    title: "Collaborative Partnership",
    description:
      "We work as an extension of your team, ensuring seamless communication and optimal collaboration.",
  },
];

const WhyChooseUs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="about" className="section-padding bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl mb-6"
          >
            Why Partner With <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Xelaris?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            We are more than just a digital agency. We are your dedicated
            partners in innovation and success.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="animate-in fade-in slide-in-from-left-20 duration-1000">
            <OrbitalMenu
              benefits={benefits}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </div>
          <div className="relative flex items-center justify-center animate-in fade-in slide-in-from-right-20 duration-1000">
            <div className="relative w-full max-w-md p-2">
              <div className="absolute -left-2 -top-2 h-8 w-8 border-l-2 border-t-2 border-primary/50"></div>
              <div className="absolute -right-2 -top-2 h-8 w-8 border-r-2 border-t-2 border-primary/50"></div>
              <div className="absolute -left-2 -bottom-2 h-8 w-8 border-l-2 border-b-2 border-primary/50"></div>
              <div className="absolute -right-2 -bottom-2 h-8 w-8 border-r-2 border-b-2 border-primary/50"></div>
              <Card className="w-full text-center shadow-2xl bg-secondary border-primary/20">
                <CardContent className="p-8 min-h-[160px] flex flex-col justify-center">
                  <div className="animate-in fade-in duration-500">
                    <h3 className="mb-4 text-2xl font-bold text-primary">
                      {benefits[activeTab].title}
                    </h3>
                    <p className="text-lg text-foreground/80">
                      {benefits[activeTab].description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
