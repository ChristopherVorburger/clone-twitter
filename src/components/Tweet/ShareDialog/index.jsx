import React from "react";

// Firebase
import { database } from "../../../firebase-config";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";

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
import { useGlobal } from "../../../context/globalContext";

// Icons
import { icons } from "../../../constants";

// Fonction qui affiche les actions possibles au clique sur le bouton share
const ShareDialog = ({ id, open }) => {
  const { userData } = useAuth();
  const { dispatch } = useGlobal();

  // Référence du user à mettre à jour
  const userRef = doc(database, "users", userData?.[0]?.id);

  // Fonction pour ajouter un bookmark
  const addBookmark = (e) => {
    e.preventDefault();

    // Sécurité pour ne pas ajouter deux fois le même tweet dans les bookmarks
    if (userData?.[0]?.bookmarks?.includes(id)) {
      dispatch({
        type: "OPEN_ERROR_SNACKBAR",
        payload: { message: "The tweet is already in your bookmarks " },
      });
      return;
    }
    // Si l'utilisateur n'a pas de bookmarks on lui ajoute un nouveau tableau bookmarks avec le premier
    if (!userData?.[0]?.bookmarks) {
      updateDoc(userRef, {
        bookmarks: [id],
      })
        // Puis on affiche la snackbar
        .then(() => {
          dispatch({
            type: "OPEN_INFO_SNACKBAR",
            payload: { message: "Tweet added to your Bookmarks" },
          });
        })
        .catch((err) => {
          dispatch({
            type: "OPEN_ERROR_SNACKBAR",
            payload: {
              message: `An error occurred when adding the tweet ${err.message}`,
            },
          });
        });
    } else {
      // Sinon on ajoute juste le tweet au tableau existant
      updateDoc(userRef, {
        bookmarks: [...userData?.[0]?.bookmarks, id],
      })
        // Puis on affiche la snackbar
        .then(() => {
          dispatch({
            type: "OPEN_INFO_SNACKBAR",
            payload: { message: "Tweet added to your Bookmarks" },
          });
        })
        .catch((err) => {
          dispatch({
            type: "OPEN_ERROR_SNACKBAR",
            payload: {
              message: `An error occurred when adding the tweet ${err.message}`,
            },
          });
        });
    }
  };

  // Fonction pour supprimer un bookmark
  const removeBookmark = (e) => {
    e.preventDefault();

    updateDoc(userRef, {
      bookmarks: arrayRemove(id),
    })
      // Puis on affiche la snackbar
      .then(() => {
        dispatch({
          type: "OPEN_INFO_SNACKBAR",
          payload: { message: "Tweet removed from your Bookmarks" },
        });
      })
      .catch((err) => {
        dispatch({
          type: "OPEN_ERROR_SNACKBAR",
          payload: {
            message: `An error occurred when adding the tweet : ${err.message}`,
          },
        });
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
        {userData?.[0]?.bookmarks?.includes(id)
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
