import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Linkedin, User, ArrowRight } from "lucide-react";
import Link from "next/link";


const Leadership = ({ teamMembers = [] }: { teamMembers?: any[] }) => {
  return (
    <section className="section-padding bg-background/50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-20 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-foreground md:text-5xl lg:text-6xl animate-in fade-in slide-in-from-bottom-12 duration-1000 mb-6">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Leadership</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground animate-in fade-in slide-in-from-bottom-16 duration-1000 max-w-2xl mx-auto leading-relaxed">
            The Driving Force Behind Our Innovation And Success.
          </p>
        </div>

        {/* Changed from grid to flex wrap to center odd numbers gracefully */}
        <div className="mx-auto flex flex-wrap justify-center gap-6 md:gap-8 max-w-6xl">
          {teamMembers.map((member, index) => {
            return (
               <div
                key={member._id || index}
                className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)] max-w-[360px] animate-in fade-in slide-in-from-bottom-20 group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <Card className="h-full overflow-hidden text-center transition-transform duration-500 hover:scale-105 hover:shadow-2xl hover:border-accent hover:bg-gradient-to-br hover:from-white/80 hover:to-accent/20 relative flex flex-col cursor-pointer">
                  {/* Invisible Link covering the card for proper HTML nesting */}
                  <Link href={`/leader/${member._id}`} className="absolute inset-0 z-10">
                    <span className="sr-only">View {member.name}&apos;s profile</span>
                  </Link>

                  <CardHeader className="p-0 relative z-0 pt-8 pointer-events-none">
                    <div className="relative mx-auto h-28 w-28 flex items-center justify-center overflow-hidden rounded-full border-[3px] border-background shadow-xl bg-muted/50">
                      {member.imageUrl ? (
                        <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
                      ) : (
                        <User className="h-12 w-12 text-primary/20" />
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 relative z-0 flex flex-col flex-grow">
                    <div className="pointer-events-none flex flex-col flex-grow">
                      <h3 className="text-xl font-bold text-primary mb-1">
                        {member.name}
                      </h3>
                      <p className="text-sm font-medium text-accent/80 mb-4">{member.role}</p>

                      <p className="text-sm text-foreground/80 flex-grow px-1 line-clamp-4">
                        {member.bio || member.description}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center justify-center pt-4">
                      {/* Social Link - Needs relative z-20 to be clickable over the absolute Link */}
                      <div className="relative z-20">
                        {member.linkedinUrl ? (
                          <a
                            href={member.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-primary/70 transition-colors hover:text-primary"
                          >
                            <Linkedin className="h-5 w-5" />
                            <span className="sr-only">LinkedIn</span>
                          </a>
                        ) : (
                          <div className="h-5 w-5" /> // Placeholder 
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Leadership;
