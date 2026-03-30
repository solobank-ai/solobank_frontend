"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { en, type Translations } from "./translations/en";
import { ru } from "./translations/ru";

export type Locale = "en" | "ru";

const translations: Record<Locale, Translations> = { en, ru };

interface LocaleContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: "en",
  t: en,
  setLocale: () => {},
  toggleLocale: () => {},
});

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const saved = localStorage.getItem("solobank-locale") as Locale | null;
    if (saved && (saved === "en" || saved === "ru")) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    localStorage.setItem("solobank-locale", l);
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "en" ? "ru" : "en");
  }, [locale, setLocale]);

  return (
    <LocaleContext.Provider value={{ locale, t: translations[locale], setLocale, toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LocaleContext);
}
