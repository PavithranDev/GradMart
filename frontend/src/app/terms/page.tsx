import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { LegalContent } from "@/components/sections/legal-content";

export const metadata = { title: "Terms of Service | GradMart" };

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] flex flex-col">
      <div className="pt-6"><Navbar /></div>
      <div className="flex-1 w-full flex flex-col">
        <LegalContent title="Terms of Service" lastUpdated="October 15, 2023">
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using GradMart, you accept and agree to be bound by the terms and provision of this agreement.</p>
          
          <h2>2. Description of Service</h2>
          <p>GradMart provides users with access to a rich collection of resources, including source code, project reports, and documentation (the "Service").</p>
          
          <h2>3. User Account</h2>
          <p>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account.</p>
          
          <h2>4. Modifications</h2>
          <p>GradMart reserves the right at any time to modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or without notice.</p>
        </LegalContent>
      </div>
      <Footer />
    </main>
  );
}
