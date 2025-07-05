import React, { useState } from 'react';
import { Activity, Heart, Weight, Ruler, Droplets, Thermometer, Brain, Plus, Calendar, TrendingUp, History, FileText, BarChart2 } from 'lucide-react';
import { FaRunning, FaAppleAlt, FaBed, FaWater } from 'react-icons/fa';

interface HealthMetric {
  id: string;
  type: string;
  value: string;
  unit: string;
  date: string;
  icon: React.ElementType;
  trend?: 'up' | 'down' | 'stable';
  color?: string;
  description?: string;
  history?: Array<{value: string, date: string}>;
}

const mockMetrics: HealthMetric[] = [
  {
    id: '1',
    type: 'Blood Pressure',
    value: '120/80',
    unit: 'mmHg',
    date: '2024-03-15',
    icon: Heart,
    trend: 'stable',
    color: 'blue',
    description: 'Normal range',
    history: [
      {value: '122/82', date: '2024-03-01'},
      {value: '118/78', date: '2024-02-15'},
      {value: '125/85', date: '2024-02-01'}
    ]
  },
  {
    id: '2',
    type: 'Weight',
    value: '70',
    unit: 'kg',
    date: '2024-03-12',
    icon: Weight,
    trend: 'down',
    color: 'green',
    description: 'Healthy progress',
    history: [
      {value: '71.5', date: '2024-03-01'},
      {value: '72.3', date: '2024-02-15'},
      {value: '73.1', date: '2024-02-01'}
    ]
  },
  {
    id: '3',
    type: 'Height',
    value: '175',
    unit: 'cm',
    date: '2024-01-10',
    icon: Ruler,
    color: 'purple'
  },
  {
    id: '4',
    type: 'Heart Rate',
    value: '72',
    unit: 'bpm',
    date: '2024-03-15',
    icon: Activity,
    trend: 'up',
    color: 'red',
    description: 'Within normal range',
    history: [
      {value: '68', date: '2024-03-01'},
      {value: '70', date: '2024-02-15'},
      {value: '65', date: '2024-02-01'}
    ]
  },
  {
    id: '5',
    type: 'Blood Glucose',
    value: '95',
    unit: 'mg/dL',
    date: '2024-03-14',
    icon: Droplets,
    trend: 'stable',
    color: 'orange',
    description: 'Fasting level',
    history: [
      {value: '98', date: '2024-03-01'},
      {value: '92', date: '2024-02-15'},
      {value: '97', date: '2024-02-01'}
    ]
  },
  {
    id: '6',
    type: 'Body Temperature',
    value: '36.6',
    unit: '°C',
    date: '2024-03-15',
    icon: Thermometer,
    color: 'teal'
  },
  {
    id: '7',
    type: 'Oxygen Saturation',
    value: '98',
    unit: '%',
    date: '2024-03-15',
    icon: Brain,
    color: 'indigo',
    description: 'Excellent level'
  },
  {
    id: '8',
    type: 'Steps',
    value: '8,542',
    unit: 'steps',
    date: '2024-03-15',
    icon: FaRunning,
    trend: 'up',
    color: 'emerald',
    description: '85% of daily goal'
  }
];

export function HealthMetrics() {
  const [selectedCategory, setSelectedCategory] = useState('vitals');
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  // Filter metrics based on selected category
  const getFilteredMetrics = () => {
    if (selectedCategory === 'vitals') {
      return mockMetrics.filter(m => ['Blood Pressure', 'Heart Rate', 'Body Temperature', 'Oxygen Saturation'].includes(m.type));
    } else if (selectedCategory === 'body') {
      return mockMetrics.filter(m => ['Weight', 'Height', 'BMI'].includes(m.type));
    } else if (selectedCategory === 'activity') {
      return mockMetrics.filter(m => ['Steps'].includes(m.type));
    } else if (selectedCategory === 'lab') {
      return mockMetrics.filter(m => ['Blood Glucose'].includes(m.type));
    } else {
      return mockMetrics;
    }
  };

  const filteredMetrics = getFilteredMetrics();
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800">Health Metrics</h3>
          <p className="text-gray-500 mt-1">Track and monitor your health indicators</p>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors flex items-center">
            <Plus size={16} className="mr-1" />
            Add Metric
          </button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center">
            <History size={16} className="mr-1" />
            History
          </button>
        </div>
      </div>
      
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-2">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`py-2 px-4 rounded-lg transition-all duration-300 ${selectedCategory === 'all' ? 'bg-blue-100 text-blue-700 font-medium' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
        >
          All Metrics
        </button>
        <button
          onClick={() => setSelectedCategory('vitals')}
          className={`py-2 px-4 rounded-lg transition-all duration-300 ${selectedCategory === 'vitals' ? 'bg-red-100 text-red-700 font-medium' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
        >
          Vital Signs
        </button>
        <button
          onClick={() => setSelectedCategory('body')}
          className={`py-2 px-4 rounded-lg transition-all duration-300 ${selectedCategory === 'body' ? 'bg-green-100 text-green-700 font-medium' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
        >
          Body Metrics
        </button>
        <button
          onClick={() => setSelectedCategory('activity')}
          className={`py-2 px-4 rounded-lg transition-all duration-300 ${selectedCategory === 'activity' ? 'bg-emerald-100 text-emerald-700 font-medium' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
        >
          Activity
        </button>
        <button
          onClick={() => setSelectedCategory('lab')}
          className={`py-2 px-4 rounded-lg transition-all duration-300 ${selectedCategory === 'lab' ? 'bg-orange-100 text-orange-700 font-medium' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
        >
          Lab Results
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMetrics.map((metric) => {
          const Icon = metric.icon;
          const colorMap: Record<string, string> = {
            blue: 'from-blue-400 to-blue-500',
            green: 'from-green-400 to-green-500',
            red: 'from-red-400 to-red-500',
            purple: 'from-purple-400 to-purple-500',
            orange: 'from-orange-400 to-orange-500',
            teal: 'from-teal-400 to-teal-500',
            indigo: 'from-indigo-400 to-indigo-500',
            emerald: 'from-emerald-400 to-emerald-500'
          };
          
          const bgColorMap: Record<string, string> = {
            blue: 'bg-blue-50',
            green: 'bg-green-50',
            red: 'bg-red-50',
            purple: 'bg-purple-50',
            orange: 'bg-orange-50',
            teal: 'bg-teal-50',
            indigo: 'bg-indigo-50',
            emerald: 'bg-emerald-50'
          };
          
          const textColorMap: Record<string, string> = {
            blue: 'text-blue-600',
            green: 'text-green-600',
            red: 'text-red-600',
            purple: 'text-purple-600',
            orange: 'text-orange-600',
            teal: 'text-teal-600',
            indigo: 'text-indigo-600',
            emerald: 'text-emerald-600'
          };
          
          const gradientColor = colorMap[metric.color || 'blue'];
          const bgColor = bgColorMap[metric.color || 'blue'];
          const textColor = textColorMap[metric.color || 'blue'];
          
          return (
            <div
              key={metric.id}
              className="relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 ease-in-out"
              onClick={() => setSelectedMetric(metric.id === selectedMetric ? null : metric.id)}
            >
              {/* Decorative gradient accent */}
              <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${gradientColor}`}></div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-full ${bgColor}`}>
                    <Icon className={`w-6 h-6 ${textColor}`} />
                  </div>
                  {metric.trend && (
                    <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      metric.trend === 'up' ? 'bg-red-100 text-red-600' :
                      metric.trend === 'down' ? 'bg-green-100 text-green-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {metric.trend === 'up' ? (
                        <>
                          <TrendingUp className="w-3 h-3 mr-1" />
                          <span>Up</span>
                        </>
                      ) : metric.trend === 'down' ? (
                        <>
                          <TrendingUp className="w-3 h-3 mr-1 transform rotate-180" />
                          <span>Down</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
                          </svg>
                          <span>Stable</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 font-medium">{metric.type}</p>
                  <div className="flex items-baseline">
                    <p className="text-3xl font-bold text-gray-900">
                      {metric.value}
                    </p>
                    <span className="text-sm text-gray-600 ml-1">
                      {metric.unit}
                    </span>
                  </div>
                  {metric.description && (
                    <p className="text-xs text-gray-600 mt-1">{metric.description}</p>
                  )}
                  <p className="text-xs text-gray-400 mt-2 flex items-center">
                    <Calendar size={12} className="mr-1" />
                    {new Date(metric.date).toLocaleDateString()}
                  </p>
                </div>
                
                {/* History preview (only show if expanded and has history) */}
                {selectedMetric === metric.id && metric.history && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs font-medium text-gray-500 mb-2">Recent History</p>
                    <div className="space-y-2">
                      {metric.history.map((item, index) => (
                        <div key={index} className="flex justify-between text-xs">
                          <span className="text-gray-500">{new Date(item.date).toLocaleDateString()}</span>
                          <span className="font-medium">{item.value} {metric.unit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                <button className={`text-xs ${textColor} hover:underline font-medium flex items-center`}>
                  <FileText size={12} className="mr-1" />
                  Details
                </button>
                <button className={`text-xs ${textColor} hover:underline font-medium flex items-center`}>
                  <BarChart2 size={12} className="mr-1" />
                  Trends
                </button>
              </div>
            </div>
          );
        })}
        
        {/* Add new metric card */}
        <div className="rounded-xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-6 min-h-[220px] hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
            <Plus className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-gray-600 font-medium">Add New Metric</p>
          <p className="text-xs text-gray-500 text-center mt-2">Track additional health parameters</p>
        </div>
      </div>
      
      {/* Health Insights Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Health Trends */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 flex justify-between items-center">
            <h4 className="text-white font-medium flex items-center">
              <TrendingUp className="mr-2" size={18} />
              Health Trends
            </h4>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-white/20 text-white text-xs rounded hover:bg-white/30">Week</button>
              <button className="px-3 py-1 bg-white/10 text-white text-xs rounded hover:bg-white/30">Month</button>
              <button className="px-3 py-1 bg-white/10 text-white text-xs rounded hover:bg-white/30">Year</button>
            </div>
          </div>
          <div className="p-6 h-64 bg-gray-50 flex flex-col justify-center items-center">
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500 flex flex-col items-center">
                <BarChart2 size={48} className="text-gray-300 mb-3" />
                Interactive health charts coming soon
              </p>
            </div>
          </div>
        </div>
        
        {/* Health Recommendations */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-green-500 to-emerald-600">
            <h4 className="text-white font-medium">Wellness Tips</h4>
          </div>
          <div className="p-4 divide-y divide-gray-100">
            <div className="py-3 flex items-start">
              <div className="p-2 rounded-full bg-blue-100 mr-3">
                <FaWater className="text-blue-600" />
              </div>
              <div>
                <h5 className="font-medium text-sm">Stay Hydrated</h5>
                <p className="text-xs text-gray-600 mt-1">Aim for 8 glasses of water daily for optimal health</p>
              </div>
            </div>
            <div className="py-3 flex items-start">
              <div className="p-2 rounded-full bg-green-100 mr-3">
                <FaAppleAlt className="text-green-600" />
              </div>
              <div>
                <h5 className="font-medium text-sm">Nutrition Reminder</h5>
                <p className="text-xs text-gray-600 mt-1">Include more fruits and vegetables in your diet</p>
              </div>
            </div>
            <div className="py-3 flex items-start">
              <div className="p-2 rounded-full bg-indigo-100 mr-3">
                <FaRunning className="text-indigo-600" />
              </div>
              <div>
                <h5 className="font-medium text-sm">Activity Goal</h5>
                <p className="text-xs text-gray-600 mt-1">Try to reach 10,000 steps daily for cardiovascular health</p>
              </div>
            </div>
            <div className="py-3 flex items-start">
              <div className="p-2 rounded-full bg-purple-100 mr-3">
                <FaBed className="text-purple-600" />
              </div>
              <div>
                <h5 className="font-medium text-sm">Sleep Quality</h5>
                <p className="text-xs text-gray-600 mt-1">Aim for 7-8 hours of quality sleep each night</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Upcoming Health Checkups */}
      <div className="mt-6 bg-white rounded-xl shadow-md overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600">
          <h4 className="text-white font-medium">Upcoming Health Checkups</h4>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg mb-2">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-purple-100 mr-3">
                <Heart className="text-purple-600" size={16} />
              </div>
              <div>
                <h5 className="font-medium text-sm">Annual Physical Examination</h5>
                <p className="text-xs text-gray-600">Dr. Sarah Johnson</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-purple-700">April 15, 2024</p>
              <p className="text-xs text-gray-500">10:30 AM</p>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-blue-100 mr-3">
                <Droplets className="text-blue-600" size={16} />
              </div>
              <div>
                <h5 className="font-medium text-sm">Blood Work</h5>
                <p className="text-xs text-gray-600">City Hospital Lab</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-blue-700">March 28, 2024</p>
              <p className="text-xs text-gray-500">8:00 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
