
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ClientList from './ClientList';
import RecentActivityList from './RecentActivityList';

const tabList = [
  { value: "all", label: "All Clients" },
  { value: "uncontacted", label: "Uncontacted" },
  { value: "followups", label: "Follow Ups" },
  { value: "recentlyViewed", label: "Recently Viewed" },
];

const ClientTabs = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  return (
    <div className="bg-white rounded-2xl shadow even-md border p-6">
      <h2 className="text-2xl font-semibold mb-5 text-leadly-dark">Clients</h2>
      <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full">
        <TabsList className="w-full bg-transparent flex gap-1 border-b-2 border-gray-100 mb-6 px-0">
          {tabList.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`
                flex-1 px-3 py-2 rounded-md font-medium transition
                ${activeFilter === tab.value
                  ? "bg-leadly-purple text-white shadow border-b-4 border-leadly-purple"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
              style={{ minWidth: 0 }}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="mt-3">
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
        </div>
      </Tabs>
    </div>
  );
};

export default ClientTabs;
