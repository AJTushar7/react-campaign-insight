import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Lightbulb, Flame, Music, Flag, Palette } from "lucide-react";

export default function FestivalTimeline() {
  const festivals = [
    {
      name: "Diwali 2024",
      month: "Oct 2024",
      revenue: "₹8.7L",
      roi: "12.4x",
      targetAchieved: 85,
      icon: Flame,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-100"
    },
    {
      name: "Navratri",
      month: "Sep 2024", 
      revenue: "₹5.2L",
      roi: "8.7x",
      targetAchieved: 78,
      icon: Music,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      name: "Holi",
      month: "Mar 2024",
      revenue: "₹4.1L", 
      roi: "6.8x",
      targetAchieved: 65,
      icon: Palette,
      iconColor: "text-pink-600",
      bgColor: "bg-pink-100"
    },
    {
      name: "Independence Day",
      month: "Aug 2024",
      revenue: "₹3.8L",
      roi: "5.4x", 
      targetAchieved: 92,
      icon: Flag,
      iconColor: "text-green-600",
      bgColor: "bg-green-100"
    }
  ];

  const insights = [
    "New Year 2025: Plan Campaign - 26 Days",
    "Republic Day: Plan Campaign - 26 Days"
  ];

  const performanceInsights = [
    "Oct: Best Month - ₹18.2L revenue",
    "11 AM: Peak Hour - 28% conversion", 
    "Weekend: Best Days - +42% engagement"
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">Festival Performance Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Festival Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {festivals.map((festival, index) => {
            const Icon = festival.icon;
            return (
              <div 
                key={index}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                data-testid={`festival-card-${index}`}
              >
                <div className="flex items-center mb-3">
                  <div className={`w-8 h-8 ${festival.bgColor} rounded-lg flex items-center justify-center mr-3`}>
                    <Icon className={`w-4 h-4 ${festival.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{festival.name}</h3>
                    <p className="text-sm text-gray-600">{festival.month}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm mb-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Revenue</span>
                    <span className="font-medium">{festival.revenue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Conversion</span>
                    <span className="font-medium">{festival.roi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">ROI</span>
                    <span className="font-medium">{festival.roi}</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-600">Target Achievement</span>
                    <span className="text-xs font-medium">{festival.targetAchieved}%</span>
                  </div>
                  <Progress value={festival.targetAchieved} className="h-2" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Performance Insights and Upcoming Opportunities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Peak Performance Insights */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Peak Performance Insights</h3>
            <div className="space-y-3">
              {performanceInsights.map((insight, index) => (
                <div key={index} className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">{insight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Opportunities */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Upcoming Opportunities</h3>
            <div className="space-y-2">
              {insights.map((insight, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm"
                  data-testid={`opportunity-${index}`}
                >
                  <span className="text-gray-700">{insight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Festival Insights */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <div className="flex items-start">
            <Lightbulb className="w-5 h-5 text-blue-600 mr-3 mt-1" />
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Festival Campaign Insights</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Independence Day showed highest ROI (9.2x) with patriotic themes</li>
                <li>• Diwali campaigns perform best with WhatsApp (68% engagement)</li>
                <li>• Festival timing: Launch 2 weeks before for optimal reach</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
