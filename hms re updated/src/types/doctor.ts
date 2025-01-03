export interface DoctorProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  specialty: string;
  qualifications: string[];
  experience: string;
  availableSlots: TimeSlot[];
  patients: Patient[];
  appointments: Appointment[];
}

export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  lastVisit: string;
  nextAppointment?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
}