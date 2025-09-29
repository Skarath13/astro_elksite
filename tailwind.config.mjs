/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Ghibli-inspired warm summer pastel palette with dominant pink tones
        primary: '#AC5F77',     // Darker Rose Pink (25% darker than original #E57F9F)
        secondary: '#F4ADB8',   // Light Pink
        accent: '#FFF0F5',      // Lavender Blush
        peach: '#FFCBB6',       // Soft Peach
        sage: '#BFDAC0',        // Sage Green
        skyblue: '#B6DCEE',     // Sky Blue
        cream: '#FFF8E7',       // Cream
        lilac: '#E0D7EE',       // Soft Lilac
        darktext: '#221439',    // Darker royal purple for nav (25% darker)
        mediumtext: '#8A7584',  // Medium Plum/Grey
        lightbg: '#FFFCFD',     // Very subtle pink/white Background
        white: '#FFFFFF',
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827'
        },
        yelpRed: '#d32323',
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'ghibli': '0 6px 20px rgba(229, 127, 159, 0.15)',
        'ghibli-lg': '0 10px 25px rgba(229, 127, 159, 0.2)',
      },
      backgroundImage: {
        'gradient-ghibli': 'linear-gradient(to right, #FFF0F5, #FFF8E7, #FFF0F5)',
        'gradient-sunset': 'linear-gradient(to right bottom, #E57F9F, #FFCBB6, #FFF8E7)',
      }
    }
  },
  plugins: [],
}