import type { ProductCategory } from "@/data/products";
import { pick, type AppLanguage, type LocalizedText } from "@/lib/i18n";

const categoryLabels: Record<ProductCategory, LocalizedText> = {
  "Hand Wash": {
    en: "Hand Wash",
    hi: "हैंड वॉश",
    gu: "હેન્ડ વોશ",
  },
  "Dish Wash Liquid": {
    en: "Dish Wash Liquid",
    hi: "डिश वॉश लिक्विड",
    gu: "ડિશ વોશ લિક્વિડ",
  },
  "Liquid Detergent": {
    en: "Liquid Detergent",
    hi: "लिक्विड डिटर्जेंट",
    gu: "લિક્વિડ ડિટર્જન્ટ",
  },
  "Toilet Cleaner": {
    en: "Toilet Cleaner",
    hi: "टॉयलेट क्लीनर",
    gu: "ટોયલેટ ક્લીનર",
  },
  "Glass Cleaner": {
    en: "Glass Cleaner",
    hi: "ग्लास क्लीनर",
    gu: "ગ્લાસ ક્લીનર",
  },
  "Surface Cleaner": {
    en: "Surface Cleaner",
    hi: "सरफेस क्लीनर",
    gu: "સર્ફેસ ક્લીનર",
  },
  Shampoo: {
    en: "Shampoo",
    hi: "शैम्पू",
    gu: "શેમ્પૂ",
  },
  "Hair Oil": {
    en: "Hair Oil",
    hi: "हेयर ऑयल",
    gu: "હેર ઓઇલ",
  },
};

const categoryDescriptions: Record<ProductCategory, LocalizedText> = {
  "Hand Wash": {
    en: "Gentle on hands, strong on hygiene, and ideal for daily family use.",
    hi: "हाथों पर नरम, हाइजीन पर मजबूत, और रोज़ के परिवार उपयोग के लिए आदर्श।",
    gu: "હાથ માટે નરમ, હાઇજિન માટે મજબૂત અને દૈનિક પરિવાર ઉપયોગ માટે યોગ્ય.",
  },
  "Dish Wash Liquid": {
    en: "Fast grease cutting and a fresher kitchen clean in every wash.",
    hi: "हर वॉश में तेज़ ग्रीस कटिंग और ज्यादा फ्रेश किचन क्लीन।",
    gu: "દરેક વોશમાં ઝડપથી ગ્રીસ કટિંગ અને વધુ ફ્રેશ કિચન ક્લીન.",
  },
  "Liquid Detergent": {
    en: "Clothes care with stain removal, freshness, and machine-friendly wash.",
    hi: "दाग हटाने, फ्रेशनेस और मशीन-फ्रेंडली वॉश के साथ कपड़ों की देखभाल।",
    gu: "દાગ દૂર કરવું, તાજગી અને મશીન-ફ્રેન્ડલી વોશ સાથે કપડાંની સંભાળ.",
  },
  "Toilet Cleaner": {
    en: "Powerful stain and odor control for a visibly cleaner bathroom.",
    hi: "दिखने में ज्यादा साफ बाथरूम के लिए ताकतवर दाग और बदबू नियंत्रण।",
    gu: "વધુ સ્વચ્છ બાથરૂમ માટે શક્તિશાળી દાગ અને દુર્ગંધ નિયંત્રણ.",
  },
  "Glass Cleaner": {
    en: "Crystal-clear shine for mirrors, windows, and all glass surfaces.",
    hi: "मिरर, विंडो और हर ग्लास सतह के लिए क्रिस्टल-क्लियर शाइन।",
    gu: "મિરર, વિન્ડો અને તમામ ગ્લાસ સપાટીઓ માટે ક્રિસ્ટલ-ક્લિયર શાઇન.",
  },
  "Surface Cleaner": {
    en: "Fragrant everyday cleaning for floors, counters, and living spaces.",
    hi: "फ्लोर, काउंटर और लिविंग स्पेस के लिए खुशबूदार रोज़मर्रा क्लीनिंग।",
    gu: "ફ્લોર, કાઉન્ટર અને લિવિંગ સ્પેસ માટે સુગંધિત દૈનિક ક્લીનિંગ.",
  },
  Shampoo: {
    en: "Everyday hair cleansing with gentle care and nourishing feel.",
    hi: "नर्म केयर और पौष्टिक एहसास के साथ रोज़ाना हेयर क्लेंसिंग।",
    gu: "નરમ કેર અને પોષણાત્મક અનુભવ સાથે દૈનિક હેર ક્લેન્સિંગ.",
  },
  "Hair Oil": {
    en: "Daily nourishment for stronger-looking, healthier hair.",
    hi: "मजबूत और हेल्दी दिखने वाले बालों के लिए रोज़ाना पोषण।",
    gu: "વધુ મજબૂત અને હેલ્ધી દેખાતા વાળ માટે દૈનિક પોષણ.",
  },
};

export function getCategoryLabel(language: AppLanguage, category: ProductCategory) {
  return pick(language, categoryLabels[category]);
}

export function getCategoryDescription(
  language: AppLanguage,
  category: ProductCategory,
  fallback: string,
) {
  return pick(language, categoryDescriptions[category] ?? { en: fallback, hi: fallback, gu: fallback });
}
