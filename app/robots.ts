import { MetadataRoute } from 'next';
import { getSiteSettings } from '@/lib/content';

export default function robots(): MetadataRoute.Robots {
  const settings = getSiteSettings();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${settings.siteUrl}/sitemap.xml`,
  };
}
