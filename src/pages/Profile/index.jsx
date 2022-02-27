import React from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Profile = () => {
  // Utilisation du hook useContext pour récupérer le contexte Auth
  const { username } = useParams();
  const auth = React.useContext(AuthContext);

  if (auth.userData?.[0]?.username !== username) {
    console.log("Autre utilisateur");
  }

  return <div>Profil de {username}</div>;
};

export default Profile;
