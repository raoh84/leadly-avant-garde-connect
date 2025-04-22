
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Inbox, Bell, Users, MessageSquare } from 'lucide-react';

const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Inbox className="h-12 w-12 text-leadly-purple" />,
      title: t('features.leadCapture.title'),
      description: t('features.leadCapture.description'),
    },
    {
      icon: <Bell className="h-12 w-12 text-leadly-purple" />,
      title: t('features.instantAlerts.title'),
      description: t('features.instantAlerts.description'),
    },
    {
      icon: <Users className="h-12 w-12 text-leadly-purple" />,
      title: t('features.teamManagement.title'),
      description: t('features.teamManagement.description'),
    },
    {
      icon: <MessageSquare className="h-12 w-12 text-leadly-purple" />,
      title: t('features.templates.title'),
      description: t('features.templates.description'),
    },
  ];

  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6 gradient-text inline-block">
            {t('features.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('features.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-leadly-purple/20"
            >
              <div className="mb-6 p-4 bg-leadly-soft-purple inline-block rounded-xl">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
