import React from "react";

import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import useStyles from "./styles";

import { icons } from "../../constants";

import ProfileButton from "../buttons/ProfileButton";

const Header = () => {
  const classes = useStyles();

  return (
    <Box className={classes.header__container}>
      <AppBar color="inherit" position="static" elevation={0}>
        <Toolbar>
          <Box className={classes.header__button_profile}>
            <ProfileButton />
          </Box>
          <Typography
            fontSize="1rem"
            fontWeight="bold"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Home
          </Typography>

          <IconButton sx={{ padding: "1rem" }} aria-label="menu">
            <icons.AutoAwesomeSharpIcon
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
