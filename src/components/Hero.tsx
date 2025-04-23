
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Turn Leads into Lasting Relationships
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Streamline your lead management, automate follow-ups, and boost your team's efficiency with our intelligent platform.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Button
            onClick={() => navigate("/auth")}
            className="w-full md:w-auto bg-leadly-purple hover:bg-leadly-purple/90"
            size="lg"
          >
            Get Started Free
          </Button>
          <Button
            onClick={() => navigate("/subscribe")}
            variant="outline"
            className="w-full md:w-auto"
            size="lg"
          >
            View Pricing
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = "mailto:sales@leadly.com"}
            className="w-full md:w-auto"
            size="lg"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Hero;
