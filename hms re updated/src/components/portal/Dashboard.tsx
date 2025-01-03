import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { 
  FaUserAlt, FaHeartbeat, FaCalendarAlt, FaFlask, FaPills, 
  FaHistory, FaCommentDots, FaBookOpen, FaHandsHelping, 
  FaPhoneAlt, FaShieldAlt, FaFileInvoiceDollar, 
  FaCloudUploadAlt, FaVideo 
} from 'react-icons/fa';

import { HealthMetrics } from './dashboard/HealthMetrics';
import { Appointments } from './dashboard/Appointments';
import { Prescriptions } from './dashboard/Prescriptions';
import { LabResults } from './dashboard/LabResults';
import { PersonalInformation } from './dashboard/PersonalInformation';
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

const sections = [
  { name: 'Personal Information', icon: <FaUserAlt /> },
  { name: 'Health Metrics Dashboard', icon: <FaHeartbeat /> },
  { name: 'Appointment History', icon: <FaCalendarAlt /> },
  { name: 'Lab Results', icon: <FaFlask /> },
  { name: 'Prescription Management', icon: <FaPills /> },
  { name: 'Medical History', icon: <FaHistory /> },
  { name: 'Messages and Notifications', icon: <FaCommentDots /> },
  { name: 'Health Tips and Articles', icon: <FaBookOpen /> },
  { name: 'Wellness Programs', icon: <FaHandsHelping /> },
  { name: 'Emergency Contacts', icon: <FaPhoneAlt /> },
  { name: 'Insurance Information', icon: <FaShieldAlt /> },
  { name: 'Billing and Payment History', icon: <FaFileInvoiceDollar /> },
  { name: 'Upload Documents', icon: <FaCloudUploadAlt /> },
  { name: 'Telemedicine Appointments', icon: <FaVideo /> },
  { name: 'Feedback and Support', icon: <FaCommentDots /> }
];

export function Dashboard() {
  const user = useAuthStore(state => state.user);
  const [loading, setLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  if (!user) {
    return <div>Please log in to view your dashboard.</div>;
  }

  if (loading) {
    return <div className="loading-state">Loading...</div>;
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

  return (
    <div className="dashboard">
      <div className={`content ${currentSection ? 'expanded' : ''}`}>
        {currentSection ? (
          <div className="section-content">
            {sectionComponents[currentSection]}
          </div>
        ) : (
          <div className="placeholder">Select a section from below.</div>
        )}
      </div>
      <div className="bottom-sidebar">
        {sections.map(({ name, icon }) => (
          <button
            key={name}
            className={`menu-item ${currentSection === name ? 'active' : ''}`}
            onClick={() => setCurrentSection(name)}
          >
            {icon}
            <span>{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
