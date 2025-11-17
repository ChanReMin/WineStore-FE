# Our Story Page - Documentation

## 📖 Overview

Trang "Our Story" là một trang storytelling chuyên nghiệp, kể câu chuyện về wine store từ năm 1970 đến nay với design hiện đại và animations mượt mà.

---

## 🎨 Page Structure

### 1. **StoryHero**
- Full-screen hero với background image
- Animated heading và subtitle
- Scroll indicator với bounce animation
- Gradient overlay cho readability

### 2. **Philosophy**
- 2-column layout (image + content)
- Decorative quote box overlay
- Stats display (50+ Years, 500+ Wines, 30+ Countries)
- Staggered animations

### 3. **Timeline**
- 6 major milestones từ 1970-2024
- Alternating left/right layout (desktop)
- Center line với dots
- Hover effects trên mỗi milestone

### 4. **Heritage**
- 4 feature cards với icons
- Image collage (2x2 grid với staggered heights)
- Hover animations trên images
- Icon rotation effects

### 5. **Values**
- 4 core values với gradient backgrounds
- Animated icons
- Hover lift effects
- Founder quote section

### 6. **Team**
- 4 team members
- Image hover với social links overlay
- LinkedIn và Email buttons
- Smooth scale transitions

### 7. **CallToAction**
- Dark background với pattern
- 2 CTA buttons (Shop / Book Tasting)
- Contact information grid
- Store hours display

---

## 🖼️ Images Required

Add these images to complete the page:

### Team Photos
Location: `public/team/`
- `member-1.jpg` - Robert Chen (Founder & CEO)
- `member-2.jpg` - Sophie Laurent (Head Sommelier)
- `member-3.jpg` - Marcus Williams (Director of Operations)
- `member-4.jpg` - Elena Rodriguez (Wine Buyer)

**Specs:**
- Aspect ratio: 3:4 (portrait)
- Resolution: 600x800px minimum
- Professional headshots or team photos
- Consistent lighting and style

### Hero & Section Images
Already using existing images from `/hero/` folder:
- `slide-1.jpg` through `slide-6.jpg`

---

## ✨ Key Features

### Animations
- **Scroll-triggered**: All sections animate on scroll into view
- **Stagger effects**: Children elements animate sequentially
- **Hover states**: Interactive elements respond to mouse
- **Smooth transitions**: 60fps animations throughout

### Design Elements
- **Typography hierarchy**: Clear heading sizes and weights
- **Color palette**: Consistent with brand (#3b4417, #fdfbf5)
- **Spacing**: Generous whitespace for luxury feel
- **Responsive**: Mobile-first, adapts to all screen sizes

### Interactive Components
- Scroll indicator with animation
- Hoverable team cards with social links
- CTA buttons with scale effects
- Timeline dots and connecting lines

---

## 🎯 Content Highlights

### Story Arc
1. **Introduction** - Who we are and our mission
2. **History** - 50+ years of evolution
3. **Values** - What drives us
4. **People** - The team behind the wines
5. **Invitation** - Call to visit or shop

### Key Messages
- **Heritage**: Since 1970, family-owned
- **Expertise**: Master sommeliers and wine educators
- **Global**: 30+ countries, 100+ vineyards
- **Sustainability**: Organic and biodynamic focus
- **Community**: Education and relationships

---

## 🔗 Navigation

### Updated Links
- Header: "Pages" → "Our Story" (`/our-story`)
- Homepage Hero: "Our Story" button → `/our-story`
- Homepage CTA: "Learn More" → `/our-story`

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
  - Single column layouts
  - Stacked timeline
  - Smaller text sizes
  
- **Tablet**: 640px - 1024px
  - 2-column grids
  - Adjusted spacing
  
- **Desktop**: > 1024px
  - Full multi-column layouts
  - Alternating timeline
  - Maximum visual impact

---

## 🎨 Design Tokens

### Colors
```css
Primary: #3b4417 (Dark olive)
Secondary: #7a8451 (Medium olive)
Background: #fdfbf5 (Cream)
White: #ffffff
Black: #000000
Accent: #d4af37 (Gold)
```

### Typography
```css
Headings: Playfair Display (serif)
Body: Geist Sans
Tracking: Wide (0.15em - 0.35em)
Weights: 400, 500, 600, 700
```

### Spacing
```css
Section padding: 24-32px (mobile) / 32-40px (desktop)
Grid gaps: 16-32px
Max width: 1280px (7xl)
```

---

## 🚀 Performance

- **Lazy loading**: Images load on demand
- **Optimized animations**: GPU-accelerated transforms
- **Viewport detection**: Animations trigger only when visible
- **Image optimization**: Next.js Image component

---

## 💡 Customization Tips

### Content Updates
1. Edit milestone data in `Timeline.tsx`
2. Update team members in `Team.tsx`
3. Modify values in `Values.tsx`
4. Change stats in `Philosophy.tsx`

### Styling
- All colors use Tailwind classes
- Animations use Framer Motion
- Spacing follows Tailwind scale
- Easy to adjust via className props

### Adding Sections
1. Create new component in `components/our-story/`
2. Import in `app/our-story/page.tsx`
3. Add to component stack
4. Follow existing animation patterns

---

## 🐛 Troubleshooting

### TypeScript Errors
If you see "Cannot find module" errors:
1. Restart TypeScript server (Cmd/Ctrl + Shift + P → "Restart TS Server")
2. Clear Next.js cache: `rm -rf .next`
3. Reinstall dependencies: `npm install`

### Images Not Loading
1. Check file paths match exactly
2. Ensure images are in `public/` folder
3. Use correct file extensions (.jpg, .png, .webp)
4. Verify image names match imports

### Animations Not Working
1. Check Framer Motion is installed: `npm install framer-motion`
2. Verify viewport settings in motion components
3. Test scroll behavior on different devices

---

## 📦 Dependencies

```json
{
  "framer-motion": "^11.x",
  "next": "^15.x",
  "react": "^19.x",
  "lucide-react": "^0.x"
}
```

---

## 🎓 Best Practices

1. **Keep content concise** - Users scan, don't read everything
2. **Use high-quality images** - Professional photography matters
3. **Test on mobile** - Most users browse on phones
4. **Optimize images** - Compress before uploading
5. **Update regularly** - Keep milestones and team current

---

Built with ❤️ using Next.js 15, TypeScript, Tailwind CSS, and Framer Motion
