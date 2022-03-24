import React from "react";

import { Typography } from "@mui/material";
import { Box } from "@mui/system";

import { icons, images } from "../../../constants";

import { useAuth } from "../../../context/authContext";

import useStyles from "./styles";

const BottomAvatar = () => {
  const { userData } = useAuth();

  const classes = useStyles();
  return (
    <Box
      className={classes.profile_section}
      sx={{
        borderRadius: "50px",
        padding: "12px",
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box width="50px" height="50px" marginRight="0.5rem">
          {userData?.[0]?.profile_image_url ? (
            <img
              className={classes.profile_section__avatar_button}
              style={{ border: "1px solid lightgrey" }}
              src={userData?.[0]?.profile_image_url}
              alt="user avatar"
            />
          ) : (
            <img
              className={classes.profile_section__avatar_button}
              style={{ border: "1px solid lightgrey" }}
              src={images.user}
              alt="user avatar"
            />
          )}
        </Box>
        <Box className={classes.profile_section__avatar_texts} flexGrow="1">
          <Typography fontSize="font.main" fontWeight="mainBold">
            {userData?.[0]?.name}
          </Typography>
          <Typography fontSize="font.main" color="grey.main">
            @{userData?.[0]?.username}
          </Typography>
        </Box>
        <Box>
          <Box className={classes.profile_section__icon_more}>
            {icons.MoreHorizIcon.type.render()}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BottomAvatar;
