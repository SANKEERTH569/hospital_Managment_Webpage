import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, X, ChevronDown, Filter, Search, AlertCircle, CheckCircle, XCircle, User, Phone, Mail, Building, FileText, Clipboard, Plus, ChevronRight, Bell } from 'lucide-react';
import { FaCalendarCheck, FaCalendarTimes, FaUserMd, FaHospital, FaNotesMedical, FaVideo } from 'react-icons/fa';
import { Button } from '../../ui/Button';
import Modal from '../../common/Modal';

interface Appointment {
  id: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  location: string;
  status: 'pending' | 'accepted' |'rejected';
  notes?: string;
  type?: 'in-person' | 'video';
  doctorImage?: string;
  duration?: string;
  reasonForVisit?: string;
  insuranceRequired?: boolean;
  documents?: {name: string; url: string}[];
}

interface Doctor {
  name: string;
  department: string;
  availability: { date: string; timeSlots: string[] }[];
}

const doctors: Doctor[] = [
  {
    name: 'Dr. Sarah Johnson',
    department: 'Cardiology',
    availability: [
      { date: '2024-03-18', timeSlots: ['10:00 AM', '11:30 AM', '2:00 PM'] },
      { date: '2024-03-19', timeSlots: ['9:00 AM', '12:30 PM', '4:00 PM'] },
    ],
  },
  {
    name: 'Dr. Michael Chen',
    department: 'Neurology',
    availability: [
      { date: '2024-03-18', timeSlots: ['10:00 AM', '1:00 PM'] },
      { date: '2024-03-20', timeSlots: ['11:00 AM', '3:30 PM'] },
    ],
  },
];

// Sample appointments data
const sampleAppointments: Appointment[] = [
  {
    id: '1',
    doctor: 'Dr. Sarah Johnson',
    department: 'Cardiology',
    date: '2024-03-18',
    time: '10:00 AM',
    location: 'Main Building, Room 101',
    status: 'accepted',
    notes: 'Follow-up appointment for heart condition',
    type: 'in-person',
    doctorImage: 'https://randomuser.me/api/portraits/women/68.jpg',
    duration: '30 minutes',
    reasonForVisit: 'Follow-up for recent heart palpitations and medication review',
    insuranceRequired: true,
    documents: [
      {name: 'Recent ECG Results', url: '#'}, 
      {name: 'Medication List', url: '#'}
    ]
  },
  {
    id: '2',
    doctor: 'Dr. Michael Chen',
    department: 'Neurology',
    date: '2024-03-20',
    time: '11:00 AM',
    location: 'East Wing, Room 305',
    status: 'pending',
    notes: 'Initial consultation for headaches',
    type: 'in-person',
    doctorImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    duration: '45 minutes',
    reasonForVisit: 'Recurring migraines and dizziness for the past month',
    insuranceRequired: true
  },
  {
    id: '3',
    doctor: 'Dr. Emily Rodriguez',
    department: 'Dermatology',
    date: '2024-03-25',
    time: '2:30 PM',
    location: 'Online Video Consultation',
    status: 'accepted',
    notes: 'Follow-up on skin condition treatment',
    type: 'video',
    doctorImage: 'https://randomuser.me/api/portraits/women/45.jpg',
    duration: '20 minutes',
    reasonForVisit: 'Review progress of treatment for eczema',
    insuranceRequired: false
  },
  {
    id: '4',
    doctor: 'Dr. James Wilson',
    department: 'Orthopedics',
    date: '2024-03-15',
    time: '9:00 AM',
    location: 'South Building, Room 203',
    status: 'rejected',
    notes: 'Consultation for knee pain',
    type: 'in-person',
    doctorImage: 'https://randomuser.me/api/portraits/men/52.jpg',
    duration: '40 minutes',
    reasonForVisit: 'Persistent knee pain after sports injury',
    insuranceRequired: true
  }
];

export function Appointments() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
  const [appointments, setAppointments] = useState<Appointment[]>(sampleAppointments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterType, setFilterType] = useState<'all' | 'in-person' | 'video'>('all');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [appointmentType, setAppointmentType] = useState<'in-person' | 'video'>('in-person');
  const [upcomingCount, setUpcomingCount] = useState<number>(0);
const [selectedTime, setSelectedTime] = useState<string>('');
const [notes, setNotes] = useState('');

  const handleSchedule = () => {
    if (!selectedDoctor ||!selectedDate ||!selectedTime) return;

    const newAppointment: Appointment = {
      id: (appointments.length + 1).toString(),
      doctor: selectedDoctor.name,
      department: selectedDoctor.department,
      date: selectedDate,
      time: selectedTime,
      location: 'Main Building, Room 101',
      status: 'pending',
      notes,
    };

    setAppointments([...appointments, newAppointment]);
    setIsModalOpen(false);
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTime('');
    setNotes('');
  };

  const handleAccept = (id: string) => {
    setAppointments(
      appointments.map((appointment) => {
        if (appointment.id === id) {
          return {...appointment, status: 'accepted' };
        }
        return appointment;
      })
    );
  };

  const handleReject = (id: string) => {
    setAppointments(
      appointments.map((appointment) => {
        if (appointment.id === id) {
          return {...appointment, status:'rejected' };
        }
        return appointment;
      })
    );
  };

  // Calculate upcoming appointments count
  useEffect(() => {
    const today = new Date();
    const count = appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate >= today && appointment.status !== 'rejected';
    }).length;
    setUpcomingCount(count);
  }, [appointments]);

  // Filter appointments based on active tab, search term, and filter type
  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    const today = new Date();
    const matchesTab = activeTab === 'upcoming' ? appointmentDate >= today : appointmentDate < today;
    const matchesSearch = appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         appointment.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || appointment.type === filterType;
    
    return matchesTab && matchesSearch && matchesType;
  });

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header with tabs */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Appointments</h2>
              <div className="flex items-center mt-1">
                <p className="text-sm text-gray-500">Manage your medical appointments</p>
                {upcomingCount > 0 && (
                  <div className="ml-3 flex items-center bg-blue-50 px-2 py-1 rounded-full">
                    <Bell className="w-3 h-3 text-blue-500 mr-1" />
                    <span className="text-xs font-medium text-blue-600">{upcomingCount} upcoming</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Button 
          variant="primary" 
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Appointment
        </Button>
      </div>
      
      {/* Search and filter */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by doctor or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        {showFilters && (
          <div className="mt-3 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-2">Filter by appointment type:</p>
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 rounded-lg text-sm ${filterType === 'all' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700 border border-gray-300'}`}
                onClick={() => setFilterType('all')}
              >
                All Types
              </button>
              <button
                className={`px-3 py-1 rounded-lg text-sm flex items-center ${filterType === 'in-person' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700 border border-gray-300'}`}
                onClick={() => setFilterType('in-person')}
              >
                <User className="w-3 h-3 mr-1" /> In-Person
              </button>
              <button
                className={`px-3 py-1 rounded-lg text-sm flex items-center ${filterType === 'video' ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700 border border-gray-300'}`}
                onClick={() => setFilterType('video')}
              >
                <FaVideo className="w-3 h-3 mr-1" /> Video
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-6 py-3 font-medium text-sm flex items-center ${activeTab === 'upcoming' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('upcoming')}
        >
          <FaCalendarCheck className="mr-2" />
          Upcoming
          {upcomingCount > 0 && (
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded-full">
              {upcomingCount}
            </span>
          )}
        </button>
        <button
          className={`px-6 py-3 font-medium text-sm flex items-center ${activeTab === 'past' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('past')}
        >
          <FaCalendarTimes className="mr-2" />
          Past
        </button>
      </div>

      {/* Appointment Detail View */}
      {showDetails && selectedAppointment && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-0 relative overflow-hidden">
            {/* Header with gradient background */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                onClick={() => setShowDetails(false)}
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center">
                {selectedAppointment.doctorImage ? (
                  <img 
                    src={selectedAppointment.doctorImage} 
                    alt={selectedAppointment.doctor} 
                    className="w-16 h-16 rounded-full border-2 border-white mr-4 object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-200 flex items-center justify-center mr-4">
                    <FaUserMd className="w-8 h-8 text-blue-600" />
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold">{selectedAppointment.doctor}</h3>
                  <p className="text-blue-100">{selectedAppointment.department}</p>
                  <div className="flex items-center mt-1">
                    {selectedAppointment.type === 'video' ? (
                      <div className="flex items-center bg-blue-700 bg-opacity-30 px-2 py-0.5 rounded-full">
                        <FaVideo className="w-3 h-3 mr-1" />
                        <span className="text-xs">Video Consultation</span>
                      </div>
                    ) : (
                      <div className="flex items-center bg-blue-700 bg-opacity-30 px-2 py-0.5 rounded-full">
                        <FaHospital className="w-3 h-3 mr-1" />
                        <span className="text-xs">In-Person Visit</span>
                      </div>
                    )}
                    <div className="flex items-center ml-2">
                      {selectedAppointment.status === 'pending' && (
                        <AlertCircle className="w-3 h-3 text-yellow-300 mr-1" />
                      )}
                      {selectedAppointment.status === 'accepted' && (
                        <CheckCircle className="w-3 h-3 text-green-300 mr-1" />
                      )}
                      {selectedAppointment.status === 'rejected' && (
                        <XCircle className="w-3 h-3 text-red-300 mr-1" />
                      )}
                      <span className="text-xs">
                        {selectedAppointment.status === 'pending' && 'Pending'}
                        {selectedAppointment.status === 'accepted' && 'Confirmed'}
                        {selectedAppointment.status === 'rejected' && 'Cancelled'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                    <h4 className="font-medium text-gray-800">Date & Time</h4>
                  </div>
                  <p className="text-gray-700">
                    {new Date(selectedAppointment.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                  <p className="text-gray-700">{selectedAppointment.time}</p>
                  {selectedAppointment.duration && (
                    <p className="text-sm text-gray-500 mt-1">Duration: {selectedAppointment.duration}</p>
                  )}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <MapPin className="w-5 h-5 text-blue-600 mr-2" />
                    <h4 className="font-medium text-gray-800">Location</h4>
                  </div>
                  <p className="text-gray-700">{selectedAppointment.location}</p>
                  {selectedAppointment.type === 'video' && (
                    <button className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center">
                      <FaVideo className="mr-1" /> Join Video Call
                    </button>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center mb-3">
                  <FileText className="w-5 h-5 text-blue-600 mr-2" />
                  <h4 className="font-medium text-gray-800">Appointment Details</h4>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  {selectedAppointment.reasonForVisit && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-500">Reason for Visit</p>
                      <p className="text-gray-700">{selectedAppointment.reasonForVisit}</p>
                    </div>
                  )}
                  
                  {selectedAppointment.notes && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-500">Additional Notes</p>
                      <p className="text-gray-700">{selectedAppointment.notes}</p>
                    </div>
                  )}
                  
                  {selectedAppointment.insuranceRequired && (
                    <div className="flex items-center text-sm text-gray-700">
                      <AlertCircle className="w-4 h-4 text-amber-500 mr-1" />
                      Please bring your insurance card to this appointment
                    </div>
                  )}
                </div>
              </div>
              
              {selectedAppointment.documents && selectedAppointment.documents.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center mb-3">
                    <Clipboard className="w-5 h-5 text-blue-600 mr-2" />
                    <h4 className="font-medium text-gray-800">Required Documents</h4>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <ul className="space-y-2">
                      {selectedAppointment.documents.map((doc, index) => (
                        <li key={index}>
                          <a 
                            href={doc.url} 
                            className="flex items-center text-blue-600 hover:text-blue-800"
                          >
                            <FaNotesMedical className="mr-2" />
                            {doc.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              
              {/* Action buttons */}
              <div className="flex justify-between mt-6">
                <Button 
                  variant="secondary" 
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
                  onClick={() => setShowDetails(false)}
                >
                  Close
                </Button>
                
                {selectedAppointment.status === 'pending' && (
                  <div className="flex space-x-2">
                    <Button 
                      variant="success" 
                      className="bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 rounded-lg transition-colors"
                      onClick={() => {
                        handleAccept(selectedAppointment.id);
                        setShowDetails(false);
                      }}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Confirm
                    </Button>
                    <Button 
                      variant="danger" 
                      className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded-lg transition-colors"
                      onClick={() => {
                        handleReject(selectedAppointment.id);
                        setShowDetails(false);
                      }}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
                
                {selectedAppointment.status === 'accepted' && (
                  <Button 
                    variant="danger" 
                    className="bg-red-100 text-red-700 hover:bg-red-200 px-4 py-2 rounded-lg transition-colors"
                    onClick={() => {
                      handleReject(selectedAppointment.id);
                      setShowDetails(false);
                    }}
                  >
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancel Appointment
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Appointments list */}
      {filteredAppointments.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No {activeTab} appointments</h3>
          <p className="text-gray-500 mb-4">You don't have any {activeTab} appointments scheduled.</p>
          <Button 
            variant="primary" 
            className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-4 py-2 rounded-lg transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            Schedule an Appointment
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-5">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    {appointment.doctorImage ? (
                      <img 
                        src={appointment.doctorImage} 
                        alt={appointment.doctor} 
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                        <FaUserMd className="w-6 h-6 text-blue-600" />
                      </div>
                    )}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{appointment.doctor}</h4>
                      <p className="text-sm text-blue-600 font-medium">{appointment.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {appointment.status === 'pending' && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Pending
                      </span>
                    )}
                    {appointment.status === 'accepted' && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Confirmed
                      </span>
                    )}
                    {appointment.status === 'rejected' && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 flex items-center">
                        <XCircle className="w-3 h-3 mr-1" />
                        Cancelled
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-blue-50 mr-3">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Date</p>
                      <p className="text-sm font-medium">{new Date(appointment.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-blue-50 mr-3">
                      <Clock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Time</p>
                      <p className="text-sm font-medium">{appointment.time}</p>
                      {appointment.duration && <p className="text-xs text-gray-400">{appointment.duration}</p>}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-blue-50 mr-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Location</p>
                      <p className="text-sm font-medium">{appointment.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-blue-50 mr-3">
                      {appointment.type === 'video' ? (
                        <FaVideo className="w-5 h-5 text-blue-600" />
                      ) : (
                        <FaHospital className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Type</p>
                      <p className="text-sm font-medium">
                        {appointment.type === 'video' ? 'Video Consultation' : 'In-Person Visit'}
                      </p>
                    </div>
                  </div>
                </div>
                
                {appointment.notes && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">Notes</p>
                    <p className="text-sm">{appointment.notes}</p>
                  </div>
                )}
                
                <div className="mt-4 flex justify-between items-center">
                  <button 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                    onClick={() => {
                      setSelectedAppointment(appointment);
                      setShowDetails(true);
                    }}
                  >
                    View Details
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                  
                  {appointment.status === 'pending' && activeTab === 'upcoming' && (
                    <div className="flex space-x-2">
                      <Button 
                        variant="success" 
                        className="bg-green-100 text-green-700 hover:bg-green-200 py-1.5 px-3 rounded-lg transition-colors text-sm"
                        onClick={() => handleAccept(appointment.id)}
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Confirm
                      </Button>
                      <Button 
                        variant="danger" 
                        className="bg-red-100 text-red-700 hover:bg-red-200 py-1.5 px-3 rounded-lg transition-colors text-sm"
                        onClick={() => handleReject(appointment.id)}
                      >
                        <XCircle className="w-3 h-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  )}
                  
                  {appointment.status === 'accepted' && appointment.type === 'video' && activeTab === 'upcoming' && (
                    <Button 
                      variant="primary" 
                      className="bg-blue-100 text-blue-700 hover:bg-blue-200 py-1.5 px-3 rounded-lg transition-colors text-sm"
                    >
                      <FaVideo className="w-3 h-3 mr-1" />
                      Join Call
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-0 relative overflow-hidden">
            {/* Modal header with gradient background */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
              <button
                className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="w-6 h-6" />
              </button>
              <h3 className="text-xl font-bold">Schedule New Appointment</h3>
              <p className="text-blue-100 text-sm mt-1">Book your next visit with our specialists</p>
            </div>
            
            <div className="p-6">
              {/* Appointment type selection */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className={`flex items-center justify-center p-3 rounded-lg border ${appointmentType === 'in-person' ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => setAppointmentType('in-person')}
                  >
                    <FaHospital className="mr-2" />
                    In-Person Visit
                  </button>
                  <button
                    type="button"
                    className={`flex items-center justify-center p-3 rounded-lg border ${appointmentType === 'video' ? 'bg-blue-50 border-blue-300 text-blue-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    onClick={() => setAppointmentType('video')}
                  >
                    <FaVideo className="mr-2" />
                    Video Call
                  </button>
                </div>
              </div>
              
              {/* Doctor selection with icons */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Doctor</label>
                <div className="relative">
                  <select
                    className="w-full border border-gray-300 p-3 pr-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    onChange={(e) => {
                      const doctor = doctors.find((d) => d.name === e.target.value);
                      setSelectedDoctor(doctor || null);
                      setSelectedDate('');
                      setSelectedTime('');
                    }}
                    value={selectedDoctor?.name || ''}
                  >
                    <option value="">-- Select Doctor --</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.name} value={doctor.name}>
                        {doctor.name} ({doctor.department})
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <FaUserMd className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Date selection */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                <div className="relative">
                  <select
                    className="w-full border border-gray-300 p-3 pr-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    onChange={(e) => setSelectedDate(e.target.value)}
                    value={selectedDate}
                    disabled={!selectedDoctor}
                  >
                    <option value="">-- Select Date --</option>
                    {selectedDoctor?.availability.map((slot) => (
                      <option key={slot.date} value={slot.date}>
                        {new Date(slot.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Time selection */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                <div className="relative">
                  <select
                    className="w-full border border-gray-300 p-3 pr-10 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                    onChange={(e) => setSelectedTime(e.target.value)}
                    value={selectedTime}
                    disabled={!selectedDate}
                  >
                    <option value="">-- Select Time --</option>
                    {selectedDoctor?.availability
                    .find((slot) => slot.date === selectedDate)
                    ?.timeSlots.map((time) => (
                        <option key={time} value={time}>
                          {time}
                        </option>
                      ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Reason for visit */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Visit</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of your symptoms or reason"
                />
              </div>
              
              {/* Notes */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional notes or concerns..."
                />
              </div>
              
              {/* Insurance checkbox */}
              <div className="mb-6">
                <div className="flex items-center">
                  <input
                    id="insurance"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="insurance" className="ml-2 block text-sm text-gray-700">
                    I will bring my insurance card to this appointment
                  </label>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex justify-between">
                <Button 
                  variant="secondary" 
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                  onClick={handleSchedule} 
                  disabled={!selectedTime}
                >
                  Schedule Appointment
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Quick Tips Section */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointment Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-blue-100 mr-3">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-700">Arrive 15 Minutes Early</p>
              <p className="text-sm text-gray-600">For in-person visits, arrive early to complete any paperwork</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-blue-100 mr-3">
              <Clipboard className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-700">Bring Your Documents</p>
              <p className="text-sm text-gray-600">Insurance card, ID, and any relevant medical records</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-blue-100 mr-3">
              <FaVideo className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-700">Test Your Equipment</p>
              <p className="text-sm text-gray-600">For video visits, test your camera and microphone beforehand</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="p-2 rounded-full bg-blue-100 mr-3">
              <Phone className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-700">Need to Reschedule?</p>
              <p className="text-sm text-gray-600">Call us at least 24 hours in advance at (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}