import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { ViewMode, EvaluationResult, Language } from '../types';
import { speakText } from '../utils/speech';

interface FeedbackScreenProps {
  evaluation: EvaluationResult | null;
  language?: Language;
  onNavigate: (view: ViewMode) => void;
}

export const FeedbackScreen: React.FC<FeedbackScreenProps> = ({
  evaluation,
  language = 'mr',
  onNavigate,
}) => {
  const result: EvaluationResult = evaluation || {
    understandingPercentage: 88,
    titleMarathi: 'उत्तम स्पष्टीकरण!',
    titleEnglish: 'Great Concept Explanation!',
    whatYouGotRight: [
      'Identified solar energy absorption required for food synthesis',
      'Understood water absorption through roots & carbon dioxide uptake',
    ],
    whatYouMissed: [
      'Role of chlorophyll pigment inside leaf chloroplasts in trapping photons',
    ],
    focusArea: "Review how chlorophyll pigment absorbs solar photons in leaf cells.",
    examReadyEnglishAnswer: 'Photosynthesis is the chemical process by which green plants manufacture carbohydrates (glucose) from carbon dioxide and water using sunlight absorbed by chlorophyll.',
  };

  const [dashOffset, setDashOffset] = useState(251.2);
  const [isPlaying, setIsPlaying] = useState(false);

  const examAnswerText =
    result.examReadyEnglishAnswer ||
    'Photosynthesis is the chemical process by which green plants manufacture glucose from carbon dioxide and water using solar energy absorbed by chlorophyll.';

  const handleSpeakExam = () => {
    setIsPlaying(true);
    speakText(examAnswerText, 'en');
    setTimeout(() => setIsPlaying(false), 4000);
  };

  // Trigger confetti and progress ring animation on mount
  useEffect(() => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
    });

    const targetOffset = 251.2 - (251.2 * result.understandingPercentage) / 100;
    const timer = setTimeout(() => {
      setDashOffset(targetOffset);
    }, 150);
    return () => clearTimeout(timer);
  }, [result.understandingPercentage]);

  return (
    <main className="flex-1 flex flex-col items-center justify-start px-4 sm:px-8 py-8 pb-32 max-w-4xl mx-auto w-full space-y-8">
      {/* Celebration Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-lg mb-2">
          <span className="material-symbols-outlined text-3xl">celebration</span>
        </div>
        <h1 className="font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
          {result.titleMarathi}
        </h1>
        <p className="text-sm sm:text-base text-slate-300 font-semibold">{result.titleEnglish}</p>
      </div>

      {/* Score Ring Card */}
      <div className="cream-card p-8 rounded-3xl w-full max-w-md flex flex-col items-center justify-center space-y-4 shadow-xl border border-slate-200">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              className="text-slate-200"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="10"
            />
            <circle
              className="text-teal-500 transition-all duration-1000 ease-out"
              cx="50"
              cy="50"
              r="40"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="10"
              strokeDasharray="251.2"
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-extrabold text-4xl text-slate-900">
              {result.understandingPercentage}%
            </span>
            <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mt-0.5">
              Concept Mastery
            </span>
          </div>
        </div>

        <div className="bg-slate-100 px-4 py-2 rounded-full text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <span className="material-symbols-outlined text-amber-500 text-sm">stars</span>
          <span>Earned +50 XP for Voice Assessment!</span>
        </div>
      </div>

      {/* Dual Feedback Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Right answers */}
        <div className="cream-card p-6 rounded-3xl space-y-4 border-l-8 border-l-teal-500 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-teal-800 font-extrabold text-lg mb-3">
              <span className="material-symbols-outlined text-teal-600">check_circle</span>
              <span>What You Explained Well</span>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-slate-800">
              {result.whatYouGotRight.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-teal-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Missed / Focus Area */}
        <div className="cream-card p-6 rounded-3xl space-y-4 border-l-8 border-l-orange-500 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-orange-800 font-extrabold text-lg mb-3">
              <span className="material-symbols-outlined text-orange-600">tips_and_updates</span>
              <span>Areas to Improve</span>
            </div>

            <ul className="space-y-2.5 text-xs sm:text-sm font-semibold text-slate-800 mb-4">
              {result.whatYouMissed.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-orange-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-orange-50 p-3 rounded-xl border border-orange-200 text-xs font-bold text-orange-950">
            <span className="uppercase text-[10px] text-orange-600 block mb-0.5">Recommended Action:</span>
            <span>{result.focusArea}</span>
          </div>
        </div>
      </div>

      {/* Exam Ready English Answer Card */}
      <div className="w-full bg-[#17223B] p-6 rounded-3xl border border-cyan-500/30 shadow-xl space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-cyan-400 text-xl">verified</span>
            <span className="font-extrabold text-sm uppercase text-cyan-300 tracking-wider">
              Exam-Ready English Answer (Full Marks Format)
            </span>
          </div>

          <button
            onClick={handleSpeakExam}
            className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
              isPlaying
                ? 'bg-cyan-400 text-slate-950 shadow-md animate-pulse'
                : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30'
            }`}
          >
            <span className="material-symbols-outlined text-sm">volume_up</span>
            <span>{isPlaying ? 'Speaking English...' : 'Listen Answer'}</span>
          </button>
        </div>

        <p className="text-sm sm:text-base font-semibold text-white leading-relaxed italic bg-slate-900/80 p-4 rounded-2xl border border-white/10">
          "{examAnswerText}"
        </p>

        <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
          <span className="material-symbols-outlined text-xs text-amber-400">tips_and_updates</span>
          <span>Memorize this concise 1-sentence English definition for full marks in board exams!</span>
        </p>
      </div>

      {/* Bottom CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full pt-4">
        <button
          onClick={() => onNavigate('record_explanation')}
          className="w-full sm:w-auto cream-card hover:bg-white text-slate-900 font-extrabold px-8 py-4 rounded-2xl border border-slate-300 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">mic</span>
          <span>Try Voice Explanation Again</span>
        </button>

        <button
          onClick={() => onNavigate('practice_quiz')}
          className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold px-8 py-4 rounded-2xl shadow-lg shadow-cyan-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>Continue to Practice Quiz</span>
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>
      </div>
    </main>
  );
};

