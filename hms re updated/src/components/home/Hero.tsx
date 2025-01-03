import React, { useState } from "react";
import { Calendar, Phone } from "lucide-react";
import { Button } from "../ui/Button";
import { AppointmentModal } from "../appointments/AppointmentModal";

export function Hero() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  return (
    <>
      {/* Hero Section with Stunning Background */}
      <div className="relative w-full h-[100vh] bg-gradient-to-br from-blue-800 to-blue-900 flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80"
            alt="Hospital"
            className="w-full h-full object-cover opacity-20 blur-sm"
          />
        </div>

        {/* Radial Gradient Focus */}
        <div className="absolute inset-0 bg-gradient-radial from-white/10 to-transparent opacity-30"></div>

        {/* Rounded Glassmorphic Hero Content */}
        <div
          className="relative max-w-4xl w-full bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl p-8 md:p-16 text-center animate-fade-in-up"
        >
          {/* Content */}
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight animate-slide-down">
            Your Health Is Our Top Priority
          </h1>
          <p className="text-lg md:text-2xl text-gray-100 leading-relaxed mb-8">
            World-class healthcare with compassion, expertise, and advanced
            technology, ensuring the best care for you and your family.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => setIsAppointmentModalOpen(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-blue-700 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <Calendar className="inline-block mr-2" />
              Book Appointment
            </button>
            <button
              className="border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-blue-600 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              <Phone className="inline-block mr-2" />
              Emergency Call
            </button>
          </div>
        </div>
      </div>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />
    </>
  );
}
