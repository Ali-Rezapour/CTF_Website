import { ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

import Grid from "@mui/material/Unstable_Grid2";

import { lightTheme, darkTheme } from "./theme";

const cacheRTL = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const MainLayout = ({ children, mode }) => {
  const theme = mode === "dark" ? darkTheme : lightTheme;

  return (
    <CacheProvider value={cacheRTL}>
      <ThemeProvider theme={theme}>
        {/* Grid System */}
        <Grid container sx={{ height: "100vh" }}>
          {children}
        </Grid>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MainLayout;
