import React, { useState, useRef, useEffect } from 'react';
import { Language, MotherTongueBridge, ViewMode, SubjectId } from '../types';
import { LOCALIZED_STRINGS, SUPPORTED_LANGUAGES } from '../data/languages';
import { speakText } from '../utils/speech';
import { MotherTongueBridgeCard } from './MotherTongueBridgeCard';

interface TalkToSynexaScreenProps {
  language: Language;
  subject?: SubjectId;
  isSimpleMode: boolean;
  onToggleSimpleMode?: (val: boolean) => void;
  onNavigate: (view: ViewMode) => void;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'synexa';
  text: string;
  textEnglish?: string;
  bridge?: MotherTongueBridge;
  timestamp: string;
}

export const TalkToSynexaScreen: React.FC<TalkToSynexaScreenProps> = ({
  language,
  subject = 'science',
  isSimpleMode,
  onToggleSimpleMode,
  onNavigate,
}) => {
  const getSubjectGreeting = () => {
    if (subject === 'math') {
      return language === 'mr'
        ? 'नमस्ते! मी तुमची AI ट्यूटर Synexa आहे. चला गणितातील संकल्पना जसे की अपूर्णांक, भूमिती सोप्या भाषेत शिकूया!'
        : language === 'hi'
        ? 'नमस्ते! मैं आपकी AI ट्यूटर Synexa हूँ। आइए गणित के विषय जैसे भिन्न और ज्यामिति आसान भाषा में सीखें!'
        : language === 'gu'
        ? 'નમસ્તે! હું તમારી AI ટ્યુટર Synexa છું. ચાલો ગણિતના ખ્યાલો સરળ ભાષામાં શીખીએ!'
        : language === 'ta'
        ? 'வணக்கம்! நான் உங்கள் AI டூட்டர் Synexa. கணிதக் கருத்துகளை எளிதாகக் கற்போம்!'
        : 'Hello! I am your AI Voice Tutor Synexa. Let’s learn Math concepts like Fractions & Geometry!';
    }
    if (subject === 'social_studies') {
      return language === 'mr'
        ? 'नमस्ते! मी तुमची AI ट्यूटर Synexa आहे. सामाजिक शास्त्रे जसे की नकाशे, इतिहास आणि भूगोल शिकूया!'
        : language === 'hi'
        ? 'नमस्ते! मैं आपकी AI ट्यूटर Synexa हूँ। आइए सामाजिक विज्ञान, मानचित्र और इतिहास सीखें!'
        : language === 'gu'
        ? 'નમસ્તે! હું તમારી AI ટ્યુટર Synexa છું. ચાલો નકશા અને ઇતિહાસ સરળતાથી શીખીએ!'
        : language === 'ta'
        ? 'வணக்கம்! நான் உங்கள் AI டூட்டர் Synexa. வரைபடங்கள் மற்றும் சமூக அறிவியலைக் கற்போம்!'
        : 'Hello! I am your AI Voice Tutor Synexa. Let’s explore Social Studies, Maps, and History!';
    }
    return language === 'mr'
      ? 'नमस्ते! मी तुमची AI ट्यूटर Synexa आहे. विज्ञान संकल्पना जसे की प्रकाशसंश्लेषण आणि वनस्पती शास्त्र शिकूया!'
      : language === 'hi'
      ? 'नमस्ते! मैं आपकी AI ट्यूटर Synexa हूँ। आइए विज्ञान और प्रकाश-संश्लेषण के विषय सीखें!'
      : language === 'gu'
      ? 'નમસ્તે! હું તમારી AI ટ્યુટર Synexa છું. ચાલો વિજ્ઞાનના વિષયો સરળતાથી શીખીએ!'
      : language === 'ta'
      ? 'வணக்கம்! நான் உங்கள் AI டூட்டர் Synexa. அறிவியல் கருத்துகளைக் கற்போம்!'
      : 'Hello! I am your AI Voice Tutor Synexa. Speak or type any question in your language!';
  };

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'synexa',
      text: getSubjectGreeting(),
      timestamp: 'Just now',
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const strings = LOCALIZED_STRINGS[language] || LOCALIZED_STRINGS.mr;
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  const startVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your query.');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = language === 'mr' ? 'mr-IN' : language === 'hi' ? 'hi-IN' : 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInputQuery(transcript);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isThinking) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsThinking(true);

    try {
      const res = await fetch('/api/chat-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          language,
          subject,
          isSimpleMode,
        }),
      });

      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'synexa',
        text: data.replyText || 'हे समजणे खूप सोपे आहे!',
        textEnglish: data.replyEnglish,
        bridge: data.bridgeTerm
          ? {
              conceptEnglish: data.bridgeTerm.englishTerminology || 'Concept',
              motherTongueTerm: data.bridgeTerm.motherTongueTerm || query,
              motherTongueExplanation: data.replyText,
              englishTerminology: data.bridgeTerm.englishTerminology || 'Science Concept',
              pronunciation: data.bridgeTerm.pronunciation || 'phonics',
              examReadyEnglishAnswer: data.bridgeTerm.examReadyEnglishAnswer || data.replyEnglish,
            }
          : undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
      speakText(aiMsg.text, language);
    } catch (err) {
      console.error(err);
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'synexa',
        text: `छान प्रश्न! ${query} याविषयी थोडक्यात सांगायचे तर, ही एक महत्त्वाची वैज्ञानिक संकल्पना आहे.`,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      speakText(fallbackMsg.text, language);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 pb-32 flex flex-col h-[calc(100vh-5rem)]">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-cyan-900/40 via-teal-900/30 to-slate-900 p-4 sm:p-5 rounded-3xl border border-cyan-500/30 mb-4 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center justify-center font-black text-2xl shadow-lg">
            🎙️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-lg sm:text-xl text-white">
                {strings.talkToSynexa}
              </h1>
              <span className="bg-cyan-500/20 text-cyan-300 px-2.5 py-0.5 rounded-full text-xs font-extrabold border border-cyan-500/30 flex items-center gap-1">
                <span>{currentLangObj.flag}</span>
                <span>{currentLangObj.nativeName}</span>
              </span>
            </div>
            <p className="text-xs text-slate-300 font-medium">
              Speak or ask anything in your mother tongue with instant AI audio tutor
            </p>
          </div>
        </div>

        {/* Simple Language Mode Toggle */}
        <button
          onClick={() => onToggleSimpleMode?.(!isSimpleMode)}
          className={`px-3 py-1.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer border flex items-center gap-1.5 ${
            isSimpleMode
              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
              : 'bg-white/10 text-slate-300 border-white/20 hover:bg-white/20'
          }`}
        >
          <span className="material-symbols-outlined text-sm">
            {isSimpleMode ? 'check_circle' : 'auto_fix_high'}
          </span>
          <span>{isSimpleMode ? 'Simple Mode ON' : 'Simple Mode'}</span>
        </button>
      </div>

      {/* Main Conversation Stream */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-slate-700">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            } space-y-2`}
          >
            <div
              className={`max-w-[88%] sm:max-w-[80%] rounded-3xl p-4 sm:p-5 shadow-lg leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-gradient-to-r from-cyan-600 to-teal-500 text-slate-950 font-extrabold rounded-tr-xs'
                  : 'cream-card text-slate-900 border border-slate-200 rounded-tl-xs'
              }`}
            >
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-wider mb-1 opacity-70">
                <span>{msg.sender === 'user' ? 'You' : 'Synexa AI Tutor'}</span>
                <span>{msg.timestamp}</span>
              </div>

              <p className="text-sm sm:text-base font-extrabold">{msg.text}</p>

              {msg.textEnglish && msg.sender === 'synexa' && (
                <p className="text-xs text-slate-600 mt-2 italic pt-2 border-t border-slate-200">
                  🇬🇧 English translation: "{msg.textEnglish}"
                </p>
              )}

              {msg.sender === 'synexa' && (
                <button
                  onClick={() => speakText(msg.text, language)}
                  className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-500/10 text-cyan-800 hover:bg-cyan-500/20 rounded-full text-xs font-bold transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">volume_up</span>
                  <span>Listen Voice</span>
                </button>
              )}
            </div>

            {/* Render Mother Tongue Bridge Card if provided */}
            {msg.bridge && msg.sender === 'synexa' && (
              <div className="w-full max-w-[88%] sm:max-w-[80%]">
                <MotherTongueBridgeCard bridge={msg.bridge} selectedLanguage={language} />
              </div>
            )}
          </div>
        ))}

        {isThinking && (
          <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-xs animate-pulse bg-slate-900/80 p-3 rounded-2xl w-fit border border-cyan-500/30">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Synexa is thinking in {currentLangObj.nativeName}...</span>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggested Quick Question Chips */}
      <div className="mt-3 mb-2 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {(subject === 'math'
          ? [
              'अपूर्णांक म्हणजे काय?',
              'अपूर्णांकांची बेरीज कशी करतात?',
              'What is a Fraction?',
              'Numerator vs Denominator',
            ]
          : subject === 'social_studies'
          ? [
              'नकाशा म्हणजे काय?',
              'अक्षांश आणि रेखांश म्हणजे काय?',
              'What is Latitude & Longitude?',
              'Explain Maps & Climate',
            ]
          : [
              'प्रकाशसंश्लेषण म्हणजे काय?',
              'वनस्पती अन्न कसे बनवतात?',
              'What is Chlorophyll?',
              'Explain Cell Structure',
            ]
        ).map((chip, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(chip)}
            className="px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap bg-slate-900 text-slate-300 hover:text-white border border-slate-700 hover:border-cyan-500 transition-all cursor-pointer active:scale-95"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Bottom Input Controls */}
      <div className="bg-slate-900/90 p-3 sm:p-4 rounded-3xl border border-white/10 shadow-2xl flex items-center gap-2.5 backdrop-blur-md">
        <button
          onClick={startVoiceInput}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all cursor-pointer shrink-0 active:scale-95 ${
            isListening
              ? 'bg-rose-500 text-white animate-bounce shadow-lg shadow-rose-500/30'
              : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500/30'
          }`}
          title="Click to Speak"
        >
          <span className="material-symbols-outlined text-2xl">
            {isListening ? 'mic' : 'mic_none'}
          </span>
        </button>

        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={isListening ? strings.listening : strings.typeYourQuestion}
          className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-sm font-bold text-white placeholder-slate-500 outline-none focus:border-cyan-500"
        />

        <button
          onClick={() => handleSendMessage()}
          disabled={!inputQuery.trim() || isThinking}
          className="w-12 h-12 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black flex items-center justify-center transition-all cursor-pointer disabled:opacity-40 active:scale-95 shrink-0 shadow-lg shadow-cyan-500/25"
        >
          <span className="material-symbols-outlined text-2xl">send</span>
        </button>
      </div>
    </main>
  );
};
