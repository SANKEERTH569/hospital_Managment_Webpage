import React from 'react';
import { FaPhoneAlt, FaUser, FaLink } from 'react-icons/fa'; // Importing icons for better UI

export function EmergencyContacts() {
  // Sample emergency contacts
  const contacts = [
    { name: 'Jane Doe', relationship: 'Sister', contact: '(123) 456-7890' },
    { name: 'John Doe', relationship: 'Father', contact: '(987) 654-3210' },
  ];

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-5xl mx-auto mt-16">
      <h4 className="text-3xl font-semibold text-center text-gray-800 mb-12">
        Emergency Contacts
      </h4>
      <div className="space-y-6">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row justify-between items-center p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-gradient-to-r from-gray-50 to-white"
          >
            <div className="flex items-center space-x-4 mb-6 md:mb-0">
              <FaUser className="text-3xl text-indigo-600" />
              <div className="font-medium text-lg text-gray-700">
                <span className="font-semibold">Name:</span> {contact.name}
              </div>
            </div>
            <div className="flex items-center space-x-4 mb-6 md:mb-0">
              <FaLink className="text-3xl text-teal-500" />
              <div className="font-medium text-lg text-gray-700">
                <span className="font-semibold">Relationship:</span> {contact.relationship}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaPhoneAlt className="text-3xl text-green-600" />
              <div className="font-medium text-lg text-gray-700">
                <span className="font-semibold">Contact:</span> {contact.contact}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
