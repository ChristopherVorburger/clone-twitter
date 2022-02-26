import React from "react";
import { Box, Button, Typography } from "@mui/material";

// import des fonctions firebase
import { db } from "../../../firebase-config";
import { doc, updateDoc } from "firebase/firestore";

// Import du context Auth
import { AuthContext } from "../../../context/authContext";

import useStyles from "./styles";

const WhoToFollow = ({ user }) => {
  const classes = useStyles();

  // Utilisation du hook useContext pour récupérer le contexte Auth
  const auth = React.useContext(AuthContext);

  // fonction pour ajouter un following
  const updateUserFollowing = (e) => {
    e.preventDefault();

    // Récupération du tableau de following
    const following = auth?.userData?.[0]?.following;
    console.log("following", following);

    // Référence au user (id) à mettre à jour
    const docRef = doc(db, "users", auth?.authUser?.uid);

    // Sécurité pour ne pas se suivre soi-même
    if (auth?.authUser.uid === user.id) {
      console.log(
        "Oui, il faut s'aimer soi-même mais de là à se suivre soit même il y a des limites"
      );
      return;
    }

    // Sécurité pour ne pas suivre deux fois la même personne
    if (auth?.userData?.[0]?.following?.includes(user.id)) {
      console.log("Vous suivez déjà cette personne !");
      return;
    }

    // Si l'utilisateur n'a pas de following, on crée un tableau avec son
    // premier following
    if (!following) {
      updateDoc(docRef, {
        following: [user.id],
      })
        .then(() => {
          console.log("ajout d'un premier following");
        })
        .catch((err) => {
          console.log(err.massage);
        });
      // Sinon, mise à jour du tableau following
    } else {
      updateDoc(docRef, {
        following: [...auth?.userData?.[0]?.following, user.id],
      })
        .then(() => {
          console.log("ajout d'un following");
        })
        .catch((err) => {
          console.log(err.massage);
        });
    }
  };

  return (
    <Box className={classes.container} p="1rem">
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" justifyContent="space-between">
          <Box mr="1rem">
            <img src={user.image} alt={user.name} width="40px" />
          </Box>
          <Box>
            <Box>
              <Typography fontSize="15px" fontWeight="bold">
                {user.name}
              </Typography>
            </Box>
            <Box>
              <Typography fontSize="15px" color="grey.main">
                {`@${user.username}`}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box>
            <Button
              variant="contained"
              sx={{
                fontSize: "13px",
                fontWeight: "bold",
                backgroundColor: "black.main",
                borderRadius: "50px",
              }}
              onClick={updateUserFollowing}
            >
              Follow
            </Button>
          </Box>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Typography fontSize="15px" color="grey.main">
          {user.comment}
        </Typography>
      </Box>
    </Box>
  );
};

export default WhoToFollow;
