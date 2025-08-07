import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cost-optimization',
  template: `
    <div class="card">
      <div class="card-header">
        <div class="header-content">
          <div class="title-section">
            <div class="icon">💡</div>
            <div>
              <h3 class="card-title">Cost Optimization Insights</h3>
              <p class="card-subtitle">AI-powered recommendations to reduce costs and improve ROI</p>
            </div>
          </div>
          <div class="controls">
            <select [(ngModel)]="optimizationMode" class="filter-select">
              <option value="cost">Cost Reduction</option>
              <option value="efficiency">Efficiency Boost</option>
              <option value="roi">ROI Optimization</option>
            </select>
            <button class="analyze-btn" (click)="runAnalysis()">🔍 Analyze</button>
          </div>
        </div>
      </div>
      
      <div class="card-content">
        <!-- Cost Savings Overview -->
        <div class="savings-overview">
          <div class="savings-card primary">
            <div class="savings-header">
              <div class="savings-icon">💰</div>
              <h4>Potential Monthly Savings</h4>
            </div>
            <div class="savings-amount">₹{{getPotentialSavings() | number}}</div>
            <div class="savings-detail">{{getSavingsPercentage()}}% of current spend</div>
          </div>
          
          <div class="savings-card secondary">
            <div class="savings-header">
              <div class="savings-icon">📈</div>
              <h4>ROI Improvement</h4>
            </div>
            <div class="savings-amount">+{{getROIImprovement()}}%</div>
            <div class="savings-detail">Expected performance lift</div>
          </div>
          
          <div class="savings-card tertiary">
            <div class="savings-header">
              <div class="savings-icon">⚡</div>
              <h4>Efficiency Gains</h4>
            </div>
            <div class="savings-amount">{{getEfficiencyGains()}}%</div>
            <div class="savings-detail">Overall efficiency improvement</div>
          </div>
        </div>

        <!-- Optimization Recommendations -->
        <div class="recommendations">
          <h4>🎯 AI-Powered Recommendations</h4>
          <div class="recommendations-grid">
            <div *ngFor="let recommendation of getRecommendations()" 
                 class="recommendation-card" 
                 [ngClass]="recommendation.priority">
              <div class="recommendation-header">
                <div class="priority-badge" [ngClass]="recommendation.priority">
                  {{recommendation.priority.toUpperCase()}}
                </div>
                <div class="impact-score">
                  Impact: {{recommendation.impact}}/10
                </div>
              </div>
              
              <div class="recommendation-content">
                <h5>{{recommendation.title}}</h5>
                <p>{{recommendation.description}}</p>
                
                <div class="recommendation-metrics">
                  <div class="metric">
                    <span class="metric-label">Savings</span>
                    <span class="metric-value savings">{{recommendation.savings}}</span>
                  </div>
                  <div class="metric">
                    <span class="metric-label">Effort</span>
                    <span class="metric-value effort">{{recommendation.effort}}</span>
                  </div>
                  <div class="metric">
                    <span class="metric-label">Timeline</span>
                    <span class="metric-value timeline">{{recommendation.timeline}}</span>
                  </div>
                </div>
                
                <div class="recommendation-details">
                  <div class="current-state">
                    <h6>Current State</h6>
                    <ul>
                      <li *ngFor="let point of recommendation.currentState">{{point}}</li>
                    </ul>
                  </div>
                  
                  <div class="proposed-changes">
                    <h6>Proposed Changes</h6>
                    <ul>
                      <li *ngFor="let change of recommendation.proposedChanges">{{change}}</li>
                    </ul>
                  </div>
                </div>
                
                <div class="recommendation-actions">
                  <button class="action-btn primary" (click)="implementRecommendation(recommendation)">
                    Implement Now
                  </button>
                  <button class="action-btn secondary" (click)="scheduleRecommendation(recommendation)">
                    Schedule Later
                  </button>
                  <button class="action-btn tertiary" (click)="getMoreDetails(recommendation)">
                    More Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Cost Breakdown Analysis -->
        <div class="cost-breakdown">
          <h4>Cost Breakdown Analysis</h4>
          <div class="breakdown-container">
            <div class="breakdown-chart">
              <div class="chart-header">
                <h5>Current vs Optimized Costs</h5>
                <div class="chart-legend">
                  <div class="legend-item">
                    <div class="legend-color current"></div>
                    <span>Current</span>
                  </div>
                  <div class="legend-item">
                    <div class="legend-color optimized"></div>
                    <span>Optimized</span>
                  </div>
                </div>
              </div>
              
              <div class="cost-bars">
                <div *ngFor="let item of getCostBreakdown()" class="cost-bar-item">
                  <div class="cost-category">{{item.category}}</div>
                  <div class="bars-container">
                    <div class="cost-bar current">
                      <div class="bar-fill" [style.width.%]="item.currentPercentage">
                        <span class="bar-label">₹{{item.current | number}}</span>
                      </div>
                    </div>
                    <div class="cost-bar optimized">
                      <div class="bar-fill" [style.width.%]="item.optimizedPercentage">
                        <span class="bar-label">₹{{item.optimized | number}}</span>
                      </div>
                    </div>
                  </div>
                  <div class="savings-indicator" [ngClass]="item.savings > 0 ? 'positive' : 'neutral'">
                    {{item.savings > 0 ? '-' : ''}}₹{{Math.abs(item.savings) | number}}
                  </div>
                </div>
              </div>
            </div>
            
            <div class="optimization-timeline">
              <h5>Implementation Timeline</h5>
              <div class="timeline-items">
                <div *ngFor="let phase of getOptimizationPhases()" 
                     class="timeline-item" 
                     [ngClass]="phase.status">
                  <div class="timeline-marker">
                    <div class="marker-dot" [ngClass]="phase.status"></div>
                  </div>
                  <div class="timeline-content">
                    <h6>{{phase.title}}</h6>
                    <p>{{phase.description}}</p>
                    <div class="phase-metrics">
                      <span class="phase-duration">{{phase.duration}}</span>
                      <span class="phase-savings">Save ₹{{phase.savings | number}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Performance Impact Simulation -->
        <div class="impact-simulation">
          <h4>Performance Impact Simulation</h4>
          <div class="simulation-controls">
            <div class="control-group">
              <label>Optimization Level</label>
              <input type="range" 
                     [(ngModel)]="optimizationLevel" 
                     (input)="updateSimulation()"
                     min="0" 
                     max="100" 
                     class="optimization-slider">
              <div class="level-labels">
                <span>Conservative</span>
                <span>Moderate</span>
                <span>Aggressive</span>
              </div>
            </div>
          </div>
          
          <div class="simulation-results">
            <div class="result-cards">
              <div class="result-card">
                <h6>Cost Reduction</h6>
                <div class="result-value">₹{{getSimulatedSavings() | number}}</div>
                <div class="result-change positive">-{{getSimulatedSavingsPercent()}}%</div>
              </div>
              
              <div class="result-card">
                <h6>Performance Impact</h6>
                <div class="result-value">{{getSimulatedPerformanceImpact()}}%</div>
                <div class="result-change" [ngClass]="getPerformanceImpactClass()">
                  {{getPerformanceImpactSign()}}{{getSimulatedPerformanceImpact()}}%
                </div>
              </div>
              
              <div class="result-card">
                <h6>Implementation Risk</h6>
                <div class="result-value risk" [ngClass]="getRiskLevel()">{{getRiskLevel()}}</div>
                <div class="risk-factors">{{getRiskFactors()}}</div>
              </div>
              
              <div class="result-card">
                <h6>Payback Period</h6>
                <div class="result-value">{{getPaybackPeriod()}}</div>
                <div class="result-change">{{getPaybackDescription()}}</div>
              </div>
            </div>
            
            <div class="simulation-chart">
              <h6>12-Month Projection</h6>
              <div class="projection-line">
                <div *ngFor="let month of getProjectionData(); let i = index" 
                     class="projection-point"
                     [style.left.%]="(i * 100 / 11)"
                     [style.bottom.%]="month.value">
                  <div class="point-marker" [ngClass]="month.type"></div>
                  <div class="point-tooltip">
                    <span>{{month.month}}</span>
                    <span>₹{{month.savings | number}}</span>
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
    
    .analyze-btn {
      padding: 6px 12px;
      border: none;
      border-radius: 6px;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      cursor: pointer;
      transition: all 0.2s;
      font-weight: 500;
    }
    
    .analyze-btn:hover {
      transform: translateY(-1px);
    }
    
    .card-content {
      padding: 20px;
    }
    
    .savings-overview {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
    }
    
    .savings-card {
      padding: 20px;
      border-radius: 8px;
      color: white;
      text-align: center;
    }
    
    .savings-card.primary {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    }
    
    .savings-card.secondary {
      background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
    }
    
    .savings-card.tertiary {
      background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
    }
    
    .savings-header {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;
    }
    
    .savings-icon {
      font-size: 1.25rem;
      margin-right: 8px;
    }
    
    .savings-header h4 {
      font-size: 0.875rem;
      font-weight: 600;
      margin: 0;
      opacity: 0.9;
    }
    
    .savings-amount {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 4px;
    }
    
    .savings-detail {
      font-size: 0.875rem;
      opacity: 0.8;
    }
    
    .recommendations {
      margin-bottom: 32px;
    }
    
    .recommendations h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 16px;
    }
    
    .recommendations-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 20px;
    }
    
    .recommendation-card {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      background: white;
      overflow: hidden;
    }
    
    .recommendation-card.high {
      border-left: 4px solid #ef4444;
    }
    
    .recommendation-card.medium {
      border-left: 4px solid #f59e0b;
    }
    
    .recommendation-card.low {
      border-left: 4px solid #10b981;
    }
    
    .recommendation-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 16px 0;
    }
    
    .priority-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    
    .priority-badge.high {
      background: #fee2e2;
      color: #dc2626;
    }
    
    .priority-badge.medium {
      background: #fef3c7;
      color: #d97706;
    }
    
    .priority-badge.low {
      background: #dcfce7;
      color: #16a34a;
    }
    
    .impact-score {
      font-size: 0.75rem;
      color: #6b7280;
      font-weight: 500;
    }
    
    .recommendation-content {
      padding: 16px;
    }
    
    .recommendation-content h5 {
      font-size: 0.875rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0 0 8px 0;
    }
    
    .recommendation-content p {
      font-size: 0.875rem;
      color: #4a5568;
      margin: 0 0 12px 0;
      line-height: 1.4;
    }
    
    .recommendation-metrics {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
      margin-bottom: 16px;
    }
    
    .metric {
      text-align: center;
      padding: 8px;
      background: #f8fafc;
      border-radius: 6px;
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
    }
    
    .metric-value.savings {
      color: #059669;
    }
    
    .metric-value.effort {
      color: #d97706;
    }
    
    .metric-value.timeline {
      color: #3b82f6;
    }
    
    .recommendation-details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 16px;
    }
    
    .current-state h6,
    .proposed-changes h6 {
      font-size: 0.75rem;
      font-weight: 600;
      color: #374151;
      margin: 0 0 6px 0;
    }
    
    .current-state ul,
    .proposed-changes ul {
      font-size: 0.75rem;
      color: #6b7280;
      margin: 0;
      padding-left: 16px;
    }
    
    .current-state li,
    .proposed-changes li {
      margin-bottom: 2px;
    }
    
    .recommendation-actions {
      display: flex;
      gap: 8px;
    }
    
    .action-btn {
      padding: 6px 12px;
      border-radius: 6px;
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
    
    .action-btn.tertiary {
      background: #f3f4f6;
      color: #6b7280;
      border: none;
    }
    
    .action-btn:hover {
      transform: translateY(-1px);
    }
    
    .cost-breakdown {
      margin-bottom: 32px;
    }
    
    .cost-breakdown h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 16px;
    }
    
    .breakdown-container {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 24px;
    }
    
    .breakdown-chart {
      background: #f8fafc;
      border-radius: 8px;
      padding: 16px;
    }
    
    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .chart-header h5 {
      font-size: 0.875rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0;
    }
    
    .chart-legend {
      display: flex;
      gap: 12px;
    }
    
    .legend-item {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    
    .legend-color {
      width: 12px;
      height: 12px;
      border-radius: 2px;
    }
    
    .legend-color.current {
      background: #ef4444;
    }
    
    .legend-color.optimized {
      background: #10b981;
    }
    
    .legend-item span {
      font-size: 0.75rem;
      color: #6b7280;
    }
    
    .cost-bars {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .cost-bar-item {
      display: grid;
      grid-template-columns: 100px 1fr 80px;
      gap: 12px;
      align-items: center;
    }
    
    .cost-category {
      font-size: 0.75rem;
      font-weight: 500;
      color: #374151;
    }
    
    .bars-container {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .cost-bar {
      height: 20px;
      background: #e5e7eb;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
    }
    
    .cost-bar.current .bar-fill {
      background: #ef4444;
    }
    
    .cost-bar.optimized .bar-fill {
      background: #10b981;
    }
    
    .bar-fill {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 0.75rem;
      font-weight: 600;
      min-width: 40px;
    }
    
    .savings-indicator {
      font-size: 0.75rem;
      font-weight: 600;
      text-align: center;
    }
    
    .savings-indicator.positive {
      color: #059669;
    }
    
    .savings-indicator.neutral {
      color: #6b7280;
    }
    
    .optimization-timeline {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px;
    }
    
    .optimization-timeline h5 {
      font-size: 0.875rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0 0 16px 0;
    }
    
    .timeline-items {
      position: relative;
    }
    
    .timeline-items::before {
      content: '';
      position: absolute;
      left: 8px;
      top: 0;
      bottom: 0;
      width: 2px;
      background: #e2e8f0;
    }
    
    .timeline-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 16px;
    }
    
    .timeline-marker {
      position: relative;
      margin-right: 12px;
    }
    
    .marker-dot {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid white;
      background: #d1d5db;
    }
    
    .marker-dot.active {
      background: #3b82f6;
    }
    
    .marker-dot.completed {
      background: #10b981;
    }
    
    .marker-dot.pending {
      background: #f59e0b;
    }
    
    .timeline-content h6 {
      font-size: 0.75rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0 0 4px 0;
    }
    
    .timeline-content p {
      font-size: 0.75rem;
      color: #6b7280;
      margin: 0 0 6px 0;
    }
    
    .phase-metrics {
      display: flex;
      gap: 12px;
    }
    
    .phase-duration,
    .phase-savings {
      font-size: 0.625rem;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 500;
    }
    
    .phase-duration {
      background: #fef3c7;
      color: #92400e;
    }
    
    .phase-savings {
      background: #dcfce7;
      color: #166534;
    }
    
    .impact-simulation h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 16px;
    }
    
    .simulation-controls {
      margin-bottom: 24px;
      padding: 16px;
      background: #f8fafc;
      border-radius: 8px;
    }
    
    .control-group label {
      display: block;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      margin-bottom: 8px;
    }
    
    .optimization-slider {
      width: 100%;
      height: 6px;
      border-radius: 3px;
      background: #e2e8f0;
      outline: none;
      margin-bottom: 8px;
    }
    
    .level-labels {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      color: #6b7280;
    }
    
    .result-cards {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 24px;
    }
    
    .result-card {
      padding: 16px;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      text-align: center;
    }
    
    .result-card h6 {
      font-size: 0.75rem;
      font-weight: 500;
      color: #6b7280;
      margin: 0 0 8px 0;
    }
    
    .result-value {
      font-size: 1.25rem;
      font-weight: 700;
      color: #2d3748;
      margin-bottom: 4px;
    }
    
    .result-value.risk {
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
    }
    
    .result-value.risk.low {
      color: #059669;
    }
    
    .result-value.risk.medium {
      color: #d97706;
    }
    
    .result-value.risk.high {
      color: #dc2626;
    }
    
    .result-change {
      font-size: 0.75rem;
      font-weight: 500;
    }
    
    .result-change.positive {
      color: #059669;
    }
    
    .result-change.negative {
      color: #dc2626;
    }
    
    .risk-factors {
      font-size: 0.625rem;
      color: #6b7280;
    }
    
    .simulation-chart {
      background: #f8fafc;
      border-radius: 8px;
      padding: 16px;
      height: 200px;
      position: relative;
    }
    
    .simulation-chart h6 {
      font-size: 0.875rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0 0 16px 0;
    }
    
    .projection-line {
      position: relative;
      height: 140px;
    }
    
    .projection-point {
      position: absolute;
      cursor: pointer;
    }
    
    .point-marker {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #3b82f6;
    }
    
    .point-tooltip {
      position: absolute;
      bottom: 12px;
      left: 50%;
      transform: translateX(-50%);
      background: #374151;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.625rem;
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.2s;
    }
    
    .projection-point:hover .point-tooltip {
      opacity: 1;
    }
  `]
})
export class CostOptimizationComponent implements OnInit {
  optimizationMode: string = 'cost';
  optimizationLevel: number = 50;

  ngOnInit(): void {}

  runAnalysis(): void {
    console.log('Running cost optimization analysis...');
  }

  updateSimulation(): void {
    console.log('Updating simulation with level:', this.optimizationLevel);
  }

  getPotentialSavings(): number {
    return 234000;
  }

  getSavingsPercentage(): number {
    return 18;
  }

  getROIImprovement(): number {
    return 24;
  }

  getEfficiencyGains(): number {
    return 31;
  }

  getRecommendations() {
    return [
      {
        priority: 'high',
        impact: 9,
        title: 'Switch Primary BSP for SMS',
        description: 'Replace MessageBird with AWS SNS for SMS campaigns to reduce cost per message by 23% while maintaining delivery quality.',
        savings: '₹45K/month',
        effort: 'Low',
        timeline: '1 week',
        currentState: [
          'Using MessageBird for 60% of SMS volume',
          'Cost per message: ₹0.92',
          'Monthly SMS spend: ₹187K'
        ],
        proposedChanges: [
          'Switch to AWS SNS for primary SMS',
          'New cost per message: ₹0.75',
          'Implement gradual migration over 3 days'
        ]
      },
      {
        priority: 'medium',
        impact: 7,
        title: 'Optimize Send Time Distribution',
        description: 'Shift 30% of campaigns to off-peak hours (2-6 AM) to take advantage of lower BSP pricing during low-traffic periods.',
        savings: '₹28K/month',
        effort: 'Medium',
        timeline: '2 weeks',
        currentState: [
          'Most campaigns sent during peak hours',
          'Higher BSP rates during 9 AM - 6 PM',
          'No time-based cost optimization'
        ],
        proposedChanges: [
          'Schedule 30% campaigns during off-peak',
          'Implement smart scheduling algorithm',
          'Monitor engagement impact closely'
        ]
      },
      {
        priority: 'low',
        impact: 5,
        title: 'Implement Smart Retry Logic',
        description: 'Reduce failed message retry costs by implementing intelligent retry patterns and failure analysis.',
        savings: '₹12K/month',
        effort: 'High',
        timeline: '1 month',
        currentState: [
          'Fixed retry attempts for all failures',
          'No failure pattern analysis',
          'High retry costs on permanent failures'
        ],
        proposedChanges: [
          'Implement smart retry algorithm',
          'Add failure type classification',
          'Reduce retries for permanent failures'
        ]
      }
    ];
  }

  getCostBreakdown() {
    return [
      {
        category: 'SMS',
        current: 187000,
        optimized: 142000,
        currentPercentage: 95,
        optimizedPercentage: 72,
        savings: 45000
      },
      {
        category: 'WhatsApp',
        current: 156000,
        optimized: 145000,
        currentPercentage: 79,
        optimizedPercentage: 74,
        savings: 11000
      },
      {
        category: 'Email',
        current: 34000,
        optimized: 31000,
        currentPercentage: 17,
        optimizedPercentage: 16,
        savings: 3000
      },
      {
        category: 'Push',
        current: 12000,
        optimized: 15000,
        currentPercentage: 6,
        optimizedPercentage: 8,
        savings: -3000
      }
    ];
  }

  getOptimizationPhases() {
    return [
      {
        title: 'Phase 1: BSP Migration',
        description: 'Switch primary SMS provider to reduce per-message costs',
        duration: '1 week',
        savings: 45000,
        status: 'active'
      },
      {
        title: 'Phase 2: Smart Scheduling',
        description: 'Implement off-peak campaign scheduling',
        duration: '2 weeks',
        savings: 28000,
        status: 'pending'
      },
      {
        title: 'Phase 3: Retry Optimization',
        description: 'Deploy intelligent retry logic system',
        duration: '1 month',
        savings: 12000,
        status: 'pending'
      }
    ];
  }

  getSimulatedSavings(): number {
    return Math.round(85000 * (this.optimizationLevel / 100));
  }

  getSimulatedSavingsPercent(): number {
    return Math.round(22 * (this.optimizationLevel / 100));
  }

  getSimulatedPerformanceImpact(): number {
    // Performance might decrease slightly with aggressive optimizations
    if (this.optimizationLevel > 70) {
      return Math.round(-5 * ((this.optimizationLevel - 70) / 30));
    }
    return 0;
  }

  getPerformanceImpactClass(): string {
    const impact = this.getSimulatedPerformanceImpact();
    return impact < 0 ? 'negative' : impact > 0 ? 'positive' : 'neutral';
  }

  getPerformanceImpactSign(): string {
    return this.getSimulatedPerformanceImpact() >= 0 ? '+' : '';
  }

  getRiskLevel(): string {
    if (this.optimizationLevel < 30) return 'low';
    if (this.optimizationLevel < 70) return 'medium';
    return 'high';
  }

  getRiskFactors(): string {
    if (this.optimizationLevel < 30) return '2 factors';
    if (this.optimizationLevel < 70) return '4 factors';
    return '7 factors';
  }

  getPaybackPeriod(): string {
    const months = Math.max(1, Math.round(4 - (this.optimizationLevel / 25)));
    return `${months} month${months > 1 ? 's' : ''}`;
  }

  getPaybackDescription(): string {
    const period = this.getPaybackPeriod();
    return `ROI positive in ${period}`;
  }

  getProjectionData() {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((month, i) => ({
      month,
      savings: Math.round(15000 + (i * 5000) * (this.optimizationLevel / 100)),
      value: 20 + (i * 6) + Math.random() * 10,
      type: i < 3 ? 'projection' : 'forecast'
    }));
  }

  implementRecommendation(recommendation: any): void {
    console.log('Implementing recommendation:', recommendation.title);
  }

  scheduleRecommendation(recommendation: any): void {
    console.log('Scheduling recommendation:', recommendation.title);
  }

  getMoreDetails(recommendation: any): void {
    console.log('Getting more details for:', recommendation.title);
  }
}