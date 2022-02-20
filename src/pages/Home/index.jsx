import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import BottomNavigation from "../../components/BottomNavigation";

import useStyles from "./styles";
import LeftNavbar from "../../components/LeftNavbar";
import Welcome from "../../components/Welcome";
import NewTweet from "../../components/NewTweet";

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
      <LeftNavbar drawerWidth={drawerWidth} />
      <main>
        <Header drawerWidth={drawerWidth} />
        <NewTweet drawerWidth={drawerWidth} />
        <Welcome drawerWidth={drawerWidth} />
      </main>
      <BottomNavigation />
    </>
  );
};

export default Home;
