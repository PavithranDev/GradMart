import { Navbar } from "@/components/ui/navbar";
import { Hero } from "@/components/sections/hero";
import { GsapShowcase } from "@/components/sections/gsap-showcase";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Quote } from "@/components/sections/quote";
import { HowItWorks } from "@/components/sections/how-it-works";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/ui/footer";
import { RedirectIfAuthenticated } from "@/components/redirect-if-authenticated";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] flex flex-col">
      <RedirectIfAuthenticated />
      <div className="pt-6 pb-20">
        <Navbar />
      </div>
      <div className="px-4 md:px-12 flex flex-col gap-[80px]">
        <Hero />
        <GsapShowcase />
        <FeaturedProjects />
        <Quote />
        <HowItWorks />
        <CTA />
      </div>
      <div className="mt-20">
        <Footer />
      </div>
    </main>
  );
}
