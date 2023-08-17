import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-xhr-backend";
import translationsEn from "./translations/en.json";
import translationsEs from "./translations/es.json";
import translationsFr from "./translations/fr.json";
import translationsDe from "./translations/de.json";
import translationsIt from "./translations/it.json";
import translationsPt from "./translations/pt.json";
import translationsJa from "./translations/ja.json";
import translationsKo from "./translations/ko.json";
import translationsZh from "./translations/zh.json";
import translationsRu from "./translations/ru.json";

const resources = {
    en: { translation: translationsEn },
    es: { translation: translationsEs },
    fr: { translation: translationsFr },
    de: { translation: translationsDe },
    it: { translation: translationsIt },
    pt: { translation: translationsPt },
    ja: { translation: translationsJa },
    ko: { translation: translationsKo },
    zh: { translation: translationsZh },
    ru: { translation: translationsRu },
};

const fallbackLng = ["en"];
/*
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ru', name: 'Russian' },
*/

const availableLanguages = [
    "en",
    "es",
    "fr",
    "de",
    "it",
    "pt",
    "ja",
    "ko",
    "zh",
    "ru",
];

i18n.use(Backend)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng,
        detection: {
            checkWhitelist: true,
        },
        debug: false,
        whitelist: availableLanguages,
        interpolation: {
            escapeValue: false, // no need for react. it escapes by default
        },
    });

export default i18n;
