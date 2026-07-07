import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import useSWR from 'swr';
import { PhoneData, fetcher } from '@/lib/phones';
import { determineWinners } from '@/lib/comparePhones';
import { useMemo } from 'react';

export function useComparePhones() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const idsParam = searchParams.get('phones');
  const ids = idsParam ? idsParam.split(',').filter(Boolean) : [];

  const { data, isLoading } = useSWR<{ phones: PhoneData[] }>(
    ids.length > 0 ? `/api/phones?ids=${ids.join(',')}` : null,
    fetcher
  );

  const phones = data?.phones || [];

  const winners = useMemo(() => {
    return determineWinners(phones);
  }, [phones]);

  const removePhone = (idToRemove: string) => {
    const newIds = ids.filter(id => id !== idToRemove);
    const params = new URLSearchParams(searchParams.toString());
    if (newIds.length > 0) {
      params.set('phones', newIds.join(','));
    } else {
      params.delete('phones');
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const addPhone = (idToAdd: string) => {
    if (ids.includes(idToAdd)) return;
    if (ids.length >= 4) {
      alert("You can only compare up to 4 phones.");
      return;
    }
    const newIds = [...ids, idToAdd];
    const params = new URLSearchParams(searchParams.toString());
    params.set('phones', newIds.join(','));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return {
    ids,
    phones,
    isLoading,
    winners,
    removePhone,
    addPhone
  };
}
