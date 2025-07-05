import React, { useEffect, useState, useCallback } from 'react';
import { useDoctorAuthStore } from '../../stores/doctorAuthStore';
import { IAppointment, AppointmentStatus } from '../../types/appointment';
import { api, ApiResponse } from '../../services/api';
import { format } from 'date-fns';

interface DoctorAppointmentsProps {
  doctorId: string;
}

interface AppointmentResponse extends Omit<IAppointment, 'id' | 'status'> {
  _id: string;
  status: AppointmentStatus;
}

const DoctorAppointments: React.FC<DoctorAppointmentsProps> = ({ doctorId }) => {
  const { doctor } = useDoctorAuthStore();
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'upcoming' | 'completed' | 'all'>('upcoming');
  const [selectedAppointment, setSelectedAppointment] = useState<IAppointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Format date to a readable format
  const formatDisplayDate = (dateString: string): string => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  // Format time to 12-hour format
  const formatDisplayTime = (timeString: string): string => {
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    } catch (error) {
      console.error('Error formatting time:', error);
      return timeString;
    }
  };

  // Get status badge class based on appointment status
  const getStatusBadgeClass = (status: AppointmentStatus): string => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm';
      case 'cancelled':
        return 'bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm';
      case 'completed':
        return 'bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm';
      case 'scheduled':
      default:
        return 'bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md text-sm';
    }
  };

  // Handle status update
  const handleStatusUpdate = async (appointmentId: string, newStatus: AppointmentStatus) => {
    if (!confirm(`Are you sure you want to mark this appointment as ${newStatus}?`)) {
      return;
    }

    try {
      setLoading(true);
      const response = await api.updateAppointmentStatus(appointmentId, newStatus);
      
      if (response.success) {
        // Update local state
        setAppointments(prevAppointments => 
          prevAppointments.map(appt => 
            appt.id === appointmentId 
              ? { ...appt, status: newStatus } 
              : appt
          )
        );
      } else {
        throw new Error(response.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating appointment status:', error);
      setError('Failed to update appointment status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch appointments from API
  const fetchAppointments = useCallback(async () => {
    if (!doctor) {
      console.log('No doctor found in auth store');
      return;
    }
    
    try {
      setLoading(true);
      console.log('Fetching appointments for doctor ID:', doctor.id);
      
      // Fetch appointments for this doctor
      const response = await api.getAppointments({
        doctor: doctor.id, // Ensure this matches the doctor's ID in the database
        status: 'pending,confirmed,completed'
      });
      
      console.log('API Response:', response);
      
      if (response.success && response.data) {
        // Transform the API response to match our frontend interface
        const formattedAppointments = response.data.map((appt: any) => {
          console.log('Processing appointment:', appt);
          
          // Format the date to YYYY-MM-DD if it's a valid date string
          let formattedDate = '';
          if (appt.date) {
            try {
              const dateObj = new Date(appt.date);
              if (!isNaN(dateObj.getTime())) {
                formattedDate = dateObj.toISOString().split('T')[0];
              }
            } catch (e) {
              console.error('Error formatting date:', e);
            }
          }
          
          return {
            id: appt._id || `appt-${Math.random().toString(36).substr(2, 9)}`,
            patientId: appt._id || `patient-${Math.random().toString(36).substr(2, 9)}`,
            patientName: appt.patientName || 'Unknown Patient',
            patient: {
              id: appt._id || `patient-${Math.random().toString(36).substr(2, 9)}`,
              name: appt.patientName || 'Unknown Patient',
              email: appt.email || 'unknown@example.com',
              phone: appt.phone || '555-0100',
              dateOfBirth: ''
            },
            doctor: {
              id: appt.doctor || doctor.id,
              name: `${doctor.firstName} ${doctor.lastName}`,
              specialty: appt.department || doctor.specialty || 'General'
            },
            date: formattedDate || new Date().toISOString().split('T')[0],
            time: appt.time || '12:00',
            department: appt.department || doctor.specialty || 'General',
            reason: appt.reason || 'Routine checkup',
            status: appt.status || 'pending',
            notes: appt.notes || '',
            createdAt: appt.createdAt || new Date().toISOString(),
            updatedAt: appt.updatedAt || new Date().toISOString()
          };
        });
        
        console.log('Formatted appointments:', formattedAppointments);
        setAppointments(formattedAppointments);
        setError(null);
      } else {
        throw new Error(response.message || 'Failed to fetch appointments');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setError('Failed to load appointments. Please try again later.');
      
      // Fallback to mock data if API fails (for development)
      if (process.env.NODE_ENV === 'development') {
        console.warn('Using mock data due to API error');
        const mockAppointments: IAppointment[] = [
          {
            id: 'mock-1',
            patientId: 'patient-1',
            patientName: 'John Doe',
            patient: {
              id: 'patient-1',
              name: 'John Doe',
              email: 'john.doe@example.com',
              phone: '555-0101',
              dateOfBirth: '1980-01-01'
            },
            doctor: {
              id: doctor.id,
              name: `${doctor.firstName} ${doctor.lastName}`,
              specialty: doctor.specialty || 'General'
            },
            date: new Date().toISOString().split('T')[0],
            time: '10:00',
            department: doctor.specialty || 'General',
            reason: 'Annual checkup',
            status: 'scheduled',
            notes: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ];
        setAppointments(mockAppointments);
      }
    } finally {
      setLoading(false);
    }
  }, [doctor]);

  // Filter appointments based on the selected filter
  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (filter) {
      case 'upcoming':
        return appointmentDate >= today && appointment.status !== 'completed' && appointment.status !== 'cancelled';
      case 'completed':
        return appointment.status === 'completed' || appointment.status === 'cancelled';
      case 'all':
      default:
        return true;
    }
  });

  // Sort appointments by date and time (earliest first)
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    const dateA = new Date(`${a.date}T${a.time}`);
    const dateB = new Date(`${b.date}T${b.time}`);
    return dateA.getTime() - dateB.getTime();
  });

  // Handle view details
  const handleViewDetails = (appointment: IAppointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  // Initialize component
  useEffect(() => {
    console.log('DoctorAppointments mounted with doctor:', doctor);
    if (doctor) {
      console.log('Doctor ID from auth store:', doctor.id);
      console.log('Doctor name:', `${doctor.firstName} ${doctor.lastName}`);
    }
    fetchAppointments();
  }, [fetchAppointments, doctor]);

  // Render the component
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Appointments</h1>
        <div className="flex space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'upcoming' | 'completed' | 'all')}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="all">All Appointments</option>
          </select>
          <button
            onClick={fetchAppointments}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedAppointments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No appointments found</p>
              <p className="text-gray-400 mt-2">
                {filter === 'upcoming' 
                  ? "You don't have any upcoming appointments." 
                  : "No appointments match the selected filter."}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sortedAppointments.map((appointment) => (
                <div 
                  key={appointment.id} 
                  className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
                >
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">
                        {appointment.patientName}
                      </h3>
                      <span className={getStatusBadgeClass(appointment.status)}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDisplayDate(appointment.date)}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formatDisplayTime(appointment.time)}
                      </div>
                      <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {appointment.department}
                      </div>
                      {appointment.reason && (
                        <div className="pt-2 border-t mt-2">
                          <p className="text-sm text-gray-500">Reason:</p>
                          <p className="text-sm font-medium">{appointment.reason}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 px-4 py-3 flex justify-end space-x-2">
                    <button
                      onClick={() => handleViewDetails(appointment)}
                      className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                    >
                      View Details
                    </button>
                    {appointment.status === 'scheduled' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(appointment.id, 'confirmed')}
                          className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(appointment.id, 'cancelled')}
                          className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    {appointment.status === 'confirmed' && (
                      <button
                        onClick={() => handleStatusUpdate(appointment.id, 'completed')}
                        className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        Mark as Completed
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Appointment Details Modal */}
      {isModalOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">Appointment Details</h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Patient Information</h3>
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p>Name: {selectedAppointment.patientName}</p>
                    <p>Email: {selectedAppointment.patient?.email || 'N/A'}</p>
                    <p>Phone: {selectedAppointment.patient?.phone || 'N/A'}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Appointment Details</h3>
                  <div className="mt-2 space-y-1 text-sm text-gray-600">
                    <p>Date: {formatDisplayDate(selectedAppointment.date)}</p>
                    <p>Time: {formatDisplayTime(selectedAppointment.time)}</p>
                    <p>Department: {selectedAppointment.department}</p>
                    <p>Status: 
                      <span className={getStatusBadgeClass(selectedAppointment.status)}>
                        {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                      </span>
                    </p>
                    <p>Reason: {selectedAppointment.reason || 'N/A'}</p>
                    {selectedAppointment.notes && (
                      <div className="mt-2 pt-2 border-t">
                        <p className="font-medium">Notes:</p>
                        <p className="text-sm">{selectedAppointment.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
      setAppointments(prevAppointments => 
        prevAppointments.map(appt => 
          appt.id === appointmentId 
            ? { ...appt, status: appt.status } // Keep the original status
            : appt
        )
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  const filteredAppointments = appointments.filter((appointment) => {
    if (filter === 'upcoming') {
      return new Date(appointment.date) > new Date();
    } else if (filter === 'completed') {
      return new Date(appointment.date) < new Date();
    } else {
      return true;
    }
  });

  if (filteredAppointments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          {filter === 'upcoming' 
            ? 'No upcoming appointments.' 
            : filter === 'completed' 
              ? 'No completed appointments.' 
              : 'No appointments found.'}
        </p>
      </div>
    );
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Your Appointments</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === 'upcoming' 
                ? 'bg-indigo-100 text-indigo-700 font-medium' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === 'completed' 
                ? 'bg-indigo-100 text-indigo-700 font-medium' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-sm rounded-md ${
              filter === 'all' 
                ? 'bg-indigo-100 text-indigo-700 font-medium' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            All
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredAppointments.map((appointment) => (
          <div key={appointment.id} className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="text-indigo-600 font-medium">
                      {appointment.patientName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{appointment.patientName}</h3>
                    <p className="text-sm text-gray-500">
                      {appointment.department} • {appointment.reason}
                    </p>
                  </div>
                </div>
                <div className="mt-3 text-sm">
                  <p className="text-gray-600">
                    <span className="font-medium">When:</span>{' '}
                    {new Date(appointment.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}{' '}
                    at {appointment.time}
                  </p>
                  {appointment.notes && (
                    <p className="mt-1 text-gray-600">
                      <span className="font-medium">Notes:</span> {appointment.notes}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusBadgeClass(appointment.status)}`}>
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </span>
                <div className="flex space-x-2 mt-2">
                  {appointment.status === 'scheduled' && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateAppointmentStatus(appointment.id, 'confirmed');
                        }}
                        disabled={loading}
                        className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Updating...' : 'Confirm'}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm('Are you sure you want to cancel this appointment?')) {
                            updateAppointmentStatus(appointment.id, 'cancelled');
                          }
                        }}
                        disabled={loading}
                        className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {loading ? 'Updating...' : 'Cancel'}
                      </button>
                    </>
                  )}
                  {appointment.status === 'confirmed' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        updateAppointmentStatus(appointment.id, 'completed');
                      }}
                      disabled={loading}
                      className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Updating...' : 'Mark Completed'}
                    </button>
                  )}
                  {appointment.status === 'completed' && (
                    <span className="text-xs text-gray-500 italic">
                      Appointment completed
                    </span>
                  )}
                  {appointment.status === 'cancelled' && (
                    <span className="text-xs text-gray-500 italic">
                      Appointment cancelled
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
