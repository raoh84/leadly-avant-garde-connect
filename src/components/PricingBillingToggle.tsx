
import React from "react";

interface PricingBillingToggleProps {
  yearly: boolean;
  toggleBilling: () => void;
  t: (key: string) => string;
}

const PricingBillingToggle: React.FC<PricingBillingToggleProps> = ({
  yearly,
  toggleBilling,
  t,
}) => (
  <div className="flex items-center justify-center mb-10">
    <span
      className={`text-sm font-medium mr-3 ${
        !yearly ? "text-leadly-purple" : "text-gray-500"
      }`}
    >
      {t("pricing.monthly")}
    </span>
    <button
      onClick={toggleBilling}
      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none ring-2 ring-leadly-purple/70 ${
        yearly ? "bg-leadly-purple" : "bg-gray-300"
      }`}
      aria-label="Toggle billing period"
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow ${
          yearly ? "translate-x-7" : "translate-x-1"
        }`}
      />
    </button>
    <span
      className={`text-sm font-medium ml-3 ${
        yearly ? "text-leadly-purple" : "text-gray-500"
      }`}
    >
      {t("pricing.yearly")}
    </span>
  </div>
);

export default PricingBillingToggle;
