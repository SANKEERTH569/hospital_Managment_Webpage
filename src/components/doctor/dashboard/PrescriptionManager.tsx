import React, { useState } from 'react';
import { Pill, PlusCircle, Search } from 'lucide-react';
import { Button } from '../../ui/Button';
import { AddPrescription } from './AddPrescription';
import { useDoctorAuthStore } from '../../../stores/doctorAuthStore';

interface Prescription {
  id: string;
  patientName: string;
  medication: string;
  dosage: string;
  date: string;
  status: 'active' | 'inactive';
}

export function PrescriptionManager({ prescriptions = [] }: { prescriptions: Prescription[] }) {
  const [showAddPrescription, setShowAddPrescription] = useState(false);
  const doctor = useDoctorAuthStore((state) => state.doctor);
  
  const handleSavePrescription = (prescriptionData: any) => {
    // In a real application, this would call an API to create a new prescription
    console.log('New prescription saved:', prescriptionData);
    // You would then update the prescriptions list
  };
  
  return (
    <div className="space-y-6">
      {showAddPrescription && doctor && (
        <AddPrescription 
          patients={doctor.patients}
          onClose={() => setShowAddPrescription(false)}
          onSave={handleSavePrescription}
        />
      )}
      
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search prescriptions..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button 
          className="flex items-center gap-2"
          onClick={() => setShowAddPrescription(true)}
        >
          <PlusCircle className="w-5 h-5" />
          New Prescription
        </Button>
      </div>

      <div className="space-y-4">
        {prescriptions.map((prescription) => (
          <div
            key={prescription.id}
            className="bg-white/90 p-5 rounded-2xl shadow-lg border border-blue-100 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <Pill className="w-6 h-6 text-blue-500" />
              <div>
                <h4 className="font-bold text-lg text-blue-900">{prescription.medication}</h4>
                <p className="text-sm text-gray-600">For: {prescription.patientName} | {prescription.dosage}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{prescription.date}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${prescription.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                {prescription.status}
              </span>
              <Button variant="secondary" className="text-sm">Details</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}