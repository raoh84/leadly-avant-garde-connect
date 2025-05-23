
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Testimonials = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      content: "Leadly has transformed how we handle leads. The instant notifications and templates are game-changers for our sales team.",
      author: "Sarah Johnson",
      title: "Sales Director, TechFlow Inc.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      logo: "/placeholder.svg",
    },
    {
      content: "We've seen a 40% increase in conversion rates since implementing Leadly. Being able to respond to leads within minutes has made all the difference.",
      author: "Michael Chen",
      title: "Marketing Manager, Growth Partners",
      avatar: "https://randomuser.me/api/portraits/men/46.jpg",
      logo: "/placeholder.svg",
    },
    {
      content: "The team distribution feature alone is worth the investment. Leadly has streamlined our entire lead management process.",
      author: "Emma Davis",
      title: "Operations Lead, Scale Ventures",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      logo: "/placeholder.svg",
    },
  ];
  
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-6 gradient-text inline-block">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <div className="h-2 w-16 bg-leadly-purple rounded-full"></div>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">{testimonial.content}</p>
              </div>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="h-14 w-14 rounded-full ring-2 ring-leadly-purple/20 mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.author}</h4>
                  <p className="text-sm text-gray-600">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
