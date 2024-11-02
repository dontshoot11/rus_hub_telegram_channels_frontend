import { createTranslationManager } from "./translationManager";
import en from "./en.json";

const langs = {
  en: en,
};

export const getLangSettings = (url) => {
  return createTranslationManager(url, langs);
};
