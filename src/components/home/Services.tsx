import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Section } from "../ui/Section";
import { services } from "../../constants/services";

export function Services() {
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-semibold tracking-wider uppercase">Our Specialties</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">Comprehensive Medical Services</h2>
          <div className="h-1 w-24 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From advanced diagnostics to compassionate care, discover how we
            redefine healthcare excellence for you and your family.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(`/doctors/${service.slug}`)}
              >
                <div className="p-6">
                  <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                </div>
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-blue-600 font-medium text-sm">Find Specialists</span>
                  <ChevronRight className="w-5 h-5 text-blue-600 transform transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="/services" 
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md"
          >
            View All Services
            <ChevronRight className="ml-2 w-5 h-5" />
          </a>
          <p className="mt-4 text-gray-500 text-sm">Discover our full range of medical specialties and services</p>
        </div>
      </div>
    </section>
  );
}
// Add .animate-3d-bounce, .animate-gradient-move, .animate-float-slow, .animate-float-fast, .animate-fade-in-up, .animate-glow, .hover:shadow-3xl to your CSS/Tailwind config for full effect.
