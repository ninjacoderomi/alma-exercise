"use client";
import { useContext, createContext, ReactNode } from "react";

const TranslationsContext = createContext({ t: (key: string) => key });
const useTranslations = () => useContext(TranslationsContext);

const TranslationsProvider = ({
  children,
  translatedStrings: dictionary,
}: {
  children: ReactNode;
  translatedStrings: { [key: string]: string };
}) => {
  const t = (key: string) => dictionary[key] ?? key;

  return (
    <TranslationsContext.Provider value={{ t }}>
      {children}
    </TranslationsContext.Provider>
  );
};

export { useTranslations, TranslationsProvider };
