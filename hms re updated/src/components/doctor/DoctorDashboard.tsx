import React from 'react';
import { Calendar, Users, Clock, FileText } from 'lucide-react';
import { useDoctorAuthStore } from '../../stores/doctorAuthStore';
import { Section } from '../ui/Section';
import { AppointmentList } from './dashboard/AppointmentList';
import { PatientList } from './dashboard/PatientList';
import { ScheduleManager } from './dashboard/ScheduleManager';

export function DoctorDashboard() {
  const doctor = useDoctorAuthStore((state) => state.doctor);

  if (!doctor) return null;

  return (
    <div className="py-8">
      <Section title={`Welcome, Dr. ${doctor.lastName}`} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Today's Appointments"
            icon={Calendar}
            value={doctor.appointments.filter((apt) => apt.status === 'scheduled').length.toString()}
            color="bg-cyan-600"
          />
          <DashboardCard
            title="Total Patients"
            icon={Users}
            value={doctor.patients.length.toString()}
            color="bg-green-500"
          />
          <DashboardCard
            title="Available Hours"
            icon={Clock}
            value="8"
            color="bg-yellow-500"
          />
          <DashboardCard
            title="Pending Reports"
            icon={FileText}
            value="3"
            color="bg-red-500"
          />
          <DashboardCard
            title="Patient Reviews"
            icon={Users}
            value="20"
            color="bg-purple-500"
          />
          <DashboardCard
            title="Average Rating"
            icon={Clock}
            value="4.5/5"
            color="bg-pink-500"
          />
          <DashboardCard
            title="Total Consultations"
            icon={FileText}
            value="50"
            color="bg-orange-500"
          />
          <DashboardCard
            title="Revenue"
            icon={Clock}
            value="$10,000"
            color="bg-teal-500"
          />
        </div>
      </Section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Section title="Upcoming Appointments" className="mb-8">
          <AppointmentList appointments={doctor.appointments} />
        </Section>

        <Section title="Recent Patients" className="mb-8">
          <PatientList patients={doctor.patients} />
        </Section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Section title="Schedule Management">
          <ScheduleManager slots={doctor.availableSlots} />
        </Section>

        <Section title="Patient Engagement">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DashboardCard
              title="Patient Messages"
              icon={Users}
              value="10"
              color="bg-blue-700"
            />
            <DashboardCard
              title="Patient Calls"
              icon={Clock}
              value="5"
              color="bg-green-500"
            />
            <DashboardCard
              title="Patient Emails"
              icon={FileText}
              value="20"
              color="bg-yellow-500"
            />
            <DashboardCard
              title="Patient Social Media Engagement"
              icon={Users}
              value="50"
              color="bg-red-500"
            />
          </div>
        </Section>
      </div>

      <Section title="Practice Insights">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DashboardCard
            title="Top Referring Physicians"
            icon={Users}
            value="5"
            color="bg-pink-500"
          />
          <DashboardCard
            title="Top Procedures"
            icon={Clock}
            value="10"
            color="bg-green-500"
          />
          <DashboardCard
            title="Top Diagnoses"
            icon={FileText}
            value="15"
            color="bg-yellow-500"
          />
          <DashboardCard
            title="Top Medications"
            icon={Users}
            value="20"
            color="bg-red-500"
          />
          <DashboardCard
            title="Top Medical Conditions"
            icon={Clock}
            value="25"
            color="bg-purple-500"
          />
        </div>
      </Section>

      <Section title="Financial Insights">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DashboardCard
            title="Total Revenue"
            icon={Clock}
            value="$50,000"
            color="bg-teal-700"
          />
          <DashboardCard
            title="Total Expenses"
            icon={FileText}
            value="$20,000"
            color="bg-green-500"
          />
          <DashboardCard
            title="Net Profit"
            icon={Users}
            value="$30,000"
            color="bg-yellow-500"
          />
          <DashboardCard
            title="Revenue Growth Rate"
            icon={Clock}
            value="10%"
            color="bg-red-500"
          />
          <DashboardCard
            title="Expense Growth Rate"
            icon={FileText}
            value="5%"
            color="bg-purple-500"
          />
        </div>
      </Section>

      <Section title="Marketing Insights">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DashboardCard
            title="Website Traffic"
            icon={Users}
            value="1000"
            color="bg-cyan-500"
          />
          <DashboardCard
            title="Social Media Followers"
            icon={Clock}
            value="5000"
            color="bg-green-500"
          />
          <DashboardCard
            title="Email Open Rate"
            icon={FileText}
            value="20%"
            color="bg-yellow-500"
          />
          <DashboardCard
            title="Conversion Rate"
            icon={Users}
            value="10%"
            color="bg-red-500"
          />
          <DashboardCard
            title="Customer Acquisition Cost"
            icon={Clock}
            value="$100"
            color="bg-purple-500"
          />
        </div>
      </Section>

      <Section title="Patient Care Insights">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DashboardCard
            title="Patient Satisfaction Rate"
            icon={Users}
            value="90%"
            color="bg-orange-500"
          />
          <DashboardCard
            title="Patient Retention Rate"
            icon={Clock}
            value="80%"
            color="bg-green-500"
          />
          <DashboardCard
            title="Average Wait Time"
            icon={FileText}
            value="15 minutes"
            color="bg-yellow-500"
          />
          <DashboardCard
            title="Top Patient Complaints"
            icon={Users}
            value="5"
            color="bg-red-500"
          />
          <DashboardCard
            title="Top Patient Praise"
            icon={Clock}
            value="10"
            color="bg-purple-500"
          />
        </div>
      </Section>

      <Section title="Staff Insights">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DashboardCard
            title="Staff Satisfaction Rate"
            icon={Users}
            value="90%"
            color="bg-gray-500"
          />
          <DashboardCard
            title="Staff Retention Rate"
            icon={Clock}
            value="80%"
            color="bg-green-500"
          />
          <DashboardCard
            title="Average Staff Training Time"
            icon={FileText}
            value="5 hours"
            color="bg-yellow-500"
          />
          <DashboardCard
            title="Top Staff Complaints"
            icon={Users}
            value="5"
            color="bg-red-500"
          />
          <DashboardCard
            title="Top Staff Praise"
            icon={Clock}
            value="10"
            color="bg-purple-500"
          />
        </div>
      </Section>
    </div>
  );
}

function DashboardCard({
  title,
  icon: Icon,
  value,
  color,
}: {
  title: string;
  icon: React.ElementType;
  value: string;
  color: string;
}) {
  return (
    <div className={`p-6 rounded-lg shadow-md ${color}`}>
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-8 h-8 text-white" />
        <span className="text-2xl font-bold text-white">{value}</span>
      </div>
      <h3 className="text-lg font-medium text-white">{title}</h3>
    </div>
  );
}
