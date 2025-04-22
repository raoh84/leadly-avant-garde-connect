
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Settings, Import, Export } from 'lucide-react';
import LeadSourcesTab from './LeadSourcesTab';
import ImportExportTab from './ImportExportTab';

interface IntegrationsTabsProps {
  activeTab?: string;
}

const IntegrationsTabs: React.FC<IntegrationsTabsProps> = ({ activeTab = 'sources' }) => {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const navigate = useNavigate();

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    navigate(`/integrations/${value}`);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Integrations</h1>
          <p className="text-gray-500 mt-1">Connect your lead sources and manage data imports/exports</p>
        </div>
      </div>

      <Tabs defaultValue={currentTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full flex mb-6 bg-transparent border-b">
          <TabsTrigger
            value="sources"
            className={`px-6 py-3 text-sm font-medium rounded-t-md transition-all ${
              currentTab === 'sources'
                ? 'border-b-2 border-leadly-purple text-leadly-purple'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Lead Sources
          </TabsTrigger>
          <TabsTrigger
            value="import-export"
            className={`px-6 py-3 text-sm font-medium rounded-t-md transition-all ${
              currentTab === 'import-export'
                ? 'border-b-2 border-leadly-purple text-leadly-purple'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Import/Export
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sources" className="mt-4">
          <LeadSourcesTab />
        </TabsContent>
        
        <TabsContent value="import-export" className="mt-4">
          <ImportExportTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationsTabs;
