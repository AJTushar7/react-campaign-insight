import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  GitBranch, 
  Route, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  ArrowRight,
  BarChart3
} from "lucide-react";

export default function OrchestrationAnalysis() {
  const orchestrationFlows = [
    {
      name: "Welcome Series",
      type: "Sequential",
      channels: ["Email", "SMS", "Push"],
      totalCustomers: "45.2K",
      completed: "38.1K",
      completionRate: 84.3,
      avgTimeToComplete: "3.2 days",
      conversionRate: "22.5%",
      status: "active",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      name: "Cart Abandonment",
      type: "Multi-channel Fallback",
      channels: ["Email", "WhatsApp", "SMS"],
      totalCustomers: "12.8K",
      completed: "9.4K",
      completionRate: 73.4,
      avgTimeToComplete: "45 mins",
      conversionRate: "18.2%",
      status: "active",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      name: "Re-engagement Campaign",
      type: "A/B Split Test",
      channels: ["WhatsApp", "Email"],
      totalCustomers: "28.5K",
      completed: "21.2K",
      completionRate: 74.4,
      avgTimeToComplete: "2.1 days",
      conversionRate: "8.7%",
      status: "paused",
      statusColor: "bg-yellow-100 text-yellow-800"
    }
  ];

  const fallbackAnalysis = [
    {
      primaryChannel: "Email",
      fallbackChannel: "WhatsApp",
      triggerCondition: "Not opened in 2 hours",
      fallbackRate: "15.2%",
      successRate: "68.4%",
      costImpact: "+₹2.8K",
      recommendation: "Reduce trigger time to 90 mins"
    },
    {
      primaryChannel: "SMS",
      fallbackChannel: "Push",
      triggerCondition: "Delivery failed",
      fallbackRate: "3.1%",
      successRate: "45.2%",
      costImpact: "-₹1.2K",
      recommendation: "Optimal configuration"
    }
  ];

  const journeyInsights = [
    "Multi-channel journeys show 34% higher conversion vs single-channel",
    "WhatsApp fallback from Email increases engagement by 67%",
    "Optimal wait time between touchpoints: 2-4 hours",
    "A/B testing shows personalized timing beats fixed schedules by 23%"
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <GitBranch className="w-5 h-5 text-purple-600 mr-2" />
            <CardTitle className="text-xl font-semibold text-gray-900">Orchestration Analysis</CardTitle>
          </div>
          <p className="text-sm text-gray-600">Journey analytics inspired by Braze & Klaviyo</p>
        </div>
      </CardHeader>
      <CardContent>
        {/* Journey Performance Overview */}
        <div className="space-y-4 mb-6">
          <h3 className="font-medium text-gray-900">Active Journey Flows</h3>
          {orchestrationFlows.map((flow, index) => (
            <div 
              key={index}
              className="border border-gray-200 rounded-lg p-4"
              data-testid={`orchestration-flow-${index}`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Route className="w-4 h-4 text-purple-600 mr-2" />
                  <div>
                    <h4 className="font-medium text-gray-900">{flow.name}</h4>
                    <p className="text-sm text-gray-600">{flow.type}</p>
                  </div>
                </div>
                <Badge className={flow.statusColor}>{flow.status}</Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-600">Total Customers</p>
                  <p className="font-medium">{flow.totalCustomers}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Completed</p>
                  <p className="font-medium text-green-600">{flow.completed}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Avg Time</p>
                  <p className="font-medium">{flow.avgTimeToComplete}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Conversion</p>
                  <p className="font-medium text-blue-600">{flow.conversionRate}</p>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-600">Completion Rate</span>
                  <span className="text-xs font-medium">{flow.completionRate}%</span>
                </div>
                <Progress value={flow.completionRate} className="h-2" />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {flow.channels.map((channel, channelIndex) => (
                    <div key={channelIndex} className="flex items-center">
                      <Badge variant="outline" className="text-xs">{channel}</Badge>
                      {channelIndex < flow.channels.length - 1 && (
                        <ArrowRight className="w-3 h-3 text-gray-400 mx-1" />
                      )}
                    </div>
                  ))}
                </div>
                <Button variant="link" size="sm" className="text-primary p-0" data-testid={`button-view-journey-${index}`}>
                  View Journey
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Fallback Analysis */}
        <div className="mb-6">
          <h3 className="font-medium text-gray-900 mb-3">Fallback Channel Analysis</h3>
          <div className="space-y-3">
            {fallbackAnalysis.map((fallback, index) => (
              <div 
                key={index}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                data-testid={`fallback-analysis-${index}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{fallback.primaryChannel}</Badge>
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                    <Badge variant="outline">{fallback.fallbackChannel}</Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">Success: {fallback.successRate}</p>
                    <p className={`text-xs ${fallback.costImpact.startsWith('+') ? 'text-red-600' : 'text-green-600'}`}>
                      {fallback.costImpact}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Trigger</p>
                    <p className="font-medium">{fallback.triggerCondition}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Fallback Rate</p>
                    <p className="font-medium">{fallback.fallbackRate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Recommendation</p>
                    <p className="font-medium text-blue-600">{fallback.recommendation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Journey Insights */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-start">
            <BarChart3 className="w-5 h-5 text-purple-600 mr-3 mt-1" />
            <div>
              <h4 className="font-medium text-purple-900 mb-2">Journey Optimization Insights</h4>
              <ul className="text-sm text-purple-800 space-y-1">
                {journeyInsights.map((insight, index) => (
                  <li key={index}>• {insight}</li>
                ))}
              </ul>
              <Button 
                variant="link" 
                className="text-purple-700 hover:underline p-0 mt-3"
                data-testid="button-optimize-journeys"
              >
                Optimize Journey Flows →
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}