
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Import, ArrowUpDown, FileDown, FileUp } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ImportExportTab = () => {
  const { toast } = useToast();
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfigureImport = () => {
    setIsImportDialogOpen(true);
  };

  const handleConfigureExport = () => {
    setIsExportDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImportFile(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!importFile) {
      toast({
        variant: "destructive",
        title: "No File Selected",
        description: "Please select a CSV file to import."
      });
      return;
    }

    if (!importFile.name.endsWith('.csv')) {
      toast({
        variant: "destructive",
        title: "Invalid File Format",
        description: "Please select a CSV file."
      });
      return;
    }

    setIsProcessing(true);
    
    try {
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
            setIsImportDialogOpen(false);
            setImportFile(null);
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
        } finally {
          setIsProcessing(false);
        }
      };
      reader.readAsText(importFile);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Import Failed",
        description: error.message || "Error reading the CSV file"
      });
      setIsProcessing(false);
    }
  };

  const handleExport = async () => {
    setIsProcessing(true);
    
    try {
      // Get the current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }
      
      // Fetch clients
      const { data: clients, error } = await supabase
        .from('clients')
        .select('*')
        .order('date_added', { ascending: false });
      
      if (error) throw error;
      
      if (!clients || clients.length === 0) {
        toast({
          variant: "destructive",
          title: "Export Failed",
          description: "No clients to export"
        });
        setIsProcessing(false);
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
      
      setIsExportDialogOpen(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Export Failed",
        description: error.message || "Error exporting clients"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* CSV Import */}
      <Card className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-leadly-soft-purple rounded-full p-3">
              <FileUp className="h-6 w-6 text-leadly-purple" />
            </div>
            <h3 className="font-semibold text-lg text-gray-800">Import Clients from CSV</h3>
          </div>
          <p className="text-gray-600 mb-6">
            Bulk import contacts from a CSV file into your Leadly account
          </p>
          <Button 
            onClick={handleConfigureImport}
            variant="ghost" 
            className="text-leadly-purple hover:bg-leadly-soft-purple/20 text-sm font-medium"
          >
            Configure <span className="ml-1">&gt;</span>
          </Button>
        </CardContent>
      </Card>

      {/* Export */}
      <Card className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-leadly-soft-purple rounded-full p-3">
              <FileDown className="h-6 w-6 text-leadly-purple" />
            </div>
            <h3 className="font-semibold text-lg text-gray-800">Export Client List</h3>
          </div>
          <p className="text-gray-600 mb-6">
            Receive a download of your client list in CSV format
          </p>
          <Button 
            onClick={handleConfigureExport}
            variant="ghost" 
            className="text-leadly-purple hover:bg-leadly-soft-purple/20 text-sm font-medium"
          >
            Configure <span className="ml-1">&gt;</span>
          </Button>
        </CardContent>
      </Card>

      {/* Import Dialog */}
      <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Import Clients from CSV</DialogTitle>
            <DialogDescription>
              Upload a CSV file to import clients into your Leadly account.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="csvFile">CSV File</Label>
              <Input 
                id="csvFile" 
                type="file" 
                accept=".csv" 
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              <p className="text-xs text-gray-500 mt-2">
                Your CSV file should include at least a "Name" column. Other supported columns include "Details", "Status".
              </p>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-md border border-blue-100 text-sm text-blue-700">
              <p className="font-medium mb-1">CSV Format Example:</p>
              <pre className="text-xs bg-white p-2 rounded">Name,Details,Status<br/>John Smith,New lead from website,New<br/>Jane Doe,Follow up next week,Follow-up</pre>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImportDialogOpen(false)} disabled={isProcessing}>
              Cancel
            </Button>
            <Button onClick={handleImport} disabled={isProcessing || !importFile}>
              {isProcessing ? "Importing..." : "Import"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Export Client List</DialogTitle>
            <DialogDescription>
              Export your clients to a CSV file.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <p>
              This will export all your clients to a CSV file with the following columns:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>Name</li>
              <li>Details</li>
              <li>Status</li>
              <li>Last Activity</li>
              <li>Date Added</li>
            </ul>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportDialogOpen(false)} disabled={isProcessing}>
              Cancel
            </Button>
            <Button onClick={handleExport} disabled={isProcessing}>
              {isProcessing ? "Exporting..." : "Export"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImportExportTab;
