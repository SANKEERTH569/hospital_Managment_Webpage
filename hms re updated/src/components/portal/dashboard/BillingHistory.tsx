import React, { useState } from 'react';
import { jsPDF } from 'jspdf';

export function BillingHistory() {
  // Sample billing history data
  const bills = [
    { date: '2024-12-01', amount: '$200', status: 'Paid', details: 'Consultation and Tests' },
    { date: '2024-11-20', amount: '$150', status: 'Pending', details: 'Treatment and Medication' },
  ];

  const [selectedBill, setSelectedBill] = useState(null);

  // Function to show bill details in modal
  const handleBillClick = (bill) => {
    setSelectedBill(bill);
  };

  // Function to generate and download the receipt
  const downloadReceipt = (bill) => {
    const doc = new jsPDF();

    // Add Hospital Information
    doc.setFont('Helvetica', 'bold');
    doc.text('XYZ HOSPITAL', 14, 20);
    doc.setFont('Helvetica', 'normal');
    doc.text('123 Health St, Medical City', 14, 30);
    doc.text('Phone: (123) 456-7890', 14, 40);
    doc.text('Email: contact@xyzhospital.com', 14, 50);
    doc.text('Website: www.xyzhospital.com', 14, 60);

    // Add a line separator
    doc.setLineWidth(0.5);
    doc.line(14, 65, 200, 65);

    // Add Receipt Title
    doc.setFont('Helvetica', 'bold');
    doc.text('Billing Receipt', 100, 85, null, null, 'center');

    // Add Patient Information
    doc.setFont('Helvetica', 'normal');
    doc.text(`Patient Name: John Doe`, 14, 100);
    doc.text(`Patient ID: 1234567890`, 14, 110);
    doc.text(`Billing Date: ${bill.date}`, 14, 120);
    
    // Add Bill Details (itemized list)
    doc.text('Services Provided:', 14, 135);
    doc.text(`  - ${bill.details}`, 20, 145);
    doc.text(`Amount: ${bill.amount}`, 14, 160);
    doc.text(`Status: ${bill.status}`, 14, 170);

    // Add Footer with Legal Disclaimer or Contact Info
    doc.setFont('Helvetica', 'italic');
    doc.text('For inquiries, contact our billing department at (123) 456-7890.', 14, 180);
    doc.text('This receipt is for reference only. Please keep it for your records.', 14, 190);

    // Add another line separator at the bottom
    doc.setLineWidth(0.5);
    doc.line(14, 200, 200, 200);

    // Footer Contact Info
    doc.setFont('Helvetica', 'normal');
    doc.text('XYZ HOSPITAL', 14, 210);
    doc.text('123 Health St, Medical City', 14, 215);
    doc.text('Phone: (123) 456-7890', 14, 220);

    // Download the PDF
    doc.save(`Receipt_${bill.date}.pdf`);
  };

  // Calculate total amount
  const totalAmount = bills.reduce((total, bill) => total + parseFloat(bill.amount.replace('$', '')), 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="text-2xl font-semibold mb-6">Billing History</h4>
      
      {/* Billing list */}
      <div className="space-y-4">
        {bills.map((bill, index) => (
          <div 
            key={index} 
            className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-100 cursor-pointer" 
            onClick={() => handleBillClick(bill)}
          >
            <div>
              <span className="font-medium">Date:</span> {bill.date}
            </div>
            <div>
              <span className="font-medium">Amount:</span> {bill.amount}
            </div>
            <div>
              <span 
                className={`font-medium px-2 py-1 rounded-md ${bill.status === 'Paid' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}
              >
                {bill.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Total Amount */}
      <div className="mt-6 text-right font-medium text-lg">
        <span>Total Amount: </span>
        <span>${totalAmount.toFixed(2)}</span>
      </div>

      {/* Bill Details Modal */}
      {selectedBill && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h4 className="text-xl font-semibold mb-4">Bill Details</h4>
            <p><span className="font-medium">Date:</span> {selectedBill.date}</p>
            <p><span className="font-medium">Amount:</span> {selectedBill.amount}</p>
            <p><span className="font-medium">Status:</span> {selectedBill.status}</p>
            <p><span className="font-medium">Details:</span> {selectedBill.details}</p>

            <div className="mt-4 flex justify-between">
              <button 
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={() => downloadReceipt(selectedBill)}
              >
                Download Receipt
              </button>
              <button 
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                onClick={() => setSelectedBill(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
