// app/layout.tsx (SEO-Enhanced Root Layout)
import { Header } from "@/features/ui/header/Header";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Canary Adventures",
  description: "Enjoy the best adventures in the Canary Islands",
  keywords: "canary islands, adventures, tourism, travel",
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
  verification: {
    // Add your verification IDs here
    // google: 'your-google-verification-id',
    // yandex: 'your-yandex-verification-id',
  },
};

const themeScript = `
!function(){
  try {
    var d = document.documentElement;
    var e = localStorage.getItem('theme');
    if (e === 'system' || (!e && true)) {
      var t = '(prefers-color-scheme: dark)';
      var m = window.matchMedia(t);
      d.setAttribute('data-theme', m.matches ? 'dark' : 'light');
      d.style.colorScheme = m.matches ? 'dark' : 'light';
    } else if (e === 'light' || e === 'dark') {
      d.setAttribute('data-theme', e);
      d.style.colorScheme = e;
    }
  } catch(e){}
}();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        <SpeedInsights />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Header />
        <main className="max-w-7xl mx-auto bg-[var(--background)] text-[var(--foreground)]">
          {children}
        </main>
      </body>
    </html>
  );
}
