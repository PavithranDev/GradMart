"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MonitorSmartphone, LayoutDashboard, FileSpreadsheet, Mail } from "lucide-react";

interface ProjectDetailsContentProps {
  project: any;
}

export function ProjectDetailsContent({ project }: ProjectDetailsContentProps) {
  const techStack = Array.isArray(project.tags) ? project.tags : [];
  const description = project.description || `The ${project.title} is a premium state-of-the-art solution designed with modern standards.`;
  const coreFeatures = Array.isArray(project.features) ? project.features : [];

  const dynamicFiles = [];
  if (project.zipUrl) dynamicFiles.push("Complete Source Code (.zip)");
  if (project.pdfUrl) dynamicFiles.push("Detailed Project Report (.pdf/.docx)");
  if (project.pptUrl) dynamicFiles.push("Presentation Deck (.pptx)");
  if (project.sqlUrl) dynamicFiles.push("Database Schemas (.sql)");
  if (project.readmeUrl) dynamicFiles.push("Step-by-step Setup Guide");
  
  if (dynamicFiles.length === 0) {
    dynamicFiles.push("Premium Project Files", "Setup Assistance via Email");
  }

  return (
    <div className="flex flex-col gap-16">
      
      {/* Tech Stack */}
      {techStack.length > 0 && (
        <section>
          <h3 className="text-[18px] font-bold text-[#0a0a0a] mb-4">Tech Stack</h3>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech: string) => (
              <span 
                key={tech} 
                className="px-4 py-1.5 bg-white text-[#0a0a0a] text-[13px] font-semibold rounded-full border border-black/10 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Description */}
      <section>
        <h3 className="text-[18px] font-bold text-[#0a0a0a] mb-4">Project Description</h3>
        <div className="prose prose-sm text-[rgba(10,10,10,0.6)] leading-relaxed whitespace-pre-line">
          {description}
        </div>
      </section>

      {/* Features Grid */}
      {coreFeatures.length > 0 && (
        <section>
          <h3 className="text-[18px] font-bold text-[#0a0a0a] mb-4">Core Features</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {coreFeatures.map((feature: string, idx: number) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-[#0a0a0a] rounded-2xl p-6 flex items-start gap-4 group"
              >
                <CheckCircle2 className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-white text-[15px] font-semibold mb-1">{feature}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* What You Get */}
      <section>
        <h3 className="text-[18px] font-bold text-[#0a0a0a] mb-4">What You Get</h3>
        <div className="bg-white rounded-2xl border border-black/10 p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
            {dynamicFiles.map((item) => (
              <div key={item} className="flex items-center gap-3 text-[14px] text-[#0a0a0a] font-medium">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* System Requirements */}
      <section>
        <h3 className="text-[18px] font-bold text-[#0a0a0a] mb-4">System Requirements</h3>
        <ul className="list-disc list-inside text-[14px] text-[rgba(10,10,10,0.6)] space-y-2">
          <li>VS Code Editor (Recommended)</li>
          <li>Node.js / Python / PHP (depending on stack)</li>
          <li>Database Server (if applicable)</li>
          <li>Windows / Linux / macOS</li>
        </ul>
      </section>

    </div>
  );
}
