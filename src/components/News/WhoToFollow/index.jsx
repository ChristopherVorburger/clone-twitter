import React from "react";
import { Link } from "react-router-dom";

// MUI
import { Box, Button, Typography } from "@mui/material";

// import des fonctions firebase
import { database } from "../../../firebase-config";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";

// Import du context Auth
import { useAuth } from "../../../context/authContext";
import { useGlobal } from "../../../context/globalContext";

// Images & styles
import { images } from "../../../constants";
import useStyles from "./styles";

const WhoToFollow = ({ user }) => {
  const [textButton, setTextButton] = React.useState("Following");

  const classes = useStyles();

  // Context hooks
  const { authUser, userData } = useAuth();
  const { dispatchSnackbar } = useGlobal();

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
      dispatchSnackbar({
        type: "OPEN_ERROR_SNACKBAR",
        payload: { message: "You can't follow yourself" },
      });
      return;
    }

    // Sécurité pour ne pas suivre deux fois la même personne
    if (userData?.[0]?.following?.includes(user?.id)) {
      dispatchSnackbar({
        type: "OPEN_ERROR_SNACKBAR",
        payload: { message: "You'r already following this account" },
      });
      return;
    }

    // Si l'utilisateur connecté n'a pas de following, on crée un tableau avec son
    // premier following
    if (!following) {
      updateDoc(currentUserRef, {
        following: [user?.id],
      })
        .then(() => {
          // Si l'utilisateur ajouté n'a pas de followers, on crée un tableau avec son
          // premier follower
          if (!followers) {
            updateDoc(followedUserRef, {
              followers: [authUser?.uid],
            })
              .then(() => {
                dispatchSnackbar({
                  type: "OPEN_INFO_SNACKBAR",
                  payload: { message: `You'r now following ${user?.name}` },
                });
              })
              .catch((err) => {
                dispatchSnackbar({
                  type: "OPEN_ERROR_SNACKBAR",
                  payload: {
                    message: `An error occurred while adding ${user?.name} account :  ${err.message}`,
                  },
                });
              });
            // Sinon, mise à jour du tableau followers de l'utilisateur ajouté
          } else {
            updateDoc(followedUserRef, {
              followers: [...user?.followers, authUser?.uid],
            })
              .then(() => {
                dispatchSnackbar({
                  type: "OPEN_INFO_SNACKBAR",
                  payload: { message: `You'r now following ${user?.name}` },
                });
              })
              .catch((err) => {
                dispatchSnackbar({
                  type: "OPEN_ERROR_SNACKBAR",
                  payload: {
                    message: `An error occurred while adding ${user?.name} account :  ${err.message}`,
                  },
                });
              });
          }
        })
        .catch((err) => {
          dispatchSnackbar({
            type: "OPEN_ERROR_SNACKBAR",
            payload: {
              message: `An error occurred while adding ${user?.name} account :  ${err.message}`,
            },
          });
        });
      // Sinon, mise à jour du tableau following
    } else {
      updateDoc(currentUserRef, {
        following: [...userData?.[0]?.following, user?.id],
      })
        .then(() => {
          // Si l'utilisateur ajouté n'a pas de followers, on crée un tableau avec son
          // premier follower
          if (!followers) {
            updateDoc(followedUserRef, {
              followers: [authUser?.uid],
            })
              .then(() => {
                dispatchSnackbar({
                  type: "OPEN_INFO_SNACKBAR",
                  payload: { message: `You'r now following ${user?.name}` },
                });
              })
              .catch((err) => {
                dispatchSnackbar({
                  type: "OPEN_ERROR_SNACKBAR",
                  payload: {
                    message: `An error occurred while adding ${user?.name} account :  ${err.message}`,
                  },
                });
              });
            // Sinon, mise à jour du tableau followers de l'utilisateur ajouté
          } else {
            updateDoc(followedUserRef, {
              followers: [...user?.followers, authUser?.uid],
            })
              .then(() => {
                dispatchSnackbar({
                  type: "OPEN_INFO_SNACKBAR",
                  payload: { message: `You'r now following ${user?.name}` },
                });
              })
              .catch((err) => {
                dispatchSnackbar({
                  type: "OPEN_ERROR_SNACKBAR",
                  payload: {
                    message: `An error occurred while adding ${user?.name} account :  ${err.message}`,
                  },
                });
              });
          }
        })
        .catch((err) => {
          dispatchSnackbar({
            type: "OPEN_ERROR_SNACKBAR",
            payload: {
              message: `An error occurred while adding ${user?.name} account :  ${err.message}`,
            },
          });
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
        // Suppression du follower dans les datas de l'utilisateur supprimé
        updateDoc(followedUserRef, {
          followers: arrayRemove(authUser?.uid),
        })
          .then(() => {
            dispatchSnackbar({
              type: "OPEN_INFO_SNACKBAR",
              payload: {
                message: `${user?.name} was deleted from your following`,
              },
            });
          })
          .catch((err) => {
            dispatchSnackbar({
              type: "OPEN_ERROR_SNACKBAR",
              payload: {
                message: `An error occurred while deleting ${user?.name} account :  ${err.message}`,
              },
            });
          });
      })
      .catch((err) => {
        dispatchSnackbar({
          type: "OPEN_ERROR_SNACKBAR",
          payload: {
            message: `An error occurred while deleting ${user?.name} account :  ${err.message}`,
          },
        });
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
