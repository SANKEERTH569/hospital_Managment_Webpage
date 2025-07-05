import React from 'react';
import { BarChart, PieChart, TrendingUp } from 'lucide-react';

export function DoctorAnalytics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Patient Volume */}
      <div className="bg-white/80 p-6 rounded-2xl shadow-xl">
        <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
          <BarChart className="w-6 h-6" /> Patient Volume
        </h3>
        {/* Placeholder for chart */}
        <div className="h-48 bg-blue-50 rounded-lg flex items-center justify-center">
          <p className="text-blue-400">Bar chart coming soon</p>
        </div>
      </div>

      {/* Appointment Types */}
      <div className="bg-white/80 p-6 rounded-2xl shadow-xl">
        <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
          <PieChart className="w-6 h-6" /> Appointment Types
        </h3>
        <div className="h-48 bg-green-50 rounded-lg flex items-center justify-center">
          <p className="text-green-400">Pie chart coming soon</p>
        </div>
      </div>

      {/* Performance Trends */}
      <div className="bg-white/80 p-6 rounded-2xl shadow-xl">
        <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6" /> Performance Trends
        </h3>
        <div className="h-48 bg-yellow-50 rounded-lg flex items-center justify-center">
          <p className="text-yellow-400">Line chart coming soon</p>
        </div>
      </div>
    </div>
  );
}