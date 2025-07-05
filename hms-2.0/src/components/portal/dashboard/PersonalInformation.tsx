import React, { useState, useEffect } from 'react';
import { FaUser, FaPhoneAlt, FaHome, FaGenderless, FaIdCard, FaEnvelope, FaBirthdayCake, FaEdit, FaSave } from 'react-icons/fa';
import { Calendar, MapPin, Mail, Cake, Shield } from 'lucide-react';

interface PersonalInfo {
  name: string;
  age: number;
  gender: string;
  contact: string;
  email?: string;
  address: string;
  bloodType?: string;
  emergencyContact?: string;
  dateOfBirth?: string;
}

export function PersonalInformation() {
  // Initial values
  const initialInfo: PersonalInfo = {
    name: 'John Doe',
    age: 30,
    gender: 'Male',
    contact: '(123) 456-7890',
    email: 'john.doe@example.com',
    address: '123 Main St, City, Country',
    bloodType: 'O+',
    emergencyContact: 'Jane Doe: (987) 654-3210',
    dateOfBirth: '1994-05-15',
  };

  // State to store personal info
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(initialInfo);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // Retrieve data from localStorage if exists
  useEffect(() => {
    const storedInfo = localStorage.getItem('personalInfo');
    if (storedInfo) {
      setPersonalInfo(JSON.parse(storedInfo));
    }
  }, []);

  // Save updated info to localStorage
  const saveToLocalStorage = (updatedInfo: PersonalInfo) => {
    localStorage.setItem('personalInfo', JSON.stringify(updatedInfo));
  };

  // Handle the form submission for editing information
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveToLocalStorage(personalInfo);
    setIsEditing(false); // Exit edit mode
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof PersonalInfo) => {
    setPersonalInfo({ ...personalInfo, [field]: e.target.value });
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="text-3xl font-bold text-gray-800">Personal Information</h4>
          <p className="text-gray-500 mt-1">Manage your personal details and preferences</p>
        </div>
        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center">
          <FaIdCard className="text-white text-xl" />
        </div>
      </div>
      
      <div className="w-full h-2 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 rounded-full mb-6"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        {isEditing ? (
          // Edit Mode
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                <FaUser className="text-blue-600 text-xl" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-sm text-gray-500">Name:</span>
                <input
                  type="text"
                  value={personalInfo.name}
                  onChange={(e) => handleInputChange(e, 'name')}
                  className="w-full text-gray-800 text-lg mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                <FaPhoneAlt className="text-green-600 text-xl" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-sm text-gray-500">Contact:</span>
                <input
                  type="text"
                  value={personalInfo.contact}
                  onChange={(e) => handleInputChange(e, 'contact')}
                  className="w-full text-gray-800 text-lg mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-green-300 focus:border-green-500 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                <FaGenderless className="text-purple-600 text-xl" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-sm text-gray-500">Gender:</span>
                <select
                  value={personalInfo.gender}
                  onChange={(e) => handleInputChange(e, 'gender')}
                  className="w-full text-gray-800 text-lg mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-purple-300 focus:border-purple-500 outline-none"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-300">
                <MapPin className="text-orange-600" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-sm text-gray-500">Address:</span>
                <input
                  type="text"
                  value={personalInfo.address}
                  onChange={(e) => handleInputChange(e, 'address')}
                  className="w-full text-gray-800 text-lg mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-500 outline-none"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors duration-300">
                <Cake className="text-red-600" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-sm text-gray-500">Date of Birth:</span>
                <input
                  type="date"
                  value={personalInfo.dateOfBirth}
                  onChange={(e) => handleInputChange(e, 'dateOfBirth')}
                  className="w-full text-gray-800 text-lg mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-500 outline-none"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors duration-300">
                <Mail className="text-indigo-600" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-sm text-gray-500">Email:</span>
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => handleInputChange(e, 'email')}
                  className="w-full text-gray-800 text-lg mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500 outline-none"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center group-hover:bg-teal-200 transition-colors duration-300">
                <Shield className="text-teal-600" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-sm text-gray-500">Blood Type:</span>
                <select
                  value={personalInfo.bloodType}
                  onChange={(e) => handleInputChange(e, 'bloodType')}
                  className="w-full text-gray-800 text-lg mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-teal-300 focus:border-teal-500 outline-none"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center group-hover:bg-pink-200 transition-colors duration-300">
                <FaPhoneAlt className="text-pink-600 text-xl" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-sm text-gray-500">Emergency Contact:</span>
                <input
                  type="text"
                  value={personalInfo.emergencyContact}
                  onChange={(e) => handleInputChange(e, 'emergencyContact')}
                  className="w-full text-gray-800 text-lg mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-pink-500 outline-none"
                />
              </div>
            </div>
          </div>
        ) : (
          // View Mode
          <>
            <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                <FaUser className="text-blue-600 text-xl" />
              </div>
              <div>
                <span className="font-medium text-sm text-gray-500">Name:</span>
                <p className="text-gray-800 text-lg font-medium">{personalInfo.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300">
                <FaPhoneAlt className="text-green-600 text-xl" />
              </div>
              <div>
                <span className="font-medium text-sm text-gray-500">Contact:</span>
                <p className="text-gray-800 text-lg font-medium">{personalInfo.contact}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
                <FaGenderless className="text-purple-600 text-xl" />
              </div>
              <div>
                <span className="font-medium text-sm text-gray-500">Gender:</span>
                <p className="text-gray-800 text-lg font-medium">{personalInfo.gender}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors duration-300">
                <MapPin className="text-orange-600" />
              </div>
              <div>
                <span className="font-medium text-sm text-gray-500">Address:</span>
                <p className="text-gray-800 text-lg font-medium">{personalInfo.address}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors duration-300">
                <Cake className="text-red-600" />
              </div>
              <div>
                <span className="font-medium text-sm text-gray-500">Date of Birth:</span>
                <p className="text-gray-800 text-lg font-medium">{personalInfo.dateOfBirth || `Age: ${personalInfo.age}`}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors duration-300">
                <Mail className="text-indigo-600" />
              </div>
              <div>
                <span className="font-medium text-sm text-gray-500">Email:</span>
                <p className="text-gray-800 text-lg font-medium">{personalInfo.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center group-hover:bg-teal-200 transition-colors duration-300">
                <Shield className="text-teal-600" />
              </div>
              <div>
                <span className="font-medium text-sm text-gray-500">Blood Type:</span>
                <p className="text-gray-800 text-lg font-medium">{personalInfo.bloodType}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50 transition-all duration-300 group">
              <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center group-hover:bg-pink-200 transition-colors duration-300">
                <FaPhoneAlt className="text-pink-600 text-xl" />
              </div>
              <div>
                <span className="font-medium text-sm text-gray-500">Emergency Contact:</span>
                <p className="text-gray-800 text-lg font-medium">{personalInfo.emergencyContact}</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-end space-x-4">
        {isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition ease-in-out duration-300 flex items-center"
            >
              <span className="mr-2">Cancel</span>
            </button>
            <button
              onClick={handleEditSubmit}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition ease-in-out duration-300 flex items-center shadow-md"
            >
              <FaSave className="mr-2" />
              <span>Save Changes</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition ease-in-out duration-300 flex items-center shadow-md"
          >
            <FaEdit className="mr-2" />
            <span>Edit Information</span>
          </button>
        )}
      </div>

      {isEditing && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800 text-sm">
          <p className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Click "Save Changes" to persist your updates. All fields are required.
          </p>
        </div>
      )}
      
      {/* Privacy Notice */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h5 className="font-semibold text-gray-700 mb-2 flex items-center">
          <Shield className="mr-2 text-gray-500" size={18} />
          Privacy Notice
        </h5>
        <p className="text-gray-600 text-sm">
          Your personal information is securely stored and will only be used for providing healthcare services. 
          We comply with all applicable data protection regulations.
        </p>
      </div>
    </div>
  );
}
