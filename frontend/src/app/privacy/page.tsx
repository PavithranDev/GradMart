import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { LegalContent } from "@/components/sections/legal-content";

export const metadata = { title: "Privacy Policy | GradMart" };

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] flex flex-col">
      <div className="pt-6"><Navbar /></div>
      <div className="flex-1 w-full flex flex-col">
        <LegalContent title="Privacy Policy" lastUpdated="October 15, 2023">
          <h2>1. Information We Collect</h2>
          <p>We collect information to provide better services to all our users. This includes basic information like your name and email, and more complex things like which projects you browse the most.</p>
          
          <h2>2. How We Use Information We Collect</h2>
          <p>We use the information we collect from all of our services to provide, maintain, protect and improve them, to develop new ones, and to protect GradMart and our users.</p>
          
          <h2>3. Information We Share</h2>
          <p>We do not share personal information with companies, organizations, and individuals outside of GradMart unless one of the following circumstances applies: with your consent, for legal reasons.</p>
          
          <h2>4. Data Security</h2>
          <p>We work hard to protect GradMart and our users from unauthorized access to or unauthorized alteration, disclosure or destruction of information we hold.</p>
        </LegalContent>
      </div>
      <Footer />
    </main>
  );
}
