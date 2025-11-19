# Seller Dashboard

A comprehensive, responsive dashboard for sellers built with Next.js, React, TailwindCSS, and Shadcn/ui.

## Color Scheme

Dashboard uses the same elegant color palette as the homepage:
- **Primary**: `#3b4417` (Olive Green) - Main text, headers, primary actions
- **Accent**: `#d4af37` (Gold) - Highlights, warnings, secondary elements
- **Secondary**: `#7a8451` (Sage Green) - Muted text, labels
- **Background**: `#fdfbf5` (Cream) - Page background, card hover states
- **Card Background**: `#f5f3e8` (Light Beige) - Card icon backgrounds
- **Border**: `#d4d6b4` (Light Sage) - Borders, dividers

## Features

### 1. Overview Cards (4 metrics)
- **Total Revenue**: Displays total revenue from `mockOverview.data.total_revenue`
- **Total Orders**: Shows total orders from `mockOverview.data.total_orders`
- **Total Products**: Counts products from `mockInventory.data`
- **Stock Alerts**: Shows low stock + out of stock items

Each card includes:
- Icon representing the metric
- Formatted value
- Label in Vietnamese
- Hover animation effect
- Color-coded background

### 2. Revenue Chart
- 7-day revenue visualization using **Shadcn/ui Chart** (built on Recharts)
- Composed chart with:
  - Bar chart for revenue (in millions VND) - Olive green `#3b4417`
  - Line overlay for order count - Gold `#d4af37`
- Responsive design with proper axis formatting
- Custom tooltips with Vietnamese currency
- Elegant styling matching homepage theme
- Data from `mockRevenue.data.chart_data`

### 3. Latest Orders Table
- Displays recent orders from `mockOrders.data.orders`
- Columns:
  - Order code
  - Customer name & email
  - Status badge (color-coded)
  - Payment status
  - Total amount (formatted VND)
  - Created date
- Hover effects on rows
- Responsive table with horizontal scroll on mobile

### 4. Inventory Alerts
- Shows products with low stock or out of stock
- Filtered from `mockInventory.data`
- Columns:
  - Product name
  - Price (VND)
  - Quantity on hand / Safety stock
  - Warehouse name & location
  - Status badge (red for out of stock, orange for low stock)
  - Last updated timestamp
- Alert icon in header

## Components Structure

```
components/seller/
├── SellerDashboard.tsx       # Main dashboard container
├── OverviewCards.tsx          # 4 metric cards
├── RevenueChart.tsx           # Revenue visualization
├── LatestOrdersTable.tsx      # Orders table
└── InventoryAlerts.tsx        # Stock alerts table

components/ui/
├── card.tsx                   # Card component
├── badge.tsx                  # Badge component
└── table.tsx                  # Table components
```

## Technologies Used

- **Next.js 15**: React framework
- **React 19**: UI library
- **TailwindCSS**: Styling with custom colors
- **Shadcn/ui**: UI components (Card, Badge, Table, Chart)
- **Shadcn/ui Chart**: Chart components built on Recharts
- **Recharts**: Underlying chart library
- **Framer Motion**: Smooth animations
- **Lucide React**: Beautiful icons
- **class-variance-authority**: Component variants

## Animations

- Fade-in animations on component mount
- Staggered card animations (0.1s delay between each)
- Hover effects on cards and table rows
- Smooth transitions

## Responsive Design

- Mobile-first approach
- Grid layouts adapt to screen size:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 4 columns for cards
- Tables scroll horizontally on mobile
- Padding adjusts for different screen sizes

## Data Format

All data uses Vietnamese formatting:
- Currency: VND with proper separators
- Dates: Vietnamese locale (dd/mm/yyyy)
- Numbers: Vietnamese number format

## Usage

The dashboard is automatically rendered at `/seller` route:

```tsx
import SellerDashboard from "@/components/seller/SellerDashboard";

export default function SellerDashboardPage() {
  return <SellerDashboard />;
}
```

## Mock Data Location

All mock data is imported from `@/lib/sellerDashboard`:
- `mockOverview`: Dashboard overview metrics
- `mockRevenue`: Revenue chart data
- `mockOrders`: Orders list
- `mockInventory`: Inventory items with stock status
