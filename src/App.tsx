import React, { useState, useEffect } from 'react';
import { ViewMode, Language, SubjectId, EvaluationResult, UserStats } from './types';
import { INITIAL_USER_STATS } from './data/mockData';
import { Header } from './components/Header';
import { BottomNavBar } from './components/BottomNavBar';
import { DesktopSidebar } from './components/DesktopSidebar';
import { LandingScreen } from './components/LandingScreen';
import { SelectScreen } from './components/SelectScreen';
import { LessonScreen } from './components/LessonScreen';
import { VoiceRecordScreen } from './components/VoiceRecordScreen';
import { FeedbackScreen } from './components/FeedbackScreen';
import { QuizScreen } from './components/QuizScreen';
import { ProgressScreen } from './components/ProgressScreen';
import { VocabularyScreen } from './components/VocabularyScreen';
import { TalkToSynexaScreen } from './components/TalkToSynexaScreen';
import { SnapAndLearnScreen } from './components/SnapAndLearnScreen';
import { DoubtSolverScreen } from './components/DoubtSolverScreen';
import { saveUserProfileToSupabase } from './lib/supabase';

export default function App() {
  const [view, setView] = useState<ViewMode>('landing');
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('synexa_language');
    if (saved && ['mr', 'hi', 'en', 'gu', 'ta'].includes(saved)) {
      return saved as Language;
    }
    return 'mr';
  });
  const [isSimpleMode, setIsSimpleMode] = useState<boolean>(false);
  const [subject, setSubject] = useState<SubjectId>('science');
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [userStats, setUserStats] = useState<UserStats>(INITIAL_USER_STATS);

  const toggleLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('synexa_language', lang);
    saveUserProfileToSupabase({
      selected_language: lang,
      selected_subject: subject,
      streak: userStats.streak,
      xp: userStats.xp,
      level: userStats.level,
      questions_solved: userStats.questionsSolved,
      accuracy_rate: userStats.accuracyRate,
    });
  };

  const handleVoiceEvaluated = (result: EvaluationResult) => {
    setEvaluation(result);
    setUserStats((prev) => ({
      ...prev,
      xp: prev.xp + 50,
    }));
  };

  const handleQuizCompleted = (correctCount: number, totalQuestions: number, xpEarned: number) => {
    setUserStats((prev) => {
      const newXp = prev.xp + xpEarned;
      const newSolved = prev.questionsSolved + totalQuestions;
      const calcAcc = Math.round(
        (prev.accuracyRate * prev.questionsSolved + (correctCount / totalQuestions) * 100 * totalQuestions) / newSolved
      );
      return {
        ...prev,
        xp: newXp,
        questionsSolved: newSolved,
        accuracyRate: Math.min(100, Math.max(0, calcAcc)),
        level: Math.floor(newXp / 200) + 1,
      };
    });
  };

  const hasSidebar = view !== 'landing' && view !== 'record_explanation';

  return (
    <div className="min-h-screen bg-[#070b19] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Header Bar */}
      <Header
        currentView={view}
        onNavigate={setView}
        language={language}
        onToggleLanguage={toggleLanguage}
        isSimpleMode={isSimpleMode}
        onToggleSimpleMode={setIsSimpleMode}
        showClose={view === 'record_explanation' || view === 'explanation_feedback'}
      />

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col transition-all ${hasSidebar ? 'md:pl-64' : ''}`}>
        {view === 'landing' && (
          <LandingScreen onStart={() => setView('select')} />
        )}

        {view === 'select' && (
          <SelectScreen
            selectedLanguage={language}
            onSelectLanguage={toggleLanguage}
            selectedSubject={subject}
            onSelectSubject={setSubject}
            onContinue={() => setView('learn_lesson')}
            onNavigate={setView}
            userStats={userStats}
          />
        )}

        {view === 'talk_to_synexa' && (
          <TalkToSynexaScreen
            language={language}
            subject={subject}
            isSimpleMode={isSimpleMode}
            onNavigate={setView}
          />
        )}

        {view === 'snap_and_learn' && (
          <SnapAndLearnScreen
            language={language}
            subject={subject}
            isSimpleMode={isSimpleMode}
            onNavigate={setView}
          />
        )}

        {view === 'ai_doubt_solver' && (
          <DoubtSolverScreen
            language={language}
            subject={subject}
            isSimpleMode={isSimpleMode}
            onNavigate={setView}
          />
        )}

        {view === 'learn_lesson' && (
          <LessonScreen
            language={language}
            subject={subject}
            onToggleLanguage={toggleLanguage}
            onNavigate={setView}
          />
        )}

        {view === 'record_explanation' && (
          <VoiceRecordScreen
            language={language}
            subject={subject}
            onNavigate={setView}
            onEvaluated={handleVoiceEvaluated}
          />
        )}

        {view === 'explanation_feedback' && (
          <FeedbackScreen
            evaluation={evaluation}
            language={language}
            onNavigate={setView}
          />
        )}

        {view === 'practice_quiz' && (
          <QuizScreen
            language={language}
            subject={subject}
            isSimpleMode={isSimpleMode}
            evaluation={evaluation}
            onNavigate={setView}
            onQuizCompleted={handleQuizCompleted}
          />
        )}

        {view === 'progress_dashboard' && (
          <ProgressScreen
            language={language}
            onToggleLanguage={toggleLanguage}
            onNavigate={setView}
            userStats={userStats}
          />
        )}

        {view === 'learn_vocab' && (
          <VocabularyScreen
            language={language}
            subject={subject}
            onToggleLanguage={toggleLanguage}
            onNavigate={setView}
          />
        )}
      </div>

      {/* Navigation Shells */}
      <DesktopSidebar currentView={view} onNavigate={setView} language={language} userStats={userStats} />
      <BottomNavBar currentView={view} onNavigate={setView} language={language} />
    </div>
  );
}
