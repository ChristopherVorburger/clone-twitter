import { Button, Container, Typography } from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import BottomNavigation from "../../components/BottomNavigation";

import useStyles from "./styles";

const Home = () => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <main>
        <div>
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
        </div>
      </main>
      <BottomNavigation />
    </>
  );
};

export default Home;
