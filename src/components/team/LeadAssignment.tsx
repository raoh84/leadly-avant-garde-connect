
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Settings } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const LeadAssignment = () => {
  const { toast } = useToast();

  const handleSetupRules = () => {
    toast({
      title: "Lead Assignment",
      description: "Setting up lead assignment rules...",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="text-center max-w-md mx-auto">
        <div className="bg-leadly-soft-purple p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <Settings className="h-8 w-8 text-leadly-purple" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Configure Lead Assignment</h2>
        <p className="text-gray-600 mb-6">
          Create rules to automatically assign new leads to your team members based on custom criteria
        </p>
        <Button 
          onClick={handleSetupRules}
          className="bg-leadly-purple hover:bg-leadly-purple/90 text-white"
        >
          Setup Assignment Rules
        </Button>
      </div>
    </div>
  );
};

export default LeadAssignment;
