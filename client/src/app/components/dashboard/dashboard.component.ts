import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-semibold text-gray-900">
              Campaign Analytics Dashboard
            </h1>
            <p class="text-sm text-gray-600 mt-1">
              Multi-Channel Campaign Performance • Real-time tracking across SMS, WhatsApp, Email, Push & RCS
            </p>
            <div class="flex items-center mt-2">
              <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-xs text-green-600 ml-2">Live Updates Active</span>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <select [(ngModel)]="selectedChannel" class="w-40 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm">
              <option value="all">All Channels</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="sms">SMS</option>
              <option value="email">Email</option>
              <option value="push">Push</option>
              <option value="rcs">RCS</option>
            </select>
            <button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center">
              <span class="mr-2">+</span>
              New Campaign
            </button>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="p-6 space-y-6">
        <!-- Campaign Performance Table -->
        <app-campaign-table></app-campaign-table>

        <!-- Channel Performance and Heatmap Row -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <app-channel-performance></app-channel-performance>
          <app-engagement-heatmap></app-engagement-heatmap>
        </div>

        <!-- Real-time Campaign Monitoring with AI Analytics -->
        <app-real-time-monitoring></app-real-time-monitoring>

        <!-- Cost Optimization Insights -->
        <app-cost-optimization></app-cost-optimization>

        <!-- Orchestration Analysis -->
        <app-orchestration-analysis></app-orchestration-analysis>

        <!-- BSP Performance Comparison -->
        <app-bsp-performance></app-bsp-performance>

        <!-- Festival Performance Timeline -->
        <app-festival-timeline></app-festival-timeline>

        <!-- Budget vs Performance Calculator -->
        <app-budget-calculator></app-budget-calculator>
      </main>
    </div>
  `,
  styles: [`
    .min-h-screen {
      min-height: 100vh;
    }
    
    .bg-gray-50 {
      background-color: #f9fafb;
    }
    
    .bg-white {
      background-color: white;
    }
    
    .shadow-sm {
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }
    
    .border-b {
      border-bottom-width: 1px;
    }
    
    .border-gray-200 {
      border-color: #e5e7eb;
    }
    
    .px-6 {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
    
    .py-4 {
      padding-top: 1rem;
      padding-bottom: 1rem;
    }
    
    .p-6 {
      padding: 1.5rem;
    }
    
    .flex {
      display: flex;
    }
    
    .items-center {
      align-items: center;
    }
    
    .justify-between {
      justify-content: space-between;
    }
    
    .space-x-4 > :not([hidden]) ~ :not([hidden]) {
      margin-left: 1rem;
    }
    
    .space-y-6 > :not([hidden]) ~ :not([hidden]) {
      margin-top: 1.5rem;
    }
    
    .text-2xl {
      font-size: 1.5rem;
      line-height: 2rem;
    }
    
    .text-sm {
      font-size: 0.875rem;
      line-height: 1.25rem;
    }
    
    .text-xs {
      font-size: 0.75rem;
      line-height: 1rem;
    }
    
    .font-semibold {
      font-weight: 600;
    }
    
    .font-medium {
      font-weight: 500;
    }
    
    .text-gray-900 {
      color: #111827;
    }
    
    .text-gray-600 {
      color: #4b5563;
    }
    
    .text-green-600 {
      color: #16a34a;
    }
    
    .text-white {
      color: white;
    }
    
    .mt-1 {
      margin-top: 0.25rem;
    }
    
    .mt-2 {
      margin-top: 0.5rem;
    }
    
    .ml-2 {
      margin-left: 0.5rem;
    }
    
    .mr-2 {
      margin-right: 0.5rem;
    }
    
    .w-2 {
      width: 0.5rem;
    }
    
    .h-2 {
      height: 0.5rem;
    }
    
    .w-40 {
      width: 10rem;
    }
    
    .bg-green-500 {
      background-color: #22c55e;
    }
    
    .bg-blue-600 {
      background-color: #2563eb;
    }
    
    .bg-blue-700 {
      background-color: #1d4ed8;
    }
    
    .rounded-full {
      border-radius: 9999px;
    }
    
    .rounded-md {
      border-radius: 0.375rem;
    }
    
    .animate-pulse {
      animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: .5;
      }
    }
    
    .px-3 {
      padding-left: 0.75rem;
      padding-right: 0.75rem;
    }
    
    .py-2 {
      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }
    
    .px-4 {
      padding-left: 1rem;
      padding-right: 1rem;
    }
    
    .border {
      border-width: 1px;
    }
    
    .border-gray-300 {
      border-color: #d1d5db;
    }
    
    .hover\\:bg-blue-700:hover {
      background-color: #1d4ed8;
    }
    
    .grid {
      display: grid;
    }
    
    .grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    
    .gap-6 {
      gap: 1.5rem;
    }
    
    @media (min-width: 1024px) {
      .lg\\:grid-cols-2 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  selectedChannel: string = 'all';

  ngOnInit(): void {
    console.log('Dashboard initialized with comprehensive Angular components');
  }
}