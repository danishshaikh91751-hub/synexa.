import React, { useState } from 'react';
import { ViewMode, Language, UserStats } from '../types';
import { ASSET_IMAGES } from '../data/mockData';
import { LOCALIZED_STRINGS } from '../data/languages';

interface DesktopSidebarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  language?: Language;
  userStats?: UserStats;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  currentView,
  onNavigate,
  language = 'en',
  userStats,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const strings = LOCALIZED_STRINGS[language] || LOCALIZED_STRINGS.en;

  if (currentView === 'landing' || currentView === 'record_explanation') {
    return null;
  }

  const isHome = currentView === 'select';
  const isLearn = currentView === 'learn_lesson';
  const isVocab = currentView === 'learn_vocab';
  const isPractice = currentView === 'practice_quiz' || currentView === 'explanation_feedback';
  const isProgress = currentView === 'progress_dashboard';

  const navItems = [
    {
      id: 'select',
      label: strings.home || 'Home',
      icon: 'home',
      active: isHome,
      badge: null,
      view: 'select' as ViewMode,
    },
    {
      id: 'talk_to_synexa',
      label: strings.talkToSynexa || 'Talk to Synexa',
      icon: 'record_voice_over',
      active: currentView === 'talk_to_synexa',
      badge: 'Voice AI',
      view: 'talk_to_synexa' as ViewMode,
    },
    {
      id: 'snap_and_learn',
      label: strings.snapAndLearn || 'Snap & Learn',
      icon: 'add_a_photo',
      active: currentView === 'snap_and_learn',
      badge: 'Camera',
      view: 'snap_and_learn' as ViewMode,
    },
    {
      id: 'ai_doubt_solver',
      label: strings.aiDoubtSolver || 'AI Doubt Solver',
      icon: 'psychology',
      active: currentView === 'ai_doubt_solver',
      badge: '24/7',
      view: 'ai_doubt_solver' as ViewMode,
    },
    {
      id: 'learn',
      label: strings.learn || 'Learn',
      icon: 'school',
      active: isLearn,
      badge: null,
      view: 'learn_lesson' as ViewMode,
    },
    {
      id: 'vocab',
      label: strings.vocabulary || 'Vocabulary',
      icon: 'auto_stories',
      active: isVocab,
      badge: null,
      view: 'learn_vocab' as ViewMode,
    },
    {
      id: 'practice',
      label: strings.practice || 'Practice',
      icon: 'exercise',
      active: isPractice,
      badge: null,
      view: 'practice_quiz' as ViewMode,
    },
    {
      id: 'progress',
      label: strings.progress || 'Progress',
      icon: 'analytics',
      active: isProgress,
      badge: 'Level 3',
      view: 'progress_dashboard' as ViewMode,
    },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col fixed left-0 top-16 bottom-0 bg-[#0B132B] border-r border-white/10 pt-6 pb-4 z-40 transition-all duration-300 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <nav className="flex flex-col gap-2 px-3 flex-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.view)}
            className={`group relative flex items-center gap-3.5 py-3 px-3.5 rounded-2xl transition-all duration-200 text-left w-full font-bold text-sm ${
              item.active
                ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/10 text-cyan-300 border border-cyan-500/30 shadow-md shadow-cyan-950/50'
                : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            {/* Active Pill Bar */}
            {item.active && (
              <span className="absolute left-0 top-2 bottom-2 w-1.5 bg-gradient-to-b from-cyan-400 to-teal-400 rounded-r-full shadow-lg shadow-cyan-400/50" />
            )}

            <span
              className={`material-symbols-outlined text-xl shrink-0 transition-transform group-hover:scale-110 ${
                item.active ? 'text-cyan-400' : 'text-slate-400 group-hover:text-cyan-300'
              }`}
              data-weight={item.active ? 'fill' : undefined}
            >
              {item.icon}
            </span>

            {!isCollapsed && (
              <div className="flex items-center justify-between flex-1 min-w-0">
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] font-extrabold bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30">
                    {item.badge}
                  </span>
                )}
              </div>
            )}

            {/* Collapsed Tooltip */}
            {isCollapsed && (
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#17223B] text-white text-xs font-bold rounded-xl border border-white/15 shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                {item.label}
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* Footer / Mini User Profile */}
      <div className="px-3 pt-3 border-t border-white/10 flex flex-col gap-3">
        {!isCollapsed && userStats && (
          <div
            onClick={() => onNavigate('progress_dashboard')}
            className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/40 cursor-pointer transition-all flex items-center gap-3 group"
          >
            <img
              src={ASSET_IMAGES.userAvatar}
              alt="Profile"
              className="w-10 h-10 rounded-full border border-cyan-400 object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-xs text-white truncate group-hover:text-cyan-300 transition-colors">
                Aarav Sharma
              </h4>
              <p className="text-[11px] text-teal-400 font-semibold truncate">
                Level {userStats.level} • {userStats.xp} XP
              </p>
            </div>
            <span className="material-symbols-outlined text-orange-400 text-lg">local_fire_department</span>
          </div>
        )}

        {/* Collapse Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-center py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-cyan-300 transition-all text-xs font-semibold gap-2"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          <span className="material-symbols-outlined text-lg">
            {isCollapsed ? 'side_navigation' : 'keyboard_double_arrow_left'}
          </span>
          {!isCollapsed && <span>Collapse Sidebar</span>}
        </button>
      </div>
    </aside>
  );
};

