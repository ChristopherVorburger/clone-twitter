import React from "react";

import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import AutoAwesomeSharpIcon from "@mui/icons-material/AutoAwesomeSharp";

import useStyles from "./styles";
import ProfileButton from "../buttons/ProfileButton";

const Header = ({ drawerWidth }) => {
  const classes = useStyles();

  return (
    <Box
      sx={{
        flexGrow: 1,
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
      }}
    >
      <AppBar color="inherit" position="static" elevation={0}>
        <Toolbar>
          <ProfileButton />
          <Typography
            fontSize="1rem"
            fontWeight="bold"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Home
          </Typography>

          <IconButton sx={{ padding: "0" }} aria-label="menu">
            <AutoAwesomeSharpIcon
              sx={{
                color: "black.main",
                transform: "rotate(180deg)",
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
