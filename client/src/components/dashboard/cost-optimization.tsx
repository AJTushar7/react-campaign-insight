import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, TrendingUp, Users, AlertTriangle } from "lucide-react";

export default function CostOptimization() {
  const insights = [
    {
      title: "Cost Per Acquisition",
      channel: "WhatsApp",
      value: "₹425",
      status: "Best performing channel",
      type: "success",
      icon: TrendingUp
    },
    {
      title: "Channel Comparison", 
      channel: "SMS: ₹187",
      value: "Email: ₹245 | Push: ₹312",
      status: "",
      type: "info",
      icon: TrendingUp
    },
    {
      title: "Optimization Opportunity",
      channel: "₹2.9L",
      value: "Shift 30% SMS to WhatsApp",
      status: "",
      type: "warning",
      icon: AlertTriangle
    },
    {
      title: "Inactive Customers",
      channel: "47,500",
      value: "No engagement 90+ days",
      status: "",
      type: "error",
      icon: Users
    }
  ];

  const suggestions = [
    {
      title: "Budget Reallocation",
      description: "Shift 30% SMS budget to WhatsApp to save ₹1.8L monthly while maintaining reach.",
      savings: "Save ₹1.8L",
      action: "Apply"
    },
    {
      title: "Timing Optimization", 
      description: "10-11 AM & 7-8 PM show 35% higher conversion rates. Schedule accordingly.",
      savings: "Save ₹62.0K",
      action: "Apply"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900">Cost Optimization Insights</CardTitle>
          <Button variant="outline" size="sm" className="text-green-600 border-green-200" data-testid="button-export-cost-report">
            Export Cost Report
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {/* Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            const getColors = () => {
              switch(insight.type) {
                case 'success': return { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-600' };
                case 'warning': return { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: 'text-yellow-600' };
                case 'error': return { bg: 'bg-red-50', border: 'border-red-200', icon: 'text-red-600' };
                default: return { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600' };
              }
            };
            const colors = getColors();
            
            return (
              <div key={index} className={`${colors.bg} ${colors.border} border rounded-lg p-4`} data-testid={`insight-card-${index}`}>
                <div className="flex items-center mb-2">
                  <Icon className={`w-4 h-4 ${colors.icon} mr-2`} />
                  <span className="text-sm font-medium text-gray-900">{insight.title}</span>
                </div>
                <div className="mb-1">
                  <span className="text-lg font-semibold text-gray-900">{insight.channel}</span>
                </div>
                <div className="text-sm text-gray-600">{insight.value}</div>
                {insight.status && (
                  <div className="text-xs text-green-600 mt-1">{insight.status}</div>
                )}
              </div>
            );
          })}
        </div>

        {/* AI Suggestions */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center mb-4">
            <Lightbulb className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="font-medium text-purple-900">AI Cost Optimization Suggestions</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="bg-white border border-purple-200 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">{suggestion.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-green-600">{suggestion.savings}</span>
                  <Button 
                    size="sm" 
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    data-testid={`button-apply-suggestion-${index}`}
                  >
                    {suggestion.action} →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
