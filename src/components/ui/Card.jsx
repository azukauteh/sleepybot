import React from 'react';
import { twMerge } from 'tailwind-merge';

const Card = ({ children, className, title, extra }) => {
  return (
    <div className={twMerge('bg-background-lighter border border-slate-700 rounded-lg overflow-hidden', className)}>
      {(title || extra) && (
        <div className="px-6 py-4 border-b border-slate-700 flex justify-between items-center">
          {title && <h3 className="text-lg font-semibold text-text-bright">{title}</h3>}
          {extra && <div>{extra}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;
