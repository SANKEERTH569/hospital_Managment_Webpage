import React from 'react';
import { FaUserMd, FaCalendarAlt, FaCommentDots } from 'react-icons/fa';

export function Messages() {
  // Expanded sample message data
  const messages = [
    {
      sender: 'Dr. Smith',
      date: '2024-12-14',
      content: 'Your appointment is confirmed for tomorrow at 10 AM.',
    },
    {
      sender: 'Nurse Jane',
      date: '2024-12-13',
      content: 'Your test results are ready. Please check the lab results.',
    },
    {
      sender: 'Dr. Brown',
      date: '2024-12-12',
      content: 'Please remember to take your medication on time.',
    },
    {
      sender: 'Reception',
      date: '2024-12-11',
      content: 'Your next appointment is scheduled for January 5th at 2 PM.',
    },
    {
      sender: 'Lab Technician',
      date: '2024-12-10',
      content: 'Blood test results are normal. No further action required.',
    },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-100 to-teal-200 p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h4 className="text-3xl font-bold text-center mb-8 text-gray-800">Messages</h4>
      <div className="space-y-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 flex justify-center items-center bg-blue-100 rounded-full">
                <FaUserMd className="text-blue-500 text-2xl" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-gray-700">{msg.sender}</span>
                <span className="text-sm text-gray-500">{msg.date}</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 mb-3">
              <FaCommentDots className="text-purple-500 text-xl mt-1" />
              <p className="text-md text-gray-700">{msg.content}</p>
            </div>

            <div className="flex items-center space-x-3 mt-4">
              <FaCalendarAlt className="text-teal-500 text-xl" />
              <span className="text-sm text-gray-600">Date: {msg.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
