import React from "react";

import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";

import { icons, images } from "../../../constants";

import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { database } from "../../../firebase-config";

import { AuthContext } from "../../../context/authContext";

import useStyles from "./styles";

// Composant pour afficher une list
const UserList = ({ list, author }) => {
  const classes = useStyles();

  // Utilisation du hook useContext pour récupérer le contexte Auth
  const auth = React.useContext(AuthContext);

  // Récupération du tableau de liste de l'utilisateur connecté
  const listsCurrentUser = auth?.userData?.[0]?.lists;

  // Référence à l'id de l'utilisateur connecté à mettre à jour
  const currentUserRef = doc(database, "users", auth?.authUser?.uid);

  // Fonction pour pin une list
  const pinList = (e) => {
    e.preventDefault();

    // Si l'utilisateur connecté n'a pas de pin,
    // on ajoute le premier dans le tableau pinned_lists
    if (!listsCurrentUser) {
      updateDoc(currentUserRef, {
        ...auth.userData?.[0],
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
        ...auth.userData?.[0],
        pinned_lists: [...auth.userData?.[0]?.pinned_lists, list?.id],
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
  const unPinList = () => {
    // Suppression du pin dans les datas de l'utilisateur connecté
    updateDoc(currentUserRef, {
      pinned_lists: arrayRemove(list?.id),
    });
  };

  return (
    <Box className={classes.container} p="12px 1rem">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex">
          <Box pr="1rem">
            <img src={images.user} alt="" width={"50px"} />
          </Box>
          <Box>
            <Typography fontSize="font.main">{list?.name}</Typography>
            <Box display="flex">
              <Box mr="4px">
                <img src={images.user} alt="" width={"20px"} />
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
          <Box>
            {auth?.userData?.[0]?.pinned_lists?.includes(list?.id) ? (
              <Button
                className={classes.button}
                variant="outlined"
                disableElevation
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
  );
};

export default UserList;
