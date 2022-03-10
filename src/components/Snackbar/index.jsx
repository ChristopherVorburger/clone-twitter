import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";

export default function SnackbarBookmark({
  message,
  messageAction,
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

  const action = (
    <React.Fragment>
      <Button
        color="secondary"
        size="small"
        onClick={() => navigate("/bookmarks")}
      >
        {messageAction}
      </Button>
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
      />
    </div>
  );
}
