export interface Doctor {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  specialty: string;
  appointments: Appointment[];
  patients: Patient[];
  availableSlots: TimeSlot[];
  medicalRecords: MedicalRecord[];
  prescriptions: Prescription[];
  labReports: LabReport[];
}

export interface DoctorProfile extends Doctor {
  qualifications: string[];
  experience: string;
}

export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
}

export interface DoctorInfo {
  id: string;
  name: string;
  specialty: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patient: Patient;
  doctor: DoctorInfo;
  date: string;
  time: string;
  department: string;
  reason: string;
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MedicalRecord {
  id: string;
  patientName: string;
  date: string;
  diagnosis: string;
  treatment: string;
  notes: string;
}

export interface Prescription {
  id: string;
  patientName: string;
  medication: string;
  dosage: string;
  date: string;
  status: 'active' | 'inactive';
}

export interface LabReport {
  id: string;
  patientName: string;
  testName: string;
  date: string;
  status: 'pending' | 'completed';
}