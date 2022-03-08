import React from "react";

import { database } from "../../../firebase-config";

import { doc, deleteDoc } from "firebase/firestore";

import {
  Box,
  Dialog,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import useStyles from "./styles";

import { AuthContext } from "../../../context/authContext";
import { icons } from "../../../constants";

const TweetDialog = (props) => {
  const { id, open, setOpen } = props;
  const classes = useStyles();
  const auth = React.useContext(AuthContext);

  // fonction pour supprimer un tweet
  const deleteTweet = (e) => {
    e.preventDefault();

    // Ici on a besoin de l'id du tweet pour savoir lequel supprimer
    // Donc pour l'instant on le recupère dans les logs ou dans firebase
    const docRef = doc(database, "tweets", id);

    deleteDoc(docRef)
      .then(() => {
        // on nettoie l'input si ok
        console.log("Delete tweet done");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const iconsArray = [
    {
      name: icons.DeleteOutlineOutlinedIcon,
      action: deleteTweet,
      text: "Delete",
    },
    { name: icons.PushPinOutlinedIcon, path: "", text: "Pin to your profile" },
    {
      name: icons.PlaylistAddOutlinedIcon,
      path: "",
      text: `Add/remove @${auth.userData?.[0]?.username} from lists`,
    },
    {
      name: icons.ChatBubbleOutlineOutlinedIcon,
      path: "",
      text: "Change who can reply",
    },
    { name: icons.CodeOutlinedIcon, path: "", text: "Embed Tweet" },
    { name: icons.BarChartOutlinedIcon, path: "", text: "View Tweet activity" },
  ];
  return (
    <Dialog disableScrollLock open={open}>
      <List>
        {iconsArray.map((icon, index) => {
          return (
            <ListItemButton key={index} onClick={icon.action}>
              <ListItemIcon>{icon.name.type.render()}</ListItemIcon>
              <ListItemText> {icon.text}</ListItemText>
            </ListItemButton>
          );
        })}
      </List>
    </Dialog>
  );
};

export default TweetDialog;
