import React, { useEffect, useState } from 'react';

const VerseList = ({ book }) => {
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!book) return;

    const fetchVerses = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch ayat dari pasal 1 kitab yang dipilih
        const response = await fetch(`/api/alkitab/kitab/${book}/pasal/1`);
        if (!response.ok) throw new Error('Gagal memuat ayat');
        const data = await response.json();
        setVerses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVerses();
  }, [book]);

  if (loading) return <p className="text-center text-gray-600 dark:text-gray-300">Memuat ayat...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  if (verses.length === 0)
    return <p className="text-center text-gray-500 dark:text-gray-400">Ayat tidak ditemukan.</p>;

  return (
    <div className="space-y-2 p-4">
      {verses.map(({ id, verse, text }) => (
        <p key={id} className="text-sm md:text-base">
          <span className="font-semibold mr-2">{verse}</span>
          <span dangerouslySetInnerHTML={{ __html: text }} />
        </p>
      ))}
    </div>
  );
};

export default VerseList;
