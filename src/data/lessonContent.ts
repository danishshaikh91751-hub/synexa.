import { Language, SnapExplanationMode, MotherTongueBridge, SubjectId } from '../types';

export interface LessonContent {
  title: string;
  subtitle: string;
  overview: string;
  ingredients: {
    icon: string;
    name: string;
    desc: string;
  }[];
  equation: {
    formula: string;
    text: string;
  };
  explanationModes: Record<SnapExplanationMode, {
    modeTitle: string;
    content: string;
  }>;
  bridgeCard: MotherTongueBridge;
}

export const PHOTOSYNTHESIS_LESSONS: Record<Language, LessonContent> = {
  mr: {
    title: 'प्रकाशसंश्लेषण (Photosynthesis)',
    subtitle: 'वनस्पती सूर्यप्रकाश, पाणी आणि कार्बन डायऑक्साइड वापरून स्वतःचे अन्न कसे तयार करतात.',
    overview: 'जसे आपल्या घरात अन्न शिजवण्यासाठी स्वयंपाकघर असते, तसेच वनस्पतींचे स्वयंपाकघर म्हणजे त्यांची हिरवी पाने होय! पानांमध्ये हरितद्रव्य (Chlorophyll) असते, जे सूर्यप्रकाश शोषून घेते आणि पाण्यासोबत रासायनिक प्रक्रिया करून ग्लुकोज (अन्न) आणि ऑक्सिजन तयार करते.',
    ingredients: [
      { icon: '☀️', name: 'सूर्यप्रकाश (Sunlight)', desc: 'हरितद्रव्याद्वारे शोषलेली ऊर्जेची मुख्य ताकद.' },
      { icon: '💧', name: 'पाणी (Water)', desc: 'मुळे जमिनीतून शोषून पानांपर्यंत पोहोचवतात.' },
      { icon: '💨', name: 'कार्बन डायऑक्साइड (CO₂)', desc: 'पानावरील सूक्ष्म छिद्रांमधून (पर्णरंध्रे) हवेतून शोषला जातो.' },
    ],
    equation: {
      formula: '6 CO₂ + 6 H₂O + सूर्यप्रकाश → C₆H₁₂O₆ + 6 O₂',
      text: 'कार्बन डायऑक्साइड + पाणी + सूर्यप्रकाश → ग्लुकोज (अन्न) + ऑक्सिजन',
    },
    explanationModes: {
      simple: {
        modeTitle: 'सोपे स्पष्टीकरण (Simple Explanation)',
        content: 'वनस्पती सूर्यप्रकाश आणि पाणी वापरून पानांमध्ये अन्न तयार करतात. या प्रक्रियेत त्या आपल्याला श्वास घेण्यासाठी शुद्ध ऑक्सिजन देतात.',
      },
      step_by_step: {
        modeTitle: 'टप्प्याटप्प्याने (Step-by-Step)',
        content: '१. मुळे जमिनीतून पाणी शोषतात.\n२. पर्णरंध्रे हवेतून कार्बन डायऑक्साइड घेतात.\n३. हरितद्रव्य सूर्यप्रकाश शोषून घेते.\n४. ग्लुकोज (अन्न) तयार होते आणि ऑक्सिजन हवेत सोडला जातो.',
      },
      real_life: {
        modeTitle: 'दैनंदिन उदाहरण (Real-Life Example)',
        content: 'जसे सोलर कुकर सूर्यप्रकाशाच्या उष्णतेने डाळ-भात शिजवतो, तसेच वनस्पतींचे पान सूर्यप्रकाशाने कार्बन डायऑक्साइड व पाण्याचे अन्नात रूपांतर करते.',
      },
      story: {
        modeTitle: 'गोष्टीच्या रूपात (Story Mode)',
        content: 'एक लहानसे हिरवे पान रोज सकाळी सूर्याला नमस्कार करते. सूर्याची किरणे येताच पान जमिनीतील पाणी आणि हवेतील वायू एकत्र करून झाडासाठी गोड ग्लुकोजची मेजवानी तयार करते!',
      },
      exam_answer: {
        modeTitle: 'परीक्षेसाठी उत्तर (Exam Ready Answer)',
        content: 'प्रकाशसंश्लेषण म्हणजे सूर्यप्रकाशाच्या उपस्थितीत वनस्पतींच्या पानांमध्ये हरितद्रव्याच्या साहाय्याने कार्बन डायऑक्साइड आणि पाणी यांपासून ग्लुकोज व ऑक्सिजन तयार होण्याची जैविक रासायनिक प्रक्रिया होय.',
      },
    },
    bridgeCard: {
      conceptEnglish: 'Photosynthesis',
      motherTongueTerm: 'प्रकाशसंश्लेषण',
      motherTongueExplanation: 'सूर्यप्रकाशाच्या साहाय्याने वनस्पतींनी स्वतःचे अन्न तयार करण्याची प्रक्रिया.',
      englishTerminology: 'Photosynthesis & Chlorophyll',
      pronunciation: 'foh-toh-sin-thuh-sis',
      examReadyEnglishAnswer: 'Photosynthesis is the process by which green plants synthesize nutrients from carbon dioxide and water using sunlight absorbed by chlorophyll.',
      academicTerms: [
        { id: 't1', englishTerm: 'Photosynthesis', motherTongueTerm: 'प्रकाशसंश्लेषण', motherTongueMeaning: 'सूर्यप्रकाशाच्या साहाय्याने अन्न तयार करण्याची प्रक्रिया', pronunciation: 'foh-toh-sin-thuh-sis' },
        { id: 't2', englishTerm: 'Chlorophyll', motherTongueTerm: 'हरितद्रव्य', motherTongueMeaning: 'सूर्यप्रकाश शोषून घेणारा पानांमधील हिरवा रंगद्रव्य', pronunciation: 'klor-uh-fil' },
        { id: 't3', englishTerm: 'Stomata', motherTongueTerm: 'पर्णरंध्रे', motherTongueMeaning: 'पानावरील सूक्ष्म छिद्रे ज्याद्वारे कार्बन डायऑक्साइड शोषला जातो', pronunciation: 'stoh-mah-tuh' },
        { id: 't4', englishTerm: 'Glucose', motherTongueTerm: 'ग्लुकोज (अन्न)', motherTongueMeaning: 'प्रकाशसंश्लेषणादरम्यान तयार होणारे वनस्पतींचे अन्न', pronunciation: 'gloo-kohss' },
        { id: 't5', englishTerm: 'Carbon Dioxide', motherTongueTerm: 'कार्बन डायऑक्साइड', motherTongueMeaning: 'वनस्पतींद्वारे हवेतून घेतला जाणारा वायू', pronunciation: 'kahr-buhn dy-ok-syd' },
      ],
    },
  },
  hi: {
    title: 'प्रकाश-संश्लेषण (Photosynthesis)',
    subtitle: 'पौधे सूर्य के प्रकाश, जल और कार्बन डाइऑक्साइड का उपयोग करके अपना भोजन कैसे बनाते हैं।',
    overview: 'जैसे हमारे घरों में रसोईघर होता है, वैसे ही पौधों का रसोईघर उनकी हरी पत्तियाँ हैं! पत्तियों में क्लोरोफ़िल (हरितलवक) होता है जो सूर्य के प्रकाश को अवशोषित करता है और जल व कार्बन डाइऑक्साइड से ग्लूकोज (भोजन) तथा ऑक्सीजन बनाता है।',
    ingredients: [
      { icon: '☀️', name: 'सूर्य का प्रकाश (Sunlight)', desc: 'क्लोरोफिल द्वारा अवशोषित सौर ऊर्जा।' },
      { icon: '💧', name: 'जल (Water)', desc: 'जड़ों द्वारा मिट्टी से अवशोषित होकर पत्तियों तक पहुँचता है।' },
      { icon: '💨', name: 'कार्बन डाइऑक्साइड (CO₂)', desc: 'पत्तियों के सूक्ष्म छिद्रों (रंध्र / Stomata) से वायु से लिया जाता है।' },
    ],
    equation: {
      formula: '6 CO₂ + 6 H₂O + सूर्यप्रकाश → C₆H₁₂O₆ + 6 O₂',
      text: 'कार्बन डाइऑक्साइड + जल + सूर्यप्रकाश → ग्लूकोज (भोजन) + ऑक्सीजन',
    },
    explanationModes: {
      simple: {
        modeTitle: 'सरल व्याख्या (Simple Explanation)',
        content: 'पौधे धूप और पानी का उपयोग करके अपनी पत्तियों में भोजन बनाते हैं और हमें सांस लेने के लिए ताजा ऑक्सीजन देते हैं।',
      },
      step_by_step: {
        modeTitle: 'चरण-दर-चरण (Step-by-Step)',
        content: '1. जड़ें मिट्टी से पानी सोखती हैं।\n2. रंध्र (Stomata) हवा से कार्बन डाइऑक्साइड लेते हैं।\n3. क्लोरोफिल धूप को अवशोषित करता है।\n4. ग्लूकोज बनता है और ऑक्सीजन हवा में मुक्त होती है।',
      },
      real_life: {
        modeTitle: 'रियल-लाइफ़ उदाहरण (Real-Life Example)',
        content: 'जैसे सोलर कुकर सूरज की गर्मी से खाना पकाता है, वैसे ही हरी पत्तियाँ धूप की मदद से पौधे का खाना तैयार करती हैं।',
      },
      story: {
        modeTitle: 'कहानी के रूप में (Story Mode)',
        content: 'एक छोटी हरी पत्ती रोज सुबह सूरज का स्वागत करती है। धूप की किरणें आते ही पत्ती पानी और हवा को मिलाकर पूरे पेड़ के लिए मीठा ग्लूकोज बनाती है!',
      },
      exam_answer: {
        modeTitle: 'परीक्षा उत्तर (Exam Ready Answer)',
        content: 'प्रकाश-संश्लेषण वह जैव-रासायनिक प्रक्रिया है जिसमें हरे पौधे सूर्य के प्रकाश और क्लोरोफिल की उपस्थिति में कार्बन डाइऑक्साइड और जल से ग्लूकोज तथा ऑक्सीजन का निर्माण करते हैं।',
      },
    },
    bridgeCard: {
      conceptEnglish: 'Photosynthesis',
      motherTongueTerm: 'प्रकाश-संश्लेषण',
      motherTongueExplanation: 'पौधों द्वारा धूप और पानी की मदद से भोजन बनाने की प्रक्रिया।',
      englishTerminology: 'Photosynthesis & Chlorophyll',
      pronunciation: 'foh-toh-sin-thuh-sis',
      examReadyEnglishAnswer: 'Photosynthesis is the chemical process by which green plants prepare glucose from carbon dioxide and water using energy from sunlight.',
      academicTerms: [
        { id: 't1', englishTerm: 'Photosynthesis', motherTongueTerm: 'प्रकाश-संश्लेषण', motherTongueMeaning: 'पौधों द्वारा धूप की मदद से भोजन बनाने की प्रक्रिया', pronunciation: 'foh-toh-sin-thuh-sis' },
        { id: 't2', englishTerm: 'Chlorophyll', motherTongueTerm: 'क्लोरोफिल (हरितलवक)', motherTongueMeaning: 'पत्तियों का वह हरा वर्णक जो धूप को अवशोषित करता है', pronunciation: 'klor-uh-fil' },
        { id: 't3', englishTerm: 'Stomata', motherTongueTerm: 'रंध्र (Stomata)', motherTongueMeaning: 'पत्तियों के सूक्ष्म छिद्र जिनसे कार्बन डाइऑक्साइड ली जाती है', pronunciation: 'stoh-mah-tuh' },
        { id: 't4', englishTerm: 'Glucose', motherTongueTerm: 'ग्लूकोज', motherTongueMeaning: 'प्रकाश-संश्लेषण में बनने वाला पौधों का भोजन', pronunciation: 'gloo-kohss' },
        { id: 't5', englishTerm: 'Carbon Dioxide', motherTongueTerm: 'कार्बन डाइऑक्साइड', motherTongueMeaning: 'हवा में मौजूद गैस जिसे पौधे अवशोषित करते हैं', pronunciation: 'kahr-buhn dy-ok-syd' },
      ],
    },
  },
  en: {
    title: 'Photosynthesis',
    subtitle: 'How green plants synthesize glucose using solar energy, water, and carbon dioxide.',
    overview: 'Just like your house has a kitchen where meals are prepared, green leaves are the kitchens of plants! Inside leaves, chlorophyll absorbs sunlight and converts carbon dioxide and water into glucose and oxygen.',
    ingredients: [
      { icon: '☀️', name: 'Sunlight', desc: 'Solar energy absorbed by chlorophyll pigment.' },
      { icon: '💧', name: 'Water (H₂O)', desc: 'Absorbed from soil moisture by roots.' },
      { icon: '💨', name: 'Carbon Dioxide (CO₂)', desc: 'Absorbed from ambient air through leaf stomata.' },
    ],
    equation: {
      formula: '6 CO₂ + 6 H₂O + Sunlight → C₆H₁₂O₆ + 6 O₂',
      text: 'Carbon Dioxide + Water + Light → Glucose + Oxygen',
    },
    explanationModes: {
      simple: {
        modeTitle: 'Simple Explanation',
        content: 'Plants use sunlight and water inside their green leaves to make food and release oxygen into the air for us to breathe.',
      },
      step_by_step: {
        modeTitle: 'Step-by-Step Breakdown',
        content: '1. Roots absorb water from soil.\n2. Stomata absorb carbon dioxide from air.\n3. Chlorophyll captures solar energy.\n4. Chemical reaction creates glucose and releases oxygen.',
      },
      real_life: {
        modeTitle: 'Real-Life Analogy',
        content: 'Think of a solar-powered kitchen oven. The sun powers the oven, water and carbon dioxide are the raw ingredients, and glucose is the baked loaf of bread!',
      },
      story: {
        modeTitle: 'Story Mode',
        content: 'Every morning, Little Leaf stretches towards the warm sun. Working together with Root Hairs and Air Pores, Leaf mixes sunshine and water to cook a delicious feast of energy for the whole tree!',
      },
      exam_answer: {
        modeTitle: 'Exam-Ready Definition',
        content: 'Photosynthesis is the biochemical process by which chlorophyll-containing cells in green plants convert light energy into chemical energy, producing glucose and oxygen from carbon dioxide and water.',
      },
    },
    bridgeCard: {
      conceptEnglish: 'Photosynthesis',
      motherTongueTerm: 'Photosynthesis (प्रकाशसंश्लेषण)',
      motherTongueExplanation: 'The process of plants manufacturing food using solar radiation.',
      englishTerminology: 'Photosynthesis & Chlorophyll',
      pronunciation: 'foh-toh-sin-thuh-sis',
      examReadyEnglishAnswer: 'Photosynthesis is the chemical process by which green plants manufacture carbohydrates from carbon dioxide and water using sunlight absorbed by chlorophyll.',
      academicTerms: [
        { id: 't1', englishTerm: 'Photosynthesis', motherTongueTerm: 'Photosynthesis', motherTongueMeaning: 'Process of plants producing glucose using solar light energy', pronunciation: 'foh-toh-sin-thuh-sis' },
        { id: 't2', englishTerm: 'Chlorophyll', motherTongueTerm: 'Chlorophyll', motherTongueMeaning: 'Green pigment inside plant leaves absorbing solar light', pronunciation: 'klor-uh-fil' },
        { id: 't3', englishTerm: 'Stomata', motherTongueTerm: 'Stomata', motherTongueMeaning: 'Microscopic pores on leaf surface for carbon dioxide intake', pronunciation: 'stoh-mah-tuh' },
        { id: 't4', englishTerm: 'Glucose', motherTongueTerm: 'Glucose', motherTongueMeaning: 'Carbohydrate food synthesized during photosynthesis', pronunciation: 'gloo-kohss' },
        { id: 't5', englishTerm: 'Carbon Dioxide', motherTongueTerm: 'Carbon Dioxide (CO₂)', motherTongueMeaning: 'Atmospheric gas absorbed by leaf stomata', pronunciation: 'kahr-buhn dy-ok-syd' },
      ],
    },
  },
  gu: {
    title: 'પ્રકાશસંશ્લેષણ (Photosynthesis)',
    subtitle: 'છોડ સૂર્યપ્રકાશ, પાણી અને કાર્બન ડાયોક્સાઇડનો ઉપયોગ કરીને પોતાનો ખોરાક કેવી રીતે બનાવે છે.',
    overview: 'જેમ આપણા ઘરમાં રસોડું હોય છે, તેમ છોડનું રસોડું તેમના લીલાં પાંદડાં છે! પાંદડાંમાં હરિતદ્રવ્ય (Chlorophyll) હોય છે જે સૂર્યપ્રકાશ શોષી લે છે અને ગ્લુકોઝ તથા ઓક્સિજન બનાવે છે.',
    ingredients: [
      { icon: '☀️', name: 'સૂર્યપ્રકાશ (Sunlight)', desc: 'હરિતદ્રવ્ય દ્વારા શોષાતી સૂર્ય ઊર્જા.' },
      { icon: '💧', name: 'પાણી (Water)', desc: 'મૂળ દ્વારા જમીનમાંથી શોષાઈને પાંદડાં સુધી પહોંચે છે.' },
      { icon: '💨', name: 'કાર્બન ડાયોક્સાઇડ (CO₂)', desc: 'પર્ણરંધ્ર (Stomata) દ્વારા હવામાંથી લેવામાં આવે છે.' },
    ],
    equation: {
      formula: '6 CO₂ + 6 H₂O + સૂર્યપ્રકાશ → C₆H₁₂O₆ + 6 O₂',
      text: 'કાર્બન ડાયોક્સાઇડ + પાણી + સૂર્યપ્રકાશ → ગ્લુકોઝ + ઓક્સિજન',
    },
    explanationModes: {
      simple: {
        modeTitle: 'સરળ સમજૂતી (Simple Explanation)',
        content: 'છોડ તડકો અને પાણી વાપરીને પાંદડાંમાં ખોરાક બનાવે છે અને આપણને શ્વાસ લેવા માટે ઓક્સિજન આપે છે.',
      },
      step_by_step: {
        modeTitle: 'તબક્કાવાર (Step-by-Step)',
        content: '1. મૂળ જમીનમાંથી પાણી શોષે છે.\n2. પર્ણરંધ્ર હવામાંથી કાર્બન ડાયોક્સાઇડ લે છે.\n3. હરિતદ્રવ્ય તડકો શોષે છે.\n4. ખોરાક (ગ્લુકોઝ) બને છે અને ઓક્સિજન બહાર નીકળે છે.',
      },
      real_life: {
        modeTitle: 'વાસ્તવિક દ્રષ્ટાંત (Real-Life Example)',
        content: 'જેમ સોલર કુકર સૂર્યની ગરમીથી રસોઈ બનાવે છે, તેમ લીલાં પાંદડાં સૂર્યપ્રકાશની મદદથી છોડનો ખોરાક તૈયાર કરે છે.',
      },
      story: {
        modeTitle: 'વાર્તા રૂપે (Story Mode)',
        content: 'એક નાનું લીલું પાંદડું રોજ સવારે સૂરજદાદાને પ્રણામ કરે છે. તડકો આવતાં જ પાંદડું પાણી અને હવા ભેગા કરીને ઝાડ માટે મીઠો ગ્લુકોઝ તૈયાર કરે છે!',
      },
      exam_answer: {
        modeTitle: 'પરીક્ષા ઉત્તર (Exam Ready Answer)',
        content: 'પ્રકાશસંશ્લેષણ એ એવી જૈવરાસાયણિક પ્રક્રિયા છે જેમાં લીલી વનસ્પતિ સૂર્યપ્રકાશ અને હરિતદ્રવ્યની હાજરીમાં કાર્બન ડાયોક્સાઇડ અને પાણીમાંથી ગ્લુકોઝ તથા ઓક્સિજન બનાવે છે.',
      },
    },
    bridgeCard: {
      conceptEnglish: 'Photosynthesis',
      motherTongueTerm: 'પ્રકાશસંશ્લેષણ',
      motherTongueExplanation: 'સૂર્યપ્રકાશની મદદથી છોડ ખોરાક બનાવે તે પ્રક્રિયા.',
      englishTerminology: 'Photosynthesis & Chlorophyll',
      pronunciation: 'foh-toh-sin-thuh-sis',
      examReadyEnglishAnswer: 'Photosynthesis is the process by which green plants prepare food using sunlight, water, and carbon dioxide.',
      academicTerms: [
        { id: 't1', englishTerm: 'Photosynthesis', motherTongueTerm: 'પ્રકાશસંશ્લેષણ', motherTongueMeaning: 'સૂર્યપ્રકાશની મદદથી છોડ ખોરાક બનાવે તે પ્રક્રિયા', pronunciation: 'foh-toh-sin-thuh-sis' },
        { id: 't2', englishTerm: 'Chlorophyll', motherTongueTerm: 'હરિતદ્રવ્ય', motherTongueMeaning: 'સૂર્યપ્રકાશ શોષી લેતો પાંદડાંનો લીલો રંગદ્રવ્ય', pronunciation: 'klor-uh-fil' },
        { id: 't3', englishTerm: 'Stomata', motherTongueTerm: 'પર્ણરંધ્ર', motherTongueMeaning: 'પાંદડાંના નાના છિદ્રો જેથી કાર્બન ડાયોક્સાઇડ લેવાય છે', pronunciation: 'stoh-mah-tuh' },
        { id: 't4', englishTerm: 'Glucose', motherTongueTerm: 'ગ્લુકોઝ', motherTongueMeaning: 'પ્રકાશસંશ્લેષણ દરમિયાન બનતો ખોરાક', pronunciation: 'gloo-kohss' },
        { id: 't5', englishTerm: 'Carbon Dioxide', motherTongueTerm: 'કાર્બન ડાયોક્સાઇડ', motherTongueMeaning: 'હવામાંથી છોડ દ્વારા શોષાતો વાયુ', pronunciation: 'kahr-buhn dy-ok-syd' },
      ],
    },
  },
  ta: {
    title: 'ஒளிச்சேர்க்கை (Photosynthesis)',
    subtitle: 'தாவரங்கள் சூரிய ஒளி, நீர் மற்றும் கார்பன் டை ஆக்சைடு பயன்படுத்தி எவ்வாறு உணவு தயாரிக்கின்றன.',
    overview: 'நமது வீட்டில் சமையலறை இருப்பது போல, தாவரங்களின் சமையலறை அவற்றின் பச்சை இலைகள் ஆகும்! இலைகளில் உள்ள பச்சையம் (Chlorophyll) சூரிய ஒளியை ஈர்த்து உணவு (க்ளூக்கோஸ்) மற்றும் ஆக்சிஜனை உருவாக்குகிறது.',
    ingredients: [
      { icon: '☀️', name: 'சூரிய ஒளி (Sunlight)', desc: 'பச்சையத்தால் ஈர்க்கப்படும் சூரிய ஆற்றல்.' },
      { icon: '💧', name: 'நீர் (Water)', desc: 'வேர்கள் மூலம் மண்ணிலிருந்து உறிஞ்சப்படுகிறது.' },
      { icon: '💨', name: 'கார்பன் டை ஆக்சைடு (CO₂)', desc: 'இலைத் துளைகள் (Stomata) மூலம் காற்றிலிருந்து பெறப்படுகிறது.' },
    ],
    equation: {
      formula: '6 CO₂ + 6 H₂O + சூரிய ஒளி → C₆H₁₂O₆ + 6 O₂',
      text: 'கார்பன் டை ஆக்சைடு + நீர் + சூரிய ஒளி → க்ளூக்கோஸ் + ஆக்சிஜன்',
    },
    explanationModes: {
      simple: {
        modeTitle: 'எளிய விளக்கம் (Simple Explanation)',
        content: 'தாவரங்கள் சூரிய ஒளி மற்றும் நீரைப் பயன்படுத்தி இலைகளில் உணவு தயாரித்து, நமக்கு ஆக்சிஜனை வெளியிடுகின்றன.',
      },
      step_by_step: {
        modeTitle: 'படி படியாக (Step-by-Step)',
        content: '1. வேர்கள் மண்ணிலிருந்து நீரை உறிஞ்சுகின்றன.\n2. இலைத் துளைகள் காற்றிலிருந்து CO₂ ஐ பெறுகின்றன.\n3. பச்சையம் சூரிய ஒளியை ஈர்க்கிறது.\n4. உணவு தயாராகி ஆக்சிஜன் வெளியாகிறது.',
      },
      real_life: {
        modeTitle: 'நடைமுறை உதாரணம் (Real-Life Example)',
        content: 'சோலார் குக்கர் சூரிய ஒளியில் சமைப்பது போல, பச்சை இலைகள் சூரிய ஒளியைப் பயன்படுத்தி தாவரத்தின் உணவைச் சமைக்கின்றன.',
      },
      story: {
        modeTitle: 'கதை வடிவில் (Story Mode)',
        content: 'ஒரு சிறிய பச்சை இலை தினமும் காலையில் சூரியனை வரவேற்கிறது. சூரிய ஒளி பட்டதும் இலை நீரையும காற்றையும் சேர்த்து மரத்திற்கு சுவையான உணவை தயாரிக்கிறது!',
      },
      exam_answer: {
        modeTitle: 'தேர்வு விடை (Exam Ready Answer)',
        content: 'ஒளிச்சேர்க்கை என்பது பச்சையம் கொண்ட தாவரங்கள் சூரிய ஒளியின் முன்னிலையில் நீர் மற்றும் கார்பன் டை ஆக்சைடைப் பயன்படுத்தி க்ளூக்கோஸ் மற்றும் ஆக்சிஜனை தயாரிக்கும் உயிர வேதியியல் நிகழ்வாகும்.',
      },
    },
    bridgeCard: {
      conceptEnglish: 'Photosynthesis',
      motherTongueTerm: 'ஒளிச்சேர்க்கை',
      motherTongueExplanation: 'சூரிய ஒளியின் உதவியுடன் தாவரங்கள் உணவு தயாரிக்கும் முறை.',
      englishTerminology: 'Photosynthesis & Chlorophyll',
      pronunciation: 'foh-toh-sin-thuh-sis',
      examReadyEnglishAnswer: 'Photosynthesis is the process by which green plants manufacture glucose using sunlight, water, and carbon dioxide.',
      academicTerms: [
        { id: 't1', englishTerm: 'Photosynthesis', motherTongueTerm: 'ஒளிச்சேர்க்கை', motherTongueMeaning: 'சூரிய ஒளியின் உதவியுடன் தாவரங்கள் உணவு தயாரிக்கும் முறை', pronunciation: 'foh-toh-sin-thuh-sis' },
        { id: 't2', englishTerm: 'Chlorophyll', motherTongueTerm: 'பச்சையம்', motherTongueMeaning: 'சூரிய ஒளியை ஈர்க்கும் இலையின் பச்சை நிறமி', pronunciation: 'klor-uh-fil' },
        { id: 't3', englishTerm: 'Stomata', motherTongueTerm: 'இலைத் துளைகள்', motherTongueMeaning: 'வாயுக்களை உறிஞ்சும் இலையின் நுண் துளைகள்', pronunciation: 'stoh-mah-tuh' },
        { id: 't4', englishTerm: 'Glucose', motherTongueTerm: 'க்ளூக்கோஸ்', motherTongueMeaning: 'ஒளிச்சேர்க்கையின் போது உருவாகும் உணவு', pronunciation: 'gloo-kohss' },
        { id: 't5', englishTerm: 'Carbon Dioxide', motherTongueTerm: 'கார்பன் டை ஆக்சைடு', motherTongueMeaning: 'தாவரங்கள் உறிஞ்சும் காற்று வாயு', pronunciation: 'kahr-buhn dy-ok-syd' },
      ],
    },
  },
};

export const MATH_LESSONS: Record<Language, LessonContent> = {
  mr: {
    title: 'अपूर्णांक आणि गुणोत्तर (Fractions & Ratios)',
    subtitle: 'गणितातील अपूर्णांक, अंश-छेद आणि प्रमाणांची तुलना कशी करावी.',
    overview: 'अपूर्णांक म्हणजे संपूर्ण वस्तूचा एक भाग होय! जसे की १ पिझ्झाचे ४ समान भाग केले तर १ भाग म्हणजे १/४ भाग होय. गुणोत्तर दोन प्रमाणांची तुलना करते.',
    ingredients: [
      { icon: '🔢', name: 'अंश (Numerator)', desc: 'अपूर्णांकाच्या वरील भाग जो घेतलेले भाग दर्शवतो.' },
      { icon: '📏', name: 'छेद (Denominator)', desc: 'अपूर्णांकाच्या खालील भाग जो एकूण समान भाग दर्शवतो.' },
      { icon: '⚖️', name: 'गुणोत्तर (Ratio)', desc: 'दोन संख्यांची तुलना (उदा. २:३).' },
    ],
    equation: {
      formula: 'अपूर्णांक = अंश / छेद | गुणोत्तर = a : b',
      text: '३ / ४ = ७५% | २ आणि ३ चे गुणोत्तर = २:३',
    },
    explanationModes: {
      simple: {
        modeTitle: 'सोपे स्पष्टीकरण (Simple Explanation)',
        content: 'अपूर्णांक म्हणजे भागाची तुलना करणे. १ भाकरीचे २ समान भाग केले तर प्रत्येक भाग १/२ असतो.',
      },
      step_by_step: {
        modeTitle: 'टप्प्याटप्प्याने (Step-by-Step)',
        content: '१. एकूण समान भाग शोधा (छेद).\n२. निवडलेले भाग मोजा (अंश).\n३. अपूर्णांक अंश/छेद रूपात लिहा.\n४. गुणोत्तरासाठी दोन्ही संख्यांचा संक्षेप करा.',
      },
      real_life: {
        modeTitle: 'दैनंदिन उदाहरण (Real-Life Example)',
        content: 'जसे चहा बनवताना २ कप दूध आणि १ कप पाणी वापरले तर दूध व पाण्याचे गुणोत्तर २:१ असते.',
      },
      story: {
        modeTitle: 'गोष्टीच्या रूपात (Story Mode)',
        content: 'राजू आणि सिया यांनी १ केकचे ४ समान तुकडे केले. राजूने ३ तुकडे खाल्ले, म्हणजे त्याने ३/४ केक खाल्ला!',
      },
      exam_answer: {
        modeTitle: 'परीक्षेसाठी उत्तर (Exam Ready Answer)',
        content: 'अपूर्णांक ही अशी संख्या आहे जी पूर्णांकाच्या भागाचे प्रतिनिधित्व करते, जिथे वरची संख्या अंश आणि खालची संख्या छेद असते.',
      },
    },
    bridgeCard: {
      conceptEnglish: 'Fractions and Ratios',
      motherTongueTerm: 'अपूर्णांक आणि गुणोत्तर',
      motherTongueExplanation: 'पूर्ण वस्तूच्या भागांची आणि दोन प्रमाणांची तुलना करण्याची गणितीय पद्धत.',
      englishTerminology: 'Fractions, Numerator & Denominator',
      pronunciation: 'frak-shuhn and ray-shee-oh',
      examReadyEnglishAnswer: 'A fraction represents a numerical part of a whole, defined by a numerator divided by a denominator.',
      academicTerms: [
        { id: 'm1', englishTerm: 'Numerator', motherTongueTerm: 'अंश', motherTongueMeaning: 'अपूर्णांकातील वरील संख्या', pronunciation: 'noo-muh-ray-ter' },
        { id: 'm2', englishTerm: 'Denominator', motherTongueTerm: 'छेद', motherTongueMeaning: 'अपूर्णांकातील खालील संख्या', pronunciation: 'dih-nom-uh-nay-ter' },
        { id: 'm3', englishTerm: 'Equivalent Fraction', motherTongueTerm: 'सममूल्य अपूर्णांक', motherTongueMeaning: 'समान मूल्य असणारे अपूर्णांक', pronunciation: 'ih-kwiv-uh-luhnt frak-shuhn' },
        { id: 'm4', englishTerm: 'Ratio', motherTongueTerm: 'गुणोत्तर', motherTongueMeaning: 'दोन संख्यांची तुलना करणारे प्रमाण', pronunciation: 'ray-shee-oh' },
        { id: 'm5', englishTerm: 'Percentage', motherTongueTerm: 'टक्केवारी', motherTongueMeaning: 'दर शंभरातील भाग', pronunciation: 'per-sen-tij' },
      ],
    },
  },
  hi: {
    title: 'भिन्न और अनुपात (Fractions & Ratios)',
    subtitle: 'गणित में भिन्न, अंश-हर और संख्याओं की तुलना कैसे समझें।',
    overview: 'भिन्न संपूर्ण वस्तु का एक भाग होता है! जैसे कि 1 पिज्जा के 4 बराबर टुकड़ों में 1 टुकड़ा 1/4 होता है। अनुपात दो मात्राओं की तुलना करता है।',
    ingredients: [
      { icon: '🔢', name: 'अंश (Numerator)', desc: 'भिन्न की ऊपरी संख्या जो लिए गए हिस्से को दर्शाती है।' },
      { icon: '📏', name: 'हर (Denominator)', desc: 'भिन्न की निचली संख्या जो कुल बराबर हिस्सों को दर्शाती है।' },
      { icon: '⚖️', name: 'अनुपात (Ratio)', desc: 'दो संख्याओं की तुलना (जैसे 2:3)।' },
    ],
    equation: {
      formula: 'भिन्न = अंश / हर | अनुपात = a : b',
      text: '3 / 4 = 75% | 2 और 3 का अनुपात = 2:3',
    },
    explanationModes: {
      simple: {
        modeTitle: 'सरल व्याख्या (Simple Explanation)',
        content: 'भिन्न का अर्थ है हिस्से को मापना। 1 रोटी के 2 बराबर भाग करने पर प्रत्येक भाग 1/2 कहलाता है।',
      },
      step_by_step: {
        modeTitle: 'चरण-दर-चरण (Step-by-Step)',
        content: '1. कुल बराबर भाग पहचानें (हर)।\n2. चुने गए हिस्से गिनें (अंश)।\n3. भिन्न को अंश/हर के रूप में लिखें।\n4. अनुपात के लिए सरलतम रूप में बदलें।',
      },
      real_life: {
        modeTitle: 'रियल-लाइफ़ उदाहरण (Real-Life Example)',
        content: 'यदि आप चाय बनाने में 2 कप दूध और 1 कप पानी मिलाते हैं, तो दूध और पानी का अनुपात 2:1 होगा।',
      },
      story: {
        modeTitle: 'कहानी के रूप में (Story Mode)',
        content: 'राजू और रिया ने 1 सेब के 4 टुकड़े किए। राजू ने 3 टुकड़े खाए, यानी उसने 3/4 सेब खाया!',
      },
      exam_answer: {
        modeTitle: 'परीक्षा उत्तर (Exam Ready Answer)',
        content: 'भिन्न वह संख्या है जो किसी पूर्ण वस्तु के हिस्से को व्यक्त करती है, जिसमें अंश ऊपरी तथा हर निचली संख्या होती है।',
      },
    },
    bridgeCard: {
      conceptEnglish: 'Fractions and Ratios',
      motherTongueTerm: 'भिन्न और अनुपात',
      motherTongueExplanation: 'पूर्ण वस्तु के हिस्सों और दो राशियों की तुलना करने की गणितीय विधि।',
      englishTerminology: 'Fractions, Numerator & Denominator',
      pronunciation: 'frak-shuhn and ray-shee-oh',
      examReadyEnglishAnswer: 'A fraction represents a part of a whole quantity, consisting of a numerator divided by a denominator.',
      academicTerms: [
        { id: 'm1', englishTerm: 'Numerator', motherTongueTerm: 'अंश', motherTongueMeaning: 'भिन्न में ऊपर लिखी जाने वाली संख्या', pronunciation: 'noo-muh-ray-ter' },
        { id: 'm2', englishTerm: 'Denominator', motherTongueTerm: 'हर', motherTongueMeaning: 'भिन्न में नीचे लिखी जाने वाली संख्या', pronunciation: 'dih-nom-uh-nay-ter' },
        { id: 'm3', englishTerm: 'Equivalent Fraction', motherTongueTerm: 'समतुल्य भिन्न', motherTongueMeaning: 'समान मान वाली भिन्न', pronunciation: 'ih-kwiv-uh-luhnt frak-shuhn' },
        { id: 'm4', englishTerm: 'Ratio', motherTongueTerm: 'अनुपात', motherTongueMeaning: 'दो मात्राओं के बीच की तुलना', pronunciation: 'ray-shee-oh' },
        { id: 'm5', englishTerm: 'Percentage', motherTongueTerm: 'प्रतिशत', motherTongueMeaning: 'प्रति सौ पर मान', pronunciation: 'per-sen-tij' },
      ],
    },
  },
  en: {
    title: 'Fractions & Ratios',
    subtitle: 'Mastering numerators, denominators, equivalent fractions, and proportional comparison.',
    overview: 'A fraction represents a portion of a whole unit! If a pizza is sliced into 4 equal parts, 1 slice is 1/4 of the pizza. A ratio compares two quantities.',
    ingredients: [
      { icon: '🔢', name: 'Numerator', desc: 'The top number representing selected parts.' },
      { icon: '📏', name: 'Denominator', desc: 'The bottom number representing total equal parts.' },
      { icon: '⚖️', name: 'Ratio', desc: 'A proportional relationship between two values (e.g., 2:3).' },
    ],
    equation: {
      formula: 'Fraction = Numerator / Denominator | Ratio = a : b',
      text: '3 / 4 = 75% | Ratio of 2 to 3 = 2:3',
    },
    explanationModes: {
      simple: {
        modeTitle: 'Simple Explanation',
        content: 'Fractions show parts of a whole. Splitting 1 apple into 2 equal halves gives 1/2 per person.',
      },
      step_by_step: {
        modeTitle: 'Step-by-Step Breakdown',
        content: '1. Count total equal pieces (Denominator).\n2. Count shaded/selected pieces (Numerator).\n3. Write as Numerator/Denominator.\n4. Simplify for ratio comparison.',
      },
      real_life: {
        modeTitle: 'Real-Life Analogy',
        content: 'Mixing 2 cups of milk with 1 cup of water gives a milk-to-water ratio of 2:1.',
      },
      story: {
        modeTitle: 'Story Mode',
        content: 'Sam and Maya shared a chocolate bar with 8 squares. Sam ate 6 squares, meaning he enjoyed 6/8 or 3/4 of the bar!',
      },
      exam_answer: {
        modeTitle: 'Exam-Ready Definition',
        content: 'A fraction is a mathematical expression showing a part of a whole, defined as a numerator divided by a non-zero denominator.',
      },
    },
    bridgeCard: {
      conceptEnglish: 'Fractions and Ratios',
      motherTongueTerm: 'Fractions & Ratios',
      motherTongueExplanation: 'Mathematical method of representing parts of a whole and comparing quantities.',
      englishTerminology: 'Fractions, Numerator & Denominator',
      pronunciation: 'frak-shuhn and ray-shee-oh',
      examReadyEnglishAnswer: 'A fraction is a numerical value representing equal parts of a whole object or quantity.',
      academicTerms: [
        { id: 'm1', englishTerm: 'Numerator', motherTongueTerm: 'Numerator', motherTongueMeaning: 'The upper integer in a fraction', pronunciation: 'noo-muh-ray-ter' },
        { id: 'm2', englishTerm: 'Denominator', motherTongueTerm: 'Denominator', motherTongueMeaning: 'The lower integer showing total divisions', pronunciation: 'dih-nom-uh-nay-ter' },
        { id: 'm3', englishTerm: 'Equivalent Fraction', motherTongueTerm: 'Equivalent Fraction', motherTongueMeaning: 'Fractions having equal numerical values', pronunciation: 'ih-kwiv-uh-luhnt frak-shuhn' },
        { id: 'm4', englishTerm: 'Ratio', motherTongueTerm: 'Ratio', motherTongueMeaning: 'Comparison of two mathematical quantities', pronunciation: 'ray-shee-oh' },
        { id: 'm5', englishTerm: 'Percentage', motherTongueTerm: 'Percentage', motherTongueMeaning: 'A fraction expressed per hundred', pronunciation: 'per-sen-tij' },
      ],
    },
  },
  gu: {
    title: 'અપૂર્ણાંક અને ગુણોત્તર (Fractions & Ratios)',
    subtitle: 'ગણિતમાં અપૂર્ણાંક, અંશ-છેદ અને ગુણોત્તર સરળ રીતે શીખો.',
    overview: 'અપૂર્ણાંક એટલે આખી વસ્તુનો એક ભાગ! જેમ કે પિઝાના 4 સરખા ભાગમાંથી 1 ભાગ એટલે 1/4. ગુણોત્તર બે જથ્થાની સરખામણી કરે છે.',
    ingredients: [
      { icon: '🔢', name: 'અંશ (Numerator)', desc: 'લીધેલા ભાગ દર્શાવતી ઉપરની સંખ્યા.' },
      { icon: '📏', name: 'છેદ (Denominator)', desc: 'કુલ સરખા ભાગ દર્શાવતી નીચેની સંખ્યા.' },
      { icon: '⚖️', name: 'ગુણોત્તર (Ratio)', desc: 'બે સંખ્યાઓ વચ્ચેની સરખામણી (જેમ કે 2:3).' },
    ],
    equation: {
      formula: 'અપૂર્ણાંક = અંશ / છેદ | ગુણોત્તર = a : b',
      text: '3 / 4 = 75% | 2 અને 3 નો ગુણોત્તર = 2:3',
    },
    explanationModes: {
      simple: {
        modeTitle: 'સરળ સમજૂતી (Simple Explanation)',
        content: 'અપૂર્ણાંક એટલે આખી વસ્તુનો ભાગ. 1 રોટલીના 2 સરખા ટુકડા કરીએ તો દરેક ટુકડો 1/2 કહેવાય.',
      },
      step_by_step: {
        modeTitle: 'તબક્કાવાર (Step-by-Step)',
        content: '1. કુલ સરખા ભાગ ગણો (છેદ).\n2. પસંદ કરેલા ભાગ ગણો (અંશ).\n3. અંશ/છેદ તરીકે લખો.\n4. ગુણોત્તર માટે સરળ સ્વરૂપ આપો.',
      },
      real_life: {
        modeTitle: 'વાસ્તવિક દ્રષ્ટાંત (Real-Life Example)',
        content: 'જો ચા બનાવવામાં 2 કપ દૂધ અને 1 કપ પાણી ઉમેરો, તો દૂધ અને પાણીનો ગુણોત્તર 2:1 થાય.',
      },
      story: {
        modeTitle: 'વાર્તા રૂપે (Story Mode)',
        content: 'રાજ અને રિયાએ 1 ચોકલેટના 4 ટુકડા કર્યા. રાજે 3 ટુકડા ખાધા, એટલે તેણે 3/4 ચોકલેટ ખાધી!',
      },
      exam_answer: {
        modeTitle: 'પરીક્ષા ઉત્તર (Exam Ready Answer)',
        content: 'અપૂર્ણાંક એ પૂર્ણ વસ્તુના ભાગને દર્શાવતી ગણિતીય સંખ્યા છે જેમાં ઉપરની સંખ્યા અંશ અને નીચેની સંખ્યા છેદ કહેવાય છે.',
      },
    },
    bridgeCard: {
      conceptEnglish: 'Fractions and Ratios',
      motherTongueTerm: 'અપૂર્ણાંક અને ગુણોત્તર',
      motherTongueExplanation: 'પૂર્ણ વસ્તુના ભાગ દર્શાવવાની અને સરખામણી કરવાની ગણિતીય રીત.',
      englishTerminology: 'Fractions, Numerator & Denominator',
      pronunciation: 'frak-shuhn and ray-shee-oh',
      examReadyEnglishAnswer: 'A fraction represents a portion of a whole quantity consisting of numerator and denominator.',
      academicTerms: [
        { id: 'm1', englishTerm: 'Numerator', motherTongueTerm: 'અંશ', motherTongueMeaning: 'અપૂર્ણાંકમાં ઉપર લખાતી સંખ્યા', pronunciation: 'noo-muh-ray-ter' },
        { id: 'm2', englishTerm: 'Denominator', motherTongueTerm: 'છેદ', motherTongueMeaning: 'અપૂર્ણાંકમાં નીચે લખાતી સંખ્યા', pronunciation: 'dih-nom-uh-nay-ter' },
        { id: 'm3', englishTerm: 'Equivalent Fraction', motherTongueTerm: 'સમમૂલ્ય અપૂર્ણાંક', motherTongueMeaning: 'સરખું મૂલ્ય ધરાવતા અપૂર્ણાંક', pronunciation: 'ih-kwiv-uh-luhnt frak-shuhn' },
        { id: 'm4', englishTerm: 'Ratio', motherTongueTerm: 'ગુણોત્તર', motherTongueMeaning: 'બે રાશિઓ વચ્ચેની ગણિતીય સરખામણી', pronunciation: 'ray-shee-oh' },
        { id: 'm5', englishTerm: 'Percentage', motherTongueTerm: 'ટકાવારી', motherTongueMeaning: 'દર સો પર ગણતરી કરાતો ભાગ', pronunciation: 'per-sen-tij' },
      ],
    },
  },
  ta: {
    title: 'பின்னங்கள் மற்றும் விகிதங்கள் (Fractions & Ratios)',
    subtitle: 'கணிதத்தில் தொகுதி, பகுதி மற்றும் விகித ஒப்பீட்டைப் புரிந்துகொள்ளுதல்.',
    overview: 'பின்னம் என்பது ஒரு முழு பொருளின் பகுதியாகும்! பீட்சாவை 4 சம பாகங்களாகப் பிரித்தால் 1 பாகம் 1/4 ஆகும். விகிதம் இரு அளவுகளை ஒப்பிடுகிறது.',
    ingredients: [
      { icon: '🔢', name: 'தொகுதி (Numerator)', desc: 'எடுக்கப்பட்ட பாகங்களைக் குறிக்கும் மேல் எண்.' },
      { icon: '📏', name: 'பகுதி (Denominator)', desc: 'மொத்த சம பாகங்களைக் குறிக்கும் கீழ் எண்.' },
      { icon: '⚖️', name: 'விகிதம் (Ratio)', desc: 'இரு அளவுகளுக்கு இடையிலான ஒப்பீடு (எ.கா. 2:3).' },
    ],
    equation: {
      formula: 'பின்னம் = தொகுதி / பகுதி | விகிதம் = a : b',
      text: '3 / 4 = 75% | 2 மற்றும் 3 இன் விகிதம் = 2:3',
    },
    explanationModes: {
      simple: {
        modeTitle: 'எளிய விளக்கம் (Simple Explanation)',
        content: 'பின்னம் என்பது முழு பொருளின் பகுதியைக் குறிக்கும். 1 ரொட்டியை 2 பாதியாகப் பிரித்தால் ஒவ்வொரு பாதியும் 1/2 ஆகும்.',
      },
      step_by_step: {
        modeTitle: 'படி படியாக (Step-by-Step)',
        content: '1. மொத்த பாகங்களைக் கண்டறியவும் (பகுதி).\n2. தேர்ந்தெடுக்கப்பட்ட பாகங்களை எண்ணவும் (தொகுதி).\n3. தொகுதி/பகுதி என எழுதவும்.\n4. விகிதத்திற்கு எளிய வடிவில் மாற்றவும்.',
      },
      real_life: {
        modeTitle: 'நடைமுறை உதாரணம் (Real-Life Example)',
        content: 'தேநீர் செய்ய 2 கப் பால் மற்றும் 1 கப் தண்ணீர் சேர்த்தால் பால்-தண்ணீர் விகிதம் 2:1 ஆகும்.',
      },
      story: {
        modeTitle: 'கதை வடிவில் (Story Mode)',
        content: 'ராமுவும் நிலாவும் 1 கேக்கை 4 துண்டுகளாகப் பிரித்தனர். ராமு 3 துண்டுகளைச் சாப்பிட்டான், அதாவது 3/4 கேக்கை சாப்பிட்டான்!',
      },
      exam_answer: {
        modeTitle: 'தேர்வு விடை (Exam Ready Answer)',
        content: 'பின்னம் என்பது ஒரு முழுமையின் பகுதியைக் குறிக்கும் கணித எண்ணாகும், இதில் மேல் எண் தொகுதி என்றும் கீழ் எண் பகுதி என்றும் அழைக்கப்படும்.',
      },
    },
    bridgeCard: {
      conceptEnglish: 'Fractions and Ratios',
      motherTongueTerm: 'பின்னங்கள் மற்றும் விகிதங்கள்',
      motherTongueExplanation: 'முழுமையின் பகுதியைக் குறிக்கும் கணித முறை.',
      englishTerminology: 'Fractions, Numerator & Denominator',
      pronunciation: 'frak-shuhn and ray-shee-oh',
      examReadyEnglishAnswer: 'A fraction represents a part of a whole defined by a numerator divided by a denominator.',
      academicTerms: [
        { id: 'm1', englishTerm: 'Numerator', motherTongueTerm: 'தொகுதி', motherTongueMeaning: 'பின்னத்தின் மேல் எண்', pronunciation: 'noo-muh-ray-ter' },
        { id: 'm2', englishTerm: 'Denominator', motherTongueTerm: 'பகுதி', motherTongueMeaning: 'பின்னத்தின் கீழ் எண்', pronunciation: 'dih-nom-uh-nay-ter' },
        { id: 'm3', englishTerm: 'Equivalent Fraction', motherTongueTerm: 'சமான பின்னம்', motherTongueMeaning: 'சம மதிப்புள்ள பின்னங்கள்', pronunciation: 'ih-kwiv-uh-luhnt frak-shuhn' },
        { id: 'm4', englishTerm: 'Ratio', motherTongueTerm: 'விகிதம்', motherTongueMeaning: 'இரு அளவுகளின் ஒப்பீடு', pronunciation: 'ray-shee-oh' },
        { id: 'm5', englishTerm: 'Percentage', motherTongueTerm: 'சதவீதம்', motherTongueMeaning: 'நூற்றுக்கான பங்கு', pronunciation: 'per-sen-tij' },
      ],
    },
  },
};

export const SOCIAL_STUDIES_LESSONS: Record<Language, LessonContent> = {
  mr: {
    title: 'नकाशा वाचन व हवामान क्षेत्रे (Maps & Climate)',
    subtitle: 'दिशा, नकाशाचे प्रमाण, अक्षांश-रेखांश आणि पृथ्वीचे हवामान पट्टे.',
    overview: 'नकाशे आपल्याला पृथ्वीचा भूगोल आणि मानवी जीवन समजून घेण्यास मदत करतात! मुख्य ४ दिशा आणि हवामान पट्टे जगाची विविधता स्पष्ट करतात.',
    ingredients: [
      { icon: '🧭', name: 'दिशा (Cardinal Directions)', desc: 'पूर्व, पश्चिम, उत्तर, दक्षिण या मुख्य दिशा.' },
      { icon: '🗺️', name: 'नकाशा प्रमाण (Map Scale)', desc: 'नकाशावरील अंतर आणि प्रत्यक्ष जमिनीवरील अंतर यांचे प्रमाण.' },
      { icon: '🌍', name: 'हवामान पट्टे (Climate Zones)', desc: 'उष्ण, समशीतोष्ण आणि कटिबंधीय हवामान क्षेत्रे.' },
    ],
    equation: {
      formula: 'प्रत्यक्ष अंतर = नकाशावरील अंतर × प्रमाण गुणांक',
      text: 'नकाशावर १ सेंमी = जमिनीवर १०० किमी',
    },
    explanationModes: {
      simple: {
        modeTitle: 'सोपे स्पष्टीकरण (Simple Explanation)',
        content: 'नकाशा म्हणजे पृथ्वीच्या भागाचे कागदावर काढलेले छोटे चित्र. त्यावरून आपण रस्ते आणि देश शोधू शकतो.',
      },
      step_by_step: {
        modeTitle: 'टप्प्याटप्प्याने (Step-by-Step)',
        content: '१. उत्तर दिशा शोधा (दिशा दर्शक बाण).\n२. नकाशाचे प्रमाण तपासा.\n३. सांकेतिक चिन्हे आणि सूची वाचा.\n४. अक्षांश व रेखांशानुसार स्थान निश्चित करा.',
      },
      real_life: {
        modeTitle: 'दैनंदिन उदाहरण (Real-Life Example)',
        content: 'जसे गुगल मॅप्स आपल्याला एका शहरातून दुसऱ्या शहरात जाण्याचा मार्ग दाखवतो, तसेच नकाशे भूगोल दर्शवतात.',
      },
      story: {
        modeTitle: 'गोष्टीच्या रूपात (Story Mode)',
        content: 'आरवने जुना खजिना शोधण्यासाठी नकाशा उघडला. नकाशावर उत्तर दिशेला १० पायऱ्या जाण्याचे चिन्ह होते!',
      },
      exam_answer: {
        modeTitle: 'परीक्षेसाठी उत्तर (Exam Ready Answer)',
        content: 'नकाशा म्हणजे ठराविक प्रमाणावर पृथ्वीच्या संपूर्ण किंवा काही भागाचे सपाट पृष्ठभागावर केलेले आलेखन होय.',
      },
    },
    bridgeCard: {
      conceptEnglish: 'Maps and Climate Zones',
      motherTongueTerm: 'नकाशा आणि हवामान क्षेत्रे',
      motherTongueExplanation: 'पृथ्वीची भौगोलिक स्थाने आणि हवामान समजून घेणारे शास्त्र.',
      englishTerminology: 'Latitude, Longitude & Climate',
      pronunciation: 'lat-ih-tood and lon-jih-tood',
      examReadyEnglishAnswer: 'A map is a symbolic representation of selected characteristics of a place, usually drawn on a flat surface using scales.',
      academicTerms: [
        { id: 's1', englishTerm: 'Latitude', motherTongueTerm: 'अक्षांश', motherTongueMeaning: 'विषुववृत्ताला समांतर असलेल्या काल्पनिक आडव्या रेषा', pronunciation: 'lat-ih-tood' },
        { id: 's2', englishTerm: 'Longitude', motherTongueTerm: 'रेखांश', motherTongueMeaning: 'उत्तर व दक्षिण ध्रुवांना जोडणाऱ्या उभ्या रेषा', pronunciation: 'lon-jih-tood' },
        { id: 's3', englishTerm: 'Equator', motherTongueTerm: 'विषुववृत्त', motherTongueMeaning: 'पृथ्वीचे दोन समान भाग करणारे ०° अक्षांश', pronunciation: 'ih-kway-ter' },
        { id: 's4', englishTerm: 'Climate Zone', motherTongueTerm: 'हवामान पट्टा', motherTongueMeaning: 'समान तापमान व पर्जन्य असणारा प्रदेश', pronunciation: 'kly-mit zohn' },
        { id: 's5', englishTerm: 'Scale', motherTongueTerm: 'नकाशा प्रमाण', motherTongueMeaning: 'नकाशावरील व जमिनीवरील अंतराचे प्रमाण', pronunciation: 'skayl' },
      ],
    },
  },
  hi: {
    title: 'मानचित्र और जलवायु क्षेत्र (Maps & Climate)',
    subtitle: 'दिशाएं, मानचित्र का पैमाना, अक्षांश-देशांतर और पृथ्वी के जलवायु क्षेत्र।',
    overview: 'मानचित्र हमारी पृथ्वी के भूगोल को समझने में मदद करते हैं! 4 मुख्य दिशाएं और जलवायु क्षेत्र पृथ्वी के विभिन्न क्षेत्रों को दर्शाते हैं।',
    ingredients: [
      { icon: '🧭', name: 'दिशाएं (Cardinal Directions)', desc: 'उत्तर, दक्षिण, पूर्व, पश्चिम मुख्य दिशाएं।' },
      { icon: '🗺️', name: 'मानचित्र पैमाना (Map Scale)', desc: 'मानचित्र पर दूरी और वास्तविक जमीन की दूरी का अनुपात।' },
      { icon: '🌍', name: 'जलवायु क्षेत्र (Climate Zones)', desc: 'उष्णकटिबंधीय, समशीतोष्ण और ध्रुवीय क्षेत्र।' },
    ],
    equation: {
      formula: 'वास्तविक दूरी = मानचित्र दूरी × पैमाना',
      text: 'मानचित्र पर 1 सेमी = जमीन पर 100 किमी',
    },
    explanationModes: {
      simple: {
        modeTitle: 'सरल व्याख्या (Simple Explanation)',
        content: 'मानचित्र पृथ्वी के किसी भाग का छोटा चित्र होता है जिससे हम रास्तों और देशों को खोज सकते हैं।',
      },
      step_by_step: {
        modeTitle: 'चरण-दर-चरण (Step-by-Step)',
        content: '1. उत्तर दिशा खोजें (N सूचक)।\n2. पैमाना (Scale) देखें।\n3. संकेत सूची (Legend) पढ़ें।\n4. अक्षांश और देशांतर से स्थान खोजें।',
      },
      real_life: {
        modeTitle: 'रियल-लाइफ़ उदाहरण (Real-Life Example)',
        content: 'जैसे गूगल मैप्स हमें किसी शहर का रास्ता दिखाता है, वैसे ही मानचित्र भूगोल को समझाते हैं।',
      },
      story: {
        modeTitle: 'कहानी के रूप में (Story Mode)',
        content: 'अमन ने खजाना खोजने के लिए पुराना नक्शा देखा, जिसमें उत्तर दिशा की ओर 10 कदम चलने का संकेत था!',
      },
      exam_answer: {
        modeTitle: 'परीक्षा उत्तर (Exam Ready Answer)',
        content: 'मानचित्र पृथ्वी की सतह या उसके किसी भाग का पैमाने की सहायता से समतल सतह पर खींचा गया निरूपण है।',
      },
    },
    bridgeCard: {
      conceptEnglish: 'Maps and Climate Zones',
      motherTongueTerm: 'मानचित्र और जलवायु क्षेत्र',
      motherTongueExplanation: 'पृथ्वी की भौगोलिक स्थितियों और जलवायु को समझने का साधन।',
      englishTerminology: 'Latitude, Longitude & Climate',
      pronunciation: 'lat-ih-tood and lon-jih-tood',
      examReadyEnglishAnswer: 'A map is a visual representation of an area highlighting geographic features, scale, and climate boundaries.',
      academicTerms: [
        { id: 's1', englishTerm: 'Latitude', motherTongueTerm: 'अक्षांश', motherTongueMeaning: 'भूमध्य रेखा के समांतर खींची गई काल्पनिक रेखाएं', pronunciation: 'lat-ih-tood' },
        { id: 's2', englishTerm: 'Longitude', motherTongueTerm: 'देशांतर', motherTongueMeaning: 'उत्तर से दक्षिण ध्रुव को जोड़ने वाली काल्पनिक रेखाएं', pronunciation: 'lon-jih-tood' },
        { id: 's3', englishTerm: 'Equator', motherTongueTerm: 'भूमध्य रेखा', motherTongueMeaning: 'पृथ्वी को दो बराबर भागों में बांटने वाली 0° अक्षांश रेखा', pronunciation: 'ih-kway-ter' },
        { id: 's4', englishTerm: 'Climate Zone', motherTongueTerm: 'जलवायु क्षेत्र', motherTongueMeaning: 'समान मौसम और तापमान वाला भौगोलिक क्षेत्र', pronunciation: 'kly-mit zohn' },
        { id: 's5', englishTerm: 'Scale', motherTongueTerm: 'पैमाना', motherTongueMeaning: 'मानचित्र और वास्तविक दूरी का अनुपात', pronunciation: 'skayl' },
      ],
    },
  },
  en: {
    title: 'Maps & Climate Zones',
    subtitle: 'Understanding compass directions, map scale, latitude, longitude, and global climate regions.',
    overview: 'Maps help us navigate and comprehend Earth’s geography! Cardinal directions and climate zones illustrate how geographic position affects weather and human settlement.',
    ingredients: [
      { icon: '🧭', name: 'Cardinal Directions', desc: 'North, South, East, and West guidance indicators.' },
      { icon: '🗺️', name: 'Map Scale', desc: 'Ratio comparing map distance to actual ground distance.' },
      { icon: '🌍', name: 'Climate Zones', desc: 'Tropical, Temperate, and Polar global climate divisions.' },
    ],
    equation: {
      formula: 'Real Distance = Map Distance × Scale Ratio',
      text: '1 cm on Map = 100 km on Ground',
    },
    explanationModes: {
      simple: {
        modeTitle: 'Simple Explanation',
        content: 'A map is a mini drawing of Earth that shows where rivers, roads, and cities are located.',
      },
      step_by_step: {
        modeTitle: 'Step-by-Step Breakdown',
        content: '1. Locate the North arrow.\n2. Read the Map Scale.\n3. Check the Map Legend for symbols.\n4. Pinpoint location using Latitude and Longitude.',
      },
      real_life: {
        modeTitle: 'Real-Life Analogy',
        content: 'Just like GPS maps help drivers find route turns, paper maps show geographic mountains and climate regions.',
      },
      story: {
        modeTitle: 'Story Mode',
        content: 'Captain Leo unrolled a golden parchment map. Following the North Star and Map Scale, he navigated across the ocean!',
      },
      exam_answer: {
        modeTitle: 'Exam-Ready Definition',
        content: 'A map is a scaled two-dimensional representation of a geographical area, utilizing symbols, grid coordinates, and orientation indicators.',
      },
    },
    bridgeCard: {
      conceptEnglish: 'Maps and Climate Zones',
      motherTongueTerm: 'Maps & Climate',
      motherTongueExplanation: 'Scientific representation of Earth geography and regional climate zones.',
      englishTerminology: 'Latitude, Longitude & Climate',
      pronunciation: 'lat-ih-tood and lon-jih-tood',
      examReadyEnglishAnswer: 'Maps represent physical and political boundaries using cardinal directions, scales, and coordinates.',
      academicTerms: [
        { id: 's1', englishTerm: 'Latitude', motherTongueTerm: 'Latitude', motherTongueMeaning: 'Parallel horizontal lines measuring distance North/South of Equator', pronunciation: 'lat-ih-tood' },
        { id: 's2', englishTerm: 'Longitude', motherTongueTerm: 'Longitude', motherTongueMeaning: 'Vertical lines connecting North and South poles', pronunciation: 'lon-jih-tood' },
        { id: 's3', englishTerm: 'Equator', motherTongueTerm: 'Equator', motherTongueMeaning: 'The 0° latitude dividing Earth into Northern and Southern hemispheres', pronunciation: 'ih-kway-ter' },
        { id: 's4', englishTerm: 'Climate Zone', motherTongueTerm: 'Climate Zone', motherTongueMeaning: 'Major regional weather patterns dictated by latitude', pronunciation: 'kly-mit zohn' },
        { id: 's5', englishTerm: 'Scale', motherTongueTerm: 'Scale', motherTongueMeaning: 'Proportional relation between map distance and real ground distance', pronunciation: 'skayl' },
      ],
    },
  },
  gu: {
    title: 'નકશા અને આબોહવા ક્ષેત્રો (Maps & Climate)',
    subtitle: 'દિશાઓ, નકશાનું માપક્રમ, અક્ષાંશ-રેખાંશ અને પૃથ્વીના આબોહવા ક્ષેત્રો.',
    overview: 'નકશા આપણને પૃથ્વીના ભૂગોળને સમજવામાં મદદ કરે છે! 4 મુખ્ય દિશાઓ અને આબોહવા ક્ષેત્રો પૃથ્વીના વિવિધ પ્રદેશો દર્શાવે છે.',
    ingredients: [
      { icon: '🧭', name: 'દિશાઓ (Cardinal Directions)', desc: 'ઉત્તર, દક્ષિણ, પૂર્વ, પશ્ચિમ મુખ્ય દિશાઓ.' },
      { icon: '🗺️', name: 'માપક્રમ (Map Scale)', desc: 'નકશા પરનું અંતર અને વાસ્તવિક જમીનનું અંતર દર્શાવતું માપ.' },
      { icon: '🌍', name: 'આબોહવા ક્ષેત્રો (Climate Zones)', desc: 'ઉષ્ણકટિબંધ, સમશીતોષ્ણ અને ધ્રુવીય પ્રદેશો.' },
    ],
    equation: {
      formula: 'વાસ્તવિક અંતર = નકશાનું અંતર × માપક્રમ',
      text: 'નકશા પર 1 સેમી = જમીન પર 100 કિમી',
    },
    explanationModes: {
      simple: {
        modeTitle: 'સરળ સમજૂતી (Simple Explanation)',
        content: 'નકશો એ પૃથ્વીના ભાગનું નાનું ચિત્ર છે જેનાથી આપણે રસ્તા અને દેશો શોધી શકીએ છીએ.',
      },
      step_by_step: {
        modeTitle: 'તબક્કાવાર (Step-by-Step)',
        content: '1. ઉત્તર દિશા શોધો.\n2. માપક્રમ તપાસો.\n3. સંકેત સૂચિ વાંચો.\n4. અક્ષાંશ અને રેખાંશથી સ્થાન નક્કી કરો.',
      },
      real_life: {
        modeTitle: 'વાસ્તવિક દ્રષ્ટાંત (Real-Life Example)',
        content: 'જેમ ગૂગલ મેપ્સ રસ્તો બતાવે છે, તેમ નકશા ભૂગોળ દર્શાવે છે.',
      },
      story: {
        modeTitle: 'વાર્તા રૂપે (Story Mode)',
        content: 'અરવે ખજાનો શોધવા જૂનો નકશો ખોલ્યો. નકશા પર ઉત્તર દિશા તરફ જવાનો સંકેત હતો!',
      },
      exam_answer: {
        modeTitle: 'પરીક્ષા ઉત્તર (Exam Ready Answer)',
        content: 'નકશો એ પૃથ્વીની સપાટી અથવા તેના ભાગનું ચોક્કસ માપક્રમ સાથે સમતલ સપાટી પર દોરેલું આલેખન છે.',
      },
    },
    bridgeCard: {
      conceptEnglish: 'Maps and Climate Zones',
      motherTongueTerm: 'નકશા અને આબોહવા ક્ષેત્રો',
      motherTongueExplanation: 'પૃથ્વીના ભૌગોલિક સ્થાનો અને આબોહવા સમજવાનું સાધન.',
      englishTerminology: 'Latitude, Longitude & Climate',
      pronunciation: 'lat-ih-tood and lon-jih-tood',
      examReadyEnglishAnswer: 'A map is a scaled representation of geographical areas showing boundaries and features.',
      academicTerms: [
        { id: 's1', englishTerm: 'Latitude', motherTongueTerm: 'અક્ષાંશ', motherTongueMeaning: 'વિષુવવૃત્તને સમાંતર દોરેલી કાલ્પનિક આડી રેખાઓ', pronunciation: 'lat-ih-tood' },
        { id: 's2', englishTerm: 'Longitude', motherTongueTerm: 'રેખાંશ', motherTongueMeaning: 'ઉત્તર અને દક્ષિણ ધ્રુવને જોડતી કાલ્પનિક ઊભી રેખાઓ', pronunciation: 'lon-jih-tood' },
        { id: 's3', englishTerm: 'Equator', motherTongueTerm: 'વિષુવવૃત્ત', motherTongueMeaning: 'પૃથ્વીના બે સરખા ભાગ કરતી 0° અક્ષાંશ રેખા', pronunciation: 'ih-kway-ter' },
        { id: 's4', englishTerm: 'Climate Zone', motherTongueTerm: 'આબોહવા ક્ષેત્ર', motherTongueMeaning: 'સમાન વાતાવરણ ધરાવતો ભૌગોલિક પ્રદેશ', pronunciation: 'kly-mit zohn' },
        { id: 's5', englishTerm: 'Scale', motherTongueTerm: 'માપક્રમ', motherTongueMeaning: 'નકશા પરનું અને વાસ્તવિક અંતરનો ગુણોત્તર', pronunciation: 'skayl' },
      ],
    },
  },
  ta: {
    title: 'வரைபடம் மற்றும் காலநிலை மண்டலங்கள் (Maps & Climate)',
    subtitle: 'திசைகள், வரைபட அளவுகோல், அட்சரேகை, தீர்க்கரேகை மற்றும் காலநிலை.',
    overview: 'வரைபடங்கள் பூமியின் புவியியலைப் புரிந்துகொள்ள உதவுகின்றன! 4 திசைகள் மற்றும் காலநிலை மண்டலங்கள் உலகப் பகுதிகளை விவரிக்கின்றன.',
    ingredients: [
      { icon: '🧭', name: 'திசைகள் (Cardinal Directions)', desc: 'வடக்கு, தெற்கு, கிழக்கு, மேற்கு திசைகள்.' },
      { icon: '🗺️', name: 'வரைபட அளவுகோல் (Map Scale)', desc: 'வரைபடத் தொலைவுக்கும் நிலத் தொலைவுக்கும் உள்ள விகிதம்.' },
      { icon: '🌍', name: 'காலநிலை மண்டலங்கள் (Climate Zones)', desc: 'வெப்பமண்டலம், மிதவெப்பமண்டலம், துருவப் பகுதிகள்.' },
    ],
    equation: {
      formula: 'உண்மைத் தொலைவு = வரைபடத் தொலைவு × அளவுகோல்',
      text: 'வரைபடத்தில் 1 செ.மீ = நிலத்தில் 100 கி.மீ',
    },
    explanationModes: {
      simple: {
        modeTitle: 'எளிய விளக்கம் (Simple Explanation)',
        content: 'வரைபடம் என்பது பூமியின் ஒரு பகுதியின் வரைபடமாகும். இதன் மூலம் வழிகளையும் நகரங்களையும் கண்டறியலாம்.' },
      step_by_step: {
        modeTitle: 'படி படியாக (Step-by-Step)',
        content: '1. வடக்கு அம்புக்குறியைக் கண்டறியவும்.\n2. அளவுகோலைப் படிக்கவும்.\n3. குறியீடுகளைப் பார்க்கவும்.\n4. அட்சரேகை மற்றும் தீர்க்கரேகையைக் கொண்டு இடத்தைக் கண்டறியவும்.' },
      real_life: {
        modeTitle: 'நடைமுறை உதாரணம் (Real-Life Example)',
        content: 'கூகிள் மேப்ஸ் வழி காட்டுவது போல, வரைபடங்கள் புவியியலை விவரிக்கின்றன.' },
      story: {
        modeTitle: 'கதை வடிவில் (Story Mode)',
        content: 'ராம் புதையலைத் தேட பழைய வரைபடத்தைப் பார்த்தான். அதில் வடக்கு நோக்கி 10 அடிகள் செல்லக் குறிப்பிடப்பட்டிருந்தது!' },
      exam_answer: {
        modeTitle: 'தேர்வு விடை (Exam Ready Answer)',
        content: 'வரைபடம் என்பது பூமியின் மேற்பரப்பை அல்லது அதன் ஒரு பகுதியை அளவுகோலின் உதவியுடன் சமதளத்தில் வரைவதாகும்.' },
    },
    bridgeCard: {
      conceptEnglish: 'Maps and Climate Zones',
      motherTongueTerm: 'வரைபடம் மற்றும் காலநிலை மண்டலங்கள்',
      motherTongueExplanation: 'பூமியின் இடங்கள் மற்றும் காலநிலையைப் புரிந்துகொள்ளும் முறை.',
      englishTerminology: 'Latitude, Longitude & Climate',
      pronunciation: 'lat-ih-tood and lon-jih-tood',
      examReadyEnglishAnswer: 'A map is a scaled drawing of an area representing physical features, coordinates, and climate zones.',
      academicTerms: [
        { id: 's1', englishTerm: 'Latitude', motherTongueTerm: 'அட்சரேகை', motherTongueMeaning: 'நிலநடுக்கோட்டிற்கு இணையான கற்பனை கிடைமட்டக் கோடுகள்', pronunciation: 'lat-ih-tood' },
        { id: 's2', englishTerm: 'Longitude', motherTongueTerm: 'தீர்க்கரேகை', motherTongueMeaning: 'வடக்கு தெற்கு துருவங்களை இணைக்கும் செங்குத்துக் கோடுகள்', pronunciation: 'lon-jih-tood' },
        { id: 's3', englishTerm: 'Equator', motherTongueTerm: 'நிலநடுக்கோடு', motherTongueMeaning: 'பூமியை இரு சம பாதியாகப் பிரிக்கும் 0° அட்சரேகை', pronunciation: 'ih-kway-ter' },
        { id: 's4', englishTerm: 'Climate Zone', motherTongueTerm: 'காலநிலை மண்டலம்', motherTongueMeaning: 'ஒரே மாதிரியான வானிலையைக் கொண்ட பகுதி', pronunciation: 'kly-mit zohn' },
        { id: 's5', englishTerm: 'Scale', motherTongueTerm: 'அளவுகோல்', motherTongueMeaning: 'வரைபடத் தொலைவுக்கும் நிலத் தொலைவுக்கும் உள்ள விகிதம்', pronunciation: 'skayl' },
      ],
    },
  },
};

export const LESSON_CONTENT_BY_SUBJECT: Record<SubjectId, Record<Language, LessonContent>> = {
  science: PHOTOSYNTHESIS_LESSONS,
  math: MATH_LESSONS,
  social_studies: SOCIAL_STUDIES_LESSONS,
};

export const getLessonContent = (subject: SubjectId, lang: Language): LessonContent => {
  const subjectLessons = LESSON_CONTENT_BY_SUBJECT[subject] || LESSON_CONTENT_BY_SUBJECT.science;
  return subjectLessons[lang] || subjectLessons.en;
};

