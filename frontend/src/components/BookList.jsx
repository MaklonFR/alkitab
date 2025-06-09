import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

const BookList = ({ onSelectBook }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/alkitab/kitab');
        if (!response.ok) throw new Error('Gagal memuat kitab');
        const data = await response.json();
        console.log('Books dari API:', data);
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <div className="text-center text-gray-600 dark:text-gray-300">Memuat daftar kitab...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
      {books?.map((book, index) => (
        <Button
          key={index}
          onClick={() => onSelectBook(book)}
          className="w-full"
          variant="secondary"
        >
          Kitab {book}
        </Button>
      ))}
    </div>
  );
};

export default BookList;
