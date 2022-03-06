import React from "react";

import { Box } from "@mui/material";

import LeftNavbar from "../LeftNavbar";

import useStyles from "./styles";

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="center">
      <Box className={classes.leftNavbar} position="fixed" ml="-950px">
        <LeftNavbar />
      </Box>
      <Box className={classes.content} ml="250px">
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
