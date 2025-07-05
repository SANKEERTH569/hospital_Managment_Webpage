import React, { useState } from 'react';
import { FaShieldAlt, FaRegClipboard, FaHandHoldingHeart, FaPhoneAlt, FaEnvelope, FaFileAlt, FaIdCard, FaCalendarAlt, FaExclamationTriangle, FaGlobe, FaHistory, FaFileInvoiceDollar, FaUser } from 'react-icons/fa';
import { Shield, FileText, Phone, Mail, Calendar, AlertTriangle, Globe, CreditCard, DollarSign, Download, Printer } from 'lucide-react';

export function InsuranceInformation() {
  const [activeTab, setActiveTab] = useState('policy'); // Track the active tab

  // Sample insurance information
  const insuranceInfo = {
    policyNumber: 'INS123456',
    provider: 'HealthCare Insurance Co.',
    planType: 'Premium Health Plan',
    memberID: 'MEM78901234',
    groupNumber: 'GRP5678',
    effectiveDate: '2023-01-01',
    expirationDate: '2023-12-31',
    primaryHolder: 'John Doe',
    dependents: ['Jane Doe (Spouse)', 'Jimmy Doe (Child)'],
    coverage: 'Full coverage for medical expenses, including hospitalization, surgeries, and outpatient treatments.',
    deductible: '$1,000 individual / $2,000 family',
    copay: '$25 for primary care / $50 for specialists',
    coinsurance: '20% after deductible',
    outOfPocketMax: '$5,000 individual / $10,000 family',
    claimsHistory: [
      { id: 'CLM001', date: '2023-03-15', provider: 'City Hospital', amount: '$1,200.00', status: 'Approved' },
      { id: 'CLM002', date: '2023-05-22', provider: 'Dr. Smith Clinic', amount: '$350.00', status: 'Pending' },
    ],
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
          <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg transition-all duration-300 hover:shadow-md">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Shield className="text-blue-600" />
                </div>
                <div>
                  <h5 className="font-semibold text-lg text-gray-700">Policy Number</h5>
                  <p className="text-xl font-medium text-blue-700">{insuranceInfo.policyNumber}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg transition-all duration-300 hover:shadow-md">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <FaIdCard className="text-green-600 text-xl" />
                </div>
                <div>
                  <h5 className="font-semibold text-lg text-gray-700">Member ID</h5>
                  <p className="text-xl font-medium text-green-700">{insuranceInfo.memberID}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg transition-all duration-300 hover:shadow-md">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <FaRegClipboard className="text-purple-600 text-xl" />
                </div>
                <div>
                  <h5 className="font-semibold text-lg text-gray-700">Insurance Provider</h5>
                  <p className="text-xl font-medium text-purple-700">{insuranceInfo.provider}</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-indigo-50 rounded-lg transition-all duration-300 hover:shadow-md">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <CreditCard className="text-indigo-600" />
                </div>
                <div>
                  <h5 className="font-semibold text-lg text-gray-700">Plan Type</h5>
                  <p className="text-xl font-medium text-indigo-700">{insuranceInfo.planType}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 border-t border-gray-200 pt-6">
              <h6 className="font-semibold text-lg text-gray-700 mb-4">Plan Details</h6>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="text-gray-500" size={18} />
                  <div>
                    <span className="text-sm text-gray-500">Effective Date:</span>
                    <p className="font-medium">{insuranceInfo.effectiveDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="text-gray-500" size={18} />
                  <div>
                    <span className="text-sm text-gray-500">Expiration Date:</span>
                    <p className="font-medium">{insuranceInfo.expirationDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FaFileAlt className="text-gray-500" size={18} />
                  <div>
                    <span className="text-sm text-gray-500">Group Number:</span>
                    <p className="font-medium">{insuranceInfo.groupNumber}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <FaUser className="text-gray-500" size={18} />
                  <div>
                    <span className="text-sm text-gray-500">Primary Holder:</span>
                    <p className="font-medium">{insuranceInfo.primaryHolder}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                <Download size={18} className="mr-2" />
                Download ID Card
              </button>
              <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                <Printer size={18} className="mr-2" />
                Print Details
              </button>
            </div>
          </div>
        );
      case 'coverage':
        return (
          <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="p-5 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-100">
              <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <FaHandHoldingHeart className="text-yellow-600 text-xl" />
                </div>
                <div>
                  <h5 className="font-semibold text-xl text-gray-800">Coverage Summary</h5>
                  <p className="text-gray-700 mt-2">{insuranceInfo.coverage}</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h6 className="font-semibold text-lg text-blue-800 mb-3 flex items-center">
                  <DollarSign className="mr-2" size={20} />
                  Financial Details
                </h6>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Deductible:</span>
                    <span className="font-medium">{insuranceInfo.deductible}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Copay:</span>
                    <span className="font-medium">{insuranceInfo.copay}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Coinsurance:</span>
                    <span className="font-medium">{insuranceInfo.coinsurance}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Out-of-Pocket Max:</span>
                    <span className="font-medium">{insuranceInfo.outOfPocketMax}</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h6 className="font-semibold text-lg text-green-800 mb-2 flex items-center">
                    <FileText className="mr-2" size={20} />
                    Terms
                  </h6>
                  <p className="text-gray-700">{insuranceInfo.terms}</p>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg">
                  <h6 className="font-semibold text-lg text-red-800 mb-2 flex items-center">
                    <AlertTriangle className="mr-2" size={20} />
                    Exclusions
                  </h6>
                  <p className="text-gray-700">{insuranceInfo.exclusions}</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-indigo-50 p-4 rounded-lg">
              <h6 className="font-semibold text-lg text-indigo-800 mb-2 flex items-center">
                <FaCalendarAlt className="mr-2" />
                Renewal Information
              </h6>
              <p className="text-gray-700">{insuranceInfo.renewalDetails}</p>
            </div>
          </div>
        );
      case 'claims':
        return (
          <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h5 className="font-semibold text-xl text-gray-800 flex items-center">
                <FaHistory className="text-red-600 mr-2" />
                Claims History
              </h5>
              <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium flex items-center">
                <FaFileInvoiceDollar className="mr-2" />
                Submit New Claim
              </button>
            </div>
            
            {insuranceInfo.claimsHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Claim ID</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Date</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Provider</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
                      <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {insuranceInfo.claimsHistory.map((claim) => (
                      <tr key={claim.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm text-blue-600 font-medium">{claim.id}</td>
                        <td className="py-3 px-4 text-sm text-gray-700">{claim.date}</td>
                        <td className="py-3 px-4 text-sm text-gray-700">{claim.provider}</td>
                        <td className="py-3 px-4 text-sm text-gray-700">{claim.amount}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${claim.status === 'Approved' ? 'bg-green-100 text-green-800' : claim.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                            {claim.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View Details</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <FaRegClipboard className="mx-auto text-4xl text-gray-400 mb-3" />
                <p className="text-gray-600">No claims have been filed yet.</p>
              </div>
            )}
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h6 className="font-semibold text-lg text-blue-800 mb-2">How to File a Claim</h6>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Collect all necessary documentation from your healthcare provider</li>
                <li>Complete the claim form available on the insurance portal</li>
                <li>Attach all required documents and receipts</li>
                <li>Submit your claim through the portal or via email</li>
                <li>Track your claim status using the claim ID</li>
              </ol>
            </div>
          </div>
        );
      case 'contact':
        return (
          <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-teal-50 p-5 rounded-xl border border-teal-100 transition-all duration-300 hover:shadow-md">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-teal-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-lg text-gray-800">Customer Service</h5>
                    <p className="text-xl font-medium text-teal-700 mt-1">{insuranceInfo.customerService}</p>
                    <p className="text-gray-600 text-sm mt-2">Available Monday-Friday, 8am-8pm EST</p>
                    <button className="mt-3 px-4 py-2 bg-teal-100 text-teal-700 rounded-lg hover:bg-teal-200 transition-colors text-sm font-medium flex items-center w-max">
                      <Phone className="mr-2" size={16} />
                      Call Now
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-pink-50 p-5 rounded-xl border border-pink-100 transition-all duration-300 hover:shadow-md">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-pink-600" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-lg text-gray-800">Email Support</h5>
                    <a href={`mailto:${insuranceInfo.email}`} className="text-xl font-medium text-pink-700 mt-1 hover:underline">
                      {insuranceInfo.email}
                    </a>
                    <p className="text-gray-600 text-sm mt-2">Response time: within 24 hours</p>
                    <button className="mt-3 px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors text-sm font-medium flex items-center w-max">
                      <Mail className="mr-2" size={16} />
                      Send Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-indigo-50 p-5 rounded-xl border border-indigo-100">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                  <Globe className="text-indigo-600" />
                </div>
                <div>
                  <h5 className="font-semibold text-lg text-gray-800">Online Portal</h5>
                  <a href={`https://${insuranceInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-xl font-medium text-indigo-700 mt-1 hover:underline">
                    {insuranceInfo.website}
                  </a>
                  <p className="text-gray-600 text-sm mt-2">Access your account, view claims, download forms and more</p>
                  <div className="mt-3 flex space-x-3">
                    <button className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm font-medium flex items-center">
                      <Globe className="mr-2" size={16} />
                      Visit Website
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium flex items-center">
                      <FaIdCard className="mr-2" />
                      Login to Portal
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
              <h6 className="font-semibold text-lg text-yellow-800 mb-2 flex items-center">
                <FaExclamationTriangle className="mr-2" />
                Emergency Contact Information
              </h6>
              <p className="text-gray-700">For medical emergencies, please call 911 or go to your nearest emergency room. For urgent insurance matters outside of business hours, call our 24/7 hotline at <span className="font-medium">1-888-999-0000</span>.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="text-3xl font-bold text-gray-800">Insurance Information</h4>
          <p className="text-gray-500 mt-1">Manage and view your health insurance details</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
          <Shield className="text-white" />
        </div>
      </div>
      
      <div className="w-full h-2 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 rounded-full mb-8"></div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setActiveTab('policy')}
          className={`flex items-center py-2 px-4 rounded-lg transition-all duration-300 ${activeTab === 'policy' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          <FaIdCard className="mr-2" />
          Policy Details
        </button>
        <button
          onClick={() => setActiveTab('coverage')}
          className={`flex items-center py-2 px-4 rounded-lg transition-all duration-300 ${activeTab === 'coverage' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          <FaHandHoldingHeart className="mr-2" />
          Coverage
        </button>
        <button
          onClick={() => setActiveTab('claims')}
          className={`flex items-center py-2 px-4 rounded-lg transition-all duration-300 ${activeTab === 'claims' ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          <FaHistory className="mr-2" />
          Claims History
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`flex items-center py-2 px-4 rounded-lg transition-all duration-300 ${activeTab === 'contact' ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          <Phone className="mr-2" size={16} />
          Contact Info
        </button>
      </div>

      {/* Tab Content */}
      <div>{renderTabContent()}</div>
      
      {/* Quick Actions */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h5 className="font-semibold text-gray-700 mb-4">Quick Actions</h5>
        <div className="flex flex-wrap gap-3">
          <button className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
            <Download size={16} className="mr-2" />
            Download ID Card
          </button>
          <button className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
            <FaFileInvoiceDollar className="mr-2" />
            Submit Claim
          </button>
          <button className="flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
            <Phone size={16} className="mr-2" />
            Contact Support
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <FaGlobe className="mr-2" />
            Visit Portal
          </button>
        </div>
      </div>
    </div>
  );
}
