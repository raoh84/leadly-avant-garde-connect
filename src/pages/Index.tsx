import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';
import Faq from '@/components/Faq';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { LeadAlertInApp } from '@/components/leads/LeadAlertInApp';

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div>
      <LeadAlertInApp />
      <Navbar />
      <header className="bg-gray-50 py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold font-serif text-gray-900 mb-6">
            {t('index.title')}
          </h1>
          <p className="text-xl text-gray-700 mb-8">{t('index.subtitle')}</p>
          <div className="space-x-4">
            <Button className="bg-leadly-purple" onClick={() => navigate("/auth")}>
              {t('nav.getStarted')}
            </Button>
            <Button variant="outline" onClick={() => navigate("/subscribe")}>
              {t('nav.pricing')}
            </Button>
            <Button variant="outline" onClick={() => window.location.href = "mailto:sales@leadly.com"}>
              Contact Sales
            </Button>
          </div>
        </div>
      </header>

      <section id="features" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">{t('index.featuresTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('index.feature1Title')}</h3>
              <p className="text-gray-700">{t('index.feature1Description')}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('index.feature2Title')}</h3>
              <p className="text-gray-700">{t('index.feature2Description')}</p>
            </div>
            <div>
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
        <Faq />
      </section>

      <Footer />
    </div>
  );
};

export default Index;
