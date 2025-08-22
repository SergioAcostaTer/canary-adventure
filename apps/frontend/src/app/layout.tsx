// app/layout.tsx
import { UserProvider } from "@/context/UserContext";
import { Header } from "@/features/ui/header/Header";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F19" },
  ],
};

export const metadata: Metadata = {
  title: { default: "Canary Adventures", template: "%s | Canary Adventures" },
  description: "Enjoy the best adventures in the Canary Islands",
  keywords: ["canary islands", "adventures", "tourism", "travel"],
  authors: [{ name: "Canary Adventures" }],
  creator: "Canary Adventures",
  publisher: "Canary Adventures",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {},
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieTheme = (await cookies()).get("theme")?.value;
  const serverThemeAttr =
    cookieTheme === "light" || cookieTheme === "dark" ? cookieTheme : undefined;

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
      lang="en"
      suppressHydrationWarning
      {...(serverThemeAttr ? { "data-theme": serverThemeAttr } : {})}
    >
      <head>
        <SpeedInsights />
        <script dangerouslySetInnerHTML={{ __html: initialThemeScript }} />
        <link
          rel="preload"
          as="image"
          href="/videos/intro/intro.webp"
          fetchPriority="high"
        />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <ThemeProvider>
          <UserProvider>
            <Header />
            <main className="max-w-7xl mx-auto bg-[var(--background)] text-[var(--foreground)]">
              {children}
            </main>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
