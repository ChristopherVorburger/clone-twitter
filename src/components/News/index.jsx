import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Input, InputAdornment, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import useStyles from "./styles";
import { images } from "../../constants";

import Trend from "./Trend";
import WhoToFollow from "./WhoToFollow";

// Import des fonctions du firestore
import { db } from "../../firebase-config";
import { collection, onSnapshot } from "firebase/firestore";

// Référence des collections
const usersCollectionRef = collection(db, "users");

const News = () => {
  const classes = useStyles();

  // State utilisateurs
  const [users, setUsers] = useState([]);

  // On récupère les utilisateurs
  useEffect(() => {
    onSnapshot(usersCollectionRef, (snapshot) => {
      setUsers(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log("users News", users);

  return (
    <Box className={classes.container} m="1rem" maxWidth="350px">
      <Input
        className={classes.input}
        sx={{
          padding: "0.5rem",
          backgroundColor: "grey.background__input",
          borderRadius: "50px",
          content: "none",
        }}
        id="input-with-icon-adornment"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        placeholder="Search Twitter"
      />
      <Box
        m="1rem auto"
        backgroundColor="grey.background__trend"
        borderRadius="20px"
      >
        <Typography fontSize="20px" mb="1rem" fontWeight="bold" p="1rem">
          Trends
        </Typography>
        <Box>
          <Trend
            position="1"
            category="Politics"
            title="Poutine"
            nbTweets="1000"
          />
        </Box>
        <Box>
          <Trend
            position="2"
            category="Politics"
            title="Russie"
            nbTweets="666"
          />
        </Box>
        <Box>
          <Trend
            position="3"
            category="Trending in France"
            title="Il fait moche"
            nbTweets="7564"
          />
        </Box>
        <Box>
          <Trend
            position="4"
            category="Cooking"
            title="Choucroute"
            nbTweets="5826"
          />
        </Box>
      </Box>
      <Box
        m="2rem auto"
        backgroundColor="grey.background__trend"
        borderRadius="20px"
      >
        <Typography fontSize="20px" fontWeight="bold" p="1rem">
          Who to follow
        </Typography>
        {/* On affiche les utilisateurs dans who to follow en limitant leur nombre à trois */}
        {users.slice(0, 3).map((user) => {
          return (
            <Box key={user.id}>
              <WhoToFollow
                image={images.logoGoogle}
                name={user.name}
                username={user.username}
              />
            </Box>
          );
        })}
      </Box>
      <Box m="2rem auto" p="1rem">
        <Typography fontSize="15px" color="grey.main">
          Terms of Service Privacy Policy Cookie Policy Accessibility Ads info
          More © 2022 Twitter, Inc.
        </Typography>
      </Box>
    </Box>
  );
};

export default News;
