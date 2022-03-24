import { Typography, Box } from "@mui/material";
import React from "react";

import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/analytics";
import useStyles from "./styles";
import { images } from "../../../constants";

export default function ChannelItem({ user, handleClick, channelID }) {
  const classes = useStyles();
  const userToDisplay = user[0];

  return (
    <Box
      className={classes.profile_section}
      sx={{
        padding: "12px",
      }}
      onClick={() => handleClick(channelID)}
    >
      <Box button display="flex" justifyContent="center" alignItems="center">
        <Box width="50px" height="50px" marginRight="0.5rem">
          <img
            className={classes.profile_section__avatar_button}
            style={{ border: "1px solid lightgrey" }}
            src={
              userToDisplay?.profile_image_url &&
              userToDisplay?.profile_image_url !== ""
                ? userToDisplay?.profile_image_url
                : images.user
            }
            alt="user avatar"
          />
        </Box>
        <Box className={classes.profile_section__avatar_texts} flexGrow="1">
          <Typography fontSize="font.main" fontWeight="mainBold">
            {userToDisplay?.name}
          </Typography>
          <Typography fontSize="font.main" color="grey.main">
            @{userToDisplay?.username}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
