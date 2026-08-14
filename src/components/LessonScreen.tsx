import React, { useState } from 'react';
import { Language, ViewMode, SnapExplanationMode, SubjectId } from '../types';
import { ASSET_IMAGES } from '../data/mockData';
import { speakText } from '../utils/speech';
import { getLessonContent } from '../data/lessonContent';
import { MotherTongueBridgeCard } from './MotherTongueBridgeCard';
import { VideoExplanationCard } from './VideoExplanationCard';

interface LessonScreenProps {
  language: Language;
  subject?: SubjectId;
  onToggleLanguage: (lang: Language) => void;
  onNavigate: (view: ViewMode) => void;
}

export const LessonScreen: React.FC<LessonScreenProps> = ({
  language,
  subject = 'science',
  onToggleLanguage,
  onNavigate,
}) => {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'ingredients' | 'process' | 'video'>('overview');
  const [leftMediaTab, setLeftMediaTab] = useState<'diagram' | 'video'>('diagram');
  const [explanationMode, setExplanationMode] = useState<SnapExplanationMode>('simple');

  const activeSubject: SubjectId = (subject as SubjectId) || 'science';
  const lesson = getLessonContent(activeSubject, language);

  const handlePronounce = (id: string, text: string) => {
    setPlayingId(id);
    speakText(text, language);
    setTimeout(() => setPlayingId(null), 2000);
  };

  const modeButtons: { mode: SnapExplanationMode; label: string; icon: string }[] = [
    { mode: 'simple', label: 'Simple Mode', icon: 'lightbulb' },
    { mode: 'step_by_step', label: 'Step-by-Step', icon: 'format_list_numbered' },
    { mode: 'real_life', label: 'Real-Life Example', icon: 'cottage' },
    { mode: 'story', label: 'Story Mode', icon: 'auto_stories' },
    { mode: 'exam_answer', label: 'Exam Answer', icon: 'assignment' },
  ];

  return (
    <main className="flex-grow flex flex-col px-4 sm:px-8 py-6 max-w-6xl mx-auto w-full pb-32 space-y-8">
      {/* Top Bar with Language Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#17223B] p-6 rounded-3xl border border-white/10 shadow-xl">
        <div>
          <span className="bg-cyan-500/20 text-cyan-300 font-extrabold text-xs px-3 py-1 rounded-full border border-cyan-500/30">
            Grade 7 {subject === 'math' ? 'Mathematics' : subject === 'social_studies' ? 'Social Studies' : 'Science'} • Lesson 1
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
            {lesson.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            {lesson.subtitle}
          </p>
        </div>

        {/* Quick Language Toggle */}
        <div className="flex items-center gap-2">
          {(['en', 'mr', 'hi', 'gu', 'ta'] as Language[]).map((code) => (
            <button
              key={code}
              onClick={() => onToggleLanguage(code)}
              className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all uppercase cursor-pointer ${
                language === code
                  ? 'bg-cyan-400 text-slate-950 shadow-md scale-105'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20'
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Diagram / Video Media Card (5 cols) */}
        <div className="lg:col-span-5 cream-card p-6 flex flex-col justify-between interactive-lift space-y-4">
          <div>
            {/* Media Mode Switcher Header */}
            <div className="flex items-center justify-between mb-3 gap-2">
              <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-xl w-full">
                <button
                  onClick={() => setLeftMediaTab('diagram')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    leftMediaTab === 'diagram' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">image</span>
                  <span>Visual Diagram</span>
                </button>
                <button
                  onClick={() => setLeftMediaTab('video')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                    leftMediaTab === 'video' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">play_circle</span>
                  <span>Video Lesson</span>
                </button>
              </div>

              <button
                onClick={() => handlePronounce('title', lesson.title)}
                className={`w-9 h-9 rounded-xl shrink-0 flex items-center justify-center transition-colors cursor-pointer ${
                  playingId === 'title' ? 'bg-cyan-500 text-slate-950 animate-pulse' : 'bg-slate-200 hover:bg-cyan-200 text-cyan-900'
                }`}
                title="Pronounce lesson title"
              >
                <span className="material-symbols-outlined text-lg">volume_up</span>
              </button>
            </div>

            {leftMediaTab === 'diagram' ? (
              <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-200 bg-white p-2 shadow-inner flex items-center justify-center">
                <img
                  src={ASSET_IMAGES.photosynthesisDiagram}
                  alt={lesson.title}
                  className="w-full h-full object-contain p-2 hover:scale-105 transition-transform duration-300"
                />
              </div>
            ) : (
              <VideoExplanationCard
                subject={activeSubject}
                language={language}
                topicTitle={lesson.title}
              />
            )}
          </div>

          <div className="bg-cyan-50 p-3.5 rounded-xl border border-cyan-200 text-xs text-cyan-900 font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-cyan-700">info</span>
            <span>
              {leftMediaTab === 'diagram'
                ? 'Visual diagram illustrating key components of the lesson.'
                : 'Play the video to watch a detailed visual explanation for this topic.'}
            </span>
          </div>
        </div>

        {/* Right Explanation Card (7 cols) */}
        <div className="lg:col-span-7 cream-card p-6 sm:p-8 flex flex-col justify-between space-y-6 border-l-8 border-l-orange-500">
          {/* Tabs */}
          <div className="flex gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'ingredients', label: 'Key Components' },
              { id: 'process', label: 'Reaction Process' },
              { id: 'video', label: '🎬 Video Explanation' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl font-extrabold text-xs transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-4">
            {activeTab === 'overview' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <h3 className="text-xl font-extrabold text-slate-900">
                  {lesson.title}
                </h3>
                <p className="text-slate-700 leading-relaxed font-medium text-base">
                  {lesson.overview}
                </p>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <h3 className="text-xl font-extrabold text-slate-900">
                  Key Components
                </h3>
                <ul className="space-y-2 text-slate-800 font-semibold text-sm">
                  {lesson.ingredients.map((ing, idx) => (
                    <li key={idx} className="p-3 bg-white rounded-xl border border-slate-200 flex items-center gap-3">
                      <span className="text-2xl">{ing.icon}</span>
                      <div>
                        <span className="font-extrabold text-slate-900 block">{ing.name}</span>
                        <span className="text-xs text-slate-500">{ing.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'process' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <h3 className="text-xl font-extrabold text-slate-900">Chemical / Process Model</h3>
                <div className="bg-slate-900 text-white p-4 rounded-2xl font-mono text-xs space-y-2 shadow-inner">
                  <p className="text-cyan-400 font-bold">{lesson.equation.formula}</p>
                  <p className="text-slate-300 text-[11px]">{lesson.equation.text}</p>
                </div>
              </div>
            )}

            {activeTab === 'video' && (
              <div className="space-y-3 animate-in fade-in duration-200">
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <span>Topic Video Explanation</span>
                  <span className="text-xs bg-cyan-100 text-cyan-800 font-bold px-2.5 py-0.5 rounded-full">
                    Interactive Player
                  </span>
                </h3>
                <VideoExplanationCard
                  subject={activeSubject}
                  language={language}
                  topicTitle={lesson.title}
                />
              </div>
            )}
          </div>

          {/* Explanation Mode Selector */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <span className="text-xs font-extrabold uppercase text-slate-500 block">
              AI Explanation Mode
            </span>
            <div className="flex flex-wrap gap-2">
              {modeButtons.map((btn) => (
                <button
                  key={btn.mode}
                  onClick={() => setExplanationMode(btn.mode)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                    explanationMode === btn.mode
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-orange-400'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">{btn.icon}</span>
                  <span>{btn.label}</span>
                </button>
              ))}
            </div>

            {/* Selected Explanation Box */}
            <div className="bg-orange-50 border border-orange-200 p-4 rounded-2xl text-slate-900 space-y-1">
              <h4 className="font-extrabold text-xs text-orange-800 flex items-center gap-1">
                <span className="material-symbols-outlined text-base">psychology</span>
                <span>{lesson.explanationModes[explanationMode].modeTitle}</span>
              </h4>
              <p className="text-xs sm:text-sm font-medium leading-relaxed whitespace-pre-line text-slate-800">
                {lesson.explanationModes[explanationMode].content}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mother Tongue Bridge Card */}
      <MotherTongueBridgeCard
        bridge={lesson.bridgeCard}
        selectedLanguage={language}
        onToggleLanguage={onToggleLanguage}
      />

      {/* Voice Prompt Banner */}
      <div className="bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 text-slate-950 p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="bg-slate-950/20 text-slate-950 font-extrabold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
            Voice Assessment Ready
          </span>
          <h2 className="font-extrabold text-2xl sm:text-3xl text-slate-950 mt-1">
            Now Explain It In Your Own Words!
          </h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-900 mt-1">
            Speak into the microphone in your chosen language ({language.toUpperCase()}). Synexa AI will evaluate your understanding.
          </p>
        </div>

        <button
          onClick={() => onNavigate('record_explanation')}
          className="bg-slate-950 hover:bg-slate-900 text-white font-extrabold text-sm px-8 py-4 rounded-2xl shadow-xl active:scale-95 transition-all shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-xl text-cyan-400">mic</span>
          <span>Start Voice Explanation</span>
        </button>
      </div>
    </main>
  );
};
