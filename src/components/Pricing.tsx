
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import PricingPlanCard from "./PricingPlanCard";
import PricingComparisonTable from "./PricingComparisonTable";
import PricingBillingToggle from "./PricingBillingToggle";

const Pricing = () => {
  const { t } = useLanguage();
  const [yearly, setYearly] = useState(false);

  const toggleBilling = () => setYearly((prev) => !prev);

  const pricingPlans = [
    {
      title: t("pricing.free.title"),
      price: t("pricing.free.price"),
      description: t("pricing.free.description"),
      features: [
        `3 ${t("compare.teamMembers")}`,
        `${t("compare.leadSources.free")} ${t("compare.leadSources")}`,
        `${t("compare.leadAlerts.free")} ${t("compare.leadAlerts")}`,
        `${t("compare.templates.free")} ${t("compare.templates")}`,
        `${t("compare.leadEngagement.free")} ${t("compare.leadEngagement")}`,
      ],
      cta: t("pricing.free.cta"),
      highlight: false,
      plan: "free",
    },
    {
      title: t("pricing.pro.title"),
      price: yearly ? t("pricing.pro.yearlyPrice") : t("pricing.pro.price"),
      period: t("pricing.pro.period"),
      yearDiscount: yearly ? t("pricing.pro.yearDiscount") : null,
      description: t("pricing.pro.description"),
      features: [
        `${t("compare.teamMembers.pro")} ${t("compare.teamMembers")}`,
        `${t("compare.leadSources.pro")} ${t("compare.leadSources")}`,
        `${t("compare.leadAlerts.pro")} ${t("compare.leadAlerts")}`,
        `${t("compare.templates.pro")} ${t("compare.templates")}`,
        `${t("compare.leadEngagement.pro")} ${t("compare.leadEngagement")}`,
        `${t("compare.aiParsing")}`,
      ],
      cta: t("pricing.pro.cta"),
      highlight: true,
      trial: "14-day free trial",
      plan: "pro",
    },
    {
      title: t("pricing.ultimate.title"),
      price: t("pricing.ultimate.price"),
      description: t("pricing.ultimate.description"),
      features: [
        `${t("compare.teamMembers.ultimate")} ${t("compare.teamMembers")}`,
        `${t("compare.leadSources.ultimate")} ${t("compare.leadSources")}`,
        `${t("compare.leadAlerts.ultimate")} ${t("compare.leadAlerts")}`,
        `${t("compare.templates.ultimate")} ${t("compare.templates")}`,
        `${t("compare.leadEngagement.ultimate")} ${t("compare.leadEngagement")}`,
        `${t("compare.aiParsing")}`,
        `${t("compare.customBranding")}`,
        `${t("compare.advancedTeam")}`,
      ],
      cta: t("pricing.ultimate.cta"),
      highlight: false,
      plan: "ultimate",
    },
  ];

  const comparisonFeatures = [
    {
      name: t("compare.teamMembers"),
      free: t("compare.teamMembers.free"),
      pro: t("compare.teamMembers.pro"),
      ultimate: t("compare.teamMembers.ultimate"),
    },
    {
      name: t("compare.leadSources"),
      free: t("compare.leadSources.free"),
      pro: t("compare.leadSources.pro"),
      ultimate: t("compare.leadSources.ultimate"),
    },
    {
      name: t("compare.leadAlerts"),
      free: t("compare.leadAlerts.free"),
      pro: t("compare.leadAlerts.pro"),
      ultimate: t("compare.leadAlerts.ultimate"),
    },
    {
      name: t("compare.templates"),
      free: t("compare.templates.free"),
      pro: t("compare.templates.pro"),
      ultimate: t("compare.templates.ultimate"),
    },
    {
      name: t("compare.leadEngagement"),
      free: t("compare.leadEngagement.free"),
      pro: t("compare.leadEngagement.pro"),
      ultimate: t("compare.leadEngagement.ultimate"),
    },
    {
      name: t("compare.aiParsing"),
      free: false,
      pro: true,
      ultimate: true,
    },
    {
      name: t("compare.customBranding"),
      free: false,
      pro: false,
      ultimate: true,
    },
    {
      name: t("compare.advancedTeam"),
      free: false,
      pro: false,
      ultimate: true,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-leadly-soft-gray font-sans text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-extrabold mb-4 gradient-text inline-block tracking-tight leading-tight">
            {t("pricing.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 font-normal">
            {t("pricing.subtitle")}
          </p>
          <PricingBillingToggle yearly={yearly} toggleBilling={toggleBilling} t={t} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {pricingPlans.map((plan, idx) => (
            <PricingPlanCard plan={plan} key={idx} />
          ))}
        </div>
        <PricingComparisonTable comparisonFeatures={comparisonFeatures} t={t} />
      </div>
    </section>
  );
};

export default Pricing;

