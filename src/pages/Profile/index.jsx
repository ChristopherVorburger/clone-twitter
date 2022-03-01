import React from "react";
import { useParams } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";

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
                <Button variant="outlined" className={classes.button}>
                  <Typography color="black.main" fontWeight="bold">
                    Edit profile
                  </Typography>
                </Button>
              </Box>
            </Box>
            <Box m="4px 0 12px 0">
              <Typography
                fontSize="fontSize.large"
                lineHeight="24px"
                fontWeight="bold"
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
                <Typography fontSize="fontSize.small">Translate bio</Typography>
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
