import type { Metadata } from 'next';
import './globals.css';
import { getSiteSettings } from '@/lib/content';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { generatePersonJsonLd } from '@/lib/seo';

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSiteSettings();
  return {
    title: {
      default: settings.seo.defaultTitle,
      template: settings.seo.titleTemplate,
    },
    description: settings.seo.defaultDescription,
    metadataBase: new URL(settings.siteUrl),
    alternates: {
      canonical: settings.siteUrl,
    },
    openGraph: {
      title: settings.seo.defaultTitle,
      description: settings.seo.defaultDescription,
      url: settings.siteUrl,
      siteName: `${settings.name} Portfolio`,
      images: [
        {
          url: settings.seo.ogImage || settings.profileImage,
          width: 1200,
          height: 630,
          alt: settings.name,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.seo.defaultTitle,
      description: settings.seo.defaultDescription,
      images: [settings.seo.ogImage || settings.profileImage],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = getSiteSettings();
  const personJsonLd = generatePersonJsonLd();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FFF8FB] text-[#351827] selection:bg-[#FCE4EC] selection:text-[#BE185D]">
        <SiteHeader settings={settings} />
        <main className="flex-1">{children}</main>
        <SiteFooter settings={settings} />
      </body>
    </html>
  );
}
