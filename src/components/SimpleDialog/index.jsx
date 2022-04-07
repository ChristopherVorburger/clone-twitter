import * as React from "react";
import { Navigate } from "react-router-dom";

// MUI
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box, Typography } from "@mui/material";

// Contexts
import { useAuth } from "../../context/authContext";
import { useGlobal } from "../../context/globalContext";

// Images & styles
import { images } from "../../constants";
import useStyles from "./styles";

// Modale onClick Profile leftNavBar
function SimpleDialog({ open, setOpen }) {
  const { signUserOut, userData } = useAuth();
  const { dispatchSnackbar } = useGlobal();

  const classes = useStyles();

  const logout = () => {
    // On utilise la fonction signUserOut du AuthContext
    signUserOut()
      .then(() => {
        setOpen(false);
        Navigate("/");
        dispatchSnackbar({
          type: "OPEN_INFO_SNACKBAR",
          payload: { message: "Success logout, see you soon" },
        });
      })
      .catch((err) => {
        dispatchSnackbar({
          type: "OPEN_ERROR_SNACKBAR",
          payload: {
            message: `An error occurred while logout`,
          },
        });
      });
  };

  return (
    <Dialog disableScrollLock open={open}>
      <DialogTitle>
        <Box
          className={classes.dialog__section}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box width="50px" height="50px" marginRight="0.5rem">
            {userData?.[0]?.profile_image_url ? (
              <img
                className={classes.dialog__avatar_button}
                src={userData?.[0]?.profile_image_url}
                alt="user avatar default"
              />
            ) : (
              <img
                className={classes.dialog__avatar_button}
                src={images.user}
                alt="user avatar default"
              />
            )}
          </Box>
          <Box className={classes.dialog__avatar_texts} flexGrow="1">
            <Typography fontSize="font.main" fontWeight="mainBold">
              {userData?.[0]?.name}
            </Typography>
            <Typography fontSize="font.main" color="grey.main">
              @{userData?.[0]?.username}
            </Typography>
          </Box>
        </Box>
      </DialogTitle>
      <Box padding="1rem" className={classes.dialog__sentence}>
        <Typography>Add an existing accout</Typography>
      </Box>
      <Box padding="1rem" className={classes.dialog__sentence} onClick={logout}>
        <Typography>Log out @{userData?.[0]?.username}</Typography>
      </Box>
    </Dialog>
  );
}

export default SimpleDialog;
