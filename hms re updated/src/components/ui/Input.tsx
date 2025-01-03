import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  error?: string;
  textarea?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ label, error, textarea = false, className = '', ...props }, ref) => {
    const id = React.useId();
    const InputComponent = textarea ? 'textarea' : 'input';

    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="mt-1">
          <InputComponent
            id={id}
            ref={ref}
            className={`
              appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md 
              shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 
              focus:border-blue-500 sm:text-sm ${className}
              ${error ? 'border-red-300' : ''}
            `}
            {...props}
            rows={textarea ? 3 : undefined}
          />
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';