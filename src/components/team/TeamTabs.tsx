
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TeamDashboard from './TeamDashboard';
import TeamMembersList from './TeamMembersList';
import SubTeams from './SubTeams';
import LeadAssignment from './LeadAssignment';

interface TeamTabsProps {
  activeTab?: string;
}

const TeamTabs: React.FC<TeamTabsProps> = ({ activeTab = 'dashboard' }) => {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const navigate = useNavigate();

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    navigate(`/team/${value}`);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Team</h1>
          <p className="text-gray-500 mt-1">Manage your team members and track their performance</p>
        </div>
      </div>

      <Tabs defaultValue={currentTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="w-full flex mb-6 bg-transparent border-b">
          <TabsTrigger
            value="dashboard"
            className={`px-6 py-3 text-sm font-medium rounded-t-md transition-all ${
              currentTab === 'dashboard'
                ? 'border-b-2 border-leadly-purple text-leadly-purple'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Team Dashboard
          </TabsTrigger>
          <TabsTrigger
            value="members"
            className={`px-6 py-3 text-sm font-medium rounded-t-md transition-all ${
              currentTab === 'members'
                ? 'border-b-2 border-leadly-purple text-leadly-purple'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Team Members
          </TabsTrigger>
          <TabsTrigger
            value="subteams"
            className={`px-6 py-3 text-sm font-medium rounded-t-md transition-all ${
              currentTab === 'subteams'
                ? 'border-b-2 border-leadly-purple text-leadly-purple'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Subteams
          </TabsTrigger>
          <TabsTrigger
            value="assignment"
            className={`px-6 py-3 text-sm font-medium rounded-t-md transition-all ${
              currentTab === 'assignment'
                ? 'border-b-2 border-leadly-purple text-leadly-purple'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Lead Assignment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-4">
          <TeamDashboard />
        </TabsContent>
        
        <TabsContent value="members" className="mt-4">
          <TeamMembersList />
        </TabsContent>
        
        <TabsContent value="subteams" className="mt-4">
          <SubTeams />
        </TabsContent>
        
        <TabsContent value="assignment" className="mt-4">
          <LeadAssignment />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeamTabs;
