import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es', 'de', 'fr'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/experiences': {
      en: '/experiences',
      es: '/experiencias',
      de: '/erlebnisse',
      fr: '/experiences'
    },
    '/experiences/[slug]': {
      en: '/experiences/[slug]',
      es: '/experiencias/[slug]',
      de: '/erlebnisse/[slug]',
      fr: '/experiences/[slug]'
    }
  }
});
