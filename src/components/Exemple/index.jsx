// Comme promis, voici l'exemple d'un composant react utilisant Material UI.
import React from "react";
// On commence par importer le composant 'Typography' qui est l'equivalent d'une balise <p>,
// puis on l'utilise dans notre composant comme un composant React classique.
import { Typography } from "@mui/material";

// J'ai bien entendu installé la librairie avec la commande.
// 'npm install @mui/material @emotion/react @emotion/styled'

// Puis j'ai créé un composant React Exemple que j'utilise dans App.js
// afin de l'afficher. (J'utilise .jsx pour créer les composants car je trouve que
// l'arborescence est plus lisible de cette manière et le comportement est le même que .js).

// Grâce à MUI, on a maintenant un super paragraphe déjà stylisé par le thème par défaut de MUI.

// Mais maintenant, admettons que l'on veuille appliquer notre propre style sur ce paragraphe,
// le mieux est d'utiliser la fonction 'makeStyles' de MUI qui nous retourne un hook.
// La doc : https://mui.com/styles/api/#makestyles-styles-options-hook

// Pour réaliser un code clean et lisible, on peut directement placer notre fonction
// 'makeStyles' et donc nos styles dans un fichier styles.js dans le même dossier
// du composant en question.

// On importe notre hook qui nous est retourné par makeStyles.
import useStyles from "./styles";

const Exemple = () => {
  // On crée une constante pour utiliser notre hook dans notre composant.
  // De cette manière, on récupère un objet contenant tout nos styles.
  const classes = useStyles();

  return (
    <div>
      {/* Puis on applique notre style avec le paramètre classeName */}
      <Typography className={classes.button}>Je suis un paragraphe</Typography>
    </div>
  );
};

export default Exemple;
