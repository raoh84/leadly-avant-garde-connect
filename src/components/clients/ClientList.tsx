
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader, Plus, Search, Filter, ArrowDown, CalendarDays, User } from 'lucide-react';
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
      <Card>
        <CardHeader>
          <CardTitle>Clients</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center p-4">
            <Loader className="h-6 w-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search clients..."
              className="pl-8 w-full sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Select value={teamMember} onValueChange={setTeamMember}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <User className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Team Members" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Team Members</SelectItem>
                <SelectItem value="alex">Alex</SelectItem>
                <SelectItem value="sarah">Sarah</SelectItem>
                <SelectItem value="mike">Mike</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="w-full sm:w-auto">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filter
            </Button>
            
            <Button 
              className="w-full sm:w-auto bg-leadly-purple hover:bg-leadly-purple/90"
              onClick={handleAddNewClient}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Client
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="cursor-pointer">
                  <div className="flex items-center">
                    Date Added
                    <ArrowDown className="ml-2 h-4 w-4" />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    No clients found. Add your first client to get started.
                  </TableCell>
                </TableRow>
              ) : (
                clients?.map((client) => (
                  <TableRow key={client.id} className="cursor-pointer hover:bg-muted/50">
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.details || 'No details'}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <CalendarDays className="h-4 w-4 mr-2 text-muted-foreground" />
                        {new Date(client.last_activity).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(client.date_added).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientList;
