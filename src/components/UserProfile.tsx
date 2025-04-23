
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Settings, User, CreditCard, Smartphone, Book, MessageCircle, LogOut } from 'lucide-react';

export const UserProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const langContext = useLanguage();
  const t = langContext?.t ?? ((key: string) => key);

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

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-9 w-9 border border-gray-200 cursor-pointer">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt="User Avatar" />
          ) : (
            <AvatarFallback className="bg-leadly-soft-purple text-leadly-purple font-bold">
              {initials}
            </AvatarFallback>
          )}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleNavigation('/profile')}>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigation('/settings')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigation('/subscribe')}>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Subscription</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigation('/mobile-app')}>
          <Smartphone className="mr-2 h-4 w-4" />
          <span>Mobile App</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => window.open('/guide', '_blank')}>
          <Book className="mr-2 h-4 w-4" />
          <span>User Guide</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => window.open('/support', '_blank')}>
          <MessageCircle className="mr-2 h-4 w-4" />
          <span>Live Chat Support</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
