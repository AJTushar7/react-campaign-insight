import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { UserX, PiggyBank, Shield, Ban, List, Plus, AlertTriangle } from "lucide-react";

export default function InactiveCustomers() {
  const summaryData = [
    {
      title: "Inactive Customers",
      value: "25.1K",
      icon: UserX,
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      iconColor: "text-red-600",
      valueColor: "text-red-700"
    },
    {
      title: "Potential Savings", 
      value: "₹27.6K",
      icon: PiggyBank,
      bgColor: "bg-green-50",
      borderColor: "border-green-200", 
      iconColor: "text-green-600",
      valueColor: "text-green-700"
    },
    {
      title: "Active Segments",
      value: "1",
      icon: Shield,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600", 
      valueColor: "text-blue-700"
    },
    {
      title: "Already Excluded",
      value: "11.2K", 
      icon: Ban,
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      iconColor: "text-purple-600",
      valueColor: "text-purple-700"
    }
  ];

  const segments = [
    {
      name: "WhatsApp 90+ Days Inactive",
      channel: "WhatsApp",
      inactiveDays: 95,
      totalCustomers: "25.0K",
      inactiveCustomers: "8.5K", 
      inactivityRate: 34,
      savings: "₹12.8K",
      status: "Active",
      statusColor: "bg-blue-100 text-blue-800",
      channelIcon: "fab fa-whatsapp",
      channelColor: "bg-green-500"
    },
    {
      name: "SMS Non-Responders 60+ Days",
      channel: "SMS", 
      inactiveDays: 68,
      totalCustomers: "18.0K",
      inactiveCustomers: "5.4K",
      inactivityRate: 30,
      savings: "₹8.1K", 
      status: "Pending",
      statusColor: "bg-yellow-100 text-yellow-800",
      channelIcon: "fas fa-sms",
      channelColor: "bg-blue-500"
    },
    {
      name: "Email Never Opened 45+ Days",
      channel: "Email",
      inactiveDays: 52, 
      totalCustomers: "32.0K",
      inactiveCustomers: "11.2K",
      inactivityRate: 35,
      savings: "₹6.7K",
      status: "Excluded", 
      statusColor: "bg-green-100 text-green-800",
      channelIcon: "fas fa-envelope",
      channelColor: "bg-purple-500"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-gray-900">Inactive Customer Management</CardTitle>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">25.1K</span>
            <span className="text-sm font-medium text-orange-600">Inactive</span>
            <span className="text-sm text-gray-600">₹27.6K</span>
            <span className="text-sm font-medium text-green-600">Potential Savings</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {summaryData.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className={`text-center p-4 ${item.bgColor} ${item.borderColor} border rounded-lg`}
                data-testid={`summary-card-${index}`}
              >
                <div className={`flex items-center justify-center w-10 h-10 ${item.bgColor} rounded-lg mx-auto mb-2`}>
                  <Icon className={`w-5 h-5 ${item.iconColor}`} />
                </div>
                <p className={`text-2xl font-bold ${item.valueColor}`}>{item.value}</p>
                <p className={`text-sm ${item.iconColor}`}>{item.title}</p>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mb-6">
          <Button className="flex-1 bg-green-500 hover:bg-green-600" data-testid="button-create-exclusion">
            <List className="w-4 h-4 mr-2" />
            Create Exclusion List (0)
          </Button>
          <Button variant="outline" data-testid="button-new-segment">
            <Plus className="w-4 h-4 mr-2" />
            New Segment
          </Button>
        </div>

        {/* Inactive Customer Segments */}
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Inactive Customer Segments</h3>
          
          {segments.map((segment, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4" data-testid={`segment-${index}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Checkbox className="mr-3" data-testid={`checkbox-segment-${index}`} />
                  <div className="flex items-center">
                    <div className={`w-8 h-8 ${segment.channelColor} rounded-lg flex items-center justify-center mr-3`}>
                      <i className={`${segment.channelIcon} text-white text-sm`}></i>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{segment.name}</h4>
                      <p className="text-sm text-gray-600">Inactive for {segment.inactiveDays} days</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={segment.statusColor}>{segment.status}</Badge>
                  <span className="text-sm font-medium text-green-600">{segment.savings}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                <div>
                  <p className="text-gray-600">Total Customers</p>
                  <p className="font-medium">{segment.totalCustomers}</p>
                </div>
                <div>
                  <p className="text-gray-600">Inactive</p>
                  <p className="font-medium text-red-600">{segment.inactiveCustomers}</p>
                </div>
                <div>
                  <p className="text-gray-600">Inactivity Rate</p>
                  <p className={`font-medium ${segment.inactivityRate >= 35 ? 'text-red-600' : 'text-orange-600'}`}>
                    {segment.inactivityRate}.0%
                  </p>
                </div>
              </div>
              
              <div>
                <p className="text-xs text-gray-600 mb-1">Inactivity Level</p>
                <Progress value={segment.inactivityRate} className="mb-1" />
                <p className={`text-xs text-right ${segment.inactivityRate >= 35 ? 'text-red-600' : 'text-orange-600'}`}>
                  {segment.inactivityRate}.0%
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Summary */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-1" />
            <div>
              <h4 className="font-medium text-yellow-900 mb-2">Inactive Customer Impact</h4>
              <p className="text-sm text-yellow-800 mb-3">
                You have 25.1K inactive customers across all channels. Creating exclusion lists could save ₹27.6K 
                in wasted campaign spend while improving overall engagement rates and deliverability.
              </p>
              <Button 
                variant="link" 
                className="text-yellow-700 hover:underline p-0"
                data-testid="button-learn-reengagement"
              >
                Learn about customer re-engagement strategies →
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
