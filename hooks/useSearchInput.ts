import { useState, useCallback, useRef, useEffect } from 'react';

interface UseSearchInputOptions {
  delay?: number;
  minLength?: number;
  onSearch?: (query: string) => void;
  onSearchStart?: () => void;
  onSearchEnd?: () => void;
}

export function useSearchInput({
  delay = 300,
  minLength = 0,
  onSearch,
  onSearchStart,
  onSearchEnd
}: UseSearchInputOptions = {}) {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Memoized input handler
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
  }, []);

  // Search effect with debounce
  useEffect(() => {
    // Clear previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Don't search if query is too short
    if (query.length < minLength) {
      setIsSearching(false);
      onSearchEnd?.();
      return;
    }

    // Set searching state
    setIsSearching(true);
    onSearchStart?.();

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    // Set timeout for search
    timeoutRef.current = setTimeout(() => {
      onSearch?.(query);
      setIsSearching(false);
      onSearchEnd?.();
    }, delay);

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, delay, minLength, onSearch, onSearchStart, onSearchEnd]);

  // Clear search
  const clearSearch = useCallback(() => {
    setQuery('');
    setIsSearching(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  // Get abort signal for API calls
  const getAbortSignal = useCallback(() => {
    return abortControllerRef.current?.signal;
  }, []);

  return {
    query,
    isSearching,
    handleInputChange,
    clearSearch,
    getAbortSignal,
    setQuery
  };
}