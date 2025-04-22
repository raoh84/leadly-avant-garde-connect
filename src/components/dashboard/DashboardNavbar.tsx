
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { UserProfile } from '@/components/UserProfile';
import { Menu, X, Users, Settings, Link as LinkIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMediaQuery } from '@/hooks/use-mobile';

const DashboardNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const location = useLocation();
  
  // Try to use language context, but provide fallback if not available
  let language = 'en';
  let t = (key: string) => key;
  
  try {
    const languageContext = useLanguage();
    if (languageContext) {
      language = languageContext.language;
      t = languageContext.t;
    }
  } catch (error) {
    console.error("Language context not available:", error);
  }

  const navItems = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Team', path: '/team' },
    { label: 'Integrations', path: '/integrations' },
    { label: 'Settings', path: '/settings' }
  ];

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-leadly-purple">Leadly</span>
            </Link>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                    isActive(item.path)
                      ? 'text-leadly-purple border-b-2 border-leadly-purple'
                      : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Button 
              variant="outline" 
              className="border-leadly-purple text-leadly-purple hover:bg-leadly-purple/10"
              asChild
            >
              <Link to="/dashboard">
                <LinkIcon className="mr-2 h-4 w-4" />
                Contacts
              </Link>
            </Button>
            <Button 
              className="bg-leadly-purple hover:bg-leadly-purple/90 text-white"
              asChild
            >
              <Link to="/team">
                <Users className="mr-2 h-4 w-4" />
                Team
              </Link>
            </Button>
            <UserProfile />
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-leadly-purple focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && isMobile && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? 'bg-leadly-purple/10 text-leadly-purple'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-3">
                <div className="flex-shrink-0">
                  <UserProfile />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default DashboardNavbar;
