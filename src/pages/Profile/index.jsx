import React from "react";
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";

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
          <Box sx={{}} className={classes.profile__cover} maxWidth="590px">
            <img
              className={classes.profile__cover}
              src={images.w11}
              alt=""
              width="100%"
              height="38%"
            />
          </Box>
        </Box>
        <News />
      </Box>
      <BottomNavigation />
    </>
  );
};

export default Profile;
