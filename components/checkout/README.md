# 🛒 Checkout Components

Professional checkout flow components for Wine Store.

## Components Overview

### 1. CartStep.tsx
**Purpose**: Display and manage shopping cart

**Features**:
- Product list with images
- Quantity controls (+/-)
- Remove items with animation
- Real-time subtotal
- Empty state

**Props**: None (uses CheckoutContext)

**Usage**:
```tsx
import CartStep from '@/components/checkout/CartStep';

<CartStep />
```

---

### 2. AddressStep.tsx
**Purpose**: Manage shipping addresses

**Features**:
- List saved addresses
- Radio selection
- Add new address form
- Form validation
- Default address badge

**Props**: None (uses CheckoutContext)

**Usage**:
```tsx
import AddressStep from '@/components/checkout/AddressStep';

<AddressStep />
```

---

### 3. PaymentStep.tsx
**Purpose**: Select payment method

**Features**:
- Payment method cards
- Icons for each method
- Radio selection
- Visual feedback

**Props**: None (uses CheckoutContext)

**Usage**:
```tsx
import PaymentStep from '@/components/checkout/PaymentStep';

<PaymentStep />
```

---

### 4. OrderReviewStep.tsx
**Purpose**: Review order before submission

**Features**:
- Product summary
- Address confirmation
- Payment confirmation
- Promotion code input
- Shipping calculation
- Total breakdown
- Order submission

**Props**: None (uses CheckoutContext)

**Usage**:
```tsx
import OrderReviewStep from '@/components/checkout/OrderReviewStep';

<OrderReviewStep />
```

---

### 5. CheckoutSuccessStep.tsx
**Purpose**: Order confirmation

**Features**:
- Confetti animation
- Order ID display
- Success message
- Next steps cards
- Navigation buttons

**Props**: None (uses CheckoutContext)

**Usage**:
```tsx
import CheckoutSuccessStep from '@/components/checkout/CheckoutSuccessStep';

<CheckoutSuccessStep />
```

---

### 6. CheckoutProgress.tsx
**Purpose**: Visual progress indicator

**Features**:
- Step tracking
- Completed/active states
- Smooth transitions
- Icons for each step

**Props**:
```typescript
interface CheckoutProgressProps {
  currentStep: CheckoutStep;
}
```

**Usage**:
```tsx
import CheckoutProgress from '@/components/checkout/CheckoutProgress';

<CheckoutProgress currentStep="cart" />
```

---

## Design Patterns

### Color Usage
```tsx
// Primary actions
className="bg-[#3b4417] text-white"

// Secondary actions
className="border-2 border-[#d4d6b4] text-[#3b4417]"

// Backgrounds
className="bg-[#fdfbf5]"  // Page
className="bg-white"      // Cards
className="bg-[#f5f3e8]"  // Hover/Selected

// Borders
className="border-[#e8e6dc]"  // Light
className="border-[#d4d6b4]"  // Medium

// Accents
className="text-[#d4af37]"  // Gold
```

### Animation Patterns
```tsx
// Button hover
<motion.button
  whileHover={{ scale: 1.02, y: -2 }}
  whileTap={{ scale: 0.98 }}
>

// Card entry
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: index * 0.1 }}
>

// Page transition
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
>
```

### Typography
```tsx
// Headings
className="text-2xl md:text-3xl font-semibold text-[#3b4417] tracking-wide uppercase"

// Body text
className="text-sm text-neutral-600"

// Buttons
className="text-sm tracking-widest uppercase"
```

## State Management

All components use `CheckoutContext`:

```tsx
import { useCheckout } from '@/contexts/CheckoutContext';

function MyComponent() {
  const {
    cart,
    selectedAddress,
    updateCartItemQuantity,
    // ... other state and actions
  } = useCheckout();
  
  return (
    // Component JSX
  );
}
```

## Common Patterns

### Loading State
```tsx
{isLoading ? (
  <Loader2 size={16} className="animate-spin" />
) : (
  "Button Text"
)}
```

### Empty State
```tsx
{items.length === 0 ? (
  <div className="text-center py-20">
    <Icon size={80} className="text-[#d4d6b4] mb-6" />
    <h3>Empty State Title</h3>
    <p>Empty state message</p>
  </div>
) : (
  // Content
)}
```

### Form Input
```tsx
<input
  type="text"
  required
  value={value}
  onChange={(e) => setValue(e.target.value)}
  className="w-full px-4 py-3 border border-[#d4d6b4] focus:border-[#3b4417] focus:outline-none transition-colors"
/>
```

### Radio Selection
```tsx
<div
  onClick={() => selectItem(item)}
  className={`p-6 border-2 cursor-pointer transition-all ${
    selected?.id === item.id
      ? "border-[#3b4417] bg-[#f5f3e8]"
      : "border-[#e8e6dc] bg-white hover:border-[#d4d6b4]"
  }`}
>
  <div className={`w-5 h-5 rounded-full border-2 ${
    selected?.id === item.id
      ? "border-[#3b4417] bg-[#3b4417]"
      : "border-[#d4d6b4]"
  }`}>
    {selected?.id === item.id && (
      <Check size={14} className="text-white" />
    )}
  </div>
</div>
```

## Responsive Breakpoints

```tsx
// Mobile first
className="flex-col"

// Tablet
className="md:flex-row"

// Desktop
className="lg:grid-cols-3"
```

## Icons Used

From `lucide-react`:
- ShoppingCart, ShoppingBag
- MapPin
- CreditCard, Wallet, Building2, Banknote
- Tag
- Truck
- CheckCircle, Check
- Plus, Minus, Trash2
- Loader2
- Package, Mail, Home

## Dependencies

```json
{
  "framer-motion": "^10.x",
  "react-confetti": "^6.x",
  "lucide-react": "^0.x"
}
```

## Best Practices

1. **Always use CheckoutContext** for state
2. **Add loading states** for async operations
3. **Include empty states** for better UX
4. **Use motion components** for animations
5. **Follow color scheme** consistently
6. **Add proper TypeScript types**
7. **Handle errors gracefully**
8. **Test on mobile devices**

## Accessibility

- ✅ Keyboard navigation
- ✅ Focus states
- ✅ ARIA labels (add more as needed)
- ✅ Color contrast
- ✅ Screen reader friendly

## Performance

- ✅ Memoized callbacks
- ✅ Optimized re-renders
- ✅ Lazy loading images
- ✅ Code splitting by step

---

**Need help?** Check the full documentation in `/docs/CHECKOUT_FLOW_GUIDE.md`
