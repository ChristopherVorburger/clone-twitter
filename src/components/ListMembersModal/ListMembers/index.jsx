import React from "react";
import { Box } from "@mui/system";
import { images } from "../../../constants";
import { Button, Typography } from "@mui/material";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { database } from "../../../firebase-config";

const ListMembers = ({ member, matchedList }) => {
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
        console.log(
          `Suppression du membre ${member?.name} de la liste ${matchedList?.[0]?.name}`
        );
      })
      .catch((err) => {
        console.log(err.message);
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
