import { useState, createContext } from "react";
import SnackbarBookmark from "../components/Snackbar";

export const SnackbarsContext = createContext();

// Contexte pour les snackbars
export function SnackbarsContextProvider(props) {
  // States pour la snackbar des bookmarks
  const [openBookmarkSnackbar, setOpenBookmarkSnackbar] = useState(false);
  const [messageBookmarkSnackbar, setMessageBookmarkSnackbar] = useState("");
  const [messageActionBookmarkSnackbar, setMessageActionBookmarkSnackbar] = useState("");
  //

  return (
    <SnackbarsContext.Provider
      value={{
        // values snackbar bookmark
        openBookmarkSnackbar,
        setOpenBookmarkSnackbar,
        messageBookmarkSnackbar,
        setMessageBookmarkSnackbar,
        messageActionBookmarkSnackbar,
        setMessageActionBookmarkSnackbar,
        //
      }}>
      <SnackbarBookmark
        message={messageBookmarkSnackbar}
        openBookmarkSnackbar={openBookmarkSnackbar}
        setOpenBookmarkSnackbar={setOpenBookmarkSnackbar}
      />
      {props.children}
    </SnackbarsContext.Provider>
  );
}
