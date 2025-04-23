
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import { LeadAlertInApp } from '@/components/leads/LeadAlertInApp';

const Index = () => {
  return (
    <div className="min-h-screen">
      <LeadAlertInApp />
      <Navbar />
      <Hero />
      <Features />
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
