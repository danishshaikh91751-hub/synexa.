# Synexa - Learning Beyond Language

Synexa is an AI-powered multilingual learning platform bridging native Indian languages (English, Hindi, Marathi, Gujarati, Tamil) with STEM and concept education. It features real-time voice speech synthesis, Feynman-method voice explanation evaluation, interactive lessons, Snap & Learn image doubt solving, vocabulary flashcards, and Supabase cloud persistence.

---

## 🚀 Features

- **🌐 5-Language Bridge System**: Seamlessly switch between English, हिन्दी (Hindi), मराठी (Marathi), ગુજરાતી (Gujarati), and தமிழ் (Tamil).
- **🎙️ Real-time Multilingual TTS Audio**: Audio pronunciation and explanations across all supported languages.
- **📸 Snap & Learn**: Upload or capture textbook diagrams and formula images to get step-by-step bilingual breakdowns with Gemini AI.
- **🗣️ Explain in Your Words (Feynman Technique)**: Voice recorder that transcribes and evaluates student explanations with constructive AI feedback.
- **💬 Synexa AI Doubt Solver**: Multilingual AI tutor for STEM and language queries.
- **🧠 Interactive Lessons & Flashcards**: Structured lessons with dual-language vocabulary flashcards and comprehension tests.
- **🏆 Gamified Progress & Quizzes**: Streak tracking, accuracy stats, interactive quizzes with celebratory animations.
- **☁️ Supabase Cloud Sync**: Dual-mode storage (instant local caching with optional Supabase cloud persistence).

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion (Framer Motion), Lucide React
- **Backend API Server**: Node.js, Express, tsx, esbuild
- **AI Engine**: Google Gemini API (`@google/genai` with Gemini 2.5 Flash)
- **Database**: Supabase (PostgreSQL) / LocalStorage Fallback

---

## 📦 Project Structure

```
├── public/
│   ├── favicon.svg               # Browser tab icon
│   ├── synexa-logo.svg           # Primary brand emblem
│   └── synexa-logo-dark.svg      # Dark theme brand emblem
├── src/
│   ├── components/               # React UI Components
│   │   ├── BottomNavBar.tsx
│   │   ├── DesktopSidebar.tsx
│   │   ├── DoubtSolverScreen.tsx
│   │   ├── FeedbackScreen.tsx
│   │   ├── Header.tsx
│   │   ├── LandingScreen.tsx
│   │   ├── LessonScreen.tsx
│   │   ├── MotherTongueBridgeCard.tsx
│   │   ├── ProgressScreen.tsx
│   │   ├── QuizScreen.tsx
│   │   ├── SelectScreen.tsx
│   │   ├── SnapAndLearnScreen.tsx
│   │   ├── TalkToSynexaScreen.tsx
│   │   ├── VideoExplanationCard.tsx
│   │   ├── VocabularyScreen.tsx
│   │   └── VoiceRecordScreen.tsx
│   ├── data/                     # Content & Language Configurations
│   │   ├── languages.ts
│   │   ├── lessonContent.ts
│   │   └── mockData.ts
│   ├── lib/
│   │   └── supabase.ts           # Supabase client & sync helpers
│   ├── utils/
│   │   ├── quizHelper.ts
│   │   └── speech.ts             # Web Speech API wrapper
│   ├── App.tsx                   # Main application router & state
│   ├── index.css                 # Tailwind CSS styles & animations
│   ├── main.tsx                  # React DOM entrypoint
│   └── types.ts                  # Shared TypeScript interfaces
├── .env.example                  # Environment variables template
├── index.html                    # HTML root entrypoint
├── package.json                  # Dependencies & scripts
├── server.ts                     # Fullstack Express API proxy for Gemini
├── tsconfig.json                 # TypeScript compiler options
└── vite.config.ts                # Vite build configuration
```

---

## ⚡ Quick Start / Local Setup

### 1. Prerequisites
- Node.js (v18.0.0 or higher)
- npm, yarn, or pnpm

### 2. Clone and Install Dependencies
```bash
git clone https://github.com/your-username/synexa.git
cd synexa
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Edit `.env` and provide your Gemini API key:
```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE

# Optional Supabase config
VITE_SUPABASE_URL=YOUR_SUPABASE_PROJECT_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

### 4. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

---

## 🚢 Production Build & Deployment

### Deploy to Vercel
1. Push this repository to your GitHub account.
2. In [Vercel Dashboard](https://vercel.com/dashboard), click **"Add New..."** > **"Project"** and import your repository.
3. In the **Environment Variables** section:
   - Name: `GEMINI_API_KEY`
   - Value: `<Your Google Gemini API Key>`
   - *(Optional)* `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
4. Click **Deploy**.
5. Vercel will automatically build the Vite frontend (`dist/`) and serve the backend API endpoints through `/api/index.ts` serverless functions.

---

### Local Production Build
```bash
npm run build
```
This bundles the frontend with Vite and packages the Express backend with esbuild into `dist/`.

### Run Local Production Server
```bash
npm start
```

---

## 📄 License
MIT License. Free for educational and open-source use.
