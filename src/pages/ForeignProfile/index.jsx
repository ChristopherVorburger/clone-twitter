import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import {
  Box,
  Button,
  CircularProgress,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

// Import composants React
import Header from "../../components/Header";
import News from "../../components/News";
import BottomNavigation from "../../components/BottomNavigation";
import Tweet from "../../components/Tweet/Tweet";
import WhoToFollow from "../../components/News/WhoToFollow";
import InexistingAccount from "../../components/InexistingAccount";

// Import Auth Context
import { useAuth } from "../../context/authContext";
import { useUsers } from "../../context/usersContext";
import { useTweets } from "../../context/tweetContext";

// Import des icones
import { icons } from "../../constants";

// Import des images
import { images } from "../../constants";

import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { database } from "../../firebase-config";

import useStyles from "./styles";

// Liens pour la Nav Tab
function LinkTab(props) {
  return <Tab component={Link} {...props} />;
}

const ForeignProfile = () => {
  const classes = useStyles();
  const { username } = useParams();

  // State pour le bouton Following/Unfollow
  const [textButton, setTextButton] = React.useState("Following");

  // State pour afficher compte inexistant si aucun user n'est trouvé
  const [inexistingAccount, setInexistingAccount] = React.useState(false);

  // State pour la nav tab
  const [value, setValue] = React.useState(0);

  // Fonction de la nav tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Utilisation des contextes Auth et Users
  const { authUser, userData } = useAuth();
  const { users } = useUsers();
  const { tweetsByDate } = useTweets();

  // Récupération du user en fonction du username dans l'url via useParams()
  const user = users?.filter((user) => {
    return user.username === username;
  });

  // Récupération du tableau de following de l'utilisateur connecté
  const following = userData?.[0]?.following;

  // Récupération du tableau de followers de l'utilisateur ciblé
  const followers = user?.[0]?.followers;

  // Filtre des utilisateurs pour obtenir les non suivis
  const unfollowUsers = users?.filter((user) => {
    return !user?.[0]?.following?.includes(user.id);
  });

  // Filtre les utilisateurs non suivis pour supprimer l'utilisateur connecté du tableau
  const filterUnfollowUsers = unfollowUsers?.filter((user) => {
    return user?.id !== authUser?.uid;
  });

  // On filtre les tweets à afficher
  // Ici les tweets du user en question
  const filteredTweets = tweetsByDate?.filter((tweet) => {
    return tweet.author_id === user?.[0]?.id;
  });

  // Référence à l'id de l'utilisateur connecté à mettre à jour
  const currentUserRef = doc(database, "users", authUser?.uid);

  // On écoute le changement de username et donc le changement d'url
  useEffect(() => {
    // Réinitialisation su state à false
    setInexistingAccount(false);
    // Si aucun user n'est trouvé on affiche le composant compte inexistant
    if (user?.[0]?.username === undefined) {
      setInexistingAccount(true);
    }
  }, [user]);

  // fonction pour ajouter un following
  const followUser = (e) => {
    e.preventDefault();

    // Sécurité pour ne pas se suivre soi-même
    if (authUser?.uid === user?.[0]?.id) {
      console.log(
        "Oui, il faut s'aimer soi-même mais de là à se suivre soit même il y a des limites"
      );
      return;
    }

    // Sécurité pour ne pas suivre deux fois la même personne
    if (userData?.[0]?.following?.includes(user?.[0]?.id)) {
      console.log("Vous suivez déjà cette personne !");
      return;
    }

    // Si l'utilisateur connecté n'a pas de following, on crée un tableau avec son
    // premier following
    if (!following) {
      updateDoc(currentUserRef, {
        following: [user?.[0]?.id],
      })
        .then(() => {
          console.log("ajout d'un premier following");
          // Si l'utilisateur ajouté n'a pas de followers, on crée un tableau avec son
          // premier follower
          if (!followers) {
            updateDoc(doc(database, "users", user?.[0]?.id), {
              followers: [authUser?.uid],
            })
              .then(() => {
                console.log("ajout d'un premier follower");
              })
              .catch((err) => {
                console.log(err.message);
              });
            // Sinon, mise à jour du tableau followers de l'utilisateur ajouté
          } else {
            updateDoc(doc(database, "users", user?.[0]?.id), {
              followers: [...user?.[0]?.followers, authUser?.uid],
            })
              .then(() => {
                console.log("ajout d'un follower");
              })
              .catch((err) => {
                console.log(err.message);
              });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
      // Sinon, mise à jour du tableau following
    } else {
      updateDoc(currentUserRef, {
        following: [...userData?.[0]?.following, user?.[0]?.id],
      })
        .then(() => {
          console.log("ajout d'un following");
          // Si l'utilisateur ajouté n'a pas de followers, on crée un tableau avec son
          // premier follower
          if (!followers) {
            updateDoc(doc(database, "users", user?.[0]?.id), {
              followers: [authUser?.uid],
            })
              .then(() => {
                console.log("ajout d'un premier follower");
              })
              .catch((err) => {
                console.log(err.message);
              });
            // Sinon, mise à jour du tableau followers de l'utilisateur ajouté
          } else {
            updateDoc(doc(database, "users", user?.[0]?.id), {
              followers: [...user?.[0]?.followers, authUser?.uid],
            })
              .then(() => {
                console.log("ajout d'un follower");
              })
              .catch((err) => {
                console.log(err.message);
              });
          }
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  // Fonction pour unfollow
  const unfollowUser = () => {
    // Suppression du following dans les datas de l'utilisateur connecté
    updateDoc(currentUserRef, {
      following: arrayRemove(user?.[0]?.id),
    })
      .then(() => {
        // Suppression du follower dans les datas de l'utilisateur supprimé
        updateDoc(doc(database, "users", user?.[0]?.id), {
          followers: arrayRemove(authUser?.uid),
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <>
      <Box
        className={classes.profile__container}
        display="flex"
        justifyContent="center"
      >
        <Box
          display="flex"
          flexDirection="column"
          borderLeft="1px solid #eff3f4"
          borderRight="1px solid #eff3f4"
          maxWidth="590px"
          width="100%"
        >
          {/* Si le compte n'existe pas, on affiche le composant inexistingAccount sinon le profil du user en question */}
          {inexistingAccount ? (
            <InexistingAccount />
          ) : (
            <>
              <Header
                title={user?.[0]?.name}
                iconsLeft={icons.ArrowBackIcon}
                subtitle={`${filteredTweets?.length} tweets`}
              />
              {/* Premier bloc */}
              <Box maxWidth="590px" maxHeight="200px">
                {user?.[0]?.cover_url ? (
                  <img
                    className={classes.profile__cover}
                    src={user?.[0]?.cover_url}
                    alt=""
                  />
                ) : (
                  <img
                    className={classes.profile__cover_default}
                    alt=""
                    width="100%"
                    height="100%"
                  />
                )}
              </Box>
              <Box mb="1rem" p="12px 1rem 0 1rem">
                <Box display="flex" justifyContent="space-between" mb="2rem">
                  {user?.[0]?.profile_image_url ? (
                    <Box>
                      <img
                        className={classes.avatar}
                        src={user?.[0]?.profile_image_url}
                        alt=""
                      />
                    </Box>
                  ) : (
                    <Box sx={{}}>
                      <Box>
                        <img
                          className={classes.avatar}
                          src={images.user}
                          alt=""
                        />
                      </Box>
                    </Box>
                  )}
                  <Box>
                    {userData?.[0]?.following?.includes(user?.[0]?.id) ? (
                      <Button
                        className={classes.button}
                        onMouseEnter={() => setTextButton("Unfollow")}
                        onMouseLeave={() => setTextButton("Following")}
                        variant="outlined"
                        disableElevation
                        sx={{
                          color: "black.main",
                          fontSize: "font.small",
                          fontWeight: "mainBold",
                          backgroundColor: "white.main",
                          borderColor: "grey.button",
                          borderRadius: "50px",
                          textTransform: "none",
                          minWidth: "6rem",
                          "&:hover": {
                            backgroundColor: "#fdc9ce!important",
                            borderColor: "#f4212e!important",
                            color: "#f4212e!important",
                          },
                        }}
                        onClick={unfollowUser}
                      >
                        {textButton}
                      </Button>
                    ) : (
                      <Button
                        className={classes.button_black}
                        variant="contained"
                        sx={{
                          fontSize: "font.small",
                          fontWeight: "mainBold",
                          backgroundColor: "black.main",
                          borderRadius: "50px",
                          textTransform: "none",
                        }}
                        onClick={followUser}
                      >
                        Follow
                      </Button>
                    )}
                  </Box>
                </Box>
                <Box m="4px 0 12px 0">
                  <Typography
                    fontSize="font.large"
                    lineHeight="24px"
                    fontWeight="mainBold"
                  >
                    {user?.[0]?.name}
                  </Typography>
                  <Typography fontSize="font.main" color="grey.main">
                    {`@${user?.[0]?.username}`}
                  </Typography>
                </Box>
                <Box mb="12px">
                  <Box>
                    <Typography fontSize="font.main">
                      {user?.[0]?.description}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography fontSize="font.small" color="primary.main">
                      Translate bio
                    </Typography>
                  </Box>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  fontSize="font.main"
                  color="grey.main"
                  mb="12px"
                >
                  <Box display="flex" alignItems="center" mr="12px">
                    <Typography fontSize="font.large" mr="4px">
                      <icons.FmdGoodOutlinedIcon />
                    </Typography>
                    <Typography>{user?.[0]?.location}</Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <Typography fontSize="font.large" mr="4px">
                      <icons.DateRangeOutlinedIcon />
                    </Typography>
                    <Typography>Joined February 2022</Typography>
                  </Box>
                </Box>
                <Box display="flex" fontSize="font.main">
                  <Box mr="20px">
                    <Link
                      to={`/${user?.[0]?.username}/following`}
                      textDecoration="none"
                      className={classes.profile__link}
                    >
                      <Box display="flex" color="black.main">
                        <Typography fontWeight="mainBold" mr="4px">
                          {user?.[0]?.following?.length}
                        </Typography>
                        <Typography>Following</Typography>
                      </Box>
                    </Link>
                  </Box>
                  <Box>
                    <Link
                      to={`/${user?.[0]?.username}/followers`}
                      className={classes.profile__link}
                    >
                      <Box display="flex" color="black.main">
                        <Typography fontWeight="mainBold" mr="4px">
                          {user?.[0]?.followers?.length}
                        </Typography>
                        <Typography>Followers</Typography>
                      </Box>
                    </Link>
                  </Box>
                </Box>
                {/* Nav Tab */}
                <Box
                  display="flex"
                  justifyContent="center"
                  width="100%"
                  fontSize="font.main"
                  textTransform="none"
                >
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="nav tabs example"
                  >
                    <LinkTab
                      className={classes.profile__link_nav}
                      to={`/${user?.[0]?.username}`}
                      label="Tweet"
                    />
                    <LinkTab
                      className={classes.profile__link_nav}
                      to={`/${user?.[0]?.username}/with_replies`}
                      label="Tweet & replies"
                    />
                    <LinkTab
                      className={classes.profile__link_nav}
                      to={`/${user?.[0]?.username}/media`}
                      label="Media"
                    />
                    <LinkTab
                      className={classes.profile__link_nav}
                      to={`/${user?.[0]?.username}/likes`}
                      label="Likes"
                    />
                  </Tabs>
                </Box>
                {/* Tweets de l'utilisateur connecté */}
                <Box>
                  {tweetsByDate ? (
                    <>
                      {filteredTweets.map((tweet) => (
                        <Tweet key={tweet.id} tweet={tweet} />
                      ))}
                    </>
                  ) : (
                    <CircularProgress />
                  )}
                </Box>
                {/* Utilisateurs pouvant être suivis */}
                <Box>
                  {filterUnfollowUsers?.slice(0, 3).map((user) => {
                    // On affiche pas l'utilisateur connecté
                    if (user?.id === authUser?.uid) {
                      return null;
                    } else {
                      return (
                        <Box key={user?.id}>
                          <WhoToFollow user={user} />
                        </Box>
                      );
                    }
                  })}
                  {/* TODO: Ajouter le 'voir plus' */}
                </Box>
              </Box>
            </>
          )}
        </Box>
        <News />
      </Box>
      <BottomNavigation />
    </>
  );
};

export default ForeignProfile;
