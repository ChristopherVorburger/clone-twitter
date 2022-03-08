import React from "react";

import { database } from "../../../firebase-config";

import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";

import {
  Dialog,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import useStyles from "./styles";

import { AuthContext } from "../../../context/authContext";
import { icons } from "../../../constants";
import { useFirestore } from "../../../utils/useFirestore";

// Fonction qui affiche lea actions possibles sur un tweet
const TweetDialog = ({ id, open, author_id }) => {
  const classes = useStyles();
  const auth = React.useContext(AuthContext);

  // Utilisation du hook perso useFirestore pour récupérer les users
  const users = useFirestore("users");

  //Recherche de l'id du user qui match avec l'author_id du tweet
  const matchedUser = users?.filter((user) => user?.id === author_id);

  // fonction pour supprimer un tweet
  const deleteTweet = (e) => {
    e.preventDefault();

    const docRef = doc(database, "tweets", id);

    deleteDoc(docRef)
      .then(() => {
        console.log("Delete tweet done");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // Référence à l'id de l'utilisateur connecté à mettre à jour
  const currentUserRef = doc(database, "users", auth?.authUser?.uid);

  // Fonction pour unfollow
  const unfollowUser = () => {
    // Suppression du following dans les datas de l'utilisateur connecté
    updateDoc(currentUserRef, {
      following: arrayRemove(author_id),
    });
  };

  const personalTweetIconsArray = [
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

  const followingUserIconsArray = [
    {
      name: icons.SentimentVeryDissatisfiedIcon,
      path: "",
      text: "Not interested in this Tweet",
    },
    {
      name: icons.PersonRemoveOutlinedIcon,
      action: unfollowUser,
      path: "",
      text: `Unfollow @${matchedUser?.[0]?.username}`,
    },
    {
      name: icons.PlaylistAddOutlinedIcon,
      path: "",
      text: `Add/remove @${matchedUser?.[0]?.username} from lists`,
    },
    {
      name: icons.VolumeOffOutlinedIcon,
      path: "",
      text: `Mute @${matchedUser?.[0]?.username}`,
    },
    {
      name: icons.BlockOutlinedIcon,
      path: "",
      text: `Block @${matchedUser?.[0]?.username}`,
    },
    { name: icons.CodeOutlinedIcon, path: "", text: "Embed Tweet" },
    { name: icons.FlagOutlinedIcon, path: "", text: "Report Tweet" },
  ];
  return (
    <Dialog disableScrollLock open={open}>
      <List className={classes.tweet_dialog__list}>
        {auth.userData?.[0]?.id === author_id
          ? personalTweetIconsArray.map((icon, index) => {
              return (
                <ListItemButton
                  className={classes.tweet_dialog__buttons}
                  key={index}
                  onClick={icon.action}
                >
                  <ListItemIcon>{icon.name.type.render()}</ListItemIcon>
                  <ListItemText> {icon.text}</ListItemText>
                </ListItemButton>
              );
            })
          : followingUserIconsArray.map((icon, index) => {
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
