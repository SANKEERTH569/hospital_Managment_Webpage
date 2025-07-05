import React from 'react';
import { Section } from '../ui/Section';
import { Heart, Brain, Bone, Stethoscope, Activity, Syringe, Baby, Eye } from 'lucide-react';

const departments = [
  {
    icon: Heart,
    name: 'Cardiology',
    description: 'Comprehensive heart care with advanced diagnostic and treatment facilities.',
    head: 'Dr. Sarah Johnson',
  },
  {
    icon: Brain,
    name: 'Neurology',
    description: 'Expert care for neurological conditions and disorders.',
    head: 'Dr. Michael Chen',
  },
  {
    icon: Bone,
    name: 'Orthopedics',
    description: 'Specialized treatment for bone, joint, and muscle conditions.',
    head: 'Dr. Emily Rodriguez',
  },
  {
    icon: Syringe,
    name: 'Emergency Medicine',
    description: '24/7 emergency care with rapid response capabilities.',
    head: 'Dr. James Wilson',
  },
  {
    icon: Baby,
    name: 'Pediatrics',
    description: 'Comprehensive healthcare for infants, children, and adolescents.',
    head: 'Dr. Lisa Anderson',
  },
  {
    icon: Eye,
    name: 'Ophthalmology',
    description: 'Advanced eye care and surgical procedures.',
    head: 'Dr. Robert Brown',
  },
  {
    icon: Stethoscope,
    name: 'Dental Care',
    description: 'Complete dental care and oral surgery services.',
    head: 'Dr. Maria Garcia',
  },
  {
    icon: Stethoscope,
    name: 'Internal Medicine',
    description: 'Comprehensive care for adult diseases and conditions.',
    head: 'Dr. David Lee',
  },
  {
    icon: Activity,
    name: 'Diagnostics',
    description: 'State-of-the-art diagnostic and imaging services.',
    head: 'Dr. Susan Taylor',
  },
];

export function Departments() {
  return (
    <Section
      title="Our Departments"
      description="Explore our specialized departments equipped with cutting-edge technology and staffed by experienced healthcare professionals."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {departments.map((dept, index) => {
          const Icon = dept.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full shadow-lg transform transition-all duration-300 hover:scale-110">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 ml-4">{dept.name}</h3>
              </div>
              <p className="text-gray-600 mb-4">{dept.description}</p>
              <div className="border-t pt-4">
                <p className="text-sm text-gray-500">Department Head</p>
                <p className="font-medium text-blue-600">{dept.head}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
