import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Settings, RotateCcw } from "lucide-react";

export default function ChannelComparison() {
  const channels = [
    {
      name: "WhatsApp",
      icon: "fab fa-whatsapp",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "bg-green-500",
      openRate: "98.5%",
      ctr: "28.7%", 
      costPerLead: "₹32",
      efficiency: 95,
      efficiencyColor: "text-green-600"
    },
    {
      name: "SMS", 
      icon: "fas fa-sms",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "bg-blue-500",
      openRate: "97.0%",
      ctr: "18.0%",
      costPerLead: "₹28", 
      efficiency: 88,
      efficiencyColor: "text-blue-600"
    },
    {
      name: "Email",
      icon: "fas fa-envelope", 
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      iconColor: "bg-purple-500",
      openRate: "24.5%",
      ctr: "8.0%",
      costPerLead: "₹18",
      efficiency: 72,
      efficiencyColor: "text-purple-600"
    },
    {
      name: "Push",
      icon: "fas fa-bell",
      bgColor: "bg-orange-50", 
      borderColor: "border-orange-200",
      iconColor: "bg-orange-500", 
      openRate: "92.5%",
      ctr: "3.0%",
      costPerLead: "₹45",
      efficiency: 68,
      efficiencyColor: "text-orange-600"
    },
    {
      name: "RCS",
      icon: "fas fa-comment-dots",
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-200", 
      iconColor: "bg-cyan-500",
      openRate: "89.2%",
      ctr: "15.5%",
      costPerLead: "₹38",
      efficiency: 75,
      efficiencyColor: "text-cyan-600"
    }
  ];

  const recommendations = [
    {
      icon: TrendingUp,
      title: "Increase WhatsApp spend",
      description: "Highest ROI and engagement rates",
      iconColor: "text-green-500"
    },
    {
      icon: Settings,
      title: "Optimize Push timing", 
      description: "Low CTR suggests wrong timing",
      iconColor: "text-blue-500"
    },
    {
      icon: RotateCcw,
      title: "A/B test RCS content",
      description: "Good potential, needs optimization",
      iconColor: "text-orange-500"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">Channel Performance Comparison</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          {channels.map((channel, index) => (
            <div 
              key={index}
              className={`text-center p-6 ${channel.bgColor} ${channel.borderColor} border rounded-lg`}
              data-testid={`channel-card-${index}`}
            >
              <div className={`w-12 h-12 ${channel.iconColor} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                <i className={`${channel.icon} text-white text-xl`}></i>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">{channel.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Open Rate</span>
                  <span className={`font-medium ${channel.efficiencyColor}`}>{channel.openRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">CTR</span>
                  <span className={`font-medium ${channel.efficiencyColor}`}>{channel.ctr}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cost/Lead</span>
                  <span className={`font-medium ${channel.efficiencyColor}`}>{channel.costPerLead}</span>
                </div>
              </div>
              <div className="mt-4">
                <Progress value={channel.efficiency} className="h-2 mb-1" />
                <p className={`text-xs ${channel.efficiencyColor}`}>{channel.efficiency}% efficiency</p>
              </div>
            </div>
          ))}
        </div>

        {/* Channel Recommendations */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-3">Channel Optimization Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            {recommendations.map((rec, index) => {
              const Icon = rec.icon;
              return (
                <div key={index} className="flex items-start" data-testid={`recommendation-${index}`}>
                  <Icon className={`w-4 h-4 ${rec.iconColor} mr-2 mt-1 flex-shrink-0`} />
                  <div>
                    <p className="font-medium text-gray-900">{rec.title}</p>
                    <p className="text-gray-600">{rec.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
