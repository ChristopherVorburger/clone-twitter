import { useState, useContext, useReducer, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Fonctions firebase
import { database, storage } from "../../firebase-config";
import { doc, updateDoc } from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

const EditProfileModal = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  // States pour la modale
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [nameError, setNameError] = useState(false);
  const [imageSelected, setImageSelected] = useState([]);
  const [coverSelected, setCoverSelected] = useState([]);
  const [file, setFile] = useState();
  const [coverFile, setCoverFile] = useState();

  console.log("imageselected", imageSelected);
  console.log("coverselected", coverSelected);
  console.log("file", file);

  //Utilisation du contexte Auth
  const auth = useContext(AuthContext);

  // Valeurs de départ pour le reducer
  const initialValue = {
    name: auth?.userData?.[0]?.name,
    description: auth?.userData?.[0]?.description,
    location: auth?.userData?.[0]?.location,
    website: auth?.userData?.[0]?.website,
    // age: auth?.userData?.[0]?.age,
    profile_image_url: auth?.userData?.[0]?.profile_image_url,
    cover_url: auth?.userData?.[0]?.cover_url,
  };

  // Utilisation du reducer
  const [state, dispatch] = useReducer(reducer, initialValue);
  // Destructuration des valeurs
  const {
    name,
    description,
    location,
    website,
    age,
    profile_image_url,
    cover_url,
  } = state;

  // Action sut les inputs
  const inputAction = (event) => {
    dispatch({
      type: "update",
      payload: { key: event.target.name, value: event.target.value },
    });
  };

  // Référence à l'id de l'utilisateur connecté à mettre à jour
  const currentUserRef = doc(database, "users", auth?.authUser?.uid);

  // Gestion du champ input name vide
  useEffect(() => {
    if (name?.length === 0) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }, [name]);

  // Fonction pour editer le profil
  const handleSubmit = async (e) => {
    e.preventDefault();
    setNameError(false);
    if (state.name === "") {
      setNameError(true);
    }

    // Si pas de nouvelle image de profil ou de cover, mise à jour des données des inputs
    if (imageSelected.name === undefined && coverSelected.name === undefined) {
      updateDoc(currentUserRef, {
        name,
        description,
        location,
        website,
        // age,
      });

      // Si nouvelle image mais pas de cover, mise à jour des données et upload de l'image de profil
    } else if (coverSelected.name === undefined) {
      // Référence du storage
      const profileImageRef = ref(
        storage,
        `images/profile/${imageSelected.name}`
      );

      // upload de l'image de profil dans le firebase storage
      await uploadBytes(profileImageRef, imageSelected);

      // On obtient l'url de l'image avec getDownloadUrl
      const profileImageLink = await getDownloadURL(profileImageRef);

      updateDoc(currentUserRef, {
        name,
        description,
        location,
        website,
        // age,
        profile_image_url: profileImageLink,
      });

      // Si nouvelle cover mais pas d'image de profil, mise à jour des données et upload de la cover
    } else if (imageSelected.name === undefined) {
      // Référence du storage
      const coverRef = ref(storage, `images/cover/${coverSelected.name}`);

      // Upload de la cover dans le firebase storage
      await uploadBytes(coverRef, coverSelected);

      // On obtient l'url de l'image avec getDownloadUrl
      const coverLink = await getDownloadURL(coverRef);

      updateDoc(currentUserRef, {
        name,
        description,
        location,
        website,
        // age,
        cover_url: coverLink,
      });

      // Sinon mise à jour de toutes les données
    } else {
      // Références du storage
      const profileImageRef = ref(
        storage,
        `images/profile/${imageSelected.name}`
      );
      const coverRef = ref(storage, `images/cover/${coverSelected.name}`);

      // Upload de l'image de profil et de la cover dans le firebase storage
      await uploadBytes(profileImageRef, imageSelected);
      await uploadBytes(coverRef, coverSelected);

      // On obtient les urls avec getDownloadUrl
      const profileImageLink = await getDownloadURL(profileImageRef);
      const coverLink = await getDownloadURL(coverRef);

      updateDoc(currentUserRef, {
        name,
        description,
        location,
        website,
        // age,
        profile_image_url: profileImageLink,
        cover_url: coverLink,
      });
    }
    // Retour à la page de profil
    navigate(`/${auth?.userData?.[0]?.username}`);
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
                    onClick={() =>
                      navigate(`/${auth?.userData?.[0]?.username}`)
                    }
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
              {/* Images */}
              {/* Section image de couverture */}
              <Box
                display="flex"
                justifyContent="center"
                className={classes.cover__container}
              >
                {cover_url ? (
                  <Box maxWidth="590px" maxHeight="200px">
                    {coverFile ? (
                      <img className={classes.cover} src={coverFile} alt="" />
                    ) : (
                      <img
                        className={classes.cover}
                        src={cover_url}
                        alt=""
                        width="100%"
                        height="100%"
                      />
                    )}
                    <Box>
                      <IconButton
                        size="large"
                        className={classes.button__add_cover}
                      >
                        <label
                          htmlFor="coverFiles"
                          className={classes.button__add_cover}
                        >
                          <icons.AddAPhotoOutlinedIcon />
                        </label>
                        <input
                          className={classes.button__add_cover}
                          onChange={(e) => {
                            console.log(
                              "e.target.files image cover",
                              e.target.files
                            );
                            return (
                              setCoverSelected(e.target.files[0]),
                              // Création de l'aperçu de l'image
                              setCoverFile(
                                URL.createObjectURL(e.target.files[0])
                              )
                            );
                          }}
                          id="coverFiles"
                          style={{ cursor: "pointer", visibility: "hidden" }}
                          type="file"
                        />
                      </IconButton>
                    </Box>
                  </Box>
                ) : (
                  <Box maxWidth="590px" maxHeight="200px">
                    {coverFile ? (
                      <img className={classes.cover} src={coverFile} alt="" />
                    ) : (
                      <img
                        className={classes.cover}
                        src={cover_url}
                        alt=""
                        width="100%"
                        height="100%"
                      />
                    )}
                    <Box>
                      <IconButton
                        size="large"
                        className={classes.button__add_cover}
                      >
                        <label
                          htmlFor="coverFiles"
                          className={classes.button__add_cover}
                        >
                          <icons.AddAPhotoOutlinedIcon />
                        </label>
                        <input
                          className={classes.button__add_cover}
                          onChange={(e) => {
                            console.log(
                              "e.target.files default cover",
                              e.target.files
                            );
                            return (
                              setCoverSelected(e.target.files[0]),
                              // Création de l'aperçu de l'image
                              setCoverFile(
                                URL.createObjectURL(e.target.files[0])
                              )
                            );
                          }}
                          id="coverFiles"
                          style={{ cursor: "pointer", visibility: "hidden" }}
                          type="file"
                        />
                      </IconButton>
                    </Box>
                  </Box>
                )}
              </Box>
              {/* Section image de profil */}
              <Box mb="3rem">
                {profile_image_url ? (
                  <Box
                    className={classes.avatar}
                    sx={{ margin: "-1rem 0 0 4rem" }}
                  >
                    {/* Si il y a une image en attente d'Upload on affiche son aperçu sinon on affiche l'image de profil */}
                    {file ? (
                      <img className={classes.avatar} src={file} alt="" />
                    ) : (
                      <img
                        className={classes.avatar}
                        src={profile_image_url}
                        alt=""
                      />
                    )}
                    <Box className={classes.image}>
                      <IconButton size="small">
                        <label
                          htmlFor="profilImageFiles"
                          className={classes.image}
                        >
                          <icons.AddAPhotoOutlinedIcon />
                        </label>
                        <input
                          onChange={(e) => {
                            console.log(
                              "e.target.files image profil",
                              e.target.files
                            );

                            return (
                              setImageSelected(e.target.files[0]),
                              // Création de l'aperçu de l'image
                              setFile(URL.createObjectURL(e.target.files[0]))
                            );
                          }}
                          className={classes.image}
                          id="profilImageFiles"
                          style={{ visibility: "hidden" }}
                          type="file"
                        />
                      </IconButton>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    className={classes.avatar}
                    sx={{
                      margin: "-1rem 0 0 3.5rem",
                      backgroundColor: "white.main",
                    }}
                  >
                    {file ? (
                      <img className={classes.avatar} src={file} alt="" />
                    ) : null}
                    <Box className={classes.image}>
                      <IconButton size="small">
                        <label
                          htmlFor="profilImageFiles"
                          className={classes.image}
                        >
                          <icons.AddAPhotoOutlinedIcon />
                        </label>
                        <input
                          onChange={(e) => {
                            return (
                              setImageSelected(e.target.files[0]),
                              // Création de l'aperçu de l'image
                              setFile(URL.createObjectURL(e.target.files[0]))
                            );
                          }}
                          className={classes.image}
                          id="profilImageFiles"
                          style={{ visibility: "hidden" }}
                          type="file"
                        />
                      </IconButton>
                    </Box>
                  </Box>
                )}
              </Box>
              {/* Formulaire */}
              <Box className={classes.field}>
                <TextField
                  value={name}
                  type="text"
                  name="name"
                  onChange={inputAction}
                  label="Name"
                  fullWidth
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
