import React from "react";

import { Box, Drawer } from "@mui/material";

import LeftNavbar from "../LeftNavbar";

import useStyles from "./styles";

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <Box className={classes.container} display="flex" justifyContent="center">
      <Box>
        <Drawer
          variant="permanent"
          classes={{ root: classes.drawerRoot, paper: classes.drawerPaper }}
        >
          <LeftNavbar />
        </Drawer>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default Layout;
