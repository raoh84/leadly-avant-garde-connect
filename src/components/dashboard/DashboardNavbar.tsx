
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { UserProfile } from '@/components/UserProfile';

const DashboardNavbar = () => {
  const [activeTab, setActiveTab] = useState("clients");
  const navigate = useNavigate();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/dashboard/${value}`);
  };

  return (
    <div className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold text-leadly-purple">Leadly</h2>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="ml-6">
              <TabsList className="bg-gray-100">
                <TabsTrigger 
                  value="clients"
                  className="data-[state=active]:bg-leadly-purple data-[state=active]:text-white"
                >
                  Clients
                </TabsTrigger>
                <TabsTrigger 
                  value="content"
                  className="data-[state=active]:bg-leadly-purple data-[state=active]:text-white"
                >
                  Content
                </TabsTrigger>
                <TabsTrigger 
                  value="team"
                  className="data-[state=active]:bg-leadly-purple data-[state=active]:text-white"
                >
                  Team
                </TabsTrigger>
                <TabsTrigger 
                  value="integrations"
                  className="data-[state=active]:bg-leadly-purple data-[state=active]:text-white"
                >
                  Integrations
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <UserProfile />
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
