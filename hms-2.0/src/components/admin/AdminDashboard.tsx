import React, { useRef, useEffect } from 'react';
import { Users, Activity, Calendar, FileText, Building2, Star, AlertCircle, CheckCircle } from 'lucide-react';
import { Section } from '../ui/Section';
import { useAdminAuthStore } from '../../stores/adminAuthStore';
import { StaffList } from './dashboard/StaffList';
import { DepartmentOverview } from './dashboard/DepartmentOverview';
import { ActivityLogs } from './dashboard/ActivityLogs';
import { Button } from '../ui/Button';

// Mock data for new sections
const recentAdmissions = [
  { id: 'P001', name: 'John Doe', department: 'Cardiology', date: '2024-06-01', status: 'Admitted' },
  { id: 'P002', name: 'Jane Smith', department: 'Neurology', date: '2024-06-02', status: 'Discharged' },
  { id: 'P003', name: 'Alice Johnson', department: 'Orthopedics', date: '2024-06-03', status: 'Admitted' },
];

const upcomingAppointments = [
  { id: 'A101', patient: 'Michael Brown', doctor: 'Dr. Lee', time: '10:00 AM', date: '2024-06-05', status: 'Confirmed' },
  { id: 'A102', patient: 'Emily White', doctor: 'Dr. Patel', time: '11:30 AM', date: '2024-06-05', status: 'Pending' },
  { id: 'A103', patient: 'Chris Green', doctor: 'Dr. Kim', time: '1:00 PM', date: '2024-06-05', status: 'Cancelled' },
];

const systemAlerts = [
  { id: 1, message: 'Low stock: Surgical masks', type: 'warning' },
  { id: 2, message: 'New staff onboarding pending approval', type: 'info' },
  { id: 3, message: 'System maintenance scheduled for 2024-06-10', type: 'info' },
];

const resourceUtilization = {
  beds: { used: 120, total: 150 },
  ventilators: { used: 8, total: 10 },
  ambulances: { used: 2, total: 5 },
};

// Additional mock data for enhanced dashboard
const topStaff = [
  { name: 'Dr. Sarah Lee', role: 'Cardiologist', rating: 4.9, avatar: '', patients: 120 },
  { name: 'Nurse Tom Evans', role: 'Head Nurse', rating: 4.8, avatar: '', patients: 98 },
  { name: 'Dr. Priya Patel', role: 'Neurologist', rating: 4.7, avatar: '', patients: 110 },
];

const departmentPerformance = [
  { name: 'Cardiology', progress: 92 },
  { name: 'Neurology', progress: 85 },
  { name: 'Orthopedics', progress: 78 },
  { name: 'Pediatrics', progress: 88 },
];

const patientFeedback = [
  { name: 'John Doe', comment: 'Excellent care and friendly staff!', rating: 5 },
  { name: 'Jane Smith', comment: 'Quick response and professional service.', rating: 4 },
  { name: 'Alice Johnson', comment: 'Facilities are clean and modern.', rating: 5 },
];

const financialOverview = {
  revenue: '$1,200,000',
  expenses: '$850,000',
  profit: '$350,000',
  outstanding: '$50,000',
};

const quickStats = [
  { label: 'New Patients', value: 34, icon: Users, color: 'bg-blue-100 text-blue-600' },
  { label: 'Discharges', value: 28, icon: Calendar, color: 'bg-green-100 text-green-600' },
  { label: 'Surgeries Today', value: 7, icon: Activity, color: 'bg-purple-100 text-purple-600' },
  { label: 'Lab Reports', value: 56, icon: FileText, color: 'bg-yellow-100 text-yellow-600' },
];

// --- Additional mock data for new sections ---
const quickLinks = [
  { label: 'Add Department', icon: Building2 },
  { label: 'Manage Inventory', icon: FileText },
  { label: 'View Analytics', icon: Activity },
  { label: 'Schedule Maintenance', icon: Calendar },
];

const inventoryOverview = [
  { item: 'Surgical Masks', stock: 120, threshold: 100 },
  { item: 'Gloves', stock: 80, threshold: 100 },
  { item: 'Paracetamol', stock: 200, threshold: 50 },
  { item: 'IV Fluids', stock: 30, threshold: 50 },
];

const staffAttendance = [
  { name: 'Dr. Sarah Lee', status: 'Present' },
  { name: 'Nurse Tom Evans', status: 'Late' },
  { name: 'Dr. Priya Patel', status: 'Absent' },
  { name: 'Dr. John Smith', status: 'Present' },
];

const staffRequests = [
  { id: 'R001', name: 'Nurse Tom Evans', type: 'Leave', date: '2024-06-04', status: 'Pending' },
  { id: 'R002', name: 'Dr. Priya Patel', type: 'Shift Change', date: '2024-06-03', status: 'Approved' },
  { id: 'R003', name: 'Dr. John Smith', type: 'Leave', date: '2024-06-02', status: 'Rejected' },
];

const announcements = [
  { id: 1, title: 'COVID-19 Safety Update', date: '2024-06-01', content: 'All staff must wear masks in patient areas.' },
  { id: 2, title: 'Fire Drill', date: '2024-06-03', content: 'Scheduled fire drill on 2024-06-10 at 2:00 PM.' },
];

const analyticsPreview = [
  { label: 'Patient Inflow', value: 120, trend: '+8%' },
  { label: 'Avg. Stay (days)', value: 3.2, trend: '-0.2' },
  { label: 'Revenue Trend', value: '$120k', trend: '+5%' },
];

const maintenanceSchedule = [
  { id: 'M001', task: 'MRI Machine Calibration', date: '2024-06-07', status: 'Scheduled' },
  { id: 'M002', task: 'Fire Extinguisher Check', date: '2024-06-09', status: 'Pending' },
];

const emergencyAlerts = [
  { id: 1, message: 'Code Blue in ICU', type: 'critical' },
  { id: 2, message: 'Power outage in Ward 3', type: 'warning' },
];

const dischargeSummary = [
  { id: 'D001', name: 'Emily White', department: 'Cardiology', date: '2024-06-04', summary: 'Recovered well, follow-up in 2 weeks.' },
  { id: 'D002', name: 'Chris Green', department: 'Neurology', date: '2024-06-03', summary: 'Discharged with medication.' },
];

// Animation hook for fade/slide-in on scroll
function useAnimateOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    node.classList.add('opacity-0', 'translate-y-8');
    const onScroll = () => {
      const rect = node.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        node.classList.remove('opacity-0', 'translate-y-8');
        node.classList.add('animate-fadeinup');
        window.removeEventListener('scroll', onScroll);
      }
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return ref;
}

// Add custom animation to tailwind.config.js:
// theme: { extend: { keyframes: { fadeinup: { '0%': { opacity: 0, transform: 'translateY(32px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } } }, animation: { fadeinup: 'fadeinup 0.7s cubic-bezier(0.4,0,0.2,1) forwards' } } }

export function AdminDashboard() {
  const admin = useAdminAuthStore(state => state.user);
  if (!admin || admin.role !== 'admin') return null;

  // Animation refs for each section
  const refAlerts = useAnimateOnScroll();
  const refQuickLinks = useAnimateOnScroll();
  const refAnalytics = useAnimateOnScroll();
  const refInventory = useAnimateOnScroll();
  const refStaffAttendance = useAnimateOnScroll();
  const refStaffRequests = useAnimateOnScroll();
  const refAnnouncements = useAnimateOnScroll();
  const refDischarges = useAnimateOnScroll();
  const refMaintenance = useAnimateOnScroll();
  const refQuickStats = useAnimateOnScroll();
  const refFinancials = useAnimateOnScroll();
  const refTopStaff = useAnimateOnScroll();
  const refDeptPerf = useAnimateOnScroll();
  const refFeedback = useAnimateOnScroll();
  const refAlertsUtil = useAnimateOnScroll();
  const refAdmissions = useAnimateOnScroll();
  const refAppointments = useAnimateOnScroll();
  const refStaffOverview = useAnimateOnScroll();
  const refDeptStats = useAnimateOnScroll();
  const refActivity = useAnimateOnScroll();

  return (
    <div className="py-8 space-y-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      {/* Emergency Alerts */}
      {emergencyAlerts.length > 0 && (
        <div ref={refAlerts} className="max-w-7xl mx-auto mb-4">
          <div className="flex flex-col gap-2">
            {emergencyAlerts.map(alert => (
              <div key={alert.id} className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white font-semibold backdrop-blur-md bg-opacity-80 ${alert.type === 'critical' ? 'bg-red-600 animate-pulse' : 'bg-yellow-500 animate-bounce'}`}> 
                {alert.type === 'critical' ? <AlertCircle className="w-6 h-6 animate-spin-slow" /> : <AlertCircle className="w-6 h-6 text-yellow-900 animate-pulse" />}
                <span>{alert.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Links */}
      <div ref={refQuickLinks} className="max-w-7xl mx-auto flex flex-wrap gap-4 justify-end">
        {quickLinks.map(link => (
          <Button key={link.label} className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-2 px-4 py-2 rounded-lg shadow transition-transform duration-200 hover:scale-105 active:scale-95 focus:ring-2 focus:ring-indigo-400">
            <link.icon className="w-5 h-5 animate-fadeinup" />
            {link.label}
          </Button>
        ))}
      </div>

      {/* Analytics Preview */}
      <div ref={refAnalytics} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {analyticsPreview.map(stat => (
          <div key={stat.label} className="rounded-xl shadow-xl p-6 bg-gradient-to-br from-blue-100/60 to-white/80 flex flex-col items-center backdrop-blur-md animate-fadeinup">
            <div className="text-2xl font-bold text-gray-900 animate-pulse">{stat.value}</div>
            <div className="text-gray-700 text-sm font-medium mb-1">{stat.label}</div>
            <span className={`text-xs font-semibold ${stat.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'} animate-fadeinup`}>{stat.trend}</span>
          </div>
        ))}
      </div>

      {/* Inventory Overview & Staff Attendance */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Section title="Inventory Overview">
          <div ref={refInventory} className="space-y-2">
            {inventoryOverview.map(item => (
              <div key={item.item} className="flex items-center justify-between bg-white/80 rounded-lg shadow p-3 backdrop-blur-md transition-transform duration-200 hover:scale-105">
                <span>{item.item}</span>
                <span className={`font-mono px-2 py-1 rounded text-xs font-semibold transition-colors duration-300 ${item.stock < item.threshold ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-green-100 text-green-700 animate-fadeinup'}`}>{item.stock}</span>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Staff Attendance (Today)">
          <div ref={refStaffAttendance} className="space-y-2">
            {staffAttendance.map(staff => (
              <div key={staff.name} className="flex items-center gap-3 bg-white/80 rounded-lg shadow p-3 backdrop-blur-md transition-transform duration-200 hover:scale-105">
                <div className={`w-3 h-3 rounded-full animate-pulse ${staff.status === 'Present' ? 'bg-green-500' : staff.status === 'Late' ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                <span className="flex-1">{staff.name}</span>
                <span className={`text-xs font-semibold px-2 py-1 rounded transition-colors duration-300 ${staff.status === 'Present' ? 'bg-green-100 text-green-700' : staff.status === 'Late' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{staff.status}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Staff Requests & Announcements */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Section title="Recent Staff Requests">
          <div ref={refStaffRequests} className="overflow-x-auto animate-fadeinup">
            <table className="min-w-full text-sm bg-white/80 rounded-xl shadow backdrop-blur-md">
              <thead>
                <tr className="text-left border-b bg-gray-100">
                  <th className="py-2 px-3">Request ID</th>
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Type</th>
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {staffRequests.map(req => (
                  <tr key={req.id} className="border-b hover:bg-blue-50 transition">
                    <td className="py-1 px-3 font-mono">{req.id}</td>
                    <td className="py-1 px-3">{req.name}</td>
                    <td className="py-1 px-3">{req.type}</td>
                    <td className="py-1 px-3">{req.date}</td>
                    <td className="py-1 px-3">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold transition-colors duration-300 ${req.status === 'Approved' ? 'bg-green-100 text-green-700' : req.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 animate-pulse' : 'bg-red-100 text-red-700'}`}>{req.status}</span>
                    </td>
                    <td className="py-1 px-3 flex gap-2">
                      <Button className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-xs transition-transform duration-200 hover:scale-110">Approve</Button>
                      <Button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 text-xs transition-transform duration-200 hover:scale-110">Reject</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
        <Section title="Hospital Announcements">
          <div ref={refAnnouncements} className="space-y-3 animate-fadeinup">
            {announcements.map(a => (
              <div key={a.id} className="bg-white/80 rounded-lg shadow p-4 backdrop-blur-md transition-transform duration-200 hover:scale-105">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-blue-700 animate-fadeinup">{a.title}</span>
                  <span className="text-xs text-gray-400">{a.date}</span>
                </div>
                <div className="text-gray-700 text-sm animate-fadeinup">{a.content}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Discharge Summary & Maintenance Schedule */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Section title="Recent Discharges">
          <div ref={refDischarges} className="overflow-x-auto animate-fadeinup">
            <table className="min-w-full text-sm bg-white/80 rounded-xl shadow backdrop-blur-md">
              <thead>
                <tr className="text-left border-b bg-gray-100">
                  <th className="py-2 px-3">Discharge ID</th>
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Department</th>
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Summary</th>
                </tr>
              </thead>
              <tbody>
                {dischargeSummary.map(d => (
                  <tr key={d.id} className="border-b hover:bg-green-50 transition">
                    <td className="py-1 px-3 font-mono">{d.id}</td>
                    <td className="py-1 px-3">{d.name}</td>
                    <td className="py-1 px-3">{d.department}</td>
                    <td className="py-1 px-3">{d.date}</td>
                    <td className="py-1 px-3">{d.summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
        <Section title="Maintenance Schedule">
          <div ref={refMaintenance} className="space-y-2 animate-fadeinup">
            {maintenanceSchedule.map(m => (
              <div key={m.id} className="flex items-center justify-between bg-white/80 rounded-lg shadow p-3 backdrop-blur-md transition-transform duration-200 hover:scale-105">
                <span>{m.task}</span>
                <span className={`font-mono px-2 py-1 rounded text-xs font-semibold ${m.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{m.status}</span>
                <span className="text-xs text-gray-400">{m.date}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Quick Stats */}
      <div ref={refQuickStats} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fadeinup">
        {quickStats.map(stat => (
          <div key={stat.label} className={`rounded-xl shadow-md p-6 flex items-center gap-4 hover:scale-[1.03] transition-transform duration-150 ${stat.color} backdrop-blur-md bg-opacity-80 animate-fadeinup`}>
            <stat.icon className="w-10 h-10 animate-fadeinup" />
            <div>
              <div className="text-3xl font-bold animate-fadeinup">{stat.value}</div>
              <div className="text-gray-700 text-sm font-medium animate-fadeinup">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Financial Overview */}
      <div ref={refFinancials} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 animate-fadeinup">
        {Object.entries(financialOverview).map(([label, value]) => (
          <div key={label} className="bg-white/80 rounded-xl shadow p-5 text-center flex flex-col items-center backdrop-blur-md animate-fadeinup">
            <div className="uppercase text-xs text-gray-500 mb-1 tracking-wider animate-fadeinup">{label}</div>
            <div className={`text-2xl font-bold animate-fadeinup ${label === 'revenue' ? 'text-green-600' : label === 'expenses' ? 'text-red-600' : label === 'profit' ? 'text-blue-600' : 'text-yellow-600'}`}>{value}</div>
          </div>
        ))}
      </div>

      {/* Top Staff & Department Performance */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Section title="Top Performing Staff">
          <div ref={refTopStaff} className="space-y-4 animate-fadeinup">
            {topStaff.map(staff => (
              <div key={staff.name} className="flex items-center gap-4 bg-white/80 p-4 rounded-xl shadow hover:shadow-lg transition-shadow backdrop-blur-md hover:scale-105 animate-fadeinup">
                <div className="w-14 h-14 rounded-full bg-blue-200 flex items-center justify-center text-2xl font-bold text-blue-700 animate-fadeinup">
                  {staff.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-lg animate-fadeinup">{staff.name}</div>
                  <div className="text-xs text-gray-500 animate-fadeinup">{staff.role}</div>
                  <div className="text-xs text-gray-400 animate-fadeinup">Patients: {staff.patients}</div>
                </div>
                <div className="flex items-center gap-1 animate-fadeinup">
                  <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
                  <span className="font-bold text-lg animate-fadeinup">{staff.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Department Performance">
          <div ref={refDeptPerf} className="space-y-4 animate-fadeinup">
            {departmentPerformance.map(dep => (
              <div key={dep.name} className="mb-2 animate-fadeinup">
                <div className="flex justify-between text-sm mb-1 animate-fadeinup">
                  <span className="font-medium text-gray-700 animate-fadeinup">{dep.name}</span>
                  <span className="font-mono text-blue-700 animate-fadeinup">{dep.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 animate-fadeinup">
                  <div className="bg-blue-500 h-3 rounded-full transition-all animate-fadeinup" style={{ width: `${dep.progress}%`, transition: 'width 1s cubic-bezier(0.4,0,0.2,1)' }}></div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Patient Feedback & Alerts/Utilization */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Section title="Recent Patient Feedback">
          <div ref={refFeedback} className="space-y-4 animate-fadeinup">
            {patientFeedback.map((fb, idx) => (
              <div key={idx} className="bg-white/80 p-4 rounded-xl shadow flex items-center gap-4 backdrop-blur-md hover:scale-105 transition-transform animate-fadeinup">
                <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center text-lg font-bold text-green-700 animate-fadeinup">
                  {fb.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="flex-1">
                  <div className="font-semibold animate-fadeinup">{fb.name}</div>
                  <div className="text-gray-600 text-sm animate-fadeinup">"{fb.comment}"</div>
                </div>
                <div className="flex items-center gap-1 animate-fadeinup">
                  <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
                  <span className="font-bold animate-fadeinup">{fb.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </Section>
        <div className="space-y-8">
          <Section title="System Alerts">
            <div ref={refAlertsUtil} className="animate-fadeinup">
              <ul className="space-y-2">
                {systemAlerts.map(alert => (
                  <li key={alert.id} className={`flex items-center gap-2 p-3 rounded-lg shadow-sm backdrop-blur-md animate-fadeinup ${alert.type === 'warning' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                    {alert.type === 'warning' ? <AlertCircle className="w-5 h-5 animate-pulse" /> : <CheckCircle className="w-5 h-5 animate-fadeinup" />}
                    <span>{alert.message}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Section>
          <Section title="Resource Utilization">
            <ul className="space-y-2 animate-fadeinup">
              <li className="flex justify-between items-center"><span>Beds</span><span className="font-mono animate-fadeinup">{resourceUtilization.beds.used} / {resourceUtilization.beds.total}</span></li>
              <li className="flex justify-between items-center"><span>Ventilators</span><span className="font-mono animate-fadeinup">{resourceUtilization.ventilators.used} / {resourceUtilization.ventilators.total}</span></li>
              <li className="flex justify-between items-center"><span>Ambulances</span><span className="font-mono animate-fadeinup">{resourceUtilization.ambulances.used} / {resourceUtilization.ambulances.total}</span></li>
            </ul>
          </Section>
        </div>
      </div>

      {/* Admissions & Appointments */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Section title="Recent Admissions">
          <div ref={refAdmissions} className="overflow-x-auto animate-fadeinup">
            <table className="min-w-full text-sm bg-white/80 rounded-xl shadow backdrop-blur-md animate-fadeinup">
              <thead>
                <tr className="text-left border-b bg-gray-100 animate-fadeinup">
                  <th className="py-2 px-3">Patient ID</th>
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Department</th>
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAdmissions.map(adm => (
                  <tr key={adm.id} className="border-b hover:bg-blue-50 transition animate-fadeinup">
                    <td className="py-1 px-3 font-mono animate-fadeinup">{adm.id}</td>
                    <td className="py-1 px-3 animate-fadeinup">{adm.name}</td>
                    <td className="py-1 px-3 animate-fadeinup">{adm.department}</td>
                    <td className="py-1 px-3 animate-fadeinup">{adm.date}</td>
                    <td className="py-1 px-3 animate-fadeinup">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold animate-fadeinup ${adm.status === 'Admitted' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>{adm.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
        <Section title="Upcoming Appointments">
          <div ref={refAppointments} className="overflow-x-auto animate-fadeinup">
            <table className="min-w-full text-sm bg-white/80 rounded-xl shadow backdrop-blur-md animate-fadeinup">
              <thead>
                <tr className="text-left border-b bg-gray-100 animate-fadeinup">
                  <th className="py-2 px-3">Appointment ID</th>
                  <th className="py-2 px-3">Patient</th>
                  <th className="py-2 px-3">Doctor</th>
                  <th className="py-2 px-3">Time</th>
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {upcomingAppointments.map(app => (
                  <tr key={app.id} className="border-b hover:bg-green-50 transition animate-fadeinup">
                    <td className="py-1 px-3 font-mono animate-fadeinup">{app.id}</td>
                    <td className="py-1 px-3 animate-fadeinup">{app.patient}</td>
                    <td className="py-1 px-3 animate-fadeinup">{app.doctor}</td>
                    <td className="py-1 px-3 animate-fadeinup">{app.time}</td>
                    <td className="py-1 px-3 animate-fadeinup">{app.date}</td>
                    <td className="py-1 px-3 animate-fadeinup">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold animate-fadeinup ${app.status === 'Confirmed' ? 'bg-green-100 text-green-700' : app.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{app.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>

      {/* Staff Overview & Department Statistics */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Section title="Staff Overview">
          <div ref={refStaffOverview} className="animate-fadeinup">
            <StaffList />
          </div>
        </Section>
        <Section title="Department Statistics">
          <div ref={refDeptStats} className="animate-fadeinup">
            <DepartmentOverview />
          </div>
        </Section>
      </div>

      {/* Recent Activity */}
      <div className="max-w-7xl mx-auto">
        <Section title="Recent Activity">
          <div ref={refActivity} className="animate-fadeinup">
            <ActivityLogs />
          </div>
        </Section>
      </div>
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