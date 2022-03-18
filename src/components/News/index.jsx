import React from "react";
import { Box } from "@mui/system";
import { Input, InputAdornment, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import useStyles from "./styles";

import Trend from "./Trend";
import WhoToFollow from "./WhoToFollow";

// Import du context Auth
import { AuthContext } from "../../context/authContext";

import { useFirestore } from "../../utils/useFirestore";

import axios from "axios";

const News = () => {
  const classes = useStyles();
  const [topHeadlines, setTopHeadlines] = React.useState();

  // Utilisation du hook useContext pour récupérer le contexte Auth
  const auth = React.useContext(AuthContext);

  const users = useFirestore("users");

  // Filtre des utilisateurs pour obtenir les non suivis
  const unfollowUsers = users?.filter((user) => {
    return !auth?.userData?.[0]?.following?.includes(user?.id);
  });

  // Filtre les utilisateurs non suivis pour supprimer l'utilisateur connecté du tableau
  const filterUnfollowUsers = unfollowUsers?.filter((user) => {
    return user?.id !== auth?.authUser?.uid;
  });

  // Appel a l'API pour récupérer les dernières news des US
  React.useEffect(() => {
    axios
      .get("https://api.newscatcherapi.com/v2/search", {
        params: { q: "Love", lang: "en", sort_by: "relevancy", page: "1" },
        headers: {
          "x-api-key": `${process.env.REACT_APP_NEWS_API_KEY}`,
        },
      })
      .then((response) => {
        console.log("response", response);
        setTopHeadlines(response.data.articles);
      })
      .catch((err) => console.log(err));
  }, []);

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
        m="2rem auto"
        backgroundColor="grey.background__trend"
        borderRadius="20px"
      >
        <Typography fontSize="font.large" fontWeight="800" p="1rem">
          Trends
        </Typography>
        {topHeadlines?.slice(0, 4)?.map((news, index) => {
          return (
            <Box key={index}>
              <Trend news={news} index={index} />
            </Box>
          );
        })}
      </Box>
      <Box
        m="2rem auto"
        backgroundColor="grey.background__trend"
        borderRadius="20px"
      >
        <Typography fontSize="font.large" fontWeight="mainBold" p="1rem">
          Who to follow
        </Typography>
        {/* On affiche les utilisateurs non suivi dans who to follow en limitant leur nombre à trois */}
        {filterUnfollowUsers?.slice(0, 3).map((user) => {
          // On affiche pas l'utilisateur connecté
          return (
            <Box key={user?.id}>
              <WhoToFollow user={user} />
            </Box>
          );
        })}
      </Box>
      <Box m="2rem auto" p="1rem">
        <Typography fontSize="font.main" color="grey.main">
          Terms of Service Privacy Policy Cookie Policy Accessibility Ads info
          More © 2022 Twitter, Inc.
        </Typography>
      </Box>
    </Box>
  );
};

export default News;
