import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Badge = ({ children, variant = 'default', className }) => {
  const variants = {
    default: 'bg-slate-700 text-slate-200',
    success: 'bg-success/20 text-success border border-success/30',
    danger: 'bg-danger/20 text-danger border border-danger/30',
    warning: 'bg-warning/20 text-warning border border-warning/30',
    sleep: 'bg-sleep/20 text-sleep border border-sleep/30',
    primary: 'bg-primary/20 text-primary border border-primary/30',
  };

  return (
    <span className={twMerge(
      'px-2.5 py-0.5 rounded-full text-xs font-semibold',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};

export default Badge;
