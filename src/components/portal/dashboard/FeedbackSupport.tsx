import React, { useState } from 'react';
import { FiSend, FiPhoneCall, FiMail, FiMessageSquare, FiHelpCircle, FiStar, FiCheckCircle } from 'react-icons/fi';
import { FaHeadset, FaComments, FaQuestionCircle, FaRegSmile, FaRegMeh, FaRegFrown } from 'react-icons/fa';
import { MessageCircle, ThumbsUp, ThumbsDown, Clock, Users, Award, BookOpen, AlertCircle, FileText, Video } from 'lucide-react';

export function FeedbackSupport() {
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('feedback');
  const [feedbackType, setFeedbackType] = useState('general');
  const [rating, setRating] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');

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
      setShowSuccess(true);
      setFeedback('');
      setRating(null);
      setSubject('');
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  const renderRatingStars = () => {
    return (
      <div className="flex items-center space-x-2 mt-4">
        <span className="text-gray-700 font-medium">Your Rating:</span>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`focus:outline-none ${rating && rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
            >
              <FiStar className="w-6 h-6 fill-current" />
            </button>
          ))}
        </div>
        {rating && (
          <span className="text-sm text-blue-600 ml-2">
            {rating === 5 ? 'Excellent!' : 
             rating === 4 ? 'Very Good' : 
             rating === 3 ? 'Good' : 
             rating === 2 ? 'Fair' : 'Poor'}
          </span>
        )}
      </div>
    );
  };
  
  const renderFeedbackOptions = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <button
          type="button"
          onClick={() => setFeedbackType('general')}
          className={`flex items-center p-3 rounded-lg border transition-all ${feedbackType === 'general' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
        >
          <FaComments className={`mr-2 ${feedbackType === 'general' ? 'text-blue-500' : 'text-gray-400'}`} />
          <span className={feedbackType === 'general' ? 'text-blue-700 font-medium' : 'text-gray-600'}>General Feedback</span>
        </button>
        <button
          type="button"
          onClick={() => setFeedbackType('suggestion')}
          className={`flex items-center p-3 rounded-lg border transition-all ${feedbackType === 'suggestion' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-green-300'}`}
        >
          <ThumbsUp className={`mr-2 ${feedbackType === 'suggestion' ? 'text-green-500' : 'text-gray-400'}`} />
          <span className={feedbackType === 'suggestion' ? 'text-green-700 font-medium' : 'text-gray-600'}>Suggestion</span>
        </button>
        <button
          type="button"
          onClick={() => setFeedbackType('issue')}
          className={`flex items-center p-3 rounded-lg border transition-all ${feedbackType === 'issue' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-red-300'}`}
        >
          <AlertCircle className={`mr-2 ${feedbackType === 'issue' ? 'text-red-500' : 'text-gray-400'}`} />
          <span className={feedbackType === 'issue' ? 'text-red-700 font-medium' : 'text-gray-600'}>Report Issue</span>
        </button>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-white/20 p-3 rounded-full mr-4">
              <FaHeadset className="text-white text-2xl" />
            </div>
            <div>
              <h4 className="text-2xl font-bold text-white">Feedback & Support Center</h4>
              <p className="text-blue-100">We value your input and are here to help</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={() => setActiveTab('feedback')} 
              className={`px-4 py-2 rounded-lg flex items-center ${activeTab === 'feedback' ? 'bg-white text-indigo-700' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
              <FiMessageSquare className="mr-2" />
              Feedback
            </button>
            <button 
              onClick={() => setActiveTab('support')} 
              className={`px-4 py-2 rounded-lg flex items-center ${activeTab === 'support' ? 'bg-white text-indigo-700' : 'bg-white/20 text-white hover:bg-white/30'}`}
            >
              <FiHelpCircle className="mr-2" />
              Support
            </button>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 m-6 flex items-start">
          <FiCheckCircle className="text-green-500 mr-3 mt-0.5" size={20} />
          <div>
            <p className="text-green-700 font-medium">Thank you for your feedback!</p>
            <p className="text-green-600 text-sm">Your input helps us improve our services.</p>
          </div>
        </div>
      )}

      {/* Feedback Tab */}
      {activeTab === 'feedback' && (
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Feedback Type Selection */}
              <div>
                <h5 className="text-lg font-medium text-gray-800 mb-3">What type of feedback would you like to share?</h5>
                {renderFeedbackOptions()}
              </div>
              
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  id="subject"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief description of your feedback"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              
              {/* Feedback Content */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Feedback
                </label>
                <textarea
                  id="feedback"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  placeholder={feedbackType === 'general' ? "Tell us what you think about our services..." : 
                              feedbackType === 'suggestion' ? "Share your ideas on how we can improve..." : 
                              "Please describe the issue you're experiencing..."}
                  rows={5}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                ></textarea>
                
                {/* Rating Stars */}
                {renderRatingStars()}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`bg-indigo-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-indigo-700 transition duration-300 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="animate-spin mr-2" size={18} />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <FiSend size={18} className="mr-2" />
                      <span>Submit Feedback</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Support Tab */}
      {activeTab === 'support' && (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Options */}
            <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
              <h5 className="text-lg font-medium text-blue-800 mb-4 flex items-center">
                <MessageCircle className="mr-2" size={20} />
                Contact Us
              </h5>
              <div className="space-y-4">
                <div className="flex items-start p-3 bg-white rounded-lg shadow-sm">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <FiPhoneCall className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h6 className="font-medium text-gray-800">Call Us</h6>
                    <p className="text-gray-600 text-sm">1-800-123-4567</p>
                    <p className="text-gray-500 text-xs mt-1">Mon-Fri: 8am-8pm, Sat: 9am-5pm</p>
                  </div>
                </div>
                
                <div className="flex items-start p-3 bg-white rounded-lg shadow-sm">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <FiMail className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h6 className="font-medium text-gray-800">Email Support</h6>
                    <p className="text-gray-600 text-sm">support@hospital.com</p>
                    <p className="text-gray-500 text-xs mt-1">We typically respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start p-3 bg-white rounded-lg shadow-sm">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <MessageCircle className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <h6 className="font-medium text-gray-800">Live Chat</h6>
                    <p className="text-gray-600 text-sm">Chat with our support team</p>
                    <button className="mt-2 px-3 py-1 bg-purple-600 text-white text-xs rounded-full hover:bg-purple-700 transition-colors">
                      Start Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* FAQ Section */}
            <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
              <h5 className="text-lg font-medium text-gray-800 mb-4 flex items-center">
                <FaQuestionCircle className="mr-2" size={20} />
                Frequently Asked Questions
              </h5>
              <div className="space-y-3">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <h6 className="font-medium text-gray-800 flex items-center">
                    <FiHelpCircle className="text-indigo-500 mr-2" size={16} />
                    How do I schedule an appointment?
                  </h6>
                  <p className="text-gray-600 text-sm mt-1">You can schedule appointments through your patient portal or by calling our appointment line.</p>
                </div>
                
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <h6 className="font-medium text-gray-800 flex items-center">
                    <FiHelpCircle className="text-indigo-500 mr-2" size={16} />
                    How can I access my medical records?
                  </h6>
                  <p className="text-gray-600 text-sm mt-1">Your medical records are available in the "Health Records" section of your patient portal.</p>
                </div>
                
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <h6 className="font-medium text-gray-800 flex items-center">
                    <FiHelpCircle className="text-indigo-500 mr-2" size={16} />
                    What insurance plans do you accept?
                  </h6>
                  <p className="text-gray-600 text-sm mt-1">We accept most major insurance plans. Please contact our billing department for specific information.</p>
                </div>
              </div>
              <div className="mt-4 text-center">
                <button className="text-indigo-600 font-medium text-sm hover:text-indigo-800 transition-colors flex items-center mx-auto">
                  View all FAQs
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Support Resources */}
          <div className="mt-6">
            <h5 className="text-lg font-medium text-gray-800 mb-4">Support Resources</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <a href="#" className="block p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <FileText className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h6 className="font-medium text-gray-800">User Guides</h6>
                    <p className="text-gray-600 text-sm">Step-by-step instructions</p>
                  </div>
                </div>
              </a>
              
              <a href="#" className="block p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <Video className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h6 className="font-medium text-gray-800">Video Tutorials</h6>
                    <p className="text-gray-600 text-sm">Visual learning resources</p>
                  </div>
                </div>
              </a>
              
              <a href="#" className="block p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <Users className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <h6 className="font-medium text-gray-800">Community Forum</h6>
                    <p className="text-gray-600 text-sm">Connect with other patients</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
      
      {/* Footer */}
      <div className="bg-gray-50 p-4 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>Your feedback helps us improve our services. Thank you for your input!</p>
      </div>
    </div>
  );
}
