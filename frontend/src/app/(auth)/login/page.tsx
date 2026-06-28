"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useSession } from "@/lib/auth/AuthContext";
import { RedirectIfAuthenticated } from "@/components/redirect-if-authenticated";

import { Suspense } from "react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
  remember: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";
  const { updateSession } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      // 1. Get CSRF Token
      const csrfRes = await fetch("http://localhost:4000/api/auth/csrf", {
        credentials: "include",
      });
      const { csrfToken } = await csrfRes.json();

      // 2. Perform Login
      const res = await fetch("http://localhost:4000/api/auth/callback/credentials", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-Auth-Return-Redirect": "1",
        },
        credentials: "include",
        body: new URLSearchParams({
          csrfToken,
          email: data.email,
          password: data.password,
          redirect: "false",
        }),
      });

      const result = await res.json();
      
      if (result.url && result.url.includes("error=")) {
        const urlObj = new URL(result.url);
        const errorMsg = urlObj.searchParams.get("error");
        
        if (errorMsg === "CredentialsSignin" || errorMsg === "Configuration") {
          toast.error("Invalid email or password");
        } else {
          toast.error(`Login failed: ${errorMsg}`);
        }
        return;
      }

      // 3. Wait a tick for cookie to be set, then fetch role
      await new Promise(resolve => setTimeout(resolve, 300));

      const userRes = await fetch("http://localhost:4000/api/user/me", {
        credentials: "include",
      });

      await updateSession();

      if (userRes.ok) {
        const user = await userRes.json();
        toast.success(`Welcome back, ${user.name || "User"}!`);
        if (user.role === "ADMIN") {
          window.location.href = "/admin";
        } else if (user.role === "SELLER") {
          window.location.href = "/seller";
        } else {
          window.location.href = redirectUrl;
        }
      } else {
        toast.success("Welcome back!");
        window.location.href = redirectUrl;
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to connect to the server");
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full"
    >
      <div className="mb-8 text-center lg:text-left">
        <h2 className="text-3xl font-bold text-[#0a0a0a] mb-2">Welcome Back</h2>
        <p className="text-[14px] text-[rgba(10,10,10,0.6)] font-medium">Access your purchased projects and downloads.</p>
      </div>

      <div className="bg-white p-8 rounded-[24px] shadow-sm border border-black/5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
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
            <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Password</label>
            <input 
              {...register("password")}
              type="password" 
              placeholder="••••••••" 
              className={`w-full bg-[#f5f4ef]/50 border ${errors.password ? 'border-red-500' : 'border-black/10'} rounded-xl px-4 py-3 text-[#0a0a0a] text-[14px] placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] transition-all`}
            />
            {errors.password && <p className="text-red-500 text-[12px] mt-1.5 font-medium">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" {...register("remember")} className="w-4 h-4 rounded border-black/20 text-[#0a0a0a] focus:ring-[#0a0a0a]" />
              <span className="text-[13px] font-medium text-[rgba(10,10,10,0.6)] group-hover:text-[#0a0a0a] transition-colors">Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-[13px] font-bold text-[#0a0a0a] hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#0a0a0a] text-white py-3.5 rounded-xl font-bold text-[14px] hover:bg-neutral-800 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 mt-4"
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Login"}
          </button>
        </form>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-black/5" />
          <span className="text-[12px] font-bold text-[rgba(10,10,10,0.4)] uppercase tracking-wider">OR</span>
          <div className="flex-1 h-px bg-black/5" />
        </div>

        <button className="mt-6 w-full bg-white text-[#0a0a0a] border border-black/10 py-3.5 rounded-xl font-bold text-[14px] hover:bg-black/5 transition-all flex items-center justify-center gap-3">
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>
      </div>

      <div className="mt-8 text-center text-[13px] font-medium text-[rgba(10,10,10,0.6)]">
        Don't have an account?{" "}
        <Link href={`/register${redirectUrl !== '/dashboard' ? `?redirect=${encodeURIComponent(redirectUrl)}` : ''}`} className="font-bold text-[#0a0a0a] hover:underline">
          Create Account
        </Link>
      </div>
    </motion.div>
  );
}

export default function LoginPage() {
  return (
    <>
      <RedirectIfAuthenticated />
      <Suspense fallback={<div className="flex items-center justify-center p-8"><Loader2 className="w-8 h-8 animate-spin text-black/20" /></div>}>
        <LoginForm />
      </Suspense>
    </>
  );
}
