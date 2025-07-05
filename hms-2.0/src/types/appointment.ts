interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth?: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

export interface IAppointment {
  id: string;
  patientId: string;
  patientName: string;
  patient: Patient;
  doctor: Doctor;
  date: string;
  time: string;
  department: string;
  reason: string;
  status: 'scheduled' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}
