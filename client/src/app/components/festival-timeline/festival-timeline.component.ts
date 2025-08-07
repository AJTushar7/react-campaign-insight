import { Component, OnInit } from '@angular/core';

interface Holiday {
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

@Component({
  selector: 'app-festival-timeline',
  template: `
    <div class="card">
      <div class="card-header">
        <div class="header-content">
          <div class="title-section">
            <div class="icon">🎊</div>
            <div>
              <h3 class="card-title">Festival Performance Timeline</h3>
              <p class="card-subtitle">AI-powered holiday and event campaign planning</p>
            </div>
          </div>
          <div class="controls">
            <select [(ngModel)]="selectedCategory" class="filter-select" (change)="filterHolidays()">
              <option value="all">All Categories</option>
              <option value="Festival">Festivals</option>
              <option value="Religious">Religious</option>
              <option value="Shopping">Shopping</option>
              <option value="Romance">Romance</option>
            </select>
            <button class="ai-btn" (click)="generateAIInsights()">🤖 AI Insights</button>
          </div>
        </div>
      </div>
      
      <div class="card-content">
        <!-- Festival Stats Overview -->
        <div class="festival-stats">
          <div class="stat-item">
            <div class="stat-icon">📅</div>
            <div class="stat-info">
              <h4>{{getUpcomingFestivals()}}</h4>
              <p>Upcoming Festivals</p>
              <span class="stat-detail">Next 90 days</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">💰</div>
            <div class="stat-info">
              <h4>{{getTotalRevenuePotential()}}</h4>
              <p>Revenue Potential</p>
              <span class="stat-detail">Projected earnings</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">🎯</div>
            <div class="stat-info">
              <h4>{{getTotalCampaigns()}}</h4>
              <p>Planned Campaigns</p>
              <span class="stat-detail">Across all festivals</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon">📈</div>
            <div class="stat-info">
              <h4>{{getAverageEngagement()}}</h4>
              <p>Avg Engagement Lift</p>
              <span class="stat-detail">During festivals</span>
            </div>
          </div>
        </div>

        <!-- Timeline View -->
        <div class="timeline-section">
          <h4>Festival Timeline & Campaign Schedule</h4>
          <div class="timeline-container">
            <div class="timeline-line"></div>
            <div *ngFor="let holiday of displayedHolidays; let i = index" 
                 class="timeline-item" 
                 [ngClass]="holiday.status"
                 [style.left.px]="getTimelinePosition(holiday.date)">
              
              <div class="timeline-marker" [ngClass]="holiday.color">
                <div class="marker-dot"></div>
              </div>
              
              <div class="timeline-card" [ngClass]="holiday.color">
                <div class="card-header-mini">
                  <h5>{{holiday.name}}</h5>
                  <span class="category-badge" [ngClass]="getCategoryClass(holiday.category)">
                    {{holiday.category}}
                  </span>
                </div>
                
                <div class="card-content-mini">
                  <div class="holiday-date">
                    <span class="date-text">{{formatDate(holiday.date)}}</span>
                    <span class="days-until" *ngIf="getDaysUntil(holiday.date) > 0">
                      {{getDaysUntil(holiday.date)}} days to go
                    </span>
                  </div>
                  
                  <div class="holiday-metrics">
                    <div class="metric-mini">
                      <span class="metric-label">Campaigns</span>
                      <span class="metric-value">{{holiday.campaigns}}</span>
                    </div>
                    <div class="metric-mini">
                      <span class="metric-label">Revenue</span>
                      <span class="metric-value">{{holiday.expectedRevenue}}</span>
                    </div>
                    <div class="metric-mini">
                      <span class="metric-label">Engagement</span>
                      <span class="metric-value">{{holiday.engagement}}</span>
                    </div>
                    <div class="metric-mini">
                      <span class="metric-label">Conv. Rate</span>
                      <span class="metric-value">{{holiday.conversionRate}}</span>
                    </div>
                  </div>
                  
                  <div class="holiday-description">
                    <p>{{holiday.description}}</p>
                  </div>
                  
                  <div class="holiday-actions">
                    <button class="action-btn primary" (click)="viewCampaigns(holiday)">
                      View Campaigns
                    </button>
                    <button class="action-btn secondary" (click)="planCampaign(holiday)">
                      Plan Campaign
                    </button>
                  </div>
                  
                  <div class="preparation-alert" *ngIf="needsPreparation(holiday)">
                    <div class="alert-icon">⚠️</div>
                    <span>Campaign preparation should start in {{getPreparationDays(holiday)}} days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Festival Performance Insights -->
        <div class="performance-insights">
          <h4>🎯 Festival Campaign Insights</h4>
          <div class="insights-grid">
            <div class="insight-card trend-analysis">
              <div class="insight-header">
                <span class="insight-icon">📊</span>
                <h5>Trend Analysis</h5>
              </div>
              <div class="trend-chart">
                <div class="trend-line">
                  <div *ngFor="let point of getTrendData()" 
                       class="trend-point" 
                       [style.height.%]="point.value"
                       [style.left.%]="point.position">
                  </div>
                </div>
              </div>
              <p>Festival campaigns show 67% higher engagement vs regular campaigns. Peak performance during Diwali and Christmas periods.</p>
            </div>
            
            <div class="insight-card channel-recommendation">
              <div class="insight-header">
                <span class="insight-icon">📱</span>
                <h5>Channel Recommendations</h5>
              </div>
              <div class="channel-breakdown">
                <div class="channel-item">
                  <span class="channel-name">WhatsApp</span>
                  <div class="channel-bar">
                    <div class="bar-fill whatsapp" style="width: 85%"></div>
                  </div>
                  <span class="channel-score">85%</span>
                </div>
                <div class="channel-item">
                  <span class="channel-name">SMS</span>
                  <div class="channel-bar">
                    <div class="bar-fill sms" style="width: 72%"></div>
                  </div>
                  <span class="channel-score">72%</span>
                </div>
                <div class="channel-item">
                  <span class="channel-name">Email</span>
                  <div class="channel-bar">
                    <div class="bar-fill email" style="width: 45%"></div>
                  </div>
                  <span class="channel-score">45%</span>
                </div>
              </div>
              <p>WhatsApp performs 23% better during festivals. Recommend allocating 60% budget to WhatsApp for maximum ROI.</p>
            </div>
            
            <div class="insight-card timing-optimization">
              <div class="insight-header">
                <span class="insight-icon">⏰</span>
                <h5>Optimal Timing</h5>
              </div>
              <div class="timing-heatmap">
                <div class="time-slots">
                  <div *ngFor="let slot of getOptimalTimes()" 
                       class="time-slot" 
                       [ngClass]="slot.intensity">
                    <span class="slot-time">{{slot.time}}</span>
                    <span class="slot-rate">{{slot.rate}}</span>
                  </div>
                </div>
              </div>
              <p>Send festival campaigns at 10 AM for 34% higher open rates. Avoid sending after 8 PM during religious festivals.</p>
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
    
    .ai-btn {
      padding: 6px 12px;
      border: none;
      border-radius: 6px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      cursor: pointer;
      transition: all 0.2s;
      font-weight: 500;
    }
    
    .ai-btn:hover {
      transform: translateY(-1px);
    }
    
    .card-content {
      padding: 20px;
    }
    
    .festival-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
      margin-bottom: 32px;
    }
    
    .stat-item {
      display: flex;
      align-items: center;
      padding: 16px;
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }
    
    .stat-icon {
      font-size: 1.5rem;
      margin-right: 12px;
    }
    
    .stat-info h4 {
      font-size: 1.25rem;
      font-weight: 700;
      color: #2d3748;
      margin: 0 0 4px 0;
    }
    
    .stat-info p {
      font-size: 0.875rem;
      color: #4a5568;
      margin: 0 0 2px 0;
    }
    
    .stat-detail {
      font-size: 0.75rem;
      color: #718096;
    }
    
    .timeline-section h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 20px;
    }
    
    .timeline-container {
      position: relative;
      padding: 20px 0;
      overflow-x: auto;
      min-height: 400px;
    }
    
    .timeline-line {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, #e2e8f0, #cbd5e0, #e2e8f0);
      transform: translateY(-1px);
    }
    
    .timeline-item {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
    }
    
    .timeline-marker {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 15;
    }
    
    .marker-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: white;
      border: 3px solid;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    
    .timeline-item.active .marker-dot {
      border-color: #f59e0b;
      animation: pulse 2s infinite;
    }
    
    .timeline-item.upcoming .marker-dot {
      border-color: #3b82f6;
    }
    
    .timeline-item.planned .marker-dot {
      border-color: #10b981;
    }
    
    @keyframes pulse {
      0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
      70% { box-shadow: 0 0 0 10px rgba(245, 158, 11, 0); }
      100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
    }
    
    .timeline-card {
      position: absolute;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      width: 280px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      border: 1px solid;
      padding: 16px;
    }
    
    .timeline-card.border-orange-300 {
      border-color: #fed7aa;
    }
    
    .timeline-card.border-green-300 {
      border-color: #bbf7d0;
    }
    
    .timeline-card.border-blue-300 {
      border-color: #bfdbfe;
    }
    
    .timeline-card.border-purple-300 {
      border-color: #d8b4fe;
    }
    
    .timeline-card.border-pink-300 {
      border-color: #f9a8d4;
    }
    
    .timeline-card.border-yellow-300 {
      border-color: #fde047;
    }
    
    .card-header-mini {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    
    .card-header-mini h5 {
      font-size: 0.875rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0;
    }
    
    .category-badge {
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
    }
    
    .category-festival {
      background: #fed7aa;
      color: #c2410c;
    }
    
    .category-religious {
      background: #bbf7d0;
      color: #166534;
    }
    
    .category-shopping {
      background: #d8b4fe;
      color: #7c3aed;
    }
    
    .category-romance {
      background: #f9a8d4;
      color: #be185d;
    }
    
    .holiday-date {
      margin-bottom: 12px;
    }
    
    .date-text {
      font-size: 0.875rem;
      font-weight: 600;
      color: #374151;
      display: block;
    }
    
    .days-until {
      font-size: 0.75rem;
      color: #f59e0b;
      font-weight: 500;
    }
    
    .holiday-metrics {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 12px;
    }
    
    .metric-mini {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .metric-label {
      font-size: 0.75rem;
      color: #6b7280;
    }
    
    .metric-value {
      font-size: 0.75rem;
      font-weight: 600;
      color: #374151;
    }
    
    .holiday-description {
      margin-bottom: 12px;
    }
    
    .holiday-description p {
      font-size: 0.75rem;
      color: #6b7280;
      margin: 0;
      line-height: 1.4;
    }
    
    .holiday-actions {
      display: flex;
      gap: 8px;
      margin-bottom: 8px;
    }
    
    .action-btn {
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
      flex: 1;
    }
    
    .action-btn.primary {
      background: #3b82f6;
      color: white;
      border: none;
    }
    
    .action-btn.secondary {
      background: white;
      color: #374151;
      border: 1px solid #d1d5db;
    }
    
    .action-btn:hover {
      transform: translateY(-1px);
    }
    
    .preparation-alert {
      display: flex;
      align-items: center;
      padding: 6px;
      background: #fef3c7;
      border-radius: 4px;
      font-size: 0.75rem;
      color: #92400e;
    }
    
    .alert-icon {
      margin-right: 6px;
    }
    
    .performance-insights {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #e2e8f0;
    }
    
    .performance-insights h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 16px;
    }
    
    .insights-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
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
      margin-bottom: 12px;
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
      margin: 8px 0 0 0;
      line-height: 1.4;
    }
    
    .trend-chart {
      height: 60px;
      background: #f9fafb;
      border-radius: 4px;
      position: relative;
      margin-bottom: 8px;
    }
    
    .trend-line {
      position: relative;
      height: 100%;
    }
    
    .trend-point {
      position: absolute;
      bottom: 0;
      width: 4px;
      background: linear-gradient(180deg, #3b82f6, #1e40af);
      border-radius: 2px;
    }
    
    .channel-breakdown {
      margin-bottom: 8px;
    }
    
    .channel-item {
      display: flex;
      align-items: center;
      margin-bottom: 6px;
      gap: 8px;
    }
    
    .channel-name {
      font-size: 0.75rem;
      font-weight: 500;
      width: 60px;
    }
    
    .channel-bar {
      flex: 1;
      height: 6px;
      background: #e5e7eb;
      border-radius: 3px;
      overflow: hidden;
    }
    
    .bar-fill {
      height: 100%;
      border-radius: 3px;
    }
    
    .bar-fill.whatsapp { background: #10b981; }
    .bar-fill.sms { background: #3b82f6; }
    .bar-fill.email { background: #8b5cf6; }
    
    .channel-score {
      font-size: 0.75rem;
      font-weight: 600;
      width: 30px;
      text-align: right;
    }
    
    .time-slots {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 4px;
      margin-bottom: 8px;
    }
    
    .time-slot {
      padding: 6px;
      border-radius: 4px;
      text-align: center;
      display: flex;
      flex-direction: column;
    }
    
    .time-slot.high {
      background: #dcfce7;
      color: #166534;
    }
    
    .time-slot.medium {
      background: #fef3c7;
      color: #92400e;
    }
    
    .time-slot.low {
      background: #fee2e2;
      color: #991b1b;
    }
    
    .slot-time {
      font-size: 0.75rem;
      font-weight: 600;
    }
    
    .slot-rate {
      font-size: 0.625rem;
    }
  `]
})
export class FestivalTimelineComponent implements OnInit {
  selectedCategory: string = 'all';
  
  holidays: Holiday[] = [
    {
      name: "Diwali",
      date: new Date(2024, 10, 12),
      status: "upcoming",
      campaigns: 3,
      expectedRevenue: "₹12L",
      engagement: "+67%",
      color: "border-orange-300",
      category: "Festival",
      description: "Festival of Lights - Major Indian celebration",
      preparationDays: 7,
      conversionRate: "28%"
    },
    {
      name: "Christmas",
      date: new Date(2024, 11, 25),
      status: "planned",
      campaigns: 5,
      expectedRevenue: "₹25L",
      engagement: "+89%",
      color: "border-green-300",
      category: "Religious",
      description: "Christmas Day - Global Christian holiday",
      preparationDays: 14,
      conversionRate: "35%"
    },
    {
      name: "New Year",
      date: new Date(2025, 0, 1),
      status: "planned",
      campaigns: 2,
      expectedRevenue: "₹8L",
      engagement: "+45%",
      color: "border-blue-300",
      category: "Celebration",
      description: "New Year's Day - Global celebration",
      preparationDays: 10,
      conversionRate: "22%"
    },
    {
      name: "Black Friday",
      date: new Date(2024, 10, 29),
      status: "active",
      campaigns: 8,
      expectedRevenue: "₹45L",
      engagement: "+156%",
      color: "border-purple-300",
      category: "Shopping",
      description: "Black Friday Sale - Major shopping event",
      preparationDays: 3,
      conversionRate: "42%"
    },
    {
      name: "Valentine's Day",
      date: new Date(2025, 1, 14),
      status: "planned",
      campaigns: 4,
      expectedRevenue: "₹15L",
      engagement: "+78%",
      color: "border-pink-300",
      category: "Romance",
      description: "Valentine's Day - Romance and gifts",
      preparationDays: 10,
      conversionRate: "31%"
    },
    {
      name: "Holi",
      date: new Date(2025, 2, 13),
      status: "planned",
      campaigns: 3,
      expectedRevenue: "₹9L",
      engagement: "+56%",
      color: "border-yellow-300",
      category: "Festival",
      description: "Festival of Colors - Indian spring festival",
      preparationDays: 7,
      conversionRate: "25%"
    }
  ];
  
  displayedHolidays: Holiday[] = [];

  ngOnInit(): void {
    this.holidays.sort((a, b) => a.date.getTime() - b.date.getTime());
    this.filterHolidays();
  }

  filterHolidays(): void {
    this.displayedHolidays = this.selectedCategory === 'all' 
      ? this.holidays 
      : this.holidays.filter(h => h.category === this.selectedCategory);
  }

  generateAIInsights(): void {
    console.log('Generating AI insights for festivals...');
  }

  getUpcomingFestivals(): number {
    const now = new Date();
    const future = new Date();
    future.setDate(now.getDate() + 90);
    return this.holidays.filter(h => h.date >= now && h.date <= future).length;
  }

  getTotalRevenuePotential(): string {
    return "₹114L";
  }

  getTotalCampaigns(): number {
    return this.holidays.reduce((total, h) => total + h.campaigns, 0);
  }

  getAverageEngagement(): string {
    return "+69%";
  }

  getTimelinePosition(date: Date): number {
    // Calculate position based on date for timeline
    const now = new Date();
    const daysDiff = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(50, Math.min(800, 200 + (daysDiff * 3)));
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  }

  getDaysUntil(date: Date): number {
    const now = new Date();
    return Math.max(0, Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  }

  getCategoryClass(category: string): string {
    const classes: {[key: string]: string} = {
      'Festival': 'category-festival',
      'Religious': 'category-religious',
      'Shopping': 'category-shopping',
      'Romance': 'category-romance'
    };
    return classes[category] || 'category-festival';
  }

  needsPreparation(holiday: Holiday): boolean {
    const daysUntil = this.getDaysUntil(holiday.date);
    return daysUntil > 0 && daysUntil <= holiday.preparationDays + 3;
  }

  getPreparationDays(holiday: Holiday): number {
    const daysUntil = this.getDaysUntil(holiday.date);
    return Math.max(0, daysUntil - holiday.preparationDays);
  }

  viewCampaigns(holiday: Holiday): void {
    console.log('Viewing campaigns for:', holiday.name);
  }

  planCampaign(holiday: Holiday): void {
    console.log('Planning campaign for:', holiday.name);
  }

  getTrendData() {
    return [
      { value: 30, position: 10 },
      { value: 45, position: 25 },
      { value: 80, position: 40 },
      { value: 65, position: 55 },
      { value: 90, position: 70 },
      { value: 75, position: 85 }
    ];
  }

  getOptimalTimes() {
    return [
      { time: '10 AM', rate: '34%', intensity: 'high' },
      { time: '2 PM', rate: '28%', intensity: 'medium' },
      { time: '6 PM', rate: '31%', intensity: 'high' },
      { time: '8 PM', rate: '18%', intensity: 'low' }
    ];
  }
}