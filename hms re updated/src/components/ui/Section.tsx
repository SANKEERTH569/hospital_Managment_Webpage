import React from 'react';

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray';
}

export function Section({ 
  title, 
  description, 
  children, 
  className = '',
  background = 'white' 
}: SectionProps) {
  const bgColors = {
    white: 'bg-white',
    gray: 'bg-gray-50'
  };

  return (
    <section className={`py-16 ${bgColors[background]} ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          {description && (
            <p className="text-gray-600 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}