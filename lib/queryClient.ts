import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 phút - Data được coi là "fresh"
      gcTime: 10 * 60 * 1000, // 10 phút - Cache time (garbage collection)
      retry: 1,
      refetchOnWindowFocus: false, // Không refetch khi focus lại window
      refetchOnMount: false, // Không refetch khi mount nếu data còn fresh
    },
  },
});
