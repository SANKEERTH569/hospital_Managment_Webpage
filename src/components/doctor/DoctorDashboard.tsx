import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDoctorAuthStore } from '../../stores/doctorAuthStore';
import { Button } from '../ui/Button';
import { AddMedicalRecord } from './dashboard/AddMedicalRecord';
import { AddPrescription } from './dashboard/AddPrescription';
import { AppointmentList } from './dashboard/AppointmentList';
import { AppointmentScheduler } from './dashboard/AppointmentScheduler';
import { DoctorAnalytics } from './dashboard/DoctorAnalytics';
import { DoctorProfile } from './dashboard/DoctorProfile';
import { LabReports } from './dashboard/LabReports';
import { MedicalRecords } from './dashboard/MedicalRecords';
import { PatientDetails } from './dashboard/PatientDetails';
import { PatientList } from './dashboard/PatientList';
import { PrescriptionManager } from './dashboard/PrescriptionManager';
import { ScheduleManager } from './dashboard/ScheduleManager';
import { UploadLabReport } from './dashboard/UploadLabReport';
import {
  LayoutDashboard, FilePlus2, Pill, CalendarDays, CalendarPlus, BarChart3,
  UserCircle, Beaker, ClipboardList, UserSearch, Users, FileText, Clock,
  UploadCloud, LogOut, Bell, MessageSquare, UserPlus, Edit2, Trash2, Plus, X
} from 'lucide-react';
import { Messages } from '../../../src/components/portal/dashboard/Messages';

const sidebarLinks = [
  { label: 'Dashboard', key: 'dashboard', icon: LayoutDashboard },
  { label: 'Appointments', key: 'appointmentList', icon: CalendarDays },
  { label: 'Schedule Appointment', key: 'scheduleAppointment', icon: CalendarPlus, modal: true },
  { label: 'Patients', key: 'patientList', icon: Users },
  { label: 'Add Patient', key: 'addPatient', icon: UserPlus, modal: true },
  { label: 'Medical Records', key: 'medicalRecords', icon: ClipboardList },
  { label: 'Add Medical Record', key: 'addMedicalRecord', icon: FilePlus2, modal: true },
  { label: 'Prescriptions', key: 'prescriptionManager', icon: FileText },
  { label: 'Add Prescription', key: 'addPrescription', icon: Pill, modal: true },
  { label: 'Lab Reports', key: 'labReports', icon: Beaker },
  { label: 'Upload Lab Report', key: 'uploadLabReport', icon: UploadCloud, modal: true },
  { label: 'Schedule', key: 'scheduleManager', icon: Clock },
  { label: 'Messages', key: 'messages', icon: MessageSquare },
  { label: 'Analytics', key: 'doctorAnalytics', icon: BarChart3 },
  { label: 'Profile', key: 'doctorProfile', icon: UserCircle },
  { label: 'Settings', key: 'settings', icon: LayoutDashboard },
  { label: 'Logout', key: 'logout', icon: LogOut },
];

// Rich mock data for all features
const mockAppointments = [
  {
    id: '1', patientName: 'John Doe', date: '2024-06-01', time: '10:00', status: 'confirmed' as const, reason: 'Routine Checkup', patientId: 'p1', doctorId: 'd1', department: 'Cardiology', notes: 'Bring previous reports.', patient: { id: 'p1', name: 'John Doe', email: 'john@example.com', phone: '555-1234' }, doctor: { id: 'd1', name: 'Dr. Smith', specialty: 'Cardiology' }
  },
  {
    id: '2', patientName: 'Jane Smith', date: '2024-06-02', time: '14:30', status: 'scheduled' as const, reason: 'Follow-up', patientId: 'p2', doctorId: 'd1', department: 'Dermatology', notes: '', patient: { id: 'p2', name: 'Jane Smith', email: 'jane@example.com', phone: '555-5678' }, doctor: { id: 'd1', name: 'Dr. Smith', specialty: 'Cardiology' }
  },
  {
    id: '3', patientName: 'Alice Brown', date: '2024-06-03', time: '09:00', status: 'completed' as const, reason: 'Consultation', patientId: 'p3', doctorId: 'd1', department: 'Neurology', notes: 'Discuss MRI results.', patient: { id: 'p3', name: 'Alice Brown', email: 'alice@example.com', phone: '555-9999' }, doctor: { id: 'd1', name: 'Dr. Smith', specialty: 'Cardiology' }
  },
  {
    id: '4', patientName: 'Bob Lee', date: '2024-06-04', time: '11:00', status: 'cancelled' as const, reason: 'Surgery', patientId: 'p4', doctorId: 'd1', department: 'Surgery', notes: 'Cancelled by patient.', patient: { id: 'p4', name: 'Bob Lee', email: 'bob@example.com', phone: '555-8888' }, doctor: { id: 'd1', name: 'Dr. Smith', specialty: 'Cardiology' }
  },
];
const mockPatients = [
  { id: 'p1', name: 'John Doe', email: 'john@example.com', phone: '555-1234', dateOfBirth: '1980-01-01' },
  { id: 'p2', name: 'Jane Smith', email: 'jane@example.com', phone: '555-5678', dateOfBirth: '1990-05-12' },
  { id: 'p3', name: 'Alice Brown', email: 'alice@example.com', phone: '555-9999', dateOfBirth: '1975-09-23' },
  { id: 'p4', name: 'Bob Lee', email: 'bob@example.com', phone: '555-8888', dateOfBirth: '1985-03-15' },
];
const mockMedicalRecords = [
  { id: 'mr1', patientName: 'John Doe', date: '2024-05-20', diagnosis: 'Hypertension', treatment: 'Amlodipine 5mg daily', notes: 'Monitor blood pressure.' },
  { id: 'mr2', patientName: 'Jane Smith', date: '2024-05-22', diagnosis: 'Eczema', treatment: 'Topical hydrocortisone', notes: 'Avoid allergens.' },
  { id: 'mr3', patientName: 'Alice Brown', date: '2024-05-25', diagnosis: 'Migraine', treatment: 'Sumatriptan as needed', notes: 'Track triggers.' },
];
const mockPrescriptions = [
  { id: 'pr1', patientName: 'John Doe', medication: 'Amlodipine', dosage: '5mg', date: '2024-05-20', status: 'active' as const },
  { id: 'pr2', patientName: 'Jane Smith', medication: 'Hydrocortisone', dosage: '1%', date: '2024-05-22', status: 'inactive' as const },
  { id: 'pr3', patientName: 'Alice Brown', medication: 'Sumatriptan', dosage: '50mg', date: '2024-05-25', status: 'active' as const },
];
const mockLabReports = [
  { id: 'lr1', patientName: 'John Doe', testName: 'Blood Test', date: '2024-05-21', status: 'completed' as const },
  { id: 'lr2', patientName: 'Jane Smith', testName: 'Allergy Panel', date: '2024-05-23', status: 'pending' as const },
  { id: 'lr3', patientName: 'Alice Brown', testName: 'MRI', date: '2024-05-26', status: 'completed' as const },
];
const mockSlots = [
  { day: 'Monday', startTime: '09:00', endTime: '12:00' },
  { day: 'Wednesday', startTime: '14:00', endTime: '17:00' },
  { day: 'Friday', startTime: '10:00', endTime: '13:00' },
];
const mockMessages = [
  { id: 'm1', from: 'Reception', subject: 'New patient assigned', body: 'You have a new patient: John Doe.', date: '2024-05-30' },
  { id: 'm2', from: 'Lab', subject: 'Lab report ready', body: 'Lab report for Jane Smith is now available.', date: '2024-05-29' },
  { id: 'm3', from: 'Admin', subject: 'Schedule update', body: 'Your Friday slot has been updated.', date: '2024-05-28' },
];
const mockAnalytics = {
  totalPatients: 120,
  totalAppointments: 340,
  completedAppointments: 300,
  revenue: 50000,
  avgSatisfaction: 4.7,
};
const mockDoctorProfile = {
  id: 'd1',
  firstName: 'Maria',
  lastName: 'Rodriguez',
  email: 'dr.rodriguez@hospital.com',
  specialty: 'Cardiology',
  appointments: mockAppointments,
  patients: mockPatients,
  availableSlots: mockSlots,
  medicalRecords: mockMedicalRecords,
  prescriptions: mockPrescriptions,
  labReports: mockLabReports,
  qualifications: ['MD', 'PhD', 'FACC'],
  experience: '15 years',
};

const DashboardContent = () => {
  const { currentDoctor } = useDoctorAuthStore();
  const stats = { total: 25, upcoming: 8, completed: 15, cancelled: 2 }; // Placeholder

  const StatCard = ({ title, value, icon: Icon, colorClass }: any) => (
    <div className={`bg-white p-6 rounded-2xl shadow-lg border-l-4 ${colorClass} transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-full">
          <Icon className="w-6 h-6 text-gray-600" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800">Welcome back, Dr. {currentDoctor?.lastName}!</h2>
        <p className="text-gray-500 mt-1">Here's a quick overview of your day.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Appointments" value={stats.total} icon={CalendarDays} colorClass="border-blue-500" />
        <StatCard title="Upcoming" value={stats.upcoming} icon={Clock} colorClass="border-yellow-500" />
        <StatCard title="Completed" value={stats.completed} icon={ClipboardList} colorClass="border-green-500" />
        <StatCard title="Cancelled" value={stats.cancelled} icon={UserCircle} colorClass="border-red-500" />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
        <p className="text-gray-500">No recent activity to show.</p>
      </div>
    </div>
  );
};

const Settings = () => (
  <div className="bg-white p-8 rounded-2xl shadow-lg text-center text-gray-500">Settings page coming soon.</div>
);

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const { currentDoctor, logout } = useDoctorAuthStore();
  const [selectedPage, setSelectedPage] = useState('dashboard');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [patients, setPatients] = useState(mockPatients);
  const [addPatientForm, setAddPatientForm] = useState({ name: '', email: '', phone: '', dateOfBirth: '' });
  const [addPatientError, setAddPatientError] = useState('');
  const [slots, setSlots] = useState(mockSlots);
  const [slotModal, setSlotModal] = useState<{ open: boolean; mode: 'add' | 'edit'; slotIndex?: number }>({ open: false, mode: 'add' });
  const [slotForm, setSlotForm] = useState({ day: '', startTime: '', endTime: '' });
  const [slotError, setSlotError] = useState('');
  
  if (!currentDoctor) {
    // Or a redirect: useEffect(() => { if (!currentDoctor) navigate('/doctor/login'); }, [currentDoctor, navigate]);
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-700">Loading...</p>
      </div>
    );
  }

  const handleSidebarClick = (link: any) => {
    if (link.key === 'logout') {
      logout();
      navigate('/doctor/login');
      return;
    }
    if (link.modal) {
      setActiveModal(link.key);
    } else {
      setSelectedPage(link.key);
    }
  };

  const pageTitle = sidebarLinks.find(link => link.key === selectedPage)?.label || 'Dashboard';
  
  const handleAddPatientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddPatientForm({ ...addPatientForm, [e.target.name]: e.target.value });
  };

  const handleAddPatientSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addPatientForm.name || !addPatientForm.email || !addPatientForm.phone) {
      setAddPatientError('Please fill in all required fields.');
      return;
    }
    setPatients([
      ...patients,
      {
        id: `p${patients.length + 1}`,
        name: addPatientForm.name,
        email: addPatientForm.email,
        phone: addPatientForm.phone,
        dateOfBirth: addPatientForm.dateOfBirth,
      },
    ]);
    setAddPatientForm({ name: '', email: '', phone: '', dateOfBirth: '' });
    setAddPatientError('');
    setActiveModal(null);
    setSelectedPage('patientList');
  };

  const openAddSlot = () => {
    setSlotForm({ day: '', startTime: '', endTime: '' });
    setSlotError('');
    setSlotModal({ open: true, mode: 'add' });
  };
  const openEditSlot = (index: number) => {
    setSlotForm(slots[index]);
    setSlotError('');
    setSlotModal({ open: true, mode: 'edit', slotIndex: index });
  };
  const closeSlotModal = () => {
    setSlotModal({ open: false, mode: 'add' });
    setSlotError('');
  };
  const handleSlotFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSlotForm({ ...slotForm, [e.target.name]: e.target.value });
  };
  const handleSlotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation
    if (!slotForm.day || !slotForm.startTime || !slotForm.endTime) {
      setSlotError('All fields are required.');
      return;
    }
    if (slotForm.startTime >= slotForm.endTime) {
      setSlotError('Start time must be before end time.');
      return;
    }
    // Check for overlap/duplicate
    const overlap = slots.some((s, idx) =>
      idx !== slotModal.slotIndex &&
      s.day === slotForm.day &&
      ((slotForm.startTime >= s.startTime && slotForm.startTime < s.endTime) ||
       (slotForm.endTime > s.startTime && slotForm.endTime <= s.endTime) ||
       (slotForm.startTime <= s.startTime && slotForm.endTime >= s.endTime))
    );
    if (overlap) {
      setSlotError('This slot overlaps with an existing slot.');
      return;
    }
    if (slotModal.mode === 'add') {
      setSlots([...slots, { ...slotForm }]);
    } else if (slotModal.mode === 'edit' && slotModal.slotIndex !== undefined) {
      const updated = [...slots];
      updated[slotModal.slotIndex] = { ...slotForm };
      setSlots(updated);
    }
    closeSlotModal();
  };
  const handleRemoveSlot = (index: number) => {
    setSlots(slots.filter((_, i) => i !== index));
  };

  const renderPageContent = () => {
    switch (selectedPage) {
      case 'dashboard':
        return <DashboardContent />;
      case 'appointmentList':
        return <AppointmentList appointments={mockAppointments} onScheduleNew={() => setActiveModal('scheduleAppointment')} />;
      case 'patientList':
        return <PatientList patients={patients} />;
      case 'medicalRecords':
        return <MedicalRecords records={mockMedicalRecords} />;
      case 'prescriptionManager':
        return <PrescriptionManager prescriptions={mockPrescriptions} />;
      case 'labReports':
        return <LabReports reports={mockLabReports} />;
      case 'scheduleManager':
        return (
          <div className="p-6 sm:p-10">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-extrabold tracking-tight text-blue-900">Schedule</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {slots.map((slot, idx) => (
                <div
                  key={slot.day + slot.startTime}
                  className="relative bg-white/60 backdrop-blur-md border border-blue-100 rounded-3xl shadow-xl p-7 flex flex-col gap-4 transition-transform hover:-translate-y-1 hover:shadow-2xl"
                  style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(99,102,241,0.10) 100%)' }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-sm shadow">
                      <CalendarDays className="w-4 h-4 mr-1" /> {slot.day}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-lg font-semibold text-blue-900">
                    <Clock className="w-5 h-5 text-blue-400" />
                    {slot.startTime} - {slot.endTime}
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => openEditSlot(idx)}
                      className="p-2 rounded-full bg-blue-50 hover:bg-blue-200 text-blue-700 transition"
                      title="Edit Slot"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleRemoveSlot(idx)}
                      className="p-2 rounded-full bg-red-50 hover:bg-red-200 text-red-600 transition"
                      title="Remove Slot"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Floating Add Slot Button */}
            <button
              onClick={openAddSlot}
              className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-bold shadow-2xl hover:scale-105 hover:shadow-3xl transition-all text-lg"
              title="Add Slot"
            >
              <Plus className="w-6 h-6" /> Add Slot
            </button>
            {/* Slot Modal */}
            {slotModal.open && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 transition-opacity animate-fade-in">
                <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-auto p-0 overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <h2 className="text-xl font-bold text-blue-900">{slotModal.mode === 'add' ? 'Add Slot' : 'Edit Slot'}</h2>
                    <button onClick={closeSlotModal} className="p-1 rounded-full hover:bg-gray-200 transition" title="Close">
                      <X className="w-6 h-6 text-gray-500" />
                    </button>
                  </div>
                  <form onSubmit={handleSlotSubmit} className="space-y-4 px-6 py-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Day<span className="text-red-500">*</span></label>
                      <select name="day" value={slotForm.day} onChange={handleSlotFormChange} className="w-full border rounded-xl px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500" required>
                        <option value="">Select day</option>
                        {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">Start Time<span className="text-red-500">*</span></label>
                        <input type="time" name="startTime" value={slotForm.startTime} onChange={handleSlotFormChange} className="w-full border rounded-xl px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500" required />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">End Time<span className="text-red-500">*</span></label>
                        <input type="time" name="endTime" value={slotForm.endTime} onChange={handleSlotFormChange} className="w-full border rounded-xl px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500" required />
                      </div>
                    </div>
                    {slotError && <div className="text-red-500 text-sm">{slotError}</div>}
                    <div className="flex justify-end gap-2 mt-8">
                      <button type="button" onClick={closeSlotModal} className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300 font-semibold">Cancel</button>
                      <button type="submit" className="px-4 py-2 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 text-white font-bold hover:scale-105 transition-all">{slotModal.mode === 'add' ? 'Add' : 'Save'}</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        );
      case 'doctorAnalytics':
        return <DoctorAnalytics analytics={mockAnalytics} />;
      case 'doctorProfile':
        return <DoctorProfile doctor={mockDoctorProfile} />;
      case 'messages':
        return <Messages />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardContent />;
    }
  };
  
  const renderModal = () => {
    switch (activeModal) {
      case 'scheduleAppointment':
        return <AppointmentScheduler patients={[]} onClose={() => setActiveModal(null)} onSchedule={() => setActiveModal(null)} />;
      case 'addMedicalRecord':
        return <AddMedicalRecord patients={[]} onClose={() => setActiveModal(null)} onSave={() => setActiveModal(null)} />;
      case 'addPrescription':
        return <AddPrescription patients={[]} onClose={() => setActiveModal(null)} onSave={() => setActiveModal(null)} />;
      case 'uploadLabReport':
        return <UploadLabReport patients={[]} onClose={() => setActiveModal(null)} onUpload={() => setActiveModal(null)} />;
      case 'addPatient':
        return (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-blue-900">Add New Patient</h2>
              <form onSubmit={handleAddPatientSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name<span className="text-red-500">*</span></label>
                  <input type="text" name="name" value={addPatientForm.name} onChange={handleAddPatientChange} className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email<span className="text-red-500">*</span></label>
                  <input type="email" name="email" value={addPatientForm.email} onChange={handleAddPatientChange} className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone<span className="text-red-500">*</span></label>
                  <input type="text" name="phone" value={addPatientForm.phone} onChange={handleAddPatientChange} className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                  <input type="date" name="dateOfBirth" value={addPatientForm.dateOfBirth} onChange={handleAddPatientChange} className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring-2 focus:ring-blue-500" />
                </div>
                {addPatientError && <div className="text-red-500 text-sm">{addPatientError}</div>}
                <div className="flex justify-end gap-2 mt-6">
                  <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Add Patient</button>
                </div>
              </form>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-gray-200 text-center">
          <h1 className="text-xl font-bold text-blue-600">MediCare+</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map(link => (
            <button
              key={link.key}
              onClick={() => handleSidebarClick(link)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-semibold ${
                (selectedPage === link.key || activeModal === link.key) && link.key !== 'logout'
                  ? 'bg-blue-600 text-white shadow-md'
                  : link.key === 'logout'
                  ? 'text-red-600 hover:bg-red-50'
                  : 'text-gray-600 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <link.icon className="w-5 h-5" />
              <span>{link.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50">
            <UserCircle className="w-10 h-10 text-gray-400" />
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-800">Dr. {currentDoctor.lastName}</p>
              <p className="text-xs text-gray-500">{currentDoctor.specialty}</p>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between h-16 px-8">
            <h2 className="text-xl font-bold text-gray-800">{pageTitle}</h2>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <LayoutDashboard className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </header>
        <main className="flex-1 p-8 overflow-y-auto">
          {renderPageContent()}
        </main>
      </div>
      
      {/* Modals */}
      {renderModal()}
    </div>
  );
}
