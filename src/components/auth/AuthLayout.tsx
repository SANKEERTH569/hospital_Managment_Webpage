import React from 'react';
import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react'; // Changed from Hospital to Building2 which exists in lucide-react

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  type: 'login' | 'signup';
}

export function AuthLayout({ children, title, subtitle, type }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Building2 className="w-12 h-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {subtitle}{' '}
          <Link
            to={type === 'login' ? '/signup' : '/login'}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            {type === 'login' ? 'Sign up for an account' : 'Sign in to your account'}
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}