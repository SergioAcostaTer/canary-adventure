'use client';

import React, {useRef} from 'react';
import {useLocale} from 'next-intl';
import {usePathname, useRouter} from 'next/navigation';
import {Globe} from 'lucide-react';

// Minimal, dependency-free language switcher button for Next.js App Router + next-intl.
// Assumes locales are prefixed in the URL: /en, /es, /de, /fr
// Place this component anywhere in a client layout/component.

const LOCALES = ['en', 'es', 'de', 'fr'] as const;
type Locale = typeof LOCALES[number];

const LANG_LABEL: Record<Locale, string> = {
  en: 'EN',
  es: 'ES',
  de: 'DE',
  fr: 'FR'
};

const CURRENCY_LABEL: Record<Locale, string> = {
  en: 'USD $',
  es: 'EUR €',
  de: 'EUR €',
  fr: 'EUR €'
};

function replaceLocaleInPath(pathname: string, next: Locale) {
  if (!pathname || pathname === '/') return `/${next}`;
  const parts = pathname.split('/');
  // parts[0] === '' because pathname starts with '/'
  if (LOCALES.includes(parts[1] as Locale)) {
    parts[1] = next;
    return parts.join('/') || '/';
  }
  // No locale prefix found; prepend it
  return `/${next}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
}

export default function LanguageSwitcher(
  {className}: {className?: string}
) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const onSelect = (next: Locale) => {
    const target = replaceLocaleInPath(pathname || '/', next);
    router.replace(target);
    // close the dropdown
    if (detailsRef.current) detailsRef.current.open = false;
  };

  const label = `${LANG_LABEL[locale]}/${CURRENCY_LABEL[locale]}`;

  return (
    <div className={['relative inline-block', className].filter(Boolean).join(' ')}>
      <details ref={detailsRef} className="group [&_summary::-webkit-details-marker]:hidden">
        <summary
          aria-label="Change language"
          className="flex items-center gap-2 rounded-2xl border px-3 py-2 text-sm font-medium shadow-sm hover:bg-gray-50 dark:hover:bg-neutral-900 cursor-pointer select-none"
        >
          <Globe className="size-4" aria-hidden />
          <span>{label}</span>
        </summary>
        <div
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border bg-white/95 backdrop-blur p-1 shadow-lg dark:bg-neutral-900/95"
          role="menu"
        >
          {LOCALES.map((code) => (
            <button
              key={code}
              role="menuitemradio"
              aria-checked={locale === code}
              onClick={() => onSelect(code)}
              className={[
                'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm',
                'hover:bg-gray-100 dark:hover:bg-neutral-800',
                locale === code ? 'font-semibold' : 'font-normal'
              ].join(' ')}
            >
              <span>{LANG_LABEL[code]} • {CURRENCY_LABEL[code]}</span>
              {locale === code && (
                <span className="text-xs" aria-hidden>✓</span>
              )}
            </button>
          ))}
        </div>
      </details>
    </div>
  );
}
