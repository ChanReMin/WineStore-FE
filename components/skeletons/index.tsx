"use client";

export const DashboardSkeleton = () => (
  <div className="space-y-6 p-6">
    <div className="h-8 bg-gray-200 rounded-lg animate-pulse w-1/3" />
    
    {/* Stats cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-24 bg-gray-200 rounded-lg animate-pulse" />
      ))}
    </div>
    
    {/* Charts area */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
      <div className="h-64 bg-gray-200 rounded-lg animate-pulse" />
    </div>
  </div>
);

export const ChartSkeleton = () => (
  <div className="w-full h-64 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
    <div className="text-gray-400">Loading chart...</div>
  </div>
);

export const ModalSkeleton = () => (
  <div className="bg-white rounded-lg p-6 max-w-md mx-auto">
    <div className="space-y-4">
      <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
      <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
      <div className="flex gap-2 mt-6">
        <div className="h-10 bg-gray-200 rounded animate-pulse flex-1" />
        <div className="h-10 bg-gray-200 rounded animate-pulse flex-1" />
      </div>
    </div>
  </div>
);

export const AdminModalSkeleton = () => (
  <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto">
    <div className="space-y-6">
      <div className="h-8 bg-gray-200 rounded animate-pulse w-1/2" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
          <div className="h-10 bg-gray-200 rounded animate-pulse w-full" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/3" />
          <div className="h-10 bg-gray-200 rounded animate-pulse w-full" />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
        <div className="h-32 bg-gray-200 rounded animate-pulse w-full" />
      </div>
      
      <div className="flex gap-3 pt-4">
        <div className="h-10 bg-gray-200 rounded animate-pulse w-24" />
        <div className="h-10 bg-gray-200 rounded animate-pulse w-20" />
      </div>
    </div>
  </div>
);

export const AnalyticsSkeleton = () => (
  <div className="space-y-6">
    <div className="h-6 bg-gray-200 rounded animate-pulse w-1/4" />
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="h-80 bg-gray-200 rounded-lg animate-pulse" />
      </div>
      <div className="space-y-4">
        <div className="h-40 bg-gray-200 rounded-lg animate-pulse" />
        <div className="h-32 bg-gray-200 rounded-lg animate-pulse" />
      </div>
    </div>
  </div>
);

export const FilterSkeleton = () => (
  <div className="space-y-4">
    <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
          <div className="h-10 bg-gray-200 rounded animate-pulse w-full" />
        </div>
      ))}
    </div>
    
    <div className="flex gap-2">
      <div className="h-10 bg-gray-200 rounded animate-pulse w-20" />
      <div className="h-10 bg-gray-200 rounded animate-pulse w-16" />
    </div>
  </div>
);

export const PaymentSkeleton = () => (
  <div className="space-y-6 p-6 bg-white rounded-lg border">
    <div className="h-6 bg-gray-200 rounded animate-pulse w-1/2" />
    
    <div className="space-y-4">
      <div className="h-12 bg-gray-200 rounded animate-pulse w-full" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
        <div className="h-12 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="h-12 bg-gray-200 rounded animate-pulse w-full" />
    </div>
    
    <div className="h-12 bg-blue-200 rounded animate-pulse w-full" />
  </div>
);

export const RecommendationSkeleton = () => (
  <div className="space-y-4">
    <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3" />
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="aspect-square bg-gray-200 rounded animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
          </div>
        </div>
      ))}
    </div>
  </div>
);