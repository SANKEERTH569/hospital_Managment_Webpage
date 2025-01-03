import React, { useState } from'react';
import { Calendar, Clock, MapPin, X, ChevronDown } from 'lucide-react';
import { Button } from '../../ui/Button';

interface Appointment {
  id: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  location: string;
  status: 'pending' | 'accepted' |'rejected';
  notes?: string;
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

export function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
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

  return (
    <div className="bg-gray-50 min-h-screen p-8 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-semibold">Upcoming Appointments</h3>
            <Button variant="primary" icon={Calendar} onClick={() => setIsModalOpen(true)}>
              Schedule New
            </Button>
          </div>

          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="border rounded-lg p-4 hover:shadow-md mb-4 transition-shadow"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-lg font-semibold">{appointment.doctor}</h4>
                <p className="text-blue-600">{appointment.department}</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 inline-block mr-2 text-gray-400" />
                  {appointment.date}
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 inline-block mr-2 text-gray-400" />
                  {appointment.time}
                </div>
              </div>
              <p className="text-sm mt-2">{appointment.notes || 'No notes provided.'}</p>
              <div className="flex justify-between items-center mt-4">
                {appointment.status === 'pending' && (
                  <div className="flex items-center">
                    <Button variant="success" onClick={() => handleAccept(appointment.id)}>Accept</Button>
                    <Button variant="danger" className="ml-2" onClick={() => handleReject(appointment.id)}>Reject</Button>
                  </div>
                )}
                {appointment.status === 'accepted' && (
                  <p className="text-green-600 font-bold">Accepted</p>
                )}
                {appointment.status === 'ejected' && (
                  <p className="text-red-600 font-bold">Rejected</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
            <h3 className="text-xl font-semibold mb-4">Schedule New Appointment</h3> 

            <div className="grid grid-cols-1 gap-4 mb-4">
              <div className="bg-gray-100 p-2 rounded">
                <label className="block text-sm font-medium mb-1">Select Doctor</label>
                <select
                  className="w-full border p-2 rounded"
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
              </div>
              <div className="bg-gray-100 p-2 rounded">
                <label className="block text-sm font-medium mb-1">Select Date</label>
                <select
                  className="w-full border p-2 rounded"
                  onChange={(e) => setSelectedDate(e.target.value)}
                  value={selectedDate}
                >
                  <option value="">-- Select Date --</option>
                  {selectedDoctor?.availability.map((slot) => (
                    <option key={slot.date} value={slot.date}>
                      {slot.date}
                    </option>
                  ))}
                </select>
              </div>
              <div className="bg-gray-100 p-2 rounded">
                <label className="block text-sm font-medium mb-1">Select Time</label>
                <select
                  className="w-full border p-2 rounded"
                  onChange={(e) => setSelectedTime(e.target.value)}
                  value={selectedTime}
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
              </div>
            </div>

            <div className="bg-gray-100 p-2 rounded mb-4">
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                className="w-full border p-2 rounded"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional notes..."
              />
            </div>

            <div className="flex justify-end">
              <Button variant="primary" onClick={handleSchedule} disabled={!selectedTime}>
                Schedule Appointment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}