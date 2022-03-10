import * as React from "react";
import { Box } from "@mui/material";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

// Context d'une fonction de switch de mode
const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

function ButtonDarkMode() {
  // Utilisation du theme MUI modifier plus bas ligne 57
  const theme = useTheme();
  // Déclaration de const pour récupérer la fonction de switch
  const colorMode = React.useContext(ColorModeContext);
  return (
    <Box
      // Sur un click on switch de mode
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
        {/* Ternaire qui gère l'icon l'ors d'un click */}
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
  // 'Import' de la fonction de switch avec les paramètres
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  //Thème modifié
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
    // Le .Provider sert à maj tous les composants enfants avec la value de color mode
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <ButtonDarkMode />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

// Fonction simplification pour import
export default function BouttonDarkMode() {
  return (
    <ToggleColorMode>
      <ButtonDarkMode />
    </ToggleColorMode>
  );
}
