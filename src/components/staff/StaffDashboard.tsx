import React, { useRef, useEffect } from 'react';
import { Calendar, Users, Clock, FileText, CheckCircle, AlertCircle, MessageCircle, Star, ArrowRight, BellIcon } from 'lucide-react';
import { useAdminAuthStore } from '../../stores/adminAuthStore';
import { Section } from '../ui/Section';
import { TaskList } from './dashboard/TaskList';
import { PatientAssignments } from './dashboard/PatientAssignments';
import { ScheduleView } from './dashboard/ScheduleView';
import { Button } from '../ui/Button';

// --- Mock Data ---
const quickActions = [
  { label: 'Mark All Complete', icon: CheckCircle },
  { label: 'Request Shift Change', icon: Clock },
  { label: 'Send Message', icon: MessageCircle },
];

const assignedTasks = [
  { id: 'T001', task: 'Administer medication to John Doe', assignedBy: 'Dr. Lee', status: 'Pending' },
  { id: 'T002', task: 'Check vitals for Alice Johnson', assignedBy: 'Admin', status: 'In Progress' },
  { id: 'T003', task: 'Prepare room 204 for new patient', assignedBy: 'Dr. Patel', status: 'Completed' },
];

const messages = [
  { id: 1, from: 'Admin', content: 'Staff meeting at 3 PM in Conference Room A.', date: '2024-06-05' },
  { id: 2, from: 'Dr. Lee', content: 'Please update patient chart for John Doe.', date: '2024-06-04' },
];

const shiftOverview = {
  current: 6, // hours completed
  total: 8, // total shift hours
  next: 'Tomorrow, 8:00 AM',
  overtime: false,
};

const patientSummary = [
  { name: 'John Doe', room: '101', status: 'Stable' },
  { name: 'Alice Johnson', room: '204', status: 'Needs Attention' },
  { name: 'Michael Brown', room: '305', status: 'Recovering' },
];

const upcomingProcedures = [
  { id: 'P001', patient: 'John Doe', procedure: 'Blood Test', time: '10:30 AM' },
  { id: 'P002', patient: 'Alice Johnson', procedure: 'X-Ray', time: '1:00 PM' },
];

const feedback = [
  { id: 1, from: 'Dr. Lee', content: 'Great job on patient care!', date: '2024-06-04', type: 'kudos' },
  { id: 2, from: 'Admin', content: 'Please be on time for your next shift.', date: '2024-06-03', type: 'reminder' },
];

// --- More mock data for new sections ---
const shiftSwapRequests = [
  { id: 'S001', from: 'You', to: 'Nurse Tom Evans', date: '2024-06-06', status: 'Pending' },
  { id: 'S002', from: 'Dr. Priya Patel', to: 'You', date: '2024-06-07', status: 'Approved' },
];

const attendanceHistory = [
  { date: '2024-06-01', status: 'Present' },
  { date: '2024-06-02', status: 'Present' },
  { date: '2024-06-03', status: 'Late' },
  { date: '2024-06-04', status: 'Absent' },
  { date: '2024-06-05', status: 'Present' },
];

const myProfile = {
  name: 'Jane Staff',
  role: 'Registered Nurse',
  contact: 'jane.staff@hospital.com',
  phone: '+1 555-1234',
  avatar: '',
};

const notifications = [
  { id: 1, message: 'New patient assigned: John Doe', date: '2024-06-05', read: false },
  { id: 2, message: 'Shift swap approved', date: '2024-06-04', read: true },
];

const resourceRequests = [
  { id: 'RR001', item: 'Gloves', quantity: 50, status: 'Pending' },
  { id: 'RR002', item: 'IV Fluids', quantity: 20, status: 'Approved' },
];

const patientNotes = [
  { id: 'N001', patient: 'John Doe', note: 'Patient responded well to medication.', date: '2024-06-05' },
  { id: 'N002', patient: 'Alice Johnson', note: 'Monitor vitals every 2 hours.', date: '2024-06-05' },
];

const trainings = [
  { id: 'T001', title: 'Fire Safety', status: 'Completed' },
  { id: 'T002', title: 'HIPAA Compliance', status: 'Required' },
];

const teamChatPreview = [
  { id: 1, from: 'Nurse Tom', message: 'Can someone cover my shift tomorrow?', date: '2024-06-05' },
  { id: 2, from: 'Dr. Lee', message: 'Great teamwork today!', date: '2024-06-05' },
];

const quickLinks = [
  { label: 'Hospital Policies', url: '#' },
  { label: 'Emergency Contacts', url: '#' },
  { label: 'Staff Directory', url: '#' },
  { label: 'Support Portal', url: '#' },
];
// --- End Mock Data ---

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

export function StaffDashboard() {
  const staff = useAdminAuthStore(state => state.user);
  if (!staff || staff.role !== 'staff') return null;

  // Animation refs
  const refActions = useAnimateOnScroll();
  const refShift = useAnimateOnScroll();
  const refTasks = useAnimateOnScroll();
  const refMessages = useAnimateOnScroll();
  const refPatients = useAnimateOnScroll();
  const refProcedures = useAnimateOnScroll();
  const refFeedback = useAnimateOnScroll();
  const refSwap = useAnimateOnScroll();
  const refAttendance = useAnimateOnScroll();
  const refProfile = useAnimateOnScroll();
  const refNotifications = useAnimateOnScroll();
  const refResource = useAnimateOnScroll();
  const refNotes = useAnimateOnScroll();
  const refTraining = useAnimateOnScroll();
  const refChat = useAnimateOnScroll();
  const refLinks = useAnimateOnScroll();

  // Shift progress percent
  const shiftPercent = Math.min(100, Math.round((shiftOverview.current / shiftOverview.total) * 100));

  return (
    <div className="py-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen space-y-10 relative">
      {/* Floating Help Button */}
      <button className="fixed bottom-8 right-8 z-50 bg-blue-600 text-white rounded-full shadow-lg p-4 hover:bg-blue-700 transition-all animate-fadeinup flex items-center gap-2">
        <MessageCircle className="w-6 h-6 animate-bounce" />
        Help
      </button>

      {/* Notifications Bell */}
      <div ref={refNotifications} className="fixed top-8 right-8 z-40 animate-fadeinup">
        <div className="relative">
          <button className="bg-white/80 rounded-full p-3 shadow-lg hover:scale-110 transition-all focus:ring-2 focus:ring-blue-400">
            <BellIcon />
            {notifications.some(n => !n.read) && (
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </button>
          {/* Dropdown preview */}
          <div className="absolute right-0 mt-2 w-64 bg-white/90 rounded-lg shadow-lg p-4 animate-fadeinup">
            <div className="font-semibold mb-2">Notifications</div>
            {notifications.map(n => (
              <div key={n.id} className={`text-sm mb-1 flex items-center gap-2 ${n.read ? 'text-gray-500' : 'text-blue-700 font-bold'}`}>{n.message}<span className="ml-auto text-xs text-gray-400">{n.date}</span></div>
            ))}
          </div>
        </div>
      </div>

      {/* My Profile & Quick Links */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div ref={refProfile} className="bg-white/80 rounded-xl shadow p-6 flex flex-col items-center gap-3 backdrop-blur-md animate-fadeinup">
          <div className="w-20 h-20 rounded-full bg-blue-200 flex items-center justify-center text-3xl font-bold text-blue-700 animate-fadeinup">
            {myProfile.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div className="font-semibold text-lg animate-fadeinup">{myProfile.name}</div>
          <div className="text-xs text-gray-500 animate-fadeinup">{myProfile.role}</div>
          <div className="text-xs text-gray-500 animate-fadeinup">{myProfile.contact}</div>
          <div className="text-xs text-gray-500 animate-fadeinup">{myProfile.phone}</div>
          <Button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded animate-fadeinup">Edit Profile</Button>
        </div>
        <div ref={refLinks} className="col-span-2 flex flex-wrap gap-4 items-center animate-fadeinup">
          {quickLinks.map(link => (
            <a key={link.label} href={link.url} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg shadow hover:bg-blue-200 transition-all animate-fadeinup">{link.label}</a>
          ))}
        </div>
      </div>

      {/* Shift Swap Requests & Attendance History */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Section title="Shift Swap Requests">
          <div ref={refSwap} className="overflow-x-auto animate-fadeinup">
            <table className="min-w-full text-sm bg-white/80 rounded-xl shadow backdrop-blur-md animate-fadeinup">
              <thead>
                <tr className="text-left border-b bg-gray-100 animate-fadeinup">
                  <th className="py-2 px-3">Request ID</th>
                  <th className="py-2 px-3">From</th>
                  <th className="py-2 px-3">To</th>
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {shiftSwapRequests.map(req => (
                  <tr key={req.id} className="border-b hover:bg-blue-50 transition animate-fadeinup">
                    <td className="py-1 px-3 font-mono animate-fadeinup">{req.id}</td>
                    <td className="py-1 px-3 animate-fadeinup">{req.from}</td>
                    <td className="py-1 px-3 animate-fadeinup">{req.to}</td>
                    <td className="py-1 px-3 animate-fadeinup">{req.date}</td>
                    <td className="py-1 px-3 animate-fadeinup">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold animate-fadeinup ${req.status === 'Approved' ? 'bg-green-100 text-green-700' : req.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 animate-pulse' : 'bg-red-100 text-red-700'}`}>{req.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
        <Section title="Attendance History">
          <div ref={refAttendance} className="space-y-2 animate-fadeinup">
            {attendanceHistory.map(a => (
              <div key={a.date} className="flex items-center gap-3 bg-white/80 rounded-lg shadow p-3 backdrop-blur-md animate-fadeinup">
                <Calendar className="w-5 h-5 text-blue-500 animate-fadeinup" />
                <span className="flex-1 font-mono animate-fadeinup">{a.date}</span>
                <span className={`text-xs font-semibold px-2 py-1 rounded animate-fadeinup ${a.status === 'Present' ? 'bg-green-100 text-green-700' : a.status === 'Late' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{a.status}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Resource Requests & Patient Notes */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Section title="Resource Requests">
          <div ref={refResource} className="overflow-x-auto animate-fadeinup">
            <table className="min-w-full text-sm bg-white/80 rounded-xl shadow backdrop-blur-md animate-fadeinup">
              <thead>
                <tr className="text-left border-b bg-gray-100 animate-fadeinup">
                  <th className="py-2 px-3">Request ID</th>
                  <th className="py-2 px-3">Item</th>
                  <th className="py-2 px-3">Quantity</th>
                  <th className="py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {resourceRequests.map(req => (
                  <tr key={req.id} className="border-b hover:bg-blue-50 transition animate-fadeinup">
                    <td className="py-1 px-3 font-mono animate-fadeinup">{req.id}</td>
                    <td className="py-1 px-3 animate-fadeinup">{req.item}</td>
                    <td className="py-1 px-3 animate-fadeinup">{req.quantity}</td>
                    <td className="py-1 px-3 animate-fadeinup">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-semibold animate-fadeinup ${req.status === 'Approved' ? 'bg-green-100 text-green-700' : req.status === 'Pending' ? 'bg-yellow-100 text-yellow-700 animate-pulse' : 'bg-red-100 text-red-700'}`}>{req.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
        <Section title="Patient Notes">
          <div ref={refNotes} className="space-y-2 animate-fadeinup">
            {patientNotes.map(note => (
              <div key={note.id} className="bg-white/80 rounded-lg shadow p-4 backdrop-blur-md animate-fadeinup">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-blue-700 animate-fadeinup">{note.patient}</span>
                  <span className="text-xs text-gray-400 animate-fadeinup">{note.date}</span>
                </div>
                <div className="text-gray-700 text-sm animate-fadeinup">{note.note}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Training/Compliance & Team Chat Preview */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Section title="Training & Compliance">
          <div ref={refTraining} className="space-y-2 animate-fadeinup">
            {trainings.map(t => (
              <div key={t.id} className="flex items-center gap-3 bg-white/80 rounded-lg shadow p-3 backdrop-blur-md animate-fadeinup">
                <CheckCircle className={`w-5 h-5 ${t.status === 'Completed' ? 'text-green-500 animate-pulse' : 'text-yellow-500 animate-fadeinup'}`} />
                <span className="flex-1 animate-fadeinup">{t.title}</span>
                <span className={`text-xs font-semibold px-2 py-1 rounded animate-fadeinup ${t.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{t.status}</span>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Team Chat Preview">
          <div ref={refChat} className="space-y-2 animate-fadeinup">
            {teamChatPreview.map(msg => (
              <div key={msg.id} className="bg-white/80 rounded-lg shadow p-4 backdrop-blur-md flex items-center gap-3 animate-fadeinup">
                <MessageCircle className="w-5 h-5 text-blue-500 animate-fadeinup" />
                <div className="flex-1 animate-fadeinup">
                  <span className="font-semibold text-blue-700 animate-fadeinup">{msg.from}:</span> <span className="text-gray-700 text-sm animate-fadeinup">{msg.message}</span>
                </div>
                <span className="text-xs text-gray-400 animate-fadeinup">{msg.date}</span>
              </div>
            ))}
            <Button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded animate-fadeinup flex items-center gap-2">Go to Chat <ArrowRight className="w-4 h-4 animate-fadeinup" /></Button>
          </div>
        </Section>
      </div>

      <Section title={`Welcome, ${staff.firstName}!`} className="mb-12">
        {/* Quick Actions */}
        <div ref={refActions} className="flex flex-wrap gap-4 mb-8 animate-fadeinup">
          {quickActions.map(action => (
            <Button key={action.label} className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 px-4 py-2 rounded-lg shadow transition-transform duration-200 hover:scale-105 active:scale-95 focus:ring-2 focus:ring-blue-400">
              <action.icon className="w-5 h-5 animate-fadeinup" />
              {action.label}
            </Button>
          ))}
        </div>
        {/* Shift Overview */}
        <div ref={refShift} className="mb-8 animate-fadeinup">
          <div className="bg-white/80 rounded-xl shadow p-6 flex flex-col md:flex-row items-center gap-6 backdrop-blur-md">
            <div className="flex-1">
              <div className="text-lg font-semibold mb-2">Current Shift</div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-6 h-6 text-blue-500 animate-pulse" />
                <span className="font-mono text-xl">{shiftOverview.current} / {shiftOverview.total} hrs</span>
                {shiftOverview.overtime && <span className="ml-2 px-2 py-1 rounded bg-red-100 text-red-700 text-xs animate-pulse">Overtime</span>}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div className="bg-blue-500 h-3 rounded-full transition-all animate-fadeinup" style={{ width: `${shiftPercent}%`, transition: 'width 1s cubic-bezier(0.4,0,0.2,1)' }}></div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-1">Next Shift</div>
              <div className="font-semibold text-blue-700">{shiftOverview.next}</div>
            </div>
          </div>
        </div>
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fadeinup">
          <DashboardCard title="Assigned Patients" value="8" icon={Users} />
          <DashboardCard title="Today's Tasks" value="5" icon={FileText} />
          <DashboardCard title="Shift Hours" value="8:00 - 16:00" icon={Clock} />
          <DashboardCard title="Next Shift" value="Tomorrow" icon={Calendar} />
        </div>
      </Section>

      {/* Assigned Tasks & Messages */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Section title="Assigned Tasks">
          <div ref={refTasks} className="space-y-3 animate-fadeinup">
            {assignedTasks.map(task => (
              <div key={task.id} className="flex items-center gap-4 bg-white/80 p-4 rounded-xl shadow hover:shadow-lg transition-shadow backdrop-blur-md hover:scale-105 animate-fadeinup">
                <div className={`w-3 h-3 rounded-full ${task.status === 'Completed' ? 'bg-green-500 animate-pulse' : task.status === 'In Progress' ? 'bg-yellow-500 animate-pulse' : 'bg-blue-500 animate-fadeinup'}`}></div>
                <div className="flex-1">
                  <div className="font-semibold text-lg animate-fadeinup">{task.task}</div>
                  <div className="text-xs text-gray-500 animate-fadeinup">Assigned by: {task.assignedBy}</div>
                </div>
                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold animate-fadeinup ${task.status === 'Completed' ? 'bg-green-100 text-green-700' : task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'}`}>{task.status}</span>
                <Button className="ml-2 bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-xs transition-transform duration-200 hover:scale-110">
                  Mark Complete
                </Button>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Messages & Announcements">
          <div ref={refMessages} className="space-y-3 animate-fadeinup">
            {messages.map(m => (
              <div key={m.id} className="bg-white/80 rounded-lg shadow p-4 backdrop-blur-md transition-transform duration-200 hover:scale-105 animate-fadeinup">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-blue-700 animate-fadeinup">{m.from}</span>
                  <span className="text-xs text-gray-400 animate-fadeinup">{m.date}</span>
                </div>
                <div className="text-gray-700 text-sm animate-fadeinup">{m.content}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Patient Assignment Summary & Upcoming Procedures */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Section title="Patient Assignment Summary">
          <div ref={refPatients} className="space-y-3 animate-fadeinup">
            {patientSummary.map(p => (
              <div key={p.name} className="flex items-center gap-4 bg-white/80 p-4 rounded-xl shadow hover:shadow-lg transition-shadow backdrop-blur-md hover:scale-105 animate-fadeinup">
                <Users className="w-8 h-8 text-blue-500 animate-fadeinup" />
                <div className="flex-1">
                  <div className="font-semibold text-lg animate-fadeinup">{p.name}</div>
                  <div className="text-xs text-gray-500 animate-fadeinup">Room: {p.room}</div>
                </div>
                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold animate-fadeinup ${p.status === 'Stable' ? 'bg-green-100 text-green-700' : p.status === 'Needs Attention' ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-yellow-100 text-yellow-700'}`}>{p.status}</span>
              </div>
            ))}
          </div>
        </Section>
        <Section title="Upcoming Procedures">
          <div ref={refProcedures} className="space-y-3 animate-fadeinup">
            {upcomingProcedures.map(proc => (
              <div key={proc.id} className="flex items-center gap-4 bg-white/80 p-4 rounded-xl shadow hover:shadow-lg transition-shadow backdrop-blur-md hover:scale-105 animate-fadeinup">
                <FileText className="w-8 h-8 text-purple-500 animate-fadeinup" />
                <div className="flex-1">
                  <div className="font-semibold text-lg animate-fadeinup">{proc.procedure}</div>
                  <div className="text-xs text-gray-500 animate-fadeinup">Patient: {proc.patient}</div>
                </div>
                <span className="inline-block px-2 py-1 rounded text-xs font-semibold bg-blue-100 text-blue-700 animate-fadeinup">{proc.time}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Performance/Feedback */}
      <div className="max-w-7xl mx-auto">
        <Section title="Performance & Feedback">
          <div ref={refFeedback} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeinup">
            {feedback.map(fb => (
              <div key={fb.id} className={`rounded-xl shadow p-5 flex flex-col gap-2 items-start bg-white/80 backdrop-blur-md animate-fadeinup ${fb.type === 'kudos' ? 'border-l-4 border-green-400' : 'border-l-4 border-yellow-400'}`}>
                <div className="flex items-center gap-2">
                  {fb.type === 'kudos' ? <Star className="w-5 h-5 text-green-500 animate-pulse" /> : <AlertCircle className="w-5 h-5 text-yellow-500 animate-pulse" />}
                  <span className="font-semibold animate-fadeinup">{fb.from}</span>
                  <span className="text-xs text-gray-400 animate-fadeinup">{fb.date}</span>
                </div>
                <div className="text-gray-700 text-sm animate-fadeinup">{fb.content}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Existing TaskList, PatientAssignments, ScheduleView */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
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
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-4 animate-fadeinup">
      <Icon className="w-10 h-10 text-blue-500 animate-fadeinup" />
      <div>
        <h3 className="text-lg font-medium text-gray-700 animate-fadeinup">{title}</h3>
        <p className="text-2xl font-bold text-gray-900 animate-fadeinup">{value}</p>
      </div>
    </div>
  );
}
