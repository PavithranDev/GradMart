import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { FaqAccordion } from "@/components/sections/faq-accordion";

export const metadata = {
  title: "FAQ | GradMart",
  description: "Frequently asked questions about GradMart projects and downloads.",
};

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] flex flex-col">
      <div className="pt-6">
        <Navbar />
      </div>

      <div className="flex-1 w-full flex flex-col">
        <FaqAccordion />
      </div>

      <Footer />
    </main>
  );
}
