import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { ProjectDetailsHero } from "@/components/sections/project-details-hero";
import { ProjectDetailsContent } from "@/components/sections/project-details-content";
import { ProjectStickySidebar } from "@/components/sections/project-sticky-sidebar";
import { RelatedProjects } from "@/components/sections/related-projects";

export const metadata = {
  title: "AI Smart Attendance System | GradMart",
  description: "Premium final year project source code.",
};

// Mock fetch function
const getProjectData = (slug: string) => {
  return {
    id: slug,
    title: "AI Smart Attendance System",
    category: "AI & Machine Learning",
    rating: "4.9",
    price: "Premium",
    image: "#8b5cf6", // Purple gradient representation
    tech: "React • Python",
  };
};

export default function ProjectDetailsPage({ params }: { params: { slug: string } }) {
  const project = getProjectData(params.slug);

  return (
    <main className="min-h-screen bg-[#f5f4ef] flex flex-col">
      <div className="pt-6">
        <Navbar />
      </div>
      
      <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-12 pt-32 pb-20">
        
        {/* Top Hero Section */}
        <ProjectDetailsHero project={project} />

        {/* 2-Column Content Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 relative">
          
          {/* Left Column: Details */}
          <div className="flex-1 min-w-0">
            <ProjectDetailsContent project={project} />
          </div>

          {/* Right Column: Sticky Sidebar */}
          <ProjectStickySidebar project={project} />

        </div>

        {/* Bottom Section */}
        <RelatedProjects />

      </div>

      <Footer />
    </main>
  );
}
