
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader } from 'lucide-react';

type ContentView = {
  id: string;
  client_id: string;
  content_type: string;
  viewed_at: string;
  clients: {
    name: string;
  };
};

const RecentActivityList = () => {
  const { data: activities, isLoading } = useQuery({
    queryKey: ['recentActivity'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content_views')
        .select('*, clients(name)')
        .order('viewed_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data as ContentView[];
    }
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center p-4">
            <Loader className="h-6 w-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities?.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{activity.clients.name}</p>
                <p className="text-sm text-gray-500">{activity.content_type}</p>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(activity.viewed_at).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivityList;
