import React from "react";

import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";

import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { database } from "../../firebase-config";

import { AuthContext } from "../../context/authContext";

import useStyles from "./styles";

// Composant pour afficher une list
const List = ({ list, author }) => {
  const classes = useStyles();
  const [textButton, setTextButton] = React.useState("Following");

  // Utilisation du hook useContext pour récupérer le contexte Auth
  const auth = React.useContext(AuthContext);

  // Récupération du tableau de following de l'utilisateur connecté
  const listsCurrentUser = auth?.userData?.[0]?.lists;

  // Référence à l'id de l'utilisateur connecté à mettre à jour
  const currentUserRef = doc(database, "users", auth?.authUser?.uid);

  const followList = (e) => {
    e.preventDefault();

    // Si l'utilisateur connecté n'a pas de liste,
    // on ajoute la première dans le tableau lists
    if (!listsCurrentUser) {
      updateDoc(currentUserRef, {
        ...auth.userData?.[0],
        lists: [list?.id],
      })
        .then(() => {
          console.log("First list created");
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      updateDoc(currentUserRef, {
        ...auth.userData?.[0],
        lists: [...auth.userData?.[0]?.lists, list?.id],
      })
        .then(() => {
          console.log("List created");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  // Fonction pour unfollow
  const unfollowList = () => {
    // Suppression du following dans les datas de l'utilisateur connecté
    updateDoc(currentUserRef, {
      lists: arrayRemove(list?.id),
    });
  };

  return (
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
            <Typography fontSize="font.main">{list?.name}</Typography>
            <Box display="flex">
              <Box mr="4px">
                <img
                  src={author?.[0]?.profile_image_url}
                  alt=""
                  className={classes.list__avatar_user}
                />
              </Box>
              <Typography mr="4px" fontSize="font.small">
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
            {auth?.userData?.[0]?.lists?.includes(list?.id) ? (
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
  );
};

export default List;
