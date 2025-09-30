// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      customPages: [
        'https://elegantlashesbykatie.com/',
        'https://elegantlashesbykatie.com/about',
        'https://elegantlashesbykatie.com/services',
        'https://elegantlashesbykatie.com/locations',
        'https://elegantlashesbykatie.com/reviews',
        'https://elegantlashesbykatie.com/team',
        'https://elegantlashesbykatie.com/gallery',
        'https://elegantlashesbykatie.com/aftercare',
        'https://elegantlashesbykatie.com/contact',
        'https://elegantlashesbykatie.com/faq'
      ]
    })
  ],
  output: 'static',
  site: 'https://elegantlashesbykatie.com'
});
