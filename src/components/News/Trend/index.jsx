import React from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";

import { icons } from "../../../constants";

const Trend = ({ position, category, title, nbTweets }) => {
  return (
    <Box mb="1rem">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex">
          <Typography fontSize="13px" color="grey.main" mr="0.2rem">
            {position}
          </Typography>
          <Typography fontSize="13px" color="grey.main">
            ·
          </Typography>
          {category?.includes("Trending") ? (
            <Typography fontSize="13px" color="grey.main" m="0 0.2rem">
              {category}
            </Typography>
          ) : (
            <>
              <Typography fontSize="13px" color="grey.main" m="0 0.2rem">
                {category}
              </Typography>
              <Typography fontSize="13px" color="grey.main">
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
