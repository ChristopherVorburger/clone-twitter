import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import { AuthContext } from "../../context/authContext";

import { images } from "../../constants";

import useStyles from "./styles";

// Attention iconsRight est un tableau pour pouvoir faire des tableaux d'objet et ainsi ajouter les chemins d'url ou des fonctions à exécuter au clique
const Header = ({
  iconsLeft,
  iconsRight,
  subtitle,
  title,
  searchBar,
  navigatePath = -1,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const auth = React.useContext(AuthContext);

  const user = auth.userData?.[0];

  const pathname = window.location.pathname;

  return (
    <Box className={classes.header__container}>
      <AppBar color="inherit" position="static" elevation={0}>
        <Toolbar>
          {/* TODO: Optimiser cet affichage dynamique */}
          <>
            {title === "Home" ||
            pathname.includes("explore") ||
            title === "Messages" ||
            title === "Notifications" ? (
              <Box className={classes.header__button_profile}>
                {user?.profile_image_url ? (
                  <Link to={`/${user?.username}`}>
                    <Box mr="1rem">
                      <img
                        className={classes.avatar}
                        src={user?.profile_image_url}
                        alt={user?.name}
                      />
                    </Box>
                  </Link>
                ) : (
                  <Link to={`/${user?.username}`}>
                    <Box mr="1rem">
                      <img
                        className={classes.avatar}
                        style={{ border: "1px solid lightgrey" }}
                        src={images.user}
                        alt={user?.name}
                      />
                    </Box>
                  </Link>
                )}
              </Box>
            ) : null}
          </>
          {iconsLeft ? (
            <Box>
              <IconButton
                sx={{
                  color: "black.main",
                  marginRight: "1rem",
                }}
                aria-label="menu"
                onClick={() => {
                  navigate(navigatePath);
                }}
              >
                {iconsLeft?.type?.render()}
              </IconButton>
            </Box>
          ) : null}
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography fontSize="font.large" fontWeight="mainBold">
                {title}
              </Typography>
              <Box>{searchBar}</Box>
              <Typography fontSize="font.small" color="grey.main">
                {subtitle}
              </Typography>
            </Box>
            <Box>
              {iconsRight?.map((icon) => {
                // Si un lien est affilié on renvoi un composant Link
                return icon?.path ? (
                  <IconButton
                    key={icon?.name?.type?.render?.displayName}
                    sx={{
                      color: "black.main",
                    }}
                    aria-label="menu"
                    component={Link}
                    to={icon?.path}
                  >
                    {icon?.name?.type?.render()}
                  </IconButton>
                ) : (
                  <IconButton
                    key={icon?.name?.type?.render?.displayName}
                    sx={{
                      color: "black.main",
                    }}
                    aria-label="menu"
                  >
                    {icon?.name?.type?.render()}
                  </IconButton>
                );
              })}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
