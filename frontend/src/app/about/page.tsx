import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { 
  AboutHero, 
  AboutMission, 
  AboutValues, 
  AboutTimeline, 
  AboutTrust, 
  AboutCTA 
} from "@/components/sections/about-sections";

export const metadata = {
  title: "About Us | GradMart",
  description: "Built by students, for students. Learn more about the GradMart mission.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] flex flex-col">
      <div className="pt-6">
        <Navbar />
      </div>

      <div className="flex-1">
        <AboutHero />
        <AboutMission />
        <AboutValues />
        <AboutTimeline />
        <AboutTrust />
        <AboutCTA />
      </div>

      <Footer />
    </main>
  );
}
