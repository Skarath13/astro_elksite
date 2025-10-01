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
      filter: (page) => !page.includes('/admin/') && !page.includes('/private/'),
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
        'https://elegantlashesbykatie.com/blog',
        // All 30 blog posts
        'https://elegantlashesbykatie.com/blog/lash-extension-aftercare-guide',
        'https://elegantlashesbykatie.com/blog/volume-vs-classic-lashes',
        'https://elegantlashesbykatie.com/blog/lash-extension-pricing-guide',
        'https://elegantlashesbykatie.com/blog/best-lash-extension-care-products',
        'https://elegantlashesbykatie.com/blog/how-long-lash-extensions-last',
        'https://elegantlashesbykatie.com/blog/lash-extension-myths-debunked',
        'https://elegantlashesbykatie.com/blog/orange-county-lash-competitions',
        'https://elegantlashesbykatie.com/blog/celebrity-lash-trends',
        'https://elegantlashesbykatie.com/blog/lash-extensions-sensitive-eyes',
        'https://elegantlashesbykatie.com/blog/eco-friendly-lash-extensions',
        'https://elegantlashesbykatie.com/blog/lash-extension-removal-process',
        'https://elegantlashesbykatie.com/blog/choosing-right-lash-artist',
        'https://elegantlashesbykatie.com/blog/summer-lash-extension-care',
        'https://elegantlashesbykatie.com/blog/lash-extension-styles-explained',
        'https://elegantlashesbykatie.com/blog/sleeping-with-lash-extensions',
        'https://elegantlashesbykatie.com/blog/makeup-with-lash-extensions',
        'https://elegantlashesbykatie.com/blog/natural-lash-growth-extensions',
        'https://elegantlashesbykatie.com/blog/lash-extensions-eye-health',
        'https://elegantlashesbykatie.com/blog/troubleshooting-lash-issues',
        'https://elegantlashesbykatie.com/blog/first-lash-appointment-prep',
        'https://elegantlashesbykatie.com/blog/lash-extensions-special-occasions',
        'https://elegantlashesbykatie.com/blog/best-lash-styles-oc-events',
        'https://elegantlashesbykatie.com/blog/bridal-lash-packages-orange-county',
        'https://elegantlashesbykatie.com/blog/new-client-special-offers',
        'https://elegantlashesbykatie.com/blog/prom-graduation-lash-specials',
        'https://elegantlashesbykatie.com/blog/holiday-lash-promotions',
        'https://elegantlashesbykatie.com/blog/lash-referral-rewards-program',
        'https://elegantlashesbykatie.com/blog/mothers-day-lash-specials',
        'https://elegantlashesbykatie.com/blog/valentines-day-lash-packages',
        'https://elegantlashesbykatie.com/blog/lash-extension-membership-program'
      ]
    })
  ],
  output: 'static',
  site: 'https://elegantlashesbykatie.com',
  compressHTML: true,
  build: {
    inlineStylesheets: 'always'
  },
  vite: {
    build: {
      cssCodeSplit: false
    }
  }
});
