import { create } from 'zustand';
import { AuthState, User } from '../types/auth';

// Simulated user data - In a real app, this would come from an API
const mockUser: User = {
  id: '1',
  email: 'john.doe@example.com',
  firstName: 'John',
  lastName: 'Doe',
  dateOfBirth: '1990-01-01',
  phone: '(555) 123-4567',
  address: '123 Main St, City, State 12345',
  bloodType: 'O+',
  allergies: ['Penicillin'],
  medications: ['Aspirin'],
  medicalHistory: ['Appendectomy - 2018']
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email === 'EnthalaManoj@medicare.p.com' && password === 'password') {
      set({ user: mockUser, isAuthenticated: true });
    } else {
      throw new Error('Invalid credentials');
    }
  },

  signup: async (userData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9)
    };
    
    set({ user: newUser, isAuthenticated: true });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  }
}));