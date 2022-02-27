import * as React from "react";
import { Box } from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function ButtonDarkMode() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      onClick={colorMode.toggleColorMode}
      sx={{
        display: "flex",
        width: "150px",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 10,
        p: 3,
      }}
    >
      {theme.palette.mode} mode
      <Box sx={{ ml: 1 }} color="inherit">
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </Box>
    </Box>
  );
}

function ToggleColorMode() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <ButtonDarkMode />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default function BouttonDarkMode() {
  return (
    <ToggleColorMode>
      <ButtonDarkMode />
    </ToggleColorMode>
  );
}
