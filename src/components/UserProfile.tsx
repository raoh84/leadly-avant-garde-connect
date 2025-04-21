
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const UserProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const langContext = useLanguage();
  const t = langContext?.t ?? ((key: string) => key);

  // Show user avatar & initials
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [initials, setInitials] = useState("U");

  useEffect(() => {
    // Retrieve user from Supabase
    supabase.auth.getUser().then(({ data }) => {
      const user = data?.user;
      if (user) {
        // Try to get avatar from user's metadata if available
        const avatarMeta = (user.user_metadata && user.user_metadata.avatar_url) || null;
        setAvatarUrl(avatarMeta ?? null);

        // Get initials
        let initials = (user.user_metadata && user.user_metadata.full_name) ?
          user.user_metadata.full_name.split(' ').map((n: string) => n[0]).join('') :
          (user.email ? user.email.substring(0, 2).toUpperCase() : "U");
        setInitials(initials);
      }
    });
  }, []);

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
      <Avatar className="h-9 w-9 border border-gray-200">
        {avatarUrl ? (
          <AvatarImage src={avatarUrl} alt="User Avatar" />
        ) : (
          <AvatarFallback className="bg-leadly-soft-purple text-leadly-purple font-bold">
            {initials}
          </AvatarFallback>
        )}
      </Avatar>
      <Button variant="ghost" onClick={handleLogout} className="font-medium text-gray-700">
        {t('nav.logout')}
      </Button>
    </div>
  );
};
