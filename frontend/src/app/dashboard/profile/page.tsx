"use client";

import { useState } from "react";
import { Camera, ShieldCheck, Bell, Trash2, Save, KeyRound } from "lucide-react";

export default function ProfilePage() {
  const [profileCompletion] = useState(85);

  return (
    <div className="flex-1 lg:pl-10 pb-20 w-full mt-8 lg:mt-0">
      
      <div className="mb-10">
        <h1 className="text-[28px] font-bold text-[#0a0a0a] tracking-tight mb-2">My Profile</h1>
        <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">Manage your personal information, security, and preferences.</p>
      </div>

      {/* Profile Completion Widget */}
      <div className="bg-white border border-black/5 rounded-3xl p-6 mb-10 shadow-sm flex items-center justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-[14px] font-bold text-[#0a0a0a] mb-2">Profile Completion</h3>
          <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#6c3bff] rounded-full transition-all duration-1000" 
              style={{ width: `${profileCompletion}%` }} 
            />
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-bold text-[#0a0a0a] block leading-none">{profileCompletion}%</span>
          <span className="text-[12px] font-medium text-[rgba(10,10,10,0.5)]">Almost there!</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* General Information */}
          <div className="bg-white border border-black/5 rounded-3xl p-8 shadow-sm">
            <h2 className="text-[18px] font-bold text-[#0a0a0a] mb-6 border-b border-black/5 pb-4">Personal Information</h2>
            
            {/* Avatar Upload */}
            <div className="flex items-center gap-6 mb-8">
              <div className="relative">
                <div className="w-24 h-24 bg-[#f5f4ef] rounded-full border-4 border-white shadow-sm flex items-center justify-center overflow-hidden">
                  <span className="text-3xl font-bold text-[#0a0a0a]">JD</span>
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#0a0a0a] text-white rounded-full flex items-center justify-center shadow-md hover:bg-neutral-800 transition-colors">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-[#0a0a0a] mb-1">Profile Photo</h3>
                <p className="text-[13px] font-medium text-[rgba(10,10,10,0.5)] mb-3">Recommended size 400x400px</p>
                <button className="text-[13px] font-bold text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">Remove Photo</button>
              </div>
            </div>

            {/* Form Fields */}
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Full Name</label>
                  <input type="text" defaultValue="John Doe" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Phone Number</label>
                  <input type="tel" defaultValue="+91 9876543210" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Email Address</label>
                  <input type="email" defaultValue="john.doe@mit.edu" disabled className="w-full bg-black/5 border border-transparent rounded-xl px-4 py-3 text-[14px] text-[rgba(10,10,10,0.6)] cursor-not-allowed" />
                  <p className="text-[11px] font-medium text-[rgba(10,10,10,0.5)] mt-1.5 flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-green-500" /> Email verified</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <div className="md:col-span-2">
                  <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">College / University</label>
                  <input type="text" defaultValue="Massachusetts Institute of Technology" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Department</label>
                  <input type="text" defaultValue="Computer Science" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
                </div>
                <div>
                  <label className="block text-[13px] font-bold text-[#0a0a0a] mb-2">Academic Year</label>
                  <select className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]">
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option selected>4th Year (Final)</option>
                    <option>Graduated</option>
                  </select>
                </div>
              </div>

              <div className="pt-6 flex justify-end">
                <button type="button" className="bg-[#0a0a0a] text-white px-6 py-3 rounded-xl font-bold text-[14px] hover:bg-neutral-800 transition-colors shadow-lg flex items-center gap-2">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Right Column: Settings & Danger Zone */}
        <div className="space-y-6">
          
          {/* Security */}
          <div className="bg-white border border-black/5 rounded-3xl p-6 shadow-sm">
            <h2 className="text-[16px] font-bold text-[#0a0a0a] mb-6 flex items-center gap-2"><KeyRound className="w-4 h-4" /> Security</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] font-bold text-[rgba(10,10,10,0.6)] mb-1">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
              </div>
              <div>
                <label className="block text-[12px] font-bold text-[rgba(10,10,10,0.6)] mb-1">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a]" />
              </div>
              <button className="w-full bg-white border border-black/10 text-[#0a0a0a] px-4 py-2.5 rounded-lg font-bold text-[13px] hover:bg-black/5 transition-colors mt-2">
                Update Password
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white border border-black/5 rounded-3xl p-6 shadow-sm">
            <h2 className="text-[16px] font-bold text-[#0a0a0a] mb-6 flex items-center gap-2"><Bell className="w-4 h-4" /> Notifications</h2>
            <div className="space-y-5">
              <label className="flex items-start justify-between cursor-pointer group">
                <div>
                  <span className="block text-[13px] font-bold text-[#0a0a0a]">Email Updates</span>
                  <span className="block text-[11px] font-medium text-[rgba(10,10,10,0.5)] mt-0.5">Project updates & bug fixes</span>
                </div>
                <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 rounded border-black/20 text-[#0a0a0a] focus:ring-[#0a0a0a]" />
              </label>
              <label className="flex items-start justify-between cursor-pointer group">
                <div>
                  <span className="block text-[13px] font-bold text-[#0a0a0a]">Marketing</span>
                  <span className="block text-[11px] font-medium text-[rgba(10,10,10,0.5)] mt-0.5">Discounts and new releases</span>
                </div>
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-black/20 text-[#0a0a0a] focus:ring-[#0a0a0a]" />
              </label>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-50 border border-red-100 rounded-3xl p-6">
            <h2 className="text-[16px] font-bold text-red-600 mb-2">Danger Zone</h2>
            <p className="text-[12px] font-medium text-red-600/70 mb-6">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button className="w-full bg-red-100 text-red-600 border border-red-200 px-4 py-3 rounded-xl font-bold text-[13px] hover:bg-red-600 hover:text-white hover:border-red-600 transition-all flex items-center justify-center gap-2">
              <Trash2 className="w-4 h-4" /> Delete Account
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
