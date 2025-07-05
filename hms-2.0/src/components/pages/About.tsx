import React from'react';
import { Section } from '../ui/Section';
import { Award, Users, Building2, Target, MapPin, Clock, Phone, Mail, Globe } from 'lucide-react';

export function About() {
  return (
    <div className="py-12 bg-gray-100">
      {/* About MediCare Section */}
      <Section title="About MediCare" description="Leading the way in healthcare excellence since 1970" background="white">
        <div className="max-w-4xl mx-auto text-gray-700 space-y-6 text-lg p-12">
          <p className="leading-relaxed">
            MediCare has been at the forefront of medical excellence for over 50 years. 
            Our commitment to providing exceptional healthcare services, combined with 
            cutting-edge technology and compassionate care, makes us a trusted name in 
            the healthcare industry.
          </p>
          <p className="leading-relaxed">
            Founded in 1970 by Dr. James Medicare, our hospital began as a small clinic with just 10 beds. 
            Today, we've grown into a state-of-the-art medical facility with over 500 beds, serving 
            more than 50,000 patients annually. Our campus spans 15 acres in the heart of Medicity, 
            providing a healing environment with modern amenities and green spaces.
          </p>
          <p className="leading-relaxed">
            We believe in a patient-first approach, ensuring that every individual 
            receives personalized attention and the highest standard of medical care. Our team of over 
            200 doctors, 500 nurses, and 300 support staff work tirelessly to provide the best healthcare 
            experience for our patients.
          </p>
        </div>
      </Section>

      {/* Our Values Section */}
      <Section title="Our Values" background="gray">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-12">
          {[
            {
              icon: Users,
              title: 'Patient-Centered Care',
              description: 'Putting patients first in everything we do'
            },
            {
              icon: Award,
              title: 'Excellence',
              description: 'Maintaining the highest standards in healthcare'
            },
            {
              icon: Target,
              title: 'Innovation',
              description: 'Embracing advanced medical technologies'
            },
            {
              icon: Building2,
              title: 'Integrity',
              description: 'Operating with transparency and ethical principles'
            }
          ].map((value, index) => {
            const Icon = value.icon;
            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center">
                <Icon className="w-16 h-16 text-blue-600 mx-auto mb-6 transition-all duration-300 transform group-hover:scale-110" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Our Achievements Section */}
      <Section title="Our Achievements" background="white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-12">
          {[
            { value: '50+', label: 'Years of Excellence' },
            { value: '200+', label: 'Expert Doctors' },
            { value: '50,000+', label: 'Patients Served' },
            { value: '99%', label: 'Patient Satisfaction' }
          ].map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-4">{stat.value}</div>
              <div className="text-xl text-gray-700">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Our Location Section */}
      <Section title="Visit Our Hospital" description="Conveniently located in the heart of Medicity" background="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-12">
          <div className="bg-blue-50 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
              <MapPin className="mr-2 text-blue-600" /> Our Location
            </h3>
            <div className="space-y-4">
              <p className="text-gray-700 text-lg">
                MediCare Hospital is strategically located in the center of Medicity, making it easily accessible from all parts of the city.
              </p>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <p className="font-medium text-gray-800">
                  123 Healthcare Avenue<br />
                  Medicity, MC 54321<br />
                  Near Central Park
                </p>
              </div>
              <p className="text-gray-700">
                <span className="font-semibold">Landmarks:</span> 2 miles from Central Station, adjacent to City Park
              </p>
              <div className="mt-4">
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium">
                  <Globe className="w-5 h-5 mr-2" />
                  <span>View on Google Maps</span>
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-blue-800 mb-6 flex items-center">
              <Clock className="mr-2 text-blue-600" /> Hours & Contact Information
            </h3>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-semibold text-gray-900 mb-2">Hospital Hours:</h4>
                <ul className="space-y-1 text-gray-700">
                  <li className="flex justify-between"><span>Monday - Friday:</span> <span>8:00 AM - 8:00 PM</span></li>
                  <li className="flex justify-between"><span>Saturday:</span> <span>9:00 AM - 6:00 PM</span></li>
                  <li className="flex justify-between"><span>Sunday:</span> <span>10:00 AM - 4:00 PM</span></li>
                  <li className="flex justify-between font-semibold text-red-600"><span>Emergency Services:</span> <span>24/7</span></li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-semibold text-gray-900 mb-2">Contact Us:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Phone className="w-5 h-5 mr-2 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Main Reception: (123) 456-7890</p>
                      <p className="font-medium">Emergency: 911</p>
                      <p className="font-medium">Appointments: (123) 456-7891</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Mail className="w-5 h-5 mr-2 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">General Inquiries: info@medicare.com</p>
                      <p className="font-medium">Appointments: appointments@medicare.com</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="mt-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center">
                  <Phone className="w-5 h-5 mr-2" />
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}