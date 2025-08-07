import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-engagement-heatmap',
  template: `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">Peak Engagement Heatmap</h3>
      </div>
      <div class="card-content">
        <div class="tabs-container">
          <div class="tab-list">
            <button 
              class="tab-trigger" 
              [class.active]="activeTab === 'engagement'"
              (click)="activeTab = 'engagement'">
              Engagement
            </button>
            <button 
              class="tab-trigger" 
              [class.active]="activeTab === 'conversion'"
              (click)="activeTab = 'conversion'">
              Conversion
            </button>
            <button 
              class="tab-trigger" 
              [class.active]="activeTab === 'cost'"
              (click)="activeTab = 'cost'">
              Cost Efficiency
            </button>
          </div>
          
          <div class="tab-content" *ngIf="activeTab === 'engagement'">
            <!-- Top Performing Channels -->
            <div class="channel-grid">
              <div *ngFor="let channel of channelPerformance" class="channel-card" [ngClass]="channel.bgColor">
                <h4>{{channel.name}}</h4>
                <p class="engagement-rate" [ngClass]="channel.textColor">{{channel.engagement}}</p>
                <p class="peak-time" [ngClass]="channel.textColor">Peak: {{channel.peak}}</p>
              </div>
            </div>

            <!-- Heatmap Grid -->
            <div class="heatmap-section">
              <h4>Engagement Heatmap by Time</h4>
              <div class="heatmap-table">
                <table>
                  <thead>
                    <tr>
                      <th></th>
                      <th>12 AM</th>
                      <th>6 AM</th>
                      <th>12 PM</th>
                      <th>6 PM</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr *ngFor="let row of heatmapData">
                      <td class="day-label">{{row.day}}</td>
                      <td *ngFor="let value of row.values; let i = index" class="heatmap-cell">
                        <div 
                          class="heatmap-square" 
                          [ngClass]="getHeatmapColor(value)"
                          [class.text-white]="getTextColor(value)">
                          {{row.percentages[i]}}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Engagement Insights -->
            <div class="insights-section">
              <div class="insight-card">
                <div class="insight-icon">💡</div>
                <div class="insight-content">
                  <h5>Peak Performance</h5>
                  <p>Tuesday 10-11 AM shows highest engagement across channels</p>
                </div>
              </div>
              <div class="insight-card">
                <div class="insight-icon">📈</div>
                <div class="insight-content">
                  <h5>Optimization Opportunity</h5>
                  <p>Friday evening campaigns underperforming by 23%</p>
                </div>
              </div>
              <div class="insight-card">
                <div class="insight-icon">🎯</div>
                <div class="insight-content">
                  <h5>Weekend Pattern</h5>
                  <p>Weekend engagement drops 15% - consider adjusted timing</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
    }
    
    .card-header {
      padding: 20px 20px 0;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .card-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0 0 16px 0;
    }
    
    .card-content {
      padding: 20px;
    }
    
    .tab-list {
      display: flex;
      border-bottom: 1px solid #e2e8f0;
      margin-bottom: 20px;
    }
    
    .tab-trigger {
      padding: 8px 16px;
      border: none;
      background: none;
      color: #718096;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
    }
    
    .tab-trigger.active {
      color: #667eea;
      border-bottom-color: #667eea;
    }
    
    .channel-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }
    
    .channel-card {
      padding: 16px;
      border-radius: 8px;
      border: 1px solid;
    }
    
    .channel-card.bg-green-50 {
      background-color: #f0fff4;
      border-color: #c6f6d5;
    }
    
    .channel-card.bg-blue-50 {
      background-color: #ebf8ff;
      border-color: #bee3f8;
    }
    
    .channel-card h4 {
      margin: 0 0 8px 0;
      font-weight: 600;
      color: #2d3748;
    }
    
    .engagement-rate {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 0 4px 0;
    }
    
    .engagement-rate.text-green-700 {
      color: #2f855a;
    }
    
    .engagement-rate.text-blue-700 {
      color: #2b6cb0;
    }
    
    .peak-time {
      font-size: 0.875rem;
      margin: 0;
    }
    
    .peak-time.text-green-700 {
      color: #2f855a;
    }
    
    .peak-time.text-blue-700 {
      color: #2b6cb0;
    }
    
    .heatmap-section h4 {
      font-size: 0.875rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 12px;
    }
    
    .heatmap-table table {
      width: 100%;
      border-collapse: collapse;
    }
    
    .heatmap-table th,
    .heatmap-table td {
      text-align: center;
      padding: 8px 4px;
    }
    
    .day-label {
      color: #718096;
      text-align: left !important;
      padding-right: 16px !important;
    }
    
    .heatmap-cell {
      padding: 8px 2px;
    }
    
    .heatmap-square {
      width: 32px;
      height: 24px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 600;
      margin: 0 auto;
    }
    
    .heatmap-square.bg-orange-100 {
      background-color: #fed7aa;
      color: #7c2d12;
    }
    
    .heatmap-square.bg-orange-200 {
      background-color: #fbbf24;
      color: #7c2d12;
    }
    
    .heatmap-square.bg-orange-300 {
      background-color: #fb923c;
      color: #7c2d12;
    }
    
    .heatmap-square.bg-orange-400 {
      background-color: #f97316;
      color: white;
    }
    
    .heatmap-square.bg-orange-500 {
      background-color: #ea580c;
      color: white;
    }
    
    .insights-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
      margin-top: 20px;
    }
    
    .insight-card {
      display: flex;
      align-items: center;
      padding: 12px;
      background-color: #f7fafc;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
    }
    
    .insight-icon {
      font-size: 1.2rem;
      margin-right: 12px;
    }
    
    .insight-content h5 {
      font-size: 0.875rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0 0 4px 0;
    }
    
    .insight-content p {
      font-size: 0.75rem;
      color: #718096;
      margin: 0;
    }
  `]
})
export class EngagementHeatmapComponent implements OnInit {
  activeTab: string = 'engagement';
  
  channelPerformance = [
    {
      name: "WhatsApp",
      engagement: "68.5%",
      peak: "Tue at 10 AM",
      bgColor: "bg-green-50",
      textColor: "text-green-700"
    },
    {
      name: "SMS", 
      engagement: "54.2%",
      peak: "Wed at 11 AM",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700"
    }
  ];

  heatmapData = [
    { day: "Sun", values: [12, 28, 45, 38], percentages: ["12%", "28%", "45%", "38%"] },
    { day: "Mon", values: [25, 42, 68, 72], percentages: ["25%", "42%", "68%", "72%"] },
    { day: "Tue", values: [38, 78, 65, 42], percentages: ["38%", "78%", "65%", "42%"] },
    { day: "Wed", values: [22, 58, 85, 68], percentages: ["22%", "58%", "85%", "68%"] },
    { day: "Thu", values: [15, 45, 62, 48], percentages: ["15%", "45%", "62%", "48%"] },
    { day: "Fri", values: [28, 52, 75, 82], percentages: ["28%", "52%", "75%", "82%"] },
    { day: "Sat", values: [18, 32, 48, 35], percentages: ["18%", "32%", "48%", "35%"] }
  ];

  ngOnInit(): void {}

  getHeatmapColor(value: number): string {
    if (value >= 80) return "bg-orange-500";
    if (value >= 60) return "bg-orange-400";
    if (value >= 40) return "bg-orange-300";
    if (value >= 20) return "bg-orange-200";
    return "bg-orange-100";
  }

  getTextColor(value: number): boolean {
    return value >= 60;
  }
}