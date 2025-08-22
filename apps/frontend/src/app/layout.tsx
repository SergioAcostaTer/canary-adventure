// app/layout.tsx (SEO-Enhanced Root Layout - Final Version)
import { ThemeProvider } from "@/providers/ThemeProvider";
import { UserProvider } from "@/context/UserContext";
import { Header } from "@/features/ui/header/Header";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
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
  title: {
    default: "Canary Adventures",
    template: "%s | Canary Adventures",
  },
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
  verification: {
    // Add your verification IDs here
    // google: 'your-google-verification-id',
    // yandex: 'your-yandex-verification-id',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SpeedInsights />
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
