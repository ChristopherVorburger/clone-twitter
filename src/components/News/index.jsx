import React from "react";
import { Box } from "@mui/system";

import useStyles from "./styles";
import { Input, InputAdornment, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Trend from "./Trend";

const News = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container} m="1rem" maxWidth="350px">
      <Input
        className={classes.input}
        sx={{
          padding: "0.5rem",
          backgroundColor: "#f7f9f9",
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
      <Box m="2rem auto" p="1rem" backgroundColor="#f7f9f9" borderRadius="20px">
        <Typography fontSize="20px" mb="2rem" fontWeight="bold">
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
      <Box m="2rem auto" p="1rem" backgroundColor="#f7f9f9" borderRadius="20px">
        <Typography fontSize="20px" mb="2rem" fontWeight="bold">
          Who to follow
        </Typography>
        <Box>
          <Typography fontSize="15px">Joueur du Grenier</Typography>
          <Typography>@Frederic_Molas</Typography>
        </Box>
        <Box>
          <Typography fontSize="15px">Sébastien Rassiat</Typography>
          <Typography>@Seb_du_Grenier</Typography>
        </Box>
        <Box>
          <Typography fontSize="15px">Antoine Daniel</Typography>
          <Typography>@MrAntoineDaniel</Typography>
        </Box>
      </Box>
      <Box m="2rem auto" p="1rem">
        <Typography>
          Terms of Service Privacy Policy Cookie Policy Accessibility Ads info
          More © 2022 Twitter, Inc.
        </Typography>
      </Box>
    </Box>
  );
};

export default News;
