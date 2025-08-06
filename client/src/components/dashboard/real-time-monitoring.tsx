import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Clock, CheckCircle } from "lucide-react";

export default function RealTimeMonitoring() {
  const campaigns = [
    {
      name: "Diwali Festival Sale",
      status: "Active",
      statusType: "warning",
      burnRate: 88,
      sent: "16L",
      total: "200K",
      percentage: 78,
      spent: 8600,
      budget: 10000,
      icon: AlertTriangle,
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      name: "New Model Launch", 
      status: "Active",
      statusType: "info",
      burnRate: 62,
      sent: "93.3K",
      total: "200K", 
      percentage: 46,
      spent: 6200,
      budget: 12000,
      icon: Clock,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      name: "Service Reminder",
      status: "Completed",
      statusType: "success", 
      burnRate: 100,
      sent: "75K",
      total: "75K",
      percentage: 100,
      spent: 3750,
      budget: 3750,
      icon: CheckCircle,
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      name: "Insurance Renewal",
      status: "Scheduled", 
      statusType: "default",
      burnRate: 0,
      sent: "0",
      total: "120K",
      percentage: 0,
      spent: 0,
      budget: 6000,
      icon: Clock,
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-gray-900">Real-time Campaign Monitoring</CardTitle>
            <p className="text-sm text-gray-600 mt-1">Live tracking with budget burn rate analysis</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" data-testid="button-card-view">Card View</Button>
            <Button size="sm" data-testid="button-table-view">Table View</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {campaigns.map((campaign, index) => {
            const Icon = campaign.icon;
            const getStatusColor = () => {
              switch(campaign.statusType) {
                case 'warning': return 'bg-orange-100 text-orange-800';
                case 'info': return 'bg-blue-100 text-blue-800';
                case 'success': return 'bg-green-100 text-green-800';
                default: return 'bg-gray-100 text-gray-800';
              }
            };

            const getProgressColor = () => {
              if (campaign.burnRate >= 85) return 'bg-orange-500';
              if (campaign.burnRate >= 70) return 'bg-blue-500';
              if (campaign.burnRate === 100 && campaign.status === 'Completed') return 'bg-green-500';
              return 'bg-gray-500';
            };

            return (
              <div 
                key={index}
                className={`${campaign.bgColor} ${campaign.borderColor} border rounded-lg p-4`}
                data-testid={`campaign-card-${index}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                  <Badge className={getStatusColor()}>{campaign.status}</Badge>
                </div>
                
                <div className="flex items-center text-sm mb-2">
                  <Icon className="w-4 h-4 mr-2" />
                  <span>{campaign.burnRate}% burn rate</span>
                </div>
                
                <div className="text-sm text-gray-600 mb-3">
                  {campaign.sent} / {campaign.total} sent ({campaign.percentage}%)
                </div>
                
                <Progress value={campaign.burnRate} className="mb-3" />
                
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-600">
                    ₹{campaign.spent.toLocaleString()} / ₹{campaign.budget.toLocaleString()} spent
                  </span>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-primary hover:underline p-0 h-auto"
                    data-testid={`button-action-${index}`}
                  >
                    {campaign.status === 'Scheduled' ? 'Launch Now' : 
                     campaign.status === 'Active' ? 'Optimize' : 'Duplicate'}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
