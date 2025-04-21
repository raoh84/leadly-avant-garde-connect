
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Loader, 
  Plus, 
  Search, 
  Filter, 
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
    toast({
      title: "Add new client",
      description: "This feature is coming soon!",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-16">
        <Loader className="h-8 w-8 animate-spin text-leadly-purple" />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-[420px] flex flex-col">
      {/* Actions Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center pb-5 border-b border-gray-100 mb-0">
        <div className="flex-1 flex items-center relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-leadly-purple" />
          <Input
            placeholder="Search clients..."
            className="pl-10 pr-4 py-2 w-full rounded-md bg-gray-50 border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-leadly-purple focus:ring-1 focus:ring-leadly-purple"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={teamMember} onValueChange={setTeamMember}>
          <SelectTrigger className="w-full sm:w-[170px] bg-gray-50 border border-gray-200 rounded-md focus:ring-leadly-purple">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-leadly-purple" />
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
          className="w-full sm:w-auto border border-gray-200 text-leadly-purple font-medium bg-gray-50 hover:bg-leadly-soft-purple"
        >
          <Filter className="h-4 w-4 mr-2 text-leadly-purple" />
          Advanced Filter
        </Button>
        <Button
          className="w-full sm:w-auto bg-leadly-purple hover:bg-leadly-dark-purple text-white font-semibold"
          onClick={handleAddNewClient}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add New Client
        </Button>
      </div>
      {/* Empty state */}
      {(!clients || clients.length === 0) && (
        <div className="flex-1 flex flex-col justify-center items-center py-10">
          <div className="bg-leadly-soft-purple/50 rounded-full p-5 mb-3">
            <UserPlus className="h-10 w-10 text-leadly-purple opacity-70" />
          </div>
          <div className="text-lg font-semibold mb-2 text-gray-700">No clients found</div>
          <p className="text-gray-400 max-w-md text-center mb-5">
            Add your first client to start tracking your sales pipeline and grow your business.
          </p>
          <Button
            className="bg-leadly-purple hover:bg-leadly-dark-purple text-white font-semibold px-6 py-2"
            onClick={handleAddNewClient}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Client
          </Button>
        </div>
      )}
      {/* Table */}
      {clients && clients.length > 0 && (
        <div className="overflow-x-auto mt-5">
          <Table>
            <TableHeader className="bg-leadly-soft-purple border-y border-gray-100">
              <TableRow>
                <TableHead className="font-semibold text-gray-800 text-base py-3">Name</TableHead>
                <TableHead className="font-semibold text-gray-800 text-base py-3">Details</TableHead>
                <TableHead className="font-semibold text-gray-800 text-base py-3">Last Activity</TableHead>
                <TableHead className="font-semibold text-gray-800 text-base py-3">
                  Date Added
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients?.map((client) => (
                <TableRow
                  key={client.id}
                  className="cursor-pointer transition-colors hover:bg-leadly-soft-purple/40"
                >
                  <TableCell className="font-medium text-leadly-purple">{client.name}</TableCell>
                  <TableCell className="text-gray-600">{client.details || 'No details'}</TableCell>
                  <TableCell>
                    <div className="flex items-center text-gray-600">
                      {client.last_activity
                        ? new Date(client.last_activity).toLocaleDateString()
                        : "No recent activity"}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">{new Date(client.date_added).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default ClientList;

// NOTE: This file is now quite long. After reviewing this, consider splitting it into smaller components for scalability and maintainability.
