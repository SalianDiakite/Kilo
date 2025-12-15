import { headers } from "next/headers"; // Using headers to get raw cookie string

import { type Language, getTranslation, type TranslationKey } from "./translations"

export async function getTranslations() {
  let lang: Language = "fr"; // Default to French

  try {
    const headerStore = headers();
    const cookieHeader = headerStore.get('cookie'); // Get the raw cookie header

    if (cookieHeader) {
      // Manually parse the cookie string
      const cookiesArray = cookieHeader.split(';').map(c => c.trim());
      for (const cookie of cookiesArray) {
        if (cookie.startsWith('kiloshare-language=')) {
          const langValue = cookie.substring('kiloshare-language='.length);
          if (langValue === "en" || langValue === "fr") {
            lang = langValue as Language;
            break;
          }
        }
      }
    }
  } catch (error) {
    console.error("Could not read language cookie from headers. Defaulting to 'fr'. Error:", error);
    lang = "fr";
  }

  const t = (key: TranslationKey): string => {
    return getTranslation(key, lang);
  }

  return { t, lang };
}