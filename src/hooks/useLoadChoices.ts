'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/storeHooks';
import { fetchChoices, fetchScoreboard, selectChoicesStatus } from '@/store/slices/gameSlice';
import { useApiErrorHandler } from './useApiErrorHandler';

type Options = {
  /** fire automatically on mount */
  auto?: boolean;
};

export function useLoadChoices(options: Options = {}) {
  const { auto = true } = options;

  const dispatch = useAppDispatch();
  const handleApiError = useApiErrorHandler();

  const [loading, setLoading] = useState(false);
  const did = useRef(false);

  const load = useCallback(async () => {
    setLoading(true);
    void dispatch(fetchChoices()).unwrap().catch(handleApiError).finally(() => {setLoading(false)});
    void dispatch(fetchScoreboard()).unwrap().catch(handleApiError).finally(() => {setLoading(false)});
  }, [dispatch, handleApiError]);

  useEffect(() => {
    if (did.current) return;
    did.current = true;
    if (auto) void load();
  }, [auto, load]);

  return {
    loading,
    reload: load,
  };
}
