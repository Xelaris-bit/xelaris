import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { getSiteMedia, getTeamMemberById } from "@/app/admin/data-actions";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Linkedin, ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/fade-in";
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const member = await getTeamMemberById(params.id);
    if (!member) return { title: 'Leader Not Found | Xelaris' };

    return {
        title: `${member.name} - ${member.role} | Xelaris`,
        description: member.bio || `Profile of ${member.name}, ${member.role} at Xelaris.`,
    };
}

export default async function LeaderPage({ params }: { params: { id: string } }) {
    const [member, media] = await Promise.all([
        getTeamMemberById(params.id),
        getSiteMedia()
    ]);

    if (!member) {
        notFound();
    }

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header logoUrl={media['logo']?.data} />

            <main className="flex-1 pt-32 pb-24 relative overflow-hidden">
                {/* Background Decorative Blob */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -z-10 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

                <div className="container mx-auto px-4 max-w-6xl">

                    <FadeIn>
                        <Button variant="ghost" asChild className="mb-12 pl-0 hover:bg-transparent hover:text-accent font-medium text-muted-foreground transition-colors group">
                            <Link href="/about">
                                <ArrowLeft className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" />
                                Back to About Us
                            </Link>
                        </Button>
                    </FadeIn>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20 items-start">

                        {/* Left Column: Image & Basic Info */}
                        <div className="md:col-span-4 lg:col-span-4">
                            <FadeIn>
                                <div className="md:sticky md:top-32 space-y-6">
                                    {/* Image Container with premium frame */}
                                    <div className="relative aspect-square w-full max-w-[320px] mx-auto overflow-hidden rounded-3xl shadow-2xl border border-border/40 bg-card flex items-center justify-center group">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
                                        {member.imageUrl ? (
                                            <Image
                                                src={member.imageUrl}
                                                alt={member.name}
                                                fill
                                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                                priority
                                            />
                                        ) : (
                                            <User className="h-32 w-32 text-primary/20" />
                                        )}
                                    </div>

                                    <div className="text-center md:text-left space-y-4 pt-4">
                                        <div className="space-y-1">
                                            <h1 className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">{member.name}</h1>
                                            <p className="text-lg font-semibold text-accent/90">{member.role}</p>
                                        </div>

                                        {member.linkedinUrl && (
                                            <div className="flex items-center justify-center md:justify-start pt-2">
                                                <a
                                                    href={member.linkedinUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-background border border-border/50 text-foreground/70 transition-all hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] hover:shadow-lg hover:shadow-[#0077b5] hover:-translate-y-1"
                                                >
                                                    <Linkedin className="h-5 w-5" />
                                                    <span className="sr-only">LinkedIn Profile</span>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </FadeIn>
                        </div>

                        {/* Right Column: Detailed Description */}
                        <div className="md:col-span-8 lg:col-span-8">
                            <FadeIn>
                                <div className="bg-card w-full rounded-3xl shadow-xl shadow-primary/5 border border-border/50 p-8 md:p-12 relative overflow-hidden">

                                    {/* Decorative faint quote mark */}
                                    <div className="absolute top-4 right-8 text-9xl text-muted-foreground/5 font-serif leading-none pointer-events-none select-none">"</div>

                                    <div className="relative z-10 space-y-8">
                                        <div>
                                            <h2 className="text-2xl font-bold text-primary border-b border-border/40 pb-4 mb-6">About {member.name.split(' ')[0]}</h2>
                                        </div>

                                        <div className="text-foreground/80 leading-relaxed text-lg space-y-6">
                                            {member.detailedDescription ? (
                                                member.detailedDescription.split('\n').map((paragraph: string, i: number) => {
                                                    if (!paragraph.trim()) return null;
                                                    return <p key={i} className="leading-relaxed">{paragraph}</p>;
                                                })
                                            ) : (
                                                <p className="italic text-muted-foreground">
                                                    {member.bio || "No detailed profile description available at this time."}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </FadeIn>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
