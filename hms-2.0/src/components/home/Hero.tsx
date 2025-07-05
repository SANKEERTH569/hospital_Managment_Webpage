import React, { useState, useEffect } from "react";
import { Calendar, Phone, MapPin, Clock, Building, Info, ChevronRight, Heart, Activity, Shield, Users } from "lucide-react";
import { AppointmentModal } from "../appointments/AppointmentModal";

export function Hero() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [showLocationInfo, setShowLocationInfo] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const heroSlides = [
    {
      title: "Advanced Healthcare",
      subtitle: "For a Better Life",
      description: "Experience personalized care with our team of specialists using the latest medical technology.",
      image: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?q=80&w=1920&auto=format&fit=crop",
      ctaText: "Book an Appointment"
    },
    {
      title: "Expert Doctors",
      subtitle: "Compassionate Care",
      description: "Our team of board-certified physicians is dedicated to providing the highest quality healthcare.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1920&auto=format&fit=crop",
      ctaText: "Meet Our Doctors"
    },
    {
      title: "State-of-the-Art",
      subtitle: "Facilities & Equipment",
      description: "Our hospital features the latest medical technology and comfortable healing environments.",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1920&auto=format&fit=crop",
      ctaText: "Explore Services"
    }
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Modern Hero Section with Image Slider */}
      <div className="relative w-full h-[90vh] overflow-hidden">
        {/* Background Image Slider */}
        {heroSlides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{ 
                backgroundImage: `url(${slide.image})`,
                transform: index === currentSlide ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 6s ease-in-out'
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/60"></div>
          </div>
        ))}
        
        {/* Content */}
        <div className="relative h-full container mx-auto px-6 flex items-center">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="mb-4 flex items-center">
              <div className="h-1 w-16 bg-blue-400 mr-4"></div>
              <span className="text-blue-300 uppercase tracking-wider font-semibold">MediCare Hospital</span>
            </div>
            
            {heroSlides.map((slide, index) => (
              <div 
                key={index} 
                className={`transition-all duration-1000 ${index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 absolute'}`}
                style={{ display: index === currentSlide ? 'block' : 'none' }}
              >
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-2 leading-tight">
                  {slide.title}
                  <span className="block text-blue-300">{slide.subtitle}</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-xl">
                  {slide.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => index === 0 ? setIsAppointmentModalOpen(true) : null}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg shadow-lg flex items-center font-semibold transition-all duration-300 hover:translate-x-1"
                  >
                    {slide.ctaText}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                  <button className="bg-transparent border-2 border-white/60 text-white px-8 py-4 rounded-lg hover:bg-white/10 transition-all duration-300 flex items-center font-semibold">
                    <Phone className="mr-2 h-5 w-5" />
                    Emergency: 911
                  </button>
                </div>
              </div>
            ))}
            
            {/* Slider Navigation */}
            <div className="flex space-x-2 mt-12">
              {heroSlides.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-blue-400 w-10' : 'bg-white/50 hover:bg-white/80'}`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Hospital Information Section - Clean, Modern Design */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Welcome to MediCare Hospital</h2>
            <div className="h-1 w-24 bg-blue-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Your trusted healthcare partner, providing exceptional medical services with compassion and care since 1970.</p>
          </div>
          
          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-lg p-8 transition-all duration-300 hover:shadow-lg group">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <Heart className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Specialized Care</h3>
              <p className="text-gray-600">Our team of specialists provides personalized care using the latest medical approaches.</p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-lg p-8 transition-all duration-300 hover:shadow-lg group">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <Activity className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Advanced Technology</h3>
              <p className="text-gray-600">State-of-the-art equipment and facilities for accurate diagnosis and effective treatment.</p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-lg p-8 transition-all duration-300 hover:shadow-lg group">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <Shield className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Patient Safety</h3>
              <p className="text-gray-600">Rigorous protocols and standards to ensure the highest level of safety for all patients.</p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-gray-50 rounded-lg p-8 transition-all duration-300 hover:shadow-lg group">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                <Users className="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Compassionate Team</h3>
              <p className="text-gray-600">Dedicated healthcare professionals committed to providing empathetic care.</p>
            </div>
          </div>
          
          {/* Hospital Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Location & Hours */}
            <div className="bg-blue-600 text-white rounded-lg overflow-hidden shadow-lg">
              <div className="p-6 border-b border-blue-500">
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 mr-3" />
                  <h3 className="text-xl font-bold">Location & Hours</h3>
                </div>
                <p className="mb-4">
                  123 Healthcare Avenue<br />
                  Medicity, MC 54321<br />
                  Near Central Park
                </p>
                <div className="mt-4 space-y-1 text-blue-100">
                  <div className="flex justify-between"><span>Mon-Fri:</span> <span>8:00 AM - 8:00 PM</span></div>
                  <div className="flex justify-between"><span>Saturday:</span> <span>9:00 AM - 6:00 PM</span></div>
                  <div className="flex justify-between"><span>Sunday:</span> <span>10:00 AM - 4:00 PM</span></div>
                  <div className="flex justify-between font-bold text-white"><span>Emergency:</span> <span>24/7</span></div>
                </div>
              </div>
              <div className="p-4 bg-blue-700 flex justify-between items-center">
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-white text-sm font-medium flex items-center group">
                  <span>View on Google Maps</span>
                  <ChevronRight className="ml-1 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <Phone className="w-5 h-5" />
              </div>
            </div>
            
            {/* Facilities */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <Building className="w-6 h-6 mr-3 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-800">Our Facilities</h3>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-3">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">Modern ICU</span>
                      <p className="text-sm text-gray-500">24/7 monitoring with advanced equipment</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-3">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">Diagnostic Center</span>
                      <p className="text-sm text-gray-500">Latest imaging and laboratory services</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-3">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">Surgery Units</span>
                      <p className="text-sm text-gray-500">Specialized teams for all surgical needs</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 mr-3">
                      <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">Rehabilitation</span>
                      <p className="text-sm text-gray-500">Comprehensive recovery programs</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <a href="/services" className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center justify-center">
                  <span>View All Facilities</span>
                  <ChevronRight className="ml-1 w-4 h-4" />
                </a>
              </div>
            </div>
            
            {/* Contact & Appointments */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg border border-gray-200">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <Phone className="w-6 h-6 mr-3 text-blue-600" />
                  <h3 className="text-xl font-bold text-gray-800">Contact Us</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center mt-0.5 mr-3">
                      <Phone className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <span className="font-bold text-red-600">Emergency: 911</span>
                      <p className="text-sm text-gray-500">Available 24/7 for urgent care</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 mr-3">
                      <Phone className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">Main: (123) 456-7890</span>
                      <p className="text-sm text-gray-500">For general inquiries</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 mr-3">
                      <Calendar className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <span className="font-medium text-gray-800">Appointments: (123) 456-7891</span>
                      <p className="text-sm text-gray-500">Schedule your visit</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-blue-600 flex justify-center">
                <button 
                  onClick={() => setIsAppointmentModalOpen(true)}
                  className="text-white font-medium flex items-center justify-center w-full py-2 hover:bg-blue-700 transition-colors rounded"
                >
                  <Calendar className="mr-2 w-5 h-5" />
                  Book an Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <div className="text-center animate-fade-in-up" style={{animationDelay: '0.5s'}}>
        <a href="/about" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
          Learn More About Our Hospital
        </a>
      </div>
      
      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />
    </>
  );
}

// Add .animate-3d-bounce, .animate-gradient-move, .animate-float-slow, .animate-float-fast, .animate-fade-in-up, .animate-slide-down, .animate-fade-in, .animate-glow, .hover:shadow-3xl to your CSS/Tailwind config for full effect.
