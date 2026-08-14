import React, { useState } from 'react';
import { MotherTongueBridge, Language } from '../types';
import { speakText } from '../utils/speech';

interface MotherTongueBridgeCardProps {
  bridge: MotherTongueBridge;
  selectedLanguage?: Language;
  onToggleLanguage?: (lang: Language) => void;
}

export const MotherTongueBridgeCard: React.FC<MotherTongueBridgeCardProps> = ({
  bridge,
  selectedLanguage = 'mr',
}) => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handleSpeak = (id: string, text: string, lang: Language) => {
    setPlayingId(id);
    speakText(text, lang);
    setTimeout(() => setPlayingId(null), 2500);
  };

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden backdrop-blur-md space-y-6">
      {/* Decorative Badge Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-amber-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-black text-lg border border-amber-500/40 shrink-0">
            🔤
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 block">
              Mother Tongue → English Academic Terms Bridge
            </span>
            <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
              <span>{bridge.motherTongueTerm}</span>
              <span className="text-amber-400 text-sm">➔</span>
              <span className="text-cyan-300">{bridge.englishTerminology}</span>
            </h3>
          </div>
        </div>

        <button
          onClick={() => handleSpeak('main', `${bridge.motherTongueTerm}. ${bridge.englishTerminology}. ${bridge.examReadyEnglishAnswer}`, selectedLanguage as Language)}
          className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${
            playingId === 'main'
              ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30 animate-pulse'
              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 active:scale-95'
          }`}
          title="Listen Explanation in Mother Tongue"
        >
          <span className="material-symbols-outlined text-base">volume_up</span>
          <span>{playingId === 'main' ? 'Speaking...' : 'Listen Explanation'}</span>
        </button>
      </div>

      {/* 4-Step Interactive Flow Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Step 1: Mother Tongue Concept */}
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
            <span>1. Mother Tongue Explanation</span>
            <span className="text-amber-400 font-mono">🇮🇳</span>
          </div>
          <p className="text-sm font-bold text-white leading-relaxed">
            {bridge.motherTongueExplanation}
          </p>
        </div>

        {/* Step 2: English Terminology */}
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
            <span>2. Academic English Term</span>
            <span className="text-cyan-400 font-mono">🇬🇧</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-cyan-300">
              {bridge.englishTerminology}
            </span>
          </div>
        </div>

        {/* Step 3: Pronunciation Guide */}
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
            <span>3. Simple Pronunciation</span>
            <span className="material-symbols-outlined text-xs text-amber-400">record_voice_over</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-extrabold bg-amber-500/20 text-amber-300 px-3 py-1 rounded-lg border border-amber-500/30">
              /{bridge.pronunciation}/
            </span>
            <button
              onClick={() => handleSpeak('pron', bridge.englishTerminology, 'en')}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
              title="Listen Pronunciation"
            >
              <span className="material-symbols-outlined text-lg">campaign</span>
            </button>
          </div>
        </div>

        {/* Step 4: Exam-Ready English Definition */}
        <div className="bg-slate-900/80 p-4 rounded-2xl border border-cyan-500/40 flex flex-col justify-between sm:col-span-2">
          <div className="flex items-center justify-between text-[11px] font-extrabold text-cyan-400 uppercase tracking-wider mb-1">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">verified</span>
              <span>4. Exam-Ready English Definition</span>
            </span>
            <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2.5 py-0.5 rounded-full font-bold">
              Full Marks Format
            </span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-slate-100 italic leading-relaxed">
            "{bridge.examReadyEnglishAnswer}"
          </p>
        </div>
      </div>

      {/* Important Academic Vocabulary Terms List */}
      {bridge.academicTerms && bridge.academicTerms.length > 0 && (
        <div className="pt-2 border-t border-amber-500/20 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">school</span>
              <span>Important English Academic Terms</span>
            </h4>
            <span className="text-[10px] text-slate-400 font-bold">
              {bridge.academicTerms.length} Key Vocabulary Words
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {bridge.academicTerms.map((term) => (
              <div
                key={term.id}
                className="bg-slate-900/90 border border-white/10 hover:border-cyan-500/40 p-3.5 rounded-2xl transition-all flex flex-col justify-between space-y-2 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-extrabold text-sm text-cyan-300 group-hover:text-cyan-200 block">
                      {term.englishTerm}
                    </span>
                    <span className="text-xs font-bold text-amber-300 block">
                      {term.motherTongueTerm}
                    </span>
                  </div>

                  <button
                    onClick={() => handleSpeak(term.id, `${term.englishTerm}. ${term.motherTongueTerm}. ${term.motherTongueMeaning}`, selectedLanguage as Language)}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                      playingId === term.id
                        ? 'bg-cyan-400 text-slate-950 scale-105 animate-pulse'
                        : 'bg-white/10 text-slate-300 hover:bg-cyan-500/20 hover:text-cyan-300'
                    }`}
                    title="Listen Term Pronunciation & Meaning"
                  >
                    <span className="material-symbols-outlined text-base">volume_up</span>
                  </button>
                </div>

                <p className="text-xs text-slate-300 font-medium leading-normal line-clamp-2">
                  {term.motherTongueMeaning}
                </p>

                <div className="pt-1.5 border-t border-white/5 flex items-center justify-between text-[11px]">
                  <span className="font-mono text-amber-400/90 font-bold">/{term.pronunciation}/</span>
                  <span className="text-[10px] text-slate-400 uppercase font-extrabold">Exam Term</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
