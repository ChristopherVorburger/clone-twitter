// On importe la fonction 'makeStyles'
// (J'ai aussi installé le package @mui/styles pour cela)
import { makeStyles } from "@mui/styles";

// On exporte directement la fonction,
// elle nous retournera un objet avec nos styles comme propriétés
export default makeStyles({
  // Les classes sont des objets
  button: {
    // Dans cet objet, on crée toutes nos règles CSS
    color: "red",
    // Attention, On utilise le camelCase pour les noms de propriétés CSS
    // avec cette méthode.
    textDecoration: "underline",
  },
});
