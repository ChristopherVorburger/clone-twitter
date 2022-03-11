import React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

const NoContent = ({ title, subtitle }) => {
  return (
    <Box m="2rem auto" p="0 2rem" maxWidth="400px">
      <Box>
        <Typography fontSize="32px" fontWeight="titleBold">
          {title}
        </Typography>
      </Box>
      <Box>
        <Typography fontSize="font.main" color="grey.main">
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default NoContent;
