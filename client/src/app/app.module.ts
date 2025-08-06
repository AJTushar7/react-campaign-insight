import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { KpiCardsComponent } from './components/kpi-cards/kpi-cards.component';
import { CampaignTableComponent } from './components/campaign-table/campaign-table.component';
import { ChannelPerformanceComponent } from './components/channel-performance/channel-performance.component';

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
    ChannelPerformanceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }