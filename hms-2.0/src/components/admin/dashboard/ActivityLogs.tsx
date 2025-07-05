import React from 'react';
import { Clock, User, AlertCircle } from 'lucide-react';

const mockLogs = [
  {
    id: '1',
    user: 'Dr. Sarah Johnson',
    action: 'Updated patient records',
    timestamp: '2024-03-10 14:30',
    type: 'info'
  },
  {
    id: '2',
    user: 'Admin',
    action: 'Added new staff member',
    timestamp: '2024-03-10 13:15',
    type: 'success'
  },
  {
    id: '3',
    user: 'System',
    action: 'Backup completed',
    timestamp: '2024-03-10 12:00',
    type: 'info'
  }
];

export function ActivityLogs() {
  return (
    <div className="space-y-4">
      {mockLogs.map((log) => (
        <div
          key={log.id}
          className="flex items-start gap-4 p-4 bg-white rounded-lg border border-gray-100"
        >
          <div className={`p-2 rounded-full ${
            log.type === 'success' ? 'bg-green-100' : 
            log.type === 'warning' ? 'bg-yellow-100' : 
            'bg-blue-100'
          }`}>
            {log.type === 'success' ? <User className="w-5 h-5 text-green-600" /> :
             log.type === 'warning' ? <AlertCircle className="w-5 h-5 text-yellow-600" /> :
             <Clock className="w-5 h-5 text-blue-600" />}
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium text-gray-900">{log.action}</p>
                <p className="text-sm text-gray-600">By {log.user}</p>
              </div>
              <span className="text-sm text-gray-500">{log.timestamp}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}