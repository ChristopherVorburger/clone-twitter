import React from "react";
import AddTweetButton from "../../components/buttons/AddTweetButton";

import { Box, Button, Container, Typography } from "@mui/material";

import useStyles from "./styles";

const Welcome = () => {
  const classes = useStyles();
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "600px",
      }}
      height="100vh"
    >
      <Container
        className={classes.welcome__container}
        sx={{ margin: "30px auto", padding: "0 30px" }}
      >
        <Typography
          className={classes.welcome__title}
          mb="0.5rem"
          fontWeight="mainBold"
          fontSize="29px"
        >
          Welcome to Twitter!
        </Typography>
        <Typography mb="27px" fontSize="fontSize.main">
          This is the best place to see what’s happening in your world. Find
          some people and topics to follow now.
        </Typography>
        <Button
          variant="contained"
          className={classes.button}
          sx={{ display: "flex" }}
        >
          <Typography fontWeight="mainBold">Let's go!</Typography>
        </Button>
      </Container>
      <Box className={classes.button__add_tweet}>
        <AddTweetButton />
      </Box>
    </Box>
  );
};

export default Welcome;
