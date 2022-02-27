import React from "react";
import { useLocation } from "react-router-dom";

import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import useStyles from "./styles";

import { icons } from "../../constants";

import ProfileButton from "../buttons/ProfileButton";

const Header = () => {
  const classes = useStyles();

  // Fonction pour convertir la première lettre d'une string en lettre capitale
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  // Utilisation du hook useLocation pour récupérer le chemin de l'url
  const location = useLocation();

  // Conversion du pathname pour en faire le titre du header
  const pathname = capitalize(location.pathname.slice(1));

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
            {pathname}
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
