import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orchestration-analysis',
  template: `
    <div class="card">
      <div class="card-header">
        <div class="header-content">
          <div class="title-section">
            <div class="icon">🎼</div>
            <div>
              <h3 class="card-title">Orchestration Analysis</h3>
              <p class="card-subtitle">Multi-channel campaign coordination and sequence optimization</p>
            </div>
          </div>
          <div class="controls">
            <select [(ngModel)]="analysisMode" class="filter-select">
              <option value="sequence">Sequence Analysis</option>
              <option value="timing">Timing Optimization</option>
              <option value="channel">Channel Coordination</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="card-content">
        <!-- Orchestration Overview -->
        <div class="orchestration-overview">
          <div class="overview-stats">
            <div class="stat-card">
              <div class="stat-icon">🎯</div>
              <div class="stat-info">
                <h4>{{getActiveOrchestrations()}}</h4>
                <p>Active Orchestrations</p>
                <span class="stat-trend">+2 this week</span>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">⚡</div>
              <div class="stat-info">
                <h4>{{getAverageSequenceLength()}}</h4>
                <p>Avg Sequence Length</p>
                <span class="stat-trend">3.2 touchpoints</span>
              </div>
            </div>
            
            <div class="stat-card">
              <div class="stat-icon">📈</div>
              <div class="stat-info">
                <h4>{{getOrchestrationROI()}}%</h4>
                <p>Orchestration ROI Lift</p>
                <span class="stat-trend">vs single channel</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Campaign Journey Visualization -->
        <div class="journey-visualization">
          <h4>Campaign Customer Journey</h4>
          <div class="journey-container">
            <div class="journey-path">
              <div *ngFor="let step of getJourneySteps(); let i = index" 
                   class="journey-step" 
                   [ngClass]="step.status">
                
                <div class="step-connector" *ngIf="i < getJourneySteps().length - 1"></div>
                
                <div class="step-node">
                  <div class="node-icon" [ngClass]="step.channelClass">
                    {{step.icon}}
                  </div>
                  <div class="step-timing">Day {{step.day}}</div>
                </div>
                
                <div class="step-details">
                  <div class="step-header">
                    <h5>{{step.title}}</h5>
                    <span class="step-channel">{{step.channel}}</span>
                  </div>
                  
                  <div class="step-metrics">
                    <div class="metric-item">
                      <span class="metric-label">Sent</span>
                      <span class="metric-value">{{step.sent | number}}</span>
                    </div>
                    <div class="metric-item">
                      <span class="metric-label">Opens</span>
                      <span class="metric-value">{{step.opens}}%</span>
                    </div>
                    <div class="metric-item">
                      <span class="metric-label">Clicks</span>
                      <span class="metric-value">{{step.clicks}}%</span>
                    </div>
                    <div class="metric-item">
                      <span class="metric-label">Conv.</span>
                      <span class="metric-value">{{step.conversions}}%</span>
                    </div>
                  </div>
                  
                  <div class="step-performance" [ngClass]="step.performanceClass">
                    {{step.performanceText}}
                  </div>
                  
                  <!-- Branch Paths -->
                  <div class="step-branches" *ngIf="step.branches && step.branches.length > 0">
                    <div *ngFor="let branch of step.branches" class="branch-path">
                      <div class="branch-condition">{{branch.condition}}</div>
                      <div class="branch-action" [ngClass]="branch.channelClass">
                        {{branch.action}}
                      </div>
                      <div class="branch-metrics">{{branch.percentage}}% take this path</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Orchestration Performance Matrix -->
        <div class="performance-matrix">
          <h4>Channel Sequence Performance Matrix</h4>
          <div class="matrix-container">
            <div class="matrix-grid">
              <div class="matrix-header">
                <div class="header-cell"></div>
                <div class="header-cell" *ngFor="let channel of getChannels()">
                  <div class="channel-icon" [ngClass]="channel.class">{{channel.icon}}</div>
                  <span>{{channel.name}}</span>
                </div>
              </div>
              
              <div *ngFor="let firstChannel of getChannels(); let i = index" class="matrix-row">
                <div class="row-header">
                  <div class="channel-icon" [ngClass]="firstChannel.class">{{firstChannel.icon}}</div>
                  <span>{{firstChannel.name}}</span>
                </div>
                <div *ngFor="let secondChannel of getChannels(); let j = index" 
                     class="matrix-cell" 
                     [ngClass]="getMatrixCellClass(i, j)">
                  <div class="cell-content">
                    <div class="conversion-rate">{{getSequencePerformance(i, j)}}%</div>
                    <div class="sequence-volume">{{getSequenceVolume(i, j)}} campaigns</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Timing Optimization -->
        <div class="timing-optimization">
          <h4>Multi-Channel Timing Optimization</h4>
          <div class="timing-grid">
            <div class="timing-card">
              <h5>🕒 Optimal Send Windows</h5>
              <div class="timing-windows">
                <div *ngFor="let window of getOptimalWindows()" class="timing-window">
                  <div class="window-header">
                    <span class="window-channel" [ngClass]="window.channelClass">{{window.channel}}</span>
                    <span class="window-time">{{window.time}}</span>
                  </div>
                  <div class="window-metrics">
                    <span class="open-rate">{{window.openRate}}% opens</span>
                    <span class="engagement">{{window.engagement}}% engagement</span>
                  </div>
                  <div class="window-bar">
                    <div class="bar-fill" [style.width.%]="window.performance" [ngClass]="window.channelClass"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="timing-card">
              <h5>⏰ Sequence Delays</h5>
              <div class="delay-optimization">
                <div *ngFor="let delay of getOptimalDelays()" class="delay-item">
                  <div class="delay-sequence">
                    <span class="first-channel" [ngClass]="delay.firstChannelClass">{{delay.firstChannel}}</span>
                    <span class="delay-arrow">→</span>
                    <span class="second-channel" [ngClass]="delay.secondChannelClass">{{delay.secondChannel}}</span>
                  </div>
                  <div class="delay-timing">
                    <span class="optimal-delay">{{delay.optimalDelay}}</span>
                    <span class="delay-reason">{{delay.reason}}</span>
                  </div>
                  <div class="delay-impact">
                    <span class="impact-metric">{{delay.impactMetric}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Advanced Orchestration Insights -->
        <div class="advanced-insights">
          <h4>🧠 Advanced Orchestration Insights</h4>
          <div class="insights-grid">
            <div class="insight-card attribution">
              <div class="insight-header">
                <span class="insight-icon">📊</span>
                <h5>Attribution Analysis</h5>
              </div>
              <div class="attribution-chart">
                <div class="attribution-bars">
                  <div *ngFor="let attr of getAttributionData()" class="attribution-bar">
                    <div class="attr-label">{{attr.touchpoint}}</div>
                    <div class="attr-visual">
                      <div class="attr-fill" [style.width.%]="attr.contribution" [ngClass]="attr.class"></div>
                      <span class="attr-percentage">{{attr.contribution}}%</span>
                    </div>
                  </div>
                </div>
              </div>
              <p class="insight-text">WhatsApp contributes 45% to final conversion when used as 2nd touchpoint in sequence.</p>
            </div>
            
            <div class="insight-card dropout">
              <div class="insight-header">
                <span class="insight-icon">📉</span>
                <h5>Dropout Analysis</h5>
              </div>
              <div class="dropout-funnel">
                <div *ngFor="let stage of getDropoutFunnel()" class="funnel-stage">
                  <div class="stage-bar">
                    <div class="bar-segment" [style.width.%]="stage.percentage" [ngClass]="stage.class"></div>
                  </div>
                  <div class="stage-info">
                    <span class="stage-label">{{stage.label}}</span>
                    <span class="stage-count">{{stage.count | number}} ({{stage.percentage}}%)</span>
                  </div>
                  <div class="dropout-rate" *ngIf="stage.dropoutRate">
                    <span class="dropout-percentage">-{{stage.dropoutRate}}%</span>
                    <span class="dropout-reason">{{stage.dropoutReason}}</span>
                  </div>
                </div>
              </div>
              <p class="insight-text">Highest dropout occurs between SMS and Email touchpoints (23% loss).</p>
            </div>
            
            <div class="insight-card optimization">
              <div class="insight-header">
                <span class="insight-icon">🎯</span>
                <h5>Optimization Opportunities</h5>
              </div>
              <div class="optimization-list">
                <div *ngFor="let opportunity of getOptimizationOpportunities()" class="opportunity-item">
                  <div class="opportunity-icon" [ngClass]="opportunity.type">{{opportunity.emoji}}</div>
                  <div class="opportunity-content">
                    <h6>{{opportunity.title}}</h6>
                    <p>{{opportunity.description}}</p>
                    <div class="opportunity-impact">{{opportunity.impact}}</div>
                  </div>
                  <div class="opportunity-action">
                    <button class="action-btn" (click)="implementOpportunity(opportunity)">
                      Implement
                    </button>
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
    
    .orchestration-overview {
      margin-bottom: 32px;
    }
    
    .overview-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
    
    .stat-card {
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
    
    .stat-trend {
      font-size: 0.75rem;
      color: #059669;
      font-weight: 500;
    }
    
    .journey-visualization {
      margin-bottom: 32px;
    }
    
    .journey-visualization h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 20px;
    }
    
    .journey-container {
      background: #f8fafc;
      border-radius: 8px;
      padding: 24px;
      overflow-x: auto;
    }
    
    .journey-path {
      display: flex;
      align-items: flex-start;
      gap: 24px;
      min-width: 800px;
    }
    
    .journey-step {
      position: relative;
      flex: 1;
      min-width: 180px;
    }
    
    .step-connector {
      position: absolute;
      top: 24px;
      right: -24px;
      width: 24px;
      height: 2px;
      background: #cbd5e0;
      z-index: 1;
    }
    
    .step-connector::after {
      content: '';
      position: absolute;
      right: -6px;
      top: -4px;
      width: 0;
      height: 0;
      border-left: 6px solid #cbd5e0;
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
    }
    
    .step-node {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 12px;
      position: relative;
      z-index: 2;
    }
    
    .node-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 1.25rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
      margin-bottom: 8px;
    }
    
    .node-icon.whatsapp { background: #25d366; }
    .node-icon.sms { background: #3b82f6; }
    .node-icon.email { background: #8b5cf6; }
    .node-icon.push { background: #f59e0b; }
    
    .step-timing {
      font-size: 0.75rem;
      color: #6b7280;
      font-weight: 500;
      background: white;
      padding: 2px 8px;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
    }
    
    .step-details {
      background: white;
      border-radius: 8px;
      padding: 16px;
      border: 1px solid #e2e8f0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }
    
    .step-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    
    .step-header h5 {
      font-size: 0.875rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0;
    }
    
    .step-channel {
      font-size: 0.75rem;
      color: #059669;
      font-weight: 500;
    }
    
    .step-metrics {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      margin-bottom: 8px;
    }
    
    .metric-item {
      text-align: center;
      padding: 4px;
      background: #f8fafc;
      border-radius: 4px;
    }
    
    .metric-label {
      display: block;
      font-size: 0.625rem;
      color: #6b7280;
      margin-bottom: 2px;
    }
    
    .metric-value {
      display: block;
      font-size: 0.75rem;
      font-weight: 600;
      color: #374151;
    }
    
    .step-performance {
      font-size: 0.75rem;
      font-weight: 500;
      padding: 4px 8px;
      border-radius: 4px;
      text-align: center;
    }
    
    .step-performance.excellent {
      background: #dcfce7;
      color: #16a34a;
    }
    
    .step-performance.good {
      background: #dbeafe;
      color: #2563eb;
    }
    
    .step-performance.average {
      background: #fef3c7;
      color: #d97706;
    }
    
    .step-branches {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid #e2e8f0;
    }
    
    .branch-path {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
      font-size: 0.75rem;
    }
    
    .branch-condition {
      color: #6b7280;
    }
    
    .branch-action {
      font-weight: 500;
      padding: 2px 6px;
      border-radius: 4px;
      color: white;
    }
    
    .branch-action.whatsapp { background: #25d366; }
    .branch-action.sms { background: #3b82f6; }
    .branch-action.email { background: #8b5cf6; }
    
    .branch-metrics {
      color: #059669;
      font-weight: 500;
    }
    
    .performance-matrix {
      margin-bottom: 32px;
    }
    
    .performance-matrix h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 16px;
    }
    
    .matrix-container {
      overflow-x: auto;
    }
    
    .matrix-grid {
      min-width: 600px;
    }
    
    .matrix-header {
      display: grid;
      grid-template-columns: 120px repeat(4, 1fr);
      gap: 1px;
      margin-bottom: 1px;
    }
    
    .header-cell {
      background: #f3f4f6;
      padding: 12px 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 600;
      color: #374151;
    }
    
    .header-cell .channel-icon {
      width: 16px;
      height: 16px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 0.75rem;
      margin-right: 4px;
    }
    
    .matrix-row {
      display: grid;
      grid-template-columns: 120px repeat(4, 1fr);
      gap: 1px;
      margin-bottom: 1px;
    }
    
    .row-header {
      background: #f3f4f6;
      padding: 12px 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75rem;
      font-weight: 600;
      color: #374151;
    }
    
    .row-header .channel-icon {
      width: 16px;
      height: 16px;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 0.75rem;
      margin-right: 4px;
    }
    
    .matrix-cell {
      background: white;
      padding: 12px 8px;
      border: 1px solid #e2e8f0;
      text-align: center;
    }
    
    .matrix-cell.high-performance {
      background: #dcfce7;
    }
    
    .matrix-cell.medium-performance {
      background: #fef3c7;
    }
    
    .matrix-cell.low-performance {
      background: #fee2e2;
    }
    
    .cell-content .conversion-rate {
      font-size: 0.875rem;
      font-weight: 600;
      color: #374151;
    }
    
    .cell-content .sequence-volume {
      font-size: 0.625rem;
      color: #6b7280;
      margin-top: 2px;
    }
    
    .timing-optimization {
      margin-bottom: 32px;
    }
    
    .timing-optimization h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 16px;
    }
    
    .timing-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    
    .timing-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px;
    }
    
    .timing-card h5 {
      font-size: 0.875rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0 0 12px 0;
    }
    
    .timing-windows {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .timing-window {
      padding: 8px;
      background: #f8fafc;
      border-radius: 6px;
    }
    
    .window-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }
    
    .window-channel {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 4px;
      color: white;
    }
    
    .window-channel.whatsapp { background: #25d366; }
    .window-channel.sms { background: #3b82f6; }
    .window-channel.email { background: #8b5cf6; }
    
    .window-time {
      font-size: 0.75rem;
      color: #374151;
      font-weight: 500;
    }
    
    .window-metrics {
      display: flex;
      gap: 8px;
      margin-bottom: 4px;
    }
    
    .open-rate,
    .engagement {
      font-size: 0.625rem;
      color: #6b7280;
    }
    
    .window-bar {
      height: 4px;
      background: #e2e8f0;
      border-radius: 2px;
      overflow: hidden;
    }
    
    .bar-fill {
      height: 100%;
      border-radius: 2px;
    }
    
    .bar-fill.whatsapp { background: #25d366; }
    .bar-fill.sms { background: #3b82f6; }
    .bar-fill.email { background: #8b5cf6; }
    
    .delay-optimization {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .delay-item {
      padding: 12px;
      background: #f8fafc;
      border-radius: 6px;
      border: 1px solid #e2e8f0;
    }
    
    .delay-sequence {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 6px;
    }
    
    .first-channel,
    .second-channel {
      font-size: 0.75rem;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 4px;
      color: white;
    }
    
    .first-channel.whatsapp,
    .second-channel.whatsapp { background: #25d366; }
    .first-channel.sms,
    .second-channel.sms { background: #3b82f6; }
    .first-channel.email,
    .second-channel.email { background: #8b5cf6; }
    
    .delay-arrow {
      color: #6b7280;
      font-weight: 600;
    }
    
    .delay-timing {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 4px;
    }
    
    .optimal-delay {
      font-size: 0.875rem;
      font-weight: 600;
      color: #059669;
    }
    
    .delay-reason {
      font-size: 0.75rem;
      color: #6b7280;
    }
    
    .delay-impact {
      font-size: 0.75rem;
      color: #374151;
      font-weight: 500;
    }
    
    .advanced-insights h4 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 16px;
    }
    
    .insights-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 20px;
    }
    
    .insight-card {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      padding: 16px;
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
    
    .insight-text {
      font-size: 0.875rem;
      color: #4a5568;
      margin: 12px 0 0 0;
      line-height: 1.4;
    }
    
    .attribution-bars {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 12px;
    }
    
    .attribution-bar {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .attr-label {
      font-size: 0.75rem;
      font-weight: 500;
      width: 60px;
    }
    
    .attr-visual {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .attr-fill {
      height: 8px;
      border-radius: 4px;
      min-width: 20px;
    }
    
    .attr-fill.whatsapp { background: #25d366; }
    .attr-fill.sms { background: #3b82f6; }
    .attr-fill.email { background: #8b5cf6; }
    
    .attr-percentage {
      font-size: 0.75rem;
      font-weight: 600;
      color: #374151;
      width: 35px;
      text-align: right;
    }
    
    .dropout-funnel {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-bottom: 12px;
    }
    
    .funnel-stage {
      position: relative;
    }
    
    .stage-bar {
      height: 20px;
      background: #f3f4f6;
      border-radius: 10px;
      overflow: hidden;
    }
    
    .bar-segment {
      height: 100%;
      border-radius: 10px;
      background: linear-gradient(90deg, #10b981, #059669);
    }
    
    .stage-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 4px;
    }
    
    .stage-label {
      font-size: 0.75rem;
      color: #374151;
      font-weight: 500;
    }
    
    .stage-count {
      font-size: 0.75rem;
      color: #6b7280;
    }
    
    .dropout-rate {
      display: flex;
      justify-content: space-between;
      margin-top: 2px;
    }
    
    .dropout-percentage {
      font-size: 0.75rem;
      color: #dc2626;
      font-weight: 600;
    }
    
    .dropout-reason {
      font-size: 0.625rem;
      color: #6b7280;
    }
    
    .optimization-list {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    
    .opportunity-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 8px;
      background: #f8fafc;
      border-radius: 6px;
    }
    
    .opportunity-icon {
      font-size: 1rem;
      margin-top: 2px;
    }
    
    .opportunity-content {
      flex: 1;
    }
    
    .opportunity-content h6 {
      font-size: 0.75rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0 0 4px 0;
    }
    
    .opportunity-content p {
      font-size: 0.75rem;
      color: #4a5568;
      margin: 0 0 4px 0;
      line-height: 1.3;
    }
    
    .opportunity-impact {
      font-size: 0.625rem;
      color: #059669;
      font-weight: 500;
    }
    
    .action-btn {
      padding: 4px 8px;
      border: none;
      border-radius: 4px;
      background: #3b82f6;
      color: white;
      font-size: 0.75rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.2s;
    }
    
    .action-btn:hover {
      background: #2563eb;
    }
  `]
})
export class OrchestrationAnalysisComponent implements OnInit {
  analysisMode: string = 'sequence';

  ngOnInit(): void {}

  getActiveOrchestrations(): number {
    return 12;
  }

  getAverageSequenceLength(): number {
    return 4;
  }

  getOrchestrationROI(): number {
    return 127;
  }

  getJourneySteps() {
    return [
      {
        day: 1,
        title: "Welcome Campaign",
        channel: "WhatsApp",
        icon: "💬",
        channelClass: "whatsapp",
        sent: 25000,
        opens: 98.5,
        clicks: 45.2,
        conversions: 12.3,
        status: "completed",
        performanceClass: "excellent",
        performanceText: "Excellent Performance",
        branches: [
          {
            condition: "If opened",
            action: "Send Product Info",
            channelClass: "email",
            percentage: 68
          },
          {
            condition: "If not opened",
            action: "SMS Reminder",
            channelClass: "sms",
            percentage: 32
          }
        ]
      },
      {
        day: 3,
        title: "Product Education",
        channel: "Email",
        icon: "📧",
        channelClass: "email",
        sent: 17000,
        opens: 24.8,
        clicks: 8.9,
        conversions: 3.2,
        status: "active",
        performanceClass: "good",
        performanceText: "Good Performance",
        branches: []
      },
      {
        day: 7,
        title: "Special Offer",
        channel: "SMS",
        icon: "📱",
        channelClass: "sms",
        sent: 23000,
        opens: 97.1,
        clicks: 18.4,
        conversions: 8.7,
        status: "active",
        performanceClass: "good",
        performanceText: "Good Performance",
        branches: []
      },
      {
        day: 14,
        title: "Final Reminder",
        channel: "Push",
        icon: "🔔",
        channelClass: "push",
        sent: 19500,
        opens: 92.3,
        clicks: 3.1,
        conversions: 1.8,
        status: "scheduled",
        performanceClass: "average",
        performanceText: "Average Performance",
        branches: []
      }
    ];
  }

  getChannels() {
    return [
      { name: 'WhatsApp', icon: '💬', class: 'whatsapp' },
      { name: 'SMS', icon: '📱', class: 'sms' },
      { name: 'Email', icon: '📧', class: 'email' },
      { name: 'Push', icon: '🔔', class: 'push' }
    ];
  }

  getSequencePerformance(first: number, second: number): number {
    const matrix = [
      [0, 34.2, 18.7, 12.4],
      [28.9, 0, 22.1, 9.8],
      [15.3, 31.6, 0, 7.2],
      [8.9, 14.5, 11.2, 0]
    ];
    return matrix[first][second];
  }

  getSequenceVolume(first: number, second: number): number {
    const volumes = [
      [0, 156, 89, 43],
      [134, 0, 67, 32],
      [78, 98, 0, 28],
      [45, 72, 39, 0]
    ];
    return volumes[first][second];
  }

  getMatrixCellClass(first: number, second: number): string {
    if (first === second) return '';
    const performance = this.getSequencePerformance(first, second);
    if (performance > 25) return 'high-performance';
    if (performance > 15) return 'medium-performance';
    return 'low-performance';
  }

  getOptimalWindows() {
    return [
      {
        channel: 'WhatsApp',
        channelClass: 'whatsapp',
        time: '10:00 AM',
        openRate: 98.5,
        engagement: 45.2,
        performance: 95
      },
      {
        channel: 'SMS',
        channelClass: 'sms',
        time: '11:00 AM',
        openRate: 97.1,
        engagement: 18.4,
        performance: 82
      },
      {
        channel: 'Email',
        channelClass: 'email',
        time: '2:00 PM',
        openRate: 24.8,
        engagement: 8.9,
        performance: 45
      }
    ];
  }

  getOptimalDelays() {
    return [
      {
        firstChannel: 'WhatsApp',
        firstChannelClass: 'whatsapp',
        secondChannel: 'Email',
        secondChannelClass: 'email',
        optimalDelay: '2 days',
        reason: 'Cool-down period',
        impactMetric: '+15% conversion'
      },
      {
        firstChannel: 'Email',
        firstChannelClass: 'email',
        secondChannel: 'SMS',
        secondChannelClass: 'sms',
        optimalDelay: '4 days',
        reason: 'Re-engagement',
        impactMetric: '+23% open rate'
      },
      {
        firstChannel: 'SMS',
        firstChannelClass: 'sms',
        secondChannel: 'Push',
        secondChannelClass: 'push',
        optimalDelay: '1 week',
        reason: 'Final reminder',
        impactMetric: '+8% conversions'
      }
    ];
  }

  getAttributionData() {
    return [
      { touchpoint: 'First', contribution: 25, class: 'whatsapp' },
      { touchpoint: 'Second', contribution: 45, class: 'email' },
      { touchpoint: 'Third', contribution: 20, class: 'sms' },
      { touchpoint: 'Final', contribution: 10, class: 'push' }
    ];
  }

  getDropoutFunnel() {
    return [
      {
        label: 'Initial Audience',
        count: 25000,
        percentage: 100,
        class: 'stage-full'
      },
      {
        label: 'Opened WhatsApp',
        count: 17000,
        percentage: 68,
        class: 'stage-high',
        dropoutRate: 32,
        dropoutReason: 'Message ignored'
      },
      {
        label: 'Clicked Email',
        count: 13100,
        percentage: 52,
        class: 'stage-medium',
        dropoutRate: 23,
        dropoutReason: 'Email to SMS gap'
      },
      {
        label: 'Final Conversion',
        count: 3075,
        percentage: 12.3,
        class: 'stage-low',
        dropoutRate: 76,
        dropoutReason: 'Purchase friction'
      }
    ];
  }

  getOptimizationOpportunities() {
    return [
      {
        emoji: '⚡',
        type: 'timing',
        title: 'Reduce Email-SMS Gap',
        description: 'Current 4-day gap causes 23% dropout. Reduce to 2 days.',
        impact: '+15% retention rate'
      },
      {
        emoji: '🎯',
        type: 'targeting',
        title: 'Skip Low Performers',
        description: 'Users who don\'t open first message have 90% lower conversion.',
        impact: '+28% efficiency'
      },
      {
        emoji: '🔄',
        type: 'sequencing',
        title: 'Dynamic Path Selection',
        description: 'Route high-engagers directly to offer, others through education.',
        impact: '+22% conversions'
      }
    ];
  }

  implementOpportunity(opportunity: any): void {
    console.log('Implementing opportunity:', opportunity.title);
  }
}