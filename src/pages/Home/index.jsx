import React from "react";

// components
import Header from "../../components/Header";
import BottomNavigation from "../../components/BottomNavigation";
import Welcome from "../../components/Welcome";
import News from "../../components/News";
import NewTweet from "../../components/NewTweet";
import Tweet from "../../components/Tweet/Tweet";

// components MUI
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Divider } from "@mui/material";

// hooks
import { useFirestoreWithQuery } from "../../utils/useFirestoreWithQuery";

// Import du context Auth
import { AuthContext } from "../../context/authContext";

//Import des icones
import { icons } from "../../constants";

const Home = () => {
  // Utilisation du hook useContext pour récupérer le contexte Auth
  const auth = React.useContext(AuthContext);

  // Utilisation du hook perso useFirestoreWithQuery pour récupérer les tweets dans l'ordre de publication
  const tweets = useFirestoreWithQuery("tweets");

  // On filtre les tweets à afficher
  // Ici en l'occurrence ceux qui ont le même author_id que la personne connectée
  // Ici en l'occurrence ceux qui ont le même author_id que l'utilisateur connecté
  // et aussi ceux que l'utilisateur connecté a comme following
  const filteredTweets = tweets?.filter((tweet) => {
    return (
      tweet?.author_id === auth?.authUser?.uid ||
      auth?.userData?.[0]?.following?.includes(tweet.author_id)
    );
  });

  const iconsArray = [{ name: icons.AutoAwesomeSharpIcon }];

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Box
          display="flex"
          flexDirection="column"
          borderLeft="1px solid #eff3f4"
          borderRight="1px solid #eff3f4"
          maxWidth="590px"
        >
          <Header title="Home" iconsRight={iconsArray} />

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
                <Tweet key={tweet?.id} tweet={tweet} />
              ))}
            </>
          ) : (
            <CircularProgress sx={{ margin: "auto" }} />
          )}
        </Box>
        <News />
      </Box>
      <BottomNavigation />
    </>
  );
};

export default Home;
