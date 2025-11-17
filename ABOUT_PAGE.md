# About Us Page - Documentation

## 📖 Overview

Trang "About Us" là trang giới thiệu chuyên nghiệp về Wine Store, tập trung vào mission, vision, quy trình, và những gì làm nên sự khác biệt. Khác với "Our Story" (kể câu chuyện lịch sử), trang này tập trung vào **hiện tại và tương lai**.

---

## 🎨 Page Structure

### 1. **AboutHero**
- Gradient background với animated particles
- 4 key stats với icons (50K+ Customers, 30+ Countries, 100+ Awards, 50+ Years)
- Badge "Premium Wine Retail"
- Animated stats grid

### 2. **Mission**
- 3 core pillars: Mission, Vision, Purpose
- Icon-based cards với hover effects
- Rotating icon animations
- Clean 3-column layout

### 3. **Difference**
- "What Makes Us Different" section
- 8 key differentiators với checkmarks
- Image grid (2x2 staggered)
- Floating "50+ Years" badge

### 4. **Process**
- 4-step process visualization
- Numbered steps với connecting lines
- Icons: Search, Handshake, Package, Sparkles
- Vertical timeline on desktop

### 5. **Certifications**
- 4 major awards/certifications
- Rotating icon animations
- Partner logos section
- Industry recognition display

### 6. **Community**
- Community initiatives showcase
- 4 programs: Tastings, Education, Wine Club, Tours
- Stats for each initiative
- "Join Community" CTA button

### 7. **FAQ**
- 6 frequently asked questions
- Accordion-style with smooth animations
- Plus/Minus toggle icons
- Contact link at bottom

### 8. **ContactCTA**
- Dark gradient background
- 3 contact methods: Phone, Email, Visit
- Dual CTA buttons
- Social proof indicators

---

## ✨ Key Differences from "Our Story"

| Our Story | About Us |
|-----------|----------|
| Historical timeline | Current operations |
| Founder's journey | Mission & values |
| Past milestones | Present capabilities |
| Storytelling focus | Information focus |
| Emotional connection | Trust building |

---

## 🎯 Content Strategy

### Target Audience
- **New customers** researching the brand
- **B2B partners** evaluating credibility
- **Wine enthusiasts** seeking expertise
- **Investors/media** needing company info

### Key Messages
1. **Expertise**: 50+ years, expert sommeliers
2. **Quality**: Direct vineyard relationships
3. **Trust**: Certifications, awards, guarantees
4. **Community**: Education, events, membership
5. **Sustainability**: Eco-friendly practices
6. **Service**: 30-day guarantee, expert support

---

## 🎨 Design Features

### Animations
- **Particle effects** in hero background
- **Rotating icons** on hover
- **Accordion FAQ** with smooth expand/collapse
- **Stagger animations** for lists
- **Hover lift effects** on cards
- **Progress lines** in process section

### Color Palette
```css
Primary: #3b4417 (Dark olive)
Secondary: #4a5520 (Medium olive)
Accent: #d4af37 (Gold)
Background: #fdfbf5 (Cream)
White: #ffffff
```

### Typography
- Headings: Playfair Display (bold, uppercase)
- Body: Geist Sans (16-17px)
- Tracking: Wide for headings (0.1-0.25em)

---

## 📊 Stats & Numbers

Update these in respective components:

**AboutHero:**
- 50K+ Happy Customers
- 30+ Countries
- 100+ Awards
- 50+ Years Experience

**Community:**
- 500+ Events (Monthly Tastings)
- 2,000+ Students (Education)
- 10,000+ Members (Wine Club)
- 50+ Tours/Year (Vineyard Tours)

**Difference:**
- 50+ Years of Excellence

---

## 🔧 Components Breakdown

### AboutHero.tsx
- Animated background particles (30 floating dots)
- 4 stat cards with icons
- Responsive grid (2 cols mobile, 4 cols desktop)

### Mission.tsx
- 3 pillar cards
- Icon rotation on hover (360°)
- Gradient decorative lines

### Difference.tsx
- 8 feature list with checkmarks
- 2x2 image grid with stagger
- Floating badge overlay

### Process.tsx
- 4-step vertical timeline
- Connecting lines between steps
- Large number watermarks

### Certifications.tsx
- 4 certification cards
- 6 partner logos
- Hover scale effects

### Community.tsx
- 4 initiative cards with stats
- Side-by-side layout
- Image with floating stat badge

### FAQ.tsx
- 6 accordion items
- AnimatePresence for smooth transitions
- Plus/Minus icon toggle

### ContactCTA.tsx
- 3 contact method cards
- Dual CTA buttons
- Social proof footer

---

## 📱 Responsive Design

### Mobile (< 640px)
- Single column layouts
- Stacked stats (2x2 grid)
- Simplified animations
- Touch-friendly accordions

### Tablet (640px - 1024px)
- 2-column grids
- Adjusted spacing
- Medium text sizes

### Desktop (> 1024px)
- Full multi-column layouts
- Vertical timeline in Process
- Maximum visual impact
- All animations enabled

---

## 🚀 Performance Optimizations

- **Lazy loading**: Images load on scroll
- **GPU acceleration**: Transform-based animations
- **Viewport detection**: Animations trigger when visible
- **Optimized images**: Next.js Image component
- **Minimal re-renders**: Proper React optimization

---

## 🎓 Content Guidelines

### Writing Style
- **Professional** but approachable
- **Factual** with specific numbers
- **Benefit-focused** (what's in it for customer)
- **Concise** paragraphs (3-4 lines max)
- **Active voice** preferred

### Tone
- Confident but not arrogant
- Expert but accessible
- Premium but welcoming
- Informative but engaging

---

## 🔗 Navigation Updates

Updated header navigation:
- "Pages" → "About" (`/about`)
- "Blog" → "Contact" (`/contact`)

Internal links:
- Hero CTA → `/shop`
- Community CTA → Join form
- Contact CTA → `/shop` and `/our-story`

---

## 💡 Customization Tips

### Update Stats
Edit numbers in:
- `components/about/AboutHero.tsx` (STATS array)
- `components/about/Community.tsx` (INITIATIVES array)

### Modify FAQ
Edit questions/answers in:
- `components/about/FAQ.tsx` (FAQS array)

### Change Certifications
Update awards in:
- `components/about/Certifications.tsx` (CERTIFICATIONS array)

### Adjust Process Steps
Modify workflow in:
- `components/about/Process.tsx` (STEPS array)

---

## 🐛 Common Issues

### TypeScript Errors
"Cannot find module" errors are cache-related:
1. Restart TypeScript server
2. Clear `.next` folder
3. Restart IDE

### Images Not Loading
- Verify images exist in `/public/hero/`
- Check file extensions match
- Ensure proper Next.js Image usage

### Animations Laggy
- Reduce particle count in AboutHero
- Disable animations on mobile
- Use `will-change` CSS property

---

## 📦 Dependencies

All components use:
```json
{
  "framer-motion": "^11.x",
  "next": "^15.x",
  "lucide-react": "^0.x"
}
```

---

## ✅ SEO Optimization

- **Title**: "About Us - Wine Store"
- **Description**: Mission, values, and commitment to excellence
- **OG Image**: `/hero/slide-1.jpg`
- **Keywords**: wine retail, premium wines, wine experts, sustainable wine

---

## 🎯 Conversion Goals

1. **Build trust** through certifications and awards
2. **Showcase expertise** via process and team
3. **Encourage engagement** with community programs
4. **Drive sales** with strategic CTAs
5. **Answer objections** via comprehensive FAQ

---

## 📈 Success Metrics

Track these KPIs:
- Time on page (target: 2+ minutes)
- Scroll depth (target: 80%+)
- CTA click rate (target: 5%+)
- FAQ interaction rate
- Bounce rate (target: <40%)

---

Built with ❤️ using Next.js 15, TypeScript, Tailwind CSS, and Framer Motion
