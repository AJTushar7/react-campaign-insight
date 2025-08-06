import { Component, Input } from '@angular/core';
import { KPI } from '../../models/campaign.model';

@Component({
  selector: 'app-kpi-cards',
  template: `
    <div class="kpi-grid" *ngIf="kpis && kpis.length > 0">
      <div class="card kpi-card" *ngFor="let kpi of kpis">
        <div class="kpi-header">
          <div class="kpi-icon" [ngClass]="'icon-' + kpi.icon">
            <span>📊</span>
          </div>
          <div class="kpi-change" [ngClass]="'change-' + kpi.changeType">
            <span *ngIf="kpi.changeType === 'increase'">↗</span>
            <span *ngIf="kpi.changeType === 'decrease'">↘</span>
            {{kpi.change | number:'1.1-1'}}%
          </div>
        </div>
        <div class="kpi-content">
          <h3 class="kpi-value">{{kpi.value}}</h3>
          <p class="kpi-title">{{kpi.title}}</p>
        </div>
        <div class="kpi-trend" *ngIf="kpi.trend && kpi.trend.length > 0">
          <div class="trend-chart">
            <div 
              class="trend-bar" 
              *ngFor="let value of kpi.trend; let i = index"
              [style.height.%]="(value / getMaxTrend(kpi.trend)) * 100"
              [style.background]="kpi.changeType === 'increase' ? '#10b981' : '#ef4444'">
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    
    .kpi-card {
      padding: 1.5rem;
      position: relative;
      overflow: hidden;
    }
    
    .kpi-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    }
    
    .kpi-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    
    .kpi-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      background-color: #f7fafc;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
    }
    
    .kpi-change {
      font-size: 0.9rem;
      font-weight: 600;
      padding: 0.25rem 0.5rem;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }
    
    .change-increase {
      background-color: #f0fff4;
      color: #38a169;
    }
    
    .change-decrease {
      background-color: #fff5f5;
      color: #e53e3e;
    }
    
    .kpi-content h3 {
      font-size: 2.2rem;
      font-weight: 700;
      color: #2d3748;
      margin: 0 0 0.5rem 0;
    }
    
    .kpi-content p {
      color: #718096;
      font-size: 1rem;
      margin: 0;
    }
    
    .kpi-trend {
      margin-top: 1rem;
      height: 40px;
    }
    
    .trend-chart {
      display: flex;
      align-items: end;
      gap: 2px;
      height: 100%;
    }
    
    .trend-bar {
      flex: 1;
      min-height: 4px;
      border-radius: 2px;
      opacity: 0.8;
      transition: opacity 0.2s;
    }
    
    .trend-bar:hover {
      opacity: 1;
    }
  `]
})
export class KpiCardsComponent {
  @Input() kpis: KPI[] | null = null;

  getMaxTrend(trend: number[]): number {
    return Math.max(...trend);
  }
}