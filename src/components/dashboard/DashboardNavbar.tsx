
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { UserProfile } from '@/components/UserProfile';
import { Settings } from 'lucide-react';

const navTabs = [
  { label: "Clients", value: "clients" },
  { label: "Content", value: "content" },
  { label: "Team", value: "team" },
  { label: "Integrations", value: "integrations" },
];

const DashboardNavbar = () => {
  const { pathname } = useLocation();
  const getTabFromPath = () => {
    const match = pathname.split("/")[2] || "clients";
    return navTabs.find(tab => tab.value === match) ? match : "clients";
  };

  const [activeTab, setActiveTab] = useState(getTabFromPath());
  const navigate = useNavigate();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/dashboard/${value}`);
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  return (
    <div className="border-b bg-white shadow-sm">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-2xl font-bold text-leadly-purple select-none">Leadly</h2>
            <Tabs value={activeTab} onValueChange={handleTabChange} className="ml-6">
              <TabsList className="bg-transparent border gap-0 px-1 py-1 rounded-lg transition">
                {navTabs.map(tab => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={`rounded-md px-5 py-2 font-medium transition
                      ${activeTab === tab.value
                        ? 'bg-leadly-purple text-white shadow-md border border-leadly-purple'
                        : 'bg-white text-gray-700 border border-transparent'
                      }
                    `}
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleSettings}
              variant="ghost"
              className="rounded-full px-2 py-2"
              aria-label="Settings"
            >
              <Settings className="h-6 w-6 text-leadly-purple" />
            </Button>
            <UserProfile />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
