import React from "react";

// Import composants MUI
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

// Import composants React
import ClassicButton from "../buttons/ClassicButton";

const NoFollowing = () => {
  return (
    <Box maxWidth="400px" margin="auto">
      <Box m="2rem auto" p="0 2rem">
        <Box mb="0.5rem">
          <Typography fontSize="2rem" fontWeight="titleBold">
            You aren’t following anyone yet
          </Typography>
        </Box>
        <Box color="grey.main" mb="28px">
          <Typography fontSize="font.main">
            When you do, they’ll be listed here and you’ll see their Tweets in
            your timeline.
          </Typography>
        </Box>
        <Box>
          {/* TODO: câbler la route vers les suggestions */}
          <ClassicButton text="Find people to follow" path="/home" />
        </Box>
      </Box>
    </Box>
  );
};

export default NoFollowing;
