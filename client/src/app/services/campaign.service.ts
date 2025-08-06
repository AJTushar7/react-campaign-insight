import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Campaign, KPI, ChannelPerformance, BSPComparison } from '../models/campaign.model';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // Mock data for demo purposes
  getCampaigns(): Observable<Campaign[]> {
    const mockCampaigns: Campaign[] = [
      {
        id: '1',
        name: 'Holiday Promotions 2024',
        type: 'promotional',
        status: 'active',
        channel: 'sms',
        startDate: '2024-12-01',
        endDate: '2024-12-31',
        budget: 10000,
        spent: 7500,
        impressions: 150000,
        clicks: 12000,
        conversions: 1200,
        ctr: 8.0,
        cpc: 0.625,
        roi: 240,
        targetAudience: 'Existing Customers',
        creativeType: 'Text + CTA',
        bspProvider: 'Twilio'
      },
      {
        id: '2',
        name: 'WhatsApp Product Launch',
        type: 'marketing',
        status: 'active',
        channel: 'whatsapp',
        startDate: '2024-11-15',
        endDate: '2024-12-15',
        budget: 15000,
        spent: 8200,
        impressions: 95000,
        clicks: 8500,
        conversions: 850,
        ctr: 8.9,
        cpc: 0.965,
        roi: 185,
        targetAudience: 'New Prospects',
        creativeType: 'Rich Media',
        bspProvider: 'MessageBird'
      },
      {
        id: '3',
        name: 'Email Newsletter Campaign',
        type: 'notification',
        status: 'completed',
        channel: 'email',
        startDate: '2024-10-01',
        endDate: '2024-10-31',
        budget: 5000,
        spent: 4800,
        impressions: 200000,
        clicks: 15000,
        conversions: 900,
        ctr: 7.5,
        cpc: 0.32,
        roi: 320,
        targetAudience: 'All Subscribers',
        creativeType: 'HTML Template',
        bspProvider: 'SendGrid'
      }
    ];
    return of(mockCampaigns);
  }

  getKPIs(): Observable<KPI[]> {
    const mockKPIs: KPI[] = [
      {
        id: '1',
        title: 'Total Campaigns',
        value: '24',
        change: 12.5,
        changeType: 'increase',
        icon: 'campaigns',
        trend: [20, 22, 21, 24, 23, 24]
      },
      {
        id: '2',
        title: 'Total Impressions',
        value: '2.4M',
        change: 8.3,
        changeType: 'increase',
        icon: 'impressions',
        trend: [2.1, 2.2, 2.3, 2.4, 2.3, 2.4]
      },
      {
        id: '3',
        title: 'Click-Through Rate',
        value: '8.2%',
        change: -2.1,
        changeType: 'decrease',
        icon: 'clicks',
        trend: [8.5, 8.4, 8.3, 8.2, 8.1, 8.2]
      },
      {
        id: '4',
        title: 'Total Revenue',
        value: '₹3.2L',
        change: 15.7,
        changeType: 'increase',
        icon: 'revenue',
        trend: [2.8, 2.9, 3.0, 3.1, 3.2, 3.2]
      }
    ];
    return of(mockKPIs);
  }

  getChannelPerformance(): Observable<ChannelPerformance[]> {
    const mockPerformance: ChannelPerformance[] = [
      {
        channel: 'sms',
        campaigns: 8,
        impressions: 650000,
        clicks: 52000,
        conversions: 5200,
        cost: 32000,
        revenue: 156000,
        roi: 387,
        ctr: 8.0,
        cpc: 0.615,
        color: '#3b82f6'
      },
      {
        channel: 'whatsapp',
        campaigns: 6,
        impressions: 420000,
        clicks: 37800,
        conversions: 3780,
        cost: 28000,
        revenue: 113400,
        roi: 305,
        ctr: 9.0,
        cpc: 0.741,
        color: '#10b981'
      },
      {
        channel: 'email',
        campaigns: 12,
        impressions: 1200000,
        clicks: 90000,
        conversions: 5400,
        cost: 18000,
        revenue: 162000,
        roi: 800,
        ctr: 7.5,
        cpc: 0.20,
        color: '#8b5cf6'
      },
      {
        channel: 'push',
        campaigns: 4,
        impressions: 180000,
        clicks: 12600,
        conversions: 630,
        cost: 8000,
        revenue: 18900,
        roi: 136,
        ctr: 7.0,
        cpc: 0.635,
        color: '#f59e0b'
      },
      {
        channel: 'rcs',
        campaigns: 2,
        impressions: 95000,
        clicks: 8550,
        conversions: 513,
        cost: 12000,
        revenue: 15390,
        roi: 128,
        ctr: 9.0,
        cpc: 1.404,
        color: '#ef4444'
      }
    ];
    return of(mockPerformance);
  }

  getBSPComparison(): Observable<BSPComparison[]> {
    const mockBSP: BSPComparison[] = [
      {
        provider: 'Twilio',
        channel: 'sms',
        cost: 0.0075,
        deliveryRate: 99.2,
        responseRate: 8.5,
        reliability: 99.9,
        features: ['Global Coverage', '2FA Support', 'Analytics']
      },
      {
        provider: 'MessageBird',
        channel: 'whatsapp',
        cost: 0.0095,
        deliveryRate: 98.8,
        responseRate: 12.3,
        reliability: 99.7,
        features: ['Rich Media', 'Templates', 'Chatbot Integration']
      },
      {
        provider: 'SendGrid',
        channel: 'email',
        cost: 0.0006,
        deliveryRate: 97.5,
        responseRate: 6.8,
        reliability: 99.8,
        features: ['Template Engine', 'A/B Testing', 'Advanced Analytics']
      }
    ];
    return of(mockBSP);
  }
}