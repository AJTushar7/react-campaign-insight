import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function BudgetPerformance() {
  const chartData = [
    { channel: 'WhatsApp', spend: 12.5, color: '#25D366' },
    { channel: 'SMS', spend: 8.2, color: '#2196F3' },
    { channel: 'Email', spend: 4.3, color: '#9C27B0' },
    { channel: 'Push', spend: 2.1, color: '#FF9800' },
    { channel: 'RCS', spend: 1.4, color: '#00BCD4' }
  ];

  const metrics = [
    {
      title: "Total Spend",
      value: "₹28.5K",
      subtitle: "vs ₹35K budget",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700"
    },
    {
      title: "Cost per Lead", 
      value: "₹42",
      subtitle: "18% lower than target",
      bgColor: "bg-green-50",
      textColor: "text-green-700"
    },
    {
      title: "Cost per Click",
      value: "₹2.8", 
      subtitle: "Industry avg: ₹3.5",
      bgColor: "bg-orange-50",
      textColor: "text-orange-700"
    },
    {
      title: "CPM",
      value: "₹12",
      subtitle: "Per 1000 impressions", 
      bgColor: "bg-purple-50",
      textColor: "text-purple-700"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900">Budget vs Performance</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Chart */}
        <div className="mb-6 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
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
                label={{ value: 'Spend (₹K)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value: any) => [`₹${value}K`, 'Spend']}
                labelStyle={{ color: '#374151' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '6px'
                }}
              />
              <Bar 
                dataKey="spend" 
                fill="#2563EB"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-2 gap-4">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className={`text-center p-4 ${metric.bgColor} rounded-lg`}
              data-testid={`budget-metric-${index}`}
            >
              <p className="text-sm text-gray-600">{metric.title}</p>
              <p className={`text-2xl font-bold ${metric.textColor}`}>{metric.value}</p>
              <p className={`text-xs ${metric.textColor} mt-1`}>{metric.subtitle}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
