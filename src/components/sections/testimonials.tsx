'use client';

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import placeholderImages from "@/lib/placeholder-images.json";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    id: "testimonial-1",
    name: "Sarah Johnson",
    company: "CEO, Innovatech",
    quote:
      "Xelaris Delivered A Flawless Web Application That Has Transformed Our Business. Their Expertise And Commitment To Quality Are Unparalleled.",
  },
  {
    id: "testimonial-2",
    name: "Michael Chen",
    company: "CTO, Edify Online",
    quote:
      "The Elearning Platform They Developed For Us Exceeded All Expectations. It's Intuitive, Scalable, And Has Received Fantastic Feedback From Our Users.",
  },
  {
    id: "testimonial-3",
    name: "Emily Rodriguez",
    company: "Marketing Director, Verta",
    quote:
      "Working With Xelaris On Our Digital Marketing Strategy Was A Game-Changer. Our Engagement And Conversions Have Skyrocketed Since We Partnered With Them.",
  },
];

const Testimonials = () => {
  return (
    <section id="case-studies" className="section-padding bg-secondary">
      <div className="container mx-auto px-4">
        <div className="mb-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl mb-6"
          >
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Clients Say</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            We're Proud To Have Partnered With Amazing Companies And Delivered
            Exceptional Results.
          </motion.p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="mx-auto w-full max-w-4xl animate-in fade-in slide-in-from-bottom-20 duration-1000"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => {
              const image = placeholderImages.placeholderImages.find(
                (p) => p.id === testimonial.id
              );
              return (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="group">
                      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                        {image && (
                          <div className="overflow-hidden rounded-full mb-4">
                            <Image
                              src={image.imageUrl}
                              alt={testimonial.name}
                              width={80}
                              height={80}
                              quality={100}
                              className="transition-transform duration-500 group-hover:scale-110"
                              data-ai-hint={image.imageHint}
                            />
                          </div>
                        )}
                        <p className="mb-4 text-lg italic text-foreground/90">
                          "{testimonial.quote}"
                        </p>
                        <div className="flex gap-1 text-yellow-500 mb-2">
                            {[...Array(5)].map((_, i) => <Star key={i} fill="currentColor" className="w-5 h-5"/>)}
                        </div>
                        <p className="font-semibold text-primary">
                          {testimonial.name}
                        </p>
                        <p className="text-sm text-foreground/70">
                          {testimonial.company}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
