import React from "react";
import { Box, Button, Typography } from "@mui/material";

// import des fonctions firebase
import { database } from "../../../firebase-config";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";

// Import du context Auth
import { AuthContext } from "../../../context/authContext";

import useStyles from "./styles";

const WhoToFollow = ({ user }) => {
  const classes = useStyles();
  const [textButton, setTextButton] = React.useState("Following");

  // Utilisation du hook useContext pour récupérer le contexte Auth
  const auth = React.useContext(AuthContext);

  // Récupération du tableau de following de l'utilisateur connecté
  const following = auth?.userData?.[0]?.following;

  // Récupération du tableau de follower de l'utilisateur ciblé
  const followers = user?.followers;

  // Référence à l'id de l'utilisateur connecté à mettre à jour
  const currentUserRef = doc(database, "users", auth?.authUser?.uid);

  // Référence à l'id de l'utilisateur ciblé à mettre à jour
  const followedUserRef = doc(database, "users", user?.id);

  // fonction pour ajouter un following
  const followUser = (e) => {
    e.preventDefault();

    // Sécurité pour ne pas se suivre soi-même
    if (auth?.authUser?.uid === user?.id) {
      console.log(
        "Oui, il faut s'aimer soi-même mais de là à se suivre soit même il y a des limites"
      );
      return;
    }

    // Sécurité pour ne pas suivre deux fois la même personne
    if (auth?.userData?.[0]?.following?.includes(user?.id)) {
      console.log("Vous suivez déjà cette personne !");
      return;
    }

    // Si l'utilisateur connecté n'a pas de following, on crée un tableau avec son
    // premier following
    if (!following) {
      updateDoc(currentUserRef, {
        following: [user?.id],
      })
        .then(() => {
          console.log("ajout d'un premier following");
          // Si l'utilisateur ajouté n'a pas de follower, on crée un tableau avec son
          // premier follower
          if (!followers) {
            updateDoc(followedUserRef, {
              followers: [auth?.authUser?.uid],
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
              followers: [...user?.followers, auth?.authUser?.uid],
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
        following: [...auth?.userData?.[0]?.following, user?.id],
      })
        .then(() => {
          console.log("ajout d'un following");
          // Si l'utilisateur ajouté n'a pas de follower, on crée un tableau avec son
          // premier follower
          if (!followers) {
            updateDoc(followedUserRef, {
              followers: [auth?.authUser?.uid],
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
              followers: [...user?.followers, auth?.authUser?.uid],
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

  // Fonction pour unfollow
  const unfollowUser = () => {
    // Suppression du following dans les datas de l'utilisateur connecté
    updateDoc(currentUserRef, {
      following: arrayRemove(user?.id),
    });
    // Suppression du follower dans les datas de l'utilisateur supprimé
    updateDoc(followedUserRef, {
      follower: arrayRemove(auth?.authUser?.uid),
    });
  };

  return (
    <Box className={classes.container} p="1rem">
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" justifyContent="space-between">
          <Box mr="1rem">
            <img
              className={classes.avatar}
              src={user?.profile_image_url}
              alt={user?.name}
              width="40px"
            />
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
          <Box
            onMouseEnter={() => setTextButton("Unfollow")}
            onMouseLeave={() => setTextButton("Following")}
          >
            {auth?.userData?.[0]?.following?.includes(user?.id) ? (
              <Button
                className={classes.button}
                variant="outlined"
                disableElevation
                sx={{
                  color: "black.main",
                  fontSize: "font.small",
                  fontWeight: "mainBold",
                  backgroundColor: "white.main",
                  borderColor: "grey.button",
                  borderRadius: "50px",
                  textTransform: "none",
                  minWidth: "6rem",
                }}
                onClick={unfollowUser}
              >
                {textButton}
              </Button>
            ) : (
              <Button
                className={classes.button_black}
                variant="contained"
                sx={{
                  fontSize: "font.small",
                  fontWeight: "mainBold",
                  backgroundColor: "black.main",
                  borderRadius: "50px",
                }}
                onClick={followUser}
              >
                Follow
              </Button>
            )}
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
