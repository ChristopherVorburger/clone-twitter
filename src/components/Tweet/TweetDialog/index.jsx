import React from "react";

// Firebase
import { database } from "../../../firebase-config";
import { doc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";

// MUI
import {
  Dialog,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// Contexts
import { useAuth } from "../../../context/authContext";
import { useUsers } from "../../../context/usersContext";
import { useGlobal } from "../../../context/globalContext";

// Constants & styles
import { icons } from "../../../constants";
import useStyles from "./styles";

// Fonction qui affiche les actions possibles sur un tweet
const TweetDialog = ({ id, open, author_id }) => {
  const classes = useStyles();

  // Utilisation des contextes
  const { authUser, userData } = useAuth();
  const { users } = useUsers();
  const { dispatchSnackbar } = useGlobal();

  //Recherche de l'id du user qui match avec l'author_id du tweet
  const matchedUser = users?.filter((user) => user?.id === author_id);

  // Création d'un tableau pour stocker les utilisateurs en lien avec le tweet
  const usersWhoBookmarkedRefs = [];

  // Recherche des utilisateurs en lien avec le tweet (bookmarks)
  users?.filter((user) => {
    if (user?.bookmarks?.includes(id))
      return usersWhoBookmarkedRefs.push(doc(database, "users", user.id));
    else return null;
  });

  // fonction pour supprimer un tweet
  const deleteTweet = (e) => {
    e.preventDefault();
    const docRef = doc(database, "tweets", id);

    // Si le tweet n'a pas d'utilisateur en lien avec lui, on le supprime directement
    if (usersWhoBookmarkedRefs.length === 0) {
      deleteDoc(docRef)
        .then(() => {
          dispatchSnackbar({
            type: "OPEN_INFO_SNACKBAR",
            payload: { message: "Tweet was deleted" },
          });
        })
        .catch((err) => {
          dispatchSnackbar({
            type: "OPEN_ERROR_SNACKBAR",
            payload: {
              message: `An error occurred while deleting the tweet ${err.message}`,
            },
          });
        });
      // Sinon on supprime d'abord les bookmarks
    } else {
      usersWhoBookmarkedRefs.map((user) => {
        return updateDoc(user, {
          bookmarks: arrayRemove(id),
        })
          .then(() => {
            deleteDoc(docRef)
              .then(() => {
                dispatchSnackbar({
                  type: "OPEN_INFO_SNACKBAR",
                  payload: { message: "Tweet was deleted" },
                });
              })
              .catch((err) => {
                dispatchSnackbar({
                  type: "OPEN_ERROR_SNACKBAR",
                  payload: {
                    message: `An error occurred while deleting the tweet ${err.message}`,
                  },
                });
              });
          })
          .catch((err) => {
            dispatchSnackbar({
              type: "OPEN_ERROR_SNACKBAR",
              payload: {
                message: `An error occurred while deleting the tweet ${err.message}`,
              },
            });
          });
      });
    }
  };

  // Référence à l'id de l'utilisateur connecté à mettre à jour
  const currentUserRef = doc(database, "users", authUser?.uid);

  // Référence à l'id de l'utilisateur ciblé à mettre à jour
  const followedUserRef = doc(database, "users", author_id);

  // Fonction pour unfollow
  const unfollowUser = () => {
    // Suppression du following dans les datas de l'utilisateur connecté
    updateDoc(currentUserRef, {
      following: arrayRemove(author_id),
    })
      .then(() => {
        // Suppression du follower dans les datas de l'utilisateur supprimé
        updateDoc(followedUserRef, {
          followers: arrayRemove(authUser?.uid),
        })
          .then(() => {
            dispatchSnackbar({
              type: "OPEN_INFO_SNACKBAR",
              payload: {
                message: `${matchedUser?.[0]?.name} has been deleted from your following`,
              },
            });
          })
          .catch((err) => {
            dispatchSnackbar({
              type: "OPEN_ERROR_SNACKBAR",
              payload: {
                message: `An error occurred while unfollowing ${matchedUser?.[0]?.name} : ${err.message}`,
              },
            });
          });
      })
      .catch((err) => {
        dispatchSnackbar({
          type: "OPEN_ERROR_SNACKBAR",
          payload: {
            message: `An error occurred while unfollowing ${matchedUser?.[0]?.name} : ${err.message}`,
          },
        });
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
      text: `Add/remove @${userData?.[0]?.username} from lists`,
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
        {userData?.[0]?.id === author_id
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
