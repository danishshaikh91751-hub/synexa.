import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { QuizQuestion, ViewMode, Language, EvaluationResult, SubjectId } from '../types';
import { getDefaultQuizQuestions } from '../utils/quizHelper';
import { speakText } from '../utils/speech';

interface QuizScreenProps {
  language: Language;
  subject?: SubjectId;
  isSimpleMode: boolean;
  evaluation?: EvaluationResult | null;
  onNavigate: (view: ViewMode) => void;
  onQuizCompleted?: (score: number, totalQuestions: number, xpEarned: number) => void;
}

const QUIZ_STRINGS: Record<Language, {
  completeTitle: string;
  completeSubtext: string;
  score: string;
  accuracy: string;
  xpEarned: string;
  recommendedRevision: string;
  revisionSubtext: string;
  reviewHeader: string;
  correct: string;
  incorrect: string;
  explanation: string;
  viewDashboard: string;
  conceptCheck: string;
  generateGemini: string;
  generating: string;
  skipQuestion: string;
  checkAnswer: string;
  nextQuestion: string;
  questionOf: (curr: number, total: number) => string;
}> = {
  mr: {
    completeTitle: 'प्रश्नमंजुषा सराव पूर्ण झाला!',
    completeSubtext: 'अभ्यासातील संकल्पना आत्मसात केल्याबद्दल अभिनंदन.',
    score: 'गुण (Score)',
    accuracy: 'अचूकता (Accuracy)',
    xpEarned: 'मिळालेले XP',
    recommendedRevision: 'पुनरावृत्तीची शिफारस',
    revisionSubtext: 'या संकल्पनेचा पुन्हा सराव केल्यास परीक्षेत पूर्ण गुण मिळण्यास मदत होईल.',
    reviewHeader: 'प्रश्न पुनरावलोकन आणि स्पष्टीकरणे',
    correct: 'बरोबर ✓',
    incorrect: 'चुकीचे ✗',
    explanation: 'स्पष्टीकरण:',
    viewDashboard: 'प्रगती डॅशबोर्ड पहा',
    conceptCheck: 'संकल्पना तपासणी (मराठी)',
    generateGemini: 'नवीन AI प्रश्नमंजुषा तयार करा',
    generating: 'तयार होत आहे...',
    skipQuestion: 'प्रश्न सोडा',
    checkAnswer: 'उत्तर तपासा',
    nextQuestion: 'पुढील प्रश्न',
    questionOf: (curr, total) => `प्रश्न ${curr} / ${total}`,
  },
  hi: {
    completeTitle: 'क्विज़ अभ्यास पूर्ण हुआ!',
    completeSubtext: 'पाठ की अवधारणाओं को मजबूत करने के लिए बहुत बढ़िया काम।',
    score: 'अंक (Score)',
    accuracy: 'सटीकता (Accuracy)',
    xpEarned: 'अर्जित XP',
    recommendedRevision: 'अनुशंसित पुनरीक्षण',
    revisionSubtext: 'इस विषय का पुनरीक्षण करने से आगामी परीक्षा में अच्छे अंक मिलेंगे।',
    reviewHeader: 'प्रश्न समीक्षा और स्पष्टीकरण',
    correct: 'सही ✓',
    incorrect: 'गलत ✗',
    explanation: 'स्पष्टीकरण:',
    viewDashboard: 'प्रगति डैशबोर्ड देखें',
    conceptCheck: 'अवधारणा जांच (हिंदी)',
    generateGemini: 'नया AI क्विज़ जनरेट करें',
    generating: 'जनरेट हो रहा है...',
    skipQuestion: 'प्रश्न छोड़ें',
    checkAnswer: 'उत्तर जांचें',
    nextQuestion: 'अगला प्रश्न',
    questionOf: (curr, total) => `प्रश्न ${curr} / ${total}`,
  },
  gu: {
    completeTitle: 'ક્વિઝ પ્રેક્ટિસ પૂર્ણ થઈ!',
    completeSubtext: 'ખ્યાલોને મજબૂત કરવા બદલ ખૂબ ખૂબ અભિનંદન.',
    score: 'ગુણ (Score)',
    accuracy: 'ચોકસાઈ (Accuracy)',
    xpEarned: 'મેળવેલ XP',
    recommendedRevision: 'ભલામણ કરેલ પુનરાવર્તન',
    revisionSubtext: 'આ ખ્યાલનું પુનરાવર્તન કરવાથી તમને આગામી પરીક્ષામાં મદદ મળશે.',
    reviewHeader: 'પ્રશ્ન સમીક્ષા અને સ્પષ્ટીકરણો',
    correct: 'સાચું ✓',
    incorrect: 'ખોટું ✗',
    explanation: 'સ્પષ્ટીકરણ:',
    viewDashboard: 'પ્રગતિ ડેશબોર્ડ જુઓ',
    conceptCheck: 'ખ્યાલ ચકાસણી (ગુજરાતી)',
    generateGemini: 'નવું AI ક્વિઝ બનાવો',
    generating: 'બની રહ્યું છે...',
    skipQuestion: 'પ્રશ્ન છોડો',
    checkAnswer: 'જવાબ ચકાસો',
    nextQuestion: 'આગળનો પ્રશ્ન',
    questionOf: (curr, total) => `પ્રશ્ન ${curr} / ${total}`,
  },
  ta: {
    completeTitle: 'வினாடி வினா பயிற்சி முடிந்தது!',
    completeSubtext: 'பாடக் கருத்துக்களை வலுப்படுத்தியதற்கு வாழ்த்துகள்.',
    score: 'மதிப்பெண் (Score)',
    accuracy: 'துல்லியம் (Accuracy)',
    xpEarned: 'பெற்ற XP',
    recommendedRevision: 'பரிந்துரைக்கப்பட்ட திருத்தம்',
    revisionSubtext: 'இந்த தலைப்பை மீண்டும் மதிப்பாய்வு செய்வது தேர்வில் சிறந்த மதிப்பெண்களைப் பெற உதவும்.',
    reviewHeader: 'கேள்வி மதிப்பாய்வு & விளக்கங்கள்',
    correct: 'சரி ✓',
    incorrect: 'தவறு ✗',
    explanation: 'விளக்கம்:',
    viewDashboard: 'முன்னேற்றப் பலகையைப் பார்',
    conceptCheck: 'கருத்து சோதனை (தமிழ்)',
    generateGemini: 'புதிய AI வினாடி வினா உருவாக்கு',
    generating: 'உருவாகிறது...',
    skipQuestion: 'கேள்வியைத் தவிர்க்கவும்',
    checkAnswer: 'பதிலைச் சரிபார்',
    nextQuestion: 'அடுத்த கேள்வி',
    questionOf: (curr, total) => `கேள்வி ${curr} / ${total}`,
  },
  en: {
    completeTitle: 'Quiz Practice Complete!',
    completeSubtext: 'Great job reinforcing your concept knowledge in English.',
    score: 'Score',
    accuracy: 'Accuracy',
    xpEarned: 'XP Earned',
    recommendedRevision: 'Recommended Concept Revision',
    revisionSubtext: 'Reviewing this area will help you secure top scores in your upcoming exams.',
    reviewHeader: 'Question Review & Explanations',
    correct: 'Correct ✓',
    incorrect: 'Incorrect ✗',
    explanation: 'Explanation:',
    viewDashboard: 'View Progress Dashboard',
    conceptCheck: 'Concept Check (English)',
    generateGemini: 'Generate Gemini Quiz',
    generating: 'Generating...',
    skipQuestion: 'Skip Question',
    checkAnswer: 'Check Answer',
    nextQuestion: 'Next Question',
    questionOf: (curr, total) => `Question ${curr} of ${total}`,
  },
};

export const QuizScreen: React.FC<QuizScreenProps> = ({
  language,
  subject = 'science',
  isSimpleMode,
  evaluation,
  onNavigate,
  onQuizCompleted,
}) => {
  const currentSubject: SubjectId = (subject === 'math' || subject === 'social_studies') ? subject : 'science';

  const [questions, setQuestions] = useState<QuizQuestion[]>(() =>
    getDefaultQuizQuestions(currentSubject, language)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Array<{ question: QuizQuestion; selectedKey: string; isCorrect: boolean }>>([]);
  const [showXpGain, setShowXpGain] = useState(false);
  const [isLoadingAiQuiz, setIsLoadingAiQuiz] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const langStrings = QUIZ_STRINGS[language] || QUIZ_STRINGS.en;
  const question: QuizQuestion = questions[currentIndex] || questions[0];

  const fetchAiQuiz = async (sub: SubjectId = currentSubject, lang: Language = language) => {
    setIsLoadingAiQuiz(true);
    try {
      const topicName = sub === 'math' ? 'Fractions and Ratios' : sub === 'social_studies' ? 'Maps and Climate' : 'Photosynthesis';
      const res = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: topicName,
          language: lang,
          isSimpleMode,
          weakPoints: evaluation?.whatYouMissed || [],
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setQuestions(data.slice(0, 3));
          setCurrentIndex(0);
          setSelectedKey(null);
          setIsChecked(false);
          setUserAnswers([]);
          setScore(0);
          setCorrectCount(0);
          setIsQuizComplete(false);
        }
      }
    } catch (err) {
      console.warn('Failed to fetch AI Quiz, using default:', err);
    } finally {
      setIsLoadingAiQuiz(false);
    }
  };

  useEffect(() => {
    const defaultQs = getDefaultQuizQuestions(currentSubject, language);
    setQuestions(defaultQs);
    setCurrentIndex(0);
    setSelectedKey(null);
    setIsChecked(false);
    setUserAnswers([]);
    setScore(0);
    setCorrectCount(0);
    setIsQuizComplete(false);

    fetchAiQuiz(currentSubject, language);
  }, [currentSubject, language]);

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isChecked) return;
    setSelectedKey(key);
  };

  const handleCheckAnswer = () => {
    if (!selectedKey) return;
    setIsChecked(true);

    const isCorrect = selectedKey === question.correctKey;
    if (isCorrect) {
      setScore((prev) => prev + 15);
      setCorrectCount((prev) => prev + 1);
      setShowXpGain(true);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
      setTimeout(() => setShowXpGain(false), 2000);
    }

    setUserAnswers((prev) => [
      ...prev,
      { question, selectedKey, isCorrect },
    ]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedKey(null);
      setIsChecked(false);
    } else {
      setIsQuizComplete(true);
      if (onQuizCompleted) {
        onQuizCompleted(correctCount + (selectedKey === question.correctKey ? 1 : 0), questions.length, score + (selectedKey === question.correctKey ? 15 : 0));
      }
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.5 },
      });
    }
  };

  const speakQuestion = () => {
    if (!question) return;
    const textToSpeak = question.questionMarathi || question.questionEnglish;
    speakText(textToSpeak, language);
  };

  // Render Quiz Complete Summary Screen
  if (isQuizComplete) {
    const totalQ = questions.length;
    const finalAccuracy = Math.round((correctCount / totalQ) * 100);
    const recommendedTopic = evaluation?.focusArea || 'Chlorophyll Light Absorption & Solar Energy Conversion';

    return (
      <main className="flex-1 px-4 sm:px-8 py-8 max-w-3xl w-full mx-auto flex flex-col items-center justify-start pb-32 space-y-6 animate-in fade-in duration-300">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/30 shadow-lg mb-1">
            <span className="material-symbols-outlined text-3xl">workspace_premium</span>
          </div>
          <h1 className="font-extrabold text-3xl text-white">{langStrings.completeTitle}</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            {langStrings.completeSubtext}
          </p>
        </div>

        {/* Score Summary Card */}
        <div className="cream-card p-6 rounded-3xl w-full grid grid-cols-3 gap-4 text-center border border-slate-200 shadow-xl">
          <div className="p-3 bg-slate-100 rounded-2xl">
            <span className="text-[10px] font-extrabold uppercase text-slate-500 block">{langStrings.score}</span>
            <span className="text-2xl font-black text-slate-900">{correctCount} / {totalQ}</span>
          </div>
          <div className="p-3 bg-cyan-50 rounded-2xl border border-cyan-200">
            <span className="text-[10px] font-extrabold uppercase text-cyan-800 block">{langStrings.accuracy}</span>
            <span className="text-2xl font-black text-cyan-900">{finalAccuracy}%</span>
          </div>
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
            <span className="text-[10px] font-extrabold uppercase text-amber-800 block">{langStrings.xpEarned}</span>
            <span className="text-2xl font-black text-amber-900">+{score} XP</span>
          </div>
        </div>

        {/* Recommended Revision Card */}
        <div className="w-full bg-[#17223B] p-6 rounded-3xl border border-amber-500/40 shadow-xl space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-extrabold text-xs uppercase tracking-wider">
            <span className="material-symbols-outlined text-base">auto_awesome</span>
            <span>{langStrings.recommendedRevision}</span>
          </div>
          <p className="text-sm font-extrabold text-white">
            {recommendedTopic}
          </p>
          <p className="text-xs text-slate-300">
            {langStrings.revisionSubtext}
          </p>
        </div>

        {/* Question Review List */}
        <div className="w-full space-y-3">
          <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base text-cyan-400">fact_check</span>
            <span>{langStrings.reviewHeader}</span>
          </h3>

          {userAnswers.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all ${
                item.isCorrect
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-100'
                  : 'bg-rose-950/40 border-rose-500/40 text-rose-100'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold uppercase">{langStrings.questionOf(idx + 1, totalQ)}</span>
                <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${item.isCorrect ? 'bg-emerald-500/30 text-emerald-300' : 'bg-rose-500/30 text-rose-300'}`}>
                  {item.isCorrect ? langStrings.correct : langStrings.incorrect}
                </span>
              </div>
              <p className="font-extrabold text-sm text-white mb-2">{item.question.questionMarathi}</p>
              <p className="text-xs text-slate-300 mb-1">
                <strong className="text-amber-300">{langStrings.explanation} </strong> {item.question.explanationMarathi}
              </p>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="pt-2 w-full flex justify-center">
          <button
            onClick={() => onNavigate('progress_dashboard')}
            className="w-full sm:w-auto bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-extrabold px-10 py-4.5 rounded-2xl shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{langStrings.viewDashboard}</span>
            <span className="material-symbols-outlined text-xl">insights</span>
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 px-4 sm:px-8 py-6 max-w-3xl w-full mx-auto flex flex-col justify-between pb-32 space-y-6">
      {/* Top Header & Progress Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-extrabold text-slate-300">
          <div className="flex items-center gap-2">
            <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/30">
              {question?.topic ? question.topic.toUpperCase() : subject.toUpperCase()}
            </span>
            <span>{langStrings.questionOf(currentIndex + 1, questions.length)}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchAiQuiz(currentSubject, language)}
              disabled={isLoadingAiQuiz}
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30 text-xs font-bold transition-all active:scale-95 flex items-center gap-1 cursor-pointer disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span>{isLoadingAiQuiz ? langStrings.generating : langStrings.generateGemini}</span>
            </button>

            <div className="flex items-center gap-1 text-amber-400 font-extrabold">
              <span className="material-symbols-outlined text-base">emoji_events</span>
              <span>{score} XP</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden border border-white/10">
          <div
            className="bg-gradient-to-r from-cyan-500 to-teal-400 h-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Floating XP Gain Badge */}
      {showXpGain && (
        <div className="fixed top-20 right-8 z-50 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-extrabold px-5 py-2.5 rounded-2xl shadow-xl shadow-amber-500/30 flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined font-bold">bolt</span>
          <span>+15 XP Earned!</span>
        </div>
      )}

      {/* Question Container (Cream Card) */}
      <div className="cream-card p-6 sm:p-8 space-y-6 relative interactive-lift border-t-8 border-t-cyan-500">
        <div className="flex justify-between items-start">
          <span className="text-xs font-bold uppercase tracking-wider bg-slate-200 text-slate-700 px-3 py-1 rounded-full">
            {langStrings.conceptCheck}
          </span>

          <button
            onClick={speakQuestion}
            className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-cyan-100 text-cyan-800 flex items-center justify-center transition-colors cursor-pointer"
            title="Read question aloud"
          >
            <span className="material-symbols-outlined text-2xl">volume_up</span>
          </button>
        </div>

        <div>
          <h2 className="font-extrabold text-2xl sm:text-3xl text-slate-900 leading-tight">
            {question?.questionMarathi}
          </h2>
          {question?.questionEnglish && question.questionEnglish !== question.questionMarathi && (
            <p className="text-sm font-semibold text-slate-600 mt-1 italic">
              ({question.questionEnglish})
            </p>
          )}
        </div>

        {/* Options */}
        <div className="space-y-3">
          {question?.options.map((opt) => {
            const isSelected = selectedKey === opt.key;
            const isCorrect = opt.key === question.correctKey;

            let cardStyle = 'bg-white border-slate-200 hover:border-cyan-400 text-slate-900';

            if (isSelected) {
              cardStyle = 'bg-cyan-50 border-2 border-cyan-500 text-slate-900 shadow-md ring-2 ring-cyan-500/20';
            }

            if (isChecked) {
              if (isCorrect) {
                cardStyle = 'bg-emerald-50 border-2 border-emerald-500 text-emerald-950 font-bold';
              } else if (isSelected && !isCorrect) {
                cardStyle = 'bg-rose-50 border-2 border-rose-500 text-rose-950 font-bold';
              }
            }

            return (
              <button
                key={opt.key}
                onClick={() => handleSelectOption(opt.key)}
                className={`w-full p-4 rounded-2xl border text-left flex items-center gap-4 transition-all cursor-pointer ${cardStyle}`}
              >
                <div
                  className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center font-bold text-sm shrink-0 ${
                    isSelected
                      ? 'bg-cyan-500 border-cyan-500 text-slate-950'
                      : 'border-slate-300 text-slate-600 bg-slate-100'
                  }`}
                >
                  {opt.key}
                </div>

                <div className="flex-1">
                  <h4 className="font-extrabold text-base">{opt.labelMarathi}</h4>
                  {opt.labelEnglish && opt.labelEnglish !== opt.labelMarathi && (
                    <p className="text-xs text-slate-500">{opt.labelEnglish}</p>
                  )}
                </div>

                {isChecked && isCorrect && (
                  <span className="material-symbols-outlined text-emerald-600 text-2xl font-bold">
                    check_circle
                  </span>
                )}
                {isChecked && isSelected && !isCorrect && (
                  <span className="material-symbols-outlined text-rose-600 text-2xl font-bold">
                    cancel
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback explanation block */}
        {isChecked && (
          <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-1 animate-in fade-in duration-200">
            <h4 className="font-bold text-sm text-cyan-400 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-lg">lightbulb</span>
              <span>{langStrings.explanation}</span>
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed">{question?.explanationMarathi}</p>
            {question?.explanationEnglish && question.explanationEnglish !== question.explanationMarathi && (
              <p className="text-[11px] text-slate-400 italic">{question.explanationEnglish}</p>
            )}
          </div>
        )}
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleNext}
          className="text-slate-400 hover:text-white font-bold text-xs cursor-pointer"
        >
          {langStrings.skipQuestion}
        </button>

        {!isChecked ? (
          <button
            onClick={handleCheckAnswer}
            disabled={!selectedKey}
            className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold px-8 py-3.5 rounded-2xl shadow-lg shadow-cyan-500/25 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
          >
            {langStrings.checkAnswer}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 text-slate-950 font-extrabold px-8 py-3.5 rounded-2xl shadow-lg shadow-teal-500/25 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>{langStrings.nextQuestion}</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
        )}
      </div>
    </main>
  );
};

