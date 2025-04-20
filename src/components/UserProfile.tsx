
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const UserProfile = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

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
