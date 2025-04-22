
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Settings, Facebook, Linkedin, TiktokLogo, Circle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

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

  const handleSetupLeadDistribution = () => {
    toast({
      title: "Lead Distribution",
      description: "Setting up lead distribution rules...",
    });
  };

  return (
    <div>
      <div className="bg-gray-50 border rounded-lg p-5 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-bold text-gray-700">LEAD DISTRIBUTION</h3>
            <p className="text-sm text-gray-500 mt-1">
              Automatically assign new leads to your team members based on custom rules
            </p>
          </div>
          <Button 
            variant="ghost" 
            className="text-leadly-purple text-sm font-medium"
            onClick={handleSetupLeadDistribution}
          >
            SET UP <span className="ml-1">&gt;</span>
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search integrations..."
            className="pl-10 pr-4 py-2 w-full border-gray-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Privyr Lead Forms */}
        <Card className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-leadly-soft-purple rounded-full p-2">
                  <Settings className="h-5 w-5 text-leadly-purple" />
                </div>
                <h3 className="font-semibold text-gray-800">Privyr Lead Forms</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Create customizable lead forms to embed on your website or share directly with clients
              </p>
              <Button 
                onClick={() => handleConfigure('Privyr Lead Forms')}
                className="w-full bg-white hover:bg-gray-50 text-leadly-purple border border-leadly-purple/50"
              >
                Configure
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Facebook */}
        <Card className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <Facebook className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-800">Facebook</h3>
                  <Badge variant="outline" className="bg-red-50 text-red-500 text-xs border-0">
                    Permissions Expired
                  </Badge>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Sync leads from your Facebook Lead Ads campaigns directly to Leadly
              </p>
              <Button 
                onClick={() => handleConnect('Facebook')}
                className="w-full text-white bg-blue-600 hover:bg-blue-700"
              >
                Connect
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* LinkedIn */}
        <Card className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <Linkedin className="h-5 w-5 text-blue-700" />
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-800">LinkedIn</h3>
                  <Badge variant="outline" className="bg-gray-100 text-gray-500 text-xs border-0">
                    Not Connected
                  </Badge>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Import leads from your LinkedIn Lead Gen Forms campaigns
              </p>
              <Button 
                onClick={() => handleConnect('LinkedIn')}
                className="w-full text-white bg-blue-700 hover:bg-blue-800"
              >
                Connect
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* WordPress */}
        <Card className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <div className="h-5 w-5 flex items-center justify-center text-blue-600 font-bold">W</div>
                </div>
                <h3 className="font-semibold text-gray-800">WordPress Websites</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Collect leads from WordPress contact forms and integrate directly with Leadly
              </p>
              <Button 
                onClick={() => handleConnect('WordPress')}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
              >
                Connect
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Google Forms */}
        <Card className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-red-100 rounded-full p-2">
                  <Circle className="h-5 w-5 text-red-500" />
                </div>
                <h3 className="font-semibold text-gray-800">Google Forms</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Connect your Google Forms to automatically create leads from form submissions
              </p>
              <Button 
                onClick={() => handleConnect('Google Forms')}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
              >
                Connect
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* TikTok */}
        <Card className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
          <CardContent className="p-0">
            <div className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-black rounded-full p-2">
                  <TiktokLogo className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-semibold text-gray-800">TikTok</h3>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Import leads generated from your TikTok Lead Generation ads
              </p>
              <Button 
                onClick={() => handleConnect('TikTok')}
                className="w-full bg-white hover:bg-gray-50 text-gray-700 border border-gray-300"
              >
                Connect
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LeadSourcesTab;
