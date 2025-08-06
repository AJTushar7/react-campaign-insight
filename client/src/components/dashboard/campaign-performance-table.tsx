import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

export default function CampaignPerformanceTable() {
  const campaigns = [
    {
      name: "Diwali Car Sale 2024",
      description: "Festival Promotion",
      channel: "WhatsApp",
      channelIcon: "fab fa-whatsapp",
      channelColor: "bg-green-500",
      reach: "125,000",
      delivered: "122,750",
      deliveryRate: "98.2%",
      conversions: "35,187", 
      conversionRate: "28.7%",
      revenue: "₹874,500",
      roi: "12.4x",
      status: "completed",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      name: "Service Reminder Oct",
      description: "Maintenance Alert", 
      channel: "SMS",
      channelIcon: "fas fa-sms",
      channelColor: "bg-blue-500",
      reach: "85,000",
      delivered: "82,450",
      deliveryRate: "97.0%",
      conversions: "14,841",
      conversionRate: "18.0%", 
      revenue: "₹412,300",
      roi: "8.2x",
      status: "completed",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      name: "New Model Launch",
      description: "Product Announcement",
      channel: "Email", 
      channelIcon: "fas fa-envelope",
      channelColor: "bg-purple-500",
      reach: "200,000",
      delivered: "192,000",
      deliveryRate: "96.0%",
      conversions: "15,360",
      conversionRate: "8.0%",
      revenue: "₹287,400", 
      roi: "5.8x",
      status: "completed",
      statusColor: "bg-green-100 text-green-800"
    },
    {
      name: "Year End Offers",
      description: "Discount Campaign",
      channel: "Push",
      channelIcon: "fas fa-bell", 
      channelColor: "bg-orange-500",
      reach: "150,000",
      delivered: "138,750",
      deliveryRate: "92.5%",
      conversions: "4,162",
      conversionRate: "3.0%",
      revenue: "₹124,860",
      roi: "4.2x", 
      status: "active",
      statusColor: "bg-blue-100 text-blue-800"
    },
    {
      name: "New Year Bonanza",
      description: "Holiday Special",
      channel: "WhatsApp",
      channelIcon: "fab fa-whatsapp",
      channelColor: "bg-green-500",
      reach: "75,000",
      delivered: "0", 
      deliveryRate: "0%",
      conversions: "0",
      conversionRate: "0%",
      revenue: "-",
      roi: "-",
      status: "scheduled",
      statusColor: "bg-yellow-100 text-yellow-800"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900">Campaign Performance Details</CardTitle>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input 
                type="text" 
                placeholder="Search campaigns..." 
                className="pl-10 w-64"
                data-testid="input-search-campaigns"
              />
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Select>
              <SelectTrigger className="w-32" data-testid="select-status-filter">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Campaign</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Channel</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Reach</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Delivered</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Conversion</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">ROI</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {campaigns.map((campaign, index) => (
                <tr key={index} className="hover:bg-gray-50" data-testid={`campaign-row-${index}`}>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{campaign.name}</p>
                      <p className="text-sm text-gray-600">{campaign.description}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className={`w-6 h-6 ${campaign.channelColor} rounded flex items-center justify-center mr-2`}>
                        <i className={`${campaign.channelIcon} text-white text-xs`}></i>
                      </div>
                      <span>{campaign.channel}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">{campaign.reach}</td>
                  <td className="py-4 px-4">
                    <div>
                      <p>{campaign.delivered}</p>
                      <p className={`text-xs ${campaign.deliveryRate === '0%' ? 'text-gray-500' : 'text-green-600'}`}>
                        {campaign.deliveryRate}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p>{campaign.conversions}</p>
                      <p className={`text-xs ${
                        campaign.conversionRate === '0%' ? 'text-gray-500' :
                        parseFloat(campaign.conversionRate) < 5 ? 'text-orange-600' : 'text-green-600'
                      }`}>
                        {campaign.conversionRate}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium">{campaign.revenue}</td>
                  <td className="py-4 px-4">
                    <span className={`font-medium ${campaign.roi === '-' ? 'text-gray-500' : 'text-green-600'}`}>
                      {campaign.roi}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <Badge className={campaign.statusColor}>{campaign.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-700">Showing 1 to 5 of 5 campaigns</p>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" disabled data-testid="button-previous">Previous</Button>
            <Button variant="outline" size="sm" disabled data-testid="button-next">Next</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
