import React from "react";

import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AutoAwesomeSharpIcon from "@mui/icons-material/AutoAwesomeSharp";

import useStyles from "./styles";

const Header = () => {
  const classes = useStyles();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="inherit" position="static" elevation={0}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <AccountCircleIcon
              sx={{ color: "grey.main", transform: "scale(1.5)" }}
            />
          </IconButton>
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
