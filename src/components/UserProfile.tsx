
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const UserProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  // Get language context safely
  let t: (key: string) => string;
  try {
    const langContext = useLanguage();
    t = langContext.t;
  } catch (error) {
    // Fallback if the language context is not available
    t = (key: string) => {
      // Default translations for critical text
      const defaults: Record<string, string> = {
        'nav.logout': 'Logout',
        'auth.logoutSuccess': 'Successfully logged out',
        'auth.error': 'Error'
      };
      return defaults[key] || key;
    };
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/');
      toast({
        title: t('auth.logoutSuccess'),
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: t('auth.error'),
        description: error.message,
      });
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Avatar>
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <Button variant="ghost" onClick={handleLogout}>
        {t('nav.logout')}
      </Button>
    </div>
  );
};
