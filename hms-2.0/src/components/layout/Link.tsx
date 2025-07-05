import React from 'react';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function Link({ href, children, className = '' }: LinkProps) {
  return (
    <a
      href={href}
      className={`text-inherit hover:text-blue-500 transition-colors ${className}`}
    >
      {children}
    </a>
  );
}