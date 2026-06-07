"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, ArrowLeft, MailCheck } from "lucide-react";
import { useState } from "react";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    // Simulate API Call for Brevo OTP / Send Email
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Password Reset Link Sent To:", data.email);
    setIsSuccess(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <Link href="/login" className="inline-flex items-center gap-2 text-[13px] font-bold text-[rgba(10,10,10,0.5)] hover:text-[#0a0a0a] transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Login
      </Link>

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#0a0a0a] mb-2">Reset Password</h2>
              <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">
                Enter your email and we'll send you a link to reset your password.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[24px] shadow-sm border border-black/5">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Email Address</label>
                  <input 
                    {...register("email")}
                    type="email" 
                    placeholder="name@example.com" 
                    className={`w-full bg-[#f5f4ef]/50 border ${errors.email ? 'border-red-500' : 'border-black/10'} rounded-xl px-4 py-3 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] transition-all`}
                  />
                  {errors.email && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.email.message}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#0a0a0a] text-white py-3.5 rounded-xl font-bold text-[14px] hover:bg-neutral-800 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Send Reset Link"}
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
              <MailCheck className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-[#0a0a0a] mb-2">Check your email</h2>
            <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium mb-8">
              We've sent a password reset link to your email. Click the link to reset your password.
            </p>
            <button 
              onClick={() => setIsSuccess(false)}
              className="text-[13px] font-bold text-[#0a0a0a] hover:underline"
            >
              Didn't receive the email? Click to resend.
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
