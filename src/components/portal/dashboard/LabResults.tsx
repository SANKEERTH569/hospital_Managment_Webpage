import React from 'react'; 
import { FaFileAlt, FaCheckCircle, FaClock } from 'react-icons/fa'; // Add icons for visual enhancement

export function LabResults() {
  // Sample data for lab results
  const labResults = [
    {
      testName: 'Blood Test',
      result: 'Normal',
      date: '2024-12-15',
      reportLink: '#',
      testId: '12345',
    },
    {
      testName: 'X-ray',
      result: 'Pending',
      date: '2024-12-20',
      reportLink: '#',
      testId: '12346',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h4 className="text-3xl font-bold text-gray-800 mb-6">Lab Results</h4>
      <div className="space-y-6">
        {labResults.map((result, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b pb-4 mb-4"
          >
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
              {/* Test Name and Result */}
              <div className="flex items-center space-x-2">
                {result.result === 'Normal' ? (
                  <FaCheckCircle className="text-green-500" />
                ) : (
                  <FaClock className="text-yellow-500" />
                )}
                <span className="font-medium text-lg text-gray-700">{result.testName}</span>
              </div>
              <div
                className={`text-lg font-medium ${
                  result.result === 'Normal' ? 'text-green-500' : 'text-yellow-500'
                }`}
              >
                {result.result}
              </div>
            </div>
            {/* Test Date and Report Link */}
            <div className="flex flex-col items-start md:items-end">
              <div className="text-sm text-gray-600">
                <span className="font-medium">Date: </span>
                {result.date}
              </div>
              <div className="mt-2">
                <a
                  href={result.reportLink}
                  className="text-blue-500 hover:text-blue-700 flex items-center space-x-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Lab Report"
                >
                  <FaFileAlt />
                  <span>View Report</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Tooltip for more info */}
      <div className="mt-6 text-center">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          title="Click for more lab results"
        >
          View All Results
        </button>
      </div>
    </div>
  );
}
