import * as React from "react";
import { Navigate } from "react-router-dom";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box, Typography } from "@mui/material";

import useStyles from "./styles";

import { images } from "../../constants";

import { useAuth } from "../../context/authContext";

function SimpleDialog(props) {
  const { signUserOut, userData } = useAuth();

  const classes = useStyles();
  const { open, setOpen } = props;

  const logout = () => {
    // On utilise la fonction signUserOut du AuthContext
    signUserOut()
      .then(() => {
        setOpen(false);
        Navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
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
