import React from 'react';
import { ViewMode, Language } from '../types';
import { LOCALIZED_STRINGS } from '../data/languages';

interface BottomNavBarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  language?: Language;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentView,
  onNavigate,
  language = 'en',
}) => {
  if (currentView === 'landing' || currentView === 'record_explanation') {
    return null;
  }

  const strings = LOCALIZED_STRINGS[language] || LOCALIZED_STRINGS.en;

  const isHome = currentView === 'select';
  const isLearn = currentView === 'learn_lesson';
  const isVocab = currentView === 'learn_vocab';
  const isPractice = currentView === 'practice_quiz' || currentView === 'explanation_feedback';
  const isProgress = currentView === 'progress_dashboard';

  const navItems = [
    { id: 'select', label: strings.home || 'Home', icon: 'home', active: isHome, view: 'select' as ViewMode },
    { id: 'talk', label: strings.talkToSynexa || 'Voice AI', icon: 'record_voice_over', active: currentView === 'talk_to_synexa', view: 'talk_to_synexa' as ViewMode },
    { id: 'snap', label: strings.snapAndLearn || 'Snap', icon: 'add_a_photo', active: currentView === 'snap_and_learn', view: 'snap_and_learn' as ViewMode },
    { id: 'doubt', label: strings.aiDoubtSolver || 'Doubt AI', icon: 'psychology', active: currentView === 'ai_doubt_solver', view: 'ai_doubt_solver' as ViewMode },
    { id: 'progress', label: strings.progress || 'Progress', icon: 'analytics', active: isProgress, view: 'progress_dashboard' as ViewMode },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full z-50 flex justify-around items-center py-2 px-2 bg-[#0B132B]/95 backdrop-blur-lg border-t border-white/10 shadow-2xl md:hidden">
      {navItems.map((item) => (
        <button
          key={item.id}
          onClick={() => onNavigate(item.view)}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl transition-all duration-200 active:scale-90 ${
            item.active
              ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/10 text-cyan-300 font-extrabold border border-cyan-500/30 shadow-md shadow-cyan-950/50'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span
            className={`material-symbols-outlined text-xl mb-0.5 ${
              item.active ? 'text-cyan-400 animate-pulse' : 'text-slate-400'
            }`}
            data-weight={item.active ? 'fill' : undefined}
          >
            {item.icon}
          </span>
          <span className="text-[10px] tracking-wide font-bold">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};

