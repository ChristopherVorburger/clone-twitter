import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { icons } from "../../constants";
import Header from "../Header";

const InexistingAccount = () => {
  return (
    <Box>
      <Header iconsLeft={icons.ArrowBackIcon} title="Profile" />
      <Box maxWidth="400px" m="2rem auto" p="40px 20px">
        <Typography fontSize="2rem" fontWeight="mainBold">
          This account doesn’t exist
        </Typography>
        <Typography fontSize="font.main" color="grey.main">
          Try searching for another.
        </Typography>
      </Box>
    </Box>
  );
};

export default InexistingAccount;
