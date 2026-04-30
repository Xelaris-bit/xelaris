'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { getIcon } from "@/lib/icons";
import { motion } from 'framer-motion';

export default function OurBestServices({ services = [] }: { services?: any[] }) {
  const displayServices = services;

  if (!displayServices || displayServices.length === 0) {
    return null;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 60, damping: 15, mass: 1 }
    }
  };

  return (
    <section id="services" className="relative w-full overflow-hidden bg-background py-24 px-4 md:px-8">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-1/4 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 translate-x-1/2 translate-y-1/2 rounded-full bg-accent/10 blur-[100px]" />

      <div className="container mx-auto relative z-10">
        <div className="mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl"
          >
            Our Best <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Services</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground"
          >
            We offer a wide range of premium digital solutions to help your business grow and succeed in the modern era.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[450px] md:auto-rows-[500px]"
        >
          {displayServices.map((service, index) => {
            // Bento Grid logic: Some items take 2 columns
            let bentoStyles = "md:col-span-1 lg:col-span-1 row-span-1";

            // 0: span 2 cols, 1: span 1 col, 2: span 1 col, 3: span 2 cols
            if (index % 4 === 0 || index % 4 === 3) {
              bentoStyles = "md:col-span-2 lg:col-span-2 row-span-1";
              if (index % 4 === 0) bentoStyles = "md:col-span-2 lg:col-span-2 row-span-1";
            } else if (index % 4 === 1 || index % 4 === 2) {
              bentoStyles = "md:col-span-1 lg:col-span-1 row-span-1";
            }

            const IconComponent = getIcon(service.icon);

            return (
              <motion.div
                key={service._id || index}
                variants={itemVariants}
                className={`group relative overflow-hidden rounded-[2rem] border border-border/20 bg-muted shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 flex flex-col ${bentoStyles}`}
              >
                {/* Background Image - Fully visible edge-to-edge */}
                <div className="absolute inset-0 z-0 overflow-hidden">
                  {service.imageUrl ? (
                    service.imageUrl.startsWith('data:video/') ? (
                      <video
                        src={service.imageUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
                      />
                    ) : (
                      <Image
                        src={service.imageUrl}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    )
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20" />
                  )}
                  {/* Subtle vignette shadow to blend edges nicely, but no heavy dark mask over everything */}
                  <div className="absolute inset-0 bg-black/10 transition-opacity duration-500 group-hover:bg-transparent" />
                </div>

                {/* Floating Content Card - Pinned to bottom, ensures 100% text readability */}
                <div className="relative z-10 mt-auto p-4 md:p-6 w-full">
                  <div className="bg-background/95 backdrop-blur-2xl rounded-3xl p-6 md:p-8 flex flex-col shadow-2xl border border-border/40 transition-colors duration-500 group-hover:bg-background group-hover:border-primary/30">
                    <div className="flex flex-col mb-2">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-primary-foreground">
                          {IconComponent && <IconComponent className="h-6 w-6" />}
                        </div>
                        <h3 className="text-xl font-bold text-foreground md:text-2xl tracking-tight">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-base text-muted-foreground line-clamp-2 md:line-clamp-3">
                      {service.description}
                    </p>

                    {/* Expandable Action Area */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                      {/* Added invisible overflow buffer (p-2 -m-2) so hover:scale-105 doesn't hit the box edge */}
                      <div className="overflow-hidden p-2 -m-2">
                        <div className="pt-6">
                          <Button
                            variant="default"
                            className="rounded-full w-full sm:w-auto px-8 transition-transform duration-300 hover:scale-105"
                            asChild
                          >
                            <Link href={`/services/${service.slug}`}>
                              Learn More
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
