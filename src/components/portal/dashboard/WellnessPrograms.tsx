import React, { useState } from 'react';
import { FaAppleAlt, FaRunning, FaHandsHelping, FaHeart, FaBrain, FaUsers, FaCalendarAlt, FaStar } from 'react-icons/fa';
import { Activity, Search, Filter, ChevronRight, Clock, Calendar, Users, Award, BookOpen } from 'lucide-react';

interface WellnessProgram {
  id: string;
  name: string;
  details: string;
  description?: string;
  icon: React.ReactNode;
  backgroundColor: string;
  category: 'fitness' | 'nutrition' | 'mental' | 'social';
  duration: string;
  participants?: number;
  rating?: number;
  startDate?: string;
  instructor?: string;
}

export function WellnessPrograms() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  
  // Sample wellness programs data
  const programs: WellnessProgram[] = [
    {
      id: '1',
      name: 'Yoga Classes',
      details: 'Improve flexibility and reduce stress',
      description: 'Our yoga classes are designed for all levels, focusing on proper alignment, breathing techniques, and mindfulness. Join us to improve your flexibility, strength, and mental clarity.',
      icon: <div className="text-white text-4xl">🧘‍♂️</div>,
      backgroundColor: 'bg-gradient-to-r from-purple-600 to-indigo-800',
      category: 'fitness',
      duration: '5 weeks',
      participants: 24,
      rating: 4.8,
      startDate: '2024-04-10',
      instructor: 'Emma Wilson'
    },
    {
      id: '2',
      name: 'Nutrition Counseling',
      details: 'Personalized diet plans with certified nutritionists',
      description: 'Our nutrition counseling program offers one-on-one sessions with certified nutritionists who will analyze your current diet, health goals, and create a personalized nutrition plan to help you achieve optimal health.',
      icon: <FaAppleAlt className="text-white text-4xl" />,
      backgroundColor: 'bg-gradient-to-r from-green-500 to-teal-600',
      category: 'nutrition',
      duration: 'Ongoing',
      participants: 56,
      rating: 4.9,
      instructor: 'Dr. Michael Chen'
    },
    {
      id: '3',
      name: 'Running Club',
      details: 'Weekly community runs for all fitness levels',
      description: 'Join our running club for weekly group runs designed for all fitness levels. Improve your cardiovascular health, build endurance, and connect with fellow runners in a supportive community environment.',
      icon: <FaRunning className="text-white text-4xl" />,
      backgroundColor: 'bg-gradient-to-r from-blue-600 to-cyan-600',
      category: 'fitness',
      duration: 'Ongoing',
      participants: 42,
      rating: 4.7,
      startDate: '2024-03-25',
      instructor: 'James Rodriguez'
    },
    {
      id: '4',
      name: 'Stress Relief Workshop',
      details: 'Learn effective techniques for managing stress',
      description: 'Our stress relief workshop provides practical techniques to manage stress and improve mental wellness. Learn breathing exercises, meditation practices, and cognitive strategies to reduce anxiety and promote relaxation.',
      icon: <FaHandsHelping className="text-white text-4xl" />,
      backgroundColor: 'bg-gradient-to-r from-yellow-500 to-orange-600',
      category: 'mental',
      duration: '3 weeks',
      participants: 18,
      rating: 4.6,
      startDate: '2024-04-05',
      instructor: 'Dr. Sarah Johnson'
    },
    {
      id: '5',
      name: 'Mindfulness Meditation',
      details: 'Daily guided sessions for mental clarity',
      description: 'Our mindfulness meditation program offers daily guided sessions to help you develop a consistent meditation practice. Learn to quiet your mind, increase awareness, and cultivate a sense of inner peace.',
      icon: <FaAppleAlt className="text-white text-4xl" />,
      backgroundColor: 'bg-gradient-to-r from-indigo-500 to-purple-500',
      category: 'mental',
      duration: '4 weeks',
      participants: 32,
      rating: 4.9,
      startDate: '2024-04-15',
      instructor: 'Lisa Patel'
    },
    {
      id: '6',
      name: 'Heart Health Program',
      details: 'Comprehensive cardiovascular wellness plan',
      description: 'Our heart health program combines exercise, nutrition, and education to promote cardiovascular wellness. Work with cardiologists and fitness experts to improve your heart health and reduce risk factors.',
      icon: <FaHeart className="text-white text-4xl" />,
      backgroundColor: 'bg-gradient-to-r from-red-500 to-pink-600',
      category: 'fitness',
      duration: '8 weeks',
      participants: 15,
      rating: 4.8,
      startDate: '2024-05-01',
      instructor: 'Dr. Robert Williams'
    },
    {
      id: '7',
      name: 'Cognitive Fitness',
      details: 'Brain exercises to enhance mental acuity',
      description: 'Our cognitive fitness program offers brain exercises and activities designed to enhance mental acuity, memory, and problem-solving skills. Keep your mind sharp and improve cognitive function at any age.',
      icon: <FaBrain className="text-white text-4xl" />,
      backgroundColor: 'bg-gradient-to-r from-blue-500 to-indigo-600',
      category: 'mental',
      duration: '6 weeks',
      participants: 20,
      rating: 4.5,
      startDate: '2024-04-20',
      instructor: 'Dr. Emily Zhang'
    },
    {
      id: '8',
      name: 'Community Wellness Circle',
      details: 'Support group for holistic health goals',
      description: 'Our community wellness circle brings together individuals with similar health goals in a supportive group setting. Share experiences, offer encouragement, and work collectively toward improved wellbeing.',
      icon: <FaUsers className="text-white text-4xl" />,
      backgroundColor: 'bg-gradient-to-r from-emerald-500 to-green-600',
      category: 'social',
      duration: 'Ongoing',
      participants: 28,
      rating: 4.7,
      startDate: '2024-03-15',
      instructor: 'Maria Gonzalez'
    },
  ];

  // Filter programs based on active category and search term
  const filteredPrograms = programs.filter(program => {
    const matchesCategory = activeCategory === 'all' || program.category === activeCategory;
    const matchesSearch = program.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         program.details.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">
          <div>
            <h4 className="text-3xl font-bold text-gray-800 tracking-wide flex items-center">
              <Award className="mr-2 text-indigo-600" />
              Wellness Programs
            </h4>
            <p className="text-gray-600 mt-1">Discover programs to enhance your physical and mental wellbeing</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
              <Calendar className="mr-2" size={16} />
              View My Programs
            </button>
          </div>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search programs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeCategory === 'all' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              All Programs
            </button>
            <button
              onClick={() => setActiveCategory('fitness')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeCategory === 'fitness' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <Activity size={16} className="inline mr-1" />
              Fitness
            </button>
            <button
              onClick={() => setActiveCategory('nutrition')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeCategory === 'nutrition' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <FaAppleAlt size={14} className="inline mr-1" />
              Nutrition
            </button>
            <button
              onClick={() => setActiveCategory('mental')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeCategory === 'mental' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <FaBrain size={14} className="inline mr-1" />
              Mental Wellness
            </button>
            <button
              onClick={() => setActiveCategory('social')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeCategory === 'social' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              <FaUsers size={14} className="inline mr-1" />
              Social
            </button>
          </div>
        </div>
      </div>
      
      {/* Featured Program */}
      <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-8 text-white">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <div className="flex items-center mb-3">
                <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">Featured Program</span>
                <div className="ml-3 flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-300 w-4 h-4" />
                  ))}
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-3">30-Day Wellness Challenge</h3>
              <p className="text-white/90 mb-4">Join our comprehensive 30-day program designed to transform your health through daily fitness activities, nutrition guidance, and mindfulness practices.</p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>30 days</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>Starts April 1, 2024</span>
                </div>
                <div className="flex items-center">
                  <Users size={16} className="mr-1" />
                  <span>124 participants</span>
                </div>
              </div>
              <button className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
                Join Challenge
              </button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center">
                <div className="text-6xl">🏆</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((program) => (
          <div
            key={program.id}
            className={`rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer ${selectedProgram === program.id ? 'ring-2 ring-offset-2 ring-indigo-500' : ''}`}
            onClick={() => setSelectedProgram(program.id === selectedProgram ? null : program.id)}
          >
            <div className={`${program.backgroundColor} p-6`}>
              <div className="flex items-center">
                <div className="mr-4 p-3 bg-white/10 rounded-full">
                  {program.icon}
                </div>
                <div className="text-white">
                  <h5 className="text-xl font-semibold">{program.name}</h5>
                  <p className="text-white/80 text-sm">{program.details}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4">
              <div className="flex justify-between text-sm text-gray-600 mb-3">
                <div className="flex items-center">
                  <Clock size={14} className="mr-1" />
                  <span>{program.duration}</span>
                </div>
                {program.startDate && (
                  <div className="flex items-center">
                    <FaCalendarAlt size={14} className="mr-1" />
                    <span>{new Date(program.startDate).toLocaleDateString()}</span>
                  </div>
                )}
              </div>
              
              {selectedProgram === program.id && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-gray-700 text-sm mb-3">{program.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center text-gray-600">
                      <Users size={14} className="mr-1" />
                      <span>{program.participants} enrolled</span>
                    </div>
                    {program.rating && (
                      <div className="flex items-center">
                        <span className="text-gray-700 font-medium mr-1">{program.rating}</span>
                        <FaStar className="text-yellow-500 w-3 h-3" />
                      </div>
                    )}
                  </div>
                  {program.instructor && (
                    <p className="text-xs text-gray-500 mt-2">Instructor: {program.instructor}</p>
                  )}
                </div>
              )}
              
              <div className="mt-3 flex justify-between items-center">
                <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors flex items-center">
                  Learn more
                  <ChevronRight size={16} className="ml-1" />
                </button>
                <button className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded text-sm font-medium hover:bg-indigo-200 transition-colors">
                  Enroll
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Resources Section */}
      <div className="mt-12 bg-gray-50 rounded-xl p-6">
        <h4 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <BookOpen className="mr-2" size={20} />
          Wellness Resources
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="#" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <h5 className="font-medium text-indigo-700 mb-1">Nutrition Guide</h5>
            <p className="text-sm text-gray-600">Comprehensive guide to balanced eating and meal planning</p>
          </a>
          <a href="#" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <h5 className="font-medium text-indigo-700 mb-1">Meditation Library</h5>
            <p className="text-sm text-gray-600">Collection of guided meditations for stress relief and mindfulness</p>
          </a>
          <a href="#" className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <h5 className="font-medium text-indigo-700 mb-1">Exercise Videos</h5>
            <p className="text-sm text-gray-600">Instructional videos for home workouts and proper form</p>
          </a>
        </div>
      </div>
    </div>
  );
}
