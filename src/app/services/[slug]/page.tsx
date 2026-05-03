import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import * as LucideIcons from 'lucide-react';
import { notFound } from 'next/navigation';
import { FadeIn } from '@/components/fade-in';
import SoftwareDevelopmentProcess from '@/components/sections/software-development-process';
import ElearningProcess from '@/components/sections/elearning-process';
import MultimediaProcess from '@/components/sections/multimedia-process';
import QaProcess from '@/components/sections/qa-process';
import DigitalMarketingProcess from '@/components/sections/digital-marketing-process';
import ServiceOfferings from '@/components/sections/service-offerings';
import { getServiceBySlug, getSiteMedia } from '@/app/admin/data-actions';
import { cn } from '@/lib/utils';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.title,
    description: service.description,
  };
}

export const dynamic = 'force-dynamic';

function IconByName({ name, className }: { name: string; className?: string }) {
  const Icon = (LucideIcons as any)[name];
  return Icon ? <Icon className={className} /> : <LucideIcons.Activity className={className} />;
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  // Await params if necessary in newer Next.js versions, but here it is usually synchronous object in page props
  // However, ensuring we treat it as potentially async is safe or just accessing properties
  const { slug } = await params;

  const [service, media] = await Promise.all([
    getServiceBySlug(slug),
    getSiteMedia()
  ]);

  if (!service) {
    notFound();
  }

  // Use the uploaded image, or fallback to a placeholder from media, or a default
  // media['service-hero'] could be a fallback if we had one
  const serviceImage = service.imageUrl || media['services-hero']?.data || '/placeholder.jpg';

  const isSoftwareDevPage = slug === 'software-development' || service.title.toLowerCase().includes('software development');
  const isElearningPage = slug.includes('elearning') || slug.includes('e-learning') || service.title.toLowerCase().includes('elearning') || service.title.toLowerCase().includes('e-learning');
  const isMultimediaPage = slug.includes('multimedia') || service.title.toLowerCase().includes('multimedia');
  const isQaPage = slug.includes('qa') || slug.includes('testing') || service.title.toLowerCase().includes('qa') || service.title.toLowerCase().includes('testing');
  const isDigitalMarketingPage = slug.includes('digital-marketing') || slug.includes('marketing') || service.title.toLowerCase().includes('marketing');

  return (
    <div className="flex min-h-screen flex-col">
      <Header logoUrl={media['logo']?.data} />
      <main className="flex-1">
        <FadeIn>
          <section className="relative h-[60vh] w-full bg-primary text-primary-foreground group overflow-hidden">
            <div className="absolute inset-0">
              {serviceImage.startsWith('data:video/') || serviceImage.includes('.mp4') ? (
                <video
                  src={serviceImage}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <Image
                  src={serviceImage}
                  alt={service.title}
                  fill
                  priority
                  quality={100}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-primary/60" />
            </div>
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
              <div className="container mx-auto px-4">
                <div className="mb-4 flex justify-center text-accent">
                  <IconByName name={service.icon || 'Code'} className="h-12 w-12" />
                </div>
                <h1 className="text-4xl font-bold md:text-5xl">{service.title}</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-primary-foreground/90 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="section-padding bg-background py-16">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
                  {/* Left Column: Image / Placeholder */}
                  <div className="relative w-full flex items-start justify-center">
                    {service.aboutImageUrl ? (
                      // Using standard img tag with w-full h-auto to respect ANY natural aspect ratio uploaded by the admin
                      <img
                        src={service.aboutImageUrl}
                        alt={`About ${service.title}`}
                        className="w-full h-auto object-contain rounded-2xl shadow-xl border border-border/50"
                      />
                    ) : (
                      <div className="w-full aspect-square rounded-2xl shadow-xl bg-muted/50 flex flex-col items-center justify-center border border-border/50 text-center p-6 opacity-50">
                        <LucideIcons.Image className="w-16 h-16 mb-4 text-primary" />
                        <p className="text-sm font-medium">Image Placeholder</p>
                        <p className="text-xs mt-2">Admin can upload an image here</p>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Text */}
                  <div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent pb-2">
                      About Our {service.title} Services
                    </h2>
                    <div className="text-lg text-foreground/80 leading-relaxed whitespace-pre-line mb-8">
                      {service.longDescription || service.description}
                    </div>
                    <div>
                      <Button size="lg" asChild className="text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all">
                        <Link href="/contact">Get In Touch</Link>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* OUR PROCESS SECTION */}
                {!isSoftwareDevPage && !isElearningPage && !isMultimediaPage && !isQaPage && !isDigitalMarketingPage && service.process && service.process.length > 0 && (
                  <div className="mt-20">
                    <h2 className="text-3xl font-bold text-primary mb-12 text-center">Our Process</h2>
                    <div className="relative border-l-2 border-primary/20 ml-6 md:ml-0 md:pl-0 space-y-12">
                      {service.process.map((step: any, index: number) => (
                        <div key={index} className="relative pl-12 md:pl-0">
                          {/* Timeline Dot */}
                          <div className="absolute top-0 left-[-9px] md:left-1/2 md:-ml-3 h-6 w-6 rounded-full bg-primary border-4 border-background z-10 shadow-sm" />

                          <div className={cn(
                            "md:flex items-start justify-between gap-8 group",
                            index % 2 === 0 ? "md:flex-row-reverse" : ""
                          )}>
                            <div className="hidden md:block w-1/2" /> {/* Spacer */}

                            <div className={cn(
                              "md:w-1/2 p-6 rounded-2xl bg-muted/30 border border-muted hover:shadow-lg transition-shadow duration-300 relative",
                              index % 2 === 0 ? "md:text-left" : "md:text-right"
                            )}>
                              {/* Number Watermark */}
                              <div className={cn(
                                "absolute -top-4 text-6xl font-black text-primary/5 select-none z-0",
                                index % 2 === 0 ? "right-4" : "left-4"
                              )}>
                                {index + 1}
                              </div>

                              <div className="relative z-10">
                                <h3 className="text-xl font-bold text-primary mb-2 flex items-center gap-2 md:inline-flex">
                                  {step.title}
                                </h3>
                                <p className="text-muted-foreground">
                                  {step.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}


              </div>
            </div>
          </section>
        </FadeIn>

        <ServiceOfferings offerings={service.offerings} />

        {isSoftwareDevPage && (
          <SoftwareDevelopmentProcess />
        )}

        {isElearningPage && (
          <ElearningProcess processSteps={service.process} />
        )}

        {isMultimediaPage && (
          <MultimediaProcess processSteps={service.process} />
        )}

        {isQaPage && (
          <QaProcess processSteps={service.process} />
        )}

        {isDigitalMarketingPage && (
          <DigitalMarketingProcess processSteps={service.process} />
        )}
      </main>
      <Footer />
    </div>
  );
}
