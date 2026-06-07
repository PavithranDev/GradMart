import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { LegalContent } from "@/components/sections/legal-content";

export const metadata = { title: "License Agreement | GradMart" };

export default function LicenseAgreementPage() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] flex flex-col">
      <div className="pt-6"><Navbar /></div>
      <div className="flex-1 w-full flex flex-col">
        <LegalContent title="License Agreement" lastUpdated="October 15, 2023">
          <h2>1. Grant of License</h2>
          <p>Upon purchase, GradMart grants you a non-exclusive, non-transferable, revocable academic license to use the downloaded source code and documentation for educational and learning purposes.</p>
          
          <h2>2. Permitted Uses</h2>
          <p>You may modify, edit, and use the source code for your personal learning, academic submissions, university assignments, and final year projects.</p>
          
          <h2>3. Prohibited Uses</h2>
          <p>You may not redistribute, resell, lease, license, or sub-license the source code. You may not claim the original, unmodified code as your own creation outside of an academic context, nor use it to create a competing commercial product.</p>
          
          <h2>4. No Warranty</h2>
          <p>The code is provided "as is" without warranty of any kind, express or implied. GradMart shall not be liable for any damages arising from the use of this software.</p>
        </LegalContent>
      </div>
      <Footer />
    </main>
  );
}
