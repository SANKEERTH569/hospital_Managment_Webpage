export interface AdminUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin';
  permissions: string[];
  department?: string;
  lastLogin?: string;
}

export interface StaffMember {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'staff';
  department: string;
  position: string;
  schedule: WorkSchedule[];
  assignedPatients: string[];
  supervisor: string;
}

export interface WorkSchedule {
  day: string;
  startTime: string;
  endTime: string;
  department: string;
}

export interface Department {
  id: string;
  name: string;
  head: string;
  staffCount: number;
  location: string;
}

export interface AdminDashboardStats {
  totalPatients: number;
  totalStaff: number;
  occupancyRate: number;
  departmentStats: DepartmentStats[];
}

export interface DepartmentStats {
  department: string;
  patientCount: number;
  staffCount: number;
  utilizationRate: number;
}