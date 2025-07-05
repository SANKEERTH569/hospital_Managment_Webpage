import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { 
  Activity, Calendar, FileText, Heart, MessageSquare, User, AlertTriangle, 
  Clipboard, Award, Phone, CreditCard, DollarSign, Upload, Video, HelpCircle,
  Settings, Bell, Home, Shield, Stethoscope, BookOpen, Pill, FileCheck, Users
} from 'lucide-react';
import { 
  FaBell, FaSignOutAlt, FaCog, FaHeartbeat, FaUserAlt, FaCalendarAlt, 
  FaFlask, FaPills, FaHistory, FaCommentDots, FaBookOpen, FaHandsHelping, 
  FaPhoneAlt, FaShieldAlt, FaFileInvoiceDollar, FaCloudUploadAlt, FaVideo 
} from 'react-icons/fa';

// Import components
import { PersonalInformation } from './dashboard/PersonalInformation';
import { HealthMetrics } from './dashboard/HealthMetrics';
import { Appointments } from './dashboard/Appointments';
import { LabResults } from './dashboard/LabResults';
import { Prescriptions } from './dashboard/Prescriptions';
import { MedicalHistory } from './dashboard/MedicalHistory';
import { Messages } from './dashboard/Messages';
import { HealthTips } from './dashboard/HealthTips';
import { WellnessPrograms } from './dashboard/WellnessPrograms';
import { EmergencyContacts } from './dashboard/EmergencyContacts';
import { InsuranceInformation } from './dashboard/InsuranceInformation';
import { BillingHistory } from './dashboard/BillingHistory';
import { UploadDocuments } from './dashboard/UploadDocuments';
import { TelemedicineAppointments } from './dashboard/TelemedicineAppointments';
import { FeedbackSupport } from './dashboard/FeedbackSupport';

const mainSections = [
  { id: 'health', name: 'Health', icon: <FaHeartbeat />, subsections: [
    { id: 'metrics', name: 'Health Metrics', component: 'Health Metrics Dashboard', icon: <FaHeartbeat /> },
    { id: 'appointments', name: 'Appointments', component: 'Appointment History', icon: <FaCalendarAlt /> },
    { id: 'lab', name: 'Lab Results', component: 'Lab Results', icon: <FaFlask /> },
    { id: 'prescriptions', name: 'Prescriptions', component: 'Prescription Management', icon: <FaPills /> },
    { id: 'history', name: 'Medical History', component: 'Medical History', icon: <FaHistory /> },
  ] },
  { id: 'communication', name: 'Communication', icon: <FaCommentDots />, subsections: [
    { id: 'messages', name: 'Messages', component: 'Messages and Notifications', icon: <FaCommentDots /> },
    { id: 'telemedicine', name: 'Telemedicine', component: 'Telemedicine Appointments', icon: <FaVideo /> },
  ] },
  { id: 'resources', name: 'Resources', icon: <FaBookOpen />, subsections: [
    { id: 'tips', name: 'Health Tips', component: 'Health Tips and Articles', icon: <FaBookOpen /> },
    { id: 'wellness', name: 'Wellness Programs', component: 'Wellness Programs', icon: <FaHandsHelping /> },
  ] },
  { id: 'account', name: 'Account', icon: <FaUserAlt />, subsections: [
    { id: 'personal', name: 'Personal Info', component: 'Personal Information', icon: <FaUserAlt /> },
    { id: 'emergency', name: 'Emergency Contacts', component: 'Emergency Contacts', icon: <FaPhoneAlt /> },
    { id: 'insurance', name: 'Insurance', component: 'Insurance Information', icon: <FaShieldAlt /> },
    { id: 'billing', name: 'Billing', component: 'Billing and Payment History', icon: <FaFileInvoiceDollar /> },
    { id: 'documents', name: 'Documents', component: 'Upload Documents', icon: <FaCloudUploadAlt /> },
    { id: 'feedback', name: 'Feedback', component: 'Feedback and Support', icon: <FaCommentDots /> },
  ] },
];

// Flattened array for component mapping
const allSections = mainSections.flatMap(section => 
  section.subsections.map(subsection => ({
    id: subsection.id,
    name: subsection.name,
    component: subsection.component,
    icon: subsection.icon
  }))
);

export function Dashboard() {
  const user = useAuthStore(state => state.user);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(null);
  const [activeCategoryId, setActiveCategoryId] = useState('health');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [notifications, setNotifications] = useState(3); // Mock notification count

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  if (!user) {
    return <div className="flex items-center justify-center h-screen bg-gray-100">Please log in to view your dashboard.</div>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-blue-800 font-semibold">Loading your health dashboard...</p>
        </div>
      </div>
    );
  }

  const sectionComponents = {
    'Personal Information': <PersonalInformation />,
    'Health Metrics Dashboard': <HealthMetrics />,
    'Appointment History': <Appointments />,
    'Lab Results': <LabResults />,
    'Prescription Management': <Prescriptions />,
    'Medical History': <MedicalHistory />,
    'Messages and Notifications': <Messages />,
    'Health Tips and Articles': <HealthTips />,
    'Wellness Programs': <WellnessPrograms />,
    'Emergency Contacts': <EmergencyContacts />,
    'Insurance Information': <InsuranceInformation />,
    'Billing and Payment History': <BillingHistory />,
    'Upload Documents': <UploadDocuments />,
    'Telemedicine Appointments': <TelemedicineAppointments />,
    'Feedback and Support': <FeedbackSupport />
  };

  // Find the active section component
  const activeSection = allSections.find(section => section.component === currentSection);

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white shadow-xl z-20">
        {/* User Profile */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xl font-bold">
              {user.firstName?.charAt(0) || 'P'}
            </div>
            <div>
              <h2 className="font-bold text-gray-800">{user.firstName || 'Patient'} {user.lastName || ''}</h2>
              <p className="text-sm text-gray-500">Patient ID: {user.id || '12345'}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {mainSections.map((section) => (
            <div key={section.id} className="mb-4">
              <button 
                className={`flex items-center w-full px-4 py-2 text-left rounded-lg ${activeCategoryId === section.id ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'}`}
                onClick={() => setActiveCategoryId(section.id)}
              >
                <span className="mr-3">{section.icon}</span>
                <span className="font-medium">{section.name}</span>
              </button>
              
              {activeCategoryId === section.id && (
                <div className="mt-2 ml-6 space-y-1">
                  {section.subsections.map((subsection) => (
                    <button
                      key={subsection.id}
                      className={`flex items-center w-full px-4 py-2 text-left rounded-lg ${currentSection === subsection.component ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                      onClick={() => setCurrentSection(subsection.component)}
                    >
                      <span className="mr-3 text-sm">{subsection.icon}</span>
                      <span className="text-sm">{subsection.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors">
            <FaSignOutAlt className="mr-2" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white shadow-md z-30 px-4 py-3 flex justify-between items-center">
        <button 
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        
        <div className="flex items-center space-x-3">
          <button className="relative p-2 rounded-full text-gray-700 hover:bg-gray-100">
            <FaBell className="w-5 h-5" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                {notifications}
              </span>
            )}
          </button>
          
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-sm font-bold">
            {user.firstName?.charAt(0) || 'P'}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-40 flex">
          <div className="w-64 bg-white h-full overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-bold text-lg">Menu</h2>
              <button onClick={() => setShowMobileMenu(false)} className="p-2 rounded-md text-gray-700 hover:bg-gray-100">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-lg font-bold">
                  {user.firstName?.charAt(0) || 'P'}
                </div>
                <div>
                  <h2 className="font-bold text-gray-800">{user.firstName || 'Patient'} {user.lastName || ''}</h2>
                  <p className="text-xs text-gray-500">Patient ID: {user.id || '12345'}</p>
                </div>
              </div>
            </div>
            
            <nav className="p-4">
              {mainSections.map((section) => (
                <div key={section.id} className="mb-4">
                  <button 
                    className={`flex items-center w-full px-3 py-2 text-left rounded-lg ${activeCategoryId === section.id ? 'bg-blue-100 text-blue-800' : 'text-gray-700 hover:bg-gray-100'}`}
                    onClick={() => {
                      setActiveCategoryId(section.id);
                      if (section.subsections.length === 1) {
                        setCurrentSection(section.subsections[0].component);
                        setShowMobileMenu(false);
                      }
                    }}
                  >
                    <span className="mr-3">{section.icon}</span>
                    <span className="font-medium">{section.name}</span>
                  </button>
                  
                  {activeCategoryId === section.id && (
                    <div className="mt-2 ml-6 space-y-1">
                      {section.subsections.map((subsection) => (
                        <button
                          key={subsection.id}
                          className={`flex items-center w-full px-3 py-2 text-left rounded-lg ${currentSection === subsection.component ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                          onClick={() => {
                            setCurrentSection(subsection.component);
                            setShowMobileMenu(false);
                          }}
                        >
                          <span className="mr-3 text-sm">{subsection.icon}</span>
                          <span className="text-sm">{subsection.name}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
            
            <div className="p-4 border-t border-gray-200">
              <button className="flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors">
                <FaSignOutAlt className="mr-2" />
                Sign Out
              </button>
            </div>
          </div>
          
          <div className="flex-1" onClick={() => setShowMobileMenu(false)}></div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-0 md:pt-0 pb-16 md:pb-0 mt-14 md:mt-0">
        {currentSection ? (
          <div className="p-6">
            <div className="mb-6 flex items-center">
              <div className="mr-3 p-2 rounded-full bg-blue-100 text-blue-600">
                {activeSection?.icon}
              </div>
              <h1 className="text-2xl font-bold text-gray-800">{activeSection?.name}</h1>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                {sectionComponents[currentSection]}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-4">
              <FaHeartbeat className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Your Health Portal</h2>
            <p className="text-gray-600 max-w-md mb-8">Select a category from the sidebar to manage your health information, appointments, and more.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {mainSections.map(section => (
                <button
                  key={section.id}
                  className="p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center text-center"
                  onClick={() => {
                    setActiveCategoryId(section.id);
                    setCurrentSection(section.subsections[0].component);
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-3">
                    {section.icon}
                  </div>
                  <span className="font-medium text-gray-800">{section.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
