import React from "react";
import { Box } from "@mui/system";

import useStyles from "./styles";
import {
  Container,
  Input,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
          Trends for you
        </Typography>
        <Box>
          <Typography fontSize="15px">Entertainment - Live</Typography>
          <Typography>Que des bonnes nouvelles</Typography>
        </Box>
        <Box>
          <Typography fontSize="15px">Entertainment - Live</Typography>
          <Typography>Que des bonnes nouvelles</Typography>
        </Box>
        <Box>
          <Typography fontSize="15px">Entertainment - Live</Typography>
          <Typography>Que des bonnes nouvelles</Typography>
        </Box>
        <Box>
          <Typography fontSize="15px">Entertainment - Live</Typography>
          <Typography>Que des bonnes nouvelles</Typography>
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
