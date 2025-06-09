import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BookList from './components/BookList';
import VerseList from './components/VerseList';
import './index.css';

const App = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
    }
  };

  const handleSelectBook = (bookId) => {
    console.log('BookId diterima di App.jsx:', bookId);
    setSelectedBook(bookId);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      {/* Kirim props darkMode dan toggleDarkMode ke Header */}
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {!selectedBook ? (
        <BookList onSelectBook={handleSelectBook} />
      ) : (
        <div className="p-4">
          <button
            onClick={() => {
              console.log('Kembali ke daftar kitab');
              setSelectedBook(null);
            }}
            className="mb-4 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            ← Kembali ke daftar kitab
          </button>

          <h2 className="text-2xl font-bold mb-4">Kitab: {selectedBook}</h2>
          <VerseList book={selectedBook} />
        </div>
      )}
    </div>
  );
};

export default App;
