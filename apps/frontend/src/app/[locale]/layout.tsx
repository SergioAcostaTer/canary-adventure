// app/[locale]/layout.tsx (Locale Layout with SEO enhancements)
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

// ---- Config helpers ----
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://canary-adventure.vercel.app"; // <-- set your real domain in NEXT_PUBLIC_SITE_URL

const DEFAULT_OG = "/og/og-default.png"; // place a global fallback OG image
const LOCALE_OG = (locale: string) => `/og/og-${locale}.png`; // optional per-locale image

// SEO copy per locale (title/description/keywords, tuned for Tours & Activities)
const localeMetadata = {
  en: {
    title: "Canary Adventures – Tours & Activities in the Canary Islands",
    description:
      "Discover the best tours, outdoor activities, and island adventures across Tenerife, Gran Canaria, Lanzarote, and more.",
    keywords: [
      "Canary Islands tours",
      "Canary Islands activities",
      "Tenerife excursions",
      "Gran Canaria adventures",
      "Lanzarote volcano tours",
      "Fuerteventura surfing",
      "island activities",
      "outdoor adventures",
    ],
  },
  es: {
    title: "Canary Adventures – Tours y Actividades en Islas Canarias",
    description:
      "Descubre los mejores tours, actividades y aventuras en Tenerife, Gran Canaria, Lanzarote y más.",
    keywords: [
      "tours Islas Canarias",
      "actividades Islas Canarias",
      "excursiones Tenerife",
      "aventuras Gran Canaria",
      "tours volcán Lanzarote",
      "surf Fuerteventura",
      "actividades en islas",
      "aventuras al aire libre",
    ],
  },
  de: {
    title: "Canary Adventures – Touren & Aktivitäten auf den Kanaren",
    description:
      "Entdecke die besten Touren, Outdoor-Aktivitäten und Abenteuer auf Teneriffa, Gran Canaria, Lanzarote und mehr.",
    keywords: [
      "Kanaren Touren",
      "Kanaren Aktivitäten",
      "Teneriffa Ausflüge",
      "Gran Canaria Abenteuer",
      "Lanzarote Vulkan Tour",
      "Fuerteventura Surfen",
      "Insel Aktivitäten",
      "Outdoor Abenteuer",
    ],
  },
  fr: {
    title: "Canary Adventures – Tours et Activités aux Îles Canaries",
    description:
      "Découvrez les meilleurs tours, activités et aventures à Tenerife, Gran Canaria, Lanzarote et plus encore.",
    keywords: [
      "tours Îles Canaries",
      "activités Îles Canaries",
      "excursions Tenerife",
      "aventures Grande Canarie",
      "tour volcan Lanzarote",
      "surf Fuerteventura",
      "activités îles",
      "aventures plein air",
    ],
  },
} as const;

function getLocaleMeta(locale: string) {
  const key = locale as keyof typeof localeMetadata;
  return localeMetadata[key] ?? localeMetadata.en;
}

function languageAlternates() {
  // Build from routing.locales to stay DRY
  const langs = Object.fromEntries(
    routing.locales.map((l) => [l, `/${l}`])
  ) as Record<string, string>;
  return { ...langs, "x-default": "/en" };
}

// ---- Metadata ----
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const meta = getLocaleMeta(locale);
  const ogImage = LOCALE_OG(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: meta.title,
      template: `%s | Canary Adventures`,
    },
    description: meta.description,
    keywords: Array.from(meta.keywords),
    applicationName: "Canary Adventures",
    alternates: {
      canonical: `/${locale}`,
      languages: languageAlternates(),
    },
    openGraph: {
      type: "website",
      url: `/${locale}`,
      siteName: "Canary Adventures",
      title: meta.title,
      description: meta.description,
      locale,
      images: [
        { url: ogImage, width: 1200, height: 630, alt: meta.title },
        { url: DEFAULT_OG, width: 1200, height: 630, alt: meta.title },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: [ogImage, DEFAULT_OG],
      creator: "@yourhandle", // optional: set your X/Twitter handle
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#ffffff" },
      { media: "(prefers-color-scheme: dark)", color: "#0B0F19" },
    ],
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      ],
      apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
    },
    manifest: "/site.webmanifest",
    other: {
      // Helpful for analytics filters / debugging
      "hreflang-default": "en",
    },
  };
}

// ---- Layout ----
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params;

  // Validate locale
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  // Load messages on the server for this locale (next-intl v3+)
  const messages = await getMessages({ locale });

  // Optional JSON-LD for the Website entity (basic, localized)
  const meta = getLocaleMeta(locale);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Canary Adventures",
    url: `${SITE_URL}/${locale}`,
    inLanguage: locale,
    description: meta.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/${locale}/search?q={query}`,
      "query-input": "required name=query",
    },
  };

  return (
    <html lang={locale}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// ---- Static params for better SEO / SSG ----
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
