import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import BottomNavigation from "../../components/BottomNavigation";

import useStyles from "./styles";
import LeftNavbar from "../../components/LeftNavbar";
import Welcome from "../../components/Welcome";
import NewTweet from "../../components/NewTweet";
import { Box, Divider, Stack } from "@mui/material";

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
      <Stack direction="row">
        <LeftNavbar drawerWidth={drawerWidth} />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          borderLeft="1px solid #eff3f4"
          borderRight="1px solid #eff3f4"
        >
          <Header drawerWidth={drawerWidth} />
          <NewTweet drawerWidth={drawerWidth} />
          <Divider sx={{ borderColor: "#eff3f4" }} />
          <Welcome drawerWidth={drawerWidth} />
        </Box>
      </Stack>
      <BottomNavigation />
    </>
  );
};

export default Home;
