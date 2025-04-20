
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text inline-block">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 card-hover"
            >
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="h-4 w-4 bg-leadly-purple rounded-full mr-1"></div>
                  <div className="h-4 w-4 bg-leadly-purple rounded-full mr-1"></div>
                  <div className="h-4 w-4 bg-leadly-purple rounded-full"></div>
                </div>
                <p className="text-gray-700 italic">{testimonial.content}</p>
              </div>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="h-12 w-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
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
