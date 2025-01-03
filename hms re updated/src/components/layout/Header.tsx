import React, { useState } from 'react';
import { Menu, Phone, Clock, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { HeaderLink } from './HeaderLink';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../stores/authStore';
import { useDoctorAuthStore } from '../../stores/doctorAuthStore';
import { useAdminAuthStore } from '../../stores/adminAuthStore';

export function Header() {
  const navigate = useNavigate();
  const patientLogout = useAuthStore(state => state.logout);
  const doctorLogout = useDoctorAuthStore(state => state.logout);
  const adminLogout = useAdminAuthStore(state => state.logout);
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    patientLogout();
    doctorLogout();
    adminLogout();
    navigate('/');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="w-full">
      <div className="bg-blue-900 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              <span>Emergency: (555) 123-4567</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>24/7 Service</span>
            </div>
          </div>
          <div className="flex space-x-4">
            <HeaderLink to="/login" label="Patient Portal" />
            <span className="text-gray-400">|</span>
            <HeaderLink to="/doctor-login" label="Doctor Portal" />
            <span className="text-gray-400">|</span>
            <HeaderLink to="/admin-login" label="Staff-Admin Portal" />
          </div>
        </div>
      </div>

      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link to="/">
              <Logo />
            </Link>

            <div className="hidden md:flex space-x-6">
              <HeaderLink to="/" label="Home" />
              <HeaderLink to="/departments" label="Departments" />
              <HeaderLink to="/doctors" label="Doctors" />
              <HeaderLink to="/services" label="Services" />
              <HeaderLink to="/about" label="About" />
              <HeaderLink to="/contact" label="Contact" />
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="primary" onClick={() => navigate('/login')}>
                Book Appointment
              </Button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Search className="w-5 h-5" />
              </button>
              <button 
                className="md:hidden p-2 hover:bg-gray-100 rounded-full" 
                onClick={toggleMenu}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md p-4">
          <div className="flex flex-col space-y-4">
            <HeaderLink to="/" label="Home" />
            <HeaderLink to="/departments" label="Departments" />
            <HeaderLink to="/doctors" label="Doctors" />
            <HeaderLink to="/services" label="Services" />
            <HeaderLink to="/about" label="About" />
            <HeaderLink to="/contact" label="Contact" />
          </div>
        </div>
      )}
    </header>
  );
}
