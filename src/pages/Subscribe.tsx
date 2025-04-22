
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
// Placeholder for Stripe logic

export default function Subscribe() {
  const [plan, setPlan] = useState<"free" | "pro" | "ultimate">("free");
  const navigate = useNavigate();

  function handleSubscribe(_plan: "free" | "pro" | "ultimate") {
    setPlan(_plan);
    // Placeholder Stripe redirect logic, implement edge function integration for real payment
    if (_plan === "free") {
      navigate("/dashboard");
    } else {
      alert("Upgrade flow coming soon. Please contact sales for early access.");
    }
  }

  return (
    <div className="max-w-md mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Choose Your Plan</h1>
      <div className="space-x-3 mb-4">
        <Button onClick={() => handleSubscribe("free")} className={plan === "free" ? "bg-leadly-purple" : ""}>Free</Button>
        <Button onClick={() => handleSubscribe("pro")} className={plan === "pro" ? "bg-leadly-purple" : ""}>Pro</Button>
        <Button onClick={() => handleSubscribe("ultimate")} className={plan === "ultimate" ? "bg-leadly-purple" : ""}>Ultimate</Button>
      </div>
      <div>
        <Button className="w-full" onClick={() => handleSubscribe(plan)}>
          {plan === "free" ? "Continue with Free" : `Upgrade to ${plan.charAt(0).toUpperCase() + plan.slice(1)}`}
        </Button>
      </div>
    </div>
  );
}
