import * as React from "react";
import { Box, Button, Checkbox } from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function MyApp() {
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  const [themeSelected, setThemeSelected] = React.useState("light");
  console.log(themeSelected);
  return (
    <Box
      display="flex"
      height="100vh"
      sx={{ backgroundColor: "background.default" }}
      color={theme.palette.text.primary}
    >
      <Box margin="0 auto !important">
        <Checkbox
          onChange={() => {
            setThemeSelected("light");
          }}
        ></Checkbox>
        Par défaut
      </Box>
      <Box margin="0 auto !important">
        <Checkbox
          onChange={() => {
            setThemeSelected("darkBLue");
          }}
        ></Checkbox>
        Bleu foncé
      </Box>
      <Box onClick={colorMode.toggleColorMode} margin="0 auto !important">
        Noir
      </Box>
    </Box>
  );
}

export default function ToggleColorMode() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((mode) => (mode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: "#1d9bf0",
          }
        : {
            // palette values for dark mode
            primary: deepOrange,
            divider: deepOrange[700],
            background: {
              default: deepOrange[900],
              paper: deepOrange[900],
            },
            text: {
              primary: "#fff",
              secondary: grey[500],
            },
          }),
    },
  });

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <MyApp />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

// primary: {
//     main: "#1d9bf0",
//   },
//   secondary: {
//     main: "#ffd400",
//   },
//   error: {
//     main: "#f91880",
//   },
//   warning: {
//     main: "#7856ff",
//   },
//   info: {
//     main: "#ff7a00",
//   },
//   success: {
//     main: "#00ba7c",
//   },
