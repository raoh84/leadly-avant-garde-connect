
import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ClientList from './ClientList';
import RecentActivityList from './RecentActivityList';

const ClientTabs = () => {
  return (
    <Tabs defaultValue="all">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="all">All Clients</TabsTrigger>
          <TabsTrigger value="uncontacted">Uncontacted</TabsTrigger>
          <TabsTrigger value="followups">Follow Ups</TabsTrigger>
          <TabsTrigger value="recentlyViewed">Recently Viewed Content</TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="all">
        <ClientList filter="all" />
      </TabsContent>
      <TabsContent value="uncontacted">
        <ClientList filter="uncontacted" />
      </TabsContent>
      <TabsContent value="followups">
        <ClientList filter="follow-up" />
      </TabsContent>
      <TabsContent value="recentlyViewed">
        <RecentActivityList />
      </TabsContent>
    </Tabs>
  );
};

export default ClientTabs;
