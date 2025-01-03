import React from 'react';
import { Calendar, Users, Clock, FileText } from 'lucide-react';
import { useAdminAuthStore } from '../../stores/adminAuthStore';
import { Section } from '../ui/Section';
import { TaskList } from './dashboard/TaskList';
import { PatientAssignments } from './dashboard/PatientAssignments';
import { ScheduleView } from './dashboard/ScheduleView';

export function StaffDashboard() {
  const staff = useAdminAuthStore(state => state.user);

  if (!staff || staff.role !== 'staff') return null;

  return (
    <div className="py-8 bg-gray-100 min-h-screen">
      <Section title={`Welcome, ${staff.firstName}!`} className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <DashboardCard
            title="Assigned Patients"
            value="8"
            icon={Users}
          />
          <DashboardCard
            title="Today's Tasks"
            value="5"
            icon={FileText}
          />
          <DashboardCard
            title="Shift Hours"
            value="8:00 - 16:00"
            icon={Clock}
          />
          <DashboardCard
            title="Next Shift"
            value="Tomorrow"
            icon={Calendar}
          />
        </div>
      </Section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        <Section title="Today's Tasks">
          <TaskList />
        </Section>
        <Section title="Patient Assignments">
          <PatientAssignments />
        </Section>
      </div>

      <Section title="Schedule">
        <ScheduleView />
      </Section>
    </div>
  );
}

function DashboardCard({ 
  title, 
  icon: Icon, 
  value 
}: { 
  title: string; 
  icon: React.ElementType; 
  value: string;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4">
      <Icon className="w-10 h-10 text-blue-500" />
      <div>
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
