import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import BookList from '../components/BookList';
import VerseList from '../components/VerseList';
import Loader from '../components/Loader';

export default function AlkitabApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [kitabs, setKitabs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [verses, setVerses] = useState([]);

  // 🚀 Load semua kitab saat awal mount
  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3000/api/alkitab/kitab')
      .then(async (res) => {
        const text = await res.text();
        console.log('Kitab Response:', text);

        try {
          const data = JSON.parse(text);
          setKitabs(data);
        } catch (e) {
          console.error('❌ Gagal parse JSON:', e.message);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Fetch error (kitab):', err.message);
        setLoading(false);
      });
  }, []);

  // 📘 Fungsi untuk load ayat dalam pasal tertentu
  const loadPasal = (bookId, chapter) => {
    setLoading(true);
    setSelectedBook(bookId);
    setSelectedChapter(chapter);

    fetch(`http://localhost:3000/api/alkitab/kitab/${bookId}/pasal/${chapter}`)
      .then(async (res) => {
        const text = await res.text();
        console.log('Pasal Response:', text);

        try {
          const data = JSON.parse(text);
          setVerses(data);
        } catch (e) {
          console.error('❌ Gagal parse JSON (pasal):', e.message);
          setVerses([]);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Fetch error (pasal):', err.message);
        setLoading(false);
        setVerses([]);
      });
  };

  // 🔙 Kembali ke daftar kitab
  const handleBack = () => {
    setSelectedBook(null);
    setSelectedChapter(null);
    setVerses([]);
  };

  return (
    <div className={darkMode ? 'dark bg-gray-900 text-white min-h-screen' : 'bg-white text-black min-h-screen'}>
      <div className="max-w-3xl mx-auto p-4">
        <Header darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

        {loading && <Loader />}

        {!loading && !selectedBook && (
          <BookList kitabs={kitabs} onSelectPasal={loadPasal} />
        )}

        {!loading && selectedBook && (
          <div>
            <button
              className="mb-4 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleBack}
            >
              ← Kembali
            </button>
            <h2 className="text-xl font-semibold mb-4">
              Kitab {selectedBook}, Pasal {selectedChapter}
            </h2>
            {verses.length > 0 ? (
              <VerseList verses={verses} />
            ) : (
              <p className="text-red-500">Tidak ada ayat ditemukan.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
