import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { RequestFormContent } from "@/components/sections/request-form-content";

export const metadata = {
  title: "Request Custom Project | GradMart",
  description: "Request a custom final year project built exactly to your specifications.",
};

export default function RequestProjectPage() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] flex flex-col">
      <div className="pt-6">
        <Navbar />
      </div>

      <div className="flex-1 w-full flex flex-col">
        <RequestFormContent />
      </div>

      <Footer />
    </main>
  );
}
