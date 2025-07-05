import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DoctorProfile } from '../types/doctor';

const API_URL = 'http://localhost:5000/api';

// Helper function to handle API requests
async function apiRequest<T>(
  endpoint: string, 
  method: string = 'GET', 
  data: any = null,
  token?: string
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
    credentials: 'include' as const,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Something went wrong');
  }

  return response.json();
}

interface DoctorAuthState {
  currentDoctor: DoctorProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  doctors: DoctorProfile[];
  login: (email: string, password: string) => Promise<DoctorProfile | null>;
  logout: () => void;
  fetchCurrentDoctor: (token?: string) => Promise<DoctorProfile | null>;
  selectDoctor: (doctor: DoctorProfile | null) => void;
  clearError: () => void;
}

interface AuthResponse {
  token: string;
  doctor: DoctorProfile;
}

// Initial empty doctors array - will be populated from API
const initialDoctors: DoctorProfile[] = [];

// Create the store with proper types
export const useDoctorAuthStore = create<DoctorAuthState>()(
  persist(
    (set, get) => ({
      currentDoctor: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
doctors: initialDoctors,
      
      clearError: () => set({ error: null }),

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const data = await apiRequest<AuthResponse>('/doctors/login', 'POST', { email, password });
          
          // Store the token in localStorage
          localStorage.setItem('token', data.token);
          
          // Update the store
          set({ 
            currentDoctor: data.doctor, 
            isAuthenticated: true,
            isLoading: false
          });
          
          return data.doctor;
        } catch (error: any) {
          const errorMessage = error?.message || 'Login failed. Please try again.';
          set({ 
            error: errorMessage,
            isLoading: false,
            isAuthenticated: false,
            currentDoctor: null
          });
          throw new Error(errorMessage);
        }
      },
      
      logout: () => {
        // Clear the token from localStorage
        localStorage.removeItem('token');
        set({ 
          currentDoctor: null, 
          isAuthenticated: false,
          error: null,
          isLoading: false
        });
      },
      
      fetchCurrentDoctor: async (token?: string) => {
        const { isAuthenticated } = get();
        // Prevent multiple simultaneous auth checks
        if (isAuthenticated) return get().currentDoctor;
        
        set({ isLoading: true });
        try {
          const storedToken = token || localStorage.getItem('token');
          if (!storedToken) {
            set({ isLoading: false });
            return null;
          }
          
          const doctor = await apiRequest<DoctorProfile>('/doctors/me', 'GET', undefined, storedToken);
          set({ 
            currentDoctor: doctor, 
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          return doctor;
        } catch (error) {
          console.error('Error fetching doctor profile:', error);
          // Clear the token if it's invalid
          localStorage.removeItem('token');
          set({ 
            currentDoctor: null, 
            isAuthenticated: false,
            isLoading: false,
            error: 'Session expired. Please log in again.'
          });
          return null;
        }
      },
      
      selectDoctor: (doctor) => set({ currentDoctor: doctor }),
    }),
    {
      name: 'doctor-auth-storage',
      // Only save non-sensitive data to localStorage
      partialize: (state) => ({
        currentDoctor: state.currentDoctor,
        isAuthenticated: state.isAuthenticated,
      }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Initialize the auth state when the app loads
const initializeAuth = async () => {
  if (typeof window === 'undefined') return;
  
  const token = localStorage.getItem('token');
  const { isAuthenticated } = useDoctorAuthStore.getState();
  
  // Only initialize if we have a token and we're not already authenticated
  if (token && !isAuthenticated) {
    try {
      await useDoctorAuthStore.getState().fetchCurrentDoctor(token);
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      localStorage.removeItem('token');
    }
  }
};

// Run the initialization only on the client side
if (typeof window !== 'undefined') {
  initializeAuth();
}