import { Component, Input } from '@angular/core';
import { Campaign } from '../../models/campaign.model';

@Component({
  selector: 'app-campaign-table',
  template: `
    <div class="card table-card" *ngIf="campaigns && campaigns.length > 0">
      <div class="table-container">
        <table class="campaign-table">
          <thead>
            <tr>
              <th>Campaign</th>
              <th>Channel</th>
              <th>Status</th>
              <th>Budget</th>
              <th>Spent</th>
              <th>CTR</th>
              <th>Conversions</th>
              <th>ROI</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let campaign of campaigns" class="table-row">
              <td>
                <div class="campaign-info">
                  <div class="campaign-name">{{campaign.name}}</div>
                  <div class="campaign-audience">{{campaign.targetAudience}}</div>
                </div>
              </td>
              <td>
                <span class="channel-badge" [style.background]="getChannelColor(campaign.channel)">
                  {{campaign.channel | uppercase}}
                </span>
              </td>
              <td>
                <span class="status-badge" [ngClass]="'status-' + campaign.status">
                  {{campaign.status}}
                </span>
              </td>
              <td>
                <div class="budget-info">
                  <div class="amount">₹{{campaign.budget | number}}</div>
                  <div class="progress-bar">
                    <div class="progress-fill" [style.width.%]="(campaign.spent / campaign.budget) * 100"></div>
                  </div>
                </div>
              </td>
              <td>₹{{campaign.spent | number}}</td>
              <td>
                <span [ngClass]="getCTRClass(campaign.ctr)">{{campaign.ctr}}%</span>
              </td>
              <td>{{campaign.conversions | number}}</td>
              <td>
                <span [ngClass]="getROIClass(campaign.roi)">{{campaign.roi}}%</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div *ngIf="!campaigns || campaigns.length === 0" class="empty-state">
      <p>No campaigns available</p>
    </div>
  `,
  styles: [`
    .table-card {
      padding: 0;
      overflow: hidden;
    }
    
    .table-container {
      overflow-x: auto;
    }
    
    .campaign-table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .campaign-table th {
      background-color: #f8fafc;
      padding: 1rem;
      text-align: left;
      font-weight: 600;
      color: #4a5568;
      border-bottom: 1px solid #e2e8f0;
      white-space: nowrap;
    }
    
    .campaign-table td {
      padding: 1rem;
      border-bottom: 1px solid #f1f5f9;
    }
    
    .table-row:hover {
      background-color: #f8fafc;
    }
    
    .campaign-info {
      min-width: 200px;
    }
    
    .campaign-name {
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 0.25rem;
    }
    
    .campaign-audience {
      font-size: 0.9rem;
      color: #718096;
    }
    
    .channel-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      color: white;
      font-size: 0.8rem;
      font-weight: 600;
      white-space: nowrap;
    }
    
    .status-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 600;
      white-space: nowrap;
    }
    
    .status-active {
      background-color: #f0fff4;
      color: #38a169;
    }
    
    .status-paused {
      background-color: #fffaf0;
      color: #d69e2e;
    }
    
    .status-completed {
      background-color: #f0f4ff;
      color: #4c51bf;
    }
    
    .status-draft {
      background-color: #f7fafc;
      color: #718096;
    }
    
    .budget-info {
      min-width: 120px;
    }
    
    .amount {
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 0.25rem;
    }
    
    .progress-bar {
      height: 4px;
      background-color: #e2e8f0;
      border-radius: 2px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      background-color: #667eea;
      transition: width 0.3s ease;
    }
    
    .ctr-good {
      color: #38a169;
      font-weight: 600;
    }
    
    .ctr-average {
      color: #d69e2e;
      font-weight: 600;
    }
    
    .ctr-poor {
      color: #e53e3e;
      font-weight: 600;
    }
    
    .roi-excellent {
      color: #38a169;
      font-weight: 600;
    }
    
    .roi-good {
      color: #4c51bf;
      font-weight: 600;
    }
    
    .roi-average {
      color: #d69e2e;
      font-weight: 600;
    }
    
    .roi-poor {
      color: #e53e3e;
      font-weight: 600;
    }
    
    .empty-state {
      text-align: center;
      padding: 3rem;
      color: #718096;
    }
    
    @media (max-width: 768px) {
      .campaign-table {
        font-size: 0.9rem;
      }
      
      .campaign-table th,
      .campaign-table td {
        padding: 0.75rem 0.5rem;
      }
    }
  `]
})
export class CampaignTableComponent {
  @Input() campaigns: Campaign[] | null = null;

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