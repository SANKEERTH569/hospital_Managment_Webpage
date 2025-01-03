import React, { useState } from 'react';
import { FiSend, FiPhoneCall, FiMail } from 'react-icons/fi';

export function FeedbackSupport() {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!feedback) {
      alert('Please write some feedback before submitting.');
      return;
    }
    setIsSubmitting(true);

    // Simulate feedback submission process
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Feedback submitted successfully!');
      setFeedback('');
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 p-8 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <h4 className="text-3xl font-bold text-white text-center mb-6">Feedback and Support</h4>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <label htmlFor="feedback" className="text-lg font-medium text-gray-800">
              Share Your Feedback or Query:
            </label>
            <textarea
              id="feedback"
              className="w-full p-4 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your feedback or query here..."
              rows={6}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className={`bg-blue-500 text-white px-6 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600 transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                <>
                  <FiSend size={18} />
                  <span>Submit Feedback</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      <div className="mt-8 text-white text-center">
        <p className="text-lg font-medium mb-4">Need Assistance? Contact Us:</p>
        <div className="flex justify-center items-center space-x-6">
          <div className="flex items-center space-x-2">
            <FiPhoneCall size={24} />
            <span className="text-sm">Call Us: 1-800-123-4567</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiMail size={24} />
            <span className="text-sm">Email: support@hospital.com</span>
          </div>
        </div>
      </div>
    </div>
  );
}
