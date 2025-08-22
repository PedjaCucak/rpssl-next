'use client';
import React from 'react';
import { Alert, IconButton, type AlertColor } from '@mui/material';
import { closeSnackbar, SnackbarContent } from 'notistack';
import CloseIcon from '@mui/icons-material/Close';

interface CustomAlertProps {
  [key: string]: any;
}

export const CustomAlert = React.forwardRef<HTMLDivElement, CustomAlertProps>(
  (props, ref) => {
    const { message, variant, id, style } = props;

    return (
      <SnackbarContent ref={ref} style={style}>
        <Alert
          variant="filled"
          severity={variant as AlertColor}
          sx={{ width: '100%' }}
          action={
            <IconButton
              size="small"
              aria-label="close notification"
              onClick={() => closeSnackbar(id)}
              sx={{ color: 'inherit' }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {message}
        </Alert>
      </SnackbarContent>
    );
  }
);
