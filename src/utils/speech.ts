import { Language } from '../types';

const BCP47_LOCALE_MAP: Record<string, string> = {
  mr: 'mr-IN',
  hi: 'hi-IN',
  en: 'en-US',
  gu: 'gu-IN',
  ta: 'ta-IN',
  'en-US': 'en-US',
  'en-GB': 'en-GB',
  'mr-IN': 'mr-IN',
  'hi-IN': 'hi-IN',
  'gu-IN': 'gu-IN',
  'ta-IN': 'ta-IN',
};

const LANGUAGE_NAMES: Record<string, string[]> = {
  mr: ['marathi', 'मराठी', 'mr-in', 'mr_in', 'mr'],
  hi: ['hindi', 'हिंदी', 'hi-in', 'hi_in', 'hi'],
  en: ['english', 'en-us', 'en_us', 'en-gb', 'en_gb', 'en'],
  gu: ['gujarati', 'ગુજરાતી', 'gu-in', 'gu_in', 'gu'],
  ta: ['tamil', 'தமிழ்', 'ta-in', 'ta_in', 'ta'],
};

export function speakText(text: string, lang: string = 'en') {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('SpeechSynthesis is not supported in this environment.');
    return;
  }

  // Cancel any currently playing speech before starting new speech
  try {
    window.speechSynthesis.cancel();
  } catch (err) {
    console.error('Error cancelling speech synthesis:', err);
  }

  if (!text || !text.trim()) return;

  const targetLocale =
    BCP47_LOCALE_MAP[lang] ||
    (lang.includes('-') ? lang : `${lang}-IN`);

  const langCode = lang.split('-')[0].toLowerCase();

  const executeSpeech = () => {
    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.lang = targetLocale;

      const voices = window.speechSynthesis.getVoices();

      if (voices && voices.length > 0) {
        const targetLocaleNorm = targetLocale.toLowerCase().replace('_', '-');
        const langPrefix = langCode;

        // 1. Exact locale match (e.g. 'mr-IN')
        let matchedVoice = voices.find(
          (v) => v.lang.toLowerCase().replace('_', '-') === targetLocaleNorm
        );

        // 2. Language prefix match (e.g. 'mr' prefix)
        if (!matchedVoice) {
          matchedVoice = voices.find((v) => {
            const vLang = v.lang.toLowerCase().replace('_', '-');
            return vLang.startsWith(langPrefix + '-') || vLang === langPrefix;
          });
        }

        // 3. Name or language keyword match (e.g. 'Marathi', 'Hindi', etc.)
        if (!matchedVoice) {
          const searchKeywords = LANGUAGE_NAMES[langPrefix] || [langPrefix];
          matchedVoice = voices.find((v) => {
            const nameLower = v.name.toLowerCase();
            const langLower = v.lang.toLowerCase();
            return searchKeywords.some(
              (kw) => nameLower.includes(kw) || langLower.includes(kw)
            );
          });
        }

        if (matchedVoice) {
          utterance.voice = matchedVoice;
          utterance.lang = matchedVoice.lang;
        } else {
          console.info(
            `No explicit browser voice found for '${lang}' (${targetLocale}). Falling back to browser default engine for locale '${targetLocale}'.`
          );
        }
      }

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error('SpeechSynthesis error:', e);
    }
  };

  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) {
    let resolved = false;

    const handleVoicesChanged = () => {
      if (resolved) return;
      resolved = true;
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      executeSpeech();
    };

    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);

    setTimeout(() => {
      if (resolved) return;
      resolved = true;
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
      executeSpeech();
    }, 200);
  } else {
    executeSpeech();
  }
}


