"use client";

import { Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex-1 w-full p-8 lg:p-12 overflow-y-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1 className="text-[28px] font-bold text-[#0a0a0a] tracking-tight mb-1">Settings</h1>
          <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">Manage your account preferences.</p>
        </div>
        <button className="bg-[#0a0a0a] text-white px-6 py-3 rounded-full font-bold text-[14px] hover:bg-neutral-800 transition-all shadow-lg flex items-center gap-2">
          <Save className="w-5 h-5" />
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-[24px] border border-black/5 shadow-sm p-8">
        <p className="text-[15px] font-medium text-[rgba(10,10,10,0.6)]">
          Settings configuration options will be implemented here in the upcoming phase.
        </p>
      </div>
    </div>
  );
}
