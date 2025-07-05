import React from 'react';
import { Quote, Star } from 'lucide-react';
import { Section } from '../ui/Section';
import { testimonials } from '../../constants/testimonials';

export function Testimonials() {
  return (
    <Section
      title="Patient Testimonials"
      description="Hear what our patients have to say about their experience with our healthcare services"
      className="py-20 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Stories from Our Patients</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Real experiences shared by those who have trusted us with their care</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            // Set images for testimonials
            const images = [
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqDztr9VCk90qMMMJKOstI8UpnMfSmX21A3w&s",
              "https://media.istockphoto.com/id/1317804578/photo/one-businesswoman-headshot-smiling-at-the-camera.jpg?s=612x612&w=0&k=20&c=EqR2Lffp4tkIYzpqYh8aYIPRr-gmZliRHRxcQC5yylY=",
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwRPWpO-12m19irKlg8znjldmcZs5PO97B6A&s"
            ];
            testimonial.image = images[index];
            
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
              >
                <div className="mb-4 text-blue-500">
                  <Quote className="w-8 h-8" />
                </div>
                
                <div className="flex-grow">
                  <p className="text-gray-700 mb-4">
                    "{testimonial.text}"
                  </p>
                </div>
                
                <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                  <div className="flex-shrink-0 mr-4">
                    <img
                      src={testimonial.image || "https://via.placeholder.com/150"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                  <div className="ml-auto flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-12 text-center">
          <a href="/testimonials" className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors duration-300">
            View More Patient Stories
          </a>
        </div>
      </div>
    </Section>
  );
}
// Add .animate-3d-bounce, .animate-gradient-move, .animate-float-slow, .animate-float-fast, .animate-fade-in-up, .animate-glow, .hover:shadow-3xl to your CSS/Tailwind config for full effect.
