// Mock data for campaign analytics dashboard
// All campaign, channel, and performance data

export interface Campaign {
  id: string;
  name: string;
  status: 'Active' | 'Completed' | 'Scheduled' | 'Paused';
  statusType: 'warning' | 'info' | 'success' | 'default';
  burnRate: number;
  sent: string;
  total: string;
  percentage: number;
  spent: number;
  budget: number;
  segment: string;
  channel: string;
  startDate: string;
  errors: number;
  retryCount: number;
  retryCost: number;
  conversionRate: string;
  openRate: string;
  clickRate: string;
}

export interface ChannelPerformance {
  name: string;
  icon: string;
  bgColor: string;
  borderColor: string;
  iconColor: string;
  openRate: string;
  ctr: string;
  costPerLead: string;
  efficiency: number;
  efficiencyColor: string;
  revenue: string;
  conversions: number;
  spend: number;
}

export interface HeatmapData {
  day: string;
  values: number[];
  percentages: string[];
}

export interface Holiday {
  name: string;
  date: Date;
  status: string;
  campaigns: number;
  expectedRevenue: string;
  engagement: string;
  color: string;
  category: string;
  description: string;
  preparationDays: number;
  conversionRate: string;
}

export interface BSPPerformance {
  name: string;
  deliveryRate: string;
  avgSpeed: string;
  costPerMessage: string;
  reliability: number;
  volume: string;
  status: 'excellent' | 'good' | 'average' | 'poor';
  statusColor: string;
}

// Campaign Data
export const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Diwali Festival Sale",
    status: "Active",
    statusType: "warning",
    burnRate: 88,
    sent: "16L",
    total: "200K",
    percentage: 78,
    spent: 8600,
    budget: 10000,
    segment: "Premium Customers",
    channel: "WhatsApp",
    startDate: "2024-10-15",
    errors: 12,
    retryCount: 3,
    retryCost: 840,
    conversionRate: "28.5%",
    openRate: "98.5%",
    clickRate: "34.2%"
  },
  {
    id: "2",
    name: "New Model Launch",
    status: "Active",
    statusType: "info",
    burnRate: 62,
    sent: "93.3K",
    total: "200K",
    percentage: 46,
    spent: 6200,
    budget: 12000,
    segment: "Existing Customers",
    channel: "Email",
    startDate: "2024-10-20",
    errors: 5,
    retryCount: 1,
    retryCost: 280,
    conversionRate: "18.2%",
    openRate: "24.5%",
    clickRate: "8.7%"
  },
  {
    id: "3",
    name: "Service Reminder",
    status: "Completed",
    statusType: "success",
    burnRate: 100,
    sent: "75K",
    total: "75K",
    percentage: 100,
    spent: 3750,
    budget: 3750,
    segment: "All Customers",
    channel: "SMS",
    startDate: "2024-10-10",
    errors: 0,
    retryCount: 0,
    retryCost: 0,
    conversionRate: "22.1%",
    openRate: "97.0%",
    clickRate: "12.8%"
  },
  {
    id: "4",
    name: "Insurance Renewal",
    status: "Scheduled",
    statusType: "default",
    burnRate: 0,
    sent: "0",
    total: "120K",
    percentage: 0,
    spent: 0,
    budget: 6000,
    segment: "Policy Holders",
    channel: "Push",
    startDate: "2024-11-01",
    errors: 0,
    retryCount: 0,
    retryCost: 0,
    conversionRate: "0%",
    openRate: "0%",
    clickRate: "0%"
  },
  {
    id: "5",
    name: "Black Friday Sale",
    status: "Active",
    statusType: "info",
    burnRate: 45,
    sent: "42K",
    total: "150K",
    percentage: 28,
    spent: 4200,
    budget: 9500,
    segment: "VIP Customers",
    channel: "RCS",
    startDate: "2024-10-25",
    errors: 8,
    retryCount: 2,
    retryCost: 560,
    conversionRate: "35.7%",
    openRate: "89.2%",
    clickRate: "25.4%"
  },
  {
    id: "6",
    name: "Winter Collection Launch",
    status: "Active",
    statusType: "warning",
    burnRate: 92,
    sent: "85K",
    total: "100K",
    percentage: 85,
    spent: 7800,
    budget: 8500,
    segment: "Fashion Enthusiasts",
    channel: "WhatsApp",
    startDate: "2024-10-18",
    errors: 15,
    retryCount: 4,
    retryCost: 1200,
    conversionRate: "31.2%",
    openRate: "96.8%",
    clickRate: "28.9%"
  }
];

// Channel Performance Data
export const mockChannelPerformance: ChannelPerformance[] = [
  {
    name: "WhatsApp",
    icon: "fab fa-whatsapp",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    iconColor: "bg-green-500",
    openRate: "98.5%",
    ctr: "28.7%",
    costPerLead: "₹32",
    efficiency: 95,
    efficiencyColor: "text-green-600",
    revenue: "₹45.2L",
    conversions: 1247,
    spend: 18500
  },
  {
    name: "SMS",
    icon: "fas fa-sms",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    iconColor: "bg-blue-500",
    openRate: "97.0%",
    ctr: "18.0%",
    costPerLead: "₹28",
    efficiency: 88,
    efficiencyColor: "text-blue-600",
    revenue: "₹28.7L",
    conversions: 892,
    spend: 12800
  },
  {
    name: "Email",
    icon: "fas fa-envelope",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    iconColor: "bg-purple-500",
    openRate: "24.5%",
    ctr: "8.0%",
    costPerLead: "₹18",
    efficiency: 72,
    efficiencyColor: "text-purple-600",
    revenue: "₹15.3L",
    conversions: 564,
    spend: 6400
  },
  {
    name: "Push",
    icon: "fas fa-bell",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    iconColor: "bg-orange-500",
    openRate: "92.5%",
    ctr: "3.0%",
    costPerLead: "₹45",
    efficiency: 68,
    efficiencyColor: "text-orange-600",
    revenue: "₹8.9L",
    conversions: 287,
    spend: 4200
  },
  {
    name: "RCS",
    icon: "fas fa-comment-dots",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    iconColor: "bg-cyan-500",
    openRate: "89.2%",
    ctr: "15.5%",
    costPerLead: "₹38",
    efficiency: 75,
    efficiencyColor: "text-cyan-600",
    revenue: "₹12.1L",
    conversions: 423,
    spend: 5600
  }
];

// Heatmap Data
export const mockHeatmapData: HeatmapData[] = [
  { day: "Sun", values: [12, 28, 45, 38], percentages: ["12%", "28%", "45%", "38%"] },
  { day: "Mon", values: [25, 42, 68, 72], percentages: ["25%", "42%", "68%", "72%"] },
  { day: "Tue", values: [38, 78, 65, 42], percentages: ["38%", "78%", "65%", "42%"] },
  { day: "Wed", values: [22, 58, 85, 68], percentages: ["22%", "58%", "85%", "68%"] },
  { day: "Thu", values: [15, 45, 62, 48], percentages: ["15%", "45%", "62%", "48%"] },
  { day: "Fri", values: [28, 52, 75, 82], percentages: ["28%", "52%", "75%", "82%"] },
  { day: "Sat", values: [18, 32, 48, 35], percentages: ["18%", "32%", "48%", "35%"] }
];

// Auto-detected Holidays
export const generateMockHolidays = (): Holiday[] => {
  const currentYear = new Date().getFullYear();
  return [
    {
      name: "Diwali",
      date: new Date(currentYear, 10, 12),
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
      date: new Date(currentYear, 11, 25),
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
      date: new Date(currentYear + 1, 0, 1),
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
      date: new Date(currentYear, 10, 29),
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
      date: new Date(currentYear + 1, 1, 14),
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
      date: new Date(currentYear + 1, 2, 13),
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
  ].sort((a, b) => a.date.getTime() - b.date.getTime());
};

// BSP Performance Data
export const mockBSPPerformance: BSPPerformance[] = [
  {
    name: "Twilio",
    deliveryRate: "99.2%",
    avgSpeed: "2.3s",
    costPerMessage: "₹0.85",
    reliability: 99,
    volume: "2.4M",
    status: "excellent",
    statusColor: "text-green-600"
  },
  {
    name: "AWS SNS",
    deliveryRate: "98.7%",
    avgSpeed: "3.1s",
    costPerMessage: "₹0.75",
    reliability: 97,
    volume: "1.8M",
    status: "excellent",
    statusColor: "text-green-600"
  },
  {
    name: "MessageBird",
    deliveryRate: "97.5%",
    avgSpeed: "4.2s",
    costPerMessage: "₹0.92",
    reliability: 94,
    volume: "1.2M",
    status: "good",
    statusColor: "text-blue-600"
  },
  {
    name: "Gupshup",
    deliveryRate: "96.8%",
    avgSpeed: "5.8s",
    costPerMessage: "₹1.15",
    reliability: 91,
    volume: "890K",
    status: "good",
    statusColor: "text-blue-600"
  },
  {
    name: "Karix",
    deliveryRate: "94.2%",
    avgSpeed: "7.5s",
    costPerMessage: "₹1.28",
    reliability: 87,
    volume: "650K",
    status: "average",
    statusColor: "text-orange-600"
  }
];

// AI Insights Data
export const mockAIInsights = [
  {
    type: "optimization",
    message: "Diwali Festival Sale: Consider increasing budget by 15% - current conversion rate 28% above average",
    impact: "Potential +₹12K revenue",
    confidence: 92
  },
  {
    type: "alert",
    message: "Winter Collection: High burn rate detected. Recommend pausing and optimizing targeting",
    impact: "Save ₹1.2K budget",
    confidence: 87
  },
  {
    type: "retry",
    message: "12 failed deliveries in Diwali campaign. Retry with fallback channel?",
    impact: "Recover 12 customers, Cost: ₹840",
    confidence: 95
  }
];

// Budget Data
export const mockBudgetData = [
  { channel: 'WhatsApp', budget: 25000, spent: 22400, remaining: 2600, efficiency: 89.6 },
  { channel: 'SMS', budget: 15000, spent: 12800, remaining: 2200, efficiency: 85.3 },
  { channel: 'Email', budget: 8000, spent: 6400, remaining: 1600, efficiency: 80.0 },
  { channel: 'Push', budget: 5000, spent: 4200, remaining: 800, efficiency: 84.0 },
  { channel: 'RCS', budget: 7000, spent: 5600, remaining: 1400, efficiency: 80.0 }
];

// Campaign Insights
export const mockCampaignInsights = [
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

// KPI Data
export const mockKPIData = [
  {
    title: "Total Revenue",
    value: "₹50.5L",
    change: "+18.5% vs last month",
    changeType: "positive" as const,
    icon: "TrendingUp",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    title: "Campaign ROI",
    value: "6.0x",
    change: "+2.1x improvement",
    changeType: "positive" as const,
    icon: "Target",
    bgColor: "bg-green-50",
    iconColor: "text-green-600"
  },
  {
    title: "Messages Sent",
    value: "4.8M",
    change: "Across all channels",
    changeType: "neutral" as const,
    icon: "Send",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600"
  },
  {
    title: "Avg Conversion Rate",
    value: "10.7%",
    change: "+3.2% from target",
    changeType: "positive" as const,
    icon: "Users",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600"
  }
];