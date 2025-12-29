import { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'hi' | 'ar' | 'zh';

type Translations = {
  [key in Language]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.review': 'Review',
    'hero.title': 'Automated Code Review',
    'hero.subtitle': 'Elevate your code quality with AI-powered static analysis.',
    'btn.start': 'Start Review',
    'btn.dashboard': 'View Dashboard',
  },
  hi: {
    'nav.home': 'होम',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.review': 'समीक्षा',
    'hero.title': 'स्वचालित कोड समीक्षा',
    'hero.subtitle': 'AI-संचालित विश्लेषण के साथ अपने कोड की गुणवत्ता बढ़ाएं।',
    'btn.start': 'समीक्षा शुरू करें',
    'btn.dashboard': 'डैशबोर्ड देखें',
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.dashboard': 'لوحة القيادة',
    'nav.review': 'مراجعة',
    'hero.title': 'مراجعة الكود الآلية',
    'hero.subtitle': 'ارفع جودة الكود الخاص بك باستخدام التحليل المدعوم بالذكاء الاصطناعي.',
    'btn.start': 'ابدأ المراجعة',
    'btn.dashboard': 'عرض لوحة القيادة',
  },
  zh: {
    'nav.home': '首页',
    'nav.dashboard': '仪表板',
    'nav.review': '审查',
    'hero.title': '自动化代码审查',
    'hero.subtitle': '利用人工智能静态分析提升您的代码质量。',
    'btn.start': '开始审查',
    'btn.dashboard': '查看仪表板',
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      <div dir={dir} className={language === 'ar' ? 'font-arabic' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
