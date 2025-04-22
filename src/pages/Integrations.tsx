
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import IntegrationsTabs from '@/components/integrations/IntegrationsTabs';
import { useToast } from '@/hooks/use-toast';

const Integrations = () => {
  const navigate = useNavigate();
  const { tab = 'sources' } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          navigate('/auth');
          return;
        }
        
        // User is authenticated, continue loading the dashboard
        setIsLoading(false);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "Please sign in to access the integrations.",
        });
        navigate('/auth');
      }
    };
    
    checkAuth();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-leadly-purple"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <IntegrationsTabs activeTab={tab} />
        </div>
      </div>
    </div>
  );
};

export default Integrations;
