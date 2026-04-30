import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PageHero from "@/components/sections/page-hero";
import Testimonials from "@/components/sections/testimonials";
import Stats from "@/components/sections/stats";
import { FadeIn } from "@/components/fade-in";
import { getTestimonials, getSiteMedia } from "@/app/admin/data-actions";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "What Our Clients Say",
  description: "Read success stories and testimonials from businesses that have achieved excellence with Xelaris' digital solutions.",
};

export default async function TestimonialsPage() {
  const [testimonials, media] = await Promise.all([
    getTestimonials(),
    getSiteMedia()
  ]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header logoUrl={media['logo']?.data} />
      <main className="flex-1">
        <FadeIn>
          <PageHero
            title="What Our Clients Say"
            subtitle="We're Proud To Have Partnered With Amazing Companies And Delivered Exceptional Results."
            imageId="case-studies-hero"
            customImageUrl={media['case-studies-hero']?.data}
          />
        </FadeIn>
        <FadeIn>
          <Testimonials testimonials={testimonials} />
        </FadeIn>
        <FadeIn>
          <Stats />
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}
