
import React from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, UserPlus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const TeamMembersList = () => {
  const { toast } = useToast();

  const handleInvite = () => {
    toast({
      title: "Invite Team Member",
      description: "Opening invite form...",
    });
  };

  // Mock data for team members
  const teamMembers = [
    {
      id: '1',
      name: 'Amer Niyonzima',
      role: 'Sales Manager',
      email: 'amer@leadly.com',
      avatar: null,
      clientCount: 24,
      isOnline: true
    },
    {
      id: '2',
      name: 'Zera Aymard',
      role: 'Account Executive',
      email: 'zera@leadly.com',
      avatar: null,
      clientCount: 18,
      isOnline: false
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search team members..."
            className="pl-10 pr-4 py-2 w-full border-gray-200"
          />
        </div>
        <Button 
          onClick={handleInvite}
          className="bg-leadly-purple hover:bg-leadly-purple/90 text-white"
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Invite Team Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member.id} className="border hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <Avatar className="h-12 w-12 border border-gray-200">
                    <AvatarImage src={member.avatar || ''} alt={member.name} />
                    <AvatarFallback className="bg-leadly-soft-purple text-leadly-purple font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {member.isOnline && (
                    <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-400 ring-1 ring-white"></span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                  <div className="mt-2 text-sm text-leadly-purple font-medium">
                    {member.clientCount} clients
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline" 
                  className="flex-1 text-gray-700 border-gray-300 hover:bg-gray-50"
                >
                  View Profile
                </Button>
                <Button 
                  className="flex-1 bg-leadly-purple hover:bg-leadly-purple/90 text-white"
                >
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamMembersList;
