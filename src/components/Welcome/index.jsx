import React from "react";
import AddTweetButton from "../../components/buttons/AddTweetButton";

import { Box, Button, Container, Typography } from "@mui/material";

import useStyles from "./styles";

const Welcome = ({ drawerWidth }) => {
  const classes = useStyles();
  return (
    <Box
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        maxWidth: "600px",
        ml: `${drawerWidth}px`,
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
          fontWeight="bold"
          fontSize="29px"
        >
          Welcome to Twitter!
        </Typography>
        <Typography
          mb="27px"
          fontWeight="light"
          fontSize="14px"
          color="grey.darker"
        >
          This is the best place to see what’s happening in your world. Find
          some people and topics to follow now.
        </Typography>
        <Button
          variant="contained"
          className={classes.button}
          sx={{ display: "flex" }}
        >
          <Typography fontWeight="bold">Let's go!</Typography>
        </Button>
      </Container>
      <Box className={classes.button__add_tweet}>
        <AddTweetButton />
      </Box>
    </Box>
  );
};

export default Welcome;
