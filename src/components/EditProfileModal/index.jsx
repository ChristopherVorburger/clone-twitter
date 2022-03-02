import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { icons, images } from "../../constants";

import useStyles from "./styles";
import { IconButton } from "@mui/material";
import ProfileButton from "../buttons/ProfileButton";

const EditProfileModal = ({ open, handleClose }) => {
  const classes = useStyles();
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ padding: 0 }}
      >
        <Box className={classes.modal}>
          <Box className={classes.container}>
            {/* Header */}
            <Box display="flex" alignItems="center" height="53px" p="0 1rem">
              <Box justifyContent="flex-start">
                <IconButton sx={{ padding: "0.5rem", marginRight: "1rem" }}>
                  <icons.CloseIcon />
                </IconButton>
              </Box>
              <Box flexGrow={1}>
                <Typography fontSize="font.large" fontWeight="mainBold">
                  Edit profile
                </Typography>
              </Box>
              <Box>
                <Button
                  className={classes.button}
                  variant="contained"
                  sx={{
                    fontSize: "font.small",
                    fontWeight: "mainBold",
                    backgroundColor: "black.main",
                    borderRadius: "50px",
                  }}
                  onClick={() => {}}
                >
                  Save
                </Button>
              </Box>
            </Box>
            <Box display="flex" justifyContent="center">
              <Box maxWidth="590px" maxHeight="200px">
                <img
                  className={classes.cover}
                  src={images.w11}
                  alt=""
                  width="100%"
                  height="100%"
                />
              </Box>
            </Box>
            {/* <Box>
              <IconButton
                sx={{
                  transform: "scale(2.5)",
                  margin: "0 0 0 4rem",
                  backgroundColor: "white.main",
                }}
              >
                <ProfileButton />
              </IconButton>
            </Box> */}
            <Box sx={{ margin: "-1rem 0 0 4rem" }}>
              <img className={classes.avatar} src={images.jdg} alt="" />
            </Box>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default EditProfileModal;
