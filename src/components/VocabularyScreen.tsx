import React, { useState } from 'react';
import { ViewMode, Language, SubjectId } from '../types';
import { VOCABULARY_TERMS } from '../data/mockData';
import { speakText } from '../utils/speech';

interface VocabularyScreenProps {
  language: Language;
  subject?: SubjectId;
  onToggleLanguage: (lang: Language) => void;
  onNavigate: (view: ViewMode) => void;
}

export const VocabularyScreen: React.FC<VocabularyScreenProps> = ({
  language,
  subject = 'science',
  onToggleLanguage,
  onNavigate,
}) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [masteredWords, setMasteredWords] = useState<Record<string, boolean>>({
    v1: true,
  });

  const categoryName = subject === 'math' ? 'Math' : subject === 'social_studies' ? 'Social Studies' : 'Science';
  const filteredTerms = VOCABULARY_TERMS.filter(
    (t) => !t.category || t.category.toLowerCase().includes(categoryName.toLowerCase()) || subject === 'science'
  );

  const handleSpeak = (e: React.MouseEvent, id: string, textEnglish: string, textMarathi: string) => {
    e.stopPropagation();
    setPlayingId(id);
    speakText(language === 'mr' ? textMarathi : textEnglish, language);
    setTimeout(() => setPlayingId(null), 2000);
  };

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMastery = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setMasteredWords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalMastered = Object.values(masteredWords).filter(Boolean).length;

  return (
    <main className="flex-grow flex flex-col items-center w-full max-w-5xl mx-auto px-4 sm:px-8 py-6 pb-32 space-y-8">
      {/* Header Banner */}
      <div className="w-full bg-[#17223B] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-cyan-500/20 text-cyan-300 text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/30">
              Interactive Flashcards Mode
            </span>
            <span className="bg-teal-500/20 text-teal-300 text-xs font-bold px-3 py-1 rounded-full border border-teal-500/30">
              ✓ {totalMastered} / {filteredTerms.length} Words Mastered
            </span>
          </div>
          <h2 className="font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
            {subject === 'math'
              ? language === 'mr'
                ? 'गणितीय शब्दसंग्रह (Mathematics Vocabulary)'
                : 'Mathematics Vocabulary & Terms'
              : subject === 'social_studies'
              ? language === 'mr'
                ? 'सामाजिक शास्त्रे शब्दसंग्रह (Social Studies Vocabulary)'
                : 'Social Studies Vocabulary & Concepts'
              : language === 'mr'
              ? 'शास्त्रीय शब्दसंग्रह (Scientific Vocabulary)'
              : 'Scientific Vocabulary & Concepts'}
          </h2>
          <p className="text-slate-300 text-sm mt-1">
            Tap cards to flip over and test your memory of {categoryName} terms in your language & English.
          </p>
        </div>

        {/* Bilingual Toggle */}
        <button
          onClick={() => onToggleLanguage(language === 'mr' ? 'en' : 'mr')}
          className="bg-white/10 hover:bg-white/15 text-cyan-300 border border-cyan-500/30 rounded-2xl px-4 py-2.5 text-xs font-extrabold transition-all active:scale-95 shrink-0 flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-base">translate</span>
          <span>{language === 'mr' ? 'मराठी ⇄ ENGLISH' : 'ENGLISH ⇄ MARATHI'}</span>
        </button>
      </div>

      {/* Cards Grid */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTerms.map((term) => {
          const isFlipped = !!flippedCards[term.id];
          const isMastered = !!masteredWords[term.id];

          return (
            <div
              key={term.id}
              onClick={() => toggleFlip(term.id)}
              className={`cream-card p-6 cursor-pointer relative transition-all duration-300 interactive-lift flex flex-col justify-between min-h-[220px] ${
                isMastered ? 'border-2 border-teal-500' : 'border border-slate-200'
              }`}
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full">
                  {term.category || 'Science'} • Grade 7
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => toggleMastery(e, term.id)}
                    className={`text-xs font-extrabold px-3 py-1 rounded-full transition-all flex items-center gap-1 ${
                      isMastered
                        ? 'bg-teal-500 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                    }`}
                  >
                    <span>{isMastered ? 'Mastered ✓' : 'Mark Mastered'}</span>
                  </button>

                  <button
                    onClick={(e) => handleSpeak(e, term.id, term.termEnglish, term.termMarathi)}
                    className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                      playingId === term.id
                        ? 'bg-cyan-500 text-slate-950 animate-pulse scale-110'
                        : 'bg-slate-100 text-slate-700 hover:bg-cyan-100 hover:text-cyan-800'
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">volume_up</span>
                  </button>
                </div>
              </div>

              {/* Main Card Content (Front vs Back) */}
              <div className="my-4">
                {!isFlipped ? (
                  <div>
                    <h3 className="text-2xl font-extrabold text-slate-900">{term.termEnglish}</h3>
                    <h4 className="text-lg font-bold text-cyan-800 mt-0.5">{term.termMarathi}</h4>
                    <p className="text-xs text-slate-500 mt-2 italic flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">touch_app</span>
                      <span>Tap card to see definition & context</span>
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 animate-in fade-in duration-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">DEFINITION & EXAMPLE</span>
                    <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                      {language === 'mr' ? term.exampleMarathi : term.exampleEnglish}
                    </p>
                  </div>
                )}
              </div>

              {/* Bottom Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-200 text-xs text-slate-500 font-semibold">
                <span>{isFlipped ? 'Side 2 of 2 (Definition)' : 'Side 1 of 2 (Term)'}</span>
                <span className="text-cyan-700 hover:underline">
                  {isFlipped ? 'Flip Back ↺' : 'Flip to Reveal →'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full pt-4">
        <button
          onClick={() => onNavigate('learn_lesson')}
          className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold px-8 py-4 rounded-2xl shadow-lg shadow-cyan-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>Return to Lesson</span>
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>

        <button
          onClick={() => onNavigate('practice_quiz')}
          className="w-full sm:w-auto cream-card text-slate-900 font-extrabold px-8 py-4 rounded-2xl border border-slate-300 hover:bg-white active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>Test Knowledge with Quiz</span>
          <span className="material-symbols-outlined text-lg">quiz</span>
        </button>
      </div>
    </main>
  );
};

