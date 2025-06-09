import React from 'react';
import clsx from 'clsx';

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={clsx(
        'rounded-2xl shadow-md bg-white dark:bg-gray-800 p-4 transition-colors duration-300',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={clsx('text-sm text-gray-800 dark:text-gray-100', className)} {...props}>
      {children}
    </div>
  );
};
