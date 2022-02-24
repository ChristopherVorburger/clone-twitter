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
import { Box, Divider, Stack } from "@mui/material";

// hooks
import { useFirestore } from "../../utils/useFirestore";

import useStyles from "./styles";

const Home = () => {
  const classes = useStyles();
  const tweets = useFirestore("tweets");

  // gestion affichage des tweets à l'aide du hooks personalisé et éutilisable : "useFirestore"
  console.log(tweets, "tweets depuis home");
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
          {/* <Welcome /> */}
          {tweets ? (
            <>
              {tweets.map((tweet) => (
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
