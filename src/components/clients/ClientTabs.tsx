
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ClientList from './ClientList';
import RecentActivityList from './RecentActivityList';

const ClientTabs = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <Tabs 
        defaultValue="all" 
        onValueChange={(value) => setActiveFilter(value)}
        className="w-full"
      >
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold mb-4 text-leadly-dark">Clients</h2>
          <TabsList className="w-full bg-gray-100">
            <TabsTrigger 
              value="all" 
              className="flex-1 data-[state=active]:bg-leadly-purple data-[state=active]:text-white"
            >
              All Clients
            </TabsTrigger>
            <TabsTrigger 
              value="uncontacted"
              className="flex-1 data-[state=active]:bg-leadly-purple data-[state=active]:text-white"
            >
              Uncontacted
            </TabsTrigger>
            <TabsTrigger 
              value="followups"
              className="flex-1 data-[state=active]:bg-leadly-purple data-[state=active]:text-white"
            >
              Follow Ups
            </TabsTrigger>
            <TabsTrigger 
              value="recentlyViewed"
              className="flex-1 data-[state=active]:bg-leadly-purple data-[state=active]:text-white"
            >
              Recently Viewed
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="p-0 m-0">
          <ClientList filter="all" />
        </TabsContent>
        <TabsContent value="uncontacted" className="p-0 m-0">
          <ClientList filter="uncontacted" />
        </TabsContent>
        <TabsContent value="followups" className="p-0 m-0">
          <ClientList filter="follow-up" />
        </TabsContent>
        <TabsContent value="recentlyViewed" className="p-0 m-0">
          <RecentActivityList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientTabs;
