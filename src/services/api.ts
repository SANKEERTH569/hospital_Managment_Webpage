import { IAppointment } from '../types/appointment';

const API_BASE_URL = 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface GetAppointmentsParams {
  doctor?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

interface AppointmentResponse extends Omit<IAppointment, 'id' | 'patient' | 'doctor'> {
  _id: string;
  patient: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  doctor: {
    id: string;
    name: string;
    specialty: string;
  };
}

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  console.log(`Making request to: ${API_BASE_URL}${endpoint}`);
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Unable to connect to the server. Please try again later.'
    );
  }
}

export const api = {
  // Appointments
  getAppointments: async (params: GetAppointmentsParams = {}): Promise<ApiResponse<AppointmentResponse[]>> => {
    try {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          query.append(key, value);
        }
      });
      
      console.log('Fetching appointments with params:', params);
      const response = await fetchAPI(`/appointments?${query.toString()}`);
      
      // Log the response for debugging
      console.log('Appointments API response:', response);
      
      // Ensure we're returning the data in the correct format
      if (response && response.data) {
        return {
          success: true,
          data: Array.isArray(response.data) ? response.data : [response.data]
        };
      }
      
      // If no data or unexpected response format, return empty array
      return {
        success: true,
        data: []
      };
    } catch (error) {
      console.error('Error in getAppointments:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to fetch appointments'
      };
    }
  },
  
  createAppointment: async (data: any): Promise<ApiResponse<AppointmentResponse>> => {
    try {
      console.log('Creating appointment with data:', data);
      const response = await fetchAPI('/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error in createAppointment:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create appointment'
      };
    }
  },

  updateAppointmentStatus: async (id: string, status: 'confirmed' | 'cancelled' | 'completed'): Promise<ApiResponse<AppointmentResponse>> => {
    try {
      const response = await fetchAPI(`/appointments/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      console.error('Error in updateAppointmentStatus:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to update appointment status'
      };
    }
  },
};
