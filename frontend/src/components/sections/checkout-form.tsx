"use client";

import { useState } from "react";
import { PaymentSuccessOverlay } from "../ui/payment-success-overlay";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const PAYMENT_METHODS = [
  { id: "razorpay", name: "Razorpay" },
  { id: "upi", name: "UPI / QR Code" },
  { id: "card", name: "Credit / Debit Card" },
  { id: "netbanking", name: "Net Banking" },
  { id: "wallet", name: "Wallets" },
];

export function CheckoutForm({ project }: { project: any }) {
  const [selectedMethod, setSelectedMethod] = useState("razorpay");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  if (!project) return null;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'}`}/api/purchases`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ projectId: project.id }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to process purchase");
      }

      // Show success overlay for a moment before redirecting
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);

    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <form onSubmit={handleCheckout} className="p-8 lg:p-12 w-full h-full flex flex-col justify-center">
        
        {/* Customer Details */}
        <h2 className="text-[18px] font-bold text-[#0a0a0a] mb-6">Customer Details</h2>
        <div className="space-y-4 mb-10">
          <div>
            <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Full Name</label>
            <input type="text" required placeholder="John Doe" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] focus:border-transparent transition-all" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Email Address</label>
              <input type="email" required placeholder="john@example.com" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] focus:border-transparent transition-all" />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-[#0a0a0a] mb-1.5">Phone Number</label>
              <input type="tel" required placeholder="+91 98765 43210" className="w-full bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] focus:border-transparent transition-all" />
            </div>
          </div>
        </div>

        {/* Coupon */}
        <h2 className="text-[18px] font-bold text-[#0a0a0a] mb-6">Have a Coupon?</h2>
        <div className="flex gap-2 mb-10">
          <input type="text" placeholder="Enter coupon code" className="flex-1 bg-[#f5f4ef]/50 border border-black/10 rounded-xl px-4 py-3 text-[14px] text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#0a0a0a] focus:border-transparent transition-all uppercase" />
          <button type="button" className="px-6 bg-[#f5f4ef] text-[#0a0a0a] font-bold text-[13px] rounded-xl hover:bg-neutral-200 transition-colors border border-black/5">Apply</button>
        </div>

        {/* Payment Methods */}
        <h2 className="text-[18px] font-bold text-[#0a0a0a] mb-6">Payment Method</h2>
        <div className="grid grid-cols-2 gap-3 mb-10">
          {PAYMENT_METHODS.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => setSelectedMethod(method.id)}
              className={`p-4 rounded-xl text-left border transition-all ${
                selectedMethod === method.id 
                  ? "border-[#0a0a0a] bg-[#0a0a0a]/5 shadow-sm" 
                  : "border-black/10 bg-white hover:border-black/30"
              }`}
            >
               <div className="flex items-center gap-3">
                 <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedMethod === method.id ? 'border-[#0a0a0a]' : 'border-black/30'}`}>
                    {selectedMethod === method.id && <div className="w-2 h-2 rounded-full bg-[#0a0a0a]" />}
                 </div>
                 <span className="text-[14px] font-bold text-[#0a0a0a]">{method.name}</span>
               </div>
            </button>
          ))}
        </div>

        {/* Payment Summary */}
        <h2 className="text-[18px] font-bold text-[#0a0a0a] mb-6">Payment Summary</h2>
        <div className="bg-[#f5f4ef] rounded-2xl p-6 mb-8 space-y-3">
          <div className="flex justify-between text-[14px] font-medium text-[rgba(10,10,10,0.7)]">
            <span>Subtotal</span>
            <span>{project.price === 0 ? "₹0" : `₹${project.price}`}</span>
          </div>
          <div className="flex justify-between text-[14px] font-medium text-green-600">
            <span>Discount</span>
            <span>- ₹0</span>
          </div>
          <hr className="border-black/10 my-3" />
          <div className="flex justify-between text-[18px] font-bold text-[#0a0a0a]">
            <span>Total</span>
            <span>{project.price === 0 ? "₹0" : `₹${project.price}`}</span>
          </div>
        </div>

        <button 
          type="submit"
          disabled={isProcessing}
          className="w-full bg-[#0a0a0a] text-white py-4 rounded-full font-bold text-[15px] hover:bg-neutral-800 transition-all hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isProcessing ? "Processing..." : "Complete Purchase"}
        </button>
      </form>

      <PaymentSuccessOverlay isOpen={isProcessing} />
    </>
  );
}
