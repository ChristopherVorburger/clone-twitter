import { useState, useContext, useReducer } from "react";
import { Link } from "react-router-dom";

// Fonctions firebase
import { database } from "../../firebase-config";
import {
  arrayRemove,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

// Composants MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, TextField } from "@mui/material";

// Icones et images
import { icons, images } from "../../constants";

// Styles
import useStyles from "./styles";

// Composant React
import ProfileButton from "../buttons/ProfileButton";

// Context
import { AuthContext } from "../../context/authContext";

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

const EditProfileModal = ({ open, handleClose }) => {
  const classes = useStyles();
  const [nameError, setNameError] = useState(false);

  //Utilisation du contexte Auth
  const auth = useContext(AuthContext);

  // Valeurs de départ pour le reducer
  const initialValue = {
    name: auth?.userData?.[0]?.name,
    description: auth?.userData?.[0]?.description,
    location: auth?.userData?.[0]?.location,
    website: "",
    age: "",
  };

  // Utilisation du reducer
  const [state, dispatch] = useReducer(reducer, initialValue);

  // Action sut les inputs
  const inputAction = (event) => {
    dispatch({
      type: "update",
      payload: { key: event.target.name, value: event.target.value },
    });
  };

  // Référence à l'id de l'utilisateur connecté à mettre à jour
  const currentUserRef = doc(database, "users", auth?.authUser?.uid);
  console.log("userco", currentUserRef);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameError(false);
    if (state.name === "") {
      setNameError(true);
    }
    if (state.website === undefined) {
      setDoc(currentUserRef, {
        ...auth.userData,
        name: state.name,
        description: state.description,
        location: state.location,
        website: "",
      });
    } else {
      updateDoc(currentUserRef, {
        name: state.name,
        description: state.description,
        location: state.location,
        website: state.website,
        age: state.age,
      });
    }
  };

  return (
    <>
      <Modal
        open={open}
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
                    type="submit"
                    variant="contained"
                    sx={{
                      fontSize: "font.small",
                      fontWeight: "mainBold",
                      backgroundColor: "black.main",
                      borderRadius: "50px",
                    }}
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
              <Box mb="3rem">
                <Box sx={{ margin: "-1rem 0 0 4rem" }}>
                  <img className={classes.avatar} src={images.jdg} alt="" />
                </Box>
              </Box>
              <Box className={classes.field}>
                <TextField
                  value={state.name}
                  type="text"
                  name="name"
                  onChange={inputAction}
                  label="Name"
                  fullWidth
                  autoFocus
                  error={nameError}
                />
              </Box>
              <Box className={classes.field}>
                <TextField
                  value={state.description}
                  type="text"
                  name="description"
                  onChange={inputAction}
                  label="Bio"
                  multiline
                  rows={2}
                  fullWidth
                />
              </Box>
              <Box className={classes.field}>
                <TextField
                  value={state.location}
                  type="text"
                  name="location"
                  onChange={inputAction}
                  label="Location"
                  fullWidth
                />
              </Box>
              <Box className={classes.field}>
                <TextField
                  value={state.website}
                  type="text"
                  name="website"
                  onChange={inputAction}
                  label="Website"
                  fullWidth
                />
              </Box>
              <Box sx={{ padding: "12px 1rem!important" }}>
                <Box display="flex">
                  <Typography fontSize="font.main" color="grey.main">
                    Birth date
                  </Typography>
                  <Typography m="0 4px 0 4px">·</Typography>
                  <Typography
                    fontSize="font.main"
                    color="primary.main"
                    component={Link}
                    //   TODO: câbler le lien
                    to=""
                  >
                    Edit
                  </Typography>
                </Box>
                <Box>
                  <Typography fontSize="font.large">
                    {state.birthDate}
                  </Typography>
                </Box>
              </Box>
              <Box
                className={classes.link_pro}
                mb="3rem"
                sx={{ padding: "12px 1rem!important" }}
              >
                <Box display="flex" justifyContent="space-between">
                  <Typography>Swicth to professional</Typography>
                  <icons.ArrowBackIcon sx={{ transform: "rotate(180deg)" }} />
                </Box>
              </Box>
            </Box>
          </Box>
        </form>
      </Modal>
    </>
  );
};

export default EditProfileModal;
