import React from 'react';
import { FileText, Download, Calendar } from 'lucide-react';
import { Button } from '../../ui/Button';
import axios from 'axios';

interface Record {
  id: string;
  type: string;
  date: string;
  doctor: string;
  description: string;
  fileUrl?: string;
}

const mockRecords: Record[] = [
  {
    id: '1',
    type: 'Lab Results',
    date: '2024-03-01',
    doctor: 'Dr. Sarah Johnson',
    description: 'Complete Blood Count (CBC)',
  },
  {
    id: '2',
    type: 'X-Ray Report',
    date: '2024-02-15',
    doctor: 'Dr. Michael Chen',
    description: 'Chest X-Ray Analysis',
  },
  {
    id: '3',
    type: 'MRI Report',
    date: '2024-01-10',
    doctor: 'Dr. Emily Davis',
    description: 'Brain MRI with Contrast',
  }
];

export function MedicalRecords() {
  const handleDownload = async (id: string) => {
    try {
      const response = await axios.get(`/api/records/${id}/download`);
      const { fileUrl } = response.data;
      window.open(fileUrl, '_blank');
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold text-gray-900">Medical Records</h3>
        <Button
          variant="primary"
          icon={FileText}
          className="hover:bg-gray-200 transition-colors"
        >
          Request Records
        </Button>
      </div>

      {/* Records Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRecords.map((record) => (
          <div
            key={record.id}
            className="border border-gray-200 rounded-lg p-5 bg-gray-50 hover:bg-white hover:shadow-lg transition-all"
          >
            {/* Record Type */}
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              {record.type}
            </h4>

            {/* Record Details */}
            <div className="text-sm text-gray-700 space-y-2">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                <span>{new Date(record.date).toLocaleDateString()}</span>
              </div>
              <p>
                <span className="font-medium">Doctor:</span> {record.doctor}
              </p>
              <p>{record.description}</p>
            </div>

            {/* Action Button */}
            <div className="mt-4">
              <Button
                variant="secondary"
                icon={Download}
                className="w-full flex justify-center hover:bg-blue-100 transition-colors"
                onClick={() => handleDownload(record.id)}
              >
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
