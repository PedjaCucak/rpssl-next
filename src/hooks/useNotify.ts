'use client';

import type { AlertColor } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';

export const useNotify = () => {
  const { enqueueSnackbar } = useSnackbar();
  return useCallback(
    (message: string, severity: AlertColor = 'info') => {
      enqueueSnackbar(message, { variant: severity });
    },
    [enqueueSnackbar]
  );
};
