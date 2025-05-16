import React from 'react';
import { Sun, Moon, FileText } from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ darkMode, toggleDarkMode }) => {
  return (
    <header className="py-4 px-6 flex justify-between items-center bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2">
        <FileText className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
        <div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">ResuMatch</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">AI Resume Shortlisting</p>
        </div>
      </div>
      <button
        onClick={toggleDarkMode}
        className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all duration-300 hover:bg-gray-200 dark:hover:bg-gray-700"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      >
        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
    </header>
  );
};

export default Header;