// app/[locale]/layout.tsx (Locale Layout with SEO enhancements - Fixed)
import { UserProvider } from "@/modules/core/context/UserContext";
import { Header } from "@/modules/core/components/Header";
import { routing } from "@/i18n/routing";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F19" },
  ],
};

// ---- Config helpers ----
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://canary-adventure.vercel.app";

const DEFAULT_OG = "/og/og-default.png";
const LOCALE_OG = (locale: string) => `/og/og-${locale}.png`;

// SEO copy per locale
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
  const langs = Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}/${l}`]) // Fix: use full URL
  ) as Record<string, string>;
  return { ...langs, "x-default": `${SITE_URL}/en` }; // Fix: use full URL
}

// ---- Metadata ----
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params; // Fix: await params
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
      canonical: `${SITE_URL}/${locale}`, // Fix: use full URL
      languages: languageAlternates(),
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/${locale}`, // Fix: use full URL
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
      creator: "@yourhandle",
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

  setRequestLocale(locale);

  // Load messages on the server for this locale
  const messages = await getMessages({ locale });

  // JSON-LD for the Website entity
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <UserProvider>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main className="max-w-7xl mx-auto bg-[var(--background)] text-[var(--foreground)]">
            {children}
          </main>
        </NextIntlClientProvider>
      </UserProvider>
    </>
  );
}

// ---- Static params for better SEO / SSG ----
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
