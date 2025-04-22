
import React, { useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ChevronDown, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TeamDashboard = () => {
  const [selectedGroup, setSelectedGroup] = useState('All Groups');
  const [dateRange, setDateRange] = useState('Last 7 days Apr 13 - Apr 20');

  // Mock data for team members
  const teamMembers = [
    {
      id: 1,
      name: 'AMER NIYONZIMA',
      email: 'amer@leadly.com',
      avatar: null,
      assignedClients: 0,
      contactedClients: { value: 0, percentage: '0% of assigned' },
      responseTime: '-',
      totalActivities: 0,
      inSelectedGroup: '-'
    },
    {
      id: 2,
      name: 'Zera Aymard',
      email: 'zera@leadly.com',
      avatar: null,
      assignedClients: 0,
      contactedClients: { value: 0, percentage: '0% of assigned' },
      responseTime: '-',
      totalActivities: 0,
      inSelectedGroup: '-'
    }
  ];

  return (
    <div>
      <div className="flex justify-between mb-6">
        <div className="flex gap-4">
          <Select value={selectedGroup} onValueChange={setSelectedGroup}>
            <SelectTrigger className="w-[180px] border-gray-300">
              <SelectValue>{selectedGroup}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Groups">All Groups</SelectItem>
              <SelectItem value="Sales">Sales</SelectItem>
              <SelectItem value="Marketing">Marketing</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[280px] border-gray-300">
              <SelectValue>{dateRange}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Last 7 days Apr 13 - Apr 20">Last 7 days Apr 13 - Apr 20</SelectItem>
              <SelectItem value="Last 30 days">Last 30 days</SelectItem>
              <SelectItem value="Last quarter">Last quarter</SelectItem>
              <SelectItem value="This year">This year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Team Members */}
        <div className="bg-white rounded-lg border p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xs font-bold text-gray-500">TEAM MEMBERS</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Number of active team members</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="text-xl font-bold text-gray-800">2</div>
          <div className="text-sm text-gray-500">Activated accounts</div>
        </div>

        {/* Assigned Clients */}
        <div className="bg-white rounded-lg border p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xs font-bold text-gray-500">ASSIGNED CLIENTS</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Number of clients assigned to team members</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="text-xl font-bold text-gray-800">0</div>
          <div className="text-sm text-gray-500">of 0 added</div>
        </div>

        {/* Contacted Clients */}
        <div className="bg-white rounded-lg border p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xs font-bold text-gray-500">CONTACTED CLIENTS</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Clients that have received at least one message</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="text-xl font-bold text-gray-800">0</div>
          <div className="text-sm text-gray-500">0% of clients assigned</div>
        </div>

        {/* Average Response Time */}
        <div className="bg-white rounded-lg border p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xs font-bold text-gray-500">AVERAGE RESPONSE TIME</h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-xs">Average time to first response for contacted clients</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="text-xl font-bold text-gray-800">-</div>
          <div className="text-sm text-gray-500">for contacted clients</div>
        </div>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-[300px] text-xs font-bold text-gray-500">TEAM MEMBER</TableHead>
              <TableHead className="text-xs font-bold text-gray-500">ASSIGNED CLIENTS</TableHead>
              <TableHead className="text-xs font-bold text-gray-500">CONTACTED CLIENTS</TableHead>
              <TableHead className="text-xs font-bold text-gray-500">AVERAGE RESPONSE TIME</TableHead>
              <TableHead className="text-xs font-bold text-gray-500">TOTAL ACTIVITIES</TableHead>
              <TableHead className="text-xs font-bold text-gray-500 flex items-center gap-1">
                IN SELECT GROUP <ChevronDown className="h-3 w-3 text-gray-500" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((member) => (
              <TableRow key={member.id} className="hover:bg-gray-50">
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 text-xs font-medium">
                      {member.id}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{member.name}</div>
                      <div className="text-sm text-gray-500">{member.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-gray-800">{member.assignedClients}</TableCell>
                <TableCell>
                  <div className="text-gray-800">{member.contactedClients.value}</div>
                  <div className="text-xs text-gray-500">{member.contactedClients.percentage}</div>
                </TableCell>
                <TableCell className="text-gray-800">{member.responseTime}</TableCell>
                <TableCell className="text-gray-800">{member.totalActivities}</TableCell>
                <TableCell className="text-gray-800">{member.inSelectedGroup}</TableCell>
              </TableRow>
            ))}
            <TableRow className="bg-gray-50 font-semibold">
              <TableCell>TOTAL</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
              <TableCell>-</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default TeamDashboard;
