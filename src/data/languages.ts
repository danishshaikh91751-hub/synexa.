import { Language, LanguageOption } from '../types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', nativeName: 'English', englishName: 'English', flag: '🇬🇧' },
  { code: 'mr', nativeName: 'मराठी', englishName: 'Marathi', flag: '🇮🇳' },
  { code: 'hi', nativeName: 'हिन्दी', englishName: 'Hindi', flag: '🇮🇳' },
  { code: 'gu', nativeName: 'ગુજરાતી', englishName: 'Gujarati', flag: '🇮🇳' },
  { code: 'ta', nativeName: 'தமிழ்', englishName: 'Tamil', flag: '🇮🇳' },
];

export interface UIStrings {
  girlGreeting: string;
  girlWelcomeMessage: string;
  home: string;
  learn: string;
  vocabulary: string;
  practice: string;
  progress: string;
  science: string;
  math: string;
  socialStudies: string;
  talkToSynexa: string;
  snapAndLearn: string;
  aiDoubtSolver: string;
  motherTongueBridge: string;
  simpleLanguageMode: string;
  standardLanguageMode: string;
  selectSubject: string;
  exploreLessons: string;
  vocabularyBridge: string;
  practiceQuiz: string;
  progressDashboard: string;
  askYourDoubt: string;
  uploadDiagramTextbook: string;
  speakToTutor: string;
  listening: string;
  typeYourQuestion: string;
  pronunciation: string;
  examReadyAnswer: string;
  simpleExplanation: string;
  stepByStep: string;
  realLifeExample: string;
  storyMode: string;
  examAnswer: string;
  aiRecommendation: string;
}

export const LOCALIZED_STRINGS: Record<Language, UIStrings> = {
  en: {
    girlGreeting: 'Hello!',
    girlWelcomeMessage: 'Welcome Back, Aarav! I am Synexa, your AI learning buddy.',
    home: 'Home',
    learn: 'Learn',
    vocabulary: 'Vocabulary',
    practice: 'Practice',
    progress: 'Progress',
    science: 'Science',
    math: 'Mathematics',
    socialStudies: 'Social Studies',
    talkToSynexa: 'Talk to Synexa',
    snapAndLearn: 'Snap & Learn',
    aiDoubtSolver: 'AI Doubt Solver',
    motherTongueBridge: 'Mother Tongue → English Bridge',
    simpleLanguageMode: 'Simple Language Mode',
    standardLanguageMode: 'Standard Language Mode',
    selectSubject: 'Select Subject',
    exploreLessons: 'Explore Lessons',
    vocabularyBridge: 'Vocabulary Bridge',
    practiceQuiz: 'Practice Quiz',
    progressDashboard: 'Progress Dashboard',
    askYourDoubt: 'Ask Your Doubt',
    uploadDiagramTextbook: 'Upload Textbook Page or Diagram',
    speakToTutor: 'Speak to Voice Tutor',
    listening: 'Listening...',
    typeYourQuestion: 'Type or speak your question here...',
    pronunciation: 'Pronunciation Guide',
    examReadyAnswer: 'Exam-Ready English Answer',
    simpleExplanation: 'Simple Explanation',
    stepByStep: 'Step-by-Step',
    realLifeExample: 'Real-Life Example',
    storyMode: 'Story Mode',
    examAnswer: 'Exam Answer',
    aiRecommendation: 'AI Recommendation',
  },
  mr: {
    girlGreeting: 'नमस्कार!',
    girlWelcomeMessage: 'पुन्हा स्वागत आहे, आरव! मी सिनेक्सा, तुमची AI ट्यूटर.',
    home: 'मुख्यपृष्ठ',
    learn: 'शिका',
    vocabulary: 'शब्दसंग्रह',
    practice: 'सराव',
    progress: 'प्रगती',
    science: 'विज्ञान',
    math: 'गणित',
    socialStudies: 'समाजशास्त्र',
    talkToSynexa: 'Synexa शी बोला',
    snapAndLearn: 'Snap & Learn (फोटो काढून शिका)',
    aiDoubtSolver: 'AI शंका निवारण',
    motherTongueBridge: 'मातृभाषा → इंग्रजी ब्रिज',
    simpleLanguageMode: 'सोपी भाषा मोड',
    standardLanguageMode: 'मानक भाषा मोड',
    selectSubject: 'विषय निवडा',
    exploreLessons: 'धडे अभ्यासा',
    vocabularyBridge: 'शब्दसंग्रह ब्रिज',
    practiceQuiz: 'सरावासाठी प्रश्नमंजुषा',
    progressDashboard: 'प्रगती तक्ता',
    askYourDoubt: 'तुमची शंका विचारा',
    uploadDiagramTextbook: 'पुस्तकाचे पान / आकृती अपलोड करा',
    speakToTutor: 'ट्यूटरशी बोला',
    listening: 'ऐकत आहे...',
    typeYourQuestion: 'तुमचा प्रश्न इथे टाईप करा किंवा बोला...',
    pronunciation: 'उच्चार (Pronunciation)',
    examReadyAnswer: 'परीक्षेसाठी इंग्रजी व्याख्या',
    simpleExplanation: 'सोपे स्पष्टीकरण',
    stepByStep: 'टप्प्याटप्प्याने',
    realLifeExample: 'दैनंदिन जीवनातील उदाहरण',
    storyMode: 'गोष्टीच्या रूपात',
    examAnswer: 'परीक्षेसाठी उत्तर',
    aiRecommendation: 'AI शिफारस',
  },
  hi: {
    girlGreeting: 'नमस्ते!',
    girlWelcomeMessage: 'फिर से स्वागत है, आरव! मैं सिनेक्सा, आपकी AI ट्यूटर।',
    home: 'होम',
    learn: 'सीखें',
    vocabulary: 'शब्दावली',
    practice: 'अभ्यास',
    progress: 'प्रगति',
    science: 'विज्ञान',
    math: 'गणित',
    socialStudies: 'सामाजिक अध्ययन',
    talkToSynexa: 'Synexa से बात करें',
    snapAndLearn: 'Snap & Learn (फोटो खींचकर समझें)',
    aiDoubtSolver: 'AI डाउट सॉल्वर',
    motherTongueBridge: 'मातृभाषा → अंग्रेजी ब्रिज',
    simpleLanguageMode: 'सरल भाषा मोड',
    standardLanguageMode: 'मानक भाषा मोड',
    selectSubject: 'विषय चुनें',
    exploreLessons: 'पाठ पढ़ें',
    vocabularyBridge: 'शब्दावली ब्रिज',
    practiceQuiz: 'अभ्यास क्विज़',
    progressDashboard: 'प्रगति डैशबोर्ड',
    askYourDoubt: 'अपना प्रश्न पूछें',
    uploadDiagramTextbook: 'किताब का पेज या चित्र अपलोड करें',
    speakToTutor: 'ट्यूटर से बोलकर पूछें',
    listening: 'सुन रहा हूँ...',
    typeYourQuestion: 'अपना प्रश्न यहाँ लिखें या बोलें...',
    pronunciation: 'उच्चारण (Pronunciation)',
    examReadyAnswer: 'परीक्षा उत्तर (Exam Ready)',
    simpleExplanation: 'सरल व्याख्या',
    stepByStep: 'चरण-दर-चरण',
    realLifeExample: 'रियल-लाइफ़ उदाहरण',
    storyMode: 'कहानी के रूप में',
    examAnswer: 'परीक्षा उत्तर',
    aiRecommendation: 'AI सुझाव',
  },
  gu: {
    girlGreeting: 'નમસ્તે!',
    girlWelcomeMessage: 'પાછા આવવા બદલ સ્વાગત છે, આરવ! હું સિનેક્સા, તમારી AI ટ્યુટર છું.',
    home: 'હોમ',
    learn: 'શીખો',
    vocabulary: 'શબ્દભંડોળ',
    practice: 'પ્રેક્ટિસ',
    progress: 'પ્રગતિ',
    science: 'વિજ્ઞાન',
    math: 'ગણિત',
    socialStudies: 'સામાજિક વિજ્ઞાન',
    talkToSynexa: 'Synexa સાથે વાત કરો',
    snapAndLearn: 'Snap & Learn (ફોટો પાડીને શીખો)',
    aiDoubtSolver: 'AI શંકા નિવારણ',
    motherTongueBridge: 'માતૃભાષા → અંગ્રેજી બ્રિજ',
    simpleLanguageMode: 'સરળ ભાષા મોડ',
    standardLanguageMode: 'સામાન્ય ભાષા મોડ',
    selectSubject: 'વિષય પસંદ કરો',
    exploreLessons: 'પાઠ ભણો',
    vocabularyBridge: 'શબ્દભંડોળ બ્રિજ',
    practiceQuiz: 'પ્રેક્ટિસ ક્વિઝ',
    progressDashboard: 'પ્રગતિ ડેશબોર્ડ',
    askYourDoubt: 'તમારી શંકા પૂછો',
    uploadDiagramTextbook: 'પુસ્તકનું પેજ અથવા આકૃતિ અપલોડ કરો',
    speakToTutor: 'વોઇસ દ્વારા વાત કરો',
    listening: 'સાંભળી રહ્યું છે...',
    typeYourQuestion: 'તમારો પ્રશ્ન અહીં ટાઇપ કરો...',
    pronunciation: 'ઉચ્ચારણ (Pronunciation)',
    examReadyAnswer: 'પરીક્ષા માટે યોગ્ય ઉત્તર',
    simpleExplanation: 'સરળ સમજૂતી',
    stepByStep: 'તબક્કાવાર',
    realLifeExample: 'વાસ્તવિક દ્રષ્ટાંત',
    storyMode: 'વાર્તા રૂપે',
    examAnswer: 'પરીક્ષા ઉત્તર',
    aiRecommendation: 'AI ભલામણ',
  },
  ta: {
    girlGreeting: 'வணக்கம்!',
    girlWelcomeMessage: 'மீண்டும் நல்வரவு, ஆரவ்! நான் சினெக்ஸா, உங்கள் AI ஆசிரியை.',
    home: 'முகப்பு',
    learn: 'கற்க',
    vocabulary: 'சொற்களஞ்சியம்',
    practice: 'பயிற்சி',
    progress: 'முன்னேற்றம்',
    science: 'அறிவியல்',
    math: 'கணிதம்',
    socialStudies: 'சமூக அறிவியல்',
    talkToSynexa: 'Synexa வுடன் பேசுங்கள்',
    snapAndLearn: 'Snap & Learn (படம் எடுத்து கற்றல்)',
    aiDoubtSolver: 'AI சந்தேகத் தீர்வு',
    motherTongueBridge: 'தாய்மொழி → ஆங்கில பாலம்',
    simpleLanguageMode: 'எளிய மொழி முறை',
    standardLanguageMode: 'இயல்பான மொழி முறை',
    selectSubject: 'பாடம் தேர்ந்தெடுக்கவும்',
    exploreLessons: 'பாடங்களை கற்போம்',
    vocabularyBridge: 'சொற்களஞ்சியம்',
    practiceQuiz: 'பயிற்சி வினாடி வினா',
    progressDashboard: 'முன்னேற்றப் பலகை',
    askYourDoubt: 'உங்கள் சந்தேகத்தைக் கேளுங்கள்',
    uploadDiagramTextbook: 'புத்தகப் பக்கம் அல்லது படத்தை பதிவேற்றவும்',
    speakToTutor: 'குரல் மூலம் பேசுங்கள்',
    listening: 'கேட்கிறது...',
    typeYourQuestion: 'உங்கள் கேள்வியை இங்கே தட்டச்சு செய்யவும்...',
    pronunciation: 'உச்சரிப்பு (Pronunciation)',
    examReadyAnswer: 'தேர்வுக்கான ஆங்கில விளக்கம்',
    simpleExplanation: 'எளிய விளக்கம்',
    stepByStep: 'படி படியாக',
    realLifeExample: 'நடைமுறை உதாரணம்',
    storyMode: 'கதை வடிவில்',
    examAnswer: 'தேர்வு விடை',
    aiRecommendation: 'AI பரிந்துரை',
  },
};
