
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Loader, CalendarDays } from 'lucide-react';

type RecentActivity = {
  id: string;
  client_id: string;
  content_type: string;
  viewed_at: string;
  client: {
    name: string;
  };
};

const RecentActivityList = () => {
  const { data: activities, isLoading } = useQuery({
    queryKey: ['recentActivities'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content_views')
        .select('*, client:clients(name)')
        .order('viewed_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data as RecentActivity[];
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
          {activities?.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No recent activity found.</p>
          ) : (
            activities?.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>{activity.client?.name?.charAt(0) || 'C'}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium">{activity.client?.name}</p>
                  <p className="text-sm text-gray-500">Viewed {activity.content_type}</p>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  {new Date(activity.viewed_at).toLocaleDateString()}
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivityList;
