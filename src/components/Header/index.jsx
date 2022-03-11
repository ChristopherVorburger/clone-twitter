import React from "react";
import { useNavigate } from "react-router-dom";

import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import ProfileButton from "../buttons/ProfileButton";

import useStyles from "./styles";

// Attention iconsRight est un tableau
const Header = ({ iconsLeft, iconsRight, subtitle, title }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box className={classes.header__container}>
      <AppBar color="inherit" position="static" elevation={0}>
        <Toolbar>
          {/* TODO: Optimiser cet affichage dynamique */}
          <>
            {title === "Home" ? (
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
              onClick={() => navigate(-1)}
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
                {title}
              </Typography>
              <Typography fontSize="font.small" color="grey.main">
                {subtitle}
              </Typography>
            </Box>
            <Box>
              {iconsRight?.map((icon) => {
                return (
                  <IconButton
                    key={icon.type.render.displayName}
                    sx={{
                      color: "black.main",

                      transform: "rotate(180deg)",
                    }}
                    aria-label="menu"
                  >
                    {icon?.type?.render()}
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
