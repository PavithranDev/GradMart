"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

// ... existing schema ...
const registerSchema = z.object({
  fullName: z.string().min(2, "Full Name is required."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(10, "Phone number must be at least 10 digits."),
  college: z.string().min(2, "College name is required."),
  department: z.string().min(2, "Department is required."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and privacy policy.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const res = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: data.fullName,
          email: data.email,
          password: data.password,
          phone: data.phone,
          college: data.college,
          department: data.department
        })
      });

      if (!res.ok) {
        const error = await res.json();
        toast.error(error.error || "Registration failed");
        return;
      }

      toast.success("Account created successfully!");
      router.push(`/login${redirectUrl !== '/dashboard' ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`);
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-lg mx-auto"
    >
      <div className="mb-8 text-center lg:text-left">
        <h2 className="text-3xl font-bold text-[#0a0a0a] mb-2">Create Your Account</h2>
        <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">Join GradMart and get access to premium projects.</p>
      </div>

      <div className="bg-white p-6 sm:p-8 rounded-[24px] shadow-sm border border-black/5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          <div>
            <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Full Name</label>
            <input 
              {...register("fullName")}
              type="text" 
              placeholder="John Doe" 
              className={`w-full bg-[#f5f4ef]/50 border ${errors.fullName ? 'border-red-500' : 'border-black/10'} rounded-xl px-4 py-3 text-[#0a0a0a] text-[14px] placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] transition-all`}
            />
            {errors.fullName && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.fullName.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Email Address</label>
              <input 
                {...register("email")}
                type="email" 
                placeholder="name@example.com" 
                className={`w-full bg-[#f5f4ef]/50 border ${errors.email ? 'border-red-500' : 'border-black/10'} rounded-xl px-4 py-3 text-[#0a0a0a] text-[14px] placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] transition-all`}
              />
              {errors.email && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Phone Number</label>
              <input 
                {...register("phone")}
                type="tel" 
                placeholder="+91 9876543210" 
                className={`w-full bg-[#f5f4ef]/50 border ${errors.phone ? 'border-red-500' : 'border-black/10'} rounded-xl px-4 py-3 text-[#0a0a0a] text-[14px] placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] transition-all`}
              />
              {errors.phone && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">College Name</label>
              <input 
                {...register("college")}
                type="text" 
                placeholder="MIT / IIT" 
                className={`w-full bg-[#f5f4ef]/50 border ${errors.college ? 'border-red-500' : 'border-black/10'} rounded-xl px-4 py-3 text-[#0a0a0a] text-[14px] placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] transition-all`}
              />
              {errors.college && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.college.message}</p>}
            </div>
            <div>
              <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Department</label>
              <input 
                {...register("department")}
                type="text" 
                placeholder="Computer Science" 
                className={`w-full bg-[#f5f4ef]/50 border ${errors.department ? 'border-red-500' : 'border-black/10'} rounded-xl px-4 py-3 text-[#0a0a0a] text-[14px] placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] transition-all`}
              />
              {errors.department && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.department.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Password</label>
              <input 
                {...register("password")}
                type="password" 
                placeholder="••••••••" 
                className={`w-full bg-[#f5f4ef]/50 border ${errors.password ? 'border-red-500' : 'border-black/10'} rounded-xl px-4 py-3 text-[#0a0a0a] text-[14px] placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] transition-all`}
              />
              {errors.password && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.password.message}</p>}
            </div>
            <div>
              <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Confirm Password</label>
              <input 
                {...register("confirmPassword")}
                type="password" 
                placeholder="••••••••" 
                className={`w-full bg-[#f5f4ef]/50 border ${errors.confirmPassword ? 'border-red-500' : 'border-black/10'} rounded-xl px-4 py-3 text-[#0a0a0a] text-[14px] placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] transition-all`}
              />
              {errors.confirmPassword && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input type="checkbox" {...register("terms")} className="mt-1 w-4 h-4 rounded border-black/20 text-[#0a0a0a] focus:ring-[#0a0a0a]" />
              <span className="text-[13px] font-medium text-[rgba(10,10,10,0.6)] leading-tight">
                I agree to the <Link href="/terms" className="text-[#0a0a0a] font-bold hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#0a0a0a] font-bold hover:underline">Privacy Policy</Link>
              </span>
            </label>
            {errors.terms && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.terms.message}</p>}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#0a0a0a] text-white py-3.5 rounded-xl font-bold text-[14px] hover:bg-neutral-800 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
          </button>
        </form>

        <button className="mt-4 w-full bg-[#f5f4ef] text-[#0a0a0a] py-3.5 rounded-xl font-bold text-[14px] hover:bg-[#0a0a0a] hover:text-white transition-colors flex items-center justify-center gap-3 group">
          <svg className="w-5 h-5 bg-white rounded-full p-0.5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google Sign Up
        </button>
      </div>

      <div className="mt-8 text-center text-[13px] font-medium text-[rgba(10,10,10,0.6)]">
        Already have an account?{" "}
        <Link href={`/login${redirectUrl !== '/dashboard' ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`} className="font-bold text-[#0a0a0a] hover:underline">
          Log In
        </Link>
      </div>
    </motion.div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-black/20" /></div>}>
      <RegisterForm />
    </Suspense>
  );
}
