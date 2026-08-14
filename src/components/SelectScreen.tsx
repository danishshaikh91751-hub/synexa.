import React, { useState } from 'react';
import { SubjectId, Language, ViewMode, UserStats } from '../types';
import { DAILY_CHALLENGE, ASSET_IMAGES } from '../data/mockData';
import { LOCALIZED_STRINGS, SUPPORTED_LANGUAGES } from '../data/languages';

interface SelectScreenProps {
  selectedLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  selectedSubject: SubjectId;
  onSelectSubject: (subject: SubjectId) => void;
  onContinue: () => void;
  onNavigate: (view: ViewMode) => void;
  userStats: UserStats;
}

export const SelectScreen: React.FC<SelectScreenProps> = ({
  selectedLanguage,
  onSelectLanguage,
  selectedSubject,
  onSelectSubject,
  onContinue,
  onNavigate,
  userStats,
}) => {
  const [activeLang, setActiveLang] = useState<Language>(selectedLanguage);
  const [activeSubject, setActiveSubject] = useState<SubjectId>(selectedSubject);

  const strings = LOCALIZED_STRINGS[activeLang] || LOCALIZED_STRINGS.mr;

  const handleLanguageChange = (lang: Language) => {
    setActiveLang(lang);
    onSelectLanguage(lang);
  };

  const handleContinue = () => {
    onSelectLanguage(activeLang);
    onSelectSubject(activeSubject);
    onContinue();
  };

  const quickActions = [
    { id: 'lesson', label: strings.exploreLessons, icon: 'school', color: 'from-cyan-500 to-teal-400', view: 'learn_lesson' as ViewMode },
    { id: 'vocab', label: strings.vocabularyBridge, icon: 'auto_stories', color: 'from-purple-500 to-pink-500', view: 'learn_vocab' as ViewMode },
    { id: 'voice', label: strings.talkToSynexa, icon: 'mic', color: 'from-orange-500 to-amber-500', view: 'talk_to_synexa' as ViewMode },
    { id: 'quiz', label: strings.practiceQuiz, icon: 'quiz', color: 'from-emerald-500 to-teal-500', view: 'practice_quiz' as ViewMode },
  ];

  return (
    <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-8 pt-6 pb-32 space-y-8">
      {/* Welcome Banner with Girl Greeting Mascot */}
      <div className="bg-gradient-to-r from-[#17223B] via-[#101b33] to-[#0B132B] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="flex items-start sm:items-center gap-4 relative z-10">
          {/* Girl Mascot Avatar */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-lg shadow-cyan-500/20 bg-slate-900">
              <img
                src={ASSET_IMAGES.studentIllustration}
                alt="Synexa Mascot"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -bottom-2 -right-2 bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full border border-slate-900 shadow">
              AI Tutor
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="bg-cyan-500/20 text-cyan-300 text-xs font-black px-3 py-1 rounded-full border border-cyan-500/30 flex items-center gap-1.5">
                <span className="text-amber-300 font-extrabold text-sm">{strings.girlGreeting}</span>
                <span>👋</span>
              </span>
              <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/30">
                🔥 {userStats.streak} Day Streak
              </span>
            </div>
            <h2 className="font-extrabold text-xl sm:text-3xl text-white tracking-tight">
              {strings.girlWelcomeMessage}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              {activeLang === 'mr'
                ? 'मातृभाषेत शिका आणि आत्मविश्वास वाढवा.'
                : activeLang === 'hi'
                ? 'अपनी भाषा में सीखें और आत्मविश्वास बढ़ाएं।'
                : activeLang === 'gu'
                ? 'તમારી માતૃભાષામાં શીખો અને આત્મવિશ્વાસ વધારો.'
                : activeLang === 'ta'
                ? 'உங்கள் தாய்மொழியில் கற்று தன்னம்பிக்கையை வளர்க்கவும்.'
                : 'Learn in your mother tongue and grow into English with confidence.'}
            </p>
          </div>
        </div>

        {/* Quick Resume Button */}
        <button
          onClick={handleContinue}
          className="bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 text-slate-950 font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-lg shadow-cyan-500/25 active:scale-95 transition-all flex items-center gap-2 shrink-0 relative z-10 cursor-pointer"
        >
          <span>
            {strings.exploreLessons} ({activeSubject === 'math' ? (strings.math || 'Math') : activeSubject === 'social_studies' ? (strings.socialStudies || 'Social Studies') : (strings.science || 'Science')})
          </span>
          <span className="material-symbols-outlined text-lg">arrow_forward</span>
        </button>
      </div>

      {/* Quick Actions Bar */}
      <section className="space-y-3">
        <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <span className="material-symbols-outlined text-cyan-400 text-base">bolt</span>
          <span>Quick Shortcuts</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {quickActions.map((qa) => (
            <button
              key={qa.id}
              onClick={() => onNavigate(qa.view)}
              className="cream-card p-4 flex flex-col items-start gap-3 interactive-lift group text-left cursor-pointer"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${qa.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-xl">{qa.icon}</span>
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 group-hover:text-cyan-700 transition-colors">
                  {qa.label}
                </h4>
                <span className="text-[11px] font-semibold text-slate-500">Start →</span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Daily Challenge Card */}
      <section className="bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-transparent border border-orange-500/30 rounded-3xl p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-md shadow-orange-500/30 shrink-0">
            <span className="material-symbols-outlined text-2xl animate-bounce">emoji_events</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-wider font-extrabold bg-orange-500/20 text-orange-300 px-2.5 py-0.5 rounded-full border border-orange-500/30">
                Daily Goal • +{DAILY_CHALLENGE.xpReward} XP
              </span>
              <span className="text-xs text-slate-300">⏱ ~{DAILY_CHALLENGE.estimatedMinutes} mins</span>
            </div>
            <h3 className="font-extrabold text-lg text-white">
              {activeLang === 'mr'
                ? DAILY_CHALLENGE.titleMarathi
                : activeLang === 'hi'
                ? 'आज का विज्ञान और शब्दावली चैलेंज'
                : activeLang === 'gu'
                ? 'આજનો વિજ્ઞાન અને શબ્દભંડોળ ચેલેન્જ'
                : activeLang === 'ta'
                ? 'இன்றைய அறிவியல் சவால்'
                : DAILY_CHALLENGE.titleEnglish}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5 max-w-xl">
              {activeLang === 'mr'
                ? DAILY_CHALLENGE.descriptionMarathi
                : activeLang === 'hi'
                ? 'अपनी 5 दिनों की स्ट्रीक बनाए रखने के लिए 5 त्वरित प्रश्नों के उत्तर दें!'
                : activeLang === 'gu'
                ? 'તમારો 5 દિવસનો સ્ટ્રીક જાળવી રાખવા માટે 5 ઝડપી પ્રશ્નોના ઉત્તર આપો!'
                : activeLang === 'ta'
                ? 'உங்கள் தொடர்ச்சியைத் தக்கவைக்க 5 கேள்விகளுக்குப் பதிலளிக்கவும்!'
                : DAILY_CHALLENGE.descriptionEnglish}
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('practice_quiz')}
          className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs px-5 py-3 rounded-xl transition-all shadow-md shadow-orange-500/20 active:scale-95 shrink-0 cursor-pointer"
        >
          Start Daily Challenge
        </button>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Language Selection (5 supported languages grid) */}
        <section className="md:col-span-5 space-y-4">
          <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-cyan-400">translate</span>
            <span>Mother Tongue / भाषा</span>
          </h3>

          <div className="space-y-2.5">
            {SUPPORTED_LANGUAGES.map((langOpt) => {
              const isSelected = activeLang === langOpt.code;
              return (
                <button
                  key={langOpt.code}
                  onClick={() => handleLanguageChange(langOpt.code)}
                  className={`w-full p-3.5 rounded-2xl border transition-all text-left flex items-center justify-between interactive-lift cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-950/80 to-[#17223B] border-cyan-400 text-white shadow-lg shadow-cyan-950/50'
                      : 'bg-[#17223B] border-white/10 text-slate-300 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base ${
                      isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-white/10 text-slate-300'
                    }`}>
                      {langOpt.flag}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-white">{langOpt.nativeName}</h4>
                      <p className="text-[11px] text-cyan-300 font-medium">{langOpt.englishName}</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    isSelected ? 'bg-cyan-400 text-slate-950' : 'border border-slate-600'
                  }`}>
                    {isSelected && <span className="material-symbols-outlined text-xs font-bold">check</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Subject Selection (7 cols) */}
        <section className="md:col-span-7 space-y-4">
          <h3 className="font-extrabold text-lg text-white flex items-center gap-2">
            <span className="material-symbols-outlined text-teal-400">category</span>
            <span>{strings.selectSubject}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Science */}
            <button
              onClick={() => {
                setActiveSubject('science');
                onSelectSubject('science');
              }}
              className={`p-5 rounded-2xl border transition-all flex flex-col items-center text-center gap-3 interactive-lift cursor-pointer ${
                activeSubject === 'science'
                  ? 'cream-card border-cyan-400 ring-2 ring-cyan-400/50'
                  : 'bg-[#17223B] border-white/10 text-slate-300 hover:border-white/20'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md ${
                activeSubject === 'science' ? 'bg-cyan-500 text-slate-950' : 'bg-white/10 text-cyan-400'
              }`}>
                <span className="material-symbols-outlined text-3xl">science</span>
              </div>
              <div>
                <h4 className={`font-extrabold text-base ${activeSubject === 'science' ? 'text-slate-900' : 'text-white'}`}>
                  {strings.science}
                </h4>
                <p className={`text-xs font-semibold ${activeSubject === 'science' ? 'text-cyan-800' : 'text-slate-400'}`}>
                  Science (85% Mastered)
                </p>
              </div>
            </button>

            {/* Math */}
            <button
              onClick={() => {
                setActiveSubject('math');
                onSelectSubject('math');
              }}
              className={`p-5 rounded-2xl border transition-all flex flex-col items-center text-center gap-3 interactive-lift cursor-pointer ${
                activeSubject === 'math'
                  ? 'cream-card border-cyan-400 ring-2 ring-cyan-400/50'
                  : 'bg-[#17223B] border-white/10 text-slate-300 hover:border-white/20'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md ${
                activeSubject === 'math' ? 'bg-purple-500 text-white' : 'bg-white/10 text-purple-400'
              }`}>
                <span className="material-symbols-outlined text-3xl">functions</span>
              </div>
              <div>
                <h4 className={`font-extrabold text-base ${activeSubject === 'math' ? 'text-slate-900' : 'text-white'}`}>
                  {strings.math}
                </h4>
                <p className={`text-xs font-semibold ${activeSubject === 'math' ? 'text-purple-800' : 'text-slate-400'}`}>
                  Math (62% Mastered)
                </p>
              </div>
            </button>

            {/* Social Studies */}
            <button
              onClick={() => {
                setActiveSubject('social_studies');
                onSelectSubject('social_studies');
              }}
              className={`p-5 rounded-2xl border transition-all flex flex-col items-center text-center gap-3 interactive-lift cursor-pointer ${
                activeSubject === 'social_studies'
                  ? 'cream-card border-cyan-400 ring-2 ring-cyan-400/50'
                  : 'bg-[#17223B] border-white/10 text-slate-300 hover:border-white/20'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-md ${
                activeSubject === 'social_studies' ? 'bg-teal-500 text-slate-950' : 'bg-white/10 text-teal-400'
              }`}>
                <span className="material-symbols-outlined text-3xl">public</span>
              </div>
              <div>
                <h4 className={`font-extrabold text-base ${activeSubject === 'social_studies' ? 'text-slate-900' : 'text-white'}`}>
                  {strings.socialStudies}
                </h4>
                <p className={`text-xs font-semibold ${activeSubject === 'social_studies' ? 'text-teal-800' : 'text-slate-400'}`}>
                  Social Studies (90%)
                </p>
              </div>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};

