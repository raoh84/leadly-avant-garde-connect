
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import ClientTabs from '@/components/clients/ClientTabs';
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

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <ClientTabs />
          </div>
          <div>
            <TeamMembers />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
