import React from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { icons } from "../../../constants";

const Trend = ({ position, category, title, nbTweets }) => {
  return (
    <Box mb="1rem">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex">
          <Typography fontSize="13px" color="#536471" mr="0.2rem">
            {position}
          </Typography>
          <Typography fontSize="13px" color="#536471">
            ·
          </Typography>
          {category?.includes("Trending") ? (
            <Typography fontSize="13px" color="#536471" m="0 0.2rem">
              {category}
            </Typography>
          ) : (
            <>
              <Typography fontSize="13px" color="#536471" m="0 0.2rem">
                {category}
              </Typography>
              <Typography fontSize="13px" color="#536471">
                · Trending
              </Typography>
            </>
          )}
        </Box>
        <Box>
          <IconButton>
            <icons.MoreHorizIcon />
          </IconButton>
        </Box>
      </Box>
      <Box>
        <Typography fontSize="15px" fontWeight="bold">
          {title}
        </Typography>
      </Box>
      <Box>
        <Typography fontSize="13px" color="#536471">
          {nbTweets} Tweets
        </Typography>
      </Box>
    </Box>
  );
};

export default Trend;
