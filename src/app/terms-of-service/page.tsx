import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PageHero from "@/components/sections/page-hero";
import { FadeIn } from "@/components/fade-in";
import { getSiteMedia } from "@/app/admin/data-actions";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Read the terms and conditions for using Xelaris' website and digital services.",
};

export default async function TermsOfServicePage() {
  const media = await getSiteMedia();

  return (
    <div className="flex min-h-screen flex-col">
      <Header logoUrl={media['logo']?.data} />
      <main className="flex-1">
        <FadeIn>
          <PageHero
            title="Terms of Service"
            subtitle="Please Read These Terms Of Service Carefully Before Using Our Website."
            imageId="terms-hero"
            customImageUrl={media['terms-hero']?.data}
          />
        </FadeIn>
        <FadeIn>
          <section className="section-padding">
            <div className="container mx-auto px-4">
              <div className="prose lg:prose-xl mx-auto max-w-4xl text-foreground/80 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <h2>1. Terms</h2>
                <p>
                  By Accessing The Website At Https://xelaris.com, You Are
                  Agreeing To Be Bound By These Terms Of Service, All Applicable
                  Laws And Regulations, And Agree That You Are Responsible For
                  Compliance With Any Applicable Local Laws.
                </p>
                <h2>2. Use License</h2>
                <p>
                  Permission Is Granted To Temporarily Download One Copy Of The
                  Materials (Information Or Software) On Xelaris' Website For
                  Personal, Non-Commercial Transitory Viewing Only.
                </p>
                <h2>3. Disclaimer</h2>
                <p>
                  The Materials On Xelaris' Website Are Provided On An 'As Is'
                  Basis. Xelaris Makes No Warranties, Expressed Or Implied, And
                  Hereby Disclaims And Negates All Other Warranties Including,
                  Without Limitation, Implied Warranties Or Conditions Of
                  Merchantability, Fitness For A Particular Purpose, Or
                  Non-Infringement Of Intellectual Property Or Other Violation Of
                  Rights.
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
