"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MonitorSmartphone, LayoutDashboard, FileSpreadsheet, Mail } from "lucide-react";

interface ProjectDetailsContentProps {
  project: any;
}

export function ProjectDetailsContent({ project }: ProjectDetailsContentProps) {
  const features = [
    { icon: MonitorSmartphone, title: "Face Recognition", desc: "Advanced AI face detection using OpenCV." },
    { icon: LayoutDashboard, title: "Admin Dashboard", desc: "Real-time attendance analytics and logs." },
    { icon: FileSpreadsheet, title: "Export Excel", desc: "One-click CSV/Excel report generation." },
    { icon: Mail, title: "Email Notification", desc: "Automated alerts for absentees." },
  ];

  return (
    <div className="flex flex-col gap-16">
      
      {/* Tech Stack */}
      <section>
        <h3 className="text-[18px] font-bold text-[#0a0a0a] mb-4">Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {["React", "Node.js", "Express", "MongoDB", "Python", "OpenCV", "TensorFlow"].map((tech) => (
            <span 
              key={tech} 
              className="px-4 py-1.5 bg-white text-[#0a0a0a] text-[13px] font-semibold rounded-full border border-black/10 shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Description */}
      <section>
        <h3 className="text-[18px] font-bold text-[#0a0a0a] mb-4">Project Description</h3>
        <div className="prose prose-sm text-[rgba(10,10,10,0.6)] leading-relaxed">
          <p className="mb-4">
            The {project.title} is a state-of-the-art solution designed to automate the process of tracking student attendance using facial recognition technology. It eliminates the manual effort of roll calls and prevents proxy attendance.
          </p>
          <h4 className="text-[15px] font-bold text-[#0a0a0a] mt-6 mb-2">Problem Statement</h4>
          <p className="mb-4">
            Traditional attendance systems are time-consuming and prone to human error or manipulation. Maintaining physical registers is inefficient for large classrooms.
          </p>
          <h4 className="text-[15px] font-bold text-[#0a0a0a] mt-6 mb-2">Solution Architecture</h4>
          <p>
            This project uses Python and OpenCV for the facial recognition engine, while the frontend is built with React for a seamless dashboard experience. The backend APIs are powered by Node.js and Express, storing attendance logs securely in MongoDB.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section>
        <h3 className="text-[18px] font-bold text-[#0a0a0a] mb-4">Core Features</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#0a0a0a] rounded-2xl p-6 flex flex-col gap-3 group"
            >
              <feature.icon className="w-6 h-6 text-white/50 group-hover:text-white transition-colors" />
              <div>
                <h4 className="text-white text-[15px] font-semibold mb-1">{feature.title}</h4>
                <p className="text-white/50 text-[13px] leading-relaxed">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* What You Get */}
      <section>
        <h3 className="text-[18px] font-bold text-[#0a0a0a] mb-4">What You Get</h3>
        <div className="bg-white rounded-2xl border border-black/10 p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
            {[
              "Source Code (.zip)", 
              "Project Report (.docx)", 
              "Presentation (.pptx)", 
              "README Document (.pdf)", 
              "Database Script (.sql)", 
              "Installation Guide"
            ].map((item) => (
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
          <li>VS Code Editor</li>
          <li>Node.js (v16 or higher)</li>
          <li>MongoDB (Local or Atlas)</li>
          <li>Python 3.8+</li>
          <li>Windows / Linux / macOS</li>
        </ul>
      </section>

    </div>
  );
}
