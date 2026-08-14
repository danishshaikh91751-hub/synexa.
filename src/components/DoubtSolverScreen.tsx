import React, { useState } from 'react';
import { Language, MotherTongueBridge, ViewMode, SubjectId } from '../types';
import { LOCALIZED_STRINGS, SUPPORTED_LANGUAGES } from '../data/languages';
import { MotherTongueBridgeCard } from './MotherTongueBridgeCard';
import { speakText } from '../utils/speech';

interface DoubtSolverScreenProps {
  language: Language;
  subject?: SubjectId;
  isSimpleMode: boolean;
  onNavigate: (view: ViewMode) => void;
}

interface SolutionResult {
  identifiedSubject: string;
  topicName: string;
  solutionMotherTongue: string;
  bridge: MotherTongueBridge;
  practiceQuestion: string;
}

export const DoubtSolverScreen: React.FC<DoubtSolverScreenProps> = ({
  language,
  subject = 'science',
  isSimpleMode,
  onNavigate,
}) => {
  const [questionText, setQuestionText] = useState('');
  const [inputMode, setInputMode] = useState<'text' | 'voice' | 'image'>('text');
  const [isSolving, setIsSolving] = useState(false);
  const [solution, setSolution] = useState<SolutionResult | null>(null);

  const strings = LOCALIZED_STRINGS[language] || LOCALIZED_STRINGS.mr;

  const sampleDoubtChips = subject === 'math'
    ? [
        'अपूर्णांक म्हणजे काय?',
        'अपूर्णांकांची बेरीज कशी करतात?',
        'What is a Fraction?',
        'How to simplify ratios?',
      ]
    : subject === 'social_studies'
    ? [
        'अक्षांश आणि रेखांश म्हणजे काय?',
        'नकाशा प्रमाण काय असते?',
        'What is climate zone?',
        'How to read map directions?',
      ]
    : [
        'पर्णरंध्रे म्हणजे काय?',
        'वनस्पती अन्न कसे बनवतात?',
        'How do plants absorb water?',
        'What is Photosynthesis?',
      ];

  const handleSolveDoubt = async (qText?: string) => {
    const query = qText || questionText;
    if (!query.trim() || isSolving) return;

    setIsSolving(true);
    try {
      const res = await fetch('/api/doubt-solver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          language,
          subject,
          isSimpleMode,
        }),
      });

      const data = await res.json();
      if (data && data.solutionMotherTongue) {
        setSolution(data);
        speakText(data.solutionMotherTongue, language);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSolving(false);
    }
  };

  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 pb-32 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-cyan-900/40 via-purple-900/30 to-slate-900 p-5 rounded-3xl border border-cyan-500/30 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center font-black text-2xl shadow-lg">
            ❓
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 block">
              Instant AI Doubt Resolution
            </span>
            <h1 className="font-extrabold text-xl text-white">{strings.aiDoubtSolver}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {['text', 'voice', 'image'].map((m) => (
            <button
              key={m}
              onClick={() => setInputMode(m as any)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold uppercase transition-all cursor-pointer ${
                inputMode === m
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                  : 'bg-slate-900 text-slate-300 border border-slate-800'
              }`}
            >
              {m === 'text' ? '✍️ Text' : m === 'voice' ? '🎙️ Voice' : '📷 Photo'}
            </button>
          ))}
        </div>
      </div>

      {/* Input Box Card */}
      <div className="cream-card p-5 rounded-3xl space-y-3 shadow-xl border border-slate-200">
        <div className="flex justify-between items-center text-xs font-extrabold text-slate-500 uppercase">
          <span>Ask doubt in text, voice or image</span>
          <span>Subject Auto-Detect</span>
        </div>

        <textarea
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          rows={3}
          placeholder="Ask any doubt (e.g. प्रकाशसंश्लेषण म्हणजे काय?, What is a Fraction?, Why is the sky blue?)"
          className="w-full bg-white border border-slate-300 rounded-2xl p-4 text-slate-900 font-extrabold text-base leading-relaxed focus:ring-2 focus:ring-cyan-500 outline-none resize-none"
        />

        {/* Preset Sample Doubt Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {sampleDoubtChips.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuestionText(sample);
                handleSolveDoubt(sample);
              }}
              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-full text-xs font-bold whitespace-nowrap transition-colors cursor-pointer"
            >
              + {sample}
            </button>
          ))}
        </div>

        <button
          onClick={() => handleSolveDoubt()}
          disabled={!questionText.trim() || isSolving}
          className="w-full bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-extrabold text-base py-4 rounded-2xl shadow-lg shadow-cyan-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          <span className="material-symbols-outlined font-black">psychology</span>
          <span>{isSolving ? 'Solving with AI...' : 'Solve Doubt Now'}</span>
        </button>
      </div>

      {/* Solution Display */}
      {solution && (
        <div className="space-y-4">
          <div className="cream-card p-6 rounded-3xl space-y-4 shadow-xl border border-slate-200">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="bg-cyan-100 text-cyan-900 px-3 py-1 rounded-full text-xs font-black uppercase">
                  {solution.identifiedSubject}
                </span>
                <h3 className="font-extrabold text-base text-slate-900">
                  {solution.topicName}
                </h3>
              </div>

              <button
                onClick={() => speakText(solution.solutionMotherTongue, language)}
                className="px-3 py-1.5 bg-cyan-50 text-cyan-800 hover:bg-cyan-100 rounded-full text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">volume_up</span>
                <span>Listen Audio Solution</span>
              </button>
            </div>

            <p className="text-sm font-semibold text-slate-800 leading-relaxed bg-white p-4 rounded-2xl border border-slate-200">
              {solution.solutionMotherTongue}
            </p>

            {solution.practiceQuestion && (
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs font-bold text-amber-950 flex items-center justify-between">
                <div>
                  <span className="uppercase text-[10px] text-amber-700 block font-black">
                    Quick Practice Check:
                  </span>
                  <span>{solution.practiceQuestion}</span>
                </div>
                <button
                  onClick={() => onNavigate('practice_quiz')}
                  className="px-3 py-1.5 bg-amber-500 text-slate-950 font-black rounded-xl text-xs hover:bg-amber-400 transition-colors shrink-0"
                >
                  Solve Quiz
                </button>
              </div>
            )}
          </div>

          {/* Mother Tongue -> English Bridge */}
          {solution.bridge && (
            <MotherTongueBridgeCard bridge={solution.bridge} selectedLanguage={language} />
          )}
        </div>
      )}
    </main>
  );
};
