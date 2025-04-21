
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Loader, 
  Plus, 
  Search, 
  Filter, 
  ArrowDown, 
  CalendarDays, 
  User, 
  UserPlus 
} from 'lucide-react';
import { toast } from "@/hooks/use-toast";

type Client = {
  id: string;
  name: string;
  details: string;
  contact_status: string;
  last_activity: string;
  date_added: string;
};

interface ClientListProps {
  filter?: string;
}

const ClientList = ({ filter = 'all' }: ClientListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [teamMember, setTeamMember] = useState('all');

  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients', filter, searchTerm, teamMember],
    queryFn: async () => {
      let query = supabase
        .from('clients')
        .select('*');

      if (filter === 'uncontacted') {
        query = query.eq('contact_status', 'uncontacted');
      } else if (filter === 'follow-up') {
        query = query.eq('contact_status', 'follow-up');
      }

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
      }

      // In a real implementation, we would filter by team member here
      // if (teamMember !== 'all') {
      //   query = query.eq('assigned_to', teamMember);
      // }

      const { data, error } = await query.order('date_added', { ascending: false });
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Error loading clients",
          description: error.message,
        });
        throw error;
      }
      
      return data as Client[];
    }
  });

  const handleAddNewClient = () => {
    // This would open a modal to add a new client
    toast({
      title: "Add new client",
      description: "This feature is coming soon!",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="flex flex-col items-center gap-4">
          <Loader className="h-8 w-8 animate-spin text-leadly-purple" />
          <p className="text-sm text-gray-500">Loading clients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="p-4 border-b">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search clients..."
              className="pl-10 pr-4 py-2 w-full sm:w-[300px] bg-white border-gray-200 focus:border-leadly-purple focus:ring-1 focus:ring-leadly-purple"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Select value={teamMember} onValueChange={setTeamMember}>
              <SelectTrigger className="w-full sm:w-[180px] bg-white border-gray-200">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="All Team Members" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Team Members</SelectItem>
                <SelectItem value="alex">Alex</SelectItem>
                <SelectItem value="sarah">Sarah</SelectItem>
                <SelectItem value="mike">Mike</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              className="w-full sm:w-auto border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              <Filter className="h-4 w-4 mr-2 text-gray-500" />
              Advanced Filter
            </Button>
            
            <Button 
              className="w-full sm:w-auto bg-leadly-purple hover:bg-leadly-dark-purple text-white"
              onClick={handleAddNewClient}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Client
            </Button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        {clients?.length === 0 ? (
          <div className="py-16 px-4 flex flex-col items-center justify-center text-center border-b">
            <div className="bg-leadly-soft-purple/30 rounded-full p-6 mb-4">
              <UserPlus className="h-10 w-10 text-leadly-purple" />
            </div>
            <h3 className="text-lg font-medium mb-2 text-gray-800">No clients found</h3>
            <p className="text-gray-500 max-w-md mb-6">
              Add your first client to start tracking your sales pipeline and grow your business.
            </p>
            <Button 
              onClick={handleAddNewClient}
              className="bg-leadly-purple hover:bg-leadly-dark-purple text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Client
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50 border-b">
              <TableRow>
                <TableHead className="font-semibold text-gray-700">Name</TableHead>
                <TableHead className="font-semibold text-gray-700">Details</TableHead>
                <TableHead className="font-semibold text-gray-700">Last Activity</TableHead>
                <TableHead className="font-semibold text-gray-700 cursor-pointer">
                  <div className="flex items-center">
                    Date Added
                    <ArrowDown className="ml-2 h-4 w-4 text-leadly-purple" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients?.map((client) => (
                <TableRow 
                  key={client.id} 
                  className="cursor-pointer transition-colors hover:bg-gray-50"
                >
                  <TableCell className="font-medium text-leadly-purple">{client.name}</TableCell>
                  <TableCell className="text-gray-600">{client.details || 'No details'}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-600">
                      <CalendarDays className="h-4 w-4 mr-2 text-gray-400" />
                      {new Date(client.last_activity).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{new Date(client.date_added).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default ClientList;
