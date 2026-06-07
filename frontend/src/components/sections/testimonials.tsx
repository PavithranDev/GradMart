"use client";

// removed motion import
import { Star } from "lucide-react";

const REVIEWS = [
  { name: "Rahul S.", role: "Computer Science Student", text: "The AI Attendance system was perfectly documented. Saved me months of work for my final semester." },
  { name: "Priya M.", role: "IT Student", text: "GradMart is a lifesaver! The PPT and project report templates were exactly what my professor wanted." },
  { name: "Amit K.", role: "Electronics Engineering", text: "Purchased the IoT Smart Farming project. The hardware setup guide was incredibly detailed." },
  { name: "Neha R.", role: "Software Engineering", text: "Excellent code quality. The MERN stack library project helped me learn while completing my requirements." },
  { name: "Vikram T.", role: "BCA Student", text: "Customer support is top notch. They helped me set up the database in 10 minutes." },
  { name: "Sneha P.", role: "MCA Student", text: "Worth every penny. The premium quality is evident in the UI design and code structure." },
];

export function Testimonials() {
  // Duplicate array for infinite scroll effect
  const marqueeReviews = [...REVIEWS, ...REVIEWS];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Loved by <span className="font-serif italic text-accent-pink font-normal">Students</span>
        </h2>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Don&apos;t just take our word for it. Here is what students across the country have to say.
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee flex gap-6 px-3 py-4 w-max" style={{ "--duration": "40s" } as React.CSSProperties}>
          {marqueeReviews.map((review, index) => (
            <div 
              key={index} 
              className="bg-neutral-50 border border-neutral-100 rounded-2xl p-8 w-[350px] md:w-[450px] flex-shrink-0 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-4 text-yellow-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-foreground text-lg mb-6 leading-relaxed">&quot;{review.text}&quot;</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent-pink/20 flex items-center justify-center text-accent-pink font-bold">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{review.name}</h4>
                  <p className="text-sm text-muted">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Gradients for smooth fade effect at edges */}
        <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
