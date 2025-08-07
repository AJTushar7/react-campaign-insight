import { Component, OnInit } from '@angular/core';

interface Campaign {
  id: string;
  name: string;
  status: string;
  statusType: string;
  burnRate: number;
  sent: string;
  total: string;
  percentage: number;
  spent: number;
  budget: number;
  segment: string;
  channel: string;
  startDate: string;
  errors: number;
  retryCount: number;
  retryCost: number;
  conversionRate: string;
  openRate: string;
  clickRate: string;
}

@Component({
  selector: 'app-real-time-monitoring',
  template: `
    <div class="card">
      <div class="card-header">
        <div class="header-content">
          <div class="title-section">
            <div class="icon">📊</div>
            <div>
              <h3 class="card-title">Real-time Campaign Monitoring</h3>
              <p class="card-subtitle">Campaign tracking inspired by Google Ads & Facebook Campaign Manager</p>
            </div>
          </div>
          <div class="controls">
            <select [(ngModel)]="dateRange" class="filter-select">
              <option value="7days">7 Days</option>
              <option value="15days">15 Days</option>
              <option value="30days">30 Days</option>
            </select>
            <select [(ngModel)]="statusFilter" class="filter-select" (change)="filterCampaigns()">
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="scheduled">Scheduled</option>
            </select>
            <div class="view-toggle">
              <button 
                class="view-btn" 
                [class.active]="viewMode === 'card'"
                (click)="viewMode = 'card'">
                Card View
              </button>
              <button 
                class="view-btn" 
                [class.active]="viewMode === 'table'"
                (click)="viewMode = 'table'">
                Table View
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div class="card-content">
        <!-- Campaign Summary Stats -->
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon bg-blue-100">📈</div>
            <div class="stat-info">
              <h4>{{getTotalCampaigns()}}</h4>
              <p>Total Campaigns</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon bg-green-100">✅</div>
            <div class="stat-info">
              <h4>{{getActiveCampaigns()}}</h4>
              <p>Active Campaigns</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon bg-orange-100">⚠️</div>
            <div class="stat-info">
              <h4>{{getTotalErrors()}}</h4>
              <p>Total Errors</p>
            </div>
          </div>
          <div class="stat-card">
            <div class="stat-icon bg-purple-100">💰</div>
            <div class="stat-info">
              <h4>₹{{getTotalSpent() | number}}</h4>
              <p>Total Spent</p>
            </div>
          </div>
        </div>

        <!-- Campaign Cards/Table -->
        <div class="campaigns-section" *ngIf="viewMode === 'card'">
          <div class="campaigns-grid">
            <div *ngFor="let campaign of displayedCampaigns" class="campaign-card" [ngClass]="getCampaignBgClass(campaign.statusType)">
              <div class="campaign-header">
                <div class="campaign-info">
                  <h5>{{campaign.name}}</h5>
                  <p class="campaign-segment">{{campaign.segment}} • {{campaign.channel}}</p>
                </div>
                <div class="status-badge" [ngClass]="getStatusClass(campaign.statusType)">
                  {{campaign.status}}
                </div>
              </div>
              
              <div class="campaign-metrics">
                <div class="metric-row">
                  <div class="metric">
                    <span class="metric-label">Sent</span>
                    <span class="metric-value">{{campaign.sent}}/{{campaign.total}}</span>
                  </div>
                  <div class="metric">
                    <span class="metric-label">Burn Rate</span>
                    <span class="metric-value">{{campaign.burnRate}}%</span>
                  </div>
                </div>
                
                <div class="progress-section">
                  <div class="progress-info">
                    <span>Progress</span>
                    <span>{{campaign.percentage}}%</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill" [style.width.%]="campaign.percentage"></div>
                  </div>
                </div>
                
                <div class="metric-row">
                  <div class="metric">
                    <span class="metric-label">Conversion Rate</span>
                    <span class="metric-value">{{campaign.conversionRate}}</span>
                  </div>
                  <div class="metric">
                    <span class="metric-label">Open Rate</span>
                    <span class="metric-value">{{campaign.openRate}}</span>
                  </div>
                </div>
                
                <div class="budget-section">
                  <div class="budget-info">
                    <span>Budget: ₹{{campaign.budget | number}}</span>
                    <span>Spent: ₹{{campaign.spent | number}}</span>
                  </div>
                  <div *ngIf="campaign.errors > 0" class="error-info">
                    <span class="error-count">{{campaign.errors}} errors</span>
                    <span class="retry-cost">Retry cost: ₹{{campaign.retryCost}}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Pagination -->
          <div class="pagination" *ngIf="totalPages > 1">
            <button 
              class="page-btn" 
              [disabled]="currentPage === 0" 
              (click)="previousPage()">
              ← Previous
            </button>
            <span class="page-info">Page {{currentPage + 1}} of {{totalPages}}</span>
            <button 
              class="page-btn" 
              [disabled]="currentPage === totalPages - 1" 
              (click)="nextPage()">
              Next →
            </button>
          </div>
        </div>

        <!-- AI Insights Section -->
        <div class="ai-insights">
          <h4>🧠 AI Performance Insights</h4>
          <div class="insights-grid">
            <div class="insight-card">
              <div class="insight-header">
                <div class="insight-icon">🎯</div>
                <h5>Optimization Opportunity</h5>
              </div>
              <p>WhatsApp campaigns showing 23% higher conversion rates. Consider reallocating budget from Email to WhatsApp.</p>
              <div class="insight-impact">Expected ROI increase: +15%</div>
            </div>
            
            <div class="insight-card">
              <div class="insight-header">
                <div class="insight-icon">⚠️</div>
                <h5>Performance Alert</h5>
              </div>
              <p>SMS delivery rates dropped 5% this week. Review carrier relationships and consider backup providers.</p>
              <div class="insight-impact">Potential revenue impact: -₹45K</div>
            </div>
            
            <div class="insight-card">
              <div class="insight-header">
                <div class="insight-icon">🚀</div>
                <h5>Growth Opportunity</h5>
              </div>
              <p>Peak engagement detected at 10-11 AM. Schedule more campaigns during this window for 18% better performance.</p>
              <div class="insight-impact">Projected lift: +₹1.2L revenue</div>
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
    
    .view-toggle {
      display: flex;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      overflow: hidden;
    }
    
    .view-btn {
      padding: 6px 12px;
      border: none;
      background: white;
      color: #718096;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .view-btn.active {
      background: #667eea;
      color: white;
    }
    
    .card-content {
      padding: 20px;
    }
    
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    
    .stat-card {
      display: flex;
      align-items: center;
      padding: 16px;
      background: #f8fafc;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }
    
    .stat-icon {
      width: 40px;
      height: 40px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
      font-size: 1.1rem;
    }
    
    .bg-blue-100 { background-color: #dbeafe; }
    .bg-green-100 { background-color: #dcfce7; }
    .bg-orange-100 { background-color: #fed7aa; }
    .bg-purple-100 { background-color: #e9d5ff; }
    
    .stat-info h4 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #2d3748;
      margin: 0 0 4px 0;
    }
    
    .stat-info p {
      font-size: 0.875rem;
      color: #718096;
      margin: 0;
    }
    
    .campaigns-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 16px;
    }
    
    .campaign-card {
      border: 1px solid;
      border-radius: 8px;
      padding: 16px;
      transition: transform 0.2s;
    }
    
    .campaign-card:hover {
      transform: translateY(-2px);
    }
    
    .bg-orange-50 { background-color: #fff7ed; border-color: #fed7aa; }
    .bg-green-50 { background-color: #f0fdf4; border-color: #bbf7d0; }
    .bg-blue-50 { background-color: #eff6ff; border-color: #bfdbfe; }
    .bg-gray-50 { background-color: #f9fafb; border-color: #e5e7eb; }
    
    .campaign-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
    
    .campaign-info h5 {
      font-size: 1rem;
      font-weight: 600;
      color: #2d3748;
      margin: 0 0 4px 0;
    }
    
    .campaign-segment {
      font-size: 0.875rem;
      color: #718096;
      margin: 0;
    }
    
    .status-badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 600;
    }
    
    .status-warning { background-color: #fef3c7; color: #d97706; }
    .status-success { background-color: #d1fae5; color: #065f46; }
    .status-info { background-color: #dbeafe; color: #1e40af; }
    .status-default { background-color: #f3f4f6; color: #374151; }
    
    .campaign-metrics {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .metric-row {
      display: flex;
      justify-content: space-between;
    }
    
    .metric {
      display: flex;
      flex-direction: column;
    }
    
    .metric-label {
      font-size: 0.75rem;
      color: #718096;
    }
    
    .metric-value {
      font-size: 0.875rem;
      font-weight: 600;
      color: #2d3748;
    }
    
    .progress-section {
      margin: 8px 0;
    }
    
    .progress-info {
      display: flex;
      justify-content: space-between;
      font-size: 0.875rem;
      margin-bottom: 4px;
    }
    
    .progress-bar {
      height: 6px;
      background-color: #e2e8f0;
      border-radius: 3px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      background-color: #667eea;
      transition: width 0.3s ease;
    }
    
    .budget-section {
      border-top: 1px solid #e2e8f0;
      padding-top: 12px;
    }
    
    .budget-info {
      display: flex;
      justify-content: space-between;
      font-size: 0.875rem;
      color: #2d3748;
    }
    
    .error-info {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      color: #dc2626;
      margin-top: 4px;
    }
    
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      margin-top: 24px;
    }
    
    .page-btn {
      padding: 8px 16px;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      background: white;
      color: #374151;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .page-btn:hover:not(:disabled) {
      background: #f3f4f6;
    }
    
    .page-btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .page-info {
      color: #718096;
      font-size: 0.875rem;
    }
    
    .ai-insights {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #e2e8f0;
    }
    
    .ai-insights h4 {
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
      margin: 0 0 8px 0;
      line-height: 1.4;
    }
    
    .insight-impact {
      font-size: 0.75rem;
      font-weight: 600;
      color: #667eea;
      background: rgba(102, 126, 234, 0.1);
      padding: 4px 8px;
      border-radius: 4px;
      display: inline-block;
    }
  `]
})
export class RealTimeMonitoringComponent implements OnInit {
  dateRange: string = '15days';
  statusFilter: string = 'all';
  viewMode: string = 'card';
  currentPage: number = 0;
  itemsPerPage: number = 3;
  
  campaigns: Campaign[] = [
    {
      id: "1",
      name: "Diwali Festival Sale",
      status: "Active",
      statusType: "warning",
      burnRate: 88,
      sent: "16L",
      total: "200K",
      percentage: 78,
      spent: 8600,
      budget: 10000,
      segment: "Premium Customers",
      channel: "WhatsApp",
      startDate: "2024-10-15",
      errors: 12,
      retryCount: 3,
      retryCost: 840,
      conversionRate: "28.5%",
      openRate: "98.5%",
      clickRate: "34.2%"
    },
    {
      id: "2",
      name: "New Model Launch",
      status: "Active",
      statusType: "info",
      burnRate: 62,
      sent: "93.3K",
      total: "200K",
      percentage: 46,
      spent: 6200,
      budget: 12000,
      segment: "Existing Customers",
      channel: "Email",
      startDate: "2024-10-20",
      errors: 5,
      retryCount: 1,
      retryCost: 280,
      conversionRate: "18.2%",
      openRate: "24.5%",
      clickRate: "8.7%"
    },
    {
      id: "3",
      name: "Service Reminder",
      status: "Completed",
      statusType: "success",
      burnRate: 100,
      sent: "75K",
      total: "75K",
      percentage: 100,
      spent: 5500,
      budget: 5500,
      segment: "All Customers",
      channel: "SMS",
      startDate: "2024-10-10",
      errors: 2,
      retryCount: 0,
      retryCost: 0,
      conversionRate: "22.1%",
      openRate: "97.3%",
      clickRate: "15.8%"
    }
  ];
  
  filteredCampaigns: Campaign[] = [];
  displayedCampaigns: Campaign[] = [];
  totalPages: number = 0;

  ngOnInit(): void {
    this.filterCampaigns();
  }

  filterCampaigns(): void {
    this.filteredCampaigns = this.campaigns.filter(campaign => {
      if (this.statusFilter === 'all') return true;
      return campaign.status.toLowerCase() === this.statusFilter;
    });
    
    this.totalPages = Math.ceil(this.filteredCampaigns.length / this.itemsPerPage);
    this.currentPage = 0;
    this.updateDisplayedCampaigns();
  }

  updateDisplayedCampaigns(): void {
    const startIndex = this.currentPage * this.itemsPerPage;
    this.displayedCampaigns = this.filteredCampaigns.slice(startIndex, startIndex + this.itemsPerPage);
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateDisplayedCampaigns();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updateDisplayedCampaigns();
    }
  }

  getCampaignBgClass(statusType: string): string {
    switch (statusType) {
      case 'warning': return 'bg-orange-50';
      case 'success': return 'bg-green-50';
      case 'info': return 'bg-blue-50';
      default: return 'bg-gray-50';
    }
  }

  getStatusClass(statusType: string): string {
    switch (statusType) {
      case 'warning': return 'status-warning';
      case 'success': return 'status-success';
      case 'info': return 'status-info';
      default: return 'status-default';
    }
  }

  getTotalCampaigns(): number {
    return this.campaigns.length;
  }

  getActiveCampaigns(): number {
    return this.campaigns.filter(c => c.status === 'Active').length;
  }

  getTotalErrors(): number {
    return this.campaigns.reduce((total, c) => total + c.errors, 0);
  }

  getTotalSpent(): number {
    return this.campaigns.reduce((total, c) => total + c.spent, 0);
  }
}