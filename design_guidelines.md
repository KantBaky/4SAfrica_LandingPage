# 4S Landing Page Design Guidelines

## Design Approach
**Reference-Based**: Drawing from modern SaaS and impact-focused platforms (Stripe's clarity, Airbnb's approachability, and sustainability-focused sites). Professional yet warm, showcasing real-world impact through visuals and clear messaging.

## Typography System
- **Primary Font**: Inter or DM Sans (Google Fonts)
- **Display Font**: Cabinet Grotesk or Syne (for headlines)
- **Hierarchy**:
  - Hero headline: 4xl/5xl (mobile), 6xl/7xl (desktop), extrabold
  - Section headlines: 3xl/4xl, bold
  - Subheadings: xl/2xl, medium
  - Body: base/lg, regular (max-w-2xl for readability)
  - Captions: sm, medium

## Layout System
**Spacing Units**: Consistently use Tailwind's 4, 6, 8, 12, 16, 24, 32 units (e.g., p-8, mb-12, py-24)
- Section padding: py-16 (mobile), py-24/py-32 (desktop)
- Container: max-w-7xl mx-auto px-6
- Content blocks: max-w-4xl for text, max-w-6xl for cards

## Page Structure (7 Sections)

### 1. Hero Section (80vh minimum)
- Full-width background image with subtle dark overlay (20% opacity)
- Centered content with headline, 2-line subheadline, dual CTA buttons
- Primary button with blurred background (backdrop-blur-md, bg-opacity-20)
- Scroll indicator at bottom

### 2. Mission Statement (2-column desktop)
- Left: Large pullquote-style mission text (2xl font)
- Right: 2-3 paragraph elaboration with supporting statistics

### 3. Solutions Showcase (3-column grid)
- 6 solution cards in responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
- Each card: icon, title, 2-line description, subtle hover lift
- Icons: Heroicons (solar panel, water drop, crop, network, chart, lightbulb metaphors)

### 4. Impact Metrics (4-column stats)
- Full-width section with 4 large numbers + labels
- Animated counter effect on scroll
- Icons above each metric

### 5. How It Works (Alternating layout)
- 3 steps with image-text alternation (image left/right/left)
- Large step numbers, headline, description, supporting image
- Images: 50% width desktop, stacked mobile

### 6. Testimonials/Case Studies (2-column)
- 2-3 cards with customer photo, quote, name, organization
- Subtle border treatment, generous padding

### 7. Contact/CTA Section (centered)
- Headline, supporting text, email signup form (horizontal layout desktop)
- Secondary CTA button, social proof element ("Join 500+ organizations")

## Footer
- 3-column layout (desktop): About/quick links, contact info, social links
- Newsletter signup integration
- Simple copyright and terms links

## Component Specifications

**Cards**: Rounded corners (rounded-xl), subtle shadow (shadow-sm), hover shadow-lg transition
**Buttons**: 
- Primary: px-8 py-4, rounded-full, font-medium
- On images: backdrop-blur-md with semi-transparent background
**Forms**: Outlined inputs (border-2), rounded-lg, focus ring
**Navigation**: Fixed on scroll, backdrop-blur, logo left, links right, mobile hamburger

## Images Section

**Required Images (7 total):**

1. **Hero Image** (Large, full-width): Sweeping landscape of African savanna or agricultural field with solar panels, golden hour lighting, vibrant and hopeful mood. Should convey scale and natural beauty.

2. **Mission Section Image**: Close-up of hands holding soil with seedling, warm natural lighting

3-5. **How It Works Steps** (3 images): 
   - Modern tablet/dashboard showing data analytics
   - Community gathering around solar installation
   - Aerial view of sustainable farming project

6-7. **Testimonial Photos**: Professional headshots of 2 African professionals in business/field settings

All images should feature authentic African settings, people, and contexts. Natural lighting, vibrant but not oversaturated. Aspect ratios: Hero (21:9), Steps (4:3), Testimonials (1:1).

## Accessibility
- ARIA labels on all interactive elements
- Keyboard navigation throughout
- Focus indicators with 2px offset rings
- Alt text for all images
- Semantic HTML5 structure