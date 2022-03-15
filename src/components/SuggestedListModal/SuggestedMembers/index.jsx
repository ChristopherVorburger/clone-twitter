import React from "react";
import { Box } from "@mui/system";
import { images } from "../../../constants";
import { Button, Typography } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../../../firebase-config";

const SuggestedMembers = ({ member, matchedList }) => {
  // Récupération des membres de la liste en question
  const members = matchedList?.[0]?.members;

  // Référence à la liste à mettre à jour
  const currentListRef = doc(database, "lists", matchedList?.[0]?.id);

  // Fonction pour ajouter un membre à la liste
  const addMember = async (e) => {
    e.preventDefault();

    // Sécurité pour ne pas suivre deux fois la même liste
    if (matchedList?.[0]?.members?.includes(member?.id)) {
      console.log("Cet utilisateur est déjà membre de la liste !");
      return;
    }
    //Si la liste n'a pas de membre, on crée un tableau avec son premier membre
    if (!members) {
      updateDoc(currentListRef, {
        members: [member?.id],
      })
        .then(() => {
          console.log(
            `Ajout d'un premier membre à la liste ${matchedList?.[0]?.name}`
          );
        })
        .catch((err) => {
          console.log(err.message);
        });
    } // Sinon, mise à jour du tableau members de la liste
    else {
      updateDoc(currentListRef, {
        ...matchedList?.[0],
        members: [...matchedList?.[0]?.members, member?.id],
      })
        .then(() => {
          console.log(`Ajout d'un membre à la liste ${matchedList?.[0]?.name}`);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
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
