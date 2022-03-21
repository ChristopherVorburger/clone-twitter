import { useState, useContext, useReducer } from "react";
import { useNavigate } from "react-router-dom";

// Fonctions firebase
import { database, storage } from "../../firebase-config";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Composants MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, Input, TextField } from "@mui/material";

// Icones et images
import { icons } from "../../constants";

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

const CreateListModal = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  // States pour la modale
  const [, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [coverSelected, setCoverSelected] = useState([]);
  const [coverFile, setCoverFile] = useState();

  //Utilisation du contexte Auth
  const auth = useContext(AuthContext);

  // Valeurs de départ pour le reducer
  const initialValue = {
    name: "",
    description: "",
    private_list: false,
    cover_url: "",
  };

  // Utilisation du reducer
  const [state, dispatch] = useReducer(reducer, initialValue);
  // Destructuration des valeurs
  const { name, description, cover_url, private_list } = state;

  // Action sut les inputs
  const inputAction = (event) => {
    dispatch({
      type: "update",
      payload: { key: event.target.name, value: event.target.value },
    });
  };

  // Référence à l'id de l'utilisateur connecté à mettre à jour
  const currentUserRef = doc(database, "users", auth?.authUser?.uid);

  // Référence à la collection lists à mettre à jour
  const listsCollection = collection(database, "lists");

  // Listes de l'utilisateur connecté
  const listsCurrentUser = auth.userData?.[0]?.lists;

  // Tableau d'image de cover par défaut
  const defaultCoverNames = [
    "default-cover-1.png",
    "default-cover-2.png",
    "default-cover-3.png",
    "default-cover-4.png",
    "default-cover-5.png",
    "default-cover-6.png",
    "default-cover-7.png",
  ];

  // Fonction pour créer une liste
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Si il n'y a pas de cover et que l'utilisateur connecté n'a pas encore de liste de liste,
    // création du tableau lists dans userData et création de la première liste sans cover
    if (coverSelected.name === undefined && !listsCurrentUser) {
      // Références du storage
      const defaultCoversRef = ref(
        storage,

        `images/defaultCover/${
          defaultCoverNames[
            Math.floor(Math.random() * defaultCoverNames.length)
          ]
        }`
      );

      // On obtient les urls avec getDownloadUrl
      const coverLink = await getDownloadURL(defaultCoversRef);

      addDoc(listsCollection, {
        author_id: auth.userData?.[0]?.id,
        name,
        description,
        private_list,
        members: [],
        followers: [],
        cover_url: coverLink,
      })
        .then((cred) => {
          setDoc(currentUserRef, {
            ...auth.userData?.[0],
            lists: [cred._key.path.segments[1]],
          });
          console.log("First List created without cover !");
          navigate(`/lists/${cred._key.path.segments[1]}/members/suggested`);
        })
        .catch((err) => {
          console.log(err.message);
        });

      // Si pas de cover et que l'utilisateur connecté a déjà au moins une liste,
      // ajout de la liste dans le tableau existant et création de la liste sans cover
    } else if (coverSelected.name === undefined) {
      // Références du storage
      const defaultCoversRef = ref(
        storage,

        `images/defaultCover/${
          defaultCoverNames[
            Math.floor(Math.random() * defaultCoverNames.length)
          ]
        }`
      );

      // On obtient les urls avec getDownloadUrl
      const coverLink = await getDownloadURL(defaultCoversRef);

      addDoc(listsCollection, {
        author_id: auth.userData?.[0]?.id,
        name,
        description,
        private_list,
        members: [],
        followers: [],
        cover_url: coverLink,
      })
        .then((cred) => {
          setDoc(currentUserRef, {
            ...auth.userData?.[0],
            lists: [...listsCurrentUser, cred._key.path.segments[1]],
          });
          console.log("List created without cover !");
          navigate(`/lists/${cred._key.path.segments[1]}/members/suggested`);
        })
        .catch((err) => {
          console.log(err.message);
        });

      // Si il n'y a pas de listes mais une image de cover, on ajoute une première liste avec cover
    } else if (!listsCurrentUser) {
      // Références du storage
      const listCoversRef = ref(
        storage,
        `images/listCovers/${coverSelected.name}`
      );

      // Upload de l'image de profil et de la cover dans le firebase storage
      await uploadBytes(listCoversRef, coverSelected);

      // On obtient les urls avec getDownloadUrl
      const coverLink = await getDownloadURL(listCoversRef);
      addDoc(listsCollection, {
        author_id: auth.userData?.[0]?.id,
        name,
        description,
        private_list,
        members: [],
        followers: [],
        cover_url: coverLink,
      })
        .then((cred) => {
          setDoc(currentUserRef, {
            ...auth.userData?.[0],
            lists: [cred._key.path.segments[1]],
          });
          console.log("First List created with cover !");
          navigate(`/lists/${cred._key.path.segments[1]}/members/suggested`);
        })
        .catch((err) => {
          console.log(err.message);
        });

      // Sinon on ajoute au tableau déjà présent
    } else {
      // Références du storage
      const listCoversRef = ref(
        storage,
        `images/listCovers/${coverSelected.name}`
      );

      // Upload de l'image de profil et de la cover dans le firebase storage
      await uploadBytes(listCoversRef, coverSelected);

      // On obtient les urls avec getDownloadUrl
      const coverLink = await getDownloadURL(listCoversRef);

      addDoc(listsCollection, {
        author_id: auth.userData?.[0]?.id,
        name,
        description,
        private_list,
        members: [],
        followers: [],
        cover_url: coverLink,
      })
        .then((cred) => {
          setDoc(currentUserRef, {
            ...auth.userData?.[0],
            lists: [...listsCurrentUser, cred._key.path.segments[1]],
          });
          console.log("List created with cover !");
          navigate(`/lists/${cred._key.path.segments[1]}/members/suggested`);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    // Retour à la page des listes
    navigate(`/${auth?.userData?.[0]?.username}/lists`);
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
                    Create a new List
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
                    Next
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

              {/* Formulaire */}
              <Box className={classes.field}>
                <TextField
                  value={name}
                  type="text"
                  name="name"
                  onChange={inputAction}
                  label="Name"
                  fullWidth
                />
              </Box>
              <Box className={classes.field}>
                <TextField
                  value={description}
                  type="text"
                  name="description"
                  onChange={inputAction}
                  label="Description"
                  multiline
                  rows={2}
                  fullWidth
                />
              </Box>
              <Box className={classes.field}>
                <Box display="flex" justifyContent="space-between">
                  <Typography>Make private</Typography>
                  <Input
                    value={private_list}
                    type="checkbox"
                    name="private_list"
                    onChange={inputAction}
                    sx={{ width: "20px" }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </form>
      </Modal>
    </>
  );
};

export default CreateListModal;
