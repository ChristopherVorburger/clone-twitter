import React from "react";

import { Box } from "@mui/system";
import { CircularProgress, Typography } from "@mui/material";

import Header from "../../components/Header";
import News from "../../components/News";
import Tweet from "../../components/Tweet/Tweet";

import { icons, images } from "../../constants";

import { useAuth } from "../../context/authContext";
import { useTweets } from "../../context/tweetContext";

import useStyles from "./styles";

const Bookmarks = () => {
  const classes = useStyles();
  const { userData } = useAuth();

  const { tweetsByDate } = useTweets();

  const filteredTweets = tweetsByDate?.filter((tweet) => {
    return userData?.[0]?.bookmarks?.includes(tweet?.id);
  });

  const iconsArray = [{ name: icons.MoreHorizIcon }];

  return (
    <Box display="flex">
      <Box
        className={classes.bookmarks__center}
        borderLeft="1px solid #eff3f4"
        borderRight="1px solid #eff3f4"
        maxWidth="590px"
      >
        <Header
          title="Bookmarks"
          subtitle={`@${userData?.[0]?.username}`}
          iconsRight={iconsArray}
        />
        <Box display="flex" flexDirection="column" justifyContent="center">
          {/* Si l'utilisateur n'a pas de bookmark on affiche ceci */}
          {userData?.[0]?.bookmarks?.length === 0 ? (
            <Box maxWidth="400px" m="2rem auto" p="0 2rem">
              <Box m="1rem 0 36px 0">
                <img src={images.cage} alt="bird cage" />
              </Box>
              <Typography fontSize="31px" fontWeight="mainBold">
                Save Tweets for later
              </Typography>
              <Typography fontSize="font.main" color="grey.main">
                Don’t let the good ones fly away! Bookmark Tweets to easily find
                them again in the future.
              </Typography>
            </Box>
          ) : (
            <Box width="100%">
              {/* Sinon on affiche les bookmarks */}
              {tweetsByDate ? (
                <>
                  {filteredTweets.map((tweet) => (
                    <Tweet key={tweet?.id} tweet={tweet} />
                  ))}
                </>
              ) : (
                <CircularProgress sx={{ margin: "auto" }} />
              )}
            </Box>
          )}
        </Box>
      </Box>
      <Box>
        <News />
      </Box>
    </Box>
  );
};

export default Bookmarks;
