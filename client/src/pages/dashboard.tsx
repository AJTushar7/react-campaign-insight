import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Zap } from "lucide-react";
import KPICards from "@/components/dashboard/kpi-cards";
import RealTimeMonitoring from "@/components/dashboard/real-time-monitoring";
import EngagementHeatmap from "@/components/dashboard/engagement-heatmap";
import InactiveCustomers from "@/components/dashboard/inactive-customers";
import CampaignPerformanceTable from "@/components/dashboard/campaign-performance-table";
import BudgetPerformance from "@/components/dashboard/budget-performance";
import FestivalTimeline from "@/components/dashboard/festival-timeline";
import ChannelComparison from "@/components/dashboard/channel-comparison";
import CostOptimization from "@/components/dashboard/cost-optimization";
import BSPPerformance from "@/components/dashboard/bsp-performance";

export default function Dashboard() {
  const [selectedChannel, setSelectedChannel] = useState("all");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900" data-testid="dashboard-title">
              Campaign Analytics Dashboard
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Multi-Channel Campaign Performance • Real-time tracking across SMS, WhatsApp, Email, Push & RCS
            </p>
            <div className="flex items-center mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" data-testid="live-indicator"></div>
              <span className="text-xs text-green-600 ml-2">Live Updates Active</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedChannel} onValueChange={setSelectedChannel}>
              <SelectTrigger className="w-40" data-testid="channel-selector">
                <SelectValue placeholder="All Channels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Channels</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="push">Push</SelectItem>
                <SelectItem value="rcs">RCS</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-primary hover:bg-blue-700" data-testid="button-new-campaign">
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-6">
        {/* KPI Cards */}
        <KPICards />

        {/* Cost Optimization Insights */}
        <CostOptimization />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Real-time Monitoring & Heatmap */}
          <div className="lg:col-span-2 space-y-6">
            <RealTimeMonitoring />
            <EngagementHeatmap />
          </div>

          {/* Right Column: Inactive Customer Management */}
          <div className="space-y-6">
            <InactiveCustomers />
          </div>
        </div>

        {/* Festival Performance Timeline */}
        <FestivalTimeline />

        {/* BSP Performance Comparison */}
        <BSPPerformance />

        {/* Campaign Performance Details Table */}
        <CampaignPerformanceTable />

        {/* Additional Analytics Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BudgetPerformance />
          <ChannelComparison />
        </div>
      </main>
    </div>
  );
}
