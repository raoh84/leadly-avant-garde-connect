
import React from 'react';
import { Inbox, Bell, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Inbox className="h-12 w-12 text-leadly-purple" />,
      title: "Smart Lead Capture",
      description: "Automatically capture and organize leads from multiple sources in one centralized dashboard.",
    },
    {
      icon: <Bell className="h-12 w-12 text-leadly-purple" />,
      title: "Real-time Notifications",
      description: "Never miss an opportunity with instant alerts for new leads and follow-up reminders.",
    },
    {
      icon: <Users className="h-12 w-12 text-leadly-purple" />,
      title: "Team Collaboration",
      description: "Seamlessly distribute leads and track team performance with our intuitive management tools.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Leadly</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your lead management process with powerful features designed for growth
          </p>
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
