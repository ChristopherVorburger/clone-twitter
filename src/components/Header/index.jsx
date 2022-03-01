import React from "react";
import { useLocation } from "react-router-dom";

import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import ProfileButton from "../buttons/ProfileButton";

import useStyles from "./styles";

const Header = ({ iconsLeft, iconsRight, subtitle }) => {
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
          {/* TODO: Optimiser cet affichage dynamique */}
          <>
            {pathname === "Home" ? (
              <Box className={classes.header__button_profile}>
                <ProfileButton />
              </Box>
            ) : null}
          </>
          <Box>
            <IconButton
              sx={{
                padding: "1rem",
                color: "black.main",
              }}
              aria-label="menu"
            >
              {iconsLeft?.type?.render()}
            </IconButton>
          </Box>
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography fontSize="font.large" fontWeight="mainBold">
                {pathname}
              </Typography>
              <Typography fontSize="font.main">{subtitle}</Typography>
            </Box>
            <Box>
              <IconButton
                sx={{
                  color: "black.main",
                  transform: "rotate(180deg)",
                }}
                aria-label="menu"
              >
                {iconsRight?.type?.render()}
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
