import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Target, Send, Users } from "lucide-react";

export default function KPICards() {
  const kpis = [
    {
      title: "Total Revenue",
      value: "₹50.5L",
      change: "+18.5% vs last month",
      changeType: "positive",
      icon: TrendingUp,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600"
    },
    {
      title: "Campaign ROI",
      value: "6.0x",
      change: "+2.1x improvement",
      changeType: "positive",
      icon: Target,
      bgColor: "bg-green-50",
      iconColor: "text-green-600"
    },
    {
      title: "Messages Sent",
      value: "4.8M",
      change: "Across all channels",
      changeType: "neutral",
      icon: Send,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600"
    },
    {
      title: "Avg Conversion Rate",
      value: "10.7%",
      change: "+3.2% from target",
      changeType: "positive",
      icon: Users,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-600"
    }
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <Card key={index} className="hover:shadow-md transition-shadow" data-testid={`kpi-card-${index}`}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2" data-testid={`kpi-value-${index}`}>
                    {kpi.value}
                  </p>
                  <div className="flex items-center mt-2">
                    {kpi.changeType === "positive" && (
                      <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                    )}
                    <span 
                      className={`text-sm ${
                        kpi.changeType === "positive" 
                          ? "text-green-600" 
                          : kpi.changeType === "negative" 
                            ? "text-red-600" 
                            : "text-gray-500"
                      }`}
                    >
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 ${kpi.bgColor} rounded-lg`}>
                  <Icon className={`w-6 h-6 ${kpi.iconColor}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
