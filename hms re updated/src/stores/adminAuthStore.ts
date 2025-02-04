import { create } from 'zustand';
import { AdminUser, StaffMember } from '../types/admin';

interface AdminAuthState {
  user: AdminUser | StaffMember | null;
  isAuthenticated: boolean;
  role: 'admin' | 'staff' | null;
  login: (email: string, password: string, role: 'admin' | 'staff') => Promise<void>;
  logout: () => void;
}

export const useAdminAuthStore = create<AdminAuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  role: null,

  login: async (email: string, password: string, role: 'admin' | 'staff') => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication logic
    if (role === 'admin' && email === 'manoj.admin@medicare.com') {
      const adminUser: AdminUser = {
        id: 'a1',
        email,
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
        permissions: ['all'],
      };
      set({ user: adminUser, isAuthenticated: true, role: 'admin' });
    } else if (role === 'staff' && email === 'aadhi.staff@medicare.com') {
      const staffMember: StaffMember = {
        id: 's1',
        email,
        firstName: 'Staff',
        lastName: 'Member',
        role: 'staff',
        department: 'Cardiology',
        position: 'Nurse',
        schedule: [],
        assignedPatients: [],
        supervisor: 'Dr. Sarah Johnson'
      };
      set({ user: staffMember, isAuthenticated: true, role: 'staff' });
    } else {
      throw new Error('Invalid credentials');
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false, role: null });
  }
}));
