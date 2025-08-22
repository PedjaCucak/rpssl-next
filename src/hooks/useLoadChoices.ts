'use client';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/storeHooks';
import { fetchChoices, fetchScoreboard, selectChoicesStatus } from '@/store/slices/gameSlice';

export function useLoadChoices() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectChoicesStatus);
  const did = useRef(false);
  useEffect(() => {
    if (did.current) return;
    did.current = true;
    void dispatch(fetchChoices());
    void dispatch(fetchScoreboard());
  }, [dispatch]);
  return { loading: status === 'loading' || status === 'idle' };
}
