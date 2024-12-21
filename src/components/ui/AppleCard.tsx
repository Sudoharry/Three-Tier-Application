import React from 'react';

interface AppleCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AppleCard({ children, className = '' }: AppleCardProps) {
  return (
    <div className={`
      bg-surface rounded-2xl p-6
      shadow-apple hover:shadow-apple-hover
      transition-all duration-300
      ${className}
    `}>
      {children}
    </div>
  );
}