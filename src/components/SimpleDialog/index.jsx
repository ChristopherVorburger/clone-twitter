import * as React from "react";
import { Navigate } from "react-router-dom";

import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box, Typography } from "@mui/material";

import useStyles from "./styles";

import { AuthContext } from "../../context/authContext";

function SimpleDialog(props) {
  const auth = React.useContext(AuthContext);

  const classes = useStyles();
  const { open, setOpen } = props;

  const logout = () => {
    // On utilise la fonction signUserOut du AuthContext
    auth
      .signUserOut()
      .then(() => {
        return console.log("User signed out"), setOpen(false), Navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Dialog open={open}>
      <DialogTitle>
        <Box
          className={classes.dialog__section}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box width="50px" height="50px" marginRight="0.5rem">
            <img
              className={classes.dialog__avatar_button}
              style={{ border: "1px solid lightgrey" }}
              src={auth.userData?.[0]?.profile_image_url}
              alt="user avatar"
            />
          </Box>
          <Box className={classes.dialog__avatar_texts} flexGrow="1">
            <Typography fontSize="font.main" fontWeight="mainBold">
              {auth.userData?.[0]?.name}
            </Typography>
            <Typography fontSize="font.main" color="grey.main">
              @{auth.userData?.[0]?.username}
            </Typography>
          </Box>
        </Box>
      </DialogTitle>
      <Box padding="1rem" className={classes.dialog__sentence}>
        <Typography>Add an existing accout</Typography>
      </Box>
      <Box padding="1rem" className={classes.dialog__sentence} onClick={logout}>
        <Typography>Log out @{auth.userData?.[0]?.username}</Typography>
      </Box>
    </Dialog>
  );
}

export default SimpleDialog;
