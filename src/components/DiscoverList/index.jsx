import React from "react";
import { Link } from "react-router-dom";

// MUI
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";

// Firebase
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { database } from "../../firebase-config";

// Contexts
import { useAuth } from "../../context/authContext";
import { useGlobal } from "../../context/globalContext";

// Constants & styles
import { images } from "../../constants";
import useStyles from "./styles";

// Composant pour afficher une list
const DiscoverList = ({ list, author }) => {
  const [textButton, setTextButton] = React.useState("Following");

  // Hooks
  const classes = useStyles();
  const { authUser, userData } = useAuth();
  const { dispatchSnackbar } = useGlobal();

  // Récupération du tableau de following de l'utilisateur connecté
  const listsCurrentUser = userData?.[0]?.lists;

  // Référence à l'id de l'utilisateur connecté à mettre à jour
  const currentUserRef = doc(database, "users", authUser?.uid);

  // Référence de la liste à mettre à jour
  const currentListRef = doc(database, "lists", list?.id);

  // Récupération du tableau de follwers de la liste
  const listsFollowers = list?.followers;

  const followList = (e) => {
    e.preventDefault();

    // Si l'utilisateur connecté n'a pas de liste,
    // on ajoute la première dans le tableau lists
    if (!listsCurrentUser) {
      updateDoc(currentUserRef, {
        ...userData?.[0],
        lists: [list?.id],
      })
        // Si la liste n'a pas de followers,
        // on ajoute le premier dans le tableau followers
        .then(() => {
          if (!listsFollowers) {
            updateDoc(currentListRef, {
              followers: [userData?.[0]?.id],
            })
              .then(() => {
                dispatchSnackbar({
                  type: "OPEN_INFO_SNACKBAR",
                  payload: {
                    message: `${list?.name} list followed`,
                  },
                });
              })
              .catch((err) => {
                dispatchSnackbar({
                  type: "OPEN_ERROR_SNACKBAR",
                  payload: {
                    message: `An error occurred while following ${list?.name} list : ${err.message}`,
                  },
                });
              });
          } else {
            updateDoc(currentListRef, {
              followers: [...listsFollowers, authUser?.uid],
            })
              .then(() => {
                dispatchSnackbar({
                  type: "OPEN_INFO_SNACKBAR",
                  payload: {
                    message: `${list?.name} list followed`,
                  },
                });
              })
              .catch((err) => {
                dispatchSnackbar({
                  type: "OPEN_ERROR_SNACKBAR",
                  payload: {
                    message: `An error occurred while following ${list?.name} list : ${err.message}`,
                  },
                });
              });
          }
        })
        .catch((err) => {
          dispatchSnackbar({
            type: "OPEN_ERROR_SNACKBAR",
            payload: {
              message: `An error occurred while following ${list?.name} list : ${err.message}`,
            },
          });
        });
    } else {
      updateDoc(currentUserRef, {
        ...userData?.[0],
        lists: [...userData?.[0]?.lists, list?.id],
      })
        .then(() => {
          if (!listsFollowers) {
            updateDoc(currentListRef, {
              followers: [userData?.[0]?.id],
            })
              .then(() => {
                dispatchSnackbar({
                  type: "OPEN_INFO_SNACKBAR",
                  payload: {
                    message: `${list?.name} list followed`,
                  },
                });
              })
              .catch((err) => {
                dispatchSnackbar({
                  type: "OPEN_ERROR_SNACKBAR",
                  payload: {
                    message: `An error occurred while following ${list?.name} list : ${err.message}`,
                  },
                });
              });
          } else {
            updateDoc(currentListRef, {
              followers: [...listsFollowers, authUser?.uid],
            })
              .then(() => {
                dispatchSnackbar({
                  type: "OPEN_INFO_SNACKBAR",
                  payload: {
                    message: `${list?.name} list followed`,
                  },
                });
              })
              .catch((err) => {
                dispatchSnackbar({
                  type: "OPEN_ERROR_SNACKBAR",
                  payload: {
                    message: `An error occurred while following ${list?.name} list : ${err.message}`,
                  },
                });
              });
          }
        })
        .catch((err) => {
          dispatchSnackbar({
            type: "OPEN_ERROR_SNACKBAR",
            payload: {
              message: `An error occurred while following ${list?.name} list : ${err.message}`,
            },
          });
        });
    }
  };

  // Fonction pour unfollow
  const unfollowList = () => {
    // Suppression du following dans les datas de l'utilisateur connecté
    updateDoc(currentUserRef, {
      lists: arrayRemove(list?.id),
    })
      .then(() => {
        updateDoc(currentListRef, {
          followers: arrayRemove(userData?.[0]?.id),
        })
          .then(() => {
            dispatchSnackbar({
              type: "OPEN_INFO_SNACKBAR",
              payload: {
                message: `${list?.name} list unfollowed`,
              },
            });
          })
          .catch((err) => {
            dispatchSnackbar({
              type: "OPEN_ERROR_SNACKBAR",
              payload: {
                message: `An error occurred while unfollowing ${list?.name} list : ${err.message}`,
              },
            });
          });
        })
        .catch((err) => {
        dispatchSnackbar({
          type: "OPEN_ERROR_SNACKBAR",
          payload: {
            message: `An error occurred while unfollowing ${list?.name} list : ${err.message}`,
          },
        });
      });
  };

  return (
    <Link className={classes.user_list__link} to={`/lists/${list?.id}`}>
      <Box className={classes.container} p="12px 1rem">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex">
            <Box pr="1rem">
              <img
                src={list?.cover_url}
                alt=""
                className={classes.list__avatar}
              />
            </Box>
            <Box>
              <Typography fontSize="font.main" color="black.main">
                {list?.name}
              </Typography>
              <Box display="flex">
                {author?.[0]?.profile_image_url ? (
                  <Box mr="4px">
                    <img
                      src={author?.[0]?.profile_image_url}
                      alt=""
                      className={classes.list__avatar_user}
                    />
                  </Box>
                ) : (
                  <Box mr="4px">
                    <img
                      src={images.user}
                      alt=""
                      className={classes.list__avatar_user}
                    />
                  </Box>
                )}
                <Typography mr="4px" fontSize="font.small" color="black.main">
                  {author?.[0]?.name}
                </Typography>
                <Typography
                  mr="4px"
                  fontSize="font.small"
                  color="grey.main"
                >{`@${author?.[0]?.username}`}</Typography>
              </Box>
            </Box>
          </Box>
          <Box>
            <Box
              onMouseEnter={() => setTextButton("Unfollow")}
              onMouseLeave={() => setTextButton("Following")}
            >
              {userData?.[0]?.lists?.includes(list?.id) ? (
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
                  onClick={unfollowList}
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
                  onClick={followList}
                >
                  Follow
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default DiscoverList;
