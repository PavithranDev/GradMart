"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Save,
  Globe,
  ShieldCheck,
  Bell,
  Palette,
  Database,
  CreditCard,
  Mail,
  KeyRound,
  ToggleRight,
  ToggleLeft,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";

const SECTIONS = [
  { id: "general", label: "General", icon: Globe },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "email", label: "Email / SMTP", icon: Mail },
  { id: "database", label: "Database", icon: Database },
];

function Toggle({ defaultChecked = false }: { defaultChecked?: boolean }) {
  const [on, setOn] = useState(defaultChecked);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${on ? "bg-[#0a0a0a]" : "bg-black/15"}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${on ? "translate-x-5" : "translate-x-0"}`}
      />
    </button>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-black/5 rounded-3xl p-8 shadow-sm space-y-6">
      <h2 className="text-[18px] font-bold text-[#0a0a0a] pb-4 border-b border-black/5">{title}</h2>
      {children}
    </div>
  );
}

function Field({ label, description, children }: { label: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div className="flex-1">
        <p className="text-[14px] font-bold text-[#0a0a0a]">{label}</p>
        {description && <p className="text-[12px] text-[rgba(10,10,10,0.5)] font-medium mt-0.5">{description}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

export default function AdminSettingsPage() {
  const [activeSection, setActiveSection] = useState("general");
  const [siteName, setSiteName] = useState("GradMart");
  const [supportEmail, setSupportEmail] = useState("support@gradmart.in");
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="flex h-full gap-8 pb-10">

      {/* Left: Nav */}
      <div className="hidden lg:flex flex-col w-56 flex-shrink-0 gap-1 pt-1">
        {SECTIONS.map((s) => {
          const Icon = s.icon;
          const isActive = activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-[14px] font-bold transition-all text-left ${
                isActive
                  ? "bg-[#0a0a0a] text-white shadow-md"
                  : "text-[rgba(10,10,10,0.6)] hover:bg-black/5 hover:text-[#0a0a0a]"
              }`}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {s.label}
              {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
            </button>
          );
        })}
      </div>

      {/* Right: Content */}
      <div className="flex-1 space-y-6 overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-[28px] font-bold text-[#0a0a0a] tracking-tight">Admin Settings</h1>
            <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium mt-1">Configure your platform settings.</p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-[#0a0a0a] text-white px-6 py-3 rounded-2xl font-bold text-[14px] hover:bg-neutral-800 transition-colors shadow-lg"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>

        {/* Mobile Section Tabs */}
        <div className="flex lg:hidden gap-2 overflow-x-auto pb-2">
          {SECTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-bold whitespace-nowrap ${
                  activeSection === s.id ? "bg-[#0a0a0a] text-white" : "bg-black/5 text-[rgba(10,10,10,0.6)]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {s.label}
              </button>
            );
          })}
        </div>

        {/* General */}
        {activeSection === "general" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <SectionCard title="General Settings">
              <div>
                <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Platform Name</label>
                <input
                  value={siteName}
                  onChange={e => setSiteName(e.target.value)}
                  className="w-full bg-[#f5f4ef]/60 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]"
                />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Support Email</label>
                <input
                  value={supportEmail}
                  onChange={e => setSupportEmail(e.target.value)}
                  className="w-full bg-[#f5f4ef]/60 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]"
                />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Platform Tagline</label>
                <input
                  defaultValue="Premium Marketplace for Engineering Students"
                  className="w-full bg-[#f5f4ef]/60 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]"
                />
              </div>
              <Field label="Maintenance Mode" description="Show a maintenance page to all visitors">
                <Toggle defaultChecked={maintenanceMode} />
              </Field>
              <Field label="Allow New Registrations" description="Let new users create accounts">
                <Toggle defaultChecked={true} />
              </Field>
            </SectionCard>
          </motion.div>
        )}

        {/* Security */}
        {activeSection === "security" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <SectionCard title="Security Settings">
              <Field label="Two-Factor Authentication" description="Require 2FA for all admin accounts">
                <Toggle defaultChecked={false} />
              </Field>
              <Field label="Session Timeout" description="Automatically log out inactive admins">
                <select className="bg-[#f5f4ef]/60 border border-black/10 rounded-xl px-4 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]">
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option>4 hours</option>
                  <option>24 hours</option>
                </select>
              </Field>
              <Field label="IP Whitelist" description="Restrict admin panel to specific IPs">
                <Toggle defaultChecked={false} />
              </Field>
              <Field label="Force HTTPS" description="Redirect all HTTP traffic to HTTPS">
                <Toggle defaultChecked={true} />
              </Field>
              <div>
                <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Admin Password Policy</label>
                <select className="w-full bg-[#f5f4ef]/60 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]">
                  <option>Minimum 8 characters</option>
                  <option>Minimum 12 characters + special chars</option>
                  <option>Strong (16+ chars, upper, lower, number, symbol)</option>
                </select>
              </div>
            </SectionCard>
            <SectionCard title="API Keys">
              <div>
                <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Admin API Key</label>
                <div className="flex gap-3">
                  <input
                    type="password"
                    defaultValue="sk-admin-XXXXXXXXXXXXXXXXXXXXXX"
                    className="flex-1 bg-[#f5f4ef]/60 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]"
                  />
                  <button className="px-5 py-3 bg-black/5 border border-black/10 rounded-xl text-[13px] font-bold hover:bg-black/10 transition-colors flex items-center gap-2">
                    <KeyRound className="w-4 h-4" /> Regenerate
                  </button>
                </div>
              </div>
            </SectionCard>
          </motion.div>
        )}

        {/* Notifications */}
        {activeSection === "notifications" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <SectionCard title="Admin Notifications">
              <Field label="New Purchase Alert" description="Get notified when a user makes a purchase">
                <Toggle defaultChecked={true} />
              </Field>
              <Field label="New Registration Alert" description="Get notified when a new user registers">
                <Toggle defaultChecked={true} />
              </Field>
              <Field label="Withdrawal Requests" description="Alert when sellers request a withdrawal">
                <Toggle defaultChecked={true} />
              </Field>
              <Field label="Custom Project Submissions" description="Alert on new custom project requests">
                <Toggle defaultChecked={true} />
              </Field>
              <Field label="Support Tickets" description="Get notified on new support tickets">
                <Toggle defaultChecked={false} />
              </Field>
              <Field label="Low Stock / Sold Out Alert" description="When a project gets sold">
                <Toggle defaultChecked={true} />
              </Field>
            </SectionCard>
          </motion.div>
        )}

        {/* Appearance */}
        {activeSection === "appearance" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <SectionCard title="Appearance">
              <Field label="Dark Mode" description="Enable dark mode for the admin panel">
                <Toggle defaultChecked={false} />
              </Field>
              <Field label="Compact Sidebar" description="Start with sidebar collapsed by default">
                <Toggle defaultChecked={false} />
              </Field>
              <div>
                <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Accent Color</label>
                <div className="flex gap-3 flex-wrap">
                  {["#6c3bff", "#0a0a0a", "#3b82f6", "#10b981", "#ef4444", "#f59e0b"].map((color) => (
                    <button
                      key={color}
                      className="w-9 h-9 rounded-full border-4 border-white shadow-md hover:scale-110 transition-transform"
                      style={{ background: color }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Font Size</label>
                <select className="w-full bg-[#f5f4ef]/60 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]">
                  <option>Small (13px)</option>
                  <option selected>Medium (14px)</option>
                  <option>Large (16px)</option>
                </select>
              </div>
            </SectionCard>
          </motion.div>
        )}

        {/* Payments */}
        {activeSection === "payments" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <SectionCard title="Payment Gateway">
              <div>
                <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Gateway</label>
                <select className="w-full bg-[#f5f4ef]/60 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]">
                  <option>Razorpay</option>
                  <option>Stripe</option>
                  <option>PayU</option>
                </select>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Razorpay Key ID</label>
                <input defaultValue="rzp_live_XXXXXXXXXXXXXX" type="password" className="w-full bg-[#f5f4ef]/60 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Razorpay Key Secret</label>
                <input defaultValue="rzp_secret_XXXXXXXXXXXXXX" type="password" className="w-full bg-[#f5f4ef]/60 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
              </div>
              <Field label="Test Mode" description="Enable Razorpay sandbox/test environment">
                <Toggle defaultChecked={true} />
              </Field>
              <div>
                <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Platform Commission (%)</label>
                <input type="number" defaultValue="20" className="w-full bg-[#f5f4ef]/60 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
              </div>
            </SectionCard>
          </motion.div>
        )}

        {/* Email */}
        {activeSection === "email" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <SectionCard title="SMTP Configuration">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">SMTP Host</label>
                  <input defaultValue="smtp.gmail.com" className="w-full bg-[#f5f4ef]/60 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Port</label>
                  <input defaultValue="587" className="w-full bg-[#f5f4ef]/60 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">SMTP Username</label>
                  <input defaultValue="noreply@gradmart.in" className="w-full bg-[#f5f4ef]/60 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">SMTP Password</label>
                  <input type="password" defaultValue="••••••••••••" className="w-full bg-[#f5f4ef]/60 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                </div>
              </div>
              <Field label="Enable TLS/SSL" description="Use secure connection for email">
                <Toggle defaultChecked={true} />
              </Field>
              <button className="bg-black/5 border border-black/10 text-[#0a0a0a] px-5 py-2.5 rounded-xl font-bold text-[13px] hover:bg-black/10 transition-colors flex items-center gap-2">
                <Mail className="w-4 h-4" /> Send Test Email
              </button>
            </SectionCard>
          </motion.div>
        )}

        {/* Database */}
        {activeSection === "database" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <SectionCard title="Database">
              <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl p-4">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <p className="text-[13px] font-bold text-green-700">Database connection is healthy</p>
              </div>
              <div>
                <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Connection String</label>
                <input type="password" defaultValue="postgresql://user:pass@host:5432/gradmart" className="w-full bg-[#f5f4ef]/60 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] font-mono text-[12px]" />
              </div>
              <Field label="Auto Backup" description="Automatically backup database daily">
                <Toggle defaultChecked={true} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-black/5 border border-black/10 text-[#0a0a0a] px-5 py-3 rounded-xl font-bold text-[13px] hover:bg-black/10 transition-colors flex items-center justify-center gap-2">
                  <Database className="w-4 h-4" /> Run Backup Now
                </button>
                <button className="bg-red-50 border border-red-200 text-red-600 px-5 py-3 rounded-xl font-bold text-[13px] hover:bg-red-100 transition-colors">
                  Clear Cache
                </button>
              </div>
            </SectionCard>
          </motion.div>
        )}

      </div>
    </div>
  );
}
