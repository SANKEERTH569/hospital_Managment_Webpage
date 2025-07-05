import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useDoctorAuthStore } from '../../stores/doctorAuthStore';
import { Button } from '../ui/Button';
import { Stethoscope } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type LoginFormData = z.infer<typeof loginSchema>;

export function DoctorLoginForm() {
  const navigate = useNavigate();
  const login = useDoctorAuthStore(state => state.login);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    try {
      setLoginError(null);
      setIsLoading(true);
      await login(data.email, data.password);
      navigate('/doctor-portal');
    } catch (error) {
      setLoginError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
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

        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-2 animate-fadeinup">Doctor Login</h2>
        <p className="text-center text-gray-600 mb-6 animate-fadeinup">Please login to access your doctor portal</p>
        {loginError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded animate-shake" role="alert">
            {loginError}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 animate-fadeinup">
          <div className="relative">
            <input
              {...register('email')}
              type="email"
              id="email"
              autoComplete="email"
              placeholder=" "
              aria-invalid={!!errors.email}
              aria-describedby="email-error"
              className={`peer block w-full px-4 py-3 border rounded-md shadow-sm bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.email ? 'border-red-400' : 'border-gray-300'}`}
            />
            <label htmlFor="email" className="absolute left-4 top-3 text-gray-500 text-sm transition-all duration-200 pointer-events-none peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 -top-4 text-xs bg-white/80 px-1 animate-fadeinup">
              Email
            </label>
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600 animate-fadeinup">{errors.email.message}</p>
            )}
          </div>
          <div className="relative">
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              placeholder=" "
              aria-invalid={!!errors.password}
              aria-describedby="password-error"
              className={`peer block w-full px-4 py-3 border rounded-md shadow-sm bg-white/80 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${errors.password ? 'border-red-400' : 'border-gray-300'}`}
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.403-3.221 1.125-4.575M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.875-4.575A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.575-1.125m-2.3-2.3A9.956 9.956 0 012 9c0-1.657.403-3.221 1.125-4.575" /></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.021-2.021A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.575-1.125m-2.3-2.3A9.956 9.956 0 012 9c0-1.657.403-3.221 1.125-4.575" /></svg>
              )}
            </button>
            {errors.password && (
              <p id="password-error" className="mt-1 text-sm text-red-600 animate-fadeinup">{errors.password.message}</p>
            )}
          </div>
          <Button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="w-full py-2 px-4 rounded-md text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-75 disabled:cursor-not-allowed shadow-lg animate-fadeinup"
          >
            {isLoading || isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : 'Login'}
          </Button>
          <div className="mt-4 text-center text-sm text-gray-600 animate-fadeinup">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 transition-all">Forgot your password?</a>
          </div>
        </form>
      </div>
    </div>
  );
}
