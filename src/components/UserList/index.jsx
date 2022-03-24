import React from "react";
import { Link } from "react-router-dom";

import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";

import { icons, images } from "../../constants";

import { arrayRemove, doc, updateDoc } from "firebase/firestore";

import { database } from "../../firebase-config";

import { useAuth } from "../../context/authContext";

import useStyles from "./styles";

// Composant pour afficher une list
const UserList = ({ list, author }) => {
  const classes = useStyles();

  // Utilisation du hook useContext pour récupérer le contexte Auth
  const { authUser, userData } = useAuth();

  // Récupération du tableau de liste de l'utilisateur connecté
  const listsCurrentUser = userData?.[0]?.pinned_lists;

  // Référence à l'id de l'utilisateur connecté à mettre à jour
  const currentUserRef = doc(database, "users", authUser?.uid);

  // Fonction pour pin une list
  const pinList = (e) => {
    e.preventDefault();

    // Si l'utilisateur connecté n'a pas de pin,
    // on ajoute le premier dans le tableau pinned_lists
    if (!listsCurrentUser) {
      updateDoc(currentUserRef, {
        ...userData?.[0],
        pinned_lists: [list?.id],
      })
        .then(() => {
          console.log("First pin created");
        })
        .catch((err) => {
          console.log(err.message);
        });
      // Sinon on ajoute le pin dans le tableau existant
    } else {
      updateDoc(currentUserRef, {
        ...userData?.[0],
        pinned_lists: [...userData?.[0]?.pinned_lists, list?.id],
      })
        .then(() => {
          console.log("Pin created");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  // Fonction pour unPin une liste
  const unPinList = (e) => {
    e.preventDefault();
    // Suppression du pin dans les datas de l'utilisateur connecté
    updateDoc(currentUserRef, {
      pinned_lists: arrayRemove(list?.id),
    });
  };

  return (
    <Link className={classes.user_list__link} to={`/lists/${list?.id}`}>
      <Box className={classes.container} p="12px 1rem">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex">
            <Box pr="1rem">
              {list?.cover_url ? (
                <img
                  className={classes.avatar}
                  src={list?.cover_url}
                  alt=""
                  width="50px"
                  height="50px"
                />
              ) : (
                <img src={images.user} alt="" width={"50px"} />
              )}
            </Box>
            <Box>
              <Typography fontSize="font.main" color="black.main">
                {list?.name}
              </Typography>
              <Box display="flex">
                {author?.[0]?.profile_image_url ? (
                  <Box mr="4px">
                    <img
                      className={classes.user_list__avatar_user}
                      src={author?.[0]?.profile_image_url}
                      alt=""
                    />
                  </Box>
                ) : (
                  <Box mr="4px">
                    <img
                      className={classes.user_list__avatar_user}
                      src={images.user}
                      alt=""
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
            <Box>
              {userData?.[0]?.pinned_lists?.includes(list?.id) ? (
                <Button
                  className={classes.button}
                  variant="outlined"
                  sx={{
                    borderColor: "transparent",
                    borderRadius: "100px",
                  }}
                  onClick={unPinList}
                >
                  {icons.PushPinIcon.type.render()}
                </Button>
              ) : (
                <Button
                  className={classes.button}
                  variant="outlined"
                  sx={{
                    borderColor: "transparent",
                    borderRadius: "50px",
                  }}
                  onClick={pinList}
                >
                  {icons.PushPinOutlinedIcon.type.render()}
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default UserList;
