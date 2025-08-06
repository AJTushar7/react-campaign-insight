import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Target, Send, Users, MessageSquare } from "lucide-react";
import { mockKPIData, mockChannelPerformance } from "@/data/mock-data";

export default function ChannelPerformance() {
  const kpis = mockKPIData.map(kpi => ({
    ...kpi,
    icon: kpi.icon === "TrendingUp" ? TrendingUp :
          kpi.icon === "Target" ? Target :
          kpi.icon === "Send" ? Send : Users
  }));

  const channels = mockChannelPerformance;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <MessageSquare className="w-5 h-5 text-blue-600 mr-2" />
          <CardTitle className="text-xl font-semibold text-gray-900">Channel Performance</CardTitle>
        </div>
        <p className="text-sm text-gray-600">Multi-channel campaign analytics inspired by Mixpanel & Amplitude</p>
      </CardHeader>
      <CardContent>
        {/* KPI Overview Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div key={index} className={`${kpi.bgColor} border rounded-lg p-4`} data-testid={`kpi-card-${index}`}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1" data-testid={`kpi-value-${index}`}>
                      {kpi.value}
                    </p>
                    <div className="flex items-center mt-1">
                      {kpi.changeType === "positive" && (
                        <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                      )}
                      <span 
                        className={`text-xs ${
                          kpi.changeType === "positive" 
                            ? "text-green-600" 
                            : kpi.changeType === "negative" 
                              ? "text-red-600" 
                              : "text-gray-500"
                        }`}
                      >
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-2 ${kpi.bgColor} rounded-lg`}>
                    <Icon className={`w-5 h-5 ${kpi.iconColor}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Channel Performance Grid */}
        <div>
          <h3 className="font-medium text-gray-900 mb-3">Channel Breakdown</h3>
          <div className="grid grid-cols-1 gap-3">
            {channels.map((channel, index) => (
              <div 
                key={index}
                className={`${channel.bgColor} ${channel.borderColor} border rounded-lg p-3`}
                data-testid={`channel-card-${index}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 ${channel.iconColor} rounded flex items-center justify-center mr-3`}>
                      <i className={`${channel.icon} text-white text-sm`}></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{channel.name}</h4>
                      <p className={`text-xs ${channel.efficiencyColor}`}>{channel.efficiency}% efficiency</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    <div>
                      <p className="text-gray-600 text-xs">Open Rate</p>
                      <p className={`font-medium ${channel.efficiencyColor}`}>{channel.openRate}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs">CTR</p>
                      <p className={`font-medium ${channel.efficiencyColor}`}>{channel.ctr}</p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-xs">Cost/Lead</p>
                      <p className={`font-medium ${channel.efficiencyColor}`}>{channel.costPerLead}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}