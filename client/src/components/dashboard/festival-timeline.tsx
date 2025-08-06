import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, TrendingUp, Target, Users, Clock, Plus, Calendar, Lightbulb } from "lucide-react";
import { useState, useEffect } from "react";

export default function FestivalTimeline() {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);

  // Auto-detect holidays using date calculations
  useEffect(() => {
    const detectHolidays = () => {
      const currentYear = new Date().getFullYear();
      const detectedHolidays = [
        {
          name: "Diwali",
          date: new Date(currentYear, 10, 12), // November 12 (estimated)
          status: "upcoming",
          campaigns: 3,
          expectedRevenue: "₹12L",
          engagement: "+67%",
          color: "border-orange-300 bg-orange-50",
          category: "Festival",
          description: "Festival of Lights - Major Indian celebration",
          preparationDays: 7,
          conversionRate: "28%"
        },
        {
          name: "Christmas",
          date: new Date(currentYear, 11, 25), // December 25
          status: "planned",
          campaigns: 5,
          expectedRevenue: "₹25L",
          engagement: "+89%",
          color: "border-green-300 bg-green-50",
          category: "Religious",
          description: "Christmas Day - Global Christian holiday",
          preparationDays: 14,
          conversionRate: "35%"
        },
        {
          name: "New Year",
          date: new Date(currentYear + 1, 0, 1), // January 1 next year
          status: "planned",
          campaigns: 2,
          expectedRevenue: "₹8L",
          engagement: "+45%",
          color: "border-blue-300 bg-blue-50",
          category: "Celebration",
          description: "New Year's Day - Global celebration",
          preparationDays: 10,
          conversionRate: "22%"
        },
        {
          name: "Black Friday",
          date: new Date(currentYear, 10, 29), // November 29 (4th Friday of November)
          status: "active",
          campaigns: 8,
          expectedRevenue: "₹45L",
          engagement: "+156%",
          color: "border-purple-300 bg-purple-50",
          category: "Shopping",
          description: "Black Friday Sale - Major shopping event",
          preparationDays: 3,
          conversionRate: "42%"
        },
        {
          name: "Valentine's Day",
          date: new Date(currentYear + 1, 1, 14), // February 14 next year
          status: "planned",
          campaigns: 4,
          expectedRevenue: "₹15L",
          engagement: "+78%",
          color: "border-pink-300 bg-pink-50",
          category: "Romance",
          description: "Valentine's Day - Romance and gifts",
          preparationDays: 10,
          conversionRate: "31%"
        },
        {
          name: "Holi",
          date: new Date(currentYear + 1, 2, 13), // March 13 next year (estimated)
          status: "planned",
          campaigns: 3,
          expectedRevenue: "₹9L",
          engagement: "+56%",
          color: "border-yellow-300 bg-yellow-50",
          category: "Festival",
          description: "Festival of Colors - Indian spring festival",
          preparationDays: 7,
          conversionRate: "25%"
        }
      ];

      // Sort by date
      detectedHolidays.sort((a, b) => a.date.getTime() - b.date.getTime());
      
      setHolidays(detectedHolidays);
      setLoading(false);
    };

    detectHolidays();
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntil = (date) => {
    const today = new Date();
    const diffTime = date.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusBadge = (status, daysUntil) => {
    if (daysUntil < 0) return { text: "Completed", class: "bg-gray-100 text-gray-800" };
    if (daysUntil <= 7) return { text: "Active", class: "bg-green-100 text-green-800" };
    if (daysUntil <= 30) return { text: "Upcoming", class: "bg-orange-100 text-orange-800" };
    return { text: "Planned", class: "bg-blue-100 text-blue-800" };
  };

  const campaignInsights = [
    {
      insight: "Black Friday campaigns show 3x higher conversion rates",
      action: "Increase budget allocation by 40%",
      impact: "+₹18L potential revenue"
    },
    {
      insight: "Christmas campaigns perform best with 14-day lead time",
      action: "Start campaigns December 11th",
      impact: "35% better engagement"
    },
    {
      insight: "Festival campaigns need regional customization",
      action: "Create region-specific content",
      impact: "67% higher local engagement"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="w-5 h-5 text-purple-600 mr-2" />
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900">Festival Performance Timeline</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Auto-detected holidays & campaign planning inspired by Salesforce Marketing Cloud</p>
            </div>
          </div>
          <Button variant="outline" size="sm" data-testid="button-add-holiday">
            <Plus className="w-4 h-4 mr-2" />
            Add Custom Holiday
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-sm text-gray-600 mt-2">Detecting holidays...</p>
          </div>
        ) : (
          <>
            {/* Holiday Timeline Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {holidays.slice(0, 6).map((holiday, index) => {
                const daysUntil = getDaysUntil(holiday.date);
                const statusBadge = getStatusBadge(holiday.status, daysUntil);
                
                return (
                  <div 
                    key={index}
                    className={`${holiday.color} border rounded-lg p-4 hover:shadow-md transition-shadow`}
                    data-testid={`holiday-card-${index}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{holiday.name}</h3>
                        <p className="text-sm text-gray-600">{formatDate(holiday.date)}</p>
                      </div>
                      <Badge className={statusBadge.class}>{statusBadge.text}</Badge>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category</span>
                        <span className="font-medium">{holiday.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Campaigns</span>
                        <span className="font-medium">{holiday.campaigns}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expected Revenue</span>
                        <span className="font-medium text-green-600">{holiday.expectedRevenue}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Conversion Rate</span>
                        <span className="font-medium text-blue-600">{holiday.conversionRate}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-600">
                          {daysUntil > 0 ? (
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {daysUntil} days to go
                            </span>
                          ) : daysUntil === 0 ? (
                            <span className="text-green-600 font-medium">Today!</span>
                          ) : (
                            <span>Completed</span>
                          )}
                        </div>
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="text-primary hover:underline p-0 h-auto text-xs"
                          data-testid={`button-plan-campaign-${index}`}
                        >
                          {daysUntil > 0 ? "Plan Campaign" : "View Results"}
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Campaign Planning Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Timeline Optimization */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <Lightbulb className="w-5 h-5 text-purple-600 mr-2" />
                  <h3 className="font-medium text-purple-900">Campaign Planning Insights</h3>
                </div>
                <div className="space-y-3">
                  {campaignInsights.map((insight, index) => (
                    <div key={index} className="bg-white border border-purple-200 rounded-lg p-3">
                      <p className="text-sm text-gray-900 font-medium mb-1">{insight.insight}</p>
                      <p className="text-xs text-gray-600 mb-2">{insight.action}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-green-600 font-medium">{insight.impact}</span>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="text-xs"
                          data-testid={`button-apply-insight-${index}`}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Holiday Alerts */}
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center mb-3">
                  <CalendarDays className="w-5 h-5 text-orange-600 mr-2" />
                  <h3 className="font-medium text-orange-900">Upcoming Campaign Deadlines</h3>
                </div>
                <div className="space-y-3">
                  {holidays.filter(h => getDaysUntil(h.date) > 0 && getDaysUntil(h.date) <= 30).map((holiday, index) => {
                    const daysUntil = getDaysUntil(holiday.date);
                    const preparationDeadline = daysUntil - holiday.preparationDays;
                    
                    return (
                      <div key={index} className="bg-white border border-orange-200 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium text-gray-900">{holiday.name}</p>
                            <p className="text-xs text-gray-600">{formatDate(holiday.date)}</p>
                          </div>
                          <Badge className={preparationDeadline <= 0 ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}>
                            {preparationDeadline <= 0 ? "Urgent" : `${preparationDeadline}d prep`}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-600">
                          <p>Campaign prep needed: {holiday.preparationDays} days before</p>
                          <p>Expected engagement: {holiday.engagement}</p>
                        </div>
                        <Button 
                          size="sm" 
                          className={`w-full mt-2 text-xs ${preparationDeadline <= 0 ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-600 hover:bg-orange-700'} text-white`}
                          data-testid={`button-start-campaign-${index}`}
                        >
                          {preparationDeadline <= 0 ? "Start Campaign Now" : "Schedule Campaign"}
                        </Button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Performance Summary */}
            <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="font-medium text-gray-900 mb-3">Festival Campaign Performance Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">₹89L</p>
                  <p className="text-sm text-gray-600">Total Festival Revenue</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">32%</p>
                  <p className="text-sm text-gray-600">Avg Conversion Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">6.8x</p>
                  <p className="text-sm text-gray-600">Festival ROI</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">25</p>
                  <p className="text-sm text-gray-600">Active Campaigns</p>
                </div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}