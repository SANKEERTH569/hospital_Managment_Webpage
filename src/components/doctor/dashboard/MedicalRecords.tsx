import React, { useState } from 'react';
import { FileText, Search, Filter, Plus } from 'lucide-react';
import { Button } from '../../ui/Button';
import { AddMedicalRecord } from './AddMedicalRecord';
import { useDoctorAuthStore } from '../../../stores/doctorAuthStore';

interface MedicalRecord {
  id: string;
  patientName: string;
  date: string;
  diagnosis: string;
  treatment: string;
  notes: string;
}

export function MedicalRecords({ records = [] }: { records: MedicalRecord[] }) {
  const [showAddRecord, setShowAddRecord] = useState(false);
  const doctor = useDoctorAuthStore((state) => state.doctor);
  
  const handleSaveRecord = (recordData: any) => {
    // In a real application, this would call an API to create a new medical record
    console.log('New medical record saved:', recordData);
    // You would then update the records list
  };
  
  return (
    <div className="space-y-6">
      {showAddRecord && doctor && (
        <AddMedicalRecord 
          patients={doctor.patients}
          onClose={() => setShowAddRecord(false)}
          onSave={handleSaveRecord}
        />
      )}
      
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search medical records..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <Button className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button 
            onClick={() => setShowAddRecord(true)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Record
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {records.map((record) => (
          <div
            key={record.id}
            className="bg-white/90 p-6 rounded-2xl shadow-lg border border-blue-100 hover:shadow-2xl transition"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-extrabold text-xl text-blue-900">{record.patientName}</h4>
              <span className="text-sm text-blue-600 font-medium">{record.date}</span>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-semibold text-blue-700">Diagnosis</label>
                <p className="text-gray-700">{record.diagnosis}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-blue-700">Treatment</label>
                <p className="text-gray-700">{record.treatment}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-blue-700">Notes</label>
                <p className="text-gray-700">{record.notes}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="secondary" className="text-sm">Edit</Button>
              <Button variant="secondary" className="text-sm">Download PDF</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}