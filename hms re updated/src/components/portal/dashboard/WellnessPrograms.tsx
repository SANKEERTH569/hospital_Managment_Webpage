import React from 'react';
import { FaAppleAlt, FaRunning, FaHandsHelping } from 'react-icons/fa'; // Importing other icons

interface WellnessProgram {
  name: string;
  details: string;
  icon: React.ReactNode;
  backgroundColor: string;
}

export function WellnessPrograms() {
  // Sample wellness programs data
  const programs: WellnessProgram[] = [
    {
      name: 'Yoga Classes',
      details: 'A 5-day program to improve flexibility and reduce stress.',
      icon: <div className="text-white text-5xl">🧘‍♂️</div>, // Replaced FaYoga with a yoga emoji
      backgroundColor: 'bg-gradient-to-r from-purple-600 to-indigo-800',
    },
    {
      name: 'Nutrition Counseling',
      details: 'One-on-one sessions with a certified nutritionist to improve your diet.',
      icon: <FaAppleAlt className="text-white text-5xl" />,
      backgroundColor: 'bg-gradient-to-r from-green-500 to-teal-600',
    },
    {
      name: 'Running Club',
      details: 'Join our community for weekly runs to improve cardiovascular health.',
      icon: <FaRunning className="text-white text-5xl" />,
      backgroundColor: 'bg-gradient-to-r from-blue-600 to-cyan-600',
    },
    {
      name: 'Stress Relief Workshop',
      details: 'Learn techniques to manage stress and achieve mental wellness.',
      icon: <FaHandsHelping className="text-white text-5xl" />,
      backgroundColor: 'bg-gradient-to-r from-yellow-500 to-orange-600',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-7xl mx-auto mt-12">
      <h4 className="text-4xl font-extrabold text-center text-gray-800 mb-12 tracking-wide">
        Wellness Programs
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((program, index) => (
          <div
            key={index}
            className={`flex items-start p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${program.backgroundColor} h-[280px]`}
          >
            <div className="mr-6">
              {program.icon}
            </div>
            <div className="text-white flex flex-col justify-between">
              <h5 className="text-2xl font-semibold mb-2">{program.name}</h5>
              <p className="text-lg opacity-90">{program.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
