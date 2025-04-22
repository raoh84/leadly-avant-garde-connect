
import React, { useState } from 'react';
import { Settings, Facebook, Linkedin, Circle, Hash } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import LeadDistribution from './lead-sources/LeadDistribution';
import IntegrationSearch from './lead-sources/IntegrationSearch';
import IntegrationCard from './lead-sources/IntegrationCard';

const LeadSourcesTab = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  const handleConnect = (integration: string) => {
    toast({
      title: "Connection Initiated",
      description: `Connecting to ${integration}...`,
    });
  };

  const handleConfigure = (integration: string) => {
    toast({
      title: "Configure Integration",
      description: `Opening configuration for ${integration}...`,
    });
  };

  return (
    <div>
      <LeadDistribution />

      <div className="flex justify-between items-center mb-6">
        <IntegrationSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <IntegrationCard
          title="Privyr Lead Forms"
          description="Create customizable lead forms to embed on your website or share directly with clients"
          icon={Settings}
          iconBgColor="bg-leadly-soft-purple"
          iconColor="text-leadly-purple"
          buttonText="Configure"
          buttonColor="bg-white hover:bg-gray-50 text-leadly-purple border border-leadly-purple/50"
          onAction={() => handleConfigure('Privyr Lead Forms')}
        />

        <IntegrationCard
          title="Facebook"
          description="Sync leads from your Facebook Lead Ads campaigns directly to Leadly"
          icon={Facebook}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          status="Permissions Expired"
          buttonText="Connect"
          buttonVariant="default"
          buttonColor="text-white bg-blue-600 hover:bg-blue-700"
          onAction={() => handleConnect('Facebook')}
        />

        <IntegrationCard
          title="LinkedIn"
          description="Import leads from your LinkedIn Lead Gen Forms campaigns"
          icon={Linkedin}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-700"
          status="Not Connected"
          buttonText="Connect"
          buttonVariant="default"
          buttonColor="text-white bg-blue-700 hover:bg-blue-800"
          onAction={() => handleConnect('LinkedIn')}
        />

        <IntegrationCard
          title="WordPress Websites"
          description="Collect leads from WordPress contact forms and integrate directly with Leadly"
          icon={Settings}
          iconBgColor="bg-blue-100"
          iconColor="text-blue-600"
          buttonText="Connect"
          buttonColor="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
          onAction={() => handleConnect('WordPress')}
        />

        <IntegrationCard
          title="Google Forms"
          description="Connect your Google Forms to automatically create leads from form submissions"
          icon={Circle}
          iconBgColor="bg-red-100"
          iconColor="text-red-500"
          buttonText="Connect"
          buttonColor="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
          onAction={() => handleConnect('Google Forms')}
        />

        <IntegrationCard
          title="TikTok"
          description="Import leads generated from your TikTok Lead Generation ads"
          icon={Hash}
          iconBgColor="bg-black"
          iconColor="text-white"
          buttonText="Connect"
          buttonColor="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
          onAction={() => handleConnect('TikTok')}
        />
      </div>
    </div>
  );
};

export default LeadSourcesTab;
