
import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PricingPlan {
  title: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlight: boolean;
  period?: string;
  yearDiscount?: string | null;
  trial?: string;
  plan: string;
}

interface PricingPlanCardProps {
  plan: PricingPlan;
}

const PricingPlanCard: React.FC<PricingPlanCardProps> = ({ plan }) => {
  const navigate = useNavigate();
  const handlePricingClick = () => {
    navigate(`/auth?plan=${plan.plan}`);
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-sm p-8 border transition-all relative ${
        plan.highlight
          ? "border-leadly-purple transform md:-translate-y-4 shadow-lg ring-2 ring-leadly-purple"
          : "border-gray-200"
      }`}
    >
      {plan.highlight && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-leadly-purple text-white text-sm font-semibold py-1 px-3 rounded-full shadow-md">
          Most Popular
        </div>
      )}
      <h3 className="text-2xl font-bold mb-2 font-serif">{plan.title}</h3>
      <div className="mb-6">
        <span className="text-4xl font-extrabold">{plan.price}</span>
        {plan.period && (
          <span className="text-gray-500 ml-1">{plan.period}</span>
        )}
        {plan.yearDiscount && (
          <p className="text-sm text-leadly-purple font-medium mt-1">
            {plan.yearDiscount}
          </p>
        )}
      </div>
      <p className="text-gray-600 mb-6">{plan.description}</p>
      <ul className="mb-8 space-y-3">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start">
            <Check className="h-5 w-5 text-leadly-purple flex-shrink-0 mr-2" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      <Button
        className={`w-full ${
          plan.highlight
            ? "bg-gradient-to-r from-leadly-purple via-leadly-dark-purple to-leadly-purple text-white shadow-lg hover:scale-105 hover:shadow-xl transition"
            : "bg-white text-leadly-purple border border-leadly-purple hover:bg-leadly-purple/10 hover:scale-105 transition"
        } rounded-lg`}
        variant={plan.highlight ? "default" : "outline"}
        onClick={handlePricingClick}
        size="lg"
      >
        {plan.cta}
      </Button>
      {plan.trial && (
        <p className="text-sm text-center text-gray-500 mt-3">{plan.trial}</p>
      )}
    </div>
  );
};

export default PricingPlanCard;
