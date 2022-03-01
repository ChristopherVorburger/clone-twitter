import React from "react";
import { Link, useParams } from "react-router-dom";

import { Box, Button, IconButton, Typography } from "@mui/material";

import Header from "../../components/Header";
import LeftNavbar from "../../components/LeftNavbar";
import News from "../../components/News";
import BottomNavigation from "../../components/BottomNavigation";

import { AuthContext } from "../../context/authContext";

//Import des icones
import { icons } from "../../constants";

//Import des images
import { images } from "../../constants";

import useStyles from "./styles";

const Profile = () => {
  const classes = useStyles();
  // Utilisation du hook useContext pour récupérer le contexte Auth
  const { username } = useParams();
  const auth = React.useContext(AuthContext);

  // Test si c'est la page de l'utilisateur connecté ou pas
  if (auth.userData?.[0]?.username !== username) {
    console.log("Autre utilisateur");
  }

  return (
    <>
      <Box
        className={classes.profile__container}
        display="flex"
        justifyContent="center"
      >
        <LeftNavbar />
        <Box
          display="flex"
          flexDirection="column"
          borderLeft="1px solid #eff3f4"
          borderRight="1px solid #eff3f4"
        >
          {/* TODO: Rendre dynamique le subtitle */}
          <Header iconsLeft={icons.ArrowBackIcon} subtitle={"10 tweets"} />
          <Box maxWidth="590px" maxHeight="200px">
            <img
              className={classes.profile__cover}
              src={images.w11}
              alt=""
              width="100%"
              height="100%"
            />
          </Box>
          <Box mb="1rem" p="12px 1rem 0 1rem">
            <Box display="flex" justifyContent="space-between">
              <Box>Image profil</Box>
              <Box>
                <Button variant="outlined" className={classes.profile__button}>
                  <Typography color="black.main" fontWeight="mainBold">
                    Edit profile
                  </Typography>
                </Button>
              </Box>
            </Box>
            <Box m="4px 0 12px 0">
              <Typography
                fontSize="fontSize.large"
                lineHeight="24px"
                fontWeight="mainBold"
              >
                {auth?.userData?.[0]?.name}
              </Typography>
              <Typography fontSize="fontSize.main" color="grey.main">
                {`@${auth?.userData?.[0]?.username}`}
              </Typography>
            </Box>
            <Box mb="12px">
              <Box>
                <Typography fontSize="fontSize.main">Description</Typography>
              </Box>
              <Box>
                <Typography fontSize="fontSize.small" color="primary.main">
                  Translate bio
                </Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              fontSize="fontSize.main"
              color="grey.main"
              mb="12px"
            >
              <Box display="flex" alignItems="center" mr="12px">
                <Typography fontSize="fontSize.large" mr="4px">
                  <icons.FmdGoodOutlinedIcon />
                </Typography>
                <Typography>Caravane</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography fontSize="fontSize.large" mr="4px">
                  <icons.DateRangeOutlinedIcon />
                </Typography>
                <Typography>Joined February 2022</Typography>
              </Box>
            </Box>
            <Box display="flex" fontSize="fontSize.main">
              <Box mr="20px">
                <Link
                  to="/following"
                  textDecoration="none"
                  className={classes.profile__link}
                >
                  <Box display="flex" color="black.main">
                    <Typography fontWeight="mainBold" mr="4px">
                      1
                    </Typography>
                    <Typography>Following</Typography>
                  </Box>
                </Link>
              </Box>
              <Box>
                <Link to="/followers" className={classes.profile__link}>
                  <Box display="flex" color="black.main">
                    <Typography fontWeight="mainBold" mr="4px">
                      1
                    </Typography>
                    <Typography>Followers</Typography>
                  </Box>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
        <News />
      </Box>
      <BottomNavigation />
    </>
  );
};

export default Profile;
