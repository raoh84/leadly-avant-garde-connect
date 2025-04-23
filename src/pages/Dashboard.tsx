
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import ClientTabs from '@/components/clients/ClientTabs';
import { useToast } from '@/hooks/use-toast';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const navigate = useNavigate();
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
        
        setIsLoading(false);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Authentication Error",
          description: "Please sign in to access the dashboard.",
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
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <DashboardNavbar />
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap gap-3 mb-4">
            <Button asChild variant="outline">
              <Link to="/leads">Leads</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/templates">Templates</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/subscribe">Subscription</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/settings">Settings</Link>
            </Button>
          </div>
          <div className="md:col-span-2">
            <ClientTabs />
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
};

export default Dashboard;
