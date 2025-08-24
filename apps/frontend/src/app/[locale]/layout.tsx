// app/[locale]/layout.tsx (Merged Layout with SEO, Theme, and Font)
import { UserProvider } from "@/modules/core/context/UserContext";
import { Header } from "@/modules/core/components/Header";
import { routing } from "@/i18n/routing";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import "@/styles/globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
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

const DEFAULT_OG = "/og/og.png";

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
    routing.locales.map((l) => [l, `${SITE_URL}/${l}`])
  ) as Record<string, string>;
  return { ...langs, "x-default": `${SITE_URL}/en` };
}

// ---- Metadata ----
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = getLocaleMeta(locale);
  const ogImage = `${SITE_URL}/og/${locale}.png`;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: meta.title,
      template: `%s | Canary Adventures`,
    },
    description: meta.description,
    keywords: Array.from(meta.keywords),
    authors: [{ name: "Canary Adventures" }],
    creator: "Canary Adventures",
    publisher: "Canary Adventures",
    applicationName: "Canary Adventures",
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: languageAlternates(),
    },
    openGraph: {
      type: "website",
      url: `${SITE_URL}/${locale}`,
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
    verification: {},
    other: {
      "hreflang-default": "en",
    },
  };
}

// ---- Layout ----
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const cookieTheme = (await cookies()).get("theme")?.value;
  const serverThemeAttr =
    cookieTheme === "light" || cookieTheme === "dark" ? cookieTheme : undefined;

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

  const initialThemeScript = `
    (function(){
      try {
        var m = document.cookie.match(/(?:^|; )theme=([^;]+)/);
        var raw = m ? decodeURIComponent(m[1]) : null;
        var d = document.documentElement;
        var set = function(v){ d.setAttribute('data-theme', v); d.style.colorScheme = v; };

        if (!raw || raw === 'system') {
          var isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
          set(isDark ? 'dark' : 'light');
        } else {
          set(raw === 'dark' ? 'dark' : 'light');
        }
      } catch (e) {}
    })();
  `;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      {...(serverThemeAttr ? { "data-theme": serverThemeAttr } : {})}
    >
      <head>
        <SpeedInsights />
        <script dangerouslySetInnerHTML={{ __html: initialThemeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link
          rel="preload"
          as="image"
          href="/videos/intro/intro.webp"
          fetchPriority="high"
        />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <UserProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <main className="max-w-7xl mx-auto bg-[var(--background)] text-[var(--foreground)]">
              {children}
            </main>
          </NextIntlClientProvider>
        </UserProvider>
      </body>
    </html>
  );
}

// ---- Static params for better SEO / SSG ----
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}