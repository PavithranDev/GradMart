import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { LegalContent } from "@/components/sections/legal-content";

export const metadata = { title: "Refund Policy | GradMart" };

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] flex flex-col">
      <div className="pt-6"><Navbar /></div>
      <div className="flex-1 w-full flex flex-col">
        <LegalContent title="Refund Policy" lastUpdated="October 15, 2023">
          <h2>1. Digital Products</h2>
          <p>Due to the digital nature of our products, all sales are considered final and non-refundable once the source code has been downloaded.</p>
          
          <h2>2. Exceptions</h2>
          <p>We may offer refunds at our sole discretion in the following circumstances: the file is corrupted, the code is fundamentally broken, or the product significantly differs from its description.</p>
          
          <h2>3. How to Request a Refund</h2>
          <p>If you believe you qualify for a refund under our exceptions, please contact our support team within 3 days of purchase at support@gradmart.in with a detailed explanation and proof of the issue.</p>
          
          <h2>4. Processing</h2>
          <p>Approved refunds will be processed to the original payment method within 5-7 business days.</p>
        </LegalContent>
      </div>
      <Footer />
    </main>
  );
}
