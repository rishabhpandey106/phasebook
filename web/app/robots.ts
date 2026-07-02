import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://phasebook.itsrishabh.tech';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Prevent Google from indexing private dashboard routes
      disallow: ['/journal', '/history', '/interactive', '/api-keys'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
