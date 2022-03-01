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

    // Récupération du tableau de following de l'utilisateur connecté
    const following = auth?.userData?.[0]?.following;

    // Récupération du tableau de follower de l'utilisateur ciblé
    const follower = user.follower;

    // Référence à l'id de l'utilisateur connecté à mettre à jour
    const currentUserRef = doc(db, "users", auth?.authUser?.uid);

    // Référence à l'id de l'utilisateur ciblé à mettre à jour
    const followedUserRef = doc(db, "users", user.id);

    // Sécurité pour ne pas se suivre soi-même
    if (auth?.authUser?.uid === user.id) {
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

    // Si l'utilisateur connecté n'a pas de following, on crée un tableau avec son
    // premier following
    if (!following) {
      updateDoc(currentUserRef, {
        following: [user.id],
      })
        .then(() => {
          console.log("ajout d'un premier following");
          // Si l'utilisateur ajouté n'a pas de follower, on crée un tableau avec son
          // premier follower
          if (!follower) {
            updateDoc(followedUserRef, {
              follower: [auth?.authUser?.uid],
            })
              .then(() => {
                console.log("ajout d'un premier follower");
              })
              .catch((err) => {
                console.log(err.massage);
              });
            // Sinon, mise à jour du tableau follower de l'utilisateur ajouté
          } else {
            updateDoc(followedUserRef, {
              follower: [...user?.follower, auth?.authUser?.uid],
            })
              .then(() => {
                console.log("ajout d'un follower");
              })
              .catch((err) => {
                console.log(err.massage);
              });
          }
        })
        .catch((err) => {
          console.log(err.massage);
        });
      // Sinon, mise à jour du tableau following
    } else {
      updateDoc(currentUserRef, {
        following: [...auth?.userData?.[0]?.following, user.id],
      })
        .then(() => {
          console.log("ajout d'un following");
          // Si l'utilisateur ajouté n'a pas de follower, on crée un tableau avec son
          // premier follower
          if (!follower) {
            updateDoc(followedUserRef, {
              follower: [auth?.authUser?.uid],
            })
              .then(() => {
                console.log("ajout d'un premier follower");
              })
              .catch((err) => {
                console.log(err.massage);
              });
            // Sinon, mise à jour du tableau follower de l'utilisateur ajouté
          } else {
            updateDoc(followedUserRef, {
              follower: [...user?.follower, auth?.authUser?.uid],
            })
              .then(() => {
                console.log("ajout d'un follower");
              })
              .catch((err) => {
                console.log(err.massage);
              });
          }
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
            <img src={user?.image} alt={user?.name} width="40px" />
          </Box>
          <Box>
            <Box>
              <Typography fontSize="font.main" fontWeight="mainBold">
                {user?.name}
              </Typography>
            </Box>
            <Box>
              <Typography fontSize="font.main" color="grey.main">
                {`@${user?.username}`}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box>
            <Button
              variant="contained"
              sx={{
                fontSize: "font.small",
                fontWeight: "mainBold",
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
        <Typography fontSize="font.main" color="grey.main">
          {user?.comment}
        </Typography>
      </Box>
    </Box>
  );
};

export default WhoToFollow;
