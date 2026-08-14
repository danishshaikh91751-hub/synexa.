import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ViewMode, Language, UserStats, SubjectMastery } from '../types';
import { WEAK_TOPICS, SUBJECT_MASTERY, WEEKLY_ACTIVITIES, AI_RECOMMENDATIONS } from '../data/mockData';

interface ProgressScreenProps {
  language: Language;
  onToggleLanguage: (lang: Language) => void;
  onNavigate: (view: ViewMode) => void;
  userStats: UserStats;
}

export const ProgressScreen: React.FC<ProgressScreenProps> = ({
  language,
  onToggleLanguage,
  onNavigate,
  userStats,
}) => {
  const [expandedSubject, setExpandedSubject] = useState<string | null>('science');
  const [selectedDay, setSelectedDay] = useState<number>(5); // Sat is index 5
  const [badgeFilter, setBadgeFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

  const activeDayActivity = WEEKLY_ACTIVITIES[selectedDay];

  const triggerCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const filteredBadges = userStats.badges.filter((b) => {
    if (badgeFilter === 'unlocked') return b.unlocked;
    if (badgeFilter === 'locked') return !b.unlocked;
    return true;
  });

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 pb-32 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#17223B] p-6 sm:p-8 rounded-3xl border border-white/10 shadow-xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-cyan-500/20 text-cyan-300 font-extrabold text-xs px-3 py-1 rounded-full border border-cyan-500/30">
              Grade 7 Scholar Command Center
            </span>
            <span className="bg-amber-500/20 text-amber-300 font-extrabold text-xs px-3 py-1 rounded-full border border-amber-500/30">
              🔥 {userStats.streak} Day Streak
            </span>
          </div>
          <h1 className="font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            {language === 'mr' ? 'माझी प्रगती (Analytics Dashboard)' : 'Learning Analytics & Mastery'}
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-xl">
            Real-time cognitive progress, subject accuracy rates, and AI-curated practice recommendations.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('talk_to_synexa')}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-3 py-2.5 rounded-2xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95 flex items-center justify-center gap-1.5 text-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">record_voice_over</span>
            <span>Talk to Synexa</span>
          </button>
          <button
            onClick={() => onNavigate('snap_and_learn')}
            className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-3 py-2.5 rounded-2xl transition-all shadow-lg shadow-teal-500/20 active:scale-95 flex items-center justify-center gap-1.5 text-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">add_a_photo</span>
            <span>Snap & Learn</span>
          </button>
          <button
            onClick={triggerCelebration}
            className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-3 py-2.5 rounded-2xl transition-all shadow-lg shadow-orange-500/25 active:scale-95 flex items-center justify-center gap-1.5 text-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">celebration</span>
            <span>Celebrate</span>
          </button>
        </div>
      </div>

      {/* Top Key Metrics Banner (4 Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total XP */}
        <div className="cream-card p-5 flex items-center justify-between interactive-lift">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total XP Gained</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">{userStats.xp} XP</h2>
            <p className="text-[11px] font-semibold text-cyan-700 mt-0.5">Level {userStats.level} Scholar</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 text-cyan-600 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl font-bold">bolt</span>
          </div>
        </div>

        {/* Questions Solved */}
        <div className="cream-card p-5 flex items-center justify-between interactive-lift">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Questions Solved</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">{userStats.questionsSolved}</h2>
            <p className="text-[11px] font-semibold text-teal-700 mt-0.5">+18 this week</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-teal-500/15 text-teal-600 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl font-bold">task_alt</span>
          </div>
        </div>

        {/* Accuracy Rate */}
        <div className="cream-card p-5 flex items-center justify-between interactive-lift">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Accuracy Rate</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">{userStats.accuracyRate}%</h2>
            <p className="text-[11px] font-semibold text-emerald-700 mt-0.5">Top 10% in Class</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl font-bold">analytics</span>
          </div>
        </div>

        {/* Time Spent */}
        <div className="cream-card p-5 flex items-center justify-between interactive-lift">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Learning Time</span>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-1">{userStats.timeSpentHours}h</h2>
            <p className="text-[11px] font-semibold text-purple-700 mt-0.5">Active this week</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/15 text-purple-600 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl font-bold">timer</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
        {/* Left Column (8 cols): Activity Chart, Needs Attention, AI Recommendations */}
        <div className="lg:col-span-8 space-y-6 sm:space-y-8">
          {/* Interactive Weekly Activity Chart Card */}
          <section className="cream-card p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-orange-500">local_fire_department</span>
                  <span>Weekly Study Engagement</span>
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">Click any day to view detailed practice stats</p>
              </div>
              <span className="text-xs font-extrabold bg-orange-500/10 text-orange-600 px-3 py-1.5 rounded-full border border-orange-500/20 self-start sm:self-auto">
                🔥 5 Consecutive Days!
              </span>
            </div>

            {/* Faux Interactive Bar Chart */}
            <div className="flex items-end justify-between h-44 pt-6 pb-2 px-2 border-b border-slate-200">
              {WEEKLY_ACTIVITIES.map((act, idx) => {
                const isSelected = selectedDay === idx;
                const heightPercent = Math.max(15, (act.minutes / 35) * 100);

                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedDay(idx)}
                    className="flex flex-col items-center gap-2 flex-1 cursor-pointer group"
                  >
                    <div className="w-full max-w-[32px] bg-slate-100 rounded-t-xl h-full flex items-end justify-center p-1 relative">
                      <div
                        className={`w-full rounded-t-lg transition-all duration-300 ${
                          isSelected
                            ? 'bg-gradient-to-t from-cyan-600 to-teal-400 shadow-lg shadow-cyan-500/30'
                            : act.isToday
                            ? 'bg-orange-500'
                            : 'bg-slate-300 group-hover:bg-cyan-500/60'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span
                      className={`text-xs font-bold transition-colors ${
                        isSelected ? 'text-cyan-700' : 'text-slate-500'
                      }`}
                    >
                      {language === 'mr' ? act.dayMarathi : act.dayEnglish}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Selected Day Stats Detail Card */}
            {activeDayActivity && (
              <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                    {activeDayActivity.dayEnglish}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">
                      {activeDayActivity.dayEnglish} Activity Overview
                    </h4>
                    <p className="text-xs text-slate-300">
                      {activeDayActivity.questions > 0
                        ? `Solved ${activeDayActivity.questions} questions in ${activeDayActivity.minutes} mins`
                        : 'Rest day — no practice logged'}
                    </p>
                  </div>
                </div>

                {activeDayActivity.questions > 0 && (
                  <div className="flex items-center gap-4 text-xs font-bold">
                    <span className="bg-teal-500/20 text-teal-300 px-3 py-1 rounded-full border border-teal-500/30">
                      Accuracy: {activeDayActivity.accuracy}%
                    </span>
                    <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30">
                      ⏱ {activeDayActivity.minutes} mins
                    </span>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* AI Recommendations Section */}
          <section className="bg-gradient-to-br from-[#17223B] to-[#0d1527] border border-cyan-500/30 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xl">auto_awesome</span>
                </div>
                <div>
                  <h2 className="font-extrabold text-lg text-white">Synexa AI Recommendations</h2>
                  <p className="text-xs text-slate-300">Personalized adaptive suggestions for maximum growth</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {AI_RECOMMENDATIONS.map((rec) => (
                <div
                  key={rec.id}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 p-4 rounded-2xl transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-xl">{rec.icon}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                          {rec.subject}
                        </span>
                        <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">
                          ⏱ {rec.estimatedMinutes} mins • {rec.difficulty}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-white mt-1 group-hover:text-cyan-300 transition-colors">
                        {language === 'mr' ? rec.titleMarathi : rec.titleEnglish}
                      </h4>
                      <p className="text-xs text-slate-300 mt-0.5">
                        {language === 'mr' ? rec.reasonMarathi : rec.reasonEnglish}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate(rec.targetView)}
                    className="self-end sm:self-center bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl transition-all active:scale-95 shrink-0 shadow-md shadow-cyan-500/20 flex items-center gap-1.5"
                  >
                    <span>Start Practice</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Needs Attention Section */}
          <section className="cream-card p-6 sm:p-8 space-y-4 border-l-8 border-l-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-extrabold text-xl text-slate-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-orange-500">warning</span>
                  <span>Needs Attention</span>
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">Topics with accuracy below 70% that need reinforcement</p>
              </div>
            </div>

            <div className="space-y-3">
              {WEAK_TOPICS.map((topic) => (
                <div
                  key={topic.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-orange-300 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-2xl">{topic.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">
                        {topic.nameEnglish} ({topic.nameMarathi})
                      </h4>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs font-extrabold text-orange-600">
                          Accuracy: {topic.accuracy}%
                        </span>
                        <span className="text-xs text-slate-500">
                          {topic.questionsRemaining} practice questions remaining
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onNavigate('practice_quiz')}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <span className="material-symbols-outlined text-sm">replay</span>
                    <span>पुन्हा सराव (Re-Practice)</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column (4 cols): Subject Mastery & Badges Grid */}
        <div className="lg:col-span-4 space-y-6 sm:space-y-8">
          {/* Subject Mastery Expansion Panels */}
          <section className="cream-card p-6 space-y-4">
            <h2 className="font-extrabold text-xl text-slate-900">Subject Mastery</h2>

            <div className="space-y-3">
              {SUBJECT_MASTERY.map((sub) => {
                const isExpanded = expandedSubject === sub.subjectId;

                return (
                  <div
                    key={sub.subjectId}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
                  >
                    <div
                      onClick={() => setExpandedSubject(isExpanded ? null : sub.subjectId)}
                      className="p-4 cursor-pointer flex items-center justify-between hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 text-cyan-700 flex items-center justify-center">
                          <span className="material-symbols-outlined text-xl">{sub.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{sub.nameEnglish}</h4>
                          <span className="text-xs text-slate-500">{sub.accuracy}% Accuracy</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-200">
                          {sub.percentage}%
                        </span>
                        <span className="material-symbols-outlined text-slate-400 text-lg">
                          {isExpanded ? 'expand_less' : 'expand_more'}
                        </span>
                      </div>
                    </div>

                    {/* Expanded Detail Panel */}
                    {isExpanded && (
                      <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-3 text-xs animate-in fade-in duration-200">
                        <div className="grid grid-cols-2 gap-2 text-slate-700">
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Questions</span>
                            <span className="font-bold text-slate-900 text-sm">{sub.correctAnswers} / {sub.questionsAttempted}</span>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                            <span className="text-[10px] uppercase font-bold text-slate-400 block">Time Spent</span>
                            <span className="font-bold text-slate-900 text-sm">{sub.timeSpentMinutes} mins</span>
                          </div>
                        </div>

                        <div>
                          <span className="font-bold text-slate-700 block mb-1">Topics Mastered:</span>
                          <div className="flex flex-wrap gap-1">
                            {sub.topicsMastered.map((t, i) => (
                              <span key={i} className="bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded text-[10px]">
                                ✓ {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
                          <span className="text-[11px] text-slate-500">Last practiced {sub.lastPracticed}</span>
                          <button
                            onClick={() => onNavigate('learn_lesson')}
                            className="text-xs font-bold text-cyan-700 hover:text-cyan-800 underline"
                          >
                            Next Lesson →
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Achievements & Badges Grid */}
          <section className="cream-card p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold text-xl text-slate-900">Milestones & Badges</h2>
              <div className="flex gap-1 bg-slate-200 p-1 rounded-xl text-[10px] font-bold">
                {(['all', 'unlocked', 'locked'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setBadgeFilter(filter)}
                    className={`px-2 py-1 rounded-lg capitalize transition-colors ${
                      badgeFilter === filter ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {filteredBadges.map((badge) => (
                <div
                  key={badge.id}
                  onClick={() => {
                    if (badge.unlocked) triggerCelebration();
                  }}
                  className={`p-4 rounded-2xl border flex flex-col items-center text-center gap-2 cursor-pointer transition-all ${
                    badge.unlocked
                      ? 'bg-white border-amber-300 shadow-sm hover:scale-105'
                      : 'bg-slate-100 border-slate-200 opacity-60'
                  }`}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
                      badge.unlocked
                        ? 'bg-gradient-to-tr from-amber-400 to-orange-400 text-white shadow-md shadow-orange-500/20'
                        : 'bg-slate-200 text-slate-400'
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl">{badge.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 line-clamp-1">
                      {language === 'mr' ? badge.titleMarathi : badge.titleEnglish}
                    </h4>
                    <p className="text-[10px] text-slate-500 line-clamp-2 mt-0.5">{badge.description}</p>
                  </div>
                  {badge.unlocked ? (
                    <span className="text-[9px] font-extrabold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full mt-1">
                      Unlocked ✓
                    </span>
                  ) : (
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                      <div className="bg-cyan-500 h-full" style={{ width: `${badge.progress}%` }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

