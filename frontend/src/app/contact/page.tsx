import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { ContactContent } from "@/components/sections/contact-content";

export const metadata = {
  title: "Contact Us | GradMart",
  description: "Get in touch with the GradMart team for custom projects or support.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] flex flex-col">
      <div className="pt-6">
        <Navbar />
      </div>

      <div className="flex-1 w-full flex flex-col">
        <ContactContent />
      </div>

      <Footer />
    </main>
  );
}
