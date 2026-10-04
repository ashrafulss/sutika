import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import bn from "./bn.json";
import en from "./en.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { bn: { translation: bn }, en: { translation: en } },
    supportedLngs: ["bn", "en"],
    load: "languageOnly",
    fallbackLng: "bn",
    detection: { order: ["localStorage", "navigator"], caches: ["localStorage"] },
    interpolation: { escapeValue: false },
  });

// Keep <html lang="..."> in sync with the chosen language
document.documentElement.lang = i18n.resolvedLanguage ?? "bn";
i18n.on("languageChanged", (lng) => {
  document.documentElement.lang = lng;
});

export default i18n;