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
import { SnackbarsContext } from "../../../context/snackbarsContext";

import { icons } from "../../../constants";

// Fonction qui affiche les actions possibles au clique sur le bouton share
const ShareDialog = ({ id, open }) => {
  const auth = React.useContext(AuthContext);
  const snackbar = React.useContext(SnackbarsContext);

  // Référence du user à mettre à jour
  const userRef = doc(database, "users", auth.userData?.[0]?.id);

  // fonction pour ajouter un bookmark
  const addBookmark = (e) => {
    e.preventDefault();
    snackbar.setMessageBookmarkSnackbar("");

    // Si l'utilisateur n'a pas de bookmarks on lui ajoute un nouveau tableau bookmarks avec le premier
    if (!auth.userData?.[0]?.bookmarks) {
      updateDoc(userRef, {
        bookmarks: [id],
      })
        // Puis on affiche la snackbar en mettant à jour les states
        .then(() => {
          snackbar.setMessageBookmarkSnackbar("Tweet added to your Bookmarks");
          snackbar.setOpenBookmarkSnackbar(true);
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
        // Puis on affiche la snackbar en mettant à jour les states
        .then(() => {
          snackbar.setMessageBookmarkSnackbar("Tweet added to your Bookmarks");
          snackbar.setOpenBookmarkSnackbar(true);
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
    snackbar.setMessageBookmarkSnackbar("");

    updateDoc(userRef, {
      bookmarks: arrayRemove(id),
    })
      // Puis on affiche la snackbar en mettant à jour les states
      .then(() => {
        snackbar.setMessageBookmarkSnackbar(
          "Tweet removed from your Bookmarks"
        );
        snackbar.setOpenBookmarkSnackbar(true);
        console.log("Remove from bookmarks done");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // Tableau d'icones sur un tweet non bookmarqué
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

  // Tableau d'icones sur un tweet déjà bookmarqué
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
        {/* Si le tweet est dans les bookmarks on affiche ceci */}
        {auth.userData?.[0]?.bookmarks?.includes(id)
          ? removeBookmarksIconsArray.map((icon, index) => {
              return (
                // icon.action est une référence à la fonction à executer lors du clique
                <ListItemButton key={index} onClick={icon.action}>
                  <ListItemIcon>{icon.name.type.render()}</ListItemIcon>
                  <ListItemText> {icon.text}</ListItemText>
                </ListItemButton>
              );
            })
          : // Sinon on affiche cela
            addBookmarksIconsArray.map((icon, index) => {
              return (
                // icon.action est une référence à la fonction à executer lors du clique
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

export default ShareDialog;
