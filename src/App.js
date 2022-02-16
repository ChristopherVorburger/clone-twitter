import { ThemeProvider, createTheme } from "@mui/material/styles";

import Prehome from "./pages/Prehome";

function App() {
  // Avec material UI, on a la possibilité de créer des thèmes
  // personnalisés avec la fonction createTheme.
  // On peut aussi, grâce à cette fonction, surcharger le thème
  // par défaut de material UI.
  // Pour cela, on surcharge la valeur existante par une nouvelle
  // valeur de la propriété en question.
  // Exemple avec le changement de la couleur principale ci-dessous
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1d9bf0",
      },
    },
  });

  return (
    // Pour rendre disponible notre nouveau thème, il faut wrapper
    // les composants où l'on souhaite l'utiliser avec un ThemeProvider
    <ThemeProvider theme={theme}>
      <Prehome />
    </ThemeProvider>
  );
}

export default App;
