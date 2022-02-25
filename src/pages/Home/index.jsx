import React from "react";

// components
import Header from "../../components/Header";
import BottomNavigation from "../../components/BottomNavigation";
import LeftNavbar from "../../components/LeftNavbar";
import Welcome from "../../components/Welcome";
import News from "../../components/News";
import NewTweet from "../../components/NewTweet";
import Tweet from "../../components/Tweet/Tweet";

// components MUI
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Divider } from "@mui/material";

// hooks
import { useFirestore } from "../../utils/useFirestore";

// Import du context Auth
import { AuthContext } from "../../context/authContext";

import useStyles from "./styles";

const Home = () => {
  const classes = useStyles();

  // Utilisation du hook useContext pour récupérer le contexte Auth
  const auth = React.useContext(AuthContext);

  // gestion affichage des tweets à l'aide du hooks personalisé et réutilisable : "useFirestore"
  const tweets = useFirestore("tweets");

  // On filtre les tweets à afficher
  // Ici en l'occurrence ceux qui ont le même author_id que la personne connectée
  const filteredTweets = tweets?.filter(
    (tweet) => tweet.author_id === auth.authUser?.uid
  );
  return (
    <>
      <Box display="flex" justifyContent="center">
        <LeftNavbar />
        <Box
          display="flex"
          flexDirection="column"
          borderLeft="1px solid #eff3f4"
          borderRight="1px solid #eff3f4"
        >
          <Header />
          <NewTweet />
          <Divider sx={{ borderColor: "background__input" }} />
          {/* Si le tableau filtré est vide, autrement dit si l'utilisateur n'a pas de followings
           et qu'il n'a aucun tweets, on affiche le composant welcome */}
          {filteredTweets?.length === 0 ? <Welcome /> : null}
          {/* Sinon, */}
          {/* On map sur le tableau filtré */}
          {tweets ? (
            <>
              {filteredTweets.map((tweet) => (
                <Tweet key={tweet.id} text={tweet.text} />
              ))}
            </>
          ) : (
            <CircularProgress />
          )}
        </Box>
        <News />
      </Box>
      <BottomNavigation />
    </>
  );
};

export default Home;
