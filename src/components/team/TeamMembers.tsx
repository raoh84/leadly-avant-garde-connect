
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
  const handleInvite = () => {
    // In a real app, open invite dialog
    alert("Invite team member feature coming soon!");
  };

  return (
    <aside className="h-full">
      <div className="rounded-2xl border bg-white shadow even-md flex flex-col h-full">
        <div className="flex items-center justify-between px-6 pt-5 pb-2 border-b">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-leadly-purple" />
            <span className="text-lg font-semibold">Team Members</span>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full h-7 w-7">
            <UserPlus className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
        <div className="px-6 py-2 bg-gray-50 border-b text-xs text-gray-500 rounded-t-2xl">
          Active team members working with clients
        </div>
        <ul className="divide-y">
          {teamMembers.map((member) => (
            <li key={member.id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-8 w-8 border border-gray-200">
                    <AvatarImage src={member.avatar || ''} alt={member.name} />
                    <AvatarFallback className="bg-leadly-soft-purple text-leadly-purple font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {member.isOnline && (
                    <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-1 ring-white"></span>
                  )}
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-700">{member.name}</div>
                  <div className="text-xs text-gray-400">{member.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="bg-leadly-soft-purple/30 text-leadly-purple border-0 px-2 py-1 text-xs font-medium">
                  {member.clientCount} clients
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full">
                      <MoreHorizontal className="h-4 w-4 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="z-50 bg-white min-w-[140px]">
                    <DropdownMenuItem asChild>
                      <a href={`mailto:${member.email}`} className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <User className="h-4 w-4 mr-2" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Assign Clients
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </li>
          ))}
        </ul>
        <div className="p-6 border-t">
          <Button
            variant="outline"
            className="w-full text-sm border-gray-200 hover:bg-leadly-purple/10 font-semibold flex items-center justify-center"
            onClick={handleInvite}
          >
            <UserPlus className="h-4 w-4 mr-2 text-leadly-purple" />
            Invite Team Member
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default TeamMembers;
