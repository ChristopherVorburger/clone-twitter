import React from "react";

import { Box } from "@mui/system";

import Header from "../../components/Header";
import News from "../../components/News";

import { icons, images } from "../../constants";

import { AuthContext } from "../../context/authContext";
import { Typography } from "@mui/material";

import useStyles from "./styles";

const Bookmarks = () => {
  const classes = useStyles();
  const auth = React.useContext(AuthContext);
  return (
    <Box display="flex">
      <Box
        className={classes.bookmarks__center}
        borderLeft="1px solid #eff3f4"
        borderRight="1px solid #eff3f4"
      >
        <Header
          title="Bookmarks"
          subtitle={`@${auth.userData?.[0]?.username}`}
          iconsRight={icons.MoreHorizIcon}
        />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          maxWidth="400px"
          m="2rem auto"
          p="0 2rem"
        >
          <Box m="1rem 0 36px 0">
            <img src={images.cage} alt="bird cage" />
          </Box>
          <Typography
            className={classes.bookmarks__title}
            fontSize="31px"
            fontWeight="mainBold"
          >
            Save Tweets for later
          </Typography>
          <Typography fontSize="font.main" color="grey.main">
            Don’t let the good ones fly away! Bookmark Tweets to easily find
            them again in the future.
          </Typography>
        </Box>
      </Box>
      <Box>
        <News />
      </Box>
    </Box>
  );
};

export default Bookmarks;
