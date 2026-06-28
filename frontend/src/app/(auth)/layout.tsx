import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { AuthImage } from "@/components/auth-image";

export const metadata = {
  title: "Authentication | GradMart",
  description: "Secure login and registration for GradMart.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-[#f5f4ef] flex overflow-hidden">
      {/* Left Column (Brand) - Hidden on Mobile */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden bg-white/50 backdrop-blur-3xl border-r border-black/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col gap-12">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-[#0a0a0a]" />
            <span className="text-[20px] font-bold tracking-tight text-[#0a0a0a]">GradMart</span>
          </Link>

          <div className="max-w-md">
            <h1 className="text-4xl xl:text-5xl font-medium tracking-tight text-[#0a0a0a] mb-4">
              Graduate Smarter. <br />
              <span className="font-serif italic font-normal">Build Faster.</span>
            </h1>
          </div>
        </div>

        <AuthImage />

        <div className="relative z-10 text-[13px] font-medium text-[rgba(10,10,10,0.4)]">
          © {new Date().getFullYear()} GradMart. All rights reserved.
        </div>
      </div>

      {/* Right Column (Form) */}
      <div className="w-full lg:w-1/2 flex flex-col items-center p-4 sm:px-8 sm:py-4 overflow-y-auto">
        <div className="w-full max-w-md my-auto">
          {/* Mobile Logo */}
          <Link href="/" className="flex items-center justify-center gap-2 lg:hidden mb-4">
            <GraduationCap className="w-8 h-8 text-[#0a0a0a]" />
            <span className="text-[24px] font-bold tracking-tight text-[#0a0a0a]">GradMart</span>
          </Link>

          {children}
        </div>
      </div>
    </div>
  );
}
