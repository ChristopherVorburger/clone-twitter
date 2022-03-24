import { useState, useContext, useReducer, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

// Fonctions firebase
import { database, storage } from "../../firebase-config";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";

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
import { useAuth } from "../../context/authContext";
import { ListsContext } from "../../context/listsContext";
import { useFirestore } from "../../utils/useFirestore";

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

const EditListModal = () => {
  const { id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();

  // States pour la modale
  const [, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const [nameError, setNameError] = useState(false);

  const [coverSelected, setCoverSelected] = useState([]);
  const [coverFile, setCoverFile] = useState();

  //Utilisation du contexte Auth
  const { userData } = useAuth();
  const lists = useContext(ListsContext);

  const users = useFirestore("users");

  const matchedList = lists?.lists?.filter((list) => {
    return list.id === id;
  });

  // Valeurs de départ pour le reducer
  const initialValue = {
    name: matchedList?.[0]?.name,
    description: matchedList?.[0]?.description,
    private_list: false,
    cover_url: matchedList?.[0]?.cover_url,
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

  // Gestion du champ input name vide
  useEffect(() => {
    if (name?.length === 0) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  }, [name]);

  // Référence de la liste à mettre à jour
  const currentListRef = doc(database, "lists", matchedList?.[0]?.id);

  // Fonction pour éditer une liste
  const handleSubmit = async (e) => {
    e.preventDefault();

    setNameError(false);
    if (state.name === "") {
      setNameError(true);
    }

    // Si pas de nouvelle image de profil ou de cover, mise à jour des données des inputs
    if (coverSelected.name === undefined) {
      updateDoc(currentListRef, {
        name,
        description,
        private_list,
      })
        .then(() => {
          console.log(`Mise à jour de la liste ${matchedList?.[0]?.name}`);
          navigate(`/${userData?.[0]?.username}/lists`);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
    // Sinon mise à jour de toutes les données
    else {
      // Référence du storage
      const listCoversRef = ref(
        storage,
        `images/listCovers/${coverSelected.name}`
      );

      // Upload de la cover dans le firebase storage
      await uploadBytes(listCoversRef, coverSelected);

      // On obtient les urls avec getDownloadUrl
      const coverLink = await getDownloadURL(listCoversRef);

      updateDoc(currentListRef, {
        name,
        description,
        private_list,
        cover_url: coverLink,
      })
        .then(() => {
          console.log(`Mise à jour de la liste ${matchedList?.[0]?.name}`);
          navigate(`/${userData?.[0]?.username}/lists`);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  // Création d'un tableau pour stocker les utilisateurs en lien avec la liste
  const usersWhoPinnedRefs = [];

  // Recherche des utilisateurs en lien avec la liste (pins ou followers)
  users?.filter((user) => {
    if (user?.pinned_lists?.includes(matchedList?.[0]?.id))
      return usersWhoPinnedRefs.push(doc(database, "users", user.id));
    else return null;
  });

  // Fonction pour supprimer une liste
  const deleteList = async (e) => {
    e.preventDefault();
    // Suppression des pins et des followers de la liste
    usersWhoPinnedRefs.map((user) => {
      return updateDoc(user, {
        lists: arrayRemove(matchedList?.[0]?.id),
        pinned_lists: arrayRemove(matchedList?.[0]?.id),
      })
        .then(() => {
          console.log(
            `Suppression des pins et des followers de la liste ${matchedList?.[0]?.name}`
          );
          deleteDoc(currentListRef)
            .then(() => {
              console.log(`Suppression de la liste ${matchedList?.[0]?.name}`);
            })
            .catch((err) => {
              console.log(err.message);
            });
        })
        .catch((err) => {
          console.log(err.message);
        });
    });
    navigate(`/${userData?.[0]?.username}/lists`);
  };

  console.log(nameError);

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
                      navigate(`/${userData?.[0]?.username}/lists`)
                    }
                    sx={{ padding: "0.5rem", marginRight: "1rem" }}
                  >
                    <icons.CloseIcon />
                  </IconButton>
                </Box>
                <Box flexGrow={1}>
                  <Typography fontSize="font.large" fontWeight="mainBold">
                    Edit List
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
                    Done
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
                  label="Description"
                  multiline
                  rows={2}
                  fullWidth
                />
              </Box>
              <Box className={classes.field} borderBottom="1px solid #eff3f4">
                <Box display="flex" flexDirection="column">
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
                  <Box>
                    <Typography fontSize="font.small" color="grey.main">
                      When you make a List private, only you can see it.
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                className={classes.field}
                component={Link}
                to={`/lists/${id}/members`}
                sx={{
                  textDecoration: "none",
                  color: "black.main",
                }}
                display="flex"
                justifyContent="space-between"
              >
                <Box>
                  <Typography>Manage members</Typography>
                </Box>
                <Box sx={{ transform: "rotate(180deg)" }}>
                  {icons.ArrowBackIcon.type.render()}
                </Box>
              </Box>
              <Box
                className={classes.field}
                p="1rem"
                sx={{
                  color: "red",
                }}
                display="flex"
                justifyContent="center"
              >
                <Box
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  <Typography fontSize="font.main" onClick={deleteList}>
                    Delete List
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </form>
      </Modal>
    </>
  );
};

export default EditListModal;
