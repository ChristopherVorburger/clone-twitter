import React from "react";

// MUI
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";

// Firebase
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../../../firebase-config";

// Context
import { useGlobal } from "../../../context/globalContext";

// Images
import { images } from "../../../constants";

// Modale de la liste des membres suggérés
const SuggestedMembers = ({ member, matchedList }) => {
  const { dispatchSnackbar } = useGlobal();

  // Récupération des membres de la liste en question
  const members = matchedList?.[0]?.members;

  // Référence à la liste à mettre à jour
  const currentListRef = doc(database, "lists", matchedList?.[0]?.id);

  // Fonction pour ajouter un membre à la liste
  const addMember = async (e) => {
    e.preventDefault();

    // Sécurité pour ne pas suivre deux fois la même liste
    if (matchedList?.[0]?.members?.includes(member?.id)) {
      dispatchSnackbar({
        type: "OPEN_ERROR_SNACKBAR",
        payload: {
          message: ` ${member?.name} is already a member of the list ${matchedList?.[0]?.name}`,
        },
      });
      return;
    }
    //Si la liste n'a pas de membre, on crée un tableau avec son premier membre
    if (!members) {
      updateDoc(currentListRef, {
        members: [member?.id],
      })
        .then(() => {
          dispatchSnackbar({
            type: "OPEN_INFO_SNACKBAR",
            payload: {
              message: `Member ${member?.name} was added to the list ${matchedList?.[0]?.name}`,
            },
          });
        })
        .catch((err) => {
          dispatchSnackbar({
            type: "OPEN_ERROR_SNACKBAR",
            payload: {
              message: `An error occurred while adding the member ${member?.name} : ${err.message}`,
            },
          });
        });
    } // Sinon, mise à jour du tableau members de la liste
    else {
      updateDoc(currentListRef, {
        ...matchedList?.[0],
        members: [...matchedList?.[0]?.members, member?.id],
      })
        .then(() => {
          dispatchSnackbar({
            type: "OPEN_INFO_SNACKBAR",
            payload: {
              message: `Member ${member?.name} was added to the list ${matchedList?.[0]?.name}`,
            },
          });
        })
        .catch((err) => {
          dispatchSnackbar({
            type: "OPEN_ERROR_SNACKBAR",
            payload: {
              message: `An error occurred while adding the member ${member?.name} : ${err.message}`,
            },
          });
        });
    }
  };

  return (
    <Box display="flex" p="12px 1rem">
      <Box mr="12px">
        <img src={images?.user} alt="" width="50px" />
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
              backgroundColor: "black.main",
              borderRadius: "50px",
              textTransform: "none!important",
            }}
            onClick={addMember}
          >
            Add
          </Button>
        </Box>
        <Box>
          <Typography fontSize="font.main">{member?.description}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SuggestedMembers;
