import React from 'react';
import { Star, Calendar } from 'lucide-react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { doctors } from '../../constants/doctors';

export function Doctors() {
  return (
    <Section
      title="Our Expert Doctors"
      description="Meet our team of experienced healthcare professionals dedicated to providing exceptional medical care with expertise and compassion."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map((doctor, index) => {
          // Adjust image and name for third doctor
          if (index === 2) {
            doctor.image = "https://media.istockphoto.com/id/1270790502/photo/medical-concept-of-indian-beautiful-female-doctor-with-note-book.webp?s=2048x2048&w=is&k=20&c=dMWPRwdTgSAeufcgwdzn-BU9ITCMjmJJ4V6qh6_uoq4=";
            doctor.name = "Dr. Emily Rodriguez";
          }

          return (
            <div
              key={index}
              className="relative group overflow-hidden bg-white rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-blue-50"
            >
              {/* Image Container with Hover Effect */}
              <div className="relative w-full h-72 overflow-hidden rounded-t-xl group-hover:scale-105 transition-transform duration-300">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:opacity-90 transition-opacity duration-300"
                />
              </div>

              {/* Doctor Details */}
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {doctor.name}
                </h3>
                <p className="text-sm text-gray-500 group-hover:text-blue-600 transition-colors duration-300">
                  {doctor.specialty}
                </p>

                {/* Rating Stars */}
                <div className="flex items-center mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < doctor.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      title={`${doctor.rating} Stars`}
                    />
                  ))}
                </div>

                {/* Experience */}
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Experience:</span> {doctor.experience}
                </p>

                {/* Book Appointment Button */}
                <div className="flex justify-center mt-4">
                  <Button
                    icon={Calendar}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300"
                  >
                    Book Appointment
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
