import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDoctorAuthStore } from '../../stores/doctorAuthStore';
import { Stethoscope } from 'lucide-react';

export function DoctorLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useDoctorAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/doctor/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 animate-fadeinup">
      <div className="relative bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-2xl max-w-md w-full border border-transparent bg-clip-padding animate-fadeinup" style={{ borderImage: 'linear-gradient(135deg, #6366f1 0%, #a21caf 100%) 1' }}>
        {/* Animated Doctor Symbol */}
        <div className="flex justify-center mb-6 animate-bounce">
          <div className="bg-gradient-to-tr from-indigo-200 via-purple-200 to-pink-200 p-4 rounded-full shadow-lg">
            <Stethoscope className="w-16 h-16 text-indigo-600 animate-pulse" aria-label="Doctor Icon" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-2 animate-fadeinup">Doctor Sign in</h2>
        <p className="text-center text-gray-600 mb-6 animate-fadeinup">Please login to access your doctor portal</p>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded animate-shake" role="alert">
            {error}
          </div>
        )}
        <form className="space-y-6 animate-fadeinup" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder=" "
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="peer block w-full px-4 py-3 border rounded-md shadow-sm bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all border-gray-300"
              aria-label="Email address"
            />
            <label htmlFor="email" className="absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 pointer-events-none peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 -top-4 text-xs bg-white/80 px-1 animate-fadeinup">
              Email address
            </label>
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              placeholder=" "
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="peer block w-full px-4 py-3 border rounded-md shadow-sm bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all border-gray-300"
              aria-label="Password"
            />
            <label htmlFor="password" className="absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 pointer-events-none peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 -top-4 text-xs bg-white/80 px-1 animate-fadeinup">
              Password
            </label>
            <button
              type="button"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-3 top-3 text-gray-400 hover:text-blue-600 focus:outline-none"
              onClick={() => setShowPassword(v => !v)}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.221 1.125-4.575M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.875-4.575A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.575-1.125" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.021-2.021A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.575-1.125m-2.3-2.3A9.956 9.956 0 012 9c0-1.657.403-3.221 1.125-4.575" /></svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-75 disabled:cursor-not-allowed shadow-lg animate-fadeinup"
          >
            Sign in
          </button>
          <div className="mt-4 text-center text-sm text-gray-600 animate-fadeinup">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 transition-all">Forgot your password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}
