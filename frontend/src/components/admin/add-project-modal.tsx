"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, UploadCloud, Plus, ChevronRight, ChevronLeft, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  // If editing an existing project, pass it here
  initialData?: any;
}

const STEPS = [
  "Basics",
  "Uploads",
  "Pricing",
  "SEO",
  "Preview",
  "Publish"
];

export function AddProjectModal({ isOpen, onClose, initialData }: AddProjectModalProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    category: initialData?.category || "AI & Machine Learning",
    description: initialData?.description || "",
    tags: initialData?.tags?.join(', ') || "",
    
    // Uploads (mock strings for UI)
    thumbnail: initialData?.thumbnail || "",
    zipUrl: initialData?.zipUrl || "",
    driveUrl: initialData?.driveUrl || "",
    pdfUrl: initialData?.pdfUrl || "",
    pptUrl: initialData?.pptUrl || "",
    sqlUrl: initialData?.sqlUrl || "",
    readmeUrl: initialData?.readmeUrl || "",
    
    // Pricing
    isFree: initialData ? initialData.price === 0 : false,
    price: initialData?.price || "",
    discount: initialData?.discount || "",
    couponSupport: false,
    
    // SEO
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    keywords: initialData?.keywords?.join(', ') || "",
  });

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData(prev => ({ ...prev, title, slug: prev.slug ? prev.slug : generateSlug(title) }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 6) {
      nextStep();
      return;
    }

    setIsSubmitting(true);
    
    try {
      const payload = {
        title: formData.title,
        slug: formData.slug || generateSlug(formData.title),
        category: formData.category,
        description: formData.description,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        price: formData.isFree ? 0 : Number(formData.price),
        discount: Number(formData.discount) || 0,
        metaTitle: formData.metaTitle,
        metaDescription: formData.metaDescription,
        keywords: formData.keywords.split(',').map(t => t.trim()).filter(Boolean),
        status: "Published",
        imageColor: "#" + Math.floor(Math.random()*16777215).toString(16),
        driveUrl: formData.driveUrl || null,
        zipUrl: formData.zipUrl || null,
      };

      const url = initialData 
        ? `http://localhost:4000/api/admin/project/${initialData.id}` 
        : `http://localhost:4000/api/admin/project`;
        
      const method = initialData ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include"
      });

      if (!res.ok) throw new Error("Failed to save project");
      
      toast.success(initialData ? "Project updated!" : "Project created successfully!");
      onClose();
      window.location.reload(); 
    } catch (err) {
      console.error(err);
      toast.error("Failed to save project");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0a0a0a]/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Header with Stepper */}
            <div className="p-6 border-b border-black/5 bg-[#f5f4ef]/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[20px] font-bold text-[#0a0a0a]">
                  {initialData ? "Edit Project" : "Add New Project"}
                </h2>
                <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-white rounded-full border border-black/10 hover:bg-black/5 transition-colors">
                  <X className="w-4 h-4 text-[#0a0a0a]" />
                </button>
              </div>

              <div className="flex items-center justify-between relative">
                <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-black/5 -z-10" />
                {STEPS.map((s, i) => {
                  const num = i + 1;
                  const isActive = step === num;
                  const isPast = step > num;
                  return (
                    <div key={s} className="flex flex-col items-center gap-2 bg-[#f5f4ef]/50 px-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold transition-colors ${isActive ? 'bg-[#0a0a0a] text-white ring-4 ring-[#0a0a0a]/10' : isPast ? 'bg-green-500 text-white' : 'bg-white text-black/40 border border-black/10'}`}>
                        {isPast ? <Check className="w-4 h-4" /> : num}
                      </div>
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${isActive ? 'text-[#0a0a0a]' : 'text-black/40'}`}>{s}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form Content */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              <form id="project-wizard-form" onSubmit={handleSubmit} className="h-full">
                
                {/* STEP 1: BASICS */}
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Project Title</label>
                        <input type="text" required placeholder="e.g. AI Attendance System" value={formData.title} onChange={handleTitleChange} className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] text-[#0a0a0a] placeholder:text-[rgba(10,10,10,0.4)] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                      </div>
                      <div>
                        <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">URL Slug</label>
                        <input type="text" required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] text-[#0a0a0a] placeholder:text-[rgba(10,10,10,0.4)] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Category</label>
                      <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]">
                        <option>AI & Machine Learning</option>
                        <option>MERN Stack</option>
                        <option>Internet of Things</option>
                        <option>Mobile Apps</option>
                        <option>Java</option>
                        <option>Blockchain</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Technology Stack (Comma separated)</label>
                      <input type="text" required placeholder="React, Node.js, Python" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] text-[#0a0a0a] placeholder:text-[rgba(10,10,10,0.4)] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Description</label>
                      <textarea rows={4} required placeholder="Detailed project description..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] text-[#0a0a0a] placeholder:text-[rgba(10,10,10,0.4)] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: UPLOADS */}
                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <p className="text-[14px] text-black/60 mb-2">Upload your project files or provide external links.</p>
                    
                    <div className="mb-6 p-4 bg-[#f5f4ef] rounded-2xl border border-black/5">
                      <h4 className="text-[13px] font-bold text-[#0a0a0a] mb-3">Source Code Delivery Method</h4>
                      <div className="flex gap-4 mb-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="sourceCodeType" checked={!formData.driveUrl && formData.zipUrl !== undefined} onChange={() => setFormData({...formData, driveUrl: "", zipUrl: "dummy.zip"})} className="accent-[#0a0a0a]" />
                          <span className="text-[14px] font-medium text-[#0a0a0a]">Upload ZIP File</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="sourceCodeType" checked={!!formData.driveUrl} onChange={() => setFormData({...formData, driveUrl: "https://drive.google.com/...", zipUrl: ""})} className="accent-[#0a0a0a]" />
                          <span className="text-[14px] font-medium text-[#0a0a0a]">Google Drive Link</span>
                        </label>
                      </div>

                      {!!formData.driveUrl ? (
                        <div>
                          <input type="url" placeholder="https://drive.google.com/..." value={formData.driveUrl} onChange={e => setFormData({...formData, driveUrl: e.target.value})} className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-[14px] text-[#0a0a0a] placeholder:text-[rgba(10,10,10,0.4)] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-black/10 bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer group h-24">
                          <UploadCloud className="w-6 h-6 text-black/40 group-hover:text-blue-500 mb-2" />
                          <span className="text-[12px] font-bold text-[#0a0a0a] mb-1">Source Code (ZIP)</span>
                          <input type="file" accept=".zip" className="hidden" />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { label: "Thumbnail Image", type: "image/*" },
                        { label: "Gallery Images", type: "image/*", multiple: true },
                        { label: "Project Report (PDF/DOCX)", type: ".pdf,.docx" },
                        { label: "Presentation (PPT)", type: ".ppt,.pptx" },
                        { label: "Database (SQL)", type: ".sql" },
                        { label: "Setup Guide (README)", type: ".md,.txt" },
                      ].map((upload, i) => (
                        <div key={i} className="border-2 border-dashed border-black/10 rounded-2xl p-4 flex flex-col items-center justify-center text-center hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer group h-32">
                          <UploadCloud className="w-6 h-6 text-black/40 group-hover:text-blue-500 mb-2" />
                          <span className="text-[12px] font-bold text-[#0a0a0a] mb-1">{upload.label}</span>
                          <input type="file" accept={upload.type} multiple={upload.multiple} className="hidden" />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: PRICING */}
                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-[#f5f4ef] rounded-xl border border-black/5">
                      <input type="checkbox" id="isFree" checked={formData.isFree} onChange={e => setFormData({...formData, isFree: e.target.checked})} className="w-5 h-5 accent-[#0a0a0a]" />
                      <label htmlFor="isFree" className="text-[15px] font-bold text-[#0a0a0a] cursor-pointer">This project is completely FREE</label>
                    </div>

                    {!formData.isFree && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Price (₹)</label>
                          <input type="number" required placeholder="2499" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] text-[#0a0a0a] placeholder:text-[rgba(10,10,10,0.4)] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                        </div>
                        <div>
                          <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Discount Percentage (%)</label>
                          <input type="number" placeholder="10" value={formData.discount} onChange={e => setFormData({...formData, discount: e.target.value})} className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] text-[#0a0a0a] placeholder:text-[rgba(10,10,10,0.4)] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                        </div>
                        <div className="md:col-span-2">
                          <div className="flex items-center gap-3">
                            <input type="checkbox" id="coupon" checked={formData.couponSupport} onChange={e => setFormData({...formData, couponSupport: e.target.checked})} className="w-4 h-4 accent-[#0a0a0a]" />
                            <label htmlFor="coupon" className="text-[14px] font-medium text-[#0a0a0a]">Enable Coupon Support for this item</label>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* STEP 4: SEO */}
                {step === 4 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div>
                      <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Meta Title</label>
                      <input type="text" placeholder="SEO Title (defaults to Project Title)" value={formData.metaTitle} onChange={e => setFormData({...formData, metaTitle: e.target.value})} className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] text-[#0a0a0a] placeholder:text-[rgba(10,10,10,0.4)] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Meta Description</label>
                      <textarea rows={3} placeholder="Brief description for search engines..." value={formData.metaDescription} onChange={e => setFormData({...formData, metaDescription: e.target.value})} className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] text-[#0a0a0a] placeholder:text-[rgba(10,10,10,0.4)] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                    </div>
                    <div>
                      <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Keywords (Comma separated)</label>
                      <input type="text" placeholder="project, college, react, nodejs" value={formData.keywords} onChange={e => setFormData({...formData, keywords: e.target.value})} className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] text-[#0a0a0a] placeholder:text-[rgba(10,10,10,0.4)] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                    </div>
                  </motion.div>
                )}

                {/* STEP 5: PREVIEW */}
                {step === 5 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                    <div className="bg-[#f5f4ef] rounded-2xl p-6 border border-black/5">
                      <h3 className="text-2xl font-bold text-[#0a0a0a] mb-2">{formData.title || "Untitled Project"}</h3>
                      <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-[#0a0a0a] text-white text-[11px] font-bold uppercase tracking-widest rounded-full">{formData.category}</span>
                        <span className="text-[14px] font-bold text-green-600">{formData.isFree ? "FREE" : `₹${formData.price}`}</span>
                        {Number(formData.discount) > 0 && <span className="text-[12px] font-bold text-red-500">-{formData.discount}% OFF</span>}
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-[13px] font-bold text-black/50 uppercase tracking-wider mb-1">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {formData.tags.split(',').map((t, i) => t.trim() ? <span key={i} className="px-2 py-1 bg-black/5 rounded-md text-[12px] font-medium">{t.trim()}</span> : null)}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[13px] font-bold text-black/50 uppercase tracking-wider mb-1">Description snippet</h4>
                        <p className="text-[14px] text-black/80 line-clamp-3">{formData.description || "No description provided."}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* STEP 6: PUBLISH */}
                {step === 6 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                      <Check className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0a0a0a] mb-2">Ready to Publish</h3>
                    <p className="text-[15px] text-black/60 max-w-md mx-auto mb-8">
                      Your project setup is complete. Click publish below to make it live on the marketplace instantly.
                    </p>
                  </motion.div>
                )}

              </form>
            </div>

            {/* Footer Navigation */}
            <div className="p-6 border-t border-black/5 flex justify-between bg-[#f5f4ef]/50">
              <button 
                type="button" 
                onClick={step === 1 ? onClose : prevStep}
                className="px-6 py-3 rounded-xl text-[14px] font-bold text-[#0a0a0a] hover:bg-black/5 transition-colors flex items-center gap-2"
              >
                {step === 1 ? "Cancel" : <><ChevronLeft className="w-4 h-4" /> Back</>}
              </button>

              <button 
                type="submit" 
                form="project-wizard-form"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl text-[14px] font-bold text-white bg-[#0a0a0a] hover:bg-neutral-800 transition-colors shadow-lg flex items-center gap-2 disabled:opacity-70"
              >
                {step === 6 ? (isSubmitting ? "Publishing..." : "Publish Project") : <>Next Step <ChevronRight className="w-4 h-4" /></>}
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
