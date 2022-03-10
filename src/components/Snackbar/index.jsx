import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";

export default function SnackbarBookmark({
  message,
  openBookmarkSnackbar,
  setOpenBookmarkSnackbar,
}) {
  const navigate = useNavigate();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenBookmarkSnackbar(false);
  };

  console.log("message", message);
  // Fonction pour rediriger vers la page bookmarks via le texte de la snackbar
  const action = (
    <React.Fragment>
      {message === "Tweet added to your Bookmarks" ? (
        <Button
          color="secondary"
          size="small"
          onClick={() => navigate("/bookmarks")}
        >
          View
        </Button>
      ) : null}
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={openBookmarkSnackbar}
        autoHideDuration={4000}
        onClose={handleClose}
        message={message}
        action={action}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "primary.main",
          },
          "& .css-kmxb0e-MuiButtonBase-root-MuiButton-root": {
            color: "white.main",
          },
        }}
      />
    </div>
  );
}
