import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Campaign, KPI, ChannelPerformance, BSPComparison } from '../../models/campaign.model';
import { CampaignService } from '../../services/campaign.service';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="container dashboard">
      <div class="dashboard-header">
        <h2>Campaign Analytics Dashboard</h2>
        <p>Real-time multi-channel campaign monitoring and performance insights</p>
      </div>

      <!-- KPI Cards Section -->
      <section class="dashboard-section">
        <app-kpi-cards [kpis]="kpis$ | async"></app-kpi-cards>
      </section>

      <!-- Channel Performance Section -->
      <section class="dashboard-section">
        <h3>Channel Performance Overview</h3>
        <app-channel-performance [channelData]="channelPerformance$ | async"></app-channel-performance>
      </section>

      <!-- Campaign Table Section -->
      <section class="dashboard-section">
        <h3>Active Campaigns</h3>
        <app-campaign-table [campaigns]="campaigns$ | async"></app-campaign-table>
      </section>

      <!-- BSP Performance Section -->
      <section class="dashboard-section">
        <h3>BSP Provider Comparison</h3>
        <div class="bsp-grid" *ngIf="bspComparison$ | async as bspData">
          <div class="card bsp-card" *ngFor="let bsp of bspData">
            <div class="bsp-header">
              <h4>{{bsp.provider}}</h4>
              <span class="channel-badge" [style.background]="getChannelColor(bsp.channel)">{{bsp.channel | uppercase}}</span>
            </div>
            <div class="bsp-metrics">
              <div class="metric">
                <span class="metric-label">Cost per message</span>
                <span class="metric-value">₹{{bsp.cost}}</span>
              </div>
              <div class="metric">
                <span class="metric-label">Delivery Rate</span>
                <span class="metric-value">{{bsp.deliveryRate}}%</span>
              </div>
              <div class="metric">
                <span class="metric-label">Response Rate</span>
                <span class="metric-value">{{bsp.responseRate}}%</span>
              </div>
              <div class="metric">
                <span class="metric-label">Reliability</span>
                <span class="metric-value">{{bsp.reliability}}%</span>
              </div>
            </div>
            <div class="bsp-features">
              <span class="feature-tag" *ngFor="let feature of bsp.features">{{feature}}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 2rem 0;
    }
    
    .dashboard-header {
      text-align: center;
      margin-bottom: 3rem;
    }
    
    .dashboard-header h2 {
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
      color: #2d3748;
    }
    
    .dashboard-header p {
      font-size: 1.2rem;
      color: #718096;
    }
    
    .dashboard-section {
      margin-bottom: 3rem;
    }
    
    .dashboard-section h3 {
      font-size: 1.8rem;
      margin-bottom: 1.5rem;
      color: #2d3748;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 0.5rem;
    }
    
    .bsp-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }
    
    .bsp-card {
      padding: 1.5rem;
    }
    
    .bsp-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .bsp-header h4 {
      margin: 0;
      font-size: 1.3rem;
      color: #2d3748;
    }
    
    .channel-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      color: white;
      font-size: 0.8rem;
      font-weight: 600;
    }
    
    .bsp-metrics {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 1rem;
    }
    
    .metric {
      display: flex;
      flex-direction: column;
    }
    
    .metric-label {
      font-size: 0.9rem;
      color: #718096;
      margin-bottom: 0.25rem;
    }
    
    .metric-value {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d3748;
    }
    
    .bsp-features {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    
    .feature-tag {
      background-color: #edf2f7;
      color: #4a5568;
      padding: 0.25rem 0.5rem;
      border-radius: 6px;
      font-size: 0.8rem;
    }
  `]
})
export class DashboardComponent implements OnInit {
  campaigns$: Observable<Campaign[]>;
  kpis$: Observable<KPI[]>;
  channelPerformance$: Observable<ChannelPerformance[]>;
  bspComparison$: Observable<BSPComparison[]>;

  constructor(private campaignService: CampaignService) {}

  ngOnInit(): void {
    this.campaigns$ = this.campaignService.getCampaigns();
    this.kpis$ = this.campaignService.getKPIs();
    this.channelPerformance$ = this.campaignService.getChannelPerformance();
    this.bspComparison$ = this.campaignService.getBSPComparison();
  }

  getChannelColor(channel: string): string {
    const colors: { [key: string]: string } = {
      'sms': '#3b82f6',
      'whatsapp': '#10b981',
      'email': '#8b5cf6',
      'push': '#f59e0b',
      'rcs': '#ef4444'
    };
    return colors[channel] || '#6b7280';
  }
}