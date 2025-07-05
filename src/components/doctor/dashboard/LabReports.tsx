import React, { useState } from 'react';
import { Beaker, Download, Upload } from 'lucide-react';
import { Button } from '../../ui/Button';
import { UploadLabReport } from './UploadLabReport';
import { useDoctorAuthStore } from '../../../stores/doctorAuthStore';

interface LabReport {
  id: string;
  patientName: string;
  testName: string;
  date: string;
  status: 'pending' | 'completed';
}

export function LabReports({ reports = [] }: { reports: LabReport[] }) {
  const [showUploadReport, setShowUploadReport] = useState(false);
  const doctor = useDoctorAuthStore((state) => state.doctor);
  
  const handleUploadReport = (reportData: any) => {
    // In a real application, this would call an API to upload the lab report
    console.log('Lab report uploaded:', reportData);
    // You would then update the reports list
  };
  
  return (
    <div className="space-y-6">
      {showUploadReport && doctor && (
        <UploadLabReport 
          patients={doctor.patients}
          onClose={() => setShowUploadReport(false)}
          onUpload={handleUploadReport}
        />
      )}
      
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-blue-900">Lab Reports</h3>
        <Button 
          onClick={() => setShowUploadReport(true)}
          className="flex items-center gap-2"
        >
          <Upload className="w-4 h-4" />
          Upload Report
        </Button>
      </div>
      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-white/90 p-4 rounded-xl shadow-md flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Beaker className="w-6 h-6 text-indigo-500" />
              <div>
                <p className="font-semibold text-blue-800">{report.testName}</p>
                <p className="text-sm text-gray-500">{report.patientName} - {report.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${report.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {report.status}
              </span>
              <Button variant="secondary" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}