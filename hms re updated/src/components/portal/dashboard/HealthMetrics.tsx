import React from 'react';
import { Activity, Heart, Weight, Ruler } from 'lucide-react';

interface HealthMetric {
  id: string;
  type: string;
  value: string;
  unit: string;
  date: string;
  icon: React.ElementType;
  trend?: 'up' | 'down' | 'stable';
}

const mockMetrics: HealthMetric[] = [
  {
    id: '1',
    type: 'Blood Pressure',
    value: '120/80',
    unit: 'mmHg',
    date: '2024-03-01',
    icon: Heart,
    trend: 'stable'
  },
  {
    id: '2',
    type: 'Weight',
    value: '70',
    unit: 'kg',
    date: '2024-03-01',
    icon: Weight,
    trend: 'down'
  },
  {
    id: '3',
    type: 'Height',
    value: '175',
    unit: 'cm',
    date: '2024-03-01',
    icon: Ruler
  },
  {
    id: '4',
    type: 'Heart Rate',
    value: '72',
    unit: 'bpm',
    date: '2024-03-01',
    icon: Activity,
    trend: 'up'
  }
];

export function HealthMetrics() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg shadow-lg p-8">
      <h3 className="text-2xl font-bold text-blue-800 mb-8">Health Metrics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockMetrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.id}
              className="border rounded-lg p-6 bg-white hover:shadow-xl transition-shadow transform hover:-translate-y-1 transition-transform duration-200 ease-in-out"
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-10 h-10 text-blue-600" />
                {metric.trend && (
                  <span className={`text-lg font-bold ${
                    metric.trend === 'up' ? 'text-red-500' :
                    metric.trend === 'down' ? 'text-green-500' :
                    'text-gray-500'
                  }`}>
                    {metric.trend === 'up' ? '↑' :
                     metric.trend === 'down' ? '↓' : '→'}
                  </span>
                )}
              </div>
              
              <div className="space-y-2">
                <p className="text-lg text-gray-800 font-medium">{metric.type}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {metric.value}
                  <span className="text-lg text-gray-600 ml-1">
                    {metric.unit}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Last updated: {new Date(metric.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
