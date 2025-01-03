import React from'react';
import { Section } from '../ui/Section';
import { Award, Users, Building2, Target } from 'lucide-react';

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
            We believe in a patient-first approach, ensuring that every individual 
            receives personalized attention and the highest standard of medical care.
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

      {/* Call to Action Section */}
      <Section title="Get in Touch" background="gray">
        <div className="max-w-4xl mx-auto text-gray-700 space-y-6 text-lg p-12">
          <p className="leading-relaxed">
            If you have any questions or would like to schedule an appointment, please don't hesitate to contact us.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Contact Us
          </button>
        </div>
      </Section>
    </div>
  );
}