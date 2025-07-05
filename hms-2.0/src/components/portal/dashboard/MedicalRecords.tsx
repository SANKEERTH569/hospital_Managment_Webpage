import React, { useState } from 'react';
import { FileText, Download, Calendar, Search, Filter, Plus, Eye, Clock, User } from 'lucide-react';
import Button from '../../common/Button';
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
    fileUrl: '#'
  },
  {
    id: '2',
    type: 'X-Ray Report',
    date: '2024-02-15',
    doctor: 'Dr. Michael Chen',
    description: 'Chest X-Ray Analysis',
    fileUrl: '#'
  },
  {
    id: '3',
    type: 'MRI Report',
    date: '2024-01-10',
    doctor: 'Dr. Emily Davis',
    description: 'Brain MRI with Contrast',
    fileUrl: '#'
  },
  {
    id: '4',
    type: 'Prescription',
    date: '2024-02-28',
    doctor: 'Dr. James Wilson',
    description: 'Medication for hypertension',
    fileUrl: '#'
  },
  {
    id: '5',
    type: 'Vaccination Record',
    date: '2024-01-05',
    doctor: 'Dr. Lisa Park',
    description: 'Annual flu vaccination',
    fileUrl: '#'
  },
  {
    id: '6',
    type: 'Surgical Report',
    date: '2023-11-20',
    doctor: 'Dr. Robert Brown',
    description: 'Appendectomy procedure details',
    fileUrl: '#'
  }
];

export function MedicalRecords() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const recordTypes = ['All', 'Lab Results', 'X-Ray Report', 'MRI Report', 'Prescription', 'Vaccination Record', 'Surgical Report'];
  
  const handleDownload = async (id: string) => {
    try {
      // In a real app, this would call the API
      // For now, we'll just simulate a download with the mock data
      const record = mockRecords.find(r => r.id === id);
      if (record?.fileUrl) {
        window.open(record.fileUrl, '_blank');
      }
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  // Filter records based on search term and selected type
  const filteredRecords = mockRecords.filter(record => {
    const matchesSearch = 
      record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'All' || record.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div>
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Medical Records</h2>
          <p className="text-sm text-gray-500 mt-1">View and download your medical history</p>
        </div>
        <Button
          variant="primary"
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Request Records
        </Button>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-grow max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search records..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Filter by Type */}
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              className="border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {recordTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
            <button
              className={`p-2 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setViewMode('grid')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setViewMode('list')}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Records Section */}
      {filteredRecords.length === 0 ? (
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <FileText className="w-12 h-12 mx-auto text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No records found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecords.map((record) => (
            <div
              key={record.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              {/* Record Type Header with Color */}
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-white">
                <h4 className="font-semibold">{record.type}</h4>
              </div>
              
              {/* Record Details */}
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="text-gray-700">{new Date(record.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <User className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="text-gray-700">{record.doctor}</span>
                  </div>
                  
                  <p className="text-sm text-gray-600 border-t border-gray-100 pt-2 mt-2">{record.description}</p>
                </div>
                
                {/* Action Buttons */}
                <div className="mt-4 flex space-x-2">
                  <Button
                    variant="secondary"
                    className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 py-2 rounded-lg transition-colors flex items-center justify-center"
                    onClick={() => {}}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button
                    variant="primary"
                    className="flex-1 bg-blue-100 text-blue-700 hover:bg-blue-200 py-2 rounded-lg transition-colors flex items-center justify-center"
                    onClick={() => handleDownload(record.id)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{record.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{new Date(record.date).toLocaleDateString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{record.doctor}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{record.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-4">View</button>
                    <button 
                      className="text-blue-600 hover:text-blue-900"
                      onClick={() => handleDownload(record.id)}
                    >
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
