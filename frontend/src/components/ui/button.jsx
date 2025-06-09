import React from 'react';
import clsx from 'clsx';

export const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const baseStyle = 'px-4 py-2 rounded-2xl text-sm font-medium focus:outline-none transition-colors duration-300';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
    outline: 'border border-gray-400 text-gray-800 hover:bg-gray-100 dark:text-white dark:border-gray-500 dark:hover:bg-gray-700'
  };

  return (
    <button
      onClick={onClick}
      className={clsx(baseStyle, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};
