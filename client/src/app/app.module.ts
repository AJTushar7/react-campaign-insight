import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { KpiCardsComponent } from './components/kpi-cards/kpi-cards.component';
import { CampaignTableComponent } from './components/campaign-table/campaign-table.component';
import { ChannelPerformanceComponent } from './components/channel-performance/channel-performance.component';
import { EngagementHeatmapComponent } from './components/engagement-heatmap/engagement-heatmap.component';
import { RealTimeMonitoringComponent } from './components/real-time-monitoring/real-time-monitoring.component';
import { BspPerformanceComponent } from './components/bsp-performance/bsp-performance.component';
import { FestivalTimelineComponent } from './components/festival-timeline/festival-timeline.component';
import { BudgetCalculatorComponent } from './components/budget-calculator/budget-calculator.component';
import { CostOptimizationComponent } from './components/cost-optimization/cost-optimization.component';
import { OrchestrationAnalysisComponent } from './components/orchestration-analysis/orchestration-analysis.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    KpiCardsComponent,
    CampaignTableComponent,
    ChannelPerformanceComponent,
    EngagementHeatmapComponent,
    RealTimeMonitoringComponent,
    BspPerformanceComponent,
    FestivalTimelineComponent,
    BudgetCalculatorComponent,
    CostOptimizationComponent,
    OrchestrationAnalysisComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }