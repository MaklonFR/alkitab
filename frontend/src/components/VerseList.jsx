import React, { useEffect, useState } from 'react';

const VerseList = ({ book, chapter }) => {
  const [groupedVerses, setGroupedVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!book || !chapter) return;

    const fetchVerses = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:3000/api/alkitab/kitab/${book}/pasal/${chapter}`);
        if (!response.ok) throw new Error('Gagal memuat ayat');
        const data = await response.json();

        // 🔄 Group berdasarkan title
        const groups = [];
        let currentTitle = null;
        let currentGroup = [];

        data.forEach((verse) => {
          if (verse.title !== currentTitle) {
            if (currentGroup.length > 0) {
              groups.push({ title: currentTitle, verses: currentGroup });
            }
            currentTitle = verse.title || null;
            currentGroup = [verse];
          } else {
            currentGroup.push(verse);
          }
        });

        // Tambahkan grup terakhir
        if (currentGroup.length > 0) {
          groups.push({ title: currentTitle, verses: currentGroup });
        }

        setGroupedVerses(groups);
      } catch (err) {
        setError(err.message);
        setGroupedVerses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVerses();
  }, [book, chapter]);

  if (loading) return <p className="text-center text-gray-600 dark:text-gray-300">Memuat ayat...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  if (groupedVerses.length === 0)
    return <p className="text-center text-gray-500 dark:text-gray-400">Tidak ada ayat ditemukan.</p>;

  return (
    <div className="space-y-6 p-4">
      {groupedVerses.map((group, i) => (
        <div key={i} className="space-y-2">
          {group.title && (
            <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {group.title}
            </h3>
          )}
          {!group.title && (
            <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400 italic">
              
            </h3>
          )}
          {group.verses.map(({ id, verse, text }) => (
            <p key={id} className="text-sm md:text-base leading-relaxed">
              <span className="font-semibold mr-2">{verse}</span>
              <span dangerouslySetInnerHTML={{ __html: text }} />
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default VerseList;
