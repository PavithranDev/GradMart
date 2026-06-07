import { CheckCircle2, Lock } from "lucide-react";

export function CheckoutSummary() {
  return (
    <div className="bg-[#f5f4ef] rounded-3xl p-8 lg:p-12 w-full h-full flex flex-col justify-between">
      
      <div>
        <h2 className="text-[18px] font-bold text-[#0a0a0a] mb-6">Order Summary</h2>

        {/* Project Details */}
        <div className="flex gap-4 mb-8">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 shadow-md flex-shrink-0" />
          <div className="flex flex-col justify-center">
            <h3 className="text-[16px] font-bold text-[#0a0a0a] leading-tight mb-1">
              AI Smart Attendance System
            </h3>
            <p className="text-[13px] font-medium text-[rgba(10,10,10,0.6)] mb-2">
              React • Python • OpenCV
            </p>
            <div className="text-[18px] font-bold text-[#0a0a0a]">
              ₹499
            </div>
          </div>
        </div>

        <hr className="border-black/5 mb-8" />

        {/* What's Included */}
        <h3 className="text-[15px] font-bold text-[#0a0a0a] mb-4">Included in this package</h3>
        <div className="space-y-3 mb-12">
          {[
            "Complete Source Code (.zip)",
            "Detailed Project Report (.docx)",
            "Presentation Deck (.pptx)",
            "Database Schemas (.sql)",
            "Step-by-step Setup Guide (.pdf)"
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 text-[14px] text-[rgba(10,10,10,0.7)] font-medium">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badge */}
      <div className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-black/5">
        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
          <Lock className="w-5 h-5 text-green-600" />
        </div>
        <div>
           <h4 className="text-[13px] font-bold text-[#0a0a0a]">100% Secure Checkout</h4>
           <p className="text-[12px] text-[rgba(10,10,10,0.6)] font-medium mt-0.5 leading-relaxed">
             Your payment information is encrypted and securely processed by Razorpay.
           </p>
        </div>
      </div>

    </div>
  );
}
