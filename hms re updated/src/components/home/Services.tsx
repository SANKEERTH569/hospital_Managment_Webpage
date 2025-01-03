import React from "react";
import { Section } from "../ui/Section";
import { services } from "../../constants/services";

export function Services() {
  return (
    <Section
      title="Our Services"
      description="We offer a wide range of medical services to meet all your healthcare needs. Our experienced team ensures you receive the best possible care."
      background="gray"
    >
      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={index}
              className="group relative p-6 bg-white rounded-3xl shadow-md hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              {/* Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-3xl"></div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <div className="flex items-center justify-center mb-4">
                  <Icon className="w-14 h-14 text-blue-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-100 mt-3 transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
