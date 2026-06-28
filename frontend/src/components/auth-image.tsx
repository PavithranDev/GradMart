"use client";

import { usePathname } from "next/navigation";

export function AuthImage() {
  const pathname = usePathname();

  // Only show on login and register pages
  if (pathname !== "/register" && pathname !== "/login") return null;

  const imgSrc = pathname === "/register" 
    ? "/undraw_build-mode_aa78.svg" 
    : "/undraw_online-survey_xq2g.svg";

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] max-w-[550px] z-0 opacity-90 pointer-events-none transform translate-y-[8%]">
      <img src={imgSrc} alt="Auth Illustration" className="w-full h-auto drop-shadow-xl" />
    </div>
  );
}
