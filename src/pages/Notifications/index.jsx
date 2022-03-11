import React from "react";
import { Link } from "react-router-dom";

import { Box } from "@mui/system";
import { CircularProgress, Tab, Tabs } from "@mui/material";

import Header from "../../components/Header";
import News from "../../components/News";
import TweetLiked from "../../components/TweetLiked";

import { icons } from "../../constants";

import { AuthContext } from "../../context/authContext";

import { useFirestoreWithQueryAndWhere } from "../../utils/useFirestoreWithQueryAndWhere";

import useStyles from "./styles";
import NoContent from "../../components/NoContent";

// Liens pour la Nav Tab
function LinkTab(props) {
  return <Tab component={Link} {...props} />;
}

const Notifications = () => {
  const classes = useStyles();
  const auth = React.useContext(AuthContext);

  // State pour la nav tab
  const [value, setValue] = React.useState(0);

  // Fonction de la nav tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Utilisation du hook perso useFirestoreWithQuery pour récupérer uniquement les tweets
  // de l'utilisateur connecté dans l'ordre de publication
  const sortedTweets = useFirestoreWithQueryAndWhere(
    "tweets",
    "author_id",
    `${auth.userData?.[0]?.id}`
  );

  // Tweets de l'utilisateur connecté qui ont des likers
  const tweetsWithLikers = sortedTweets?.filter((sortedTweet) => {
    // Si il y a seulement l'utilisateur connecté dans les likers, on return null
    if (
      sortedTweet.likers.length === 1 &&
      sortedTweet.likers[0] === auth.userData[0].id
    ) {
      return null;
      // Sinon on prend en compte le tweet
    } else {
      return sortedTweet.likers.length > 0;
    }
  });

  const iconsArray = [{ name: icons.SettingsOutlinedIcon }];

  return (
    <Box display="flex">
      <Box borderLeft="1px solid #eff3f4" borderRight="1px solid #eff3f4">
        <Header title="Notifications" iconsRight={iconsArray} />
        {/* Nav Tab */}
        <Box>
          <Box
            display="flex"
            justifyContent="center"
            width="100%"
            fontSize="font.main"
            textTransform="none"
            borderBottom="1px solid #eff3f4"
          >
            <Tabs value={value} onChange={handleChange} aria-label="nav tabs">
              <LinkTab
                className={classes.notifications__link_nav}
                to={"/notifications"}
                label="All"
              />
              <LinkTab
                className={classes.notifications__link_nav}
                to={"/notifications/mentions"}
                label="Mentions"
              />
            </Tabs>
          </Box>
          <Box>
            {/* Si pas de tweets avec likers */}
            {tweetsWithLikers?.length === 0 ? (
              <NoContent
                title="Nothing to see here — yet"
                subtitle="From likes to Retweets and a whole lot more, this is where all the action happens."
              />
            ) : null}

            {/* Sinon on les affiche */}
            {tweetsWithLikers ? (
              <>
                {tweetsWithLikers.map((tweet) => (
                  <TweetLiked key={tweet?.id} tweet={tweet} />
                ))}
              </>
            ) : (
              <CircularProgress sx={{ margin: "auto" }} />
            )}
          </Box>
        </Box>
      </Box>
      <Box>
        <News />
      </Box>
    </Box>
  );
};

export default Notifications;
