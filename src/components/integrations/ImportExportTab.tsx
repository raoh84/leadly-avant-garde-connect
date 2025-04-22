
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Import, ArrowUpDown } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ImportExportTab = () => {
  const { toast } = useToast();

  const handleConfigureImport = () => {
    toast({
      title: "Import Configuration",
      description: "Opening CSV import wizard...",
    });
  };

  const handleConfigureExport = () => {
    toast({
      title: "Export Configuration",
      description: "Opening export options...",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* CSV Import */}
      <Card className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-leadly-soft-purple rounded-full p-3">
              <Import className="h-6 w-6 text-leadly-purple" />
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
              <ArrowUpDown className="h-6 w-6 text-leadly-purple" />
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
    </div>
  );
};

export default ImportExportTab;
