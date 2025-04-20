
import React from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="hero-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight gradient-text mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-leadly-purple hover:bg-leadly-purple/90 text-lg">
                {t('hero.cta1')}
              </Button>
              <Button size="lg" variant="outline" className="group border-leadly-purple text-leadly-purple hover:bg-leadly-purple/10 text-lg">
                {t('hero.cta2')}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-leadly-purple/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
              <div className="absolute -bottom-8 right-0 w-72 h-72 bg-leadly-light-purple/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float animation-delay-2000"></div>
              <div className="relative">
                <img 
                  src="/placeholder.svg" 
                  alt="Leadly Dashboard" 
                  className="rounded-xl shadow-xl border border-gray-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
