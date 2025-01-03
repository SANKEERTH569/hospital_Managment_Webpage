import React from 'react';

export function MedicalHistory() {
  // Expanded sample data for medical history
  const medicalHistory = [
    {
      condition: 'Asthma',
      date: '2018-06-15',
      treatment: 'Inhalers',
    },
    {
      condition: 'Fractured Arm',
      date: '2020-11-25',
      treatment: 'Surgery',
    },
    {
      condition: 'Diabetes Type 2',
      date: '2021-01-10',
      treatment: 'Insulin and Oral Medications',
    },
    {
      condition: 'Hypertension',
      date: '2022-03-22',
      treatment: 'Blood Pressure Medications',
    },
    {
      condition: 'Back Pain',
      date: '2023-07-30',
      treatment: 'Physical Therapy and Painkillers',
    },
    {
      condition: 'Cholesterol High',
      date: '2023-08-15',
      treatment: 'Dietary Changes and Statins',
    },
    {
      condition: 'Anxiety',
      date: '2022-12-05',
      treatment: 'Therapy and Antidepressants',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="text-2xl font-semibold text-gray-800 mb-6">Medical History</h4>

      <div className="space-y-4">
        {medicalHistory.map((record, index) => (
          <div
            key={index}
            className={`p-6 rounded-lg shadow-md transition-all duration-300 ease-in-out ${
              index % 2 === 0
                ? 'bg-green-50' // Light Green for even indexes
                : 'bg-yellow-50' // Light Yellow for odd indexes
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:space-x-6 mb-4">
              <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
                <p className="font-medium text-lg text-gray-600">Condition:</p>
                <p className="text-xl text-gray-800">{record.condition}</p>
              </div>
              <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
                <p className="font-medium text-lg text-gray-600">Date:</p>
                <p className="text-xl text-gray-800">{record.date}</p>
              </div>
              <div className="w-full sm:w-1/3">
                <p className="font-medium text-lg text-gray-600">Treatment:</p>
                <p className="text-xl text-gray-800">{record.treatment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
