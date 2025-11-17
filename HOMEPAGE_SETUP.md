# Homepage Setup Guide

## 🎨 Images Required

To complete the homepage setup, you need to add the following images:

### Wine Product Images
Add these images to `public/wines/`:
- `wine-1.jpg` - Château Margaux 2015 (Bordeaux)
- `wine-2.jpg` - Opus One 2018 (Napa Valley)
- `wine-3.jpg` - Penfolds Grange 2016 (Australia)
- `wine-4.jpg` - Sassicaia 2017 (Tuscany)

**Recommended specs:**
- Aspect ratio: 3:4 (portrait)
- Resolution: 800x1066px minimum
- Format: JPG or WebP
- File size: < 200KB each

### Hero Slider Images
Already configured in `public/hero/`:
- `slide-1.jpg` through `slide-5.jpg` - Main hero carousel
- `slide-6.jpg` - Parallax cellar section
- `slide-7.jpg` - Timeline section background

---

## 🚀 New Components Added

### 1. **ValuePropositions** 
Location: After Hero section
- Free Shipping
- Secure Payment
- Quality Guarantee
- Expert Support
- Animated icons with hover effects

### 2. **FeaturedProducts**
Location: After Story section
- 4 featured wine products
- Hover animations
- Quick add to cart
- Star ratings
- Price display

### 3. **CTASection**
Location: After Wine Stories
- Strong call-to-action
- Animated background particles
- Dual CTA buttons (Shop Now / Learn More)
- Trust indicators

### 4. **Testimonials**
Location: After CTA
- 4 customer reviews
- 5-star ratings
- Hover card effects
- Trust badges (Wine Spectator, Decanter, etc.)

### 5. **Newsletter**
Location: After Testimonials
- Email signup form
- Animated background pattern
- Stats display (10K+ members, 500+ wines, 50+ countries)
- Success state animation

### 6. **WineFinder** (Interactive Quiz)
Location: Floating button (bottom-right)
- 3-step wine recommendation quiz
- Smooth modal animations
- Progress bar
- Mobile-friendly

### 7. **Enhanced Hero**
- Added prominent CTA buttons
- "Shop Now" and "Our Story" buttons
- Better conversion optimization

---

## 🎯 Homepage Flow

```
1. Hero Slider (with CTAs)
2. Value Propositions Bar
3. Story Section
4. Featured Products
5. Parallax Cellar Section
6. Wine Stories Timeline
7. CTA Section
8. Testimonials
9. Newsletter Signup
10. Footer
+ Floating Wine Finder Button
```

---

## ✨ Key Features

### Animations
- Framer Motion for smooth transitions
- Scroll-triggered animations
- Hover effects on all interactive elements
- Staggered children animations
- Parallax scrolling

### UX Improvements
- Clear CTAs throughout the page
- Interactive wine finder quiz
- Social proof (testimonials + trust badges)
- Email capture for lead generation
- Mobile-responsive design

### Performance
- Lazy loading for images
- Optimized animations
- Minimal re-renders
- Smooth 60fps animations

---

## 🎨 Design System

### Colors
- Primary: `#3b4417` (Dark olive green)
- Secondary: `#7a8451` (Medium olive)
- Accent: `#d4af37` (Gold for ratings)
- Background: `#fdfbf5` (Cream)
- Text: `#3b4417` (Dark olive)

### Typography
- Headings: Playfair Display (serif)
- Body: Geist Sans
- Tracking: Wide letter-spacing for luxury feel
- Uppercase for emphasis

### Spacing
- Consistent padding: 20-32px sections
- Max-width: 7xl (1280px)
- Grid gaps: 8px (mobile) to 32px (desktop)

---

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

All components are fully responsive with mobile-first approach.

---

## 🔧 Next Steps

1. Add wine product images to `public/wines/`
2. Test on mobile devices
3. Adjust content/copy as needed
4. Connect newsletter form to backend
5. Implement actual wine recommendation logic in WineFinder
6. Add real product data from API/database

---

## 💡 Tips

- Use high-quality wine photography
- Keep product images consistent in style
- Test animations on lower-end devices
- Consider adding loading states for images
- Implement proper error handling for forms

---

Built with ❤️ using Next.js 15, TypeScript, Tailwind CSS, and Framer Motion
