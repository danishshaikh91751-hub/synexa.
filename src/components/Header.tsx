import React, { useState, useRef, useEffect } from 'react';
import { ViewMode, Language, Theme, UserStats, NotificationItem } from '../types';
import { ASSET_IMAGES, VOCABULARY_TERMS, QUIZ_QUESTIONS, AI_RECOMMENDATIONS, INITIAL_USER_STATS, INITIAL_NOTIFICATIONS } from '../data/mockData';
import { SUPPORTED_LANGUAGES, LOCALIZED_STRINGS } from '../data/languages';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  isSimpleMode?: boolean;
  onToggleSimpleMode?: (val: boolean) => void;
  theme?: Theme;
  onToggleTheme?: () => void;
  userStats?: UserStats;
  notifications?: NotificationItem[];
  onMarkNotificationRead?: (id: string) => void;
  title?: string;
  showClose?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  language,
  onToggleLanguage,
  isSimpleMode = false,
  onToggleSimpleMode = (_val: boolean) => {},
  theme = 'dark',
  onToggleTheme = () => {},
  userStats = INITIAL_USER_STATS,
  notifications = INITIAL_NOTIFICATIONS,
  onMarkNotificationRead,
  title,
  showClose,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];
  const strings = LOCALIZED_STRINGS[language] || LOCALIZED_STRINGS.mr;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (currentView === 'landing') {
    return null;
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Filter search results
  const searchResults = searchQuery.trim() === '' ? [] : [
    ...VOCABULARY_TERMS.filter((v) =>
      v.termEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.termMarathi.includes(searchQuery)
    ).map((v) => ({ type: 'Vocabulary', title: v.termEnglish, sub: v.termMarathi, view: 'learn_vocab' as ViewMode })),
    ...QUIZ_QUESTIONS.filter((q) =>
      q.questionEnglish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.topic.toLowerCase().includes(searchQuery.toLowerCase())
    ).map((q) => ({ type: 'Quiz Topic', title: q.topic, sub: q.questionEnglish, view: 'practice_quiz' as ViewMode })),
    ...AI_RECOMMENDATIONS.filter((r) =>
      r.titleEnglish.toLowerCase().includes(searchQuery.toLowerCase())
    ).map((r) => ({ type: 'AI Recommendation', title: r.titleEnglish, sub: r.reasonEnglish, view: r.targetView })),
  ];

  return (
    <>
      <header className="bg-[#0B132B] flex justify-between items-center px-4 md:px-8 h-16 w-full z-50 sticky top-0 border-b border-white/10 shadow-lg">
        {/* Left Section: Menu Toggle & Logo */}
        <div className="flex items-center gap-3">
          {showClose ? (
            <button
              onClick={() => onNavigate('learn_lesson')}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-cyan-400 transition-all active:scale-95 cursor-pointer"
              aria-label="Close"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('select')}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-cyan-400 transition-all active:scale-95 md:hidden cursor-pointer"
              aria-label="Menu"
            >
              <span className="material-symbols-outlined text-xl">menu</span>
            </button>
          )}

          <div
            onClick={() => onNavigate('select')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-teal-400 p-1 flex items-center justify-center shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform overflow-hidden">
              <img
                src="/favicon.svg"
                alt="SYNEXA Logo Mark"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="font-extrabold text-lg md:text-xl text-white tracking-tight leading-none group-hover:text-cyan-300 transition-colors">
                {title || 'SYNEXA'}
              </h1>
              <span className="text-[10px] font-semibold text-teal-400 tracking-wider uppercase hidden sm:block">
                AI Learning Engine
              </span>
            </div>
          </div>
        </div>

        {/* Center Section: Search Bar & AI Quick Shortcuts */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-6 gap-2">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex-1 bg-[#17223B] hover:bg-[#1f2d4d] text-slate-300 border border-white/10 hover:border-cyan-500/40 rounded-full px-4 py-2 text-sm flex items-center justify-between transition-all shadow-inner group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-cyan-400 group-hover:scale-110 transition-transform">search</span>
              <span className="text-slate-400 text-xs font-medium">Search topics in {currentLangObj.nativeName}...</span>
            </div>
            <kbd className="bg-white/10 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded border border-white/10">⌘K</kbd>
          </button>
        </div>

        {/* Right Section: Language Dropdown, Simple Mode Toggle, Streak & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Simple Language Mode Switcher Pill */}
          <button
            onClick={() => onToggleSimpleMode(!isSimpleMode)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 border ${
              isSimpleMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md shadow-amber-500/10'
                : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
            }`}
            title="Toggle Simple Language Mode (सोपी भाषा)"
          >
            <span className="material-symbols-outlined text-sm text-amber-400">
              {isSimpleMode ? 'check_circle' : 'auto_fix_high'}
            </span>
            <span className="hidden xl:inline">{isSimpleMode ? 'Simple Mode ON' : 'Simple Mode'}</span>
          </button>

          {/* 12-Language Switcher Dropdown */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="bg-white/5 hover:bg-white/10 border border-cyan-500/30 text-cyan-300 hover:text-white rounded-xl px-2.5 py-1.5 text-xs font-bold transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Select Mother Tongue"
            >
              <span className="text-sm">{currentLangObj.flag}</span>
              <span className="font-extrabold text-xs">{currentLangObj.nativeName}</span>
              <span className="material-symbols-outlined text-sm text-cyan-400">expand_more</span>
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#17223B] border border-cyan-500/30 rounded-2xl shadow-2xl p-2 z-50 max-h-96 overflow-y-auto divide-y divide-white/5 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-2 text-[10px] font-black uppercase text-cyan-400 tracking-wider">
                  Select Mother Tongue / भाषा निवडा
                </div>
                <div className="pt-1 space-y-0.5">
                  {SUPPORTED_LANGUAGES.map((langOpt) => (
                    <button
                      key={langOpt.code}
                      onClick={() => {
                        onToggleLanguage(langOpt.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-extrabold flex items-center justify-between transition-colors cursor-pointer ${
                        language === langOpt.code
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                          : 'text-slate-200 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{langOpt.flag}</span>
                        <span className="text-sm">{langOpt.nativeName}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {langOpt.englishName}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Streak Indicator Badge */}
          <button
            onClick={() => onNavigate('progress_dashboard')}
            className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-orange-500/40 text-amber-300 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm cursor-pointer"
            title="Streak Counter"
          >
            <span className="material-symbols-outlined text-orange-400 text-base animate-pulse">local_fire_department</span>
            <span>{userStats.streak}d</span>
          </button>

          {/* Notification Bell Dropdown */}
          <div className="relative" ref={notificationsRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-cyan-300 transition-all active:scale-95 relative cursor-pointer"
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#0B132B] animate-bounce">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Popover */}
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#17223B] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-cyan-400 text-lg">notifications_active</span>
                    <h3 className="font-bold text-white text-sm">Notifications</h3>
                  </div>
                  <span className="text-xs bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-semibold">
                    {unreadCount} new
                  </span>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-white/5">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-slate-400 text-xs">No notifications yet.</div>
                  ) : (
                    notifications.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => {
                          if (onMarkNotificationRead) onMarkNotificationRead(item.id);
                        }}
                        className={`p-3.5 hover:bg-white/5 cursor-pointer transition-colors flex gap-3 ${
                          !item.read ? 'bg-cyan-950/30' : ''
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                          <span className="material-symbols-outlined text-base">
                            {item.type === 'streak' ? 'local_fire_department' : item.type === 'achievement' ? 'emoji_events' : 'auto_awesome'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-xs text-white">
                              {language === 'mr' ? item.titleMarathi : item.titleEnglish}
                            </h4>
                            <span className="text-[10px] text-slate-400 shrink-0 ml-2">{item.timeAgo}</span>
                          </div>
                          <p className="text-[11px] text-slate-300 mt-1 leading-snug">
                            {item.descriptionEnglish}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="p-2 border-t border-white/10 text-center bg-white/5">
                  <button
                    onClick={() => {
                      setIsNotificationsOpen(false);
                      onNavigate('progress_dashboard');
                    }}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors py-1 w-full cursor-pointer"
                  >
                    View All Activity & Badges →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-9 h-9 rounded-xl overflow-hidden border-2 border-cyan-500/40 hover:border-cyan-400 transition-all active:scale-95 shadow-md cursor-pointer"
              aria-label="User Profile"
            >
              <img
                src={ASSET_IMAGES.userAvatar}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-[#17223B] border border-white/15 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                  <img
                    src={ASSET_IMAGES.userAvatar}
                    alt="Aarav Sharma"
                    className="w-12 h-12 rounded-full border border-cyan-400 object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-white text-sm">Aarav Sharma</h3>
                    <p className="text-xs text-cyan-400 font-semibold">Class 7 • Scholar</p>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full inline-block mt-1">
                      🔥 {userStats.streak} Day Streak
                    </span>
                  </div>
                </div>

                {/* Level Progress */}
                <div className="py-3 border-b border-white/10">
                  <div className="flex justify-between text-xs text-slate-300 mb-1 font-semibold">
                    <span>Level {userStats.level} Scholar</span>
                    <span className="text-cyan-300">{userStats.xp} / {userStats.nextLevelXp} XP</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full transition-all duration-500"
                      style={{ width: `${(userStats.xp / userStats.nextLevelXp) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Quick Nav Options */}
                <div className="pt-2 flex flex-col gap-1">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      onNavigate('talk_to_synexa');
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10 rounded-xl transition-colors text-left cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-cyan-400 text-base">record_voice_over</span>
                    Talk to Synexa (Voice Tutor)
                  </button>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      onNavigate('snap_and_learn');
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10 rounded-xl transition-colors text-left cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-teal-400 text-base">add_a_photo</span>
                    Snap & Learn (Camera Explainer)
                  </button>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      onNavigate('ai_doubt_solver');
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10 rounded-xl transition-colors text-left cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-purple-400 text-base">psychology</span>
                    AI Doubt Solver
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};


