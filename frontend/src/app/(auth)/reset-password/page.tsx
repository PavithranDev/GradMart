"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const resetPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters."),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    // Simulate API Call for Password Update
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Password updated successfully");
    setIsSuccess(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#0a0a0a] mb-2">Create New Password</h2>
              <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">
                Your new password must be different from previous used passwords.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[24px] shadow-sm border border-black/5">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                
                <div>
                  <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">New Password</label>
                  <input 
                    {...register("password")}
                    type="password" 
                    placeholder="••••••••" 
                    className={`w-full bg-[#f5f4ef]/50 border ${errors.password ? 'border-red-500' : 'border-black/10'} rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] transition-all`}
                  />
                  {errors.password && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.password.message}</p>}
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Confirm New Password</label>
                  <input 
                    {...register("confirmPassword")}
                    type="password" 
                    placeholder="••••••••" 
                    className={`w-full bg-[#f5f4ef]/50 border ${errors.confirmPassword ? 'border-red-500' : 'border-black/10'} rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] transition-all`}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.confirmPassword.message}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#0a0a0a] text-white py-3.5 rounded-xl font-bold text-[14px] hover:bg-neutral-800 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Reset Password"}
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-10 rounded-[24px] shadow-sm border border-black/5 text-center flex flex-col items-center"
          >
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-2">Password Reset</h2>
            <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium mb-8">
              Your password has been successfully reset. Click below to log in magically.
            </p>
            <Link 
              href="/login"
              className="w-full bg-[#0a0a0a] text-white py-3.5 rounded-xl font-bold text-[14px] hover:bg-neutral-800 transition-all shadow-lg block"
            >
              Continue to Login
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
