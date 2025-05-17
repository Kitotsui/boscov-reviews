import React from 'react';

interface MaterialSymbolsOutlinedProps {
  children: string;
  className?: string;
}

export const MaterialSymbolsOutlined: React.FC<MaterialSymbolsOutlinedProps> = ({ children, className = '' }) => {
  return (
    <span className={`material-symbols-outlined ${className}`}>
      {children}
    </span>
  );
}; 