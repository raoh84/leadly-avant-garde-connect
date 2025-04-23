
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Database } from '@/integrations/supabase/types';
import DashboardNavbar from '@/components/dashboard/DashboardNavbar';
import { 
  AlertCircle, 
  BellRing, 
  ChevronRight,
  ExternalLink,
  Facebook,
  MessageCircle,
  PenSquare, 
  Settings as SettingsIcon, 
  Smartphone, 
  Users,
  UserCircle
} from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import ProfileEditor from '@/components/settings/ProfileEditor';

type Profile = Database['public']['Tables']['profiles']['Row'];

const SettingsPage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState(true);
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Notification settings
  const [emailAlerts, setEmailAlerts] = useState(false);
  const [dailySummaryOption, setDailySummaryOption] = useState("always");
  const [dailySummaryHour, setDailySummaryHour] = useState(9);
  const [dailySummaryMinute, setDailySummaryMinute] = useState(0);
  const [dailySummaryAmPm, setDailySummaryAmPm] = useState("AM");

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate('/auth');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
        return;
      }

      setProfile(data);
      setLoading(false);
    };

    fetchProfile();
  }, [navigate, toast]);

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully."
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-leadly-purple"></div>
      </div>
    );
  }

  const renderSettingsNavigation = () => (
    <div className="w-full md:w-64 space-y-2 mb-6 md:mb-0">
      <div 
        className={`p-3 rounded-lg flex items-center space-x-3 cursor-pointer
          ${activeTab === "profile" ? "bg-leadly-soft-purple text-leadly-purple font-medium" : "hover:bg-gray-100"}`}
        onClick={() => setActiveTab("profile")}
      >
        <UserCircle className="w-5 h-5" />
        <span>Edit Profile</span>
      </div>
      <div 
        className={`p-3 rounded-lg flex items-center space-x-3 cursor-pointer
          ${activeTab === "settings" ? "bg-leadly-soft-purple text-leadly-purple font-medium" : "hover:bg-gray-100"}`}
        onClick={() => setActiveTab("settings")}
      >
        <SettingsIcon className="w-5 h-5" />
        <span>Settings</span>
      </div>
      <div 
        className={`p-3 rounded-lg flex items-center space-x-3 cursor-pointer
          ${activeTab === "personalization" ? "bg-leadly-soft-purple text-leadly-purple font-medium" : "hover:bg-gray-100"}`}
        onClick={() => setActiveTab("personalization")}
      >
        <PenSquare className="w-5 h-5" />
        <span>Personalisation</span>
      </div>
      <div 
        className={`p-3 rounded-lg flex items-center space-x-3 cursor-pointer
          ${activeTab === "followups" ? "bg-leadly-soft-purple text-leadly-purple font-medium" : "hover:bg-gray-100"}`}
        onClick={() => setActiveTab("followups")}
      >
        <AlertCircle className="w-5 h-5" />
        <span>Follow Ups</span>
      </div>
      <div 
        className={`p-3 rounded-lg flex items-center space-x-3 cursor-pointer
          ${activeTab === "uncontacted" ? "bg-leadly-soft-purple text-leadly-purple font-medium" : "hover:bg-gray-100"}`}
        onClick={() => setActiveTab("uncontacted")}
      >
        <Users className="w-5 h-5" />
        <span>Uncontacted Leads</span>
      </div>
      <div 
        className="p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-100"
        onClick={() => navigate('/subscribe')}
      >
        <div className="flex items-center space-x-3">
          <Facebook className="w-5 h-5" />
          <span>Facebook Pixel & GTM</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-500" />
      </div>
      <div 
        className="p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-100"
      >
        <div className="flex items-center space-x-3">
          <MessageCircle className="w-5 h-5" />
          <span>Chat With Us</span>
        </div>
        <ExternalLink className="w-4 h-4 text-gray-500" />
      </div>
      <div 
        className="p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-100"
        onClick={() => navigate('/subscribe')}
      >
        <div className="flex items-center space-x-3">
          <AlertCircle className="w-5 h-5" />
          <span>Subscription</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-500" />
      </div>
      <div 
        className="p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-100"
        onClick={() => window.open('/guide', '_blank')}
      >
        <div className="flex items-center space-x-3">
          <ExternalLink className="w-5 h-5" />
          <span>User Guide</span>
        </div>
        <ExternalLink className="w-4 h-4 text-gray-500" />
      </div>
    </div>
  );

  const renderSettingsContent = () => {
    switch (activeTab) {
      case "profile":
        return profile && <ProfileEditor profile={profile} />;
      case "settings":
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Configure how you want to be notified about important events.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium">Mobile App Notifications</h3>
                      <p className="text-sm text-gray-500">
                        Manage app notifications in the Privyr mobile app
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Smartphone className="w-4 h-4" />
                      <span className="hidden md:inline">Open App</span>
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium">New Lead Email Alerts</h3>
                    <p className="text-sm text-gray-500">
                      Get immediate email alerts for new leads via your integrations
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={emailAlerts}
                      onCheckedChange={setEmailAlerts}
                      id="email-alerts"
                    />
                    <Label htmlFor="email-alerts" className="text-xs text-gray-500">Via Email</Label>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Daily Summary Email</h3>
                  <RadioGroup value={dailySummaryOption} onValueChange={setDailySummaryOption}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="always" id="always" />
                      <Label htmlFor="always">Always send</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="updates" id="updates" />
                      <Label htmlFor="updates">Send if there are updates</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="never" id="never" />
                      <Label htmlFor="never">Never send</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {dailySummaryOption !== "never" && (
                  <div>
                    <h4 className="text-sm font-medium mb-3">Daily Summary Email Timing</h4>
                    <div className="flex items-center gap-2">
                      <select 
                        value={dailySummaryHour}
                        onChange={(e) => setDailySummaryHour(parseInt(e.target.value))}
                        className="border rounded-md p-2"
                      >
                        {Array.from({ length: 12 }, (_, i) => i + 1).map(hour => (
                          <option key={hour} value={hour}>{hour}</option>
                        ))}
                      </select>
                      <span>:</span>
                      <select 
                        value={dailySummaryMinute}
                        onChange={(e) => setDailySummaryMinute(parseInt(e.target.value))}
                        className="border rounded-md p-2"
                      >
                        {Array.from({ length: 60 }, (_, i) => i).map(minute => (
                          <option key={minute} value={minute}>{minute.toString().padStart(2, '0')}</option>
                        ))}
                      </select>
                      <select 
                        value={dailySummaryAmPm}
                        onChange={(e) => setDailySummaryAmPm(e.target.value)}
                        className="border rounded-md p-2"
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleSaveSettings}
                className="bg-leadly-purple hover:bg-leadly-dark-purple"
              >
                SAVE
              </Button>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center p-8 bg-gray-50 rounded-lg">
            <p className="text-gray-500">This section is under development</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold">{activeTab === "profile" ? "Edit Profile" : "Settings"}</h1>
          {activeTab === "settings" && (
            <Badge variant="outline" className="ml-3 bg-leadly-soft-purple text-leadly-purple">
              {profile?.subscription_tier || 'Free'}
            </Badge>
          )}
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left sidebar navigation */}
          {renderSettingsNavigation()}
          
          {/* Main content area */}
          <div className="flex-1">
            {renderSettingsContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
