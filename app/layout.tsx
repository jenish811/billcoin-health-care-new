import type { Metadata } from "next";
import {
  Noto_Sans_Devanagari,
  Noto_Sans_Gujarati,
  Plus_Jakarta_Sans,
  Sora,
} from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AppPreferencesProvider } from "@/components/providers/AppPreferencesProvider";
import { siteConfig } from "@/data/site";

const appSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-next-sans-latin",
});

const appDisplay = Sora({
  subsets: ["latin"],
  variable: "--font-next-display-latin",
});

const appHindi = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-next-sans-hi",
});

const appGujarati = Noto_Sans_Gujarati({
  subsets: ["gujarati"],
  variable: "--font-next-sans-gu",
});

export const metadata: Metadata = {
  title: {
    default: "Billcoin Health Care",
    template: "%s - Billcoin Health Care",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  // Update this once you have a real domain (used for SEO + Open Graph URLs).
  metadataBase: new URL("https://example.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
    locale: "en_IN",
    siteName: siteConfig.name,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`h-full antialiased dark ${appSans.variable} ${appDisplay.variable} ${appHindi.variable} ${appGujarati.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <Script id="billcoin-preferences" strategy="beforeInteractive">
          {`try {
            var theme = localStorage.getItem('billcoin-theme-v3');
            if (theme !== 'light' && theme !== 'dark') theme = 'dark';
            document.documentElement.dataset.theme = theme;
            document.documentElement.classList.toggle('dark', theme === 'dark');
          } catch (error) {}
          try {
            var language = localStorage.getItem('billcoin-language');
            if (language === 'hi') document.documentElement.lang = 'hi-IN';
            else if (language === 'gu') document.documentElement.lang = 'gu-IN';
            else document.documentElement.lang = 'en-IN';
          } catch (error) {}`}
        </Script>
        <AppPreferencesProvider>
          <Navbar />
          <main className="flex-1 pt-2 sm:pt-3">{children}</main>
          <Footer />
        </AppPreferencesProvider>
      </body>
    </html>
  );
}

