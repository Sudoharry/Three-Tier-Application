import React from 'react';

interface AppleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function AppleInput({ label, error, className = '', ...props }: AppleInputProps) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-primary">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-2 rounded-lg
          bg-[#f5f5f7] border border-border
          focus:border-accent focus:ring-1 focus:ring-accent
          placeholder:text-secondary
          transition-colors duration-200
          ${error ? 'border-error' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  );
}