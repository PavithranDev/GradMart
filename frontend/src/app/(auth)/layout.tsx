import Link from "next/link";
import { GraduationCap } from "lucide-react";

export const metadata = {
  title: "Authentication | GradMart",
  description: "Secure login and registration for GradMart.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f5f4ef] flex">
      {/* Left Column (Brand) - Hidden on Mobile */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden bg-white/50 backdrop-blur-3xl border-r border-black/5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <Link href="/" className="flex items-center gap-2 relative z-10">
          <GraduationCap className="w-8 h-8 text-[#0a0a0a]" />
          <span className="text-[20px] font-bold tracking-tight text-[#0a0a0a]">GradMart</span>
        </Link>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl xl:text-5xl font-medium tracking-tight text-[#0a0a0a] mb-4">
            Graduate Smarter. <br />
            <span className="font-serif italic font-normal">Build Faster.</span>
          </h1>
          <p className="text-[15px] text-[rgba(10,10,10,0.6)] leading-relaxed">
            Join thousands of engineering students discovering premium final year projects with complete source code, reports, and setup guides.
          </p>
        </div>

        <div className="relative z-10 text-[13px] font-medium text-[rgba(10,10,10,0.4)]">
          © {new Date().getFullYear()} GradMart. All rights reserved.
        </div>
      </div>

      {/* Right Column (Form) */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-12">
        {/* Mobile Logo */}
        <Link href="/" className="flex items-center gap-2 lg:hidden mb-12">
          <GraduationCap className="w-8 h-8 text-[#0a0a0a]" />
          <span className="text-[24px] font-bold tracking-tight text-[#0a0a0a]">GradMart</span>
        </Link>

        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}
