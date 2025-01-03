import React, { useState, useEffect } from 'react';
import { FaUser, FaPhoneAlt, FaHome, FaGenderless } from 'react-icons/fa';

interface PersonalInfo {
  name: string;
  age: number;
  gender: string;
  contact: string;
  address: string;
}

export function PersonalInformation() {
  // Initial values
  const initialInfo: PersonalInfo = {
    name: 'John Doe',
    age: 30,
    gender: 'Male',
    contact: '(123) 456-7890',
    address: '123 Main St, City, Country',
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
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h4 className="text-3xl font-bold text-gray-800 mb-6">Personal Information</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {isEditing ? (
          // Edit Mode
          <>
            <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50">
              <FaUser className="text-gray-600 text-2xl" />
              <div>
                <span className="font-medium text-lg text-gray-600">Name:</span>
                <input
                  type="text"
                  value={personalInfo.name}
                  onChange={(e) => handleInputChange(e, 'name')}
                  className="text-gray-800 text-lg mt-1 p-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50">
              <FaPhoneAlt className="text-gray-600 text-2xl" />
              <div>
                <span className="font-medium text-lg text-gray-600">Contact:</span>
                <input
                  type="text"
                  value={personalInfo.contact}
                  onChange={(e) => handleInputChange(e, 'contact')}
                  className="text-gray-800 text-lg mt-1 p-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50">
              <FaGenderless className="text-gray-600 text-2xl" />
              <div>
                <span className="font-medium text-lg text-gray-600">Gender:</span>
                <input
                  type="text"
                  value={personalInfo.gender}
                  onChange={(e) => handleInputChange(e, 'gender')}
                  className="text-gray-800 text-lg mt-1 p-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50">
              <FaHome className="text-gray-600 text-2xl" />
              <div>
                <span className="font-medium text-lg text-gray-600">Address:</span>
                <input
                  type="text"
                  value={personalInfo.address}
                  onChange={(e) => handleInputChange(e, 'address')}
                  className="text-gray-800 text-lg mt-1 p-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50">
              <span className="text-gray-600 text-2xl">🎂</span>
              <div>
                <span className="font-medium text-lg text-gray-600">Age:</span>
                <input
                  type="number"
                  value={personalInfo.age}
                  onChange={(e) => handleInputChange(e, 'age')}
                  className="text-gray-800 text-lg mt-1 p-2 border rounded-lg"
                />
              </div>
            </div>
          </>
        ) : (
          // View Mode
          <>
            <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50">
              <FaUser className="text-gray-600 text-2xl" />
              <div>
                <span className="font-medium text-lg text-gray-600">Name:</span>
                <p className="text-gray-800 text-lg">{personalInfo.name}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50">
              <FaPhoneAlt className="text-gray-600 text-2xl" />
              <div>
                <span className="font-medium text-lg text-gray-600">Contact:</span>
                <p className="text-gray-800 text-lg">{personalInfo.contact}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50">
              <FaGenderless className="text-gray-600 text-2xl" />
              <div>
                <span className="font-medium text-lg text-gray-600">Gender:</span>
                <p className="text-gray-800 text-lg">{personalInfo.gender}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50">
              <FaHome className="text-gray-600 text-2xl" />
              <div>
                <span className="font-medium text-lg text-gray-600">Address:</span>
                <p className="text-gray-800 text-lg">{personalInfo.address}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-sm hover:bg-gray-50">
              <span className="text-gray-600 text-2xl">🎂</span>
              <div>
                <span className="font-medium text-lg text-gray-600">Age:</span>
                <p className="text-gray-800 text-lg">{personalInfo.age}</p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Edit Information Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition ease-in-out duration-300"
        >
          {isEditing ? 'Save Changes' : 'Edit Information'}
        </button>
      </div>

      {isEditing && (
        <div className="mt-4 text-gray-500 text-sm">
          <p>Click "Save Changes" to persist your updates.</p>
        </div>
      )}
    </div>
  );
}
