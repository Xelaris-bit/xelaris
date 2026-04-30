
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Archive } from 'lucide-react';
import { FadeIn } from '@/components/fade-in';
import ResumeSubmissionForm from '@/components/resume-submission-form';
import PageHero from '@/components/sections/page-hero';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Build Your Future With Us",
  description: "Join our team of passionate experts at Xelaris and help us shape the future of technology and software quality.",
};

import { getCareers, getSiteMedia } from "@/app/admin/data-actions";

export const dynamic = 'force-dynamic';

export default async function CareersPage() {
  const [careers, media] = await Promise.all([
    getCareers(),
    getSiteMedia()
  ]);
  const activeCareers = careers.filter((c: any) => c.isActive);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header logoUrl={media['logo']?.data} />
      <main className="flex-grow">
        <FadeIn>
          <PageHero
            title="Build Your Future With Xelaris"
            subtitle="Join Our Team And Build The Future Of Technology With Us."
            imageId="careers-hero"
            customImageUrl={media['careers-hero']?.data}
          />
        </FadeIn>
        <FadeIn>
          <section className="container mx-auto px-4 md:px-6 py-12 md:py-16">
            <div className="grid md:grid-cols-2 gap-16 items-start">
              <div className="space-y-8 animate-in fade-in slide-in-from-left-20 duration-1000">
                <div className="text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">Careers At <span className="text-accent">Xelaris</span></h2>
                  <p className="mt-4 text-lg text-muted-foreground">
                    Join Our Team Of Passionate Experts And Help Us Shape The Future Of Software Quality.
                  </p>
                </div>

                {activeCareers.length > 0 ? (
                  <div className="space-y-4">
                    {activeCareers.map((job: any) => (
                      <Card key={job._id} className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                        <CardContent className="p-6">
                          <h4 className="text-xl font-bold mb-2">{job.title}</h4>
                          <div className="flex gap-2 text-sm text-muted-foreground mb-4">
                            <span>{job.department}</span>
                            <span>•</span>
                            <span>{job.location}</span>
                            <span>•</span>
                            <span>{job.type}</span>
                          </div>
                          <p className="text-foreground/80 mb-4 line-clamp-3">
                            {job.description}
                          </p>
                          {/* Add Apply Button or Link if needed */}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="text-center p-8 md:p-12 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <CardContent className="flex flex-col items-center gap-4">
                      <Archive className="w-16 h-16 text-muted-foreground/50" />
                      <h4 className="text-2xl font-semibold">No Openings Currently</h4>
                      <p className="text-muted-foreground max-w-md">
                        We Are Not Actively Hiring For Any Positions At The Moment. However, We Are Always On The Lookout For Talented Individuals.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
              <div className="animate-in fade-in slide-in-from-right-20 duration-1000" style={{ animationDelay: '200ms' }}>
                <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                  <CardHeader>
                    <CardTitle>Submit Your Resume</CardTitle>
                    <CardDescription>
                      Interested In Future Opportunities? Send Us Your Details And We&apos;ll Keep Your Resume On File.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResumeSubmissionForm />
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}
