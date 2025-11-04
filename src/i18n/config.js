import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ar from './locales/ar.json';
import de from './locales/de.json';
import es from './locales/es.json';

// Initialize i18next with English, Arabic, German, and Spanish support
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
      de: { translation: de },
      es: { translation: es }
    },
    lng: localStorage.getItem('appLanguage') || 'en', // default language from localStorage or English
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

// Save language preference to localStorage when changed
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('appLanguage', lng);
  // Keep LTR layout for all languages (no RTL flip)
  document.documentElement.dir = 'ltr';
  document.documentElement.lang = lng;
});

// Set initial direction - always LTR
document.documentElement.dir = 'ltr';
document.documentElement.lang = i18n.language;

export default i18n;

