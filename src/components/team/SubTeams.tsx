
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Users } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const SubTeams = () => {
  const { toast } = useToast();

  const handleCreateTeam = () => {
    toast({
      title: "Create Team",
      description: "Opening team creation form...",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="text-center max-w-md mx-auto">
        <div className="bg-leadly-soft-purple p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <Users className="h-8 w-8 text-leadly-purple" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Create Subteams</h2>
        <p className="text-gray-600 mb-6">
          Organize your team members into groups based on departments, locations, or responsibilities
        </p>
        <Button 
          onClick={handleCreateTeam}
          className="bg-leadly-purple hover:bg-leadly-purple/90 text-white"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Create First Team
        </Button>
      </div>
    </div>
  );
};

export default SubTeams;
