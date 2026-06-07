import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { CareersContent } from "@/components/sections/careers-content";

export const metadata = {
  title: "Careers | GradMart",
  description: "Join the GradMart team and build the future of student learning.",
};

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <div className="pt-6">
        <Navbar />
      </div>

      <div className="flex-1 w-full flex flex-col">
        <CareersContent />
      </div>

      <Footer />
    </main>
  );
}
