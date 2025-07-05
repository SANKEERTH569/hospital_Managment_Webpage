import React from 'react';
import { FaWater, FaRunning, FaAppleAlt, FaBed, FaHeartbeat } from 'react-icons/fa'; // Added more icons

interface HealthTip {
  title: string;
  content: string;
  icon: React.ReactNode;
  backgroundColor: string;
}

export function HealthTips() {
  // More detailed health tips data
  const healthTips: HealthTip[] = [
    {
      title: 'Drink More Water',
      content: 'Staying hydrated is crucial for maintaining good health. Aim for 8 glasses a day.',
      icon: <FaWater className="text-white" />,
      backgroundColor: 'bg-blue-500',
    },
    {
      title: 'Exercise Regularly',
      content: '30 minutes of exercise a day can improve cardiovascular health and mental well-being.',
      icon: <FaRunning className="text-white" />,
      backgroundColor: 'bg-green-500',
    },
    {
      title: 'Eat a Balanced Diet',
      content: 'Incorporate a variety of fruits, vegetables, proteins, and whole grains for a well-rounded diet.',
      icon: <FaAppleAlt className="text-white" />,
      backgroundColor: 'bg-yellow-500',
    },
    {
      title: 'Get Enough Sleep',
      content: 'Aim for 7-8 hours of sleep every night to help your body recover and function optimally.',
      icon: <FaBed className="text-white" />,
      backgroundColor: 'bg-purple-500',
    },
    {
      title: 'Monitor Your Heart Health',
      content: 'Regular check-ups and healthy habits like a balanced diet and exercise can keep your heart healthy.',
      icon: <FaHeartbeat className="text-white" />,
      backgroundColor: 'bg-red-500',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h4 className="text-3xl font-bold text-center mb-8">Health Tips and Articles</h4>
      <div className="space-y-6">
        {healthTips.map((tip, index) => (
          <div
            key={index}
            className={`flex items-start space-x-4 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ${tip.backgroundColor}`}
          >
            <div className="text-4xl">{tip.icon}</div>
            <div>
              <h5 className="text-xl font-semibold text-white mb-2">{tip.title}</h5>
              <p className="text-white opacity-90">{tip.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
