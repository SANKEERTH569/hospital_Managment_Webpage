interface PatientListProps {
  patients: Patient[];
  onAddNewPatient: () => void;
}

export function PatientList({ patients, onAddNewPatient }: PatientListProps) {
  if (patients.length === 0) {
    return <EmptyState title="No Patients Found" description="You can add a new patient to get started." buttonText="Add New Patient" onButtonClick={onAddNewPatient} icon={Users} />;
  }
  // ... rest of component
}

interface MedicalRecordsProps {
  records: MedicalRecord[];
  onAddNewRecord: () => void;
}

export function MedicalRecords({ records, onAddNewRecord }: MedicalRecordsProps) {
  if (records.length === 0) {
    return <EmptyState title="No Medical Records" description="Add a new medical record for a patient." buttonText="Add New Record" onButtonClick={onAddNewRecord} icon={FilePlus2} />;
  }
  // ... rest of component
}

interface PrescriptionManagerProps {
  prescriptions: Prescription[];
  onAddNewPrescription: () => void;
}

export function PrescriptionManager({ prescriptions, onAddNewPrescription }: PrescriptionManagerProps) {
  if (prescriptions.length === 0) {
    return <EmptyState title="No Prescriptions" description="Create a new prescription for a patient." buttonText="Add New Prescription" onButtonClick={onAddNewPrescription} icon={Pill} />;
  }
  // ... rest of component
}

interface LabReportsProps {
  reports: LabReport[];
  onAddNewReport: () => void;
}

export function LabReports({ reports, onAddNewReport }: LabReportsProps) {
  if (reports.length === 0) {
    return <EmptyState title="No Lab Reports" description="Upload a new lab report for a patient." buttonText="Upload New Report" onButtonClick={onAddNewReport} icon={UploadCloud} />;
  }
  // ... rest of component
} 