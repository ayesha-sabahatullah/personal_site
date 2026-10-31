import { Metadata } from 'next';
import { getSiteSettings } from './content';

export function constructMetadata({
  title,
  description,
  image,
  canonical,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
} = {}): Metadata {
  const settings = getSiteSettings();

  const finalTitle = title
    ? `${title} | ${settings.name}`
    : settings.seo.defaultTitle;

  const finalDescription = description || settings.seo.defaultDescription;
  const finalImage = image || settings.seo.ogImage || settings.profileImage;
  const url = canonical ? `${settings.siteUrl}${canonical}` : settings.siteUrl;

  return {
    title: finalTitle,
    description: finalDescription,
    metadataBase: new URL(settings.siteUrl),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url,
      siteName: `${settings.name} Portfolio`,
      images: [
        {
          url: finalImage,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [finalImage],
      creator: '@example',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  };
}

export function generatePersonJsonLd() {
  const settings = getSiteSettings();
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: settings.name,
    jobTitle: settings.displayRole,
    description: settings.shortBio,
    url: settings.siteUrl,
    image: `${settings.siteUrl}${settings.profileImage}`,
    sameAs: settings.socialLinks.map((s) => s.url),
    knowsAbout: [
      'Generative AI Video',
      'Prompt Engineering',
      'Cinematography',
      'Digital Media Education',
    ],
  };
}
