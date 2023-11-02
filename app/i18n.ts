'use client'
import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init(() => (
  {
    backend: {
      loadPath: "/assets/i18n/{{ns}}/{{lng}}.json"
    },
    debug: false,
    fallbackLng: "en",
    ns: ['common', 'home', 'checkout', 'about', 'offset'],
    interpolation: {
      espaceValue: false,
      formatSeparation: ','
    },
    react: {
      useSuspense: true,
    },
  }
))
export { i18n };
