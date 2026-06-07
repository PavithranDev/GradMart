import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { LegalContent } from "@/components/sections/legal-content";

export const metadata = { title: "Shipping & Delivery | GradMart" };

export default function ShippingDeliveryPage() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] flex flex-col">
      <div className="pt-6"><Navbar /></div>
      <div className="flex-1 w-full flex flex-col">
        <LegalContent title="Shipping & Delivery" lastUpdated="October 15, 2023">
          <h2>1. Digital Delivery</h2>
          <p>GradMart exclusively sells digital products (source code, PDFs, PPTs). As such, no physical shipping is required for any of our products.</p>
          
          <h2>2. Instant Access</h2>
          <p>Upon successful payment confirmation, your purchased files will be immediately available for download from your Student Dashboard under the "Downloads" section.</p>
          
          <h2>3. Email Confirmation</h2>
          <p>You will also receive an email confirmation containing a receipt and direct download links to your purchased project files.</p>
          
          <h2>4. Delivery Issues</h2>
          <p>If you experience any issues accessing your digital downloads after a successful payment, please contact support@gradmart.in immediately for assistance.</p>
        </LegalContent>
      </div>
      <Footer />
    </main>
  );
}
