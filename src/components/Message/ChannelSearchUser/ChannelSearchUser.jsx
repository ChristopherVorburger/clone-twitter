import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Fonctions firebase
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirebaseConfig } from "../../../firebase-config";
import { useFirestore } from "../../../utils/useFirestore";

// Composants MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Autocomplete, IconButton, TextField } from "@mui/material";

// Icones et images
import { icons, images } from "../../../constants";

// Styles
import useStyles from "./styles";

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

firebase.initializeApp(getFirebaseConfig());
const auth = firebase.auth();
const firestore = firebase.firestore();

const ChannelSearchUser = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const users = useFirestore("users");
  const channelsRef = firestore.collection("channels");

  // States pour la modale
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [usersSelected, setUsersSelected] = useState([]);

  const addNewChannel = async () => {
    console.log("users selected", usersSelected);
    const todayDate = firebase.firestore.FieldValue.serverTimestamp();
    const usersToAdd = usersSelected.map((user) => user.id);
    await channelsRef.add({
      createdAt: todayDate,
      updated_at: todayDate,
      users: [auth.currentUser.uid, ...usersToAdd],
    });
  };

  // Ajout de la conversation
  const handleSubmit = async (e) => {
    e.preventDefault();

    addNewChannel();

    // Retour à la page de profil
    navigate(`/messages`);
  };

  return (
    <>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ padding: 0 }}
      >
        <form onSubmit={handleSubmit}>
          <Box className={classes.modal}>
            <Box className={classes.container}>
              {/* Header */}
              <Box display="flex" alignItems="center" height="53px" p="0 1rem">
                <Box justifyContent="flex-start">
                  <IconButton
                    onClick={() => navigate(`/messages`)}
                    sx={{ padding: "0.5rem", marginRight: "1rem" }}
                  >
                    <icons.CloseIcon />
                  </IconButton>
                </Box>
                <Box flexGrow={1}>
                  <Typography fontSize="font.large" fontWeight="mainBold">
                    New message
                  </Typography>
                </Box>
                <Box>
                  <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    sx={{
                      fontSize: "font.small",
                      fontWeight: "mainBold",
                      backgroundColor: "blue.main",
                      borderRadius: "50px",
                    }}
                    disabled={!usersSelected || usersSelected.length < 1}
                  >
                    Next
                  </Button>
                </Box>
              </Box>
              <Box mb="3rem"></Box>
              <Box className={classes.field}>
                {users ? (
                  <Autocomplete
                    // multiple
                    id="tags-outlined"
                    options={users}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, newValue) => {
                      setUsersSelected([newValue]);
                    }}
                    renderOption={(props, option, { selected }) => (
                      <Box
                        {...props}
                        key={option.id}
                        className={classes.profile_section}
                        sx={{
                          padding: "12px",
                        }}
                      >
                        <Box
                          button
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Box width="50px" height="50px" marginRight="0.5rem">
                            <img
                              className={classes.profile_section__avatar_button}
                              style={{ border: "1px solid lightgrey" }}
                              src={
                                option?.profile_image_url &&
                                option?.profile_image_url != ""
                                  ? option?.profile_image_url
                                  : images.user
                              }
                              alt="user avatar"
                            />
                          </Box>
                          <Box
                            className={classes.profile_section__avatar_texts}
                            flexGrow="1"
                          >
                            <Typography
                              fontSize="font.main"
                              fontWeight="mainBold"
                            >
                              {option?.name}
                            </Typography>
                            <Typography fontSize="font.main" color="grey.main">
                              @{option?.username}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField {...params} placeholder="Search people" />
                    )}
                  />
                ) : null}
              </Box>
            </Box>
          </Box>
        </form>
      </Modal>
    </>
  );
};

export default ChannelSearchUser;
