import React, { useState } from 'react';
import { FiFileText, FiImage, FiFile, FiXCircle } from 'react-icons/fi';

export function UploadDocuments() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successAlert, setSuccessAlert] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const maxFileSize = 5 * 1024 * 1024; // 5MB limit

  // Handle file selection
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    let validFiles = [];
    let error = '';
    
    files.forEach((file) => {
      const ext = file.name.split('.').pop().toLowerCase();
      
      if (file.size > maxFileSize) {
        error = `File "${file.name}" is too large. Maximum allowed size is 5MB.`;
      } else if (!['pdf', 'docx', 'txt', 'jpg', 'jpeg', 'png'].includes(ext)) {
        error = `File "${file.name}" is not a supported format. Only PDF, DOCX, TXT, JPG, JPEG, PNG are allowed.`;
      } else {
        validFiles.push(file);
      }
    });

    if (error) {
      setErrorMessage(error);
      return;
    }
    setSelectedFiles([...selectedFiles, ...validFiles]);
    setErrorMessage('');
  };

  // Handle file upload
  const handleUpload = () => {
    if (selectedFiles.length === 0) return;
    setUploading(true);
    setErrorMessage('');
    setSuccessAlert('');

    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      setSuccessAlert('Documents uploaded successfully!');
      setSelectedFiles([]);
    }, 2000);
  };

  // Handle file deletion
  const handleDelete = (fileName) => {
    setSelectedFiles(selectedFiles.filter(file => file.name !== fileName));
  };

  // Render file type icons
  const renderFileIcon = (file) => {
    const ext = file.name.split('.').pop().toLowerCase();
    switch (ext) {
      case 'pdf':
        return <FiFilePdf size={24} color="red" />;
      case 'docx':
      case 'txt':
        return <FiFileText size={24} color="blue" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FiImage size={24} color="green" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 rounded-lg shadow-lg w-full max-w-lg mx-auto">
      <h4 className="text-3xl font-bold text-white text-center mb-6">Upload Your Documents</h4>

      {/* Error Message */}
      {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

      {/* Success Message */}
      {successAlert && <p className="text-green-500 text-sm mb-4">{successAlert}</p>}

      {/* File Input */}
      <div className="flex justify-between items-center mb-6">
        <label className="block text-sm font-medium text-white">Choose Documents</label>
        <input 
          type="file" 
          className="border-2 border-gray-300 p-3 rounded-lg text-gray-700 w-3/4"
          multiple
          accept=".pdf, .docx, .txt, .jpg, .jpeg, .png"
          onChange={handleFileChange}
        />
      </div>

      {/* Drag and Drop Area */}
      <div 
        className="border-2 border-dashed border-gray-300 p-8 mb-6 bg-white rounded-lg text-center hover:bg-gray-50"
        onDrop={(e) => { 
          e.preventDefault(); 
          handleFileChange(e); 
        }} 
        onDragOver={(e) => e.preventDefault()}
      >
        <p className="text-gray-500">Or Drag & Drop files here to upload</p>
      </div>

      {/* Selected Files Display */}
      {selectedFiles.length > 0 && (
        <div className="bg-white p-4 rounded-lg mt-4 shadow-md">
          <h5 className="font-semibold text-lg text-gray-800">Selected Files:</h5>
          <ul className="list-disc pl-6 mt-2">
            {selectedFiles.map((file, index) => (
              <li key={index} className="flex items-center justify-between text-gray-700 mb-3">
                <div className="flex items-center space-x-3">
                  {renderFileIcon(file)}
                  <span className="font-medium">{file.name} - {Math.round(file.size / 1024)} KB</span>
                </div>
                <button 
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                  onClick={() => handleDelete(file.name)}
                >
                  <FiXCircle size={18} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Upload Button */}
      <div className="flex justify-between items-center mt-6">
        <button 
          className={`bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-200 ${uploading && 'opacity-50 cursor-not-allowed'}`}
          onClick={() => setShowConfirmModal(true)}
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Documents'}
        </button>
      </div>

      {/* Upload Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-80">
            <h5 className="text-xl font-semibold mb-4">Confirm Upload</h5>
            <p>Are you sure you want to upload these documents?</p>
            <div className="mt-4 flex justify-between">
              <button 
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                onClick={handleUpload}
              >
                Confirm
              </button>
              <button 
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
