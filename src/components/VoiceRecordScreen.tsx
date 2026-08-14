import React, { useState, useEffect, useRef } from 'react';
import { ViewMode, Language, EvaluationResult, SubjectId } from '../types';

interface VoiceRecordScreenProps {
  language?: Language;
  subject?: SubjectId;
  onNavigate: (view: ViewMode) => void;
  onEvaluated: (result: EvaluationResult) => void;
}

export const VoiceRecordScreen: React.FC<VoiceRecordScreenProps> = ({
  language = 'mr',
  subject = 'science',
  onNavigate,
  onEvaluated,
}) => {
  const [seconds, setSeconds] = useState(12);
  const [isRecording, setIsRecording] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const defaultExplanations: Record<SubjectId, Record<string, string>> = {
    science: {
      mr: 'वनस्पती सूर्यप्रकाश, पाणी आणि कार्बन डायऑक्साईड वापरून स्वतःचे अन्न तयार करतात. या प्रक्रियेला प्रकाशसंश्लेषण म्हणतात.',
      hi: 'पौधे सूर्य के प्रकाश, पानी और कार्बन डाइऑक्साइड का उपयोग करके अपनी पत्तियों में भोजन बनाते हैं। इस प्रक्रिया को प्रकाश-संश्लेषण कहते हैं।',
      gu: 'વનસ્પતિ સૂર્યપ્રકાશ, પાણી અને કાર્બન ડાયોક્સાઇડનો ઉપયોગ કરીને પોતાનો ખોરાક બનાવે છે. આ પ્રક્રિયાને પ્રકાશસંશ્લેષણ કહે છે.',
      ta: 'தாவரங்கள் சூரிய ஒளி, நீர் மற்றும் கார்பன் டை ஆக்சைடு பயன்படுத்தி உணவை தயாரிக்கின்றன. இந்த நிகழ்வு ஒளிச்சேர்க்கை எனப்படும்.',
      en: 'Plants produce glucose and oxygen using solar energy, water, and atmospheric carbon dioxide inside leaf chloroplasts.',
    },
    math: {
      mr: 'अपूर्णांक म्हणजे एका संपूर्ण वस्तूचा भाग होय. १ पिझ्झाचे ४ समान तुकडे केले तर १ भाग म्हणजे १/४ भाग होय.',
      hi: 'भिन्न किसी पूर्ण वस्तु का एक भाग होता है। 1 पिज्जा के 4 बराबर भागों में से 1 भाग 1/4 कहलाता है।',
      gu: 'અપૂર્ણાંક એટલે આખી વસ્તુનો એક ભાગ. 1 પિઝાના 4 સરખા ટુકડામાંથી 1 ટુકડો એટલે 1/4 ભાગ.',
      ta: 'பின்னம் என்பது ஒரு முழு பொருளின் பகுதியாகும். 4 பாகங்களாகப் பிரிக்கப்பட்ட பீட்சாவில் 1 பாகம் 1/4 ஆகும்.',
      en: 'A fraction represents a numerical part of a whole unit, such as 1 slice out of a 4-slice pizza being 1/4.',
    },
    social_studies: {
      mr: 'नकाशे पृथ्वीवरील देश, नद्या आणि रस्ते दाखवतात. उत्तर दिशा आणि अक्षांश-रेखांश यांमुळे स्थान निश्चित करता येते.',
      hi: 'मानचित्र पृथ्वी के देशों, नदियों और रास्तों को दर्शाते हैं। उत्तर दिशा और अक्षांश-देशांतर से स्थान खोजा जाता है।',
      gu: 'નકશા પૃથ્વીના દેશો અને રસ્તાઓ દર્શાવે છે. ઉત્તર દિશા અને અક્ષાંશ-રેખાંશ દ્વારા સ્થાન નક્કી થાય છે.',
      ta: 'வரைபடங்கள் இடங்கள் மற்றும் சாலைகளைக் காட்டுகின்றன. திசைகள் மற்றும் அட்சரேகை மூலம் இடங்களைக் கண்டறியலாம்.',
      en: 'Maps show rivers, roads, and boundaries using cardinal directions, latitude, longitude, and scale.',
    },
  };

  const subjectExplanations = defaultExplanations[subject] || defaultExplanations.science;

  const langLocales: Record<string, string> = {
    mr: 'mr-IN',
    hi: 'hi-IN',
    gu: 'gu-IN',
    ta: 'ta-IN',
    en: 'en-US',
  };

  const [transcript, setTranscript] = useState(
    subjectExplanations[language] || subjectExplanations.en
  );

  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    setTranscript(subjectExplanations[language] || subjectExplanations.en);
  }, [language, subject]);

  // Timer interval
  useEffect(() => {
    let timer: any;
    if (isRecording) {
      timer = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording]);

  // Format seconds to mm:ss
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const startMic = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = langLocales[language] || 'mr-IN';

        recognition.onresult = (event: any) => {
          let text = '';
          for (let i = 0; i < event.results.length; i++) {
            text += event.results[i][0].transcript;
          }
          if (text) setTranscript(text);
        };

        recognition.start();
        recognitionRef.current = recognition;
        setIsRecording(true);
      } catch (e) {
        console.warn('Speech recognition start failed', e);
      }
    } else {
      setIsRecording(true);
    }
  };

  useEffect(() => {
    startMic();
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  const handleSend = async () => {
    setIsRecording(false);
    setIsAnalyzing(true);

    try {
      const res = await fetch('/api/evaluate-explanation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: subject === 'math' ? 'Fractions and Ratios' : subject === 'social_studies' ? 'Maps and Climate' : 'Photosynthesis',
          subject: subject === 'math' ? 'Mathematics' : subject === 'social_studies' ? 'Social Studies' : 'Science',
          language,
          explanationText: transcript,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        onEvaluated({
          ...data,
          userExplanationText: transcript,
        });
      } else {
        throw new Error('API error');
      }
    } catch (err) {
      console.error(err);
      onEvaluated({
        understandingPercentage: 88,
        titleMarathi: 'उत्तम स्पष्टीकरण!',
        titleEnglish: 'Great Concept Explanation!',
        whatYouGotRight: [
          'Correctly identified solar energy requirement (Light absorption)',
          'Mentioned water absorption through roots & CO2 uptake',
          'Captured chemical synthesis concept (Glucose production)',
        ],
        whatYouMissed: [
          'Role of chlorophyll pigment inside leaf chloroplasts in absorbing photons',
        ],
        focusArea: 'Review how chlorophyll pigment captures solar light energy inside leaf cells.',
        examReadyEnglishAnswer: 'Photosynthesis is the process by which green plants manufacture glucose from carbon dioxide and water using solar energy absorbed by chlorophyll.',
        userExplanationText: transcript,
      });
    } finally {
      setIsAnalyzing(false);
      onNavigate('explanation_feedback');
    }
  };

  return (
    <div className="bg-[#0b1329] text-white min-h-screen flex flex-col justify-between relative overflow-hidden font-sans pb-32">
      {/* Top Header Bar */}
      <header className="flex justify-between items-center px-6 py-4 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
        <button
          onClick={() => onNavigate('learn_lesson')}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors active:scale-95"
          aria-label="Close"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="text-center">
          <span className="text-[10px] uppercase tracking-widest font-extrabold text-cyan-400 block">
            AI Voice Assessment Mode
          </span>
          <h1 className="font-extrabold text-lg text-white">
            प्रकाशसंश्लेषण (Photosynthesis)
          </h1>
        </div>

        {/* Live Timer Pill */}
        <div className="flex items-center gap-2 bg-rose-500/20 text-rose-300 border border-rose-500/40 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          <span>{formatTime(seconds)}</span>
        </div>
      </header>

      {/* Main Recording Interface */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-4xl mx-auto px-4 py-8 space-y-8">
        {/* Pulsing Waveform Graphic */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          <div className="absolute inset-0 bg-cyan-500/20 rounded-full filter blur-2xl animate-pulse" />

          {/* SVG Animated Concentric Rings */}
          <svg viewBox="0 0 200 200" className="w-full h-full relative z-10">
            <circle cx="100" cy="100" r="70" fill="none" stroke="#06b6d4" strokeWidth="2" opacity="0.4">
              <animate attributeName="r" values="60;85;60" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.6;0.1;0.6" dur="3s" repeatCount="indefinite" />
            </circle>

            <circle cx="100" cy="100" r="50" fill="none" stroke="#14b8a6" strokeWidth="3" opacity="0.7">
              <animate attributeName="r" values="45;65;45" dur="2s" repeatCount="indefinite" />
            </circle>

            <circle cx="100" cy="100" r="35" fill="#0891b2" className="shadow-2xl" />

            <g transform="translate(85, 85) scale(1.2)">
              <path fill="#ffffff" d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
              <path fill="#ffffff" d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
            </g>
          </svg>
        </div>

        <p className="text-sm font-extrabold text-cyan-300 tracking-wide flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>{isRecording ? 'Listening to your explanation in Marathi...' : 'Analyzing explanation...'}</span>
        </p>

        {/* Live Transcript Container */}
        <div className="w-full max-w-2xl cream-card p-6 rounded-3xl space-y-3 shadow-2xl border border-slate-200">
          <div className="flex justify-between items-center text-xs font-extrabold text-slate-500 uppercase tracking-wider">
            <span>Live Audio Transcript</span>
            <button
              onClick={() =>
                setTranscript(
                  'वनस्पती सूर्यप्रकाश, पाणी आणि कार्बन डायऑक्साईड शोषून घेऊन पानांमध्ये अन्न तयार करतात. या प्रक्रियेत ऑक्सिजन वायू बाहेर सोडला जातो.'
                )
              }
              className="text-cyan-700 hover:underline cursor-pointer"
            >
              Fill Sample Explanation
            </button>
          </div>

          <textarea
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            rows={3}
            className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-slate-900 font-extrabold text-base leading-relaxed focus:ring-2 focus:ring-cyan-500 outline-none resize-none"
            placeholder="Spoken words will appear here in real time..."
          />
        </div>

        {/* Submit Action CTA */}
        <button
          onClick={handleSend}
          disabled={isAnalyzing}
          className="bg-gradient-to-r from-cyan-500 to-teal-400 hover:from-cyan-400 hover:to-teal-300 text-slate-950 font-extrabold text-base px-10 py-4.5 rounded-2xl shadow-xl shadow-cyan-500/25 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50"
        >
          <span className="material-symbols-outlined text-2xl font-bold">send</span>
          <span>{isAnalyzing ? 'Analyzing with AI...' : 'Submit Explanation for AI Evaluation'}</span>
        </button>
      </main>
    </div>
  );
};

