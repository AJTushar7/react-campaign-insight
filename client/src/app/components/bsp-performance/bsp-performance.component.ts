import { Component, OnInit } from '@angular/core';

interface BSPProvider {
  name: string;
  deliveryRate: string;
  avgSpeed: string;
  costPerMessage: string;
  reliability: number;
  volume: string;
  status: string;
  statusColor: string;
}

@Component({
  selector: 'app-bsp-performance',
  template: `
    <div class="card">
      <div class="card-header">
        <div class="header-content">
          <div class="title-section">
            <div class="icon">🏗️</div>
            <div>
              <h3 class="card-title">BSP Performance Comparison</h3>
              <p class="card-subtitle">Business Service Provider analytics and cost optimization</p>
            </div>
          </div>
          <div class="controls">
            <select [(ngModel)]="selectedMetric" class="filter-select">
              <option value="delivery">Delivery Rate</option>
              <option value="speed">Average Speed</option>
              <option value="cost">Cost per Message</option>
              <option value="reliability">Reliability Score</option>
            </select>
            <button class="refresh-btn" (click)="refreshData()">🔄 Refresh</button>
          </div>
        </div>
      </div>
      
      <div class="card-content">
        <!-- BSP Summary Cards -->
        <div class="bsp-stats">
          <div class="stat-card">
            <h4>{{providers.length}}</h4>
            <p>Active BSPs</p>
            <span class="trend positive">+2 this month</span>
          </div>
          <div class="stat-card">
            <h4>{{getAverageDeliveryRate()}}%</h4>
            <p>Avg Delivery Rate</p>
            <span class="trend positive">+0.3% vs last week</span>
          </div>
          <div class="stat-card">
            <h4>{{getTotalVolume()}}</h4>
            <p>Total Volume</p>
            <span class="trend neutral">8.3M messages/month</span>
          </div>
        </div>

        <!-- BSP Performance Table -->
        <div class="bsp-table">
          <h4>Provider Performance Details</h4>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>BSP Provider</th>
                  <th>Delivery Rate</th>
                  <th>Avg Speed</th>
                  <th>Cost/Message</th>
                  <th>Reliability</th>
                  <th>Volume</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let provider of providers" class="provider-row">
                  <td class="provider-name">
                    <div class="provider-info">
                      <div class="provider-avatar">{{provider.name.charAt(0)}}</div>
                      <span>{{provider.name}}</span>
                    </div>
                  </td>
                  <td class="metric-cell">
                    <span class="metric-value">{{provider.deliveryRate}}</span>
                    <div class="metric-bar">
                      <div class="bar-fill delivery" [style.width]="getBarWidth(provider.deliveryRate)"></div>
                    </div>
                  </td>
                  <td class="metric-cell">
                    <span class="metric-value">{{provider.avgSpeed}}</span>
                    <div class="speed-indicator" [ngClass]="getSpeedClass(provider.avgSpeed)"></div>
                  </td>
                  <td class="cost-cell">
                    <span class="cost-value">{{provider.costPerMessage}}</span>
                    <div class="cost-trend" [ngClass]="getCostTrend(provider.name)">
                      {{getCostChange(provider.name)}}
                    </div>
                  </td>
                  <td class="reliability-cell">
                    <div class="reliability-score">
                      <span>{{provider.reliability}}%</span>
                      <div class="reliability-ring">
                        <svg viewBox="0 0 36 36" class="circular-chart">
                          <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                          <path class="circle" [attr.stroke-dasharray]="provider.reliability + ', 100'" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"></path>
                        </svg>
                      </div>
                    </div>
                  </td>
                  <td class="volume-cell">
                    <span class="volume-value">{{provider.volume}}</span>
                    <div class="volume-bar">
                      <div class="bar-fill volume" [style.width]="getVolumeBarWidth(provider.volume)"></div>
                    </div>
                  </td>
                  <td class="status-cell">
                    <span class="status-badge" [ngClass]="provider.statusColor">
                      {{provider.status}}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Performance Insights -->
        <div class="insights-section">
          <h4>🎯 Performance Insights & Recommendations</h4>
          <div class="insights-grid">
            <div class="insight-card cost-insight">
              <div class="insight-header">
                <span class="insight-icon">💰</span>
                <h5>Cost Optimization</h5>
              </div>
              <p>Switch 30% of volume from MessageBird to AWS SNS could save ₹2.1L/month while maintaining delivery quality.</p>
              <div class="insight-action">
                <button class="action-btn">Implement Recommendation</button>
              </div>
            </div>
            
            <div class="insight-card performance-insight">
              <div class="insight-header">
                <span class="insight-icon">⚡</span>
                <h5>Speed Enhancement</h5>
              </div>
              <p>Twilio shows consistently fastest delivery times. Consider priority routing through Twilio for time-sensitive campaigns.</p>
              <div class="insight-action">
                <button class="action-btn">Configure Priority Routing</button>
              </div>
            </div>
            
            <div class="insight-card reliability-insight">
              <div class="insight-header">
                <span class="insight-icon">🛡️</span>
                <h5>Reliability Alert</h5>
              </div>
              <p>Karix reliability dropped 3% this week. Set up automated failover to maintain campaign performance.</p>
              <div class="insight-action">
                <button class="action-btn">Setup Failover</button>
              </div>
            </div>
          </div>
        </div>

        <!-- BSP Cost Analysis Chart -->
        <div class="cost-analysis">
          <h4>Monthly Cost Analysis by BSP</h4>
          <div class="cost-chart">
            <div class="chart-bars">
              <div *ngFor="let provider of providers" class="cost-bar-container">
                <div class="cost-bar" [style.height]="getCostBarHeight(provider.costPerMessage)">
                  <span class="cost-label">{{provider.costPerMessage}}</span>
                </div>
                <span class="provider-label">{{provider.name}}</span>
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
      padding: 20px;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }
    
    .title-section {
      display: flex;
      align-items: center;
    }
    
    .icon {
      font-size: 1.25rem;
      margin-right: 12px;
    }
    
    .card-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0 0 4px 0;
    }
    
    .card-subtitle {
      font-size: 0.875rem;
      color: #718096;
      margin: 0;
    }
    
    .controls {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .filter-select {
      padding: 6px 12px;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      background: white;
      color: #2d3748;
    }
    
    .refresh-btn {
      padding: 6px 12px;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      background: white;
      color: #2d3748;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .refresh-btn:hover {
      background: #f7fafc;
    }
    
    .card-content {
      padding: 20px;
    }
    
    .bsp-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    
    .stat-card {
      padding: 16px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 8px;
    }
    
    .stat-card h4 {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 0 4px 0;
    }
    
    .stat-card p {
      font-size: 0.875rem;
      margin: 0 0 8px 0;
      opacity: 0.9;
    }
    
    .trend {
      font-size: 0.75rem;
      padding: 2px 6px;
      border-radius: 4px;
    }
    
    .trend.positive {
      background: rgba(34, 197, 94, 0.2);
      color: #bbf7d0;
    }
    
    .trend.neutral {
      background: rgba(156, 163, 175, 0.2);
      color: #d1d5db;
    }
    
    .bsp-table h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 16px;
    }
    
    .table-container {
      overflow-x: auto;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
    }
    
    th {
      background: #f8fafc;
      padding: 12px 16px;
      text-align: left;
      font-weight: 600;
      color: #374151;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .provider-row {
      border-bottom: 1px solid #f1f5f9;
      transition: background 0.2s;
    }
    
    .provider-row:hover {
      background: #f8fafc;
    }
    
    td {
      padding: 12px 16px;
      vertical-align: middle;
    }
    
    .provider-info {
      display: flex;
      align-items: center;
    }
    
    .provider-avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 0.875rem;
      margin-right: 12px;
    }
    
    .metric-cell {
      position: relative;
    }
    
    .metric-value {
      font-weight: 600;
      color: #2d3748;
    }
    
    .metric-bar {
      width: 80px;
      height: 4px;
      background: #e2e8f0;
      border-radius: 2px;
      margin-top: 4px;
      overflow: hidden;
    }
    
    .bar-fill.delivery {
      background: linear-gradient(90deg, #10b981, #059669);
      height: 100%;
      border-radius: 2px;
    }
    
    .speed-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-top: 4px;
    }
    
    .speed-fast { background: #10b981; }
    .speed-medium { background: #f59e0b; }
    .speed-slow { background: #ef4444; }
    
    .cost-cell {
      text-align: center;
    }
    
    .cost-value {
      font-weight: 600;
      color: #2d3748;
    }
    
    .cost-trend {
      font-size: 0.75rem;
      margin-top: 2px;
    }
    
    .cost-trend.up { color: #ef4444; }
    .cost-trend.down { color: #10b981; }
    .cost-trend.stable { color: #6b7280; }
    
    .reliability-cell {
      text-align: center;
    }
    
    .reliability-score {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }
    
    .reliability-ring {
      width: 24px;
      height: 24px;
    }
    
    .circular-chart {
      width: 100%;
      height: 100%;
    }
    
    .circle-bg {
      fill: none;
      stroke: #e2e8f0;
      stroke-width: 3;
    }
    
    .circle {
      fill: none;
      stroke: #667eea;
      stroke-width: 3;
      stroke-linecap: round;
      animation: progress 1s ease-in-out forwards;
    }
    
    @keyframes progress {
      0% { stroke-dasharray: 0 100; }
    }
    
    .volume-cell {
      text-align: center;
    }
    
    .volume-value {
      font-weight: 600;
      color: #2d3748;
    }
    
    .volume-bar {
      width: 60px;
      height: 4px;
      background: #e2e8f0;
      border-radius: 2px;
      margin: 4px auto 0;
      overflow: hidden;
    }
    
    .bar-fill.volume {
      background: linear-gradient(90deg, #8b5cf6, #7c3aed);
      height: 100%;
      border-radius: 2px;
    }
    
    .status-badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    
    .status-badge.text-green-600 {
      background: #dcfce7;
      color: #16a34a;
    }
    
    .status-badge.text-blue-600 {
      background: #dbeafe;
      color: #2563eb;
    }
    
    .insights-section {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #e2e8f0;
    }
    
    .insights-section h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 16px;
    }
    
    .insights-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 16px;
    }
    
    .insight-card {
      padding: 16px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    }
    
    .insight-header {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
    }
    
    .insight-icon {
      font-size: 1.1rem;
      margin-right: 8px;
    }
    
    .insight-header h5 {
      font-size: 0.875rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0;
    }
    
    .insight-card p {
      font-size: 0.875rem;
      color: #4a5568;
      margin: 0 0 12px 0;
      line-height: 1.4;
    }
    
    .action-btn {
      background: #667eea;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
      font-size: 0.75rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    
    .action-btn:hover {
      background: #5a67d8;
    }
    
    .cost-analysis {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #e2e8f0;
    }
    
    .cost-analysis h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 16px;
    }
    
    .chart-bars {
      display: flex;
      align-items: end;
      gap: 16px;
      height: 120px;
      padding: 16px;
      background: #f8fafc;
      border-radius: 8px;
    }
    
    .cost-bar-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
    }
    
    .cost-bar {
      background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
      width: 100%;
      max-width: 40px;
      border-radius: 4px 4px 0 0;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      padding-top: 4px;
      min-height: 20px;
      position: relative;
    }
    
    .cost-label {
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
      text-shadow: 0 1px 2px rgba(0,0,0,0.3);
    }
    
    .provider-label {
      font-size: 0.75rem;
      color: #718096;
      margin-top: 8px;
      text-align: center;
    }
  `]
})
export class BspPerformanceComponent implements OnInit {
  selectedMetric: string = 'delivery';
  
  providers: BSPProvider[] = [
    {
      name: "Twilio",
      deliveryRate: "99.2",
      avgSpeed: "2.3s",
      costPerMessage: "₹0.85",
      reliability: 99,
      volume: "2.4M",
      status: "excellent",
      statusColor: "text-green-600"
    },
    {
      name: "AWS SNS",
      deliveryRate: "98.7",
      avgSpeed: "3.1s",
      costPerMessage: "₹0.75",
      reliability: 97,
      volume: "1.8M",
      status: "excellent",
      statusColor: "text-green-600"
    },
    {
      name: "MessageBird",
      deliveryRate: "97.5",
      avgSpeed: "4.2s",
      costPerMessage: "₹0.92",
      reliability: 94,
      volume: "1.2M",
      status: "good",
      statusColor: "text-blue-600"
    },
    {
      name: "Gupshup",
      deliveryRate: "96.8",
      avgSpeed: "5.8s",
      costPerMessage: "₹1.15",
      reliability: 91,
      volume: "890K",
      status: "good",
      statusColor: "text-blue-600"
    },
    {
      name: "Karix",
      deliveryRate: "94.2",
      avgSpeed: "7.5s",
      costPerMessage: "₹1.28",
      reliability: 87,
      volume: "650K",
      status: "average",
      statusColor: "text-blue-600"
    }
  ];

  ngOnInit(): void {}

  refreshData(): void {
    console.log('Refreshing BSP data...');
  }

  getAverageDeliveryRate(): string {
    const total = this.providers.reduce((sum, p) => sum + parseFloat(p.deliveryRate), 0);
    return (total / this.providers.length).toFixed(1);
  }

  getTotalVolume(): string {
    return "8.3M";
  }

  getBarWidth(deliveryRate: string): string {
    return parseFloat(deliveryRate) + '%';
  }

  getSpeedClass(speed: string): string {
    const seconds = parseFloat(speed);
    if (seconds <= 3) return 'speed-fast';
    if (seconds <= 5) return 'speed-medium';
    return 'speed-slow';
  }

  getCostTrend(providerName: string): string {
    // Mock trend data
    const trends: {[key: string]: string} = {
      'Twilio': 'up',
      'AWS SNS': 'stable',
      'MessageBird': 'down',
      'Gupshup': 'up',
      'Karix': 'stable'
    };
    return trends[providerName] || 'stable';
  }

  getCostChange(providerName: string): string {
    const changes: {[key: string]: string} = {
      'Twilio': '+0.05',
      'AWS SNS': '0.00',
      'MessageBird': '-0.08',
      'Gupshup': '+0.12',
      'Karix': '0.00'
    };
    return changes[providerName] || '0.00';
  }

  getVolumeBarWidth(volume: string): string {
    // Convert volume to percentage for bar width
    const num = parseFloat(volume);
    const max = 2.4; // Max volume in millions
    return ((num / max) * 100) + '%';
  }

  getCostBarHeight(cost: string): string {
    // Convert cost to height percentage
    const num = parseFloat(cost.replace('₹', ''));
    const max = 1.5; // Max cost for scaling
    const percentage = Math.max(20, (num / max) * 100);
    return percentage + '%';
  }
}