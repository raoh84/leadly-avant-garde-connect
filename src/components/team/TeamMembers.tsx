
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Users, 
  MoreHorizontal, 
  Mail,
  PlusCircle,
  UserPlus
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

// This would be fetched from an API in a real app
const teamMembers = [
  { 
    id: '1', 
    name: 'Alex Johnson', 
    role: 'Sales Manager', 
    email: 'alex@leadly.com', 
    avatar: null,
    clientCount: 24,
    isOnline: true
  },
  { 
    id: '2', 
    name: 'Sarah Wilson', 
    role: 'Account Executive', 
    email: 'sarah@leadly.com', 
    avatar: null,
    clientCount: 18,
    isOnline: false
  },
  { 
    id: '3', 
    name: 'Mike Chen', 
    role: 'Business Development', 
    email: 'mike@leadly.com', 
    avatar: null,
    clientCount: 12,
    isOnline: true
  }
];

const TeamMembers = () => {
  return (
    <Card className="h-full bg-white shadow-sm border">
      <CardHeader className="pb-2 border-b">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Users className="h-4 w-4 text-leadly-purple" />
            Team Members
          </CardTitle>
          <Button variant="ghost" size="icon" className="rounded-full h-7 w-7">
            <UserPlus className="h-4 w-4 text-gray-500" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="px-3 py-2 bg-gray-50 border-b">
          <p className="text-xs text-gray-500">Active team members working with clients</p>
        </div>
        <ul className="divide-y">
          {teamMembers.map((member) => (
            <li key={member.id} className="px-4 py-3 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-8 w-8 border border-gray-200">
                      <AvatarImage src={member.avatar || ''} alt={member.name} />
                      <AvatarFallback className="bg-leadly-soft-purple text-leadly-purple">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {member.isOnline && (
                      <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-1 ring-white"></span>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-sm text-gray-700">{member.name}</div>
                    <div className="text-xs text-gray-500">{member.role}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Badge variant="outline" className="mr-2 bg-leadly-soft-purple/30 text-leadly-purple border-0">
                    {member.clientCount} clients
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                        <MoreHorizontal className="h-4 w-4 text-gray-500" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="cursor-pointer">
                        <Mail className="mr-2 h-4 w-4" />
                        <span>Email</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>View Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="cursor-pointer">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        <span>Assign Clients</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full text-sm border-gray-200 hover:bg-gray-50">
            <UserPlus className="h-4 w-4 mr-2 text-leadly-purple" />
            Invite Team Member
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMembers;
