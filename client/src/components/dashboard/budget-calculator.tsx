import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calculator, TrendingUp, Target, DollarSign, Users, Upload } from "lucide-react";
import { useState } from "react";

export default function BudgetCalculator() {
  const [uploadMode, setUploadMode] = useState(false);

  const budgetData = [
    { channel: 'WhatsApp', budget: 25000, spent: 22400, remaining: 2600, efficiency: 89.6 },
    { channel: 'SMS', budget: 15000, spent: 12800, remaining: 2200, efficiency: 85.3 },
    { channel: 'Email', budget: 8000, spent: 6400, remaining: 1600, efficiency: 80.0 },
    { channel: 'Push', budget: 5000, spent: 4200, remaining: 800, efficiency: 84.0 },
    { channel: 'RCS', budget: 7000, spent: 5600, remaining: 1400, efficiency: 80.0 }
  ];

  const pieData = budgetData.map(item => ({
    name: item.channel,
    value: item.spent,
    color: getChannelColor(item.channel)
  }));

  function getChannelColor(channel: string) {
    const colors = {
      'WhatsApp': '#25D366',
      'SMS': '#2196F3', 
      'Email': '#9C27B0',
      'Push': '#FF9800',
      'RCS': '#00BCD4'
    };
    return colors[channel as keyof typeof colors] || '#6B7280';
  }

  const performanceMetrics = [
    {
      title: "Total Budget",
      value: "₹60K",
      subtitle: "Allocated for Q4",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
      icon: DollarSign
    },
    {
      title: "Spent to Date", 
      value: "₹51.4K",
      subtitle: "85.7% utilization",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700",
      icon: TrendingUp
    },
    {
      title: "Projected ROI",
      value: "6.8x", 
      subtitle: "Based on current trends",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
      icon: Target
    },
    {
      title: "Leads Generated",
      value: "1,247",
      subtitle: "Avg cost: ₹41 per lead", 
      bgColor: "bg-purple-50",
      textColor: "text-purple-700",
      icon: Users
    }
  ];

  const calculatorInputs = [
    { label: "Target Audience Size", placeholder: "e.g., 50,000", type: "number" },
    { label: "Expected CTR (%)", placeholder: "e.g., 15", type: "number" },
    { label: "Conversion Rate (%)", placeholder: "e.g., 8", type: "number" },
    { label: "Average Order Value", placeholder: "e.g., ₹2,500", type: "number" }
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Calculator className="w-5 h-5 text-green-600 mr-2" />
            <CardTitle className="text-xl font-semibold text-gray-900">Budget vs Performance Calculator</CardTitle>
          </div>
          <div className="flex items-center space-x-2">
            <p className="text-sm text-gray-600">Advanced calculator inspired by Facebook Ads Manager</p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setUploadMode(!uploadMode)}
              data-testid="button-toggle-upload"
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploadMode ? "Manual Input" : "Upload File"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Performance Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {performanceMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div 
                key={index}
                className={`text-center p-4 ${metric.bgColor} rounded-lg`}
                data-testid={`performance-metric-${index}`}
              >
                <div className="flex items-center justify-center mb-2">
                  <Icon className={`w-5 h-5 ${metric.textColor}`} />
                </div>
                <p className="text-sm text-gray-600">{metric.title}</p>
                <p className={`text-2xl font-bold ${metric.textColor}`}>{metric.value}</p>
                <p className={`text-xs ${metric.textColor} mt-1`}>{metric.subtitle}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Budget Distribution Chart */}
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Budget vs Spend Analysis</h3>
            <div className="h-64 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                  <XAxis 
                    dataKey="channel" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                    label={{ value: 'Amount (₹)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    formatter={(value: any, name: string) => [
                      `₹${value.toLocaleString()}`, 
                      name === 'budget' ? 'Budget' : 'Spent'
                    ]}
                    labelStyle={{ color: '#374151' }}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #E5E7EB',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar dataKey="budget" fill="#E5E7EB" name="budget" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="spent" fill="#2563EB" name="spent" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Spend Distribution Pie Chart */}
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Spent']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Campaign Calculator */}
          <div>
            {uploadMode ? (
              <div>
                <h3 className="font-medium text-gray-900 mb-4">File Upload Calculator</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Upload your campaign data file</p>
                  <Button variant="outline" data-testid="button-upload-file">
                    Choose File
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    Supports Excel, CSV files with campaign metrics
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="font-medium text-gray-900 mb-4">Campaign ROI Calculator</h3>
                <div className="space-y-4">
                  {calculatorInputs.map((input, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {input.label}
                      </label>
                      <Input 
                        type={input.type}
                        placeholder={input.placeholder}
                        data-testid={`calculator-input-${index}`}
                      />
                    </div>
                  ))}
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Primary Channel
                    </label>
                    <Select>
                      <SelectTrigger data-testid="select-primary-channel">
                        <SelectValue placeholder="Select channel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="push">Push</SelectItem>
                        <SelectItem value="rcs">RCS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full mt-6" data-testid="button-calculate-roi">
                    Calculate ROI & Budget Recommendation
                  </Button>
                </div>
              </div>
            )}

            {/* Quick Recommendations */}
            <div className="mt-6 space-y-3">
              <h4 className="font-medium text-gray-900">Quick Recommendations</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div>
                    <p className="font-medium text-green-900">Increase WhatsApp Budget</p>
                    <p className="text-sm text-green-700">89.6% efficiency, best ROI channel</p>
                  </div>
                  <Badge className="bg-green-600 text-white">+20%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div>
                    <p className="font-medium text-orange-900">Optimize Email Timing</p>
                    <p className="text-sm text-orange-700">80% efficiency, room for improvement</p>
                  </div>
                  <Badge className="bg-orange-600 text-white">Timing</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}