# VoxLens - User Feedback Intelligence System

## 🔗 Live URLs

- **Frontend:** [https://voxlens-eta.vercel.app](https://voxlens-eta.vercel.app)
- **Backend:** [https://voxlens.onrender.com](https://voxlens.onrender.com)

---

## 📋 Project Overview

VoxLens is a user feedback intelligence system that collects, organizes, and analyzes user feedback using AI. It leverages Google's Gemini API to extract insights from feedback data, helping teams make data-driven decisions.

### Key Features

- **Feedback Collection** — Submit and manage user feedback
- **AI-Powered Analysis** — Analyze feedback sentiment and patterns using Gemini AI

---

## 🛠️ Tech Stack

| Layer    | Technologies                                               |
| -------- | ---------------------------------------------------------- |
| Backend  | TypeScript, Node.js, Express, MongoDB                      |
| Frontend | TypeScript, React, TailwindCSS, Shadcn UI, TanStack Router |

---

## ⚙️ Installation Steps

> **Prerequisites:** Node.js 18+, MongoDB

### Clone the repository

```bash
git clone https://github.com/mdpahlovi/VoxLens.git
cd VoxLens
```

### Backend Setup

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
# Create .env file (see Environment Variables section)
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
# Create .env file (see Environment Variables section)
npm run dev
```

---

## 🔐 Environment Variables

### Backend

```env
# Server
NODE_ENV=development
PORT=5000

# Database
DATABASE_URL='your-mongodb-connection-string'

# JWT
JWT_SECRET='your-secret-key-here'

# Cors
CORS_ORIGIN=http://localhost:3000

# Gemini
GEMINI_API_KEY='your-gemini-api-key-here'
```

### Frontend

```env
VITE_APP_SERVER=http://localhost:5000
```

---

## 📁 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── features/
│   │   │   └── feedbacks/
│   │   ├── middleware/
│   │   ├── utils/
│   │   ├── app.ts
│   │   ├── routes.ts
│   │   └── server.ts
│   ├── uploads/
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── routes/
│   │   ├── main.tsx
│   │   └── styles.css
│   ├── index.html
│   └── package.json
└── README.md
```
