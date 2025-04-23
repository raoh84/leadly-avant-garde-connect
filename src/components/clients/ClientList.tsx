
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
  UserPlus,
  Download,
  Upload
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import AddClientDialog from './AddClientDialog';

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

const ClientList = ({ filter = 'all' }: { filter?: string }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [teamMember, setTeamMember] = useState('all');
  const [isAddClientDialogOpen, setIsAddClientDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: clients, isLoading, refetch } = useQuery({
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
    setIsAddClientDialogOpen(true);
  };

  const handleExportCSV = () => {
    if (!clients || clients.length === 0) {
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: "No clients to export"
      });
      return;
    }

    // Convert clients to CSV format
    const headers = ['Name', 'Details', 'Status', 'Last Activity', 'Date Added'];
    const csvContent = [
      headers.join(','),
      ...clients.map(client => [
        `"${client.name || ''}"`,
        `"${client.details || ''}"`,
        `"${client.contact_status || ''}"`,
        `"${client.last_activity ? new Date(client.last_activity).toLocaleDateString() : ''}"`,
        `"${client.date_added ? new Date(client.date_added).toLocaleDateString() : ''}"`,
      ].join(','))
    ].join('\n');

    // Create and download the CSV file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'leadly-clients.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Successful",
      description: `${clients.length} clients exported to CSV`
    });
  };

  const handleImportCSV = () => {
    // Create a hidden file input
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const csvContent = event.target?.result as string;
          const rows = csvContent.split('\n');
          const headers = rows[0].split(',');
          
          // Check if the CSV has the required header
          if (!headers.includes('Name')) {
            throw new Error('CSV file must contain a "Name" column');
          }
          
          const nameIndex = headers.findIndex(h => h.trim() === 'Name');
          const detailsIndex = headers.findIndex(h => h.trim() === 'Details');
          
          // Get the current user
          const { data: { user } } = await supabase.auth.getUser();
          
          if (!user) {
            throw new Error("User not authenticated");
          }
          
          // Process each row starting from index 1 (skipping header)
          let successCount = 0;
          let failCount = 0;
          
          for (let i = 1; i < rows.length; i++) {
            if (!rows[i].trim()) continue; // Skip empty rows
            
            const values = rows[i].split(',');
            // Extract the name, removing quotes if present
            let name = values[nameIndex]?.trim();
            if (name) {
              name = name.replace(/^"|"$/g, ''); // Remove surrounding quotes
              
              let details = '';
              if (detailsIndex >= 0 && values[detailsIndex]) {
                details = values[detailsIndex].replace(/^"|"$/g, '');
              }
              
              const { error } = await supabase.from('clients').insert({
                name,
                details: details || null,
                user_id: user.id,
              });
              
              if (error) {
                console.error(`Error importing row ${i}:`, error);
                failCount++;
              } else {
                successCount++;
              }
            }
          }
          
          if (successCount > 0) {
            toast({
              title: "Import Successful",
              description: `${successCount} clients imported${failCount > 0 ? ` (${failCount} failed)` : ''}`
            });
            refetch(); // Refresh the client list
          } else if (failCount > 0) {
            toast({
              variant: "destructive",
              title: "Import Failed",
              description: `All ${failCount} records failed to import`
            });
          } else {
            toast({
              variant: "destructive",
              title: "Import Failed",
              description: "No valid records found in the CSV file"
            });
          }
        } catch (error: any) {
          toast({
            variant: "destructive",
            title: "Import Failed",
            description: error.message || "Error processing CSV file"
          });
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-16">
        <Loader className="h-8 w-8 animate-spin text-leadly-purple" />
      </div>
    );
  }

  const ClientCard = ({ client }: { client: Client }) => (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-leadly-purple">{client.name}</h3>
              <p className="text-sm text-gray-600">{client.details || 'No details'}</p>
            </div>
          </div>
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-500">Last Activity:</span>
              <span>{client.last_activity ? new Date(client.last_activity).toLocaleDateString() : "No recent activity"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Date Added:</span>
              <span>{new Date(client.date_added).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="bg-white min-h-[420px] flex flex-col">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center p-4 border-b border-gray-100">
        <div className="flex-1 flex items-center relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-leadly-purple" />
          <Input
            placeholder="Search clients..."
            className="pl-10 pr-4 py-2 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Select value={teamMember} onValueChange={setTeamMember}>
            <SelectTrigger className="w-full sm:w-[170px]">
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

          <div className="flex flex-row gap-2">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={handleImportCSV}
            >
              <Upload className="h-4 w-4 mr-2 text-leadly-purple" />
              Import
            </Button>

            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={handleExportCSV}
              disabled={!clients || clients.length === 0}
            >
              <Download className="h-4 w-4 mr-2 text-leadly-purple" />
              Export
            </Button>
          </div>

          <Button
            className="w-full sm:w-auto bg-leadly-purple hover:bg-leadly-dark-purple text-white"
            onClick={handleAddNewClient}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Client 
          </Button>
        </div>
      </div>

      {(!clients || clients.length === 0) && (
        <div className="flex-1 flex flex-col justify-center items-center py-10">
          <div className="bg-leadly-soft-purple/50 rounded-full p-5 mb-3">
            <UserPlus className="h-10 w-10 text-leadly-purple opacity-70" />
          </div>
          <div className="text-lg font-semibold mb-2 text-gray-700">No clients found</div>
          <p className="text-gray-400 max-w-md text-center mb-5">
            Add your first client to start tracking your sales pipeline.
          </p>
          <Button
            className="bg-leadly-purple hover:bg-leadly-dark-purple text-white font-semibold"
            onClick={handleAddNewClient}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Client
          </Button>
        </div>
      )}

      {clients && clients.length > 0 && (
        <>
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Last Activity</TableHead>
                  <TableHead>Date Added</TableHead>
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
                    <TableCell className="text-gray-600">
                      {client.last_activity
                        ? new Date(client.last_activity).toLocaleDateString()
                        : "No recent activity"}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {client.date_added ? new Date(client.date_added).toLocaleDateString() : ""}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="md:hidden p-4">
            {clients.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </div>
        </>
      )}
      
      <AddClientDialog 
        isOpen={isAddClientDialogOpen} 
        onClose={() => setIsAddClientDialogOpen(false)}
        onSuccess={() => refetch()}
      />
    </div>
  );
};

export default ClientList;
