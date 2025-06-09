# 📖 Alkitab App (Fullstack - Express + React)

Aplikasi Alkitab sederhana yang dibangun dengan:

- 🌐 **Frontend**: React + Tailwind CSS (support Dark/Light Mode)
- 🔧 **Backend**: Express.js (REST API)
- 📁 **Data**: JSON (alkitab.json)
- ⚙️ **Build**: Frontend disatukan ke backend (`/build`) dan dilayani melalui Express

---

## 🚀 Fitur

- Lihat daftar **Kitab** dari Alkitab
- Lihat **Pasal** dalam setiap kitab
- Lihat semua **Ayat** dalam suatu pasal
- Mendukung **Dark Mode** dan **Responsive Mobile**
- API REST yang dapat digunakan oleh aplikasi lain

---

## 📂 Struktur Folder
```bash
alkitab/
├── backend/
│ ├── alkitab.json
│ └── server.js
├── frontend/
│ ├── build/ <-- hasil build React
│ ├── public/
│ ├── src/
│ └── package.json
├── package.json <-- root (opsional: untuk monorepo)
└── README.md
```

---

## 🛠️ Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/nama-kamu/alkitab-app.git
cd alkitab-app 
```

### 2. Install Dependency

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
```

🧪 Jalankan (Development)
Mode Pengembangan Terpisah:
Frontend (port 3001):
```bash
cd frontend
npm start
```

Backend (port 3000):
```bash
cd backend
node server.js
```

Mode Produksi (Build + Serve via Express

```bash
# Bangun frontend
cd frontend
npm run build

# Jalankan backend + serve React build
cd ../backend
node server.js
````

## Sumber Data:
https://github.com/sabdacode/ayt?utm_source=chatgpt.com
