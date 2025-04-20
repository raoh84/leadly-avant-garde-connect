import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import { Check, X } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Pricing = () => {
  const { t } = useLanguage();
  const [yearly, setYearly] = useState(false);
  const navigate = useNavigate();

  const toggleBilling = () => {
    setYearly(!yearly);
  };

  const handlePricingClick = (plan: string) => {
    navigate(`/auth?plan=${plan}`);
  };

  const pricingPlans = [
    {
      title: t('pricing.free.title'),
      price: t('pricing.free.price'),
      description: t('pricing.free.description'),
      features: [
        `3 ${t('compare.teamMembers')}`,
        `${t('compare.leadSources.free')} ${t('compare.leadSources')}`,
        `${t('compare.leadAlerts.free')} ${t('compare.leadAlerts')}`,
        `${t('compare.templates.free')} ${t('compare.templates')}`,
        `${t('compare.leadEngagement.free')} ${t('compare.leadEngagement')}`,
      ],
      cta: t('pricing.free.cta'),
      highlight: false,
      plan: 'free',
    },
    {
      title: t('pricing.pro.title'),
      price: yearly ? t('pricing.pro.yearlyPrice') : t('pricing.pro.price'),
      period: t('pricing.pro.period'),
      yearDiscount: yearly ? t('pricing.pro.yearDiscount') : null,
      description: t('pricing.pro.description'),
      features: [
        `${t('compare.teamMembers.pro')} ${t('compare.teamMembers')}`,
        `${t('compare.leadSources.pro')} ${t('compare.leadSources')}`,
        `${t('compare.leadAlerts.pro')} ${t('compare.leadAlerts')}`,
        `${t('compare.templates.pro')} ${t('compare.templates')}`,
        `${t('compare.leadEngagement.pro')} ${t('compare.leadEngagement')}`,
        `${t('compare.aiParsing')}`,
      ],
      cta: t('pricing.pro.cta'),
      highlight: true,
      trial: '14-day free trial',
      plan: 'pro',
    },
    {
      title: t('pricing.ultimate.title'),
      price: t('pricing.ultimate.price'),
      description: t('pricing.ultimate.description'),
      features: [
        `${t('compare.teamMembers.ultimate')} ${t('compare.teamMembers')}`,
        `${t('compare.leadSources.ultimate')} ${t('compare.leadSources')}`,
        `${t('compare.leadAlerts.ultimate')} ${t('compare.leadAlerts')}`,
        `${t('compare.templates.ultimate')} ${t('compare.templates')}`,
        `${t('compare.leadEngagement.ultimate')} ${t('compare.leadEngagement')}`,
        `${t('compare.aiParsing')}`,
        `${t('compare.customBranding')}`,
        `${t('compare.advancedTeam')}`,
      ],
      cta: t('pricing.ultimate.cta'),
      highlight: false,
      plan: 'ultimate',
    },
  ];

  const comparisonFeatures = [
    {
      name: t('compare.teamMembers'),
      free: t('compare.teamMembers.free'),
      pro: t('compare.teamMembers.pro'),
      ultimate: t('compare.teamMembers.ultimate'),
    },
    {
      name: t('compare.leadSources'),
      free: t('compare.leadSources.free'),
      pro: t('compare.leadSources.pro'),
      ultimate: t('compare.leadSources.ultimate'),
    },
    {
      name: t('compare.leadAlerts'),
      free: t('compare.leadAlerts.free'),
      pro: t('compare.leadAlerts.pro'),
      ultimate: t('compare.leadAlerts.ultimate'),
    },
    {
      name: t('compare.templates'),
      free: t('compare.templates.free'),
      pro: t('compare.templates.pro'),
      ultimate: t('compare.templates.ultimate'),
    },
    {
      name: t('compare.leadEngagement'),
      free: t('compare.leadEngagement.free'),
      pro: t('compare.leadEngagement.pro'),
      ultimate: t('compare.leadEngagement.ultimate'),
    },
    {
      name: t('compare.aiParsing'),
      free: false,
      pro: true,
      ultimate: true,
    },
    {
      name: t('compare.customBranding'),
      free: false,
      pro: false,
      ultimate: true,
    },
    {
      name: t('compare.advancedTeam'),
      free: false,
      pro: false,
      ultimate: true,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-leadly-soft-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text inline-block">
            {t('pricing.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            {t('pricing.subtitle')}
          </p>
          
          <div className="flex items-center justify-center mb-10">
            <span className={`text-sm font-medium mr-3 ${!yearly ? 'text-leadly-purple' : 'text-gray-500'}`}>
              {t('pricing.monthly')}
            </span>
            <button
              onClick={toggleBilling}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${yearly ? 'bg-leadly-purple' : 'bg-gray-300'}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${yearly ? 'translate-x-6' : 'translate-x-1'}`}
              />
            </button>
            <span className={`text-sm font-medium ml-3 ${yearly ? 'text-leadly-purple' : 'text-gray-500'}`}>
              {t('pricing.yearly')}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-sm p-8 border transition-all ${
                plan.highlight
                  ? 'border-leadly-purple transform md:-translate-y-4 shadow-lg relative'
                  : 'border-gray-200'
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-leadly-purple text-white text-sm font-semibold py-1 px-3 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.period && <span className="text-gray-500 ml-1">{plan.period}</span>}
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
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${
                  plan.highlight
                    ? 'bg-leadly-purple hover:bg-leadly-purple/90'
                    : 'bg-white text-leadly-purple border border-leadly-purple hover:bg-leadly-purple/10'
                }`}
                variant={plan.highlight ? 'default' : 'outline'}
                onClick={() => handlePricingClick(plan.plan)}
              >
                {plan.cta}
              </Button>
              {plan.trial && (
                <p className="text-sm text-center text-gray-500 mt-3">{plan.trial}</p>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-16">
          <Accordion type="single" collapsible className="bg-white rounded-xl shadow-sm">
            <AccordionItem value="features">
              <AccordionTrigger className="px-6 py-4 text-lg font-semibold text-gray-900">
                {t('pricing.compare')}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="py-4 px-4 text-left font-semibold text-gray-900">{t('compare.feature')}</th>
                        <th className="py-4 px-4 text-center font-semibold text-gray-900">{t('compare.free')}</th>
                        <th className="py-4 px-4 text-center font-semibold text-gray-900">{t('compare.pro')}</th>
                        <th className="py-4 px-4 text-center font-semibold text-gray-900">{t('compare.ultimate')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonFeatures.map((feature, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-3 px-4 text-gray-700">{feature.name}</td>
                          <td className="py-3 px-4 text-center">
                            {typeof feature.free === 'boolean' ? (
                              feature.free ? (
                                <Check className="h-5 w-5 text-leadly-purple mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-gray-400 mx-auto" />
                              )
                            ) : (
                              <span className="text-gray-700">{feature.free}</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {typeof feature.pro === 'boolean' ? (
                              feature.pro ? (
                                <Check className="h-5 w-5 text-leadly-purple mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-gray-400 mx-auto" />
                              )
                            ) : (
                              <span className="text-gray-700">{feature.pro}</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {typeof feature.ultimate === 'boolean' ? (
                              feature.ultimate ? (
                                <Check className="h-5 w-5 text-leadly-purple mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-gray-400 mx-auto" />
                              )
                            ) : (
                              <span className="text-gray-700">{feature.ultimate}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
