// app/[locale]/layout.tsx (Maximum SEO & Sharing Optimizations)
import { routing } from "@/i18n/routing";
import { Header } from "@/modules/core/components/Header";
import { UserProvider } from "@/modules/core/context/UserContext";
import "@/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Poppins } from "next/font/google";
import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F19" },
  ],
  colorScheme: "light dark",
};

// ---- Config helpers ----
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://canary-adventure.vercel.app";

const DEFAULT_OG = "/og/og.png";
const SITE_NAME = "Canary Adventures";
const BRAND_COLOR = "#FF6B35";
const TWITTER_HANDLE = "@CanaryAdventure"; // Add your Twitter handle

// Enhanced SEO copy per locale with more comprehensive keywords
const localeMetadata = {
  en: {
    title: "Canary Adventures – Best Tours & Activities in the Canary Islands",
    description:
      "Discover amazing tours, outdoor activities, and unique adventures across all Canary Islands. Expert-guided excursions in Tenerife, Gran Canaria, Lanzarote, Fuerteventura, La Palma, La Gomera & El Hierro. Book your unforgettable island experience today!",
    keywords: [
      // Primary keywords
      "Canary Islands tours",
      "Canary Islands activities",
      "Canary Islands excursions",
      "Canary Islands adventures",

      // Island-specific
      "Tenerife tours",
      "Tenerife excursions",
      "Tenerife Mount Teide",
      "Gran Canaria tours",
      "Gran Canaria dunes",
      "Lanzarote volcano tours",
      "Lanzarote Timanfaya",
      "Fuerteventura surfing",
      "Fuerteventura beaches",
      "La Palma hiking",
      "La Palma volcano",
      "La Gomera whale watching",
      "El Hierro diving",

      // Activity types
      "whale watching Canary Islands",
      "hiking Canary Islands",
      "volcano tours",
      "surfing lessons",
      "diving Canary Islands",
      "boat trips",
      "jeep safari",
      "stargazing tours",
      "wine tasting",
      "cultural tours",

      // Long-tail keywords
      "best things to do Canary Islands",
      "Canary Islands vacation activities",
      "island hopping Canary Islands",
      "family activities Canary Islands",
      "outdoor adventures Spain",
      "Atlantic Ocean tours",
    ],
    ogAlt:
      "Discover the best tours and activities in the Canary Islands with Canary Adventures",
  },
  es: {
    title: "Canary Adventures – Mejores Tours y Actividades en Islas Canarias",
    description:
      "Descubre tours increíbles, actividades al aire libre y aventuras únicas en todas las Islas Canarias. Excursiones guiadas por expertos en Tenerife, Gran Canaria, Lanzarote, Fuerteventura, La Palma, La Gomera y El Hierro. ¡Reserva tu experiencia inolvidable hoy!",
    keywords: [
      "tours Islas Canarias",
      "actividades Islas Canarias",
      "excursiones Islas Canarias",
      "aventuras Islas Canarias",
      "tours Tenerife",
      "excursiones Tenerife",
      "Teide tours",
      "tours Gran Canaria",
      "dunas Maspalomas",
      "tours volcán Lanzarote",
      "Timanfaya tours",
      "surf Fuerteventura",
      "playas Fuerteventura",
      "senderismo La Palma",
      "volcán La Palma",
      "avistamiento cetáceos",
      "buceo El Hierro",
      "qué hacer Canarias",
      "vacaciones Canarias",
      "turismo activo Canarias",
      "actividades familiares Canarias",
    ],
    ogAlt:
      "Descubre los mejores tours y actividades en las Islas Canarias con Canary Adventures",
  },
  de: {
    title: "Canary Adventures – Beste Touren & Aktivitäten auf den Kanaren",
    description:
      "Entdecke fantastische Touren, Outdoor-Aktivitäten und einzigartige Abenteuer auf allen Kanarischen Inseln. Expertengeführte Ausflüge auf Teneriffa, Gran Canaria, Lanzarote, Fuerteventura, La Palma, La Gomera & El Hierro. Buche dein unvergessliches Inselerlebnis heute!",
    keywords: [
      "Kanaren Touren",
      "Kanaren Aktivitäten",
      "Kanaren Ausflüge",
      "Kanaren Abenteuer",
      "Teneriffa Touren",
      "Teneriffa Ausflüge",
      "Teide Touren",
      "Gran Canaria Touren",
      "Maspalomas Dünen",
      "Lanzarote Vulkan Touren",
      "Timanfaya Touren",
      "Fuerteventura Surfen",
      "Fuerteventura Strände",
      "La Palma Wandern",
      "La Palma Vulkan",
      "Walbeobachtung Kanaren",
      "El Hierro Tauchen",
      "Kanaren Urlaub Aktivitäten",
      "was unternehmen Kanaren",
      "Familienaktivitäten Kanaren",
    ],
    ogAlt:
      "Entdecke die besten Touren und Aktivitäten auf den Kanarischen Inseln mit Canary Adventures",
  },
  fr: {
    title: "Canary Adventures – Meilleurs Tours et Activités aux Îles Canaries",
    description:
      "Découvrez des tours incroyables, des activités de plein air et des aventures uniques sur toutes les Îles Canaries. Excursions guidées par des experts à Tenerife, Gran Canaria, Lanzarote, Fuerteventura, La Palma, La Gomera et El Hierro. Réservez votre expérience inoubliable dès aujourd'hui !",
    keywords: [
      "tours Îles Canaries",
      "activités Îles Canaries",
      "excursions Îles Canaries",
      "aventures Îles Canaries",
      "tours Tenerife",
      "excursions Tenerife",
      "tours Teide",
      "tours Grande Canarie",
      "dunes Maspalomas",
      "tours volcan Lanzarote",
      "tours Timanfaya",
      "surf Fuerteventura",
      "plages Fuerteventura",
      "randonnée La Palma",
      "volcan La Palma",
      "observation baleines",
      "plongée El Hierro",
      "que faire Canaries",
      "vacances Canaries",
      "activités familiales Canaries",
    ],
    ogAlt:
      "Découvrez les meilleurs tours et activités aux Îles Canaries avec Canary Adventures",
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

// Get user agent for better targeting
async function getUserAgent() {
  const headersList = await headers();
  return headersList.get("user-agent") || "";
}

// ---- Enhanced Metadata ----
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const meta = getLocaleMeta(locale);
  const ogImage = `${SITE_URL}/og/og.png`;
  const userAgent = await getUserAgent();

  // Detect mobile for optimized descriptions
  const isMobile = /Mobile|Android|iPhone|iPad/i.test(userAgent);
  const description = isMobile
    ? meta.description.substring(0, 120) + "..."
    : meta.description;

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: meta.title,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    keywords: Array.from(new Set(meta.keywords)).join(", "),
    authors: [
      { name: SITE_NAME, url: SITE_URL },
      { name: "Canary Islands Tour Experts" },
    ],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    applicationName: SITE_NAME,
    category: "Travel & Tourism",
    classification: "Travel Services",

    // Enhanced alternates
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: languageAlternates(),
      types: {
        "application/rss+xml": `${SITE_URL}/rss.xml`,
        "application/atom+xml": `${SITE_URL}/atom.xml`,
      },
    },

    // Enhanced OpenGraph
    openGraph: {
      type: "website",
      url: `${SITE_URL}/${locale}`,
      siteName: SITE_NAME,
      title: meta.title,
      description,
      locale: locale.replace("-", "_"),
      alternateLocale: routing.locales
        .filter((l) => l !== locale)
        .map((l) => l.replace("-", "_")),
      images: [
        {
          url: ogImage,
          width: 850,
          height: 567,
          alt: meta.ogAlt,
          type: "image/png",
        },
        {
          url: `${SITE_URL}/og/square-og.png`,
          width: 568,
          height: 567,
          alt: meta.ogAlt,
          type: "image/png",
        },
        {
          url: DEFAULT_OG,
          width: 850,
          height: 567,
          alt: meta.ogAlt,
          type: "image/png",
        },
      ],
      videos: [
        {
          url: `${SITE_URL}/videos/intro/intro-720.mp4`,
          width: 1280,
          height: 720,
          type: "video/mp4",
        },
      ],
    },

    // Enhanced Twitter/X
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: meta.title,
      description,
      images: [
        {
          url: ogImage,
          alt: meta.ogAlt,
          width: 1200,
          height: 630,
        },
      ],
    },

    // Apple-specific meta tags
    appleWebApp: {
      capable: true,
      title: SITE_NAME,
      statusBarStyle: "black-translucent",
      startupImage: [
        {
          url: "/startup/iphone.png",
          media:
            "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)",
        },
        {
          url: "/startup/ipad.png",
          media:
            "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)",
        },
      ],
    },

    // Enhanced robots
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    // Enhanced icons
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "16x16 32x32" },
        { url: "/icons/icon-16.png", sizes: "16x16", type: "image/png" },
        { url: "/icons/icon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/icons/icon-96.png", sizes: "96x96", type: "image/png" },
        { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
      apple: [
        {
          url: "/icons/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
        },
        {
          url: "/icons/apple-touch-icon-152x152.png",
          sizes: "152x152",
          type: "image/png",
        },
        {
          url: "/icons/apple-touch-icon-167x167.png",
          sizes: "167x167",
          type: "image/png",
        },
      ],
      other: [
        {
          rel: "mask-icon",
          url: "/icons/safari-pinned-tab.svg",
          color: BRAND_COLOR,
        },
        {
          rel: "shortcut icon",
          url: "/favicon.ico",
        },
      ],
    },

    manifest: "/site.webmanifest",

    // Verification tags for various services
    verification: {
      google: process.env.GOOGLE_VERIFICATION, // TODO: Add your actual verification code
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_VERIFICATION,
      other: {
        "msvalidate.01": process.env.BING_VERIFICATION || "",
        "facebook-domain-verification": process.env.FACEBOOK_VERIFICATION || "",
        "p:domain_verify": process.env.PINTEREST_VERIFICATION || "",
      },
    },

    // Additional meta tags
    other: {
      "hreflang-default": "en",
      "theme-color": BRAND_COLOR,
      "msapplication-TileColor": BRAND_COLOR,
      "msapplication-config": "/browserconfig.xml",
      "format-detection": "telephone=no",
      "mobile-web-capable": "yes",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
      HandheldFriendly: "True",
      MobileOptimized: "320",
      referrer: "no-referrer-when-downgrade",
      "color-scheme": "light dark",
      "supported-color-schemes": "light dark",
    },

    // Geo tagging for location-based business
    // @ts-expect-error - Next.js types are incomplete here
    geo: {
      region: "ES-CN",
      placename: "Canary Islands",
      position: "28.2916;-16.6291",
      ICBM: "28.2916, -16.6291",
    },
  };
}

// ---- Enhanced Layout ----
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const cookieStore = await cookies();
  const cookieTheme = cookieStore.get("theme")?.value;
  const serverThemeAttr =
    cookieTheme === "light" || cookieTheme === "dark" ? cookieTheme : undefined;

  const meta = getLocaleMeta(locale);

  // Enhanced JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: SITE_NAME,
        url: `${SITE_URL}/${locale}`,
        inLanguage: locale,
        description: meta.description,
        publisher: { "@id": `${SITE_URL}/#organization` },
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/${locale}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo.png`,
          width: 512,
          height: 512,
        },
        sameAs: [
          "https://facebook.com/canaryadventures", // TODO: Update with real URLs
          "https://instagram.com/canaryadventures",
          "https://twitter.com/canaryadventure",
          "https://youtube.com/@canaryadventures",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "Customer Service",
          areaServed: "ES",
          availableLanguage: ["English", "Spanish", "German", "French"],
        },
        address: {
          "@type": "PostalAddress",
          addressCountry: "ES",
          addressRegion: "Canary Islands",
        },
      },
      {
        "@type": "TouristDestination",
        "@id": `${SITE_URL}/#destination`,
        name: "Canary Islands",
        description:
          "Beautiful Atlantic archipelago perfect for outdoor adventures and tours",
        geo: {
          "@type": "GeoCoordinates",
          latitude: 28.2916,
          longitude: -16.6291,
        },
        containedInPlace: {
          "@type": "Country",
          name: "Spain",
        },
        touristType: [
          "Adventure Travelers",
          "Nature Lovers",
          "Families",
          "Photography Enthusiasts",
        ],
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#service`,
        name: "Canary Islands Tours & Activities",
        description: meta.description,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: {
          "@type": "Place",
          name: "Canary Islands",
          geo: {
            "@type": "GeoCoordinates",
            latitude: 28.2916,
            longitude: -16.6291,
          },
        },
        serviceType: "Tour Operator",
        offers: {
          "@type": "Offer",
          category: "Tours & Activities",
          availability: "https://schema.org/InStock",
        },
      },
    ],
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/${locale}`,
      },
    ],
  };

  // Enhanced theme detection script with better performance
  const initialThemeScript = `
    (function(){
      try {
        var m = document.cookie.match(/(?:^|; )theme=([^;]+)/);
        var raw = m ? decodeURIComponent(m[1]) : null;
        var d = document.documentElement;
        var set = function(v){ 
          d.setAttribute('data-theme', v); 
          d.style.colorScheme = v;
          document.querySelector('meta[name="theme-color"]')?.setAttribute('content', v === 'dark' ? '#0B0F19' : '#ffffff');
        };

        if (!raw || raw === 'system') {
          var isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
          set(isDark ? 'dark' : 'light');
          
          // Listen for system theme changes
          if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
              if (!document.cookie.match(/theme=(light|dark)/)) {
                set(e.matches ? 'dark' : 'light');
              }
            });
          }
        } else {
          set(raw === 'dark' ? 'dark' : 'light');
        }
      } catch (e) {
        console.warn('Theme initialization failed:', e);
      }
    })();
  `;

  // Performance optimization script
  const performanceScript = `
    (function() {
      // Preload critical resources
      if ('requestIdleCallback' in window) {
        requestIdleCallback(function() {
          ['${SITE_URL}/api/tours/popular', '${SITE_URL}/api/activities/featured'].forEach(function(url) {
            fetch(url, { method: 'GET', mode: 'cors', credentials: 'same-origin' }).catch(function() {});
          });
        });
      }
      
      // Add loading="lazy" to images without it
      document.addEventListener('DOMContentLoaded', function() {
        var images = document.querySelectorAll('img:not([loading])');
        images.forEach(function(img) {
          if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
          }
        });
      });
    })();
  `;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      {...(serverThemeAttr ? { "data-theme": serverThemeAttr } : {})}
    >
      <head>
        {/* Critical CSS should be inlined here for better performance */}

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />

        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://unpkg.com" />

        {/* Preload critical resources */}
        <link
          rel="preload"
          as="image"
          href="/videos/intro/intro.webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href={`/og/og.png`}
          fetchPriority="high"
        />

        <link
          rel="preload"
          as="video"
          href="/videos/intro/intro-480.webm"
          type="video/webm"
        />
        <link
          rel="preload"
          as="video"
          href="/videos/intro/intro-480.mp4"
          type="video/mp4"
        />

        {/* Critical scripts */}
        <script dangerouslySetInnerHTML={{ __html: initialThemeScript }} />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        {/* Additional meta tags for better sharing */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* Geo tags for location-based business */}
        <meta name="geo.region" content="ES-CN" />
        <meta name="geo.placename" content="Canary Islands" />
        <meta name="geo.position" content="28.2916;-16.6291" />
        <meta name="ICBM" content="28.2916, -16.6291" />

        {/* Security headers */}
        <meta name="referrer" content="no-referrer-when-downgrade" />

        {/* Performance optimization script */}
        <script dangerouslySetInnerHTML={{ __html: performanceScript }} />

        {/* Speed Insights */}
        <SpeedInsights />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50"
        >
          Skip to main content
        </a>

        <UserProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <Header />
            <main
              id="main-content"
              className="max-w-7xl mx-auto bg-[var(--background)] text-[var(--foreground)]"
              role="main"
            >
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
