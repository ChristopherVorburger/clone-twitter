import React from "react";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { icons } from "../../../constants";
import useStyles from "./styles";

// Composant pour afficher une news dans les trends
const Trend = ({ movie, index }) => {
  const classes = useStyles();

  const randomNumber = Math.floor(Math.random() * 10000);

  return (
    <Box className={classes.container} p="1rem">
      <Box display="flex" justifyContent="space-between" flexDirection="column">
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontSize="font.small" color="grey.main" mr="0.2rem">
              {index + 1} · Trending in USA
            </Typography>
            <Box>
              <IconButton>
                <icons.MoreHorizIcon />
              </IconButton>
            </Box>
          </Box>
          <Box>
            <Typography fontSize="font.main" fontWeight="mainBold">
              {movie.title}
            </Typography>
          </Box>
          <Box>
            <Typography fontSize="font.small" color="#536471">
              {randomNumber} Tweets
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Trend;
