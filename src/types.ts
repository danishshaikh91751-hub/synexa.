export type Language =
  | 'mr' // Marathi 🇮🇳
  | 'hi' // Hindi 🇮🇳
  | 'en' // English GB 🇬🇧
  | 'gu' // Gujarati 🇮🇳
  | 'ta'; // Tamil 🇮🇳

export type Theme = 'dark' | 'light';

export type SubjectId = 'science' | 'math' | 'social_studies';

export type ViewMode =
  | 'landing'
  | 'select'
  | 'learn_lesson'
  | 'learn_vocab'
  | 'record_explanation'
  | 'explanation_feedback'
  | 'practice_quiz'
  | 'progress_dashboard'
  | 'talk_to_synexa'
  | 'snap_and_learn'
  | 'ai_doubt_solver';

export type SnapExplanationMode =
  | 'simple'
  | 'step_by_step'
  | 'real_life'
  | 'story'
  | 'exam_answer';

export interface LanguageOption {
  code: Language;
  nativeName: string;
  englishName: string;
  flag: string;
}

export interface AcademicTerm {
  id: string;
  englishTerm: string;
  motherTongueTerm: string;
  motherTongueMeaning: string;
  pronunciation: string;
}

export interface MotherTongueBridge {
  conceptEnglish: string;
  motherTongueTerm: string;
  motherTongueExplanation: string;
  englishTerminology: string;
  pronunciation: string;
  examReadyEnglishAnswer: string;
  academicTerms?: AcademicTerm[];
}

export interface Subject {
  id: SubjectId;
  nameMarathi: string;
  nameEnglish: string;
  icon: string;
}

export interface VocabularyTerm {
  id: string;
  termMarathi: string;
  termEnglish: string;
  exampleEnglish: string;
  exampleMarathi?: string;
  category?: string;
  mastered?: boolean;
  bridge?: MotherTongueBridge;
}

export interface QuizQuestion {
  id: string;
  topic: string;
  questionNumber: number;
  totalQuestions: number;
  questionMarathi: string;
  questionEnglish: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    labelMarathi: string;
    labelEnglish: string;
  }[];
  correctKey: 'A' | 'B' | 'C' | 'D';
  explanationMarathi: string;
  explanationEnglish: string;
}

export interface EvaluationResult {
  understandingPercentage: number;
  titleMarathi: string;
  titleEnglish: string;
  whatYouGotRight: string[];
  whatYouMissed: string[];
  focusArea: string;
  examReadyEnglishAnswer?: string;
  userExplanationText?: string;
}

export interface WeakTopic {
  id: string;
  nameEnglish: string;
  nameMarathi: string;
  subject: SubjectId;
  accuracy: number;
  icon: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  questionsRemaining?: number;
  totalQuestions?: number;
  progressPercent?: number;
}

export interface SubjectMastery {
  subjectId: SubjectId;
  nameEnglish: string;
  nameMarathi: string;
  icon: string;
  percentage: number;
  isVerified?: boolean;
  accuracy: number;
  questionsAttempted: number;
  correctAnswers: number;
  timeSpentMinutes: number;
  improvementPercentage: number;
  currentStreak: number;
  lastPracticed: string;
  topicsMastered: string[];
  topicsInProgress: string[];
  weakTopicsList: string[];
  recentQuizScores: number[];
  recommendedNextLesson: {
    titleEnglish: string;
    titleMarathi: string;
    durationMinutes: number;
  };
}

export interface UserStats {
  xp: number;
  streak: number;
  level: number;
  nextLevelXp: number;
  questionsSolved: number;
  accuracyRate: number;
  timeSpentHours: number;
  badges: AchievementBadge[];
}

export interface AchievementBadge {
  id: string;
  titleEnglish: string;
  titleMarathi: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  category: 'streak' | 'questions' | 'subject' | 'vocab' | 'voice';
  progress: number; // 0 to 100
}

export interface AIRecommendation {
  id: string;
  titleEnglish: string;
  titleMarathi: string;
  subject: SubjectId;
  reasonEnglish: string;
  reasonMarathi: string;
  estimatedMinutes: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  targetView: ViewMode;
  icon: string;
}

export interface DailyChallenge {
  id: string;
  titleEnglish: string;
  titleMarathi: string;
  descriptionEnglish: string;
  descriptionMarathi: string;
  xpReward: number;
  questionsCount: number;
  estimatedMinutes: number;
  isCompleted: boolean;
}

export interface NotificationItem {
  id: string;
  titleEnglish: string;
  titleMarathi: string;
  descriptionEnglish: string;
  timeAgo: string;
  read: boolean;
  type: 'streak' | 'achievement' | 'recommendation' | 'reminder';
}

export interface DailyActivity {
  dayMarathi: string;
  dayEnglish: string;
  questions: number;
  minutes: number;
  accuracy: number;
  isToday?: boolean;
}

