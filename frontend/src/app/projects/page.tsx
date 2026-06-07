import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { ProjectsHeader } from "@/components/sections/projects-header";
import { ProjectsFilter } from "@/components/sections/projects-filter";
import { FeaturedProjectHero } from "@/components/sections/featured-project-hero";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { ProjectsCTA } from "@/components/sections/projects-cta";

export const metadata = {
  title: "Projects | GradMart",
  description: "Browse premium, verified final year engineering projects.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] flex flex-col">
      <div className="pt-6">
        <Navbar />
      </div>
      
      <div className="flex-1">
        <ProjectsHeader />
        <ProjectsFilter />
        <FeaturedProjectHero />
        <ProjectsGrid />
        <ProjectsCTA />
      </div>

      <Footer />
    </main>
  );
}
