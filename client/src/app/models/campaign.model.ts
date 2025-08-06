export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  channel: Channel;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  roi: number;
  targetAudience: string;
  creativeType: string;
  bspProvider: string;
}

export interface KPI {
  id: string;
  title: string;
  value: string;
  change: number;
  changeType: 'increase' | 'decrease';
  icon: string;
  trend?: number[];
}

export interface ChannelPerformance {
  channel: Channel;
  campaigns: number;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  revenue: number;
  roi: number;
  ctr: number;
  cpc: number;
  color: string;
}

export type CampaignType = 'promotional' | 'transactional' | 'notification' | 'marketing';
export type CampaignStatus = 'active' | 'paused' | 'completed' | 'draft';
export type Channel = 'sms' | 'whatsapp' | 'email' | 'push' | 'rcs';

export interface BSPComparison {
  provider: string;
  channel: Channel;
  cost: number;
  deliveryRate: number;
  responseRate: number;
  reliability: number;
  features: string[];
}