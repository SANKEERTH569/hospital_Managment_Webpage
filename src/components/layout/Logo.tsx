import React from 'react';
import { Building2 } from 'lucide-react';

export function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <Building2 className="w-8 h-8 text-blue-600" />
      <span className="text-xl font-bold text-blue-900">MediCare</span>
    </div>
  );
}