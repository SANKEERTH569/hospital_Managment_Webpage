import React, { useState, useEffect } from 'react';
import { 
  FaUserMd, FaCalendarAlt, FaCommentDots, FaReply, FaTrash, FaArchive, 
  FaInbox, FaStar, FaPaperPlane, FaSearch, FaExclamationCircle, 
  FaCheckCircle, FaFileAlt, FaImage, FaPaperclip, FaRegBell, FaFilter
} from 'react-icons/fa';
import { 
  MessageCircle, Send, Plus, Search, Filter, ChevronDown, Clock, 
  AlertCircle, CheckCircle, X, Paperclip, Image, File, MoreHorizontal,
  ChevronLeft, ChevronRight, Eye, Download, Bookmark, Flag, Mail, Trash2, ArrowLeft
} from 'lucide-react';
import { Button } from '../../ui/Button';

interface Message {
  id: string;
  sender: string;
  avatar?: string;
  date: string;
  subject?: string;
  content: string;
  read: boolean;
  starred: boolean;
  category: 'inbox' | 'sent' | 'archived';
  priority?: 'high' | 'normal' | 'low';
  hasAttachments?: boolean;
  attachments?: {
    name: string;
    type: 'image' | 'document' | 'other';
    size: string;
  }[];
  labels?: string[];
}

export function Messages() {
  const [activeCategory, setActiveCategory] = useState<'inbox' | 'sent' | 'archived'>('inbox');
  const [searchTerm, setSearchTerm] = useState('');
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [filterPriority, setFilterPriority] = useState<'all' | 'high' | 'normal' | 'low'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [replyContent, setReplyContent] = useState('');
  
  // Calculate unread count
  useEffect(() => {
    const count = allMessages.filter(msg => !msg.read && msg.category === 'inbox').length;
    setUnreadCount(count);
  }, []);

  // Expanded sample message data
  const allMessages: Message[] = [
    {
      id: '1',
      sender: 'Dr. Smith',
      date: '2024-03-14',
      subject: 'Appointment Confirmation',
      content: 'Your appointment is confirmed for tomorrow at 10 AM. Please arrive 15 minutes early to complete any necessary paperwork. Let me know if you need to reschedule.',
      read: false,
      starred: true,
      category: 'inbox',
      priority: 'high',
      hasAttachments: true,
      attachments: [
        { name: 'appointment_details.pdf', type: 'document', size: '245 KB' },
        { name: 'location_map.jpg', type: 'image', size: '120 KB' }
      ],
      labels: ['appointment', 'important']
    },
    {
      id: '2',
      sender: 'Nurse Jane',
      date: '2024-03-13',
      subject: 'Test Results Available',
      content: 'Your test results are ready. Please check the lab results section in your portal. Everything looks normal, but let me know if you have any questions about the findings.',
      read: true,
      starred: false,
      category: 'inbox',
      priority: 'normal',
      hasAttachments: true,
      attachments: [
        { name: 'lab_results.pdf', type: 'document', size: '350 KB' }
      ],
      labels: ['results', 'lab']
    },
    {
      id: '3',
      sender: 'Dr. Brown',
      date: '2024-03-12',
      subject: 'Medication Reminder',
      content: 'Please remember to take your medication on time. It\'s important to maintain a consistent schedule for optimal effectiveness. If you experience any side effects, please contact us immediately.',
      read: true,
      starred: false,
      category: 'inbox',
      priority: 'normal',
      hasAttachments: false,
      labels: ['medication', 'reminder']
    },
    {
      id: '4',
      sender: 'Reception',
      date: '2024-03-11',
      subject: 'Upcoming Appointment',
      content: 'Your next appointment is scheduled for April 5th at 2 PM with Dr. Wilson. Please confirm your attendance by responding to this message or calling our office.',
      read: true,
      starred: true,
      category: 'inbox'
    },
    {
      id: '5',
      sender: 'Lab Technician',
      date: '2024-03-10',
      subject: 'Blood Test Results',
      content: 'Blood test results are normal. No further action required at this time. We recommend a follow-up test in 6 months as part of your regular check-up.',
      read: true,
      starred: false,
      category: 'inbox'
    },
    {
      id: '6',
      sender: 'Dr. Wilson',
      date: '2024-03-09',
      subject: 'Follow-up Appointment',
      content: 'I would like to schedule a follow-up appointment to discuss your progress. Please let me know what days work best for you in the coming week.',
      read: true,
      starred: false,
      category: 'archived'
    },
    {
      id: '7',
      sender: 'Pharmacy',
      date: '2024-03-08',
      subject: 'Prescription Ready',
      content: 'Your prescription is ready for pickup. You can collect it anytime during our operating hours (9 AM - 7 PM).',
      read: true,
      starred: false,
      category: 'archived'
    },
    {
      id: '8',
      sender: 'You',
      date: '2024-03-07',
      subject: 'Question About Medication',
      content: 'I\'ve been experiencing some mild side effects from the new medication. Is this normal or should I stop taking it?',
      read: true,
      starred: false,
      category: 'sent'
    },
    {
      id: '9',
      sender: 'You',
      date: '2024-03-06',
      subject: 'Appointment Reschedule Request',
      content: 'I need to reschedule my appointment on April 5th due to a conflict. Are there any available slots on April 7th or 8th?',
      read: true,
      starred: false,
      category: 'sent'
    },
  ];

  const filteredMessages = allMessages.filter(message => 
    message.category === activeCategory && 
    (searchTerm === '' || 
      message.subject?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      message.content.toLowerCase().includes(searchTerm.toLowerCase()) || 
      message.sender.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterPriority === 'all' || message.priority === filterPriority)
  );

  const markAsRead = (id: string) => {
    // Implementation would go here
    console.log(`Marking message ${id} as read`);
    
    // For demo purposes, we'll just open the message detail view
    const message = allMessages.find(msg => msg.id === id);
    if (message) {
      setSelectedMessage(message);
      setShowDetailView(true);
    }
  };

  const toggleStar = (id: string) => {
    // Implementation would go here
    console.log(`Toggling star for message ${id}`);
  };

  const archiveMessage = (id: string) => {
    // Implementation would go here
    console.log(`Archiving message ${id}`);
  };

  const deleteMessage = (id: string) => {
    // Implementation would go here
    console.log(`Deleting message ${id}`);
  };

  const handleReply = () => {
    if (!selectedMessage || !replyContent) return;
    
    // In a real app, this would send the reply
    console.log(`Replying to message ${selectedMessage.id}: ${replyContent}`);
    setReplyContent('');
    
    // Show a success message or feedback
    alert('Reply sent successfully!');
  };
  
  const closeDetailView = () => {
    setShowDetailView(false);
    setSelectedMessage(null);
    setReplyContent('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative">
      {/* Detail View */}
      {showDetailView && selectedMessage && (
        <div className="absolute inset-0 bg-white z-10 rounded-lg overflow-hidden flex flex-col">
          {/* Detail Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 text-white flex items-center justify-between">
            <button 
              onClick={closeDetailView}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h3 className="text-xl font-semibold flex-grow text-center">{selectedMessage.subject}</h3>
            <div className="flex space-x-2">
              {!selectedMessage.read && (
                <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                  <Eye size={20} />
                </button>
              )}
              <button className="p-2 hover:bg-white/20 rounded-full transition-colors">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
          
          {/* Message Content */}
          <div className="flex-grow overflow-auto p-6">
            {/* Sender Info */}
            <div className="flex items-start mb-6">
              <div className="w-12 h-12 flex justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full mr-4">
                {selectedMessage.sender === 'You' ? (
                  <span className="text-lg font-semibold">You</span>
                ) : (
                  <FaUserMd className="text-xl" />
                )}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{selectedMessage.sender}</h4>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{selectedMessage.date}</span>
                  {selectedMessage.priority === 'high' && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                      <AlertCircle className="w-3 h-3 mr-1" /> High Priority
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {/* Message Body */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
              <p className="text-gray-700 whitespace-pre-line">{selectedMessage.content}</p>
            </div>
            
            {/* Attachments */}
            {selectedMessage.hasAttachments && selectedMessage.attachments && (
              <div className="mb-6">
                <h5 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                  <Paperclip className="w-4 h-4 mr-1" />
                  Attachments ({selectedMessage.attachments.length})
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedMessage.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 border border-gray-200 rounded-lg">
                      <div className="p-2 rounded-md bg-blue-100 text-blue-700 mr-3">
                        {attachment.type === 'image' ? (
                          <Image size={20} />
                        ) : attachment.type === 'document' ? (
                          <File size={20} />
                        ) : (
                          <Paperclip size={20} />
                        )}
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{attachment.name}</p>
                        <p className="text-xs text-gray-500">{attachment.size}</p>
                      </div>
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 rounded-full hover:bg-blue-50">
                        <Download size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Reply Section */}
            <div className="border-t border-gray-200 pt-6">
              <h5 className="text-sm font-medium text-gray-700 mb-3">Reply</h5>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-3"
                rows={4}
                placeholder="Type your reply here..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              ></textarea>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Paperclip size={18} />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Image size={18} />
                  </button>
                </div>
                <Button
                  variant="primary"
                  icon={Send}
                  onClick={handleReply}
                  disabled={!replyContent}
                  className={`bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all ${!replyContent ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Send Reply
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
            <MessageCircle className="mr-2 text-blue-600" />
            <span>Messages</span>
          </h3>
          {unreadCount > 0 && (
            <p className="text-sm text-blue-600 mt-1 flex items-center">
              <FaRegBell className="mr-1" />
              You have {unreadCount} unread {unreadCount === 1 ? 'message' : 'messages'}
            </p>
          )}
        </div>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setShowComposeModal(true)}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white transition-all"
        >
          Compose Message
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search messages..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FaFilter className="mr-2 text-gray-500" />
            <span className="text-gray-700">Filter</span>
            <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
          </button>
          
          {showFilters && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10 py-2">
              <div className="px-3 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-700">Priority</p>
              </div>
              <div className="p-2 space-y-1">
                <button 
                  onClick={() => setFilterPriority('all')}
                  className={`w-full text-left px-3 py-1.5 rounded text-sm ${filterPriority === 'all' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setFilterPriority('high')}
                  className={`w-full text-left px-3 py-1.5 rounded text-sm flex items-center ${filterPriority === 'high' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  <AlertCircle className="w-3 h-3 mr-2 text-red-500" />
                  High
                </button>
                <button 
                  onClick={() => setFilterPriority('normal')}
                  className={`w-full text-left px-3 py-1.5 rounded text-sm ${filterPriority === 'normal' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Normal
                </button>
                <button 
                  onClick={() => setFilterPriority('low')}
                  className={`w-full text-left px-3 py-1.5 rounded text-sm ${filterPriority === 'low' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  Low
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Message Categories */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium text-sm flex items-center ${activeCategory === 'inbox' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveCategory('inbox')}
        >
          <FaInbox className="w-4 h-4 mr-2" />
          Inbox
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm flex items-center ${activeCategory === 'sent' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveCategory('sent')}
        >
          <FaPaperPlane className="w-4 h-4 mr-2" />
          Sent
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm flex items-center ${activeCategory === 'archived' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveCategory('archived')}
        >
          <FaArchive className="w-4 h-4 mr-2" />
          Archived
        </button>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
              <MessageCircle className="w-8 h-8" />
            </div>
            <p className="text-lg font-medium text-gray-500">No messages found</p>
            <p className="text-sm text-gray-400 mt-1">Your {activeCategory} is empty</p>
          </div>
        ) : (
          filteredMessages.map((message) => (
            <div 
              key={message.id} 
              className={`border ${message.read ? 'border-gray-200 bg-white' : 'border-blue-200 bg-blue-50'} rounded-lg p-4 hover:shadow-md transition-all`}
              onClick={() => markAsRead(message.id)}
            >
              <div className="flex items-start">
                {/* Sender Avatar */}
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 flex justify-center items-center bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-full">
                    {message.sender === 'You' ? (
                      <span className="text-lg font-semibold">You</span>
                    ) : (
                      <FaUserMd className="text-xl" />
                    )}
                  </div>
                </div>

                {/* Message Content */}
                <div className="flex-grow min-w-0">
                  <div className="flex items-center mb-1">
                    <h4 className="text-lg font-semibold text-gray-800 truncate mr-2">
                      {message.subject}
                    </h4>
                    <div className="flex items-center space-x-1">
                      {!message.read && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                          New
                        </span>
                      )}
                      {message.priority === 'high' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                          <AlertCircle className="w-3 h-3 mr-1" /> High
                        </span>
                      )}
                      {message.hasAttachments && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          <Paperclip className="w-3 h-3 mr-1" /> {message.attachments?.length}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span className="font-medium truncate">{message.sender}</span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{message.date}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 line-clamp-2">{message.content}</p>
                  
                  {message.labels && message.labels.length > 0 && (
                    <div className="flex flex-wrap mt-2 gap-1">
                      {message.labels.map((label, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                          {label}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex-shrink-0 ml-4 flex flex-col space-y-2">
                  <button 
                    className={`p-1.5 rounded-full ${message.starred ? 'text-yellow-500 bg-yellow-50' : 'text-gray-400 hover:text-yellow-500 hover:bg-yellow-50'}`}
                    onClick={(e) => { e.stopPropagation(); toggleStar(message.id); }}
                  >
                    <FaStar className="w-4 h-4" />
                  </button>
                  
                  {message.category !== 'sent' && (
                    <button 
                      className="p-1.5 rounded-full text-gray-400 hover:text-blue-500 hover:bg-blue-50"
                      onClick={(e) => { e.stopPropagation(); }}
                    >
                      <FaReply className="w-4 h-4" />
                    </button>
                  )}
                  
                  {message.category !== 'archived' && (
                    <button 
                      className="p-1.5 rounded-full text-gray-400 hover:text-purple-500 hover:bg-purple-50"
                      onClick={(e) => { e.stopPropagation(); archiveMessage(message.id); }}
                    >
                      <FaArchive className="w-4 h-4" />
                    </button>
                  )}
                  
                  <button 
                    className="p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50"
                    onClick={(e) => { e.stopPropagation(); deleteMessage(message.id); }}
                  >
                    <FaTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Compose Message Modal (simplified) */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-4 rounded-t-lg">
              <h3 className="text-xl font-semibold">Compose New Message</h3>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To:</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Select recipient..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject:</label>
                  <input 
                    type="text" 
                    className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter subject..."
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message:</label>
                  <textarea 
                    className="w-full border border-gray-300 rounded-lg p-2 h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Type your message here..."
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  variant="secondary"
                  className="border border-gray-300 hover:bg-gray-100"
                  onClick={() => setShowComposeModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  icon={Send}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white"
                >
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
