# CLAUDE.md - Elegant Lashes by Katie Astro Migration

This file contains development notes and AI assistant context for the Elegant Lashes by Katie website Astro migration project.

## 🤖 AI Development Context

This project represents a complete migration from a vanilla HTML/CSS/JS implementation to Astro static site generator, maintaining all functionality while improving performance and developer experience.

## 📁 Project Overview

### Migration Source
- **Original Repository**: `/Users/dylan/Desktop/elksitenew/ELK_SITE/` (vanilla HTML/CSS/JS)
- **Astro Migration**: `/Users/dylan/Desktop/elksitenew/ELK_SITE/elk-astro/` (current project)
- **Business**: Orange County lash extension salon with 4 locations
- **Target Audience**: Clients seeking premium lash extension services

### Key Business Metrics
- **30k+ Happy Clients** (updated from 15k+ during migration)
- **4 Studio Locations**: Irvine, Tustin, Santa Ana, Costa Mesa
- **Operating Since**: 2016
- **Services**: Volume, classic, and hybrid lash extensions

## 🛠 Development Commands

### Local Development
```bash
# Start Astro dev server
npm run dev

# Start on specific host/port
npm run dev -- --host 0.0.0.0 --port 3001

# Build for production
npm run build

# Preview production build
npm run preview
```

### Testing & Quality
```bash
# Run linting (when configured)
npm run lint

# Run type checking (when configured)
npm run type-check

# Astro check
npx astro check
```

## 📋 Migration Status

### ✅ Completed Components
- [x] Layout structure and navigation
- [x] Hero section with trust badges
- [x] Locations section with Google Maps embeds
- [x] About section with company stats and features
- [x] Reviews section
- [x] Services section
- [x] Team section
- [x] Gallery section
- [x] Contact section
- [x] Footer
- [x] FAQ Modal functionality
- [x] Booking modal integration

### ✅ Completed Pages
- [x] Home page (`/`) - Complete with all sections
- [x] About page (`/about`) - Enhanced with stats and feature cards
- [x] Locations page (`/locations`) - Enhanced with Google Maps
- [x] Reviews page (`/reviews`)
- [x] Services page (`/services`)
- [x] Team page (`/team`)
- [x] Gallery page (`/gallery`)
- [x] Aftercare page (`/aftercare`)
- [x] Contact page (`/contact`)

### ✅ Key Features Migrated
- [x] Responsive design (mobile-first)
- [x] Google Maps integration for all 4 locations
- [x] FAQ modal with accordion functionality
- [x] Booking modal integration
- [x] Trust badges and social proof
- [x] Image optimization and lazy loading
- [x] SEO meta tags and structured data
- [x] Analytics integration (Google Analytics)

## 🎨 Design System

### Color Palette
```css
/* Primary Brand Colors */
--primary: #AC5F77;      /* Darker Rose Pink */
--secondary: #F4ADB8;    /* Light Pink */
--accent: #FFF0F5;       /* Lavender Blush */

/* UI Colors */
--darktext: #221439;     /* Dark royal purple */
--mediumtext: #8A7584;   /* Medium plum/grey */
--icon-matte: #F2D5E0;   /* Matte pink-white for icons */

/* Gradients */
--gradient-ghibli: /* Background gradient */
--gradient-sunset: /* Hero background gradient */
```

### Typography
- **Headlines**: Playfair Display (serif, elegant)
- **Body Text**: Montserrat (sans-serif, readable)
- **Font Loading**: Google Fonts with preconnect optimization

### Component Patterns
- **Astro Components**: `.astro` files with TypeScript frontmatter
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Modular Structure**: Reusable components in `/src/components/`
- **Layout System**: Base layout with slots for page content

## 🔧 Technical Architecture

### Framework & Tools
- **Static Site Generator**: Astro 4.x
- **Styling**: Tailwind CSS with custom design tokens
- **Icons**: Font Awesome 6.4.0 (CDN)
- **Maps**: Google Maps embeds
- **Analytics**: Google Analytics (gtag.js)
- **Build Tool**: Vite (bundled with Astro)

### Project Structure
```
src/
├── components/          # Reusable Astro components
│   ├── Navigation.astro
│   ├── HeroSection.astro
│   ├── FAQModal.astro
│   └── ...
├── layouts/            # Page layouts
│   └── Layout.astro
├── pages/              # Route pages
│   ├── index.astro     # Home page
│   ├── about.astro
│   ├── locations.astro
│   └── ...
├── styles/             # Global styles (if needed)
└── env.d.ts           # TypeScript environment types
```

### Key Technical Decisions
- **Component-Based**: All sections extracted into reusable components
- **TypeScript**: Type-safe props and better developer experience
- **Static Generation**: Pre-rendered pages for optimal performance
- **Image Optimization**: Astro's built-in image optimization
- **SEO First**: Proper meta tags, structured data, and semantic HTML

## 📱 Responsive Behavior

### Breakpoints (Tailwind CSS)
- **Mobile**: `< 640px` (sm)
- **Tablet**: `640px - 768px` (md)
- **Desktop**: `768px - 1024px` (lg)
- **Large Desktop**: `1024px+` (xl)

### Mobile Optimizations
- **Navigation**: Hamburger menu with slide-out functionality
- **Hero**: Stacked layout with mobile-optimized button placement
- **Locations**: 2x2 grid on mobile, 4x1 on desktop
- **About Cards**: Responsive grid with proper aspect ratios
- **Text Scaling**: Responsive typography with proper line breaks

## 🔍 SEO Strategy

### Primary Keywords
- "Orange County lash extensions"
- "Irvine lash salon"
- "Tustin eyelash extensions"
- "Santa Ana volume lashes"
- "Costa Mesa classic lashes"

### Content Strategy
- **Local SEO**: City-specific landing pages and content
- **Service Pages**: Detailed descriptions of lash extension types
- **Trust Signals**: Client testimonials and business credentials
- **Technical SEO**: Proper structured data and meta optimization

### Structured Data
- **Business Schema**: Local business markup for each location
- **Service Schema**: Lash extension service descriptions
- **Review Schema**: Customer testimonial markup
- **HowTo Schema**: Appointment preparation guide

## 🚀 Performance Considerations

### Optimization Strategies
- **Static Generation**: All pages pre-rendered at build time
- **Image Optimization**: WebP format with fallbacks
- **Code Splitting**: Automatic with Astro's island architecture
- **CSS Optimization**: Tailwind CSS purging and minification
- **Font Loading**: Preconnect to Google Fonts for faster loading

### Lighthouse Targets
- **Performance**: > 90
- **Accessibility**: > 95
- **Best Practices**: > 90
- **SEO**: > 95

## 🔧 Development Workflow

### Component Development
1. Create component in `/src/components/`
2. Define TypeScript interface for props
3. Implement responsive design with Tailwind
4. Test on multiple breakpoints
5. Integration test with parent pages

### Page Development
1. Use base `Layout.astro` for consistent structure
2. Import and compose page-specific components
3. Configure page-specific meta tags and SEO
4. Test navigation and inter-page functionality

### Testing Checklist
- [ ] Mobile responsiveness (iPhone, Android)
- [ ] Tablet layout (iPad, Surface)
- [ ] Desktop functionality (Chrome, Safari, Firefox)
- [ ] Navigation and modal functionality
- [ ] Form submission and booking integration
- [ ] Google Maps functionality
- [ ] SEO meta tag validation

## 📞 Business Integration

### Booking System
- **Current**: Modal-based booking integration
- **Phone**: 657-334-9919 (click-to-call functionality)
- **Future**: Potential direct booking system integration

### Contact Information
- **Business Email**: elegantlashesbykatie@gmail.com
- **Social Media**: Instagram @elegantlashesbykatie
- **Business Hours**: Mon-Sun 9:00 AM - 7:00 PM

### Location Details
1. **Irvine**: 15333 Culver Dr #220, Irvine, CA 92604
2. **Tustin**: 13112 Newport Ave #K, Tustin, CA 92780
3. **Santa Ana**: 3740 S Bristol St, Santa Ana, CA 92704
4. **Costa Mesa**: 435 E 17th St #3, Costa Mesa, CA 92627

## 📝 Content Management

### Content Updates
- **Service Pricing**: Update in services component
- **Team Information**: Update team component with new photos/bios
- **Business Hours**: Update in multiple locations (contact, locations, footer)
- **Promotions**: Update hero section promo box
- **Client Count**: Currently at 30k+ (last updated: 2024)

### Image Management
- **Location**: `/public/images/` directory
- **Formats**: Prefer WebP with PNG/JPG fallbacks
- **Optimization**: Use Astro's Image component for automatic optimization
- **Alt Text**: Include descriptive alt text for SEO and accessibility

## 🐛 Known Issues & Solutions

### Migration Notes
- **FAQ Modal**: Fixed z-index and event handling issues
- **Google Maps**: Embedded iframes work correctly across all devices
- **Navigation**: Mobile hamburger menu functions properly
- **Component State**: Client-side interactivity works with Astro islands

### Browser Compatibility
- **Modern Browsers**: Full support (Chrome 90+, Safari 14+, Firefox 88+)
- **Older Browsers**: Graceful degradation with Tailwind CSS
- **Mobile Browsers**: Tested on iOS Safari and Chrome Mobile

## 🔮 Future Enhancements

### Potential Improvements
- **Booking Integration**: Direct scheduling system
- **CMS Integration**: Content management for easier updates
- **Performance**: Further optimization with service workers
- **Analytics**: Enhanced tracking for business insights
- **A/B Testing**: Conversion optimization testing

### Technical Debt
- **Image Optimization**: Consider Astro's Image service
- **CSS**: Potential custom CSS organization
- **Component Library**: Standardize component patterns
- **Testing**: Automated testing implementation

## 📊 Migration Benefits

### Performance Improvements
- **Faster Loading**: Static generation vs. client-side rendering
- **Better SEO**: Improved meta tag management and structured data
- **Developer Experience**: TypeScript and component-based architecture
- **Maintainability**: Cleaner code organization and reusability

### Business Benefits
- **Better User Experience**: Faster page loads and smoother interactions
- **Improved SEO**: Better search engine visibility
- **Mobile Optimization**: Enhanced mobile user experience
- **Scalability**: Easier to add new features and content

---

**Migration Completed**: January 2025
**Current Version**: Astro 4.x
**Last Updated**: January 2025

*This file documents the complete migration from vanilla HTML to Astro, maintaining all business functionality while improving technical performance and developer experience.*