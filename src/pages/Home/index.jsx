import { Box, Button, Container, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import BottomNavigation from "../../components/BottomNavigation";

import useStyles from "./styles";
import AddTweetButton from "../../components/buttons/AddTweetButton";
import LeftNavbar from "../../components/LeftNavbar";

const Home = () => {
  const classes = useStyles();

  // state to set dimension of the screen
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });

  // function to set the dimension
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  // useEffect to watch the resizing of the screen
  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, [screenSize]);

  // assign a value to the width of the drawer
  const drawerWidth = screenSize.dynamicWidth < 600 ? 0 : 88;

  return (
    <>
      <Header drawerWidth={drawerWidth} />
      <LeftNavbar drawerWidth={drawerWidth} />
      <main>
        <Box
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
          height="100vh"
        >
          <Container sx={{ margin: "30px auto", padding: "0 30px" }}>
            <Typography mb="0.5rem" fontWeight="bold" fontSize="29px">
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
      </main>
      <BottomNavigation />
    </>
  );
};

export default Home;
