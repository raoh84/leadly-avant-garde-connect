
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Facebook } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const FacebookIntegration = () => {
  const { toast } = useToast();
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pageId, setPageId] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const handleConnect = () => {
    setIsDialogOpen(true);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    toast({
      title: "Facebook Disconnected",
      description: "Your Facebook account has been disconnected from Leadly."
    });
  };

  const handleSubmitCredentials = () => {
    if (!pageId || !accessToken) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide both Facebook Page ID and Access Token."
      });
      return;
    }

    setIsConnecting(true);
    
    // Simulating API call to connect with Facebook
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      setIsDialogOpen(false);
      
      toast({
        title: "Connection Successful",
        description: "Your Facebook account has been connected to Leadly."
      });
    }, 1500);
  };

  return (
    <>
      <Card className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-0">
          <div className="p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-blue-100 rounded-full p-2">
                <Facebook className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-gray-800">Facebook</h3>
                {isConnected ? (
                  <Badge variant="outline" className="bg-green-50 text-green-600 text-xs border-0">
                    Connected
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-100 text-gray-500 text-xs border-0">
                    Not Connected
                  </Badge>
                )}
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Sync leads from your Facebook Lead Ads campaigns directly to Leadly
            </p>
            {isConnected ? (
              <div className="space-y-4">
                <div className="text-sm text-gray-600">
                  <p className="mb-1"><span className="font-medium">Page:</span> My Business Page</p>
                  <p><span className="font-medium">Last Synced:</span> {new Date().toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => toast({ title: "Syncing Leads", description: "Fetching latest leads from Facebook..." })}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Sync Now
                  </Button>
                  <Button 
                    onClick={handleDisconnect}
                    variant="outline" 
                    className="flex-1 border-red-300 text-red-500 hover:bg-red-50"
                  >
                    Disconnect
                  </Button>
                </div>
              </div>
            ) : (
              <Button 
                onClick={handleConnect}
                className="w-full text-white bg-blue-600 hover:bg-blue-700"
              >
                Connect
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Connect Facebook Lead Ads</DialogTitle>
            <DialogDescription>
              Enter your Facebook Page ID and Access Token to connect your Facebook Lead Ads campaigns.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="pageId">Facebook Page ID</Label>
              <Input 
                id="pageId" 
                value={pageId} 
                onChange={(e) => setPageId(e.target.value)} 
                placeholder="Enter your Facebook Page ID"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accessToken">Access Token</Label>
              <Input 
                id="accessToken" 
                value={accessToken} 
                onChange={(e) => setAccessToken(e.target.value)} 
                type="password"
                placeholder="Enter your Facebook Access Token"
              />
              <p className="text-xs text-gray-500 mt-1">
                You can generate an access token in the Facebook Developer Portal.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isConnecting}>
              Cancel
            </Button>
            <Button onClick={handleSubmitCredentials} disabled={isConnecting} className="bg-blue-600 hover:bg-blue-700">
              {isConnecting ? "Connecting..." : "Connect"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FacebookIntegration;
