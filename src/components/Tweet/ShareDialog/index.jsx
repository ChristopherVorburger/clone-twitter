import React from "react";

import { database } from "../../../firebase-config";

import { doc, updateDoc, arrayRemove } from "firebase/firestore";

import {
  Dialog,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { AuthContext } from "../../../context/authContext";
import { icons } from "../../../constants";

// Fonction qui affiche lea actions possibles sur un tweet
const TweetDialog = ({ id, open }) => {
  const auth = React.useContext(AuthContext);

  // Référence du user à mettre à jour
  const userRef = doc(database, "users", auth.userData?.[0]?.id);

  // fonction pour ajouter un bookmark
  const addBookmark = (e) => {
    e.preventDefault();

    // Si l'utilisateur n'a pas de bookmarks on lui ajoute un nouveau tableau bookmarks avec le premier
    if (!auth.userData?.[0]?.bookmarks) {
      updateDoc(userRef, {
        bookmarks: [id],
      })
        .then(() => {
          console.log("Add first bookmark done");
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      // Sinon on ajoute juste le tweet au tableau existant
      updateDoc(userRef, {
        bookmarks: [...auth.userData?.[0]?.bookmarks, id],
      })
        .then(() => {
          console.log("Add to bookmarks done");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  // fonction pour supprimer un bookmark
  const removeBookmark = (e) => {
    e.preventDefault();

    updateDoc(userRef, {
      bookmarks: arrayRemove(id),
    })
      .then(() => {
        console.log("Remove from bookmarks done");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const addBookmarksIconsArray = [
    {
      name: icons.EmailOutlinedIcon,
      text: "Send via Direct Message",
    },
    {
      name: icons.BookmarkAddOutlinedIcon,
      action: addBookmark,
      text: "Bookmark",
    },
    {
      name: icons.InsertLinkOutlinedIcon,
      text: "Copy link to Tweet",
    },
  ];

  const removeBookmarksIconsArray = [
    {
      name: icons.EmailOutlinedIcon,
      text: "Send via Direct Message",
    },
    {
      name: icons.BookmarkRemoveOutlinedIcon,
      action: removeBookmark,
      text: "Remove Tweet from Bookmarks",
    },
    {
      name: icons.InsertLinkOutlinedIcon,
      text: "Copy link to Tweet",
    },
  ];

  return (
    <Dialog disableScrollLock open={open}>
      <List>
        {auth.userData?.[0]?.bookmarks.includes(id)
          ? removeBookmarksIconsArray.map((icon, index) => {
              return (
                <ListItemButton key={index} onClick={icon.action}>
                  <ListItemIcon>{icon.name.type.render()}</ListItemIcon>
                  <ListItemText> {icon.text}</ListItemText>
                </ListItemButton>
              );
            })
          : addBookmarksIconsArray.map((icon, index) => {
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
