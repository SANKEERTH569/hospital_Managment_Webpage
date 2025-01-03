import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { useDoctorAuthStore } from '../../stores/doctorAuthStore';
import { Button } from '../ui/Button';
import { Stethoscope } from 'lucide-react'; // Importing doctor-related icon

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

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      navigate('/doctor-portal/dashboard');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url("https://source.unsplash.com/1600x900/?hospital,doctor")' }}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full bg-opacity-90">
        {/* Added Doctor Symbol */}
        <div className="flex justify-center mb-6">
          <Stethoscope className="w-16 h-16 text-indigo-600" /> {/* Icon styling */}
        </div>

        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-4">Doctor Login</h2>
        <p className="text-center text-gray-600 mb-6">Please login to access your doctor portal</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register('email')}
              type="email"
              placeholder="Enter your email"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register('password')}
              type="password"
              placeholder="Enter your password"
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 rounded-md text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-l focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </Button>

          <div className="mt-4 text-center text-sm text-gray-600">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
          </div>
        </form>
      </div>
    </div>  
  );
}
