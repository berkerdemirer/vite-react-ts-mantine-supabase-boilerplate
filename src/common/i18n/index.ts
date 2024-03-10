import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import intervalPlural from "i18next-intervalplural-postprocessor";
import resources from "./resources";

export const localeConfigurations: Record<
  string,
  {
    label: string;
    dateFormat: string;
    timeFormat: string;
  }
> = {
  et: { label: "Eesti", dateFormat: "dd.MM.yyyy", timeFormat: "HH:mm" },
  en: { label: "English", dateFormat: "dd/MM/yyyy", timeFormat: "HH:mm" },
};

export const i18nInstance = i18n.createInstance({
  resources,
  fallbackLng: "en",
  supportedLngs: Object.keys(localeConfigurations),
  defaultNS: "project",
  load: "currentOnly",
  interpolation: {
    escapeValue: false,
  },
  initImmediate: false,
  // debug: true,
});

void i18nInstance
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(intervalPlural)
  .init();

export const currentLocaleConfiguration =
  localeConfigurations[i18nInstance.language];

export const getLanguage = () => i18nInstance.language;
