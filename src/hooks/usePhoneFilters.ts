import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback } from 'react';

export function usePhoneFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get current values
  const getParam = (key: string) => searchParams.get(key) || '';
  const getArrayParam = (key: string) => {
    const val = searchParams.get(key);
    return val ? val.split(',') : [];
  };

  // Helper to push to router
  const updateUrl = useCallback((params: URLSearchParams) => {
    // Reset to page 1 if changing a filter (but not if just changing page)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router]);

  // Set single value (like page or sort)
  const setFilter = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    if (key !== 'page') params.set('page', '1');
    updateUrl(params);
  }, [searchParams, updateUrl]);

  // Set multiple values at once
  const setFilters = useCallback((newFilters: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    let changedOtherThanPage = false;
    
    for (const [key, value] of Object.entries(newFilters)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      if (key !== 'page') changedOtherThanPage = true;
    }
    
    if (changedOtherThanPage) params.set('page', '1');
    updateUrl(params);
  }, [searchParams, updateUrl]);

  // Toggle array value (like brand checkbox)
  const toggleArrayFilter = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = getArrayParam(key);
    
    let next;
    if (current.includes(value)) {
      next = current.filter(v => v !== value);
    } else {
      next = [...current, value];
    }

    if (next.length > 0) {
      params.set(key, next.join(','));
    } else {
      params.delete(key);
    }
    
    params.set('page', '1');
    updateUrl(params);
  }, [searchParams, updateUrl]);

  // Clear all
  const clearFilters = useCallback(() => {
    const view = searchParams.get('view');
    const params = new URLSearchParams();
    if (view) params.set('view', view);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  return {
    searchParams,
    getParam,
    getArrayParam,
    setFilter,
    setFilters,
    toggleArrayFilter,
    clearFilters
  };
}
