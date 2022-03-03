import { useState, useContext, useReducer, useEffect } from "react";
import { Link } from "react-router-dom";

// Fonctions firebase
import { database, storage } from "../../firebase-config";
import { addDoc, doc, updateDoc, collection } from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Composants MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, Input, TextField } from "@mui/material";

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
  console.log("open", open);
  const [nameError, setNameError] = useState(false);
  const [imageSelected, setImageSelected] = useState([]);

  //Référence de la coleciton d'images'
  const imagesCollectionRef = collection(database, "photos");

  //Utilisation du contexte Auth
  const auth = useContext(AuthContext);

  // Valeurs de départ pour le reducer
  const initialValue = {
    name: auth?.userData?.[0]?.name,
    description: auth?.userData?.[0]?.description,
    location: auth?.userData?.[0]?.location,
    website: "",
    age: "",
    profile_image_url: auth?.userData?.[0]?.profile_image_url,
  };

  // Utilisation du reducer
  const [state, dispatch] = useReducer(reducer, initialValue);
  // Destructuration des valeurs
  const { name, description, location, website, age, profile_image_url } =
    state;

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

  useEffect(() => {
    if (name?.length === 0) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }, [name]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameError(false);
    if (state.name === "") {
      setNameError(true);
    }

    updateDoc(currentUserRef, {
      name,
      description,
      location,
      website,
      age,
    });

    handleClose();
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const photoRef = ref(storage, `images/profile/${imageSelected.name}`);

    // upload de l'image dans le firebase storage
    await uploadBytes(photoRef, imageSelected);

    // get the url of the picture
    const photoLink = await getDownloadURL(photoRef);

    // create the photo in the database
    updateDoc(currentUserRef, {
      profile_image_url: photoLink,
    });
    handleClose();
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
        <form onSubmit={handleUpload}>
          <Box className={classes.modal}>
            <Box className={classes.container}>
              {/* Header */}
              <Box display="flex" alignItems="center" height="53px" p="0 1rem">
                <Box justifyContent="flex-start">
                  <IconButton
                    onClick={() => handleClose()}
                    sx={{ padding: "0.5rem", marginRight: "1rem" }}
                  >
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
                    disabled={nameError}
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
              <Box mb="3rem">
                {profile_image_url ? (
                  <Box sx={{ margin: "-1rem 0 0 4rem" }}>
                    <img
                      className={classes.avatar}
                      src={profile_image_url}
                      alt=""
                    />
                    <IconButton size="small">
                      <label for="files" className={classes.image}>
                        <icons.AddAPhotoOutlinedIcon />
                      </label>
                      <input
                        onChange={(e) => setImageSelected(e.target.files[0])}
                        className={classes.image}
                        id="files"
                        style={{ visibility: "hidden" }}
                        type="file"
                      />
                    </IconButton>
                  </Box>
                ) : (
                  <Box
                    className={classes.avatar}
                    sx={{
                      transform: "scale(2.2)",
                      margin: "-1rem 0 0 3.5rem",
                      backgroundColor: "white.main",
                    }}
                  >
                    <Box className={classes.image}>
                      <IconButton size="small">
                        <label for="files" className={classes.image}>
                          <icons.AddAPhotoOutlinedIcon />
                        </label>
                        <input
                          onChange={(e) => setImageSelected(e.target.files[0])}
                          className={classes.image}
                          id="files"
                          style={{ visibility: "hidden" }}
                          type="file"
                        />
                      </IconButton>
                    </Box>
                  </Box>
                )}
              </Box>
              <Box className={classes.field}>
                <TextField
                  value={name}
                  type="text"
                  name="name"
                  onChange={inputAction}
                  label="Name"
                  fullWidth
                  autoFocus
                  error={nameError}
                />
                {nameError ? (
                  <Typography ml="1rem" fontSize="font.small" color="error">
                    Name can’t be blank
                  </Typography>
                ) : null}
              </Box>
              <Box className={classes.field}>
                <TextField
                  value={description}
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
                  value={location}
                  type="text"
                  name="location"
                  onChange={inputAction}
                  label="Location"
                  fullWidth
                />
              </Box>
              <Box className={classes.field}>
                <TextField
                  value={website}
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
                {/* TODO: Mettre en place la mise à jour de la date de naissance */}
                <Box>
                  <Typography fontSize="font.large">{age}</Typography>
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
