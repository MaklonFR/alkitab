import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';

const BookList = ({ onSelectBook }) => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [chapterLoading, setChapterLoading] = useState(false);
  const [error, setError] = useState(null);

  // Ambil daftar kitab
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/alkitab/kitab');
        if (!res.ok) throw new Error('Gagal memuat kitab');
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // Ambil daftar pasal setelah klik kitab
  const handleBookClick = async (book) => {
    setSelectedBook(book);
    setChapters([]);
    setChapterLoading(true);
    try {
      const res = await fetch(`http://localhost:3000/api/alkitab/kitab/${book}/pasal`);
      const data = await res.json();
      setChapters(data);
    } catch (err) {
      console.error('Gagal memuat pasal:', err.message);
    } finally {
      setChapterLoading(false);
    }
  };

  if (loading) return <div className="text-center text-gray-600">Memuat daftar kitab...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;

  return (
    <div className="p-4 space-y-4">
      {!selectedBook ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {books.map((book, idx) => (
            <Button key={idx} onClick={() => handleBookClick(book)} className="w-full" variant="secondary">
              Kitab {book}
            </Button>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-bold mb-2">Pasal dari Kitab {selectedBook}</h2>
          <div className="flex flex-wrap gap-2">
            {chapterLoading ? (
              <p>Memuat pasal...</p>
            ) : (
              chapters.map((ch) => (
                <Button
                  key={ch}
                  onClick={() => onSelectBook(selectedBook, ch)}
                  className="w-12"
                  variant="outline"
                >
                  {ch}
                </Button>
              ))
            )}
          </div>
          <div className="mt-4">
            <Button onClick={() => setSelectedBook(null)} variant="ghost">
              ← Kembali ke daftar kitab
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookList;
