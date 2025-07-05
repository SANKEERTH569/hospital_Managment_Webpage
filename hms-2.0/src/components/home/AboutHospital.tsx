import React from "react";
import { Section } from "../ui/Section";
import { MapPin, Clock, Phone, Mail, Building } from "lucide-react";

export function AboutHospital() {
  return (
    <Section
      title={<span className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-900 bg-clip-text text-transparent drop-shadow-lg">About Our Hospital</span>}
      description={<span className="text-xl md:text-2xl text-blue-900/80 font-medium">A legacy of care, innovation, and excellence in healthcare.</span>}
      className="relative py-24 bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Main content */}
        <div className="text-center text-blue-900 text-lg leading-relaxed space-y-8 mb-16">
          <p>
            <strong>Founded in 1970 by Dr. James Medicare</strong>, our hospital has grown from a small 10-bed clinic into a multi-specialty, tertiary care center with over 500 beds, serving more than 50,000 patients every year. We combine compassionate care with cutting-edge technology, offering a full spectrum of services from emergency medicine to advanced surgery, diagnostics, and rehabilitation.
          </p>
          <p>
            <strong>Our Mission:</strong> To deliver world-class healthcare with empathy, safety, and innovation. We believe every patient deserves personalized attention and the highest standards of medical excellence.
          </p>
          <p>
            <strong>Our Facilities:</strong> 500+ beds, 20+ specialized departments, state-of-the-art ICUs, modular operation theaters, advanced imaging (MRI, CT, PET), robotic surgery, and a 24/7 emergency & trauma center.
          </p>
        </div>
        
        {/* Hospital Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Location Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="bg-blue-600 p-4 flex items-center">
              <MapPin className="h-6 w-6 text-white mr-2" />
              <h3 className="text-xl font-bold text-white">Our Location</h3>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-700">
                MediCare Hospital is strategically located in the center of Medicity, making it easily accessible from all parts of the city.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="font-medium text-blue-900">
                  123 Healthcare Avenue<br />
                  Medicity, MC 54321<br />
                  Near Central Park
                </p>
              </div>
              <p className="text-gray-600 text-sm">
                <span className="font-semibold">Landmarks:</span> 2 miles from Central Station, adjacent to City Park
              </p>
            </div>
          </div>
          
          {/* Hours Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="bg-blue-600 p-4 flex items-center">
              <Clock className="h-6 w-6 text-white mr-2" />
              <h3 className="text-xl font-bold text-white">Hospital Hours</h3>
            </div>
            <div className="p-6 space-y-4">
              <ul className="space-y-2 text-gray-700">
                <li className="flex justify-between"><span>Monday - Friday:</span> <span className="font-medium">8:00 AM - 8:00 PM</span></li>
                <li className="flex justify-between"><span>Saturday:</span> <span className="font-medium">9:00 AM - 6:00 PM</span></li>
                <li className="flex justify-between"><span>Sunday:</span> <span className="font-medium">10:00 AM - 4:00 PM</span></li>
                <li className="flex justify-between mt-4 pt-2 border-t border-gray-200">
                  <span className="font-bold text-red-600">Emergency Services:</span> 
                  <span className="font-bold text-red-600">24/7</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Contact Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="bg-blue-600 p-4 flex items-center">
              <Phone className="h-6 w-6 text-white mr-2" />
              <h3 className="text-xl font-bold text-white">Contact Us</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-blue-600 mt-1 mr-3" />
                <div>
                  <p className="font-medium">Main: (123) 456-7890</p>
                  <p className="font-medium">Emergency: 911</p>
                  <p className="font-medium">Appointments: (123) 456-7891</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-blue-600 mt-1 mr-3" />
                <div>
                  <p className="font-medium">info@medicare.com</p>
                  <p className="font-medium">appointments@medicare.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional Information */}
        <div className="text-center text-blue-900 text-lg leading-relaxed space-y-8 mt-16">
          <p>
            <strong>Patient-Centric Approach:</strong> We offer seamless digital appointments, telemedicine, in-house pharmacy, and patient lounges. Our support teams ensure a smooth journey from admission to discharge.
          </p>
          <p>
            <strong>Research & Education:</strong> We are a teaching hospital, training the next generation of doctors and nurses, and conducting clinical research to advance medical science.
          </p>
          <p>
            <strong>Community Outreach:</strong> Free health camps, vaccination drives, and wellness programs for all age groups. We are committed to making a difference beyond our walls.
          </p>
          <p>
            <strong>International Patients:</strong> Dedicated coordinators, language support, and personalized care for patients from around the globe.
          </p>
        </div>
      </div>
    </Section>
  );
}
