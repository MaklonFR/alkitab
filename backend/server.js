const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

const alkitabData = require('./alkitab.json');

app.use(cors());
app.use(express.json());

// Log request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// API Routes
app.get('/api/alkitab/kitab', (req, res) => {
  const books = [...new Set(alkitabData.map((item) => item.book))];
  res.json(books);
});
app.get('/api/alkitab/kitab/:bookId/pasal', (req, res) => {
  const { bookId } = req.params;
  const chapters = [...new Set(alkitabData.filter(i => i.book === bookId).map(i => i.chapter))];
  res.json(chapters);
});
app.get('/api/alkitab/kitab/:bookId/pasal/:chapterId', (req, res) => {
  const { bookId, chapterId } = req.params;
  const verses = alkitabData.filter(i => i.book === bookId && i.chapter === chapterId);
  res.json(verses);
});
app.get('/api/alkitab/kitab/:bookId/pasal/:chapterId/ayat/:verseId', (req, res) => {
  const { bookId, chapterId, verseId } = req.params;
  const verse = alkitabData.find(i => i.book === bookId && i.chapter === chapterId && i.verse === verseId);
  if (verse) {
    res.json(verse);
  } else {
    res.status(404).json({ error: 'Ayat tidak ditemukan' });
  }
});

// ⚠️ Serve React build from here
const buildPath = path.join(__dirname, '../frontend/build');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});
