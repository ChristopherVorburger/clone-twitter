import React from "react";

// Import composants MUI
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const NoFollowers = () => {
  return (
    <Box maxWidth="400px" margin="auto">
      <Box m="2rem auto" p="0 2rem">
        <Box mb="0.5rem">
          <Typography fontSize="2rem" fontWeight="titleBold">
            You don’t have any followers yet
          </Typography>
        </Box>
        <Box color="grey.main" mb="28px">
          <Typography fontSize="font.main">
            When someone follows you, you’ll see them here.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default NoFollowers;
