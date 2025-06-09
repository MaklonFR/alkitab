import React from 'react';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';

export default function Header({ darkMode, toggleDarkMode }) {
  return (
    <div className="flex justify-between items-center py-4 px-2 sm:px-4 border-b border-gray-200 dark:border-gray-700">
      <h1 className="text-xl font-bold text-gray-900 dark:text-white">Alkitab API</h1>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleDarkMode}
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </Button>
    </div>
  );
}
