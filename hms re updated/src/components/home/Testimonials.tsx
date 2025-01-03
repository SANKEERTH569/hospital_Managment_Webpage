import React from 'react';
import { Quote } from 'lucide-react';
import { Section } from '../ui/Section';
import { testimonials } from '../../constants/testimonials';

export function Testimonials() {
  return (
    <Section
      title="Patient Testimonials"
      description="Read what our patients say about their experience with our healthcare services and dedicated medical team."
      background="gray"
      className="relative bg-gradient-to-r from-blue-100 to-blue-200 py-16"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => {
          // Update the images in order as per your request
          if (index === 0) {
            testimonial.image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqDztr9VCk90qMMMJKOstI8UpnMfSmX21A3w&s";
          } else if (index === 1) {
            testimonial.image = "https://media.istockphoto.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.jpg?s=612x612&w=0&k=20&c=EqR2Lffp4tkIYzpqYh8aYIPRr-gmZliRHRxcQC5yylY=";
          } else if (index === 2) {
            testimonial.image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwRPWpO-12m19irKlg8znjldmcZs5PO97B6A&s";
          }

          return (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl group relative"
            >
              {/* Quote Icon with Animation */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-4 bg-blue-100 rounded-full shadow-lg group-hover:shadow-2xl transition-all duration-300">
                <Quote className="w-8 h-8 text-blue-500" />
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-600 mb-4 text-lg italic font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                "{testimonial.text}"
              </p>

              {/* Testimonial Author Section with Image (Optional) */}
              <div className="mt-4 flex items-center space-x-4">
                {/* Optional Author Image */}
                <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0">
                  <img
                    src={testimonial.image || "https://via.placeholder.com/150"}
                    alt={testimonial.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-lg">{testimonial.name}</p>
                  <p className="text-blue-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
