import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AppleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: LucideIcon;
  children: React.ReactNode;
}

export function AppleButton({
  variant = 'primary',
  icon: Icon,
  children,
  className = '',
  ...props
}: AppleButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 focus:outline-none';
  
  const variants = {
    primary: 'bg-primary text-white hover:opacity-90',
    secondary: 'bg-[#e8e8ed] text-primary hover:bg-[#dedee3]',
    ghost: 'text-accent hover:opacity-80',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 mr-2" />}
      {children}
    </button>
  );
}