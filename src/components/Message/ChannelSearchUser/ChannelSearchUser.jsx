import { useState, useContext, useReducer, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Fonctions firebase
import { database, storage } from '../../../firebase-config';
import { doc, updateDoc } from 'firebase/firestore';
import { useFirestore } from '../../../utils/useFirestore';

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Composants MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Autocomplete, IconButton, TextField } from '@mui/material';

// Icones et images
import { icons, images } from '../../../constants';

// Styles
import useStyles from './styles';

// Context
import { AuthContext } from '../../../context/authContext';
import ChannelItem from '../ChannelItem/ChannelItem';

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'update':
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const ChannelSearchUser = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const users = useFirestore('users');

  // States pour la modale
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [nameError, setNameError] = useState(false);
  const [imageSelected, setImageSelected] = useState([]);
  const [coverSelected, setCoverSelected] = useState([]);
  const [file, setFile] = useState();
  const [coverFile, setCoverFile] = useState();

  console.log('imageselected', imageSelected);
  console.log('coverselected', coverSelected);
  console.log('file', file);

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
      type: 'update',
      payload: { key: event.target.name, value: event.target.value },
    });
  };

  // Référence à l'id de l'utilisateur connecté à mettre à jour
  const currentUserRef = doc(database, 'users', auth?.authUser?.uid);

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
    if (state.name === '') {
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
                    sx={{ padding: '0.5rem', marginRight: '1rem' }}
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
                      fontSize: 'font.small',
                      fontWeight: 'mainBold',
                      backgroundColor: 'black.main',
                      borderRadius: '50px',
                    }}
                    disabled={nameError}
                  >
                    Next
                  </Button>
                </Box>
              </Box>
              <Box mb="3rem"></Box>
              <Box className={classes.field}>
                {users ? (
                  <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={users}
                    getOptionLabel={(option) => option.name}
                    //   defaultValue={[top100Films[13]]}
                    renderOption={(props, option, { selected }) => (
                      <Box
                        key={option.id}
                        className={classes.profile_section}
                        sx={{
                          //   borderRadius: '50px',
                          padding: '12px',
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
                              style={{ border: '1px solid lightgrey' }}
                              src={
                                option?.profile_image_url &&
                                option?.profile_image_url != ''
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
