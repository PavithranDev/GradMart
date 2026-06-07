import { ReactNode } from "react";

interface LegalContentProps {
  title: string;
  lastUpdated: string;
  children: ReactNode;
}

export function LegalContent({ title, lastUpdated, children }: LegalContentProps) {
  return (
    <section className="px-4 md:px-12 pt-32 pb-24 max-w-3xl mx-auto w-full">
      
      {/* Editorial Header */}
      <div className="mb-16 border-b border-black/10 pb-10 text-center">
        <p className="text-[12px] font-bold text-[rgba(10,10,10,0.4)] uppercase tracking-[0.2em] mb-6">
          Legal & Compliance
        </p>
        <h1 className="text-5xl md:text-6xl font-serif text-[#0a0a0a] tracking-tight leading-tight mb-6">
          {title}
        </h1>
        <p className="text-[13px] font-medium text-[rgba(10,10,10,0.5)]">
          Last Updated — {lastUpdated}
        </p>
      </div>

      {/* Editorial Body */}
      <div className="prose prose-lg md:prose-xl prose-headings:font-serif prose-headings:font-normal prose-headings:text-[#0a0a0a] prose-p:text-[rgba(10,10,10,0.8)] prose-p:font-normal prose-p:leading-relaxed prose-p:tracking-wide prose-a:text-[#0a0a0a] prose-a:underline prose-a:decoration-1 prose-a:underline-offset-4 max-w-none">
        {children}
      </div>
      
    </section>
  );
}
