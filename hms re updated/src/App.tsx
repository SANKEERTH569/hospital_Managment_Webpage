import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Hero } from './components/home/Hero';
import { Services } from './components/home/Services';
import { Doctors } from './components/home/Doctors';
import { Testimonials } from './components/home/Testimonials';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { AdminLoginForm } from './components/auth/AdminLoginForm';
import { Dashboard } from './components/portal/Dashboard';
import { DoctorLoginForm } from './components/doctor/DoctorLoginForm';
import { DoctorDashboard } from './components/doctor/DoctorDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { StaffDashboard } from './components/staff/StaffDashboard';
import { Departments } from './components/pages/Departments';
import { About } from './components/pages/About';
import { Contact } from './components/pages/Contact';
import { useAuthStore } from './stores/authStore';
import { useDoctorAuthStore } from './stores/doctorAuthStore';
import { useAdminAuthStore } from './stores/adminAuthStore';

type PrivateRouteProps = {
  children: React.ReactNode;
  type: 'patient' | 'doctor' | 'admin' | 'staff';
};

function PrivateRoute({ children, type }: PrivateRouteProps) {
  const isPatientAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isDoctorAuthenticated = useDoctorAuthStore(state => state.isAuthenticated);
  const adminAuth = useAdminAuthStore(state => ({
    isAuthenticated: state.isAuthenticated,
    role: state.role
  }));

  switch (type) {
    case 'patient':
      return isPatientAuthenticated ? <>{children}</> : <Navigate to="/login" />;
    case 'doctor':
      return isDoctorAuthenticated ? <>{children}</> : <Navigate to="/doctor-login" />;
    case 'admin':
      return adminAuth.isAuthenticated && adminAuth.role === 'admin'
        ? <>{children}</>
        : <Navigate to="/admin-login" />;
    case 'staff':
      return adminAuth.isAuthenticated && adminAuth.role === 'staff'
        ? <>{children}</>
        : <Navigate to="/admin-login" />;
    default:
      return <Navigate to="/login" />;
  }
}

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <main>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Hero />
                <Services />
                <Doctors />
                <Testimonials />
              </>
            } />
            <Route path="/departments" element={<Departments />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Authentication Routes */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/doctor-login" element={<DoctorLoginForm />} />
            <Route path="/admin-login" element={<AdminLoginForm />} />
            
            {/* Protected Routes */}
            <Route path="/patient-portal/*" element={
              <PrivateRoute type="patient">
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/doctor-portal/*" element={
              <PrivateRoute type="doctor">
                <DoctorDashboard />
              </PrivateRoute>
            } />
            <Route path="/admin/*" element={
              <PrivateRoute type="admin">
                <AdminDashboard />
              </PrivateRoute>
            } />
            <Route path="/staff/*" element={
              <PrivateRoute type="staff">
                <StaffDashboard />
              </PrivateRoute>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
