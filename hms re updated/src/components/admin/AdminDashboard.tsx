import React from 'react';
import { Users, Activity, Calendar, FileText, Building2 } from 'lucide-react';
import { Section } from '../ui/Section';
import { useAdminAuthStore } from '../../stores/adminAuthStore';
import { StaffList } from './dashboard/StaffList';
import { DepartmentOverview } from './dashboard/DepartmentOverview';
import { ActivityLogs } from './dashboard/ActivityLogs';

export function AdminDashboard() {
  const admin = useAdminAuthStore(state => state.user);

  if (!admin || admin.role !== 'admin') return null;

  return (
    <div className="py-8">
      <Section title="Hospital Administration Dashboard" className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Total Staff"
            value="150"
            icon={Users}
            trend="up"
            trendValue="+5"
          />
          <DashboardCard
            title="Occupancy Rate"
            value="85%"
            icon={Building2}
            trend="up"
            trendValue="+2.5%"
          />
          <DashboardCard
            title="Active Departments"
            value="12"
            icon={Activity}
            trend="stable"
          />
          <DashboardCard
            title="Pending Reports"
            value="8"
            icon={FileText}
            trend="down"
            trendValue="-3"
          />
        </div>
      </Section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Section title="Staff Overview">
          <StaffList />
        </Section>
        <Section title="Department Statistics">
          <DepartmentOverview />
        </Section>
      </div>

      <Section title="Recent Activity">
        <ActivityLogs />
      </Section>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  value: string;
  icon: React.ElementType;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
}

function DashboardCard({ title, value, icon: Icon, trend, trendValue }: DashboardCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-8 h-8 text-blue-500" />
        <div className="text-right">
          <span className="text-2xl font-bold text-gray-900">{value}</span>
          {trend && (
            <div className={`text-sm ${
              trend === 'up' ? 'text-green-500' :
              trend === 'down' ? 'text-red-500' :
              'text-gray-500'
            }`}>
              {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
            </div>
          )}
        </div>
      </div>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
    </div>
  );
}