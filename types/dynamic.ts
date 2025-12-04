// Dynamic Import Types
export interface DynamicComponentProps {
  loading?: React.ComponentType;
  ssr?: boolean;
}

export interface LoadingComponentProps {
  className?: string;
  text?: string;
}

export interface ErrorBoundaryProps {
  error: Error;
  retry: () => void;
}

// Performance Monitoring Types
export interface PerformanceMetrics {
  componentName: string;
  loadTime: number;
  renderTime: number;
  bundleSize?: number;
}

export interface BundleAnalytics {
  totalSize: number;
  chunkCount: number;
  mainBundleSize: number;
  vendorBundleSize: number;
  asyncChunks: string[];
}

// Dynamic Import Hook Types
export interface DynamicImportConfig<T = any> {
  component: () => Promise<{ default: React.ComponentType<T> }>;
  loading?: React.ComponentType;
  ssr?: boolean;
  errorBoundary?: React.ComponentType<ErrorBoundaryProps>;
  preload?: boolean;
}

export interface DynamicImportState<T = any> {
  isLoading: boolean;
  error: Error | null;
  Component: React.ComponentType<T> | null;
}

// Component-specific props
export interface DashboardProps {
  userRole: "admin" | "seller" | "user";
  userId?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export interface ChartProps {
  data: any[];
  width?: number;
  height?: number;
  loading?: boolean;
}

export interface FilterProps {
  onFiltersChange: (filters: Record<string, any>) => void;
  initialFilters?: Record<string, any>;
}

export interface RecommendationProps {
  userId: string;
  category?: string;
  limit?: number;
}

// Analytics Types
export interface ComponentLoadEvent {
  componentName: string;
  loadTime: number;
  success: boolean;
  error?: string;
}

export interface PerformanceEntry {
  name: string;
  entryType: string;
  startTime: number;
  duration: number;
}

// Global types for performance API
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, any>
    ) => void;
  }

  interface PerformanceResourceTiming extends PerformanceEntry {
    readonly transferSize: number;
    readonly encodedBodySize: number;
    readonly decodedBodySize: number;
    readonly fetchStart: number;
    readonly requestStart: number;
    readonly responseStart: number;
    readonly responseEnd: number;
    readonly loadEnd: number;
  }

  interface PerformanceNavigationTiming extends PerformanceEntry {
    readonly fetchStart: number;
    readonly requestStart: number;
    readonly responseStart: number;
    readonly responseEnd: number;
    readonly loadEventStart: number;
    readonly loadEventEnd: number;
  }
}

// Wine Store specific types
export interface WineProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category: string;
  vintage?: number;
  region?: string;
  rating?: number;
}

export interface SellerDashboardData {
  totalOrders: number;
  totalRevenue: number;
  completedOrders: number;
  cancelledOrders: number;
  lowStockProducts: number;
  pendingOrders: number;
  outOfStockProducts: number;
}

export interface AdminDashboardData {
  totalUsers: number;
  totalSellers: number;
  pendingApprovals: number;
  totalRevenue: number;
  monthlyGrowth: number;
}

export interface CartItem {
  id: string;
  product: WineProduct;
  quantity: number;
  selectedVariant?: string;
}

export interface CheckoutData {
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: "card" | "paypal" | "bank";
}

// Form Types
export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  images: File[];
  specifications: Record<string, string>;
}

export interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: string[];
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export {};
