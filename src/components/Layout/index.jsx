import React from "react";

import { Box, Drawer } from "@mui/material";

import LeftNavbar from "../LeftNavbar";

import { useAuth } from "../../context/authContext";

import useStyles from "./styles";

const Layout = ({ children }) => {
  const classes = useStyles();
  const { userData } = useAuth();

  console.log("window.location.pathname", window.location.pathname);
  return (
    <Box className={classes.container} display="flex" justifyContent="center">
      <Box>
        {window.location.pathname !==
          `/${userData?.[0]?.username}/lists/create` && (
          <Drawer
            variant="permanent"
            classes={{ root: classes.drawerRoot, paper: classes.drawerPaper }}
          >
            <LeftNavbar />
          </Drawer>
        )}
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default Layout;
