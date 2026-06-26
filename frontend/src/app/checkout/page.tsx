import { Navbar } from "@/components/ui/navbar";
import { CheckoutSummary } from "@/components/sections/checkout-summary";
import { CheckoutForm } from "@/components/sections/checkout-form";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Secure Checkout | GradMart",
  description: "Complete your purchase securely.",
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: { projectId?: string };
}) {
  const projectId = searchParams.projectId;

  if (!projectId) {
    redirect("/projects");
  }

  let project = null;
  try {
    const res = await fetch(`http://localhost:4000/api/projects/${projectId}`, { cache: 'no-store' });
    if (res.ok) {
      project = await res.json();
    }
  } catch (error) {
    console.error("Error fetching project for checkout:", error);
  }

  if (!project) {
    redirect("/projects");
  }

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <div className="pt-6">
        <Navbar />
      </div>

      <div className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-12 pt-32 pb-20 flex flex-col lg:flex-row gap-8 lg:gap-0">
        
        {/* Left Column: Order Summary */}
        <div className="w-full lg:w-[45%] h-full min-h-[600px]">
          <CheckoutSummary project={project} />
        </div>

        {/* Right Column: Checkout Form */}
        <div className="w-full lg:w-[55%] h-full">
          <CheckoutForm project={project} />
        </div>

      </div>
    </main>
  );
}
