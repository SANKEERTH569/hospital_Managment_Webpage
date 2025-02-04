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
  email: 'dr.sankeerth@medicarehospitals.com',
  firstName: 'Sankeerth',
  lastName: 'Balabhadra',
  specialty: 'Cardiologist',
  qualifications: ['MD', 'FACC'],
  experience: '15+ years',
  availableSlots: [
    { day: 'Monday', startTime: '09:00', endTime: '17:00' },
    { day: 'Wednesday', startTime: '09:00', endTime: '17:00' },
    { day: 'Friday', startTime: '09:00', endTime: '13:00' },
  ],
  patients: [
    [
  { "id": "p1", "name": "Alice Johnson", "age": 45, "condition": "Hypertension", "lastVisit": "2024-02-15" },
  { "id": "p2", "name": "Bob Wilson", "age": 62, "condition": "Arrhythmia", "lastVisit": "2024-02-20" },
  { "id": "p3", "name": "Charlie Davis", "age": 54, "condition": "Diabetes", "lastVisit": "2024-01-28" },
  { "id": "p4", "name": "David Smith", "age": 39, "condition": "Asthma", "lastVisit": "2024-02-10" },
  { "id": "p5", "name": "Emma Brown", "age": 29, "condition": "Migraine", "lastVisit": "2024-01-25" },
  { "id": "p6", "name": "Frank Harris", "age": 67, "condition": "Arthritis", "lastVisit": "2024-02-05" },
  { "id": "p7", "name": "Grace Miller", "age": 50, "condition": "COPD", "lastVisit": "2024-02-12" },
  { "id": "p8", "name": "Henry White", "age": 33, "condition": "Allergy", "lastVisit": "2024-01-30" },
  { "id": "p9", "name": "Isabella Moore", "age": 47, "condition": "Thyroid Disorder", "lastVisit": "2024-02-18" },
  { "id": "p10", "name": "Jack Taylor", "age": 55, "condition": "High Cholesterol", "lastVisit": "2024-02-22" }
]


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
    
    if (email === 'dr.sankeerth@medicarehospitals.com' && password === 'password') {
      set({ doctor: mockDoctor, isAuthenticated: true });
    } else {
      throw new Error('Invalid credentials');
    }
  },

  logout: () => {
    set({ doctor: null, isAuthenticated: false });
  }
}));
