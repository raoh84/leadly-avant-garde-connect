import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { UserProfile } from './UserProfile';

const Navbar = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

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
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-leadly-purple">
                Leadly
              </Link>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <a href="#features" className="text-gray-700 hover:text-leadly-purple px-3 py-2 rounded-md text-sm font-medium">
                  {t('nav.features')}
                </a>
                <a href="#pricing" className="text-gray-700 hover:text-leadly-purple px-3 py-2 rounded-md text-sm font-medium">
                  {t('nav.pricing')}
                </a>
                <a href="#faq" className="text-gray-700 hover:text-leadly-purple px-3 py-2 rounded-md text-sm font-medium">
                  {t('nav.faq')}
                </a>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="text-sm font-medium text-gray-700 hover:text-leadly-purple"
            >
              {language === 'en' ? 'FR' : 'EN'}
            </button>
            {user ? (
              <UserProfile />
            ) : (
              <>
                <Button variant="ghost" className="text-gray-700" onClick={() => navigate('/auth')}>
                  {t('nav.login')}
                </Button>
                <Button className="bg-leadly-purple hover:bg-leadly-purple/90" onClick={() => navigate('/auth')}>
                  {t('nav.getStarted')}
                </Button>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleLanguage}
              className="mr-4 text-sm font-medium text-gray-700 hover:text-leadly-purple"
            >
              {language === 'en' ? 'FR' : 'EN'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-leadly-purple focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#features"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-leadly-purple"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.features')}
            </a>
            <a
              href="#pricing"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-leadly-purple"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.pricing')}
            </a>
            <a
              href="#faq"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-leadly-purple"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.faq')}
            </a>
            <div className="pt-4 pb-3 border-t border-gray-200">
              {user ? (
                <div className="px-5">
                  <Button onClick={handleLogout} variant="ghost" className="w-full text-gray-700 justify-start">
                    {t('nav.logout')}
                  </Button>
                </div>
              ) : (
                <>
                  <div className="flex items-center px-5">
                    <Button variant="ghost" className="w-full text-gray-700 justify-start" onClick={() => { navigate('/auth'); setIsOpen(false); }}>
                      {t('nav.login')}
                    </Button>
                  </div>
                  <div className="mt-3 px-5">
                    <Button className="w-full bg-leadly-purple hover:bg-leadly-purple/90" onClick={() => { navigate('/auth'); setIsOpen(false); }}>
                      {t('nav.getStarted')}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
