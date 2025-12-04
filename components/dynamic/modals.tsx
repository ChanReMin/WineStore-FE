"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import {
  ModalSkeleton,
  PaymentSkeleton,
  FilterSkeleton,
  RecommendationSkeleton
} from '../skeletons';

// Modal Components
export const DynamicAgeVerificationModal = dynamic(
  () => import('../homepage/AgeVerificationModal'),
  {
    loading: () => <ModalSkeleton />,
    ssr: false
  }
);

export const DynamicProductDetailModal = dynamic(
  () => import('../products/ProductDetailModal'),
  {
    loading: () => <ModalSkeleton />,
    ssr: false
  }
);

export const DynamicAddToCartModal = dynamic(
  () => import('../cart/AddToCartModal'),
  {
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <ModalSkeleton />
      </div>
    ),
    ssr: false
  }
);

export const DynamicCheckoutModal = dynamic(
  () => import('../checkout/CheckoutModal'),
  {
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg p-6 max-w-2xl mx-4 w-full max-h-[90vh] overflow-y-auto">
          <ModalSkeleton />
        </div>
      </div>
    ),
    ssr: false
  }
);

// Payment Components
export const DynamicPaymentGateway = dynamic(
  () => import('../checkout/PaymentGateway'),
  {
    loading: () => <PaymentSkeleton />,
    ssr: false
  }
);

export const DynamicPaymentForm = dynamic(
  () => import('../checkout/PaymentForm'),
  {
    loading: () => <PaymentSkeleton />,
    ssr: false
  }
);

// Filter Components
export const DynamicAdvancedFilters = dynamic(
  () => import('../products/AdvancedFilters'),
  {
    loading: () => <FilterSkeleton />,
    ssr: false
  }
);

export const DynamicPriceRangeFilter = dynamic(
  () => import('../products/PriceRangeFilter'),
  {
    loading: () => (
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
        <div className="h-10 bg-gray-200 rounded animate-pulse w-full" />
      </div>
    ),
    ssr: false
  }
);

// Rich Text Editor (for admin/seller product forms)
export const DynamicRichTextEditor = dynamic(
  () => import('../forms/RichTextEditor'),
  {
    loading: () => (
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
        <div className="h-32 bg-gray-200 rounded animate-pulse border-2 border-dashed border-gray-300" />
        <div className="flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      </div>
    ),
    ssr: false
  }
);

// Image Upload Component
export const DynamicImageUploader = dynamic(
  () => import('../forms/ImageUploader'),
  {
    loading: () => (
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-gray-200 rounded-full animate-pulse mx-auto" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2 mx-auto" />
          <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3 mx-auto" />
        </div>
      </div>
    ),
    ssr: false
  }
);

// Wine Recommendation Engine
export const DynamicWineRecommendations = dynamic(
  () => import('../recommendations/WineRecommendations'),
  {
    loading: () => <RecommendationSkeleton />,
    ssr: false
  }
);

export const DynamicPersonalizedSuggestions = dynamic(
  () => import('../recommendations/PersonalizedSuggestions'),
  {
    loading: () => <RecommendationSkeleton />,
    ssr: false
  }
);

// Social Login
export const DynamicSocialLogin = dynamic(
  () => import('../auth/SocialLogin'),
  {
    loading: () => (
      <div className="space-y-3">
        <div className="h-12 bg-blue-200 rounded animate-pulse w-full" />
        <div className="h-12 bg-red-200 rounded animate-pulse w-full" />
        <div className="h-12 bg-gray-200 rounded animate-pulse w-full" />
      </div>
    ),
    ssr: false
  }
);

// Export/Import Components
export const DynamicExcelExporter = dynamic(
  () => import('../utils/ExcelExporter'),
  {
    loading: () => (
      <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded">
        <div className="w-4 h-4 bg-green-300 rounded animate-pulse" />
        <span>Preparing export...</span>
      </div>
    ),
    ssr: false
  }
);

export const DynamicPDFGenerator = dynamic(
  () => import('../utils/PDFGenerator'),
  {
    loading: () => (
      <div className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded">
        <div className="w-4 h-4 bg-red-300 rounded animate-pulse" />
        <span>Generating PDF...</span>
      </div>
    ),
    ssr: false
  }
);

// Newsletter Component (potentially heavy with animations)
export const DynamicNewsletter = dynamic(
  () => import('../homepage/Newsletter'),
  {
    loading: () => (
      <div className="py-12 bg-gray-50">
        <div className="max-w-md mx-auto space-y-4 px-4">
          <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4 mx-auto" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
          <div className="flex gap-2">
            <div className="h-12 bg-gray-200 rounded animate-pulse flex-1" />
            <div className="h-12 bg-blue-200 rounded animate-pulse w-24" />
          </div>
        </div>
      </div>
    ),
    ssr: true // Newsletter có thể cần SEO
  }
);