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

import { AuthContext } from "../../../context/authContext";
import { UsersContext } from "../../../context/usersContext";

import { icons } from "../../../constants";

import useStyles from "./styles";

// Fonction qui affiche lea actions possibles sur un tweet
const TweetDialog = ({ id, open, author_id }) => {
  const classes = useStyles();

  // Utilisation des contextes Auth et Users
  const auth = React.useContext(AuthContext);
  const users = React.useContext(UsersContext);

  //Recherche de l'id du user qui match avec l'author_id du tweet
  const matchedUser = users?.users?.filter((user) => user?.id === author_id);

  // Création d'un tableau pour stocker les utilisateurs en lien avec le tweet
  const usersWhoBookmarkedRefs = [];

  // Recherche des utilisateurs en lien avec le tweet (bookmarks)
  users?.users?.filter((user) => {
    if (user?.bookmarks?.includes(id))
      return usersWhoBookmarkedRefs.push(doc(database, "users", user.id));
    else return null;
  });

  // fonction pour supprimer un tweet
  const deleteTweet = (e) => {
    e.preventDefault();
    console.log(id);
    const docRef = doc(database, "tweets", id);
    console.log(usersWhoBookmarkedRefs);
    if (usersWhoBookmarkedRefs.length === 0) {
      deleteDoc(docRef)
        .then(() => {
          console.log("Delete tweet done");
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      usersWhoBookmarkedRefs.map((user) => {
        return updateDoc(user, {
          bookmarks: arrayRemove(id),
        })
          .then(() => {
            console.log(`Delete tweet bookmarks`);
            deleteDoc(docRef)
              .then(() => {
                console.log("Delete tweet done");
              })
              .catch((err) => {
                console.log(err.message);
              });
          })
          .catch((err) => {
            console.log(err.message);
          });
      });
    }
  };

  // Référence à l'id de l'utilisateur connecté à mettre à jour
  const currentUserRef = doc(database, "users", auth?.authUser?.uid);

  // Référence à l'id de l'utilisateur ciblé à mettre à jour
  const followedUserRef = doc(database, "users", author_id);

  // Fonction pour unfollow
  const unfollowUser = () => {
    // Suppression du following dans les datas de l'utilisateur connecté
    updateDoc(currentUserRef, {
      following: arrayRemove(author_id),
    })
      .then(() => {
        console.log("Delete following in user connected data");
        // Suppression du follower dans les datas de l'utilisateur supprimé
        updateDoc(followedUserRef, {
          followers: arrayRemove(auth?.authUser?.uid),
        })
          .then(() => {
            console.log("Delete followers in user targeted data");
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
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
