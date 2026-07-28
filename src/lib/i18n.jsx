import { createContext, useContext, useMemo } from "react";
import en from "@/locales/en.json";
import id from "@/locales/id.json";

const locales = { en, id };

const LanguageContext = createContext("en");

/**
 * LanguageProvider wraps the app and provides the current language.
 * Reads the language from the invitation config (API response).
 *
 * @param {object} props
 * @param {"en"|"id"} props.language - Current language code
 * @param {React.ReactNode} props.children
 */
export function LanguageProvider({ language = "en", children }) {
  return (
    <LanguageContext.Provider value={language}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * useTranslation hook returns a `t` function for looking up translation keys.
 *
 * Keys are dot-separated paths into the locale JSON, e.g. "hero.days".
 *
 * @returns {{ t: (key: string) => string, language: string }}
 *
 * @example
 * const { t } = useTranslation();
 * return <h1>{t("hero.marriageTitle")}</h1>;
 */
export function useTranslation() {
  const language = useContext(LanguageContext);

  const t = useMemo(() => {
    const messages = locales[language] || locales.en;

    return (key) => {
      const parts = key.split(".");
      let value = messages;
      for (const part of parts) {
        if (value == null || typeof value !== "object") return key;
        value = value[part];
      }
      return typeof value === "string" ? value : key;
    };
  }, [language]);

  return { t, language };
}
