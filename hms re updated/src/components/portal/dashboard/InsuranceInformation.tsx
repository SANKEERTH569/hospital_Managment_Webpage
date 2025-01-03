import React, { useState } from 'react';
import { FaShieldAlt, FaRegClipboard, FaHandHoldingHeart, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

export function InsuranceInformation() {
  const [activeTab, setActiveTab] = useState('policy'); // Track the active tab

  // Sample insurance information
  const insuranceInfo = {
    policyNumber: 'INS123456',
    provider: 'HealthCare Insurance Co.',
    coverage: 'Full coverage for medical expenses, including hospitalization, surgeries, and outpatient treatments.',
    claimsHistory: 'No claims made yet. This policy has a clean claims history.',
    website: 'www.healthcareinsurance.com',
    customerService: '1-800-123-4567',
    email: 'support@healthcareinsurance.com',
    terms: 'The policy covers emergency medical expenses, critical care, and outpatient surgeries.',
    exclusions: 'The policy does not cover cosmetic surgery, dental, or vision treatments.',
    renewalDetails: 'The policy is renewable annually with the same terms and conditions unless specified otherwise.',
  };

  // Render different tab content based on the active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case 'policy':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <FaShieldAlt className="text-4xl text-blue-600" />
              <div>
                <h5 className="font-semibold text-xl text-gray-700">Policy Number:</h5>
                <p className="text-lg text-gray-600">{insuranceInfo.policyNumber}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaRegClipboard className="text-4xl text-green-600" />
              <div>
                <h5 className="font-semibold text-xl text-gray-700">Insurance Provider:</h5>
                <p className="text-lg text-gray-600">{insuranceInfo.provider}</p>
              </div>
            </div>
          </div>
        );
      case 'coverage':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <FaHandHoldingHeart className="text-4xl text-yellow-600" />
              <div>
                <h5 className="font-semibold text-xl text-gray-700">Coverage:</h5>
                <p className="text-lg text-gray-600">{insuranceInfo.coverage}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaRegClipboard className="text-4xl text-indigo-600" />
              <div>
                <h5 className="font-semibold text-xl text-gray-700">Terms:</h5>
                <p className="text-lg text-gray-600">{insuranceInfo.terms}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaRegClipboard className="text-4xl text-red-600" />
              <div>
                <h5 className="font-semibold text-xl text-gray-700">Exclusions:</h5>
                <p className="text-lg text-gray-600">{insuranceInfo.exclusions}</p>
              </div>
            </div>
          </div>
        );
      case 'claims':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <FaShieldAlt className="text-4xl text-red-600" />
              <div>
                <h5 className="font-semibold text-xl text-gray-700">Claims History:</h5>
                <p className="text-lg text-gray-600">{insuranceInfo.claimsHistory}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaRegClipboard className="text-4xl text-purple-600" />
              <div>
                <h5 className="font-semibold text-xl text-gray-700">Renewal Details:</h5>
                <p className="text-lg text-gray-600">{insuranceInfo.renewalDetails}</p>
              </div>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <FaPhoneAlt className="text-4xl text-teal-600" />
              <div>
                <h5 className="font-semibold text-xl text-gray-700">Customer Service:</h5>
                <p className="text-lg text-gray-600">{insuranceInfo.customerService}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-4xl text-pink-600" />
              <div>
                <h5 className="font-semibold text-xl text-gray-700">Support Email:</h5>
                <p className="text-lg text-gray-600">
                  <a href={`mailto:${insuranceInfo.email}`} className="text-blue-500 hover:underline">
                    {insuranceInfo.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-10 rounded-2xl shadow-xl max-w-4xl mx-auto mt-16">
      <h4 className="text-4xl font-semibold text-center text-gray-800 mb-10">Your Insurance Information</h4>

      {/* Tabs Navigation */}
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setActiveTab('policy')}
          className={`text-xl font-semibold py-2 px-4 rounded-lg transition-all duration-300 ${activeTab === 'policy' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          Policy Details
        </button>
        <button
          onClick={() => setActiveTab('coverage')}
          className={`text-xl font-semibold py-2 px-4 rounded-lg transition-all duration-300 ${activeTab === 'coverage' ? 'bg-yellow-600 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          Coverage
        </button>
        <button
          onClick={() => setActiveTab('claims')}
          className={`text-xl font-semibold py-2 px-4 rounded-lg transition-all duration-300 ${activeTab === 'claims' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          Claims History
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`text-xl font-semibold py-2 px-4 rounded-lg transition-all duration-300 ${activeTab === 'contact' ? 'bg-teal-600 text-white' : 'bg-gray-100 text-gray-700'}`}
        >
          Contact Info
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">{renderTabContent()}</div>
    </div>
  );
}
