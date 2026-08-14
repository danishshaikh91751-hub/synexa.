import React, { useState, useEffect } from 'react';
import { Language, SnapExplanationMode, MotherTongueBridge, ViewMode, SubjectId } from '../types';
import { LOCALIZED_STRINGS, SUPPORTED_LANGUAGES } from '../data/languages';
import { MotherTongueBridgeCard } from './MotherTongueBridgeCard';
import { ASSET_IMAGES } from '../data/mockData';

interface SnapAndLearnScreenProps {
  language: Language;
  subject?: SubjectId;
  isSimpleMode: boolean;
  onNavigate: (view: ViewMode) => void;
}

interface ImagePreset {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

const PRESET_IMAGES: ImagePreset[] = [
  {
    id: 'p1',
    title: 'Photosynthesis Diagram',
    category: 'Science Diagram',
    imageUrl: ASSET_IMAGES.photosynthesisDiagram,
  },
  {
    id: 'p2',
    title: 'Fractions Textbook Problem',
    category: 'Math Problem',
    imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'p3',
    title: 'Plant Cell Structure',
    category: 'Handwritten Notes',
    imageUrl: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80',
  },
];

export const SnapAndLearnScreen: React.FC<SnapAndLearnScreenProps> = ({
  language,
  subject = 'science',
  isSimpleMode,
  onNavigate,
}) => {
  const defaultSubjectImages: Record<SubjectId, string> = {
    science: PRESET_IMAGES[0].imageUrl,
    math: PRESET_IMAGES[1].imageUrl,
    social_studies: PRESET_IMAGES[2].imageUrl,
  };

  const defaultExplanations: Record<SubjectId, any> = {
    science: {
      title: 'प्रकाशसंश्लेषण आकृती (Photosynthesis Diagram)',
      motherTongueExplanation:
        'या आकृतीत सूर्यप्रकाश पानांवरील हरितद्रव्याद्वारे शोषून घेतला जातो. मुळे जमिनीतून पाणी घेतात आणि हवेतील कार्बन डायऑक्साइड वापरून अन्न तयार केले जाते.',
      bridge: {
        conceptEnglish: 'Photosynthesis Process',
        motherTongueTerm: 'प्रकाशसंश्लेषण प्रक्रिया',
        motherTongueExplanation: 'सूर्यप्रकाशाच्या साहाय्याने वनस्पतींनी स्वतःचे अन्न तयार करण्याची नैसर्गिक प्रक्रिया.',
        englishTerminology: 'Photosynthesis & Chlorophyll',
        pronunciation: 'foh-toh-sin-thuh-sis',
        examReadyEnglishAnswer:
          'Photosynthesis is the chemical process by which green plants synthesize glucose from carbon dioxide and water using sunlight absorbed by chlorophyll.',
      },
      keyHighlights: [
        'सूर्यप्रकाश (Sunlight) शोषला जातो',
        'पाणी (Water) मुळांद्वारे शोषले जाते',
        'ऑक्सिजन (Oxygen) हवेत सोडला जातो',
      ],
    },
    math: {
      title: 'अपूर्णांक समस्या (Fractions & Ratios)',
      motherTongueExplanation:
        'या चित्रात १/२ आणि ३/४ अपूर्णांक दाखवले आहेत. छेद समान करण्यासाठी दोन्ही संख्यांचा लसावी काढला जातो.',
      bridge: {
        conceptEnglish: 'Fractions & Ratios',
        motherTongueTerm: 'अपूर्णांक संकल्पना',
        motherTongueExplanation: 'एका संपूर्ण वस्तूचा समान भाग म्हणजेच अपूर्णांक होय.',
        englishTerminology: 'Numerator & Denominator',
        pronunciation: 'nyoo-muh-ray-ter',
        examReadyEnglishAnswer:
          'A fraction represents part of a whole, consisting of a numerator above the fraction line and a non-zero denominator below.',
      },
      keyHighlights: [
        'अंश (Numerator) वरील संख्या',
        'छेद (Denominator) खालील संख्या',
        'समान छेद करण्यासाठी लसावी वापरतात',
      ],
    },
    social_studies: {
      title: 'नकाशा व गोलार्ध (Maps & Latitudes)',
      motherTongueExplanation:
        'या नकाशात विषुववृत्त, रेखांश आणि अक्षांश दाखवले आहेत. दिशा समजण्यासाठी उत्तर दिशा महत्त्वाची असते.',
      bridge: {
        conceptEnglish: 'Map Reading & Latitudes',
        motherTongueTerm: 'नकाशा आणि अक्षांश',
        motherTongueExplanation: 'पृथ्वीवरील कोणत्याही ठिकाणाचे अचूक स्थान शोधण्यासाठी अक्षांश आणि रेखांश वापरले जातात.',
        englishTerminology: 'Latitude & Longitude',
        pronunciation: 'la-tuh-tood',
        examReadyEnglishAnswer:
          'Latitude and longitude are imaginary lines formed on Earth to accurately pinpoint geographic locations.',
      },
      keyHighlights: [
        'उत्तर दिशा (North) नेहमी वरच्या बाजूस',
        'विषुववृत्त (Equator) ० अंश अक्षांश',
        'प्रमाण (Scale) नकाशातील अंतर दाखवते',
      ],
    },
  };

  const [selectedImage, setSelectedImage] = useState<string>(defaultSubjectImages[subject] || PRESET_IMAGES[0].imageUrl);
  const [activeMode, setActiveMode] = useState<SnapExplanationMode>('simple');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [explanationData, setExplanationData] = useState<any>(defaultExplanations[subject] || defaultExplanations.science);

  useEffect(() => {
    setSelectedImage(defaultSubjectImages[subject] || PRESET_IMAGES[0].imageUrl);
    setExplanationData(defaultExplanations[subject] || defaultExplanations.science);
  }, [subject]);

  const strings = LOCALIZED_STRINGS[language] || LOCALIZED_STRINGS.mr;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setSelectedImage(reader.result);
          runSnapAnalysis(reader.result, activeMode);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const runSnapAnalysis = async (imgBase64: string, mode: SnapExplanationMode, topicTitle?: string) => {
    setIsAnalyzing(true);
    try {
      const res = await fetch('/api/snap-and-learn', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imgBase64,
          mode,
          language,
          subject,
          isSimpleMode,
          topicTitle: topicTitle || PRESET_IMAGES.find((p) => p.imageUrl === imgBase64)?.title || 'Textbook Image',
        }),
      });

      const data = await res.json();
      if (data && data.motherTongueExplanation) {
        setExplanationData(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleModeChange = (mode: SnapExplanationMode) => {
    setActiveMode(mode);
    const preset = PRESET_IMAGES.find((p) => p.imageUrl === selectedImage);
    runSnapAnalysis(selectedImage, mode, preset?.title);
  };

  return (
    <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 pb-32 space-y-6">
      {/* Title Bar */}
      <div className="bg-gradient-to-r from-teal-900/40 via-cyan-900/30 to-slate-900 p-5 rounded-3xl border border-teal-500/30 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center justify-center font-black text-2xl shadow-lg">
            📷
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-teal-400 block">
              Multi-Modal AI Vision
            </span>
            <h1 className="font-extrabold text-xl text-white">{strings.snapAndLearn}</h1>
          </div>
        </div>

        <label className="bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 font-extrabold px-4 py-2.5 rounded-2xl shadow-lg shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer flex items-center gap-2 text-xs sm:text-sm">
          <span className="material-symbols-outlined text-lg">add_a_photo</span>
          <span>Upload Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Preset Selector Bar */}
      <div className="space-y-2">
        <span className="text-xs font-black uppercase tracking-wider text-slate-400 block">
          Or try sample textbook pages & diagrams:
        </span>
        <div className="grid grid-cols-3 gap-3">
          {PRESET_IMAGES.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                setSelectedImage(preset.imageUrl);
                runSnapAnalysis(preset.imageUrl, activeMode, preset.title);
              }}
              className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer active:scale-95 flex items-center gap-3 ${
                selectedImage === preset.imageUrl
                  ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/80 border-white/10 text-slate-300 hover:border-slate-600'
              }`}
            >
              <img
                src={preset.imageUrl}
                alt={preset.title}
                className="w-10 h-10 rounded-xl object-cover border border-white/10 shrink-0"
              />
              <div className="overflow-hidden">
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block truncate">
                  {preset.category}
                </span>
                <span className="text-xs font-extrabold text-white truncate block">
                  {preset.title}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout: Image Preview + Mode Switcher + Bridge */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Col: Image Viewer */}
        <div className="md:col-span-5 cream-card p-4 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden shadow-xl border border-slate-200 min-h-[260px]">
          <img
            src={selectedImage}
            alt="Snap Preview"
            className="w-full h-56 object-cover rounded-2xl shadow-md border border-slate-300"
          />

          {isAnalyzing && (
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center space-y-3 z-20">
              <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-extrabold text-cyan-300 animate-pulse">
                Analyzing diagram with Gemini AI in {SUPPORTED_LANGUAGES.find((l) => l.code === language)?.nativeName}...
              </p>
            </div>
          )}

          <div className="mt-3 w-full bg-slate-100 p-2.5 rounded-xl text-[11px] font-bold text-slate-700 flex items-center justify-between">
            <span>Scan Status: Complete</span>
            <span className="text-teal-600 font-extrabold">100% Verified</span>
          </div>
        </div>

        {/* Right Col: 5 Mode Switcher & Explanation */}
        <div className="md:col-span-7 space-y-4">
          {/* Explanation Mode Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {[
              { id: 'simple', label: strings.simpleExplanation, icon: 'auto_awesome' },
              { id: 'step_by_step', label: strings.stepByStep, icon: 'format_list_numbered' },
              { id: 'real_life', label: strings.realLifeExample, icon: 'nature_people' },
              { id: 'story', label: strings.storyMode, icon: 'auto_stories' },
              { id: 'exam_answer', label: strings.examAnswer, icon: 'edit_note' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleModeChange(tab.id as SnapExplanationMode)}
                className={`px-3 py-2 rounded-2xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeMode === tab.id
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25'
                    : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-600'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Explanation Card */}
          <div className="cream-card p-5 rounded-3xl space-y-3 shadow-xl border border-slate-200">
            <h3 className="font-extrabold text-lg text-slate-900 flex items-center gap-2">
              <span className="material-symbols-outlined text-cyan-600">psychology</span>
              <span>{explanationData.title}</span>
            </h3>

            <p className="text-sm font-semibold text-slate-800 leading-relaxed bg-white p-4 rounded-2xl border border-slate-200">
              {explanationData.motherTongueExplanation}
            </p>

            {/* Key Highlights */}
            {explanationData.keyHighlights && (
              <div className="space-y-1.5 pt-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-500 block">
                  Key Points:
                </span>
                <div className="flex flex-wrap gap-2">
                  {explanationData.keyHighlights.map((pt, i) => (
                    <span
                      key={i}
                      className="bg-cyan-50 text-cyan-900 px-3 py-1 rounded-full text-xs font-extrabold border border-cyan-200"
                    >
                      {pt}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mother Tongue -> English Bridge Card */}
      {explanationData.bridge && (
        <div className="w-full pt-2">
          <MotherTongueBridgeCard bridge={explanationData.bridge} selectedLanguage={language} />
        </div>
      )}
    </main>
  );
};
