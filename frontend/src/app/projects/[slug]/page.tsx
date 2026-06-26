import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { ProjectDetailsHero } from "@/components/sections/project-details-hero";
import { ProjectDetailsContent } from "@/components/sections/project-details-content";
import { ProjectStickySidebar } from "@/components/sections/project-sticky-sidebar";
import { RelatedProjects } from "@/components/sections/related-projects";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const res = await fetch(`http://localhost:4000/api/projects/${params.slug}`, { next: { revalidate: 60 } });
    const project = await res.json();
    return {
      title: `${project.title || "Project"} | GradMart`,
      description: project.metaDescription || project.description?.substring(0, 160) || "Premium final year project source code.",
    };
  } catch (error) {
    return {
      title: "Project | GradMart",
    };
  }
}

export default async function ProjectDetailsPage({ params }: { params: { slug: string } }) {
  let project = null;
  try {
    const res = await fetch(`http://localhost:4000/api/projects/${params.slug}`, { cache: 'no-store' });
    if (!res.ok) {
      if (res.status === 404) notFound();
      throw new Error('Failed to fetch project');
    }
    project = await res.json();
  } catch (error) {
    console.error("Error loading project:", error);
    return (
      <div className="min-h-screen bg-[#f5f4ef] flex items-center justify-center">
        <p>Failed to load project details.</p>
      </div>
    );
  }

  if (!project) return notFound();

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
        <RelatedProjects currentProjectId={project.id} category={project.category} />

      </div>

      <Footer />
    </main>
  );
}
