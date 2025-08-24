// /i18n/config.ts
export const locales = ['en', 'es', 'de', 'fr'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';
