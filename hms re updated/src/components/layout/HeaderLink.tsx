import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderLinkProps {
  to: string;
  label: string;
}

export function HeaderLink({ to, label }: HeaderLinkProps) {
  return (
    <Link
      to={to}
      className="text-inherit hover:text-blue-200 transition-colors"
    >
      {label}
    </Link>
  );
}