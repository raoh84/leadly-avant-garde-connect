
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from 'lucide-react';

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  status?: string;
  buttonText: string;
  buttonVariant?: 'default' | 'outline' | 'ghost';
  buttonColor?: string;
  onAction: () => void;
}

const IntegrationCard = ({
  title,
  description,
  icon: Icon,
  iconBgColor,
  iconColor,
  status,
  buttonText,
  buttonVariant = 'outline',
  buttonColor,
  onAction
}: IntegrationCardProps) => {
  return (
    <Card className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className={`${iconBgColor} rounded-full p-2`}>
              <Icon className={`h-5 w-5 ${iconColor}`} />
            </div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-800">{title}</h3>
              {status && (
                <Badge 
                  variant="outline" 
                  className={`
                    ${status.includes('Expired') ? 'bg-red-50 text-red-500' : 'bg-gray-100 text-gray-500'} 
                    text-xs border-0
                  `}
                >
                  {status}
                </Badge>
              )}
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <Button 
            onClick={onAction}
            className={`w-full ${buttonColor}`}
            variant={buttonVariant}
          >
            {buttonText}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IntegrationCard;
