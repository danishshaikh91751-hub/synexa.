import React, { useState, useEffect } from 'react';
import { SubjectId, Language } from '../types';

interface VideoExplanationCardProps {
  subject: SubjectId;
  language: Language;
  topicTitle: string;
}

interface VideoInfo {
  youtubeId: string;
  mp4Sources: string[];
  thumbnailUrl: string;
  duration: string;
  description: Record<Language, string>;
}

const TOPIC_VIDEOS: Record<SubjectId, VideoInfo> = {
  science: {
    youtubeId: 'sAKy_M43q1k',
    mp4Sources: [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
    ],
    thumbnailUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=80',
    duration: '3:45 mins',
    description: {
      en: 'Watch how green plants convert sunlight, water, and carbon dioxide into energy and oxygen.',
      mr: 'वनस्पती सूर्यप्रकाश, पाणी आणि कार्बन डायऑक्साईड वापरून अन्न व ऑक्सिजन कसे तयार करतात ते पहा.',
      hi: 'देखें कि पौधे सूर्य के प्रकाश, जल और CO₂ से भोजन और ऑक्सीजन कैसे बनाते हैं।',
      gu: 'જુઓ કે વનસ્પતિ સૂર્યપ્રકાશ, પાણી અને CO₂ નો ઉપયોગ કરીને ખોરાક અને ઓક્સિજન કેવી રીતે બનાવે છે.',
      ta: 'தாவரங்கள் சூரிய ஒளி, நீர் மற்றும் CO₂ ஐப் பயன்படுத்தி உணவையும் ஆக்ஸிஜனையும் எவ்வாறு தயாரிக்கின்றன என்பதைப் பாருங்கள்.',
    },
  },
  math: {
    youtubeId: 'p33BY4wgA0k',
    mp4Sources: [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    ],
    thumbnailUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80',
    duration: '4:12 mins',
    description: {
      en: 'Visual step-by-step breakdown of fractions, numerators, denominators, and ratios.',
      mr: 'अंश, छेद आणि अपूर्णांकांची बेरीज चित्रांच्या द्वारे सोप्या भाषेत समजून घ्या.',
      hi: 'अंश, हर और भिन्नों की अवधारणाओं को विजुअल तरीके से समझें।',
      gu: 'અંશ, છેદ અને અપૂર્ણાંકના ખ્યાલોને સરળ દ્રશ્ય રીતે સમજો.',
      ta: 'பின்னங்கள், தொகுதி மற்றும் பகுதிகளை வரைபடங்கள் மூலம் எளிதாக புரிந்து கொள்ளுங்கள்.',
    },
  },
  social_studies: {
    youtubeId: 'cq45y3mR2-c',
    mp4Sources: [
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    ],
    thumbnailUrl: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&auto=format&fit=crop&q=80',
    duration: '3:20 mins',
    description: {
      en: 'Interactive lesson on reading maps, cardinal directions, latitude, longitude, and climate zones.',
      mr: 'नकाशे, अक्षांश, रेखांश आणि पृथ्वीवरील हवामान पट्टे सोप्या पद्धतीने शिका.',
      hi: 'मानचित्र, अक्षांश, देशांतर और पृथ्वी के जलवायु क्षेत्रों को समझें।',
      gu: 'નકશા, અક્ષાંશ, રેખાંશ અને પૃથ્વીના આબોહવા ઝોન વિગતવાર શીખો.',
      ta: 'வரைபடங்கள், அட்சரேகை, தீர்க்கரேகை மற்றும் காலநிலை மண்டலங்களை அறிந்துகொள்ளுங்கள்.',
    },
  },
};

const STRINGS: Record<Language, {
  title: string;
  subtext: string;
  playVideo: string;
  videoUnavailable: string;
  retry: string;
  useFallback: string;
  useYoutube: string;
  playingBadge: string;
}> = {
  mr: {
    title: 'व्हिडिओ स्पष्टीकरण',
    subtext: 'या घटकाचा व्हिडिओ पाहून संकल्पना स्पष्ट करा',
    playVideo: 'व्हिडिओ पाहा (Play Video)',
    videoUnavailable: 'व्हिडिओ उपलब्ध नाही (Video Unavailable)',
    retry: 'पुन्हा प्रयत्न करा (Retry)',
    useFallback: 'थेट व्हिडिओ प्लेयर (Direct MP4 Player)',
    useYoutube: 'यूट्यूब प्लेअर (YouTube Player)',
    playingBadge: 'व्हिडिओ सुरू आहे',
  },
  hi: {
    title: 'वीडियो व्याख्या',
    subtext: 'इस पाठ का वीडियो देखकर अवधारणा को समझें',
    playVideo: 'वीडियो चलाएं (Play Video)',
    videoUnavailable: 'वीडियो उपलब्ध नहीं है (Video Unavailable)',
    retry: 'पुनः प्रयास करें (Retry)',
    useFallback: 'डायरेक्ट वीडियो प्लेयर (Direct MP4 Player)',
    useYoutube: 'यूट्यूब प्लेयर (YouTube Player)',
    playingBadge: 'वीडियो चालू है',
  },
  gu: {
    title: 'વિડિઓ સમજૂતી',
    subtext: 'આ પાઠનો વિડિઓ જોઈને ખ્યાલ સ્પષ્ટ કરો',
    playVideo: 'વિડિઓ જુઓ (Play Video)',
    videoUnavailable: 'વિડિઓ ઉપલબ્ધ નથી (Video Unavailable)',
    retry: 'ફરી પ્રયાસ કરો (Retry)',
    useFallback: 'ડાયરેક્ટ વિડિઓ પ્લેયર (Direct MP4 Player)',
    useYoutube: 'યુટ્યુબ પ્લેયર (YouTube Player)',
    playingBadge: 'વિડિઓ ચાલુ છે',
  },
  ta: {
    title: 'வீடியோ விளக்கம்',
    subtext: 'இந்த பாடத்தின் வீடியோவைப் பார்த்து புரிந்துகொள்ளுங்கள்',
    playVideo: 'வீடியோவை இயக்கு (Play Video)',
    videoUnavailable: 'வீடியோ கிடைக்கவில்லை (Video Unavailable)',
    retry: 'மீண்டும் முயற்சிக்கவும் (Retry)',
    useFallback: 'நேரடி வீடியோ பிளேயர் (Direct MP4 Player)',
    useYoutube: 'யூடியூப் பிளேயர் (YouTube Player)',
    playingBadge: 'வீடியோ இயங்குகிறது',
  },
  en: {
    title: 'Video Explanation',
    subtext: 'Watch a clear visual video breakdown for this lesson',
    playVideo: 'Play Video',
    videoUnavailable: 'Video Unavailable',
    retry: 'Retry Video',
    useFallback: 'Switch to Direct MP4 Player',
    useYoutube: 'Switch to YouTube Player',
    playingBadge: 'Now Playing',
  },
};

export const VideoExplanationCard: React.FC<VideoExplanationCardProps> = ({
  subject,
  language,
  topicTitle,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [playerMode, setPlayerMode] = useState<'mp4' | 'youtube'>('mp4');
  const [activeSourceIndex, setActiveSourceIndex] = useState<number>(0);

  // Reset states when subject or topic changes
  useEffect(() => {
    setIsPlaying(false);
    setHasError(false);
    setPlayerMode('mp4');
    setActiveSourceIndex(0);
  }, [subject, topicTitle]);

  const videoInfo = TOPIC_VIDEOS[subject] || TOPIC_VIDEOS.science;
  const langStrings = STRINGS[language] || STRINGS.en;
  const descriptionText = videoInfo.description[language] || videoInfo.description.en;

  const handlePlay = () => {
    setHasError(false);
    setIsPlaying(true);
  };

  const handleVideoError = () => {
    if (playerMode === 'mp4' && activeSourceIndex < videoInfo.mp4Sources.length - 1) {
      // Try next MP4 source
      setActiveSourceIndex((prev) => prev + 1);
    } else if (playerMode === 'mp4') {
      // Switch to YouTube as fallback
      setPlayerMode('youtube');
    } else {
      // Both failed
      setHasError(true);
    }
  };

  const handleRetry = () => {
    setHasError(false);
    setActiveSourceIndex(0);
    setPlayerMode('mp4');
    setIsPlaying(true);
  };

  const currentMp4 = videoInfo.mp4Sources[activeSourceIndex] || videoInfo.mp4Sources[0];

  return (
    <div className="w-full bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl transition-all">
      {/* Header Bar */}
      <div className="px-5 py-3.5 bg-slate-950/80 border-b border-white/10 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
            <span className="material-symbols-outlined text-lg">play_circle</span>
          </span>
          <div>
            <h3 className="text-sm font-extrabold text-white leading-none flex items-center gap-2">
              <span>{langStrings.title}</span>
              <span className="text-[10px] bg-cyan-400/20 text-cyan-300 font-bold px-2 py-0.5 rounded-md border border-cyan-400/30">
                Grade 7 • {subject.toUpperCase()}
              </span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {topicTitle}
            </p>
          </div>
        </div>

        {isPlaying && !hasError && (
          <span className="flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 font-bold text-xs px-3 py-1 rounded-full border border-emerald-500/30 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{langStrings.playingBadge}</span>
          </span>
        )}
      </div>

      {/* Video Content Container */}
      <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
        {hasError ? (
          /* Error / Video Unavailable State */
          <div className="p-6 text-center space-y-3 max-w-md animate-in fade-in">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/30">
              <span className="material-symbols-outlined text-3xl">videocam_off</span>
            </div>
            <div>
              <h4 className="text-base font-extrabold text-white">
                {langStrings.videoUnavailable}
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                Unable to load video stream for "{topicTitle}". Please click retry to reload the lesson player.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRetry}
                className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-cyan-500/20"
              >
                <span className="material-symbols-outlined text-base">refresh</span>
                <span>{langStrings.retry}</span>
              </button>
            </div>
          </div>
        ) : !isPlaying ? (
          /* Thumbnail & Play Overlay */
          <div className="relative w-full h-full group cursor-pointer" onClick={handlePlay}>
            <img
              src={videoInfo.thumbnailUrl}
              alt={topicTitle}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-between p-5">
              {/* Top Tag */}
              <div className="flex justify-between items-start">
                <span className="bg-slate-900/90 text-slate-200 text-xs font-extrabold px-3 py-1 rounded-full border border-white/10 backdrop-blur-md flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-cyan-400">schedule</span>
                  <span>{videoInfo.duration}</span>
                </span>
              </div>

              {/* Center Play Button */}
              <div className="self-center flex flex-col items-center gap-3 my-auto">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlay();
                  }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 flex items-center justify-center shadow-2xl shadow-cyan-500/50 group-hover:scale-110 active:scale-95 transition-all cursor-pointer"
                  aria-label="Play video"
                >
                  <span className="material-symbols-outlined text-4xl sm:text-5xl ml-1">play_arrow</span>
                </button>
                <span className="bg-slate-900/90 text-white font-extrabold text-xs px-4 py-1.5 rounded-full border border-cyan-400/30 backdrop-blur-md shadow-lg">
                  {langStrings.playVideo}
                </span>
              </div>

              {/* Bottom Description */}
              <div className="bg-slate-900/80 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
                <p className="text-xs text-slate-200 font-medium line-clamp-2">
                  {descriptionText}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Active Player Mode */
          <div className="w-full h-full relative bg-black flex items-center justify-center">
            {playerMode === 'mp4' ? (
              <video
                key={`${subject}-${activeSourceIndex}`}
                src={currentMp4}
                controls
                autoPlay
                playsInline
                preload="auto"
                poster={videoInfo.thumbnailUrl}
                className="w-full h-full object-contain"
                onError={handleVideoError}
              />
            ) : (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoInfo.youtubeId}?autoplay=1&rel=0`}
                title={topicTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            )}
          </div>
        )}
      </div>

      {/* Footer Controls & Switcher */}
      <div className="px-5 py-3 bg-slate-950 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-sm text-cyan-400">smart_display</span>
          <span className="font-semibold text-slate-300">{descriptionText}</span>
        </div>

        {isPlaying && !hasError && (
          <button
            onClick={() => setPlayerMode(playerMode === 'mp4' ? 'youtube' : 'mp4')}
            className="text-cyan-400 hover:text-cyan-300 font-extrabold text-[11px] underline underline-offset-2 flex items-center gap-1 cursor-pointer ml-auto"
          >
            <span>{playerMode === 'mp4' ? langStrings.useYoutube : langStrings.useFallback}</span>
          </button>
        )}
      </div>
    </div>
  );
};
