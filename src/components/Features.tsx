
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Inbox, Bell, Users } from 'lucide-react';

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
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('features.title')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t('features.subtitle')}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="mb-4 text-leadly-purple">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
