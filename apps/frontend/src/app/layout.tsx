import { Header } from "@/features/ui/header/Header";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Canary Adventures",
  description: "Enjoy the best adventures in the Canary Islands",
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
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8 bg-[var(--background)] text-[var(--foreground)]">
          {children}
        </main>
      </body>
    </html>
  );
}
