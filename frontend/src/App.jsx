import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BookList from './components/BookList';
import VerseList from './components/VerseList';
import './index.css';

const App = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(1); // ✅ default pasal 1
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
    setSelectedBook(bookId);
    setSelectedChapter(1); // ✅ reset ke pasal 1 saat kitab dipilih
  };

  const handleNextChapter = () => setSelectedChapter((prev) => prev + 1);
  const handlePrevChapter = () => {
    if (selectedChapter > 1) setSelectedChapter((prev) => prev - 1);
  };

  const handleBackToBooks = () => {
    setSelectedBook(null);
    setSelectedChapter(1);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {!selectedBook ? (
        <BookList onSelectBook={handleSelectBook} />
      ) : (
        <div className="p-4">
          <button
            onClick={handleBackToBooks}
            className="mb-4 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            ← Kembali ke daftar kitab
          </button>

          <h2 className="text-2xl font-bold mb-4">
            Kitab: {selectedBook}, Pasal: {selectedChapter}
          </h2>

          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={handlePrevChapter}
              disabled={selectedChapter === 1}
              className="px-3 py-1 rounded bg-gray-600 text-white hover:bg-gray-700 disabled:opacity-50"
            >
              ← Pasal Sebelumnya
            </button>
            <button
              onClick={handleNextChapter}
              className="px-3 py-1 rounded bg-gray-600 text-white hover:bg-gray-700"
            >
              Pasal Berikutnya →
            </button>
          </div>

          <VerseList book={selectedBook} chapter={selectedChapter} />
        </div>
      )}
    </div>
  );
};

export default App;
