import { Component, Input } from '@angular/core';
import { ChannelPerformance } from '../../models/campaign.model';

@Component({
  selector: 'app-channel-performance',
  template: `
    <div class="channel-grid" *ngIf="channelData && channelData.length > 0">
      <div class="card channel-card" *ngFor="let channel of channelData">
        <div class="channel-header">
          <div class="channel-icon" [style.background]="channel.color">
            <span>{{getChannelIcon(channel.channel)}}</span>
          </div>
          <div class="channel-name">
            <h4>{{channel.channel | titlecase}}</h4>
            <span>{{channel.campaigns}} campaigns</span>
          </div>
        </div>
        
        <div class="channel-metrics">
          <div class="metric-row">
            <div class="metric">
              <span class="metric-label">Impressions</span>
              <span class="metric-value">{{formatNumber(channel.impressions)}}</span>
            </div>
            <div class="metric">
              <span class="metric-label">Clicks</span>
              <span class="metric-value">{{formatNumber(channel.clicks)}}</span>
            </div>
          </div>
          
          <div class="metric-row">
            <div class="metric">
              <span class="metric-label">CTR</span>
              <span class="metric-value" [ngClass]="getCTRClass(channel.ctr)">{{channel.ctr}}%</span>
            </div>
            <div class="metric">
              <span class="metric-label">CPC</span>
              <span class="metric-value">₹{{channel.cpc}}</span>
            </div>
          </div>
          
          <div class="metric-row">
            <div class="metric">
              <span class="metric-label">Revenue</span>
              <span class="metric-value revenue">₹{{formatNumber(channel.revenue)}}</span>
            </div>
            <div class="metric">
              <span class="metric-label">ROI</span>
              <span class="metric-value" [ngClass]="getROIClass(channel.roi)">{{channel.roi}}%</span>
            </div>
          </div>
        </div>
        
        <div class="channel-progress">
          <div class="progress-label">
            <span>Cost Efficiency</span>
            <span>₹{{formatNumber(channel.cost)}} / ₹{{formatNumber(channel.revenue)}}</span>
          </div>
          <div class="progress-bar">
            <div 
              class="progress-fill" 
              [style.width.%]="(channel.cost / channel.revenue) * 100"
              [style.background]="channel.color">
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div *ngIf="!channelData || channelData.length === 0" class="empty-state">
      <p>No channel performance data available</p>
    </div>
  `,
  styles: [`
    .channel-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 1.5rem;
    }
    
    .channel-card {
      padding: 1.5rem;
      border-left: 4px solid transparent;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    
    .channel-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    }
    
    .channel-header {
      display: flex;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    
    .channel-icon {
      width: 50px;
      height: 50px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.5rem;
      margin-right: 1rem;
    }
    
    .channel-name h4 {
      margin: 0 0 0.25rem 0;
      font-size: 1.2rem;
      color: #2d3748;
    }
    
    .channel-name span {
      font-size: 0.9rem;
      color: #718096;
    }
    
    .channel-metrics {
      margin-bottom: 1.5rem;
    }
    
    .metric-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;
    }
    
    .metric-row:last-child {
      margin-bottom: 0;
    }
    
    .metric {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    
    .metric:first-child {
      margin-right: 1rem;
    }
    
    .metric-label {
      font-size: 0.85rem;
      color: #718096;
      margin-bottom: 0.25rem;
    }
    
    .metric-value {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d3748;
    }
    
    .metric-value.revenue {
      color: #38a169;
    }
    
    .ctr-good {
      color: #38a169;
    }
    
    .ctr-average {
      color: #d69e2e;
    }
    
    .ctr-poor {
      color: #e53e3e;
    }
    
    .roi-excellent {
      color: #38a169;
    }
    
    .roi-good {
      color: #4c51bf;
    }
    
    .roi-average {
      color: #d69e2e;
    }
    
    .roi-poor {
      color: #e53e3e;
    }
    
    .channel-progress {
      border-top: 1px solid #e2e8f0;
      padding-top: 1rem;
    }
    
    .progress-label {
      display: flex;
      justify-content: space-between;
      font-size: 0.85rem;
      color: #718096;
      margin-bottom: 0.5rem;
    }
    
    .progress-bar {
      height: 6px;
      background-color: #e2e8f0;
      border-radius: 3px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      border-radius: 3px;
      transition: width 0.3s ease;
    }
    
    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #718096;
    }
    
    @media (max-width: 768px) {
      .channel-grid {
        grid-template-columns: 1fr;
      }
      
      .metric-row {
        flex-direction: column;
      }
      
      .metric:first-child {
        margin-right: 0;
        margin-bottom: 0.5rem;
      }
    }
  `]
})
export class ChannelPerformanceComponent {
  @Input() channelData: ChannelPerformance[] | null = null;

  getChannelIcon(channel: string): string {
    const icons: { [key: string]: string } = {
      'sms': '💬',
      'whatsapp': '📱',
      'email': '📧',
      'push': '🔔',
      'rcs': '💬'
    };
    return icons[channel] || '📊';
  }

  formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  getCTRClass(ctr: number): string {
    if (ctr >= 8) return 'ctr-good';
    if (ctr >= 5) return 'ctr-average';
    return 'ctr-poor';
  }

  getROIClass(roi: number): string {
    if (roi >= 300) return 'roi-excellent';
    if (roi >= 200) return 'roi-good';
    if (roi >= 100) return 'roi-average';
    return 'roi-poor';
  }
}