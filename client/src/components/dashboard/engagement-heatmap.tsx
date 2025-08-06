import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, TrendingUp, CalendarX } from "lucide-react";

export default function EngagementHeatmap() {
  const channelPerformance = [
    {
      name: "WhatsApp",
      engagement: "68.5%",
      peak: "Tue at 10 AM",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-700"
    },
    {
      name: "SMS", 
      engagement: "54.2%",
      peak: "Wed at 11 AM",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200", 
      textColor: "text-blue-700"
    }
  ];

  const heatmapData = [
    { day: "Sun", values: [12, 28, 45, 38], percentages: ["12%", "28%", "45%", "38%"] },
    { day: "Mon", values: [25, 42, 68, 72], percentages: ["25%", "42%", "68%", "72%"] },
    { day: "Tue", values: [38, 78, 65, 42], percentages: ["38%", "78%", "65%", "42%"] },
    { day: "Wed", values: [22, 58, 85, 68], percentages: ["22%", "58%", "85%", "68%"] },
    { day: "Thu", values: [15, 45, 62, 48], percentages: ["15%", "45%", "62%", "48%"] },
    { day: "Fri", values: [28, 52, 75, 82], percentages: ["28%", "52%", "75%", "82%"] },
    { day: "Sat", values: [18, 32, 48, 35], percentages: ["18%", "32%", "48%", "35%"] }
  ];

  const getHeatmapColor = (value: number) => {
    if (value >= 80) return "bg-orange-500";
    if (value >= 60) return "bg-orange-400";
    if (value >= 40) return "bg-orange-300";
    if (value >= 20) return "bg-orange-200";
    return "bg-orange-100";
  };

  const getTextColor = (value: number) => {
    return value >= 60 ? "text-white" : "text-gray-800";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">Peak Engagement Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="engagement" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="engagement" data-testid="tab-engagement">Engagement</TabsTrigger>
            <TabsTrigger value="conversion" data-testid="tab-conversion">Conversion</TabsTrigger>
            <TabsTrigger value="cost" data-testid="tab-cost">Cost Efficiency</TabsTrigger>
          </TabsList>
          
          <TabsContent value="engagement" className="space-y-6">
            {/* Top Performing Channels */}
            <div className="grid grid-cols-2 gap-4">
              {channelPerformance.map((channel, index) => (
                <div 
                  key={index}
                  className={`${channel.bgColor} ${channel.borderColor} border rounded-lg p-4`}
                  data-testid={`channel-performance-${index}`}
                >
                  <h3 className="font-medium text-gray-900 mb-2">{channel.name}</h3>
                  <p className={`text-2xl font-bold ${channel.textColor}`}>{channel.engagement}</p>
                  <p className={`text-sm ${channel.textColor} mt-1`}>Peak: {channel.peak}</p>
                </div>
              ))}
            </div>

            {/* Heatmap Grid */}
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-3">Engagement Heatmap by Time</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="text-left py-2 pr-4"></th>
                      <th className="text-center py-2 px-2">12 AM</th>
                      <th className="text-center py-2 px-2">6 AM</th>
                      <th className="text-center py-2 px-2">12 PM</th>
                      <th className="text-center py-2 px-2">6 PM</th>
                    </tr>
                  </thead>
                  <tbody className="space-y-1">
                    {heatmapData.map((row, index) => (
                      <tr key={index}>
                        <td className="text-gray-600 py-2 pr-4">{row.day}</td>
                        {row.values.map((value, cellIndex) => (
                          <td key={cellIndex} className="text-center py-2 px-2">
                            <div 
                              className={`w-8 h-6 ${getHeatmapColor(value)} rounded mx-auto flex items-center justify-center`}
                              data-testid={`heatmap-cell-${index}-${cellIndex}`}
                            >
                              <span className={`text-xs font-medium ${getTextColor(value)}`}>
                                {row.percentages[cellIndex]}
                              </span>
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Legend */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-4">
                  <span className="text-xs text-gray-600">Low</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <div 
                        key={value}
                        className={`w-3 h-3 ${getHeatmapColor(value)} rounded`}
                      ></div>
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">High</span>
                </div>
              </div>
            </div>

            {/* Optimal Timing Recommendations */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Lightbulb className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="font-medium text-blue-900">Optimal Timing Recommendations</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center mb-2">
                    <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
                    <span className="font-medium text-gray-900">Best Times</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Tuesday-Thursday 10-11 AM show 35% higher engagement
                  </p>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <CalendarX className="w-4 h-4 text-orange-600 mr-2" />
                    <span className="font-medium text-gray-900">Avoid Times</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Late evenings (8-10 PM) show 60% lower conversion rates
                  </p>
                </div>
              </div>
              <Button 
                variant="link" 
                className="text-primary hover:underline p-0 mt-3"
                data-testid="button-schedule-optimally"
              >
                Schedule Campaigns Optimally →
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="conversion">
            <div className="text-center py-8 text-gray-500">
              Conversion timing analysis coming soon...
            </div>
          </TabsContent>
          
          <TabsContent value="cost">
            <div className="text-center py-8 text-gray-500">
              Cost efficiency analysis coming soon...
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
