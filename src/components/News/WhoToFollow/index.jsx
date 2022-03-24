import React from "react";
import { Link } from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";

import { images } from "../../../constants";

// import des fonctions firebase
import { database } from "../../../firebase-config";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";

// Import du context Auth
import { useAuth } from "../../../context/authContext";

import useStyles from "./styles";

const WhoToFollow = ({ user }) => {
  const classes = useStyles();
  const [textButton, setTextButton] = React.useState("Following");

  // Utilisation du hook useContext pour récupérer le contexte Auth
  const { authUser, userData } = useAuth();

  // Récupération du tableau de following de l'utilisateur connecté
  const following = userData?.[0]?.following;

  // Récupération du tableau de followers de l'utilisateur ciblé
  const followers = user?.followers;

  // Référence à l'id de l'utilisateur connecté à mettre à jour
  const currentUserRef = doc(database, "users", authUser?.uid);

  // Référence à l'id de l'utilisateur ciblé à mettre à jour
  const followedUserRef = doc(database, "users", user?.id);

  // fonction pour ajouter un following
  const followUser = (e) => {
    e.preventDefault();

    // Sécurité pour ne pas se suivre soi-même
    if (authUser?.uid === user?.id) {
      console.log(
        "Oui, il faut s'aimer soi-même mais de là à se suivre soit même il y a des limites"
      );
      return;
    }

    // Sécurité pour ne pas suivre deux fois la même personne
    if (userData?.[0]?.following?.includes(user?.id)) {
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
          // Si l'utilisateur ajouté n'a pas de followers, on crée un tableau avec son
          // premier follower
          if (!followers) {
            updateDoc(followedUserRef, {
              followers: [authUser?.uid],
            })
              .then(() => {
                console.log("ajout d'un premier follower");
              })
              .catch((err) => {
                console.log(err.message);
              });
            // Sinon, mise à jour du tableau followers de l'utilisateur ajouté
          } else {
            updateDoc(followedUserRef, {
              followers: [...user?.followers, authUser?.uid],
            })
              .then(() => {
                console.log("ajout d'un follower");
              })
              .catch((err) => {
                console.log(err.message);
              });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
      // Sinon, mise à jour du tableau following
    } else {
      updateDoc(currentUserRef, {
        following: [...userData?.[0]?.following, user?.id],
      })
        .then(() => {
          console.log("ajout d'un following");
          // Si l'utilisateur ajouté n'a pas de followers, on crée un tableau avec son
          // premier follower
          if (!followers) {
            updateDoc(followedUserRef, {
              followers: [authUser?.uid],
            })
              .then(() => {
                console.log("ajout d'un premier follower");
              })
              .catch((err) => {
                console.log(err.message);
              });
            // Sinon, mise à jour du tableau followers de l'utilisateur ajouté
          } else {
            updateDoc(followedUserRef, {
              followers: [...user?.followers, authUser?.uid],
            })
              .then(() => {
                console.log("ajout d'un follower");
              })
              .catch((err) => {
                console.log(err.message);
              });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  // Fonction pour unfollow
  const unfollowUser = () => {
    // Suppression du following dans les datas de l'utilisateur connecté
    updateDoc(currentUserRef, {
      following: arrayRemove(user?.id),
    })
      .then(() => {
        console.log("Suppression du following");
        // Suppression du follower dans les datas de l'utilisateur supprimé
        updateDoc(followedUserRef, {
          followers: arrayRemove(authUser?.uid),
        })
          .then(() => {
            console.log("Suppression du follower");
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Box className={classes.container} p="1rem">
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" justifyContent="space-between">
          <Box mr="1rem">
            {user?.profile_image_url ? (
              <Link to={`/${user?.username}`}>
                <img
                  className={classes.avatar}
                  src={user?.profile_image_url}
                  alt={user?.name}
                  width="40px"
                />
              </Link>
            ) : (
              <Link to={`/${user?.username}`}>
                <img
                  className={classes.avatar}
                  style={{ border: "1px solid lightgrey" }}
                  src={images.user}
                  alt={user?.name}
                  width="40px"
                />
              </Link>
            )}
          </Box>
          <Box>
            <Box>
              <Link to={`/${user?.username}`} className={classes.link}>
                <Typography
                  fontSize="font.main"
                  fontWeight="mainBold"
                  sx={{ textDecoration: "none", color: "black.main" }}
                >
                  {user?.name}
                </Typography>
              </Link>
            </Box>
            <Box>
              <Link to={`/${user?.username}`} className={classes.link}>
                <Typography
                  fontSize="font.main"
                  color="grey.main"
                  sx={{ textDecoration: "none", color: "black.main" }}
                >
                  {`@${user?.username}`}
                </Typography>
              </Link>
            </Box>
          </Box>
        </Box>
        <Box>
          <Box
            onMouseEnter={() => setTextButton("Unfollow")}
            onMouseLeave={() => setTextButton("Following")}
          >
            {userData?.[0]?.following?.includes(user?.id) ? (
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
