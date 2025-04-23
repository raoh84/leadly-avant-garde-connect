
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { LeadAlertInApp } from '@/components/leads/LeadAlertInApp';
import Hero from '@/components/Hero';

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      <LeadAlertInApp />
      <Navbar />
      
      <Hero />

      <section id="features" className="py-16 px-4 md:px-0">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">{t('index.featuresTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('index.feature1Title')}</h3>
              <p className="text-gray-700">{t('index.feature1Description')}</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('index.feature2Title')}</h3>
              <p className="text-gray-700">{t('index.feature2Description')}</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('index.feature3Title')}</h3>
              <p className="text-gray-700">{t('index.feature3Description')}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-16 bg-gray-50">
        <Pricing />
      </section>

      <section id="faq" className="py-16">
        <FAQ />
      </section>

      <Footer />
    </div>
  );
};

export default Index;
