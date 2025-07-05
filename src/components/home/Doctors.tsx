import React, { useState } from 'react';
import { Star, Calendar, Award, Clock, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { doctors } from '../../constants/doctors';
import { AppointmentForm } from '../appointments/AppointmentForm';

export function Doctors() {
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleBookClick = (doctor: typeof doctors[0]) => {
    setSelectedDoctor(doctor);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedDoctor(null);
  };

  return (
    <Section
      title="Meet Our Specialists"
      description="Our team of expert physicians combines years of experience with cutting-edge medical knowledge to provide exceptional care."
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Expert Care from Leading Specialists</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Our physicians are recognized leaders in their fields, committed to providing personalized care with compassion and expertise.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => {
            if (index === 2) {
              doctor.image = "https://media.istockphoto.com/id/1270790502/photo/medical-concept-of-indian-beautiful-female-doctor-with-note-book.webp?s=2048x2048&w=is&k=20&c=dMWPRwdTgSAeufcgwdzn-BU9ITCMjmJJ4V6qh6_uoq4=";
              doctor.name = "Dr. Emily Rodriguez";
            }
            return (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
              >
                <div className="relative">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-64 object-cover object-center"
                  />
                  <div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
                    <Award className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-3">
                    {doctor.specialty}
                  </p>
                  
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        fill={i < doctor.rating ? "currentColor" : "none"}
                        className={`w-4 h-4 ${i < doctor.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">{doctor.rating}.0</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{doctor.experience}</span>
                  </div>
                  
                  <div className="mt-auto">
                    <button
                      onClick={() => handleBookClick(doctor)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Appointment
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <a href="/doctors" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
            View All Specialists
            <ArrowRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full relative shadow-xl">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={handleCloseForm}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-6 text-gray-900">Schedule an Appointment with {selectedDoctor?.name}</h2>
            <AppointmentForm onSuccess={handleCloseForm} />
          </div>
        </div>
      )}
    </Section>
  );
}
// Add .animate-3d-bounce, .animate-gradient-move, .animate-float-slow, .animate-float-fast, .animate-fade-in-up, .animate-glow, .hover:shadow-3xl to your CSS/Tailwind config for full effect.
