'use client';

import { useCallback } from 'react';
import { useNotify } from './useNotify';
import { isAbortError } from '@/lib/isAbortError';

export const useApiErrorHandler = () => {
  const notify = useNotify();
  return useCallback(
    (error: unknown, fallbackMessage = 'Unexpected error occurred') => {
      if (isAbortError(error)) return; // silently ignore
      let message = fallbackMessage;
      if (typeof error === 'string') {
        message = error;
      } else if (error && typeof error === 'object' && 'message' in error) {
        message = String((error as any).message);
      }
      notify(message, 'error');
    },
    [notify]
  );
};
