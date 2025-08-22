"use client";

import * as React from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/store";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

const theme = createTheme({ palette: { mode: "light" } });

export default function Providers({ children }: { children: React.ReactNode }) {
  const store = React.useMemo(() => makeStore(), []);
  return (
    <AppRouterCacheProvider options={{ key: "mui", prepend: true }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>{children}</Provider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
