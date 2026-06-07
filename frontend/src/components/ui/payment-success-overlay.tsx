"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface PaymentSuccessOverlayProps {
  isOpen: boolean;
}

export function PaymentSuccessOverlay({ isOpen }: PaymentSuccessOverlayProps) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      return;
    }

    // Simulate Payment Processing
    const timer1 = setTimeout(() => setStep(2), 2000);
    // Simulate Generating Link
    const timer2 = setTimeout(() => setStep(3), 4000);
    // Simulate Redirect
    const timer3 = setTimeout(() => {
      router.push("/dashboard");
    }, 6500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isOpen, router]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#f5f4ef]/90 backdrop-blur-xl"
          />

          {/* Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative z-10 bg-white w-full max-w-sm rounded-[32px] p-8 shadow-2xl flex flex-col items-center text-center border border-black/5"
          >
            <div className="w-20 h-20 relative flex items-center justify-center mb-6">
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute inset-0"
                >
                  <div className="w-full h-full border-4 border-black/10 border-t-[#0a0a0a] rounded-full animate-spin" />
                </motion.div>
              )}
              {step >= 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full h-full bg-green-500 rounded-full flex items-center justify-center"
                >
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </motion.div>
              )}
            </div>

            <motion.h2 
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[20px] font-bold text-[#0a0a0a] mb-2"
            >
              {step === 1 ? "Processing Payment..." : step === 2 ? "Payment Successful!" : "Generating Download Links..."}
            </motion.h2>

            <p className="text-[14px] text-[rgba(10,10,10,0.5)] font-medium mb-8">
              {step === 1 ? "Please do not close this window." : step === 2 ? "Thank you for your purchase." : "Almost ready. Redirecting you momentarily."}
            </p>

            <div className="w-full h-1.5 bg-[#f5f4ef] rounded-full overflow-hidden relative">
              <motion.div
                className="absolute top-0 left-0 bottom-0 bg-[#0a0a0a]"
                initial={{ width: "0%" }}
                animate={{ width: step === 1 ? "30%" : step === 2 ? "60%" : "100%" }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />
            </div>
            
            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 flex items-center gap-2 text-[13px] font-bold text-[#0a0a0a]"
              >
                Redirecting to Dashboard <Loader2 className="w-3.5 h-3.5 animate-spin" />
              </motion.div>
            )}
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
