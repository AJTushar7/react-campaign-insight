import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-budget-calculator',
  template: `
    <div class="card">
      <div class="card-header">
        <div class="header-content">
          <div class="title-section">
            <div class="icon">💰</div>
            <div>
              <h3 class="card-title">Budget vs Performance Calculator</h3>
              <p class="card-subtitle">ROI optimization and budget allocation insights</p>
            </div>
          </div>
          <div class="controls">
            <select [(ngModel)]="calculationMode" class="filter-select">
              <option value="roi">ROI Calculator</option>
              <option value="allocation">Budget Allocation</option>
              <option value="forecast">Performance Forecast</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="card-content">
        <!-- Budget Input Section -->
        <div class="budget-inputs">
          <div class="input-section">
            <h4>Campaign Parameters</h4>
            <div class="inputs-grid">
              <div class="input-group">
                <label>Total Budget</label>
                <input type="number" [(ngModel)]="totalBudget" (input)="calculateMetrics()" placeholder="100000" class="budget-input">
                <span class="currency">₹</span>
              </div>
              <div class="input-group">
                <label>Campaign Duration</label>
                <select [(ngModel)]="duration" (change)="calculateMetrics()" class="budget-select">
                  <option value="7">7 Days</option>
                  <option value="14">14 Days</option>
                  <option value="30">30 Days</option>
                  <option value="60">60 Days</option>
                </select>
              </div>
              <div class="input-group">
                <label>Target Audience</label>
                <input type="number" [(ngModel)]="targetAudience" (input)="calculateMetrics()" placeholder="50000" class="budget-input">
                <span class="currency">users</span>
              </div>
              <div class="input-group">
                <label>Expected CTR</label>
                <input type="number" [(ngModel)]="expectedCTR" (input)="calculateMetrics()" placeholder="15" class="budget-input" step="0.1">
                <span class="currency">%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Channel Allocation -->
        <div class="channel-allocation">
          <h4>Channel Budget Allocation</h4>
          <div class="allocation-grid">
            <div *ngFor="let channel of channels" class="channel-allocation-item">
              <div class="channel-header">
                <div class="channel-icon" [ngClass]="channel.colorClass">
                  {{channel.icon}}
                </div>
                <div class="channel-info">
                  <h5>{{channel.name}}</h5>
                  <span class="channel-efficiency">{{channel.efficiency}}% efficiency</span>
                </div>
              </div>
              
              <div class="allocation-control">
                <input type="range" 
                       [(ngModel)]="channel.allocation" 
                       (input)="updateAllocation($event, channel)"
                       min="0" 
                       max="100" 
                       class="allocation-slider">
                <div class="allocation-display">
                  <span class="allocation-percentage">{{channel.allocation}}%</span>
                  <span class="allocation-amount">₹{{(totalBudget * channel.allocation / 100) | number:'1.0-0'}}</span>
                </div>
              </div>
              
              <div class="channel-metrics">
                <div class="metric">
                  <span class="metric-label">Est. Reach</span>
                  <span class="metric-value">{{getEstimatedReach(channel) | number}}</span>
                </div>
                <div class="metric">
                  <span class="metric-label">Est. Conversions</span>
                  <span class="metric-value">{{getEstimatedConversions(channel) | number}}</span>
                </div>
                <div class="metric">
                  <span class="metric-label">ROI</span>
                  <span class="metric-value">{{getChannelROI(channel)}}x</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Performance Projections -->
        <div class="performance-projections">
          <h4>Performance Projections</h4>
          <div class="projections-grid">
            <div class="projection-card total-metrics">
              <h5>Campaign Totals</h5>
              <div class="total-stats">
                <div class="total-stat">
                  <span class="stat-value">{{getTotalReach() | number}}</span>
                  <span class="stat-label">Total Reach</span>
                </div>
                <div class="total-stat">
                  <span class="stat-value">{{getTotalConversions() | number}}</span>
                  <span class="stat-label">Est. Conversions</span>
                </div>
                <div class="total-stat">
                  <span class="stat-value">{{getTotalROI()}}x</span>
                  <span class="stat-label">Overall ROI</span>
                </div>
                <div class="total-stat">
                  <span class="stat-value">₹{{getEstimatedRevenue() | number}}</span>
                  <span class="stat-label">Est. Revenue</span>
                </div>
              </div>
            </div>
            
            <div class="projection-card optimization-suggestions">
              <h5>🎯 Optimization Suggestions</h5>
              <div class="suggestions-list">
                <div *ngFor="let suggestion of getOptimizationSuggestions()" class="suggestion-item">
                  <div class="suggestion-icon" [ngClass]="suggestion.type">{{suggestion.emoji}}</div>
                  <div class="suggestion-content">
                    <h6>{{suggestion.title}}</h6>
                    <p>{{suggestion.description}}</p>
                    <div class="suggestion-impact">{{suggestion.impact}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Budget Scenarios -->
        <div class="budget-scenarios">
          <h4>Budget Scenarios Comparison</h4>
          <div class="scenarios-container">
            <div class="scenario-tabs">
              <button *ngFor="let scenario of scenarios" 
                      class="scenario-tab" 
                      [class.active]="activeScenario === scenario.id"
                      (click)="activeScenario = scenario.id">
                {{scenario.name}}
              </button>
            </div>
            
            <div class="scenario-content">
              <div *ngFor="let scenario of scenarios" 
                   class="scenario-panel" 
                   [class.active]="activeScenario === scenario.id">
                <div class="scenario-stats">
                  <div class="scenario-stat">
                    <span class="stat-label">Budget</span>
                    <span class="stat-value">₹{{scenario.budget | number}}</span>
                  </div>
                  <div class="scenario-stat">
                    <span class="stat-label">Reach</span>
                    <span class="stat-value">{{scenario.reach | number}}</span>
                  </div>
                  <div class="scenario-stat">
                    <span class="stat-label">Conversions</span>
                    <span class="stat-value">{{scenario.conversions | number}}</span>
                  </div>
                  <div class="scenario-stat">
                    <span class="stat-label">ROI</span>
                    <span class="stat-value">{{scenario.roi}}x</span>
                  </div>
                </div>
                
                <div class="scenario-chart">
                  <div class="chart-title">Performance Breakdown</div>
                  <div class="performance-bars">
                    <div *ngFor="let channel of scenario.channels" class="performance-bar">
                      <span class="channel-name">{{channel.name}}</span>
                      <div class="bar-container">
                        <div class="bar-fill" [style.width.%]="channel.performance" [ngClass]="channel.colorClass"></div>
                      </div>
                      <span class="performance-value">{{channel.performance}}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Cost Efficiency Analysis -->
        <div class="cost-efficiency">
          <h4>Cost Efficiency Analysis</h4>
          <div class="efficiency-chart">
            <div class="chart-container">
              <div class="efficiency-bars">
                <div *ngFor="let channel of channels" class="efficiency-bar">
                  <div class="bar-header">
                    <span class="channel-name">{{channel.name}}</span>
                    <span class="cost-per-conversion">₹{{getCostPerConversion(channel)}}</span>
                  </div>
                  <div class="bar-visual">
                    <div class="bar-bg">
                      <div class="bar-fill efficiency" 
                           [style.width.%]="channel.efficiency" 
                           [ngClass]="channel.colorClass"></div>
                    </div>
                    <span class="efficiency-label">{{channel.efficiency}}% efficient</span>
                  </div>
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
    
    .filter-select {
      padding: 6px 12px;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      background: white;
      color: #2d3748;
    }
    
    .card-content {
      padding: 20px;
    }
    
    .budget-inputs {
      margin-bottom: 32px;
    }
    
    .input-section h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 16px;
    }
    
    .inputs-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
    
    .input-group {
      position: relative;
    }
    
    .input-group label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 6px;
    }
    
    .budget-input, .budget-select {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #d1d5db;
      border-radius: 6px;
      font-size: 0.875rem;
      transition: border-color 0.2s;
    }
    
    .budget-input:focus, .budget-select:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    
    .currency {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 0.875rem;
      color: #6b7280;
      margin-top: 12px;
    }
    
    .channel-allocation {
      margin-bottom: 32px;
    }
    
    .channel-allocation h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 16px;
    }
    
    .allocation-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 16px;
    }
    
    .channel-allocation-item {
      padding: 16px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    }
    
    .channel-header {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
    }
    
    .channel-icon {
      width: 32px;
      height: 32px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.875rem;
      color: white;
      margin-right: 12px;
    }
    
    .channel-icon.whatsapp { background: #25d366; }
    .channel-icon.sms { background: #3b82f6; }
    .channel-icon.email { background: #8b5cf6; }
    .channel-icon.push { background: #f59e0b; }
    .channel-icon.rcs { background: #06b6d4; }
    
    .channel-info h5 {
      font-size: 0.875rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0 0 2px 0;
    }
    
    .channel-efficiency {
      font-size: 0.75rem;
      color: #10b981;
      font-weight: 500;
    }
    
    .allocation-control {
      margin-bottom: 12px;
    }
    
    .allocation-slider {
      width: 100%;
      height: 6px;
      border-radius: 3px;
      background: #e2e8f0;
      outline: none;
      margin-bottom: 8px;
    }
    
    .allocation-display {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .allocation-percentage {
      font-size: 0.875rem;
      font-weight: 600;
      color: #2d3748;
    }
    
    .allocation-amount {
      font-size: 0.875rem;
      color: #059669;
      font-weight: 500;
    }
    
    .channel-metrics {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 8px;
    }
    
    .metric {
      text-align: center;
    }
    
    .metric-label {
      display: block;
      font-size: 0.75rem;
      color: #6b7280;
      margin-bottom: 2px;
    }
    
    .metric-value {
      display: block;
      font-size: 0.875rem;
      font-weight: 600;
      color: #374151;
    }
    
    .performance-projections {
      margin-bottom: 32px;
    }
    
    .performance-projections h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 16px;
    }
    
    .projections-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    
    .projection-card {
      padding: 16px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      background: white;
    }
    
    .projection-card h5 {
      font-size: 0.875rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0 0 12px 0;
    }
    
    .total-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    
    .total-stat {
      text-align: center;
      padding: 8px;
      background: #f8fafc;
      border-radius: 6px;
    }
    
    .stat-value {
      display: block;
      font-size: 1.125rem;
      font-weight: 700;
      color: #2d3748;
    }
    
    .stat-label {
      display: block;
      font-size: 0.75rem;
      color: #6b7280;
      margin-top: 2px;
    }
    
    .suggestions-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .suggestion-item {
      display: flex;
      align-items: flex-start;
      padding: 8px;
      background: #f8fafc;
      border-radius: 6px;
    }
    
    .suggestion-icon {
      font-size: 1rem;
      margin-right: 8px;
      margin-top: 2px;
    }
    
    .suggestion-content h6 {
      font-size: 0.75rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0 0 2px 0;
    }
    
    .suggestion-content p {
      font-size: 0.75rem;
      color: #4a5568;
      margin: 0 0 4px 0;
      line-height: 1.3;
    }
    
    .suggestion-impact {
      font-size: 0.625rem;
      color: #059669;
      font-weight: 500;
    }
    
    .budget-scenarios {
      margin-bottom: 32px;
    }
    
    .budget-scenarios h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 16px;
    }
    
    .scenario-tabs {
      display: flex;
      border-bottom: 1px solid #e2e8f0;
      margin-bottom: 16px;
    }
    
    .scenario-tab {
      padding: 8px 16px;
      border: none;
      background: none;
      color: #6b7280;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all 0.2s;
    }
    
    .scenario-tab.active {
      color: #667eea;
      border-bottom-color: #667eea;
    }
    
    .scenario-panel {
      display: none;
    }
    
    .scenario-panel.active {
      display: block;
    }
    
    .scenario-stats {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 20px;
    }
    
    .scenario-stat {
      text-align: center;
      padding: 12px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 8px;
    }
    
    .chart-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 12px;
    }
    
    .performance-bars {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .performance-bar {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .channel-name {
      font-size: 0.75rem;
      font-weight: 500;
      width: 60px;
    }
    
    .bar-container {
      flex: 1;
      height: 8px;
      background: #e5e7eb;
      border-radius: 4px;
      overflow: hidden;
    }
    
    .bar-fill {
      height: 100%;
      border-radius: 4px;
    }
    
    .bar-fill.whatsapp { background: #25d366; }
    .bar-fill.sms { background: #3b82f6; }
    .bar-fill.email { background: #8b5cf6; }
    .bar-fill.push { background: #f59e0b; }
    .bar-fill.rcs { background: #06b6d4; }
    
    .performance-value {
      font-size: 0.75rem;
      font-weight: 600;
      width: 40px;
      text-align: right;
    }
    
    .cost-efficiency h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 16px;
    }
    
    .efficiency-bars {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .efficiency-bar {
      padding: 12px;
      background: #f8fafc;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }
    
    .bar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    
    .cost-per-conversion {
      font-size: 0.875rem;
      font-weight: 600;
      color: #059669;
    }
    
    .bar-visual {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .bar-bg {
      flex: 1;
      height: 10px;
      background: #e2e8f0;
      border-radius: 5px;
      overflow: hidden;
    }
    
    .bar-fill.efficiency {
      height: 100%;
      border-radius: 5px;
    }
    
    .efficiency-label {
      font-size: 0.75rem;
      color: #6b7280;
      white-space: nowrap;
    }
  `]
})
export class BudgetCalculatorComponent implements OnInit {
  calculationMode: string = 'roi';
  totalBudget: number = 100000;
  duration: number = 30;
  targetAudience: number = 50000;
  expectedCTR: number = 15;
  activeScenario: string = 'conservative';
  
  channels = [
    { 
      name: 'WhatsApp', 
      icon: '💬', 
      allocation: 40, 
      efficiency: 95, 
      ctr: 28.7, 
      costPerMessage: 0.85,
      colorClass: 'whatsapp' 
    },
    { 
      name: 'SMS', 
      icon: '📱', 
      allocation: 30, 
      efficiency: 88, 
      ctr: 18.0, 
      costPerMessage: 0.75,
      colorClass: 'sms' 
    },
    { 
      name: 'Email', 
      icon: '📧', 
      allocation: 20, 
      efficiency: 72, 
      ctr: 8.0, 
      costPerMessage: 0.15,
      colorClass: 'email' 
    },
    { 
      name: 'Push', 
      icon: '🔔', 
      allocation: 8, 
      efficiency: 68, 
      ctr: 3.0, 
      costPerMessage: 0.05,
      colorClass: 'push' 
    },
    { 
      name: 'RCS', 
      icon: '💬', 
      allocation: 2, 
      efficiency: 75, 
      ctr: 15.5, 
      costPerMessage: 1.2,
      colorClass: 'rcs' 
    }
  ];

  scenarios = [
    {
      id: 'conservative',
      name: 'Conservative',
      budget: 80000,
      reach: 40000,
      conversions: 3200,
      roi: 4.2,
      channels: [
        { name: 'WhatsApp', performance: 85, colorClass: 'whatsapp' },
        { name: 'SMS', performance: 70, colorClass: 'sms' },
        { name: 'Email', performance: 45, colorClass: 'email' },
        { name: 'Push', performance: 35, colorClass: 'push' }
      ]
    },
    {
      id: 'balanced',
      name: 'Balanced',
      budget: 100000,
      reach: 50000,
      conversions: 4500,
      roi: 5.8,
      channels: [
        { name: 'WhatsApp', performance: 95, colorClass: 'whatsapp' },
        { name: 'SMS', performance: 88, colorClass: 'sms' },
        { name: 'Email', performance: 72, colorClass: 'email' },
        { name: 'Push', performance: 68, colorClass: 'push' }
      ]
    },
    {
      id: 'aggressive',
      name: 'Aggressive',
      budget: 150000,
      reach: 75000,
      conversions: 8200,
      roi: 7.4,
      channels: [
        { name: 'WhatsApp', performance: 98, colorClass: 'whatsapp' },
        { name: 'SMS', performance: 92, colorClass: 'sms' },
        { name: 'Email', performance: 68, colorClass: 'email' },
        { name: 'Push', performance: 58, colorClass: 'push' }
      ]
    }
  ];

  ngOnInit(): void {
    this.calculateMetrics();
  }

  calculateMetrics(): void {
    // Recalculate all metrics when inputs change
    console.log('Recalculating budget metrics...');
  }

  updateAllocation(event: any, channel: any): void {
    channel.allocation = event.target.value;
    this.normalizeAllocations();
    this.calculateMetrics();
  }

  normalizeAllocations(): void {
    const total = this.channels.reduce((sum, c) => sum + c.allocation, 0);
    if (total > 100) {
      // Normalize to 100%
      this.channels.forEach(c => {
        c.allocation = Math.round((c.allocation / total) * 100);
      });
    }
  }

  getEstimatedReach(channel: any): number {
    const budget = this.totalBudget * (channel.allocation / 100);
    return Math.round(budget / channel.costPerMessage);
  }

  getEstimatedConversions(channel: any): number {
    const reach = this.getEstimatedReach(channel);
    return Math.round(reach * (channel.ctr / 100));
  }

  getChannelROI(channel: any): string {
    const conversions = this.getEstimatedConversions(channel);
    const budget = this.totalBudget * (channel.allocation / 100);
    const revenue = conversions * 150; // Assume ₹150 per conversion
    return ((revenue / budget) || 0).toFixed(1);
  }

  getTotalReach(): number {
    return this.channels.reduce((total, c) => total + this.getEstimatedReach(c), 0);
  }

  getTotalConversions(): number {
    return this.channels.reduce((total, c) => total + this.getEstimatedConversions(c), 0);
  }

  getTotalROI(): string {
    const totalConversions = this.getTotalConversions();
    const revenue = totalConversions * 150;
    return ((revenue / this.totalBudget) || 0).toFixed(1);
  }

  getEstimatedRevenue(): number {
    return this.getTotalConversions() * 150;
  }

  getCostPerConversion(channel: any): number {
    const conversions = this.getEstimatedConversions(channel);
    const budget = this.totalBudget * (channel.allocation / 100);
    return conversions > 0 ? Math.round(budget / conversions) : 0;
  }

  getOptimizationSuggestions() {
    return [
      {
        emoji: '🎯',
        type: 'increase',
        title: 'Increase WhatsApp Budget',
        description: 'WhatsApp shows highest efficiency. Recommend +10% allocation.',
        impact: '+18% conversions expected'
      },
      {
        emoji: '⚡',
        type: 'optimize',
        title: 'Optimize Send Times',
        description: 'Schedule campaigns during 10-11 AM for better performance.',
        impact: '+12% open rate improvement'
      },
      {
        emoji: '💰',
        type: 'reduce',
        title: 'Reduce Email Spend',
        description: 'Email showing lower ROI. Consider reallocating 5% budget.',
        impact: 'Save ₹5K, maintain conversions'
      }
    ];
  }
}