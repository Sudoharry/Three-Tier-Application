import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: LucideIcon;
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  icon: Icon, 
  children, 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = 'flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'border border-blue-600 text-blue-600 bg-white hover:bg-blue-50',
    ghost: 'text-gray-600 hover:text-gray-800',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
}