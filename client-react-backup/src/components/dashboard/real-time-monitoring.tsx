import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  AlertTriangle, 
  Clock, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  BarChart3,
  RefreshCw,
  AlertCircle,
  Brain,
  DollarSign,
  Calendar
} from "lucide-react";
import { useState } from "react";
import { mockCampaigns, mockAIInsights } from "@/data/mock-data";

export default function RealTimeMonitoring() {
  const [currentPage, setCurrentPage] = useState(0);
  const [viewMode, setViewMode] = useState("card");
  const [dateRange, setDateRange] = useState("15days");
  const [statusFilter, setStatusFilter] = useState("all");

  // Convert mock data to component format
  const campaigns = mockCampaigns.map(campaign => ({
    ...campaign,
    icon: campaign.statusType === 'warning' ? AlertTriangle : 
          campaign.statusType === 'success' ? CheckCircle : Clock,
    bgColor: campaign.statusType === 'warning' ? "bg-orange-50" :
             campaign.statusType === 'success' ? "bg-green-50" :
             campaign.statusType === 'info' ? "bg-blue-50" : "bg-gray-50",
    borderColor: campaign.statusType === 'warning' ? "border-orange-200" :
                 campaign.statusType === 'success' ? "border-green-200" :
                 campaign.statusType === 'info' ? "border-blue-200" : "border-gray-200"
  }));

  const aiInsights = mockAIInsights;

  const filteredCampaigns = campaigns.filter(campaign => {
    if (statusFilter === "all") return true;
    return campaign.status.toLowerCase() === statusFilter;
  });

  const itemsPerPage = 3;
  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const currentCampaigns = filteredCampaigns.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900">Real-time Campaign Monitoring</CardTitle>
              <p className="text-sm text-gray-600 mt-1">Campaign tracking inspired by Google Ads & Facebook Campaign Manager</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-32" data-testid="select-date-range">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">7 Days</SelectItem>
                <SelectItem value="15days">15 Days</SelectItem>
                <SelectItem value="30days">30 Days</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32" data-testid="select-status-filter">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex space-x-2">
              <Button 
                variant={viewMode === "card" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setViewMode("card")}
                data-testid="button-card-view"
              >
                Card View
              </Button>
              <Button 
                variant={viewMode === "table" ? "default" : "outline"} 
                size="sm" 
                onClick={() => setViewMode("table")}
                data-testid="button-table-view"
              >
                Table View
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {viewMode === "card" ? (
          <>
            {/* Navigation Controls */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handlePrevious}
                  disabled={currentPage === 0}
                  data-testid="button-previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-gray-600">
                  Page {currentPage + 1} of {totalPages} • Showing {currentCampaigns.length} of {filteredCampaigns.length} campaigns
                </span>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleNext}
                  disabled={currentPage === totalPages - 1}
                  data-testid="button-next"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <Button variant="outline" size="sm" data-testid="button-refresh">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>

            {/* Campaign Cards - Show 3 per row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {currentCampaigns.map((campaign, index) => {
                const Icon = campaign.icon;
                const getStatusColor = () => {
                  switch(campaign.statusType) {
                    case 'warning': return 'bg-orange-100 text-orange-800';
                    case 'info': return 'bg-blue-100 text-blue-800';
                    case 'success': return 'bg-green-100 text-green-800';
                    default: return 'bg-gray-100 text-gray-800';
                  }
                };

                return (
                  <div 
                    key={index}
                    className={`${campaign.bgColor} ${campaign.borderColor} border rounded-lg p-4 hover:shadow-md transition-shadow`}
                    data-testid={`campaign-card-${index}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900 text-sm">{campaign.name}</h3>
                      <Badge className={getStatusColor()}>{campaign.status}</Badge>
                    </div>
                    
                    <div className="space-y-2 text-xs mb-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Channel</span>
                        <span className="font-medium">{campaign.channel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Segment</span>
                        <span className="font-medium">{campaign.segment}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{campaign.sent} / {campaign.total}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-sm mb-2">
                      <Icon className="w-4 h-4 mr-2" />
                      <span>{campaign.burnRate}% burn rate</span>
                    </div>
                    
                    <Progress value={campaign.burnRate} className="mb-3" />
                    
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600">
                        ₹{campaign.spent.toLocaleString()} / ₹{campaign.budget.toLocaleString()}
                      </span>
                      {campaign.errors > 0 && (
                        <div className="flex items-center text-red-600">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          <span>{campaign.errors} errors</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <Button 
                          variant="link" 
                          size="sm" 
                          className="text-primary hover:underline p-0 h-auto text-xs"
                          data-testid={`button-action-${index}`}
                        >
                          {campaign.status === 'Scheduled' ? 'Launch Now' : 
                           campaign.status === 'Active' ? 'Optimize' : 'Duplicate'}
                        </Button>
                        {campaign.retryCount > 0 && (
                          <Button 
                            variant="link" 
                            size="sm" 
                            className="text-orange-600 hover:underline p-0 h-auto text-xs"
                            data-testid={`button-retry-${index}`}
                          >
                            Retry ({campaign.retryCount})
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Table View */
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Campaign</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Channel</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Segment</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Progress</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Budget</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCampaigns.map((campaign, index) => (
                  <tr key={index} className="hover:bg-gray-50" data-testid={`campaign-row-${index}`}>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{campaign.name}</p>
                        <p className="text-xs text-gray-600">Started: {campaign.startDate}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4">{campaign.channel}</td>
                    <td className="py-3 px-4">{campaign.segment}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm">{campaign.sent} / {campaign.total}</p>
                        <Progress value={campaign.burnRate} className="w-20 h-1 mt-1" />
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p>₹{campaign.spent.toLocaleString()} / ₹{campaign.budget.toLocaleString()}</p>
                      <p className="text-xs text-gray-600">{campaign.burnRate}% used</p>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={
                        campaign.statusType === 'warning' ? 'bg-orange-100 text-orange-800' :
                        campaign.statusType === 'info' ? 'bg-blue-100 text-blue-800' :
                        campaign.statusType === 'success' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }>
                        {campaign.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          {campaign.status === 'Scheduled' ? 'Launch' : 'Edit'}
                        </Button>
                        {campaign.errors > 0 && (
                          <Button variant="outline" size="sm" className="text-orange-600">
                            Retry
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* AI Analytics & Error Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* AI Insights */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <Brain className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="font-medium text-blue-900">AI Campaign Insights</h3>
            </div>
            <div className="space-y-3">
              {aiInsights.map((insight, index) => (
                <div key={index} className="bg-white border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">{insight.message}</p>
                      <p className="text-xs text-green-600 mt-1">{insight.impact}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {insight.confidence}% confidence
                    </Badge>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                    data-testid={`button-apply-insight-${index}`}
                  >
                    Apply Suggestion
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Error Analysis & Retry Options */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <AlertCircle className="w-5 h-5 text-orange-600 mr-2" />
              <h3 className="font-medium text-orange-900">Error Analysis & Retry</h3>
            </div>
            <div className="space-y-3">
              {campaigns.filter(c => c.errors > 0).map((campaign, index) => (
                <div key={index} className="bg-white border border-orange-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{campaign.name}</p>
                      <p className="text-sm text-gray-600">{campaign.errors} failed deliveries</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-orange-600">Retry Cost: ₹{campaign.retryCost}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1 text-xs"
                      data-testid={`button-retry-failed-${index}`}
                    >
                      <RefreshCw className="w-3 h-3 mr-1" />
                      Retry Failed
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-orange-600 hover:bg-orange-700 text-white text-xs"
                      data-testid={`button-retry-fallback-${index}`}
                    >
                      Retry with Fallback
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
