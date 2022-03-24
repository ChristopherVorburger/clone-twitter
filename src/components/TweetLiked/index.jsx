import React from "react";
import { Box } from "@mui/system";

import { Typography } from "@mui/material";

import { icons, images } from "../../constants";

import { useFirestore } from "../../utils/useFirestore";

import { useAuth } from "../../context/authContext";

import useStyles from "./styles";

// Composants qui affiche les tweets likés
const TweetLiked = ({ tweet }) => {
  const classes = useStyles();
  const { authUser } = useAuth();

  const users = useFirestore("users");

  // Filtre des utilisateurs qui ont likés le tweet
  const userWhoLiked = users?.filter((user) => {
    // Suppression de l'utilisateur connecté
    if (user?.id === authUser?.uid) {
      return null;
    }
    return tweet?.likers?.includes(user?.id);
  });

  return (
    <>
      {/* map sur les utilisateurs qui ont liké le tweet */}
      {userWhoLiked?.map((user) => {
        return (
          <Box
            key={user?.id}
            display="flex"
            p="12px 1rem"
            borderBottom="1px solid #eff3f4"
          >
            <Box flexBasis="48px">
              <icons.FavoriteIcon
                style={{ color: "#e11616de", width: "2rem", height: "2rem" }}
              />
            </Box>
            <Box>
              <Box pr="20px" mb="12px">
                {user?.profile_image_url ? (
                  <>
                    <img
                      className={classes.tweet_liked__avatar}
                      src={user?.profile_image_url}
                      alt={user?.name}
                    />
                  </>
                ) : (
                  <>
                    <img
                      className={classes.tweet_liked__avatar}
                      style={{ border: "1px solid lightgrey" }}
                      src={images.user}
                      alt={user?.name}
                    />
                  </>
                )}
              </Box>
              <Box>
                <Typography fontSize="font.main">
                  {user?.name} liked your tweet
                </Typography>
              </Box>
              <Box>
                <Typography fontSize="font.main" color="grey.main">
                  {tweet?.text}
                </Typography>
              </Box>
              {/* <Typography>Show all</Typography> */}
            </Box>
          </Box>
        );
      })}
    </>
  );
};

export default TweetLiked;
