import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { LegalContent } from "@/components/sections/legal-content";

export const metadata = { title: "Cookie Policy | GradMart" };

export default function CookiePolicyPage() {
  return (
    <main className="min-h-screen bg-[#f5f4ef] flex flex-col">
      <div className="pt-6"><Navbar /></div>
      <div className="flex-1 w-full flex flex-col">
        <LegalContent title="Cookie Policy" lastUpdated="October 15, 2023">
          <h2>1. What are cookies?</h2>
          <p>Cookies are small text files that are placed on your computer or mobile device when you browse websites. They help us make our website work better for you.</p>
          
          <h2>2. How we use cookies</h2>
          <p>We use cookies to: remember your preferences, keep you signed in, understand how you use our platform, and improve your overall experience.</p>
          
          <h2>3. Types of cookies we use</h2>
          <p>We use both session cookies (which expire when you close your browser) and persistent cookies (which stay on your device for a set period or until you delete them).</p>
          
          <h2>4. Managing cookies</h2>
          <p>Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience.</p>
        </LegalContent>
      </div>
      <Footer />
    </main>
  );
}
