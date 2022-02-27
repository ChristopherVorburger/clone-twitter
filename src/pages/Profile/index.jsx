import React from "react";
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";

import Header from "../../components/Header";
import LeftNavbar from "../../components/LeftNavbar";
import News from "../../components/News";
import BottomNavigation from "../../components/BottomNavigation";

import { AuthContext } from "../../context/authContext";

const Profile = () => {
  // Utilisation du hook useContext pour récupérer le contexte Auth
  const { username } = useParams();
  const auth = React.useContext(AuthContext);

  // Test si c'est la page de l'utilisateur connecté ou pas
  if (auth.userData?.[0]?.username !== username) {
    console.log("Autre utilisateur");
  }

  console.log(auth?.userData?.[0]?.name);

  return (
    <>
      <Box display="flex" justifyContent="center">
        <LeftNavbar />
        <Box
          display="flex"
          flexDirection="column"
          borderLeft="1px solid #eff3f4"
          borderRight="1px solid #eff3f4"
        >
          <Header />
        </Box>
        <News />
      </Box>
      <BottomNavigation />
      <div>Profil de {username}</div>
    </>
  );
};

export default Profile;
