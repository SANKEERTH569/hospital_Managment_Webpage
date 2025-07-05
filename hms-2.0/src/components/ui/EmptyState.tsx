import React from 'react';
import { Button } from './Button';

interface EmptyStateProps {
  icon: React.ElementType;
  title: string;
  description: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export function EmptyState({ icon: Icon, title, description, buttonText, onButtonClick }: EmptyStateProps) {
  return (
    <div className="text-center bg-white p-12 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center justify-center">
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-50">
        <Icon className="h-8 w-8 text-blue-500" />
      </div>
      <h3 className="mt-6 text-xl font-bold text-gray-800">{title}</h3>
      <p className="mt-2 text-gray-500 max-w-sm">{description}</p>
      {buttonText && onButtonClick && (
        <div className="mt-6">
          <Button onClick={onButtonClick}>{buttonText}</Button>
        </div>
      )}
    </div>
  );
} 