
import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const LeadDistribution = () => {
  const { toast } = useToast();

  const handleSetupLeadDistribution = () => {
    toast({
      title: "Lead Distribution",
      description: "Setting up lead distribution rules...",
    });
  };

  return (
    <div className="bg-gray-50 border rounded-lg p-5 mb-8">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-bold text-gray-700">LEAD DISTRIBUTION</h3>
          <p className="text-sm text-gray-500 mt-1">
            Automatically assign new leads to your team members based on custom rules
          </p>
        </div>
        <Button 
          variant="ghost" 
          className="text-leadly-purple text-sm font-medium"
          onClick={handleSetupLeadDistribution}
        >
          SET UP <span className="ml-1">&gt;</span>
        </Button>
      </div>
    </div>
  );
};

export default LeadDistribution;
