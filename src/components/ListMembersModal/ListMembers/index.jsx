import React from "react";

// MUI
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";

// Firebase
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { database } from "../../../firebase-config";

// Context
import { useGlobal } from "../../../context/globalContext";

// Images
import { images } from "../../../constants";

// Modale de la liste des membres d'une liste
const ListMembers = ({ member, matchedList }) => {
  const { dispatchSnackbar } = useGlobal();
  // Référence à la liste à mettre à jour
  const currentListRef = doc(database, "lists", matchedList?.[0]?.id);

  // Fonction pour ajouter un membre à la liste
  const removeMember = async (e) => {
    e.preventDefault();
    // Suppression du membre de la liste
    updateDoc(currentListRef, {
      members: arrayRemove(member?.id),
    })
      .then(() => {
        dispatchSnackbar({
          type: "OPEN_INFO_SNACKBAR",
          payload: {
            message: `Member ${member?.name} was deleted from the list ${matchedList?.[0]?.name}`,
          },
        });
      })
      .catch((err) => {
        dispatchSnackbar({
          type: "OPEN_ERROR_SNACKBAR",
          payload: {
            message: `An error occurred while deleting the member ${member?.name} : ${err.message}`,
          },
        });
      });
  };

  return (
    <Box display="flex" p="12px 1rem">
      <Box mr="12px">
        <img src={images.user} alt="" width="50px" />
      </Box>
      <Box flexGrow={1}>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Typography fontSize="font.main" fontWeight="boldMain">
              {member?.name}
            </Typography>
            <Typography fontSize="font.main" color="grey.main">
              {`@${member?.username}`}
            </Typography>
          </Box>
          <Button
            // className={classes.button_black}
            variant="contained"
            sx={{
              fontSize: "font.small",
              fontWeight: "mainBold",
              backgroundColor: "#f4212e",
              borderRadius: "50px",
              textTransform: "none!important",
            }}
            onClick={removeMember}
          >
            Remove
          </Button>
        </Box>
        <Box>
          <Typography fontSize="font.main">{member?.description}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ListMembers;
