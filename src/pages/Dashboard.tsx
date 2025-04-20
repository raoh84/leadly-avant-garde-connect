
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import ClientList from '@/components/clients/ClientList';
import RecentActivityList from '@/components/clients/RecentActivityList';
import TeamMembers from '@/components/team/TeamMembers';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/auth');
      }
    };
    checkAuth();
  }, [navigate]);

  const { data: clientsCount, isLoading: isLoadingClients } = useQuery({
    queryKey: ['clientsCount'],
    queryFn: async () => {
      const { count } = await supabase
        .from('clients')
        .select('*', { count: 'exact', head: true });
      return count || 0;
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingClients ? (
              <Loader className="h-4 w-4 animate-spin" />
            ) : (
              <p className="text-2xl font-bold">{clientsCount}</p>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ClientList />
        </div>
        <div className="space-y-6">
          <RecentActivityList />
          <TeamMembers />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
