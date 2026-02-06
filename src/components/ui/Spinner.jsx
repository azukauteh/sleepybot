import React from 'react';
import { Loader2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const Spinner = ({ className, size = 24 }) => {
  return (
    <Loader2 
      className={twMerge('animate-spin text-primary', className)} 
      size={size} 
    />
  );
};

export default Spinner;
