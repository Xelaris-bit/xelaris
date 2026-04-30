import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PageHero from "@/components/sections/page-hero";
import { FadeIn } from "@/components/fade-in";
import { getSiteMedia } from "@/app/admin/data-actions";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Learn how Xelaris collects, uses, and protects your data. Your privacy and trust are our top priorities.",
};

export default async function PrivacyPolicyPage() {
  const media = await getSiteMedia();
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header logoUrl={media['logo']?.data} />
      <main className="flex-1">
        <FadeIn>
          <PageHero
            title="Privacy Policy"
            subtitle="Your Privacy Is Important To Us. It Is Xelaris' Policy To Respect Your Privacy Regarding Any Information We May Collect From You Across Our Website."
            imageId="privacy-hero"
            customImageUrl={media['privacy-hero']?.data}
          />
        </FadeIn>
        <FadeIn>
          <section className="section-padding">
            <div className="container mx-auto px-4">
              <div className="prose lg:prose-xl mx-auto max-w-4xl text-foreground/80 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <h2>1. Information We Collect</h2>
                <p>
                  We Only Collect Information About You If We Have A Reason To Do
                  So–For Example, To Provide Our Services, To Communicate With
                  You, Or To Make Our Services Better.
                </p>
                <h2>2. How We Use Information</h2>
                <p>
                  We Use Information About You As Mentioned Above And For The
                  Purposes Listed Below: To Monitor And Analyze Trends And Better
                  Understand How Users Interact With Our Services, Which Helps Us
                  Improve Our Services And Make Them Easier To Use.
                </p>
                <h2>3. Sharing Information</h2>
                <p>
                  We Do Not Sell Our Users' Private Personal Information. We Share
                  Information About You In The Limited Circumstances Spelled Out
                  Below And With Appropriate Safeguards On Your Privacy.
                </p>
              </div>
            </div>
          </section>
        </FadeIn>
      </main>
      <Footer />
    </div>
  );
}
