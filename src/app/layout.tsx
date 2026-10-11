import type { Metadata, Viewport } from "next";
import "./globals.css";
import "@/lib/fonts";
import { siteConfig } from "@/config/site";
import { seoDefaults, pageSeo } from "@/config/seo";
import { organizationSchema, jsonLd } from "@/lib/structuredData";
import { ThemeProvider, themeInitScript } from "@/components/layout/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: pageSeo.home.title,
    template: seoDefaults.titleTemplate,
  },
  description: siteConfig.description,
  keywords: [
    "data analytics",
    "business intelligence",
    "AI automation",
    "n8n automation",
    "Power BI",
    "web development",
    "digital strategy",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: seoDefaults.locale,
    siteName: seoDefaults.siteName,
    url: siteConfig.url,
    title: pageSeo.home.title,
    description: pageSeo.home.description,
    images: [{ url: seoDefaults.ogImage, width: 1200, height: 630, alt: seoDefaults.siteName }],
  },
  twitter: {
    card: "summary_large_image",
    title: pageSeo.home.title,
    description: pageSeo.home.description,
    images: [seoDefaults.ogImage],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0d12" },
    { media: "(prefers-color-scheme: light)", color: "#f8f8f6" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <head>
        {/* Blocking script — sets the dark/light class before paint to avoid a flash of the wrong theme. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(organizationSchema())} />
      </head>
      <body className="flex h-full min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-foreground"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
