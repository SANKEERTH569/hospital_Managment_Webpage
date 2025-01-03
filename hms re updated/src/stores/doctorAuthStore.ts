import { create } from 'zustand';
import { DoctorProfile } from '../types/doctor';

interface DoctorAuthState {
  doctor: DoctorProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Mock doctor data
const mockDoctor: DoctorProfile = {
  id: 'd1',
  email: 'dr.smith@medicarehospitals.com',
  firstName: 'John',
  lastName: 'Smith',
  specialty: 'Cardiologist',
  qualifications: ['MD', 'FACC'],
  experience: '15+ years',
  availableSlots: [
    { day: 'Monday', startTime: '09:00', endTime: '17:00' },
    { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
    { day: 'Friday', startTime: '09:00', endTime: '13:00' },
  ],
  patients: [
    { id: 'p1', name: 'Alice Johnson', age: 45, condition: 'Hypertension', lastVisit: '2024-02-15' },
    { id: 'p2', name: 'Bob Wilson', age: 62, condition: 'Arrhythmia', lastVisit: '2024-02-20' },
  ],
  appointments: [
    { 
      id: 'a1', 
      patientId: 'p1', 
      patientName: 'Alice Johnson', 
      date: '2024-03-15', 
      time: '10:00',
      status: 'scheduled'
    },
    {
      id: 'a2',
      patientId: 'p2',
      patientName: 'Bob Wilson',
      date: '2024-03-16',
      time: '11:00',
      status: 'scheduled'
    }
  ]
};

export const useDoctorAuthStore = create<DoctorAuthState>((set) => ({
  doctor: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'dr.smith@medicarehospitals.com' && password === 'password') {
      set({ doctor: mockDoctor, isAuthenticated: true });
    } else {
      throw new Error('Invalid credentials');
    }
  },

  logout: () => {
    set({ doctor: null, isAuthenticated: false });
  }
}));