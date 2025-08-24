'use client';

import { Globe } from 'lucide-react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useRef } from 'react';

// Professional, responsive language selector for Next.js App Router + next-intl.
// No external UI deps (Tailwind CSS classes only). Matches an "IconButton" vibe.
// - URL strategy: locale prefix in pathname (/en, /es, /de, /fr)
// - Keyboard & screen-reader friendly
// - Responsive: icon-only on xs, icon + label on sm+

const LOCALES = ['en', 'es', 'de', 'fr'] as const;
type Locale = (typeof LOCALES)[number];

const LANG_LABEL: Record<Locale, string> = {
  en: 'EN',
  es: 'ES',
  de: 'DE',
  fr: 'FR',
};

function replaceLocaleInPath(pathname: string, next: Locale) {
  if (!pathname || pathname === '/') return `/${next}`;
  const parts = pathname.split('/');
  if (LOCALES.includes(parts[1] as Locale)) {
    parts[1] = next;
    return parts.join('/') || '/';
  }
  return `/${next}${pathname.startsWith('/') ? '' : '/'}${pathname}`;
}

export interface LanguageSwitcherProps {
  className?: string;
}

export default function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale() as Locale;
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const onSelect = (next: Locale) => {
    const target = replaceLocaleInPath(pathname || '/', next);
    router.replace(target);
    if (detailsRef.current) detailsRef.current.open = false;
  };

  const shortLabel = LANG_LABEL[locale];

  return (
    <div className={["relative inline-block", className].filter(Boolean).join(' ')}>
      <details
        ref={detailsRef}
        className="group [&_summary::-webkit-details-marker]:hidden"
      >
        <summary
          aria-label="Change language"
          className={[
            'flex items-center gap-2 cursor-pointer select-none',
            'rounded-2xl backdrop-blur',
            'hover:bg-gray-50 dark:hover:bg-neutral-900',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-primary,#3b82f6)]',
            'transition-colors',
          ].join(' ')}
        >
          <div className="flex flex-col items-center text-center group/icon">
            <Globe
              size={24}
              className="text-[var(--icon-default,currentColor)] group-hover/icon:text-[var(--brand-primary,#3b82f6)] transition-colors"
              aria-hidden
            />
            <span className="hidden sm:block text-[10px] sm:text-xs mt-1 group-hover/icon:text-[var(--brand-primary,#3b82f6)] transition-colors">
              {shortLabel}
            </span>
          </div>
        </summary>

        <div
          role="menu"
          className="absolute right-0 z-50 mt-2 w-32 overflow-hidden rounded-xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur"
        >
          <div className="p-1">
            {LOCALES.map((code) => {
              const active = locale === code;
              return (
                <button
                  key={code}
                  role="menuitemradio"
                  aria-checked={active}
                  onClick={() => onSelect(code)}
                  className={[
                    'flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm',
                    'hover:bg-gray-100 dark:hover:bg-neutral-800',
                    active ? 'font-semibold text-[var(--brand-primary,#3b82f6)]' : 'font-normal',
                    'transition-colors',
                  ].join(' ')}
                >
                  <span>{LANG_LABEL[code]}</span>
                  {active && (
                    <span className="text-xs" aria-hidden>
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </details>
    </div>
  );
}
