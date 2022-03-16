import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

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

// Import Auth Context
import { AuthContext } from "../../context/authContext";
import { UsersContext } from "../../context/usersContext";

// Import des icones
import { icons } from "../../constants";

// Import des images
import { images } from "../../constants";

// Import hooks
import { useFirestoreWithQuery } from "../../utils/useFirestoreWithQuery";
import { useFirestore } from "../../utils/useFirestore";

// Import styles
import useStyles from "./styles";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { database } from "../../firebase-config";

// Liens pour la Nav Tab
function LinkTab(props) {
  return <Tab component={Link} {...props} />;
}

const ForeignProfile = () => {
  const classes = useStyles();
  const [textButton, setTextButton] = React.useState("Following");
  const navigate = useNavigate();

  // State pour la nav tab
  const [value, setValue] = React.useState(0);

  // Fonction de la nav tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { username } = useParams();

  // Utilisation du hook useContext pour récupérer le contexte Auth
  const auth = React.useContext(AuthContext);
  const users = React.useContext(UsersContext);

  console.log("users venant du contexte", users);

  // Utilisation du hook perso useFirestoreWithQuery pour récupérer les tweets dans l'ordre de publication
  const tweets = useFirestoreWithQuery("tweets");

  const user = users?.users?.filter((user) => {
    return user.username === username;
  });

  // Récupération du tableau de following de l'utilisateur connecté
  const following = auth?.userData?.[0]?.following;

  // Récupération du tableau de followers de l'utilisateur ciblé
  const followers = user?.followers;

  // Filtre des utilisateurs pour obtenir les non suivis
  const unfollowUsers = users?.users?.filter((user) => {
    return !user?.[0]?.following?.includes(user.id);
  });

  // Filtre les utilisateurs non suivis pour supprimer l'utilisateur connecté du tableau
  const filterUnfollowUsers = unfollowUsers?.filter((user) => {
    return user?.id !== auth?.authUser?.uid;
  });

  // On filtre les tweets à afficher
  // Ici en l'occurrence ceux qui ont le même author_id que la personne connectée
  const filteredTweets = tweets?.filter((tweet) => {
    return tweet.author_id === auth?.authUser?.uid;
  });

  // Référence à l'id de l'utilisateur connecté à mettre à jour
  const currentUserRef = doc(database, "users", auth?.authUser?.uid);

  // Référence à l'id de l'utilisateur ciblé à mettre à jour
  const followedUserRef = doc(database, "users", user?.[0]?.id);

  useEffect(() => {
    console.log("user use effect", user);
    if (user?.[0]?.username === undefined) {
      console.log("redirection 404");
    }
  }, [user]);

  // fonction pour ajouter un following
  const followUser = (e) => {
    e.preventDefault();

    // Sécurité pour ne pas se suivre soi-même
    if (auth?.authUser?.uid === user?.id) {
      console.log(
        "Oui, il faut s'aimer soi-même mais de là à se suivre soit même il y a des limites"
      );
      return;
    }

    // Sécurité pour ne pas suivre deux fois la même personne
    if (auth?.userData?.[0]?.following?.includes(user?.id)) {
      console.log("Vous suivez déjà cette personne !");
      return;
    }

    // Si l'utilisateur connecté n'a pas de following, on crée un tableau avec son
    // premier following
    if (!following) {
      updateDoc(currentUserRef, {
        following: [user?.id],
      })
        .then(() => {
          console.log("ajout d'un premier following");
          // Si l'utilisateur ajouté n'a pas de followers, on crée un tableau avec son
          // premier follower
          if (!followers) {
            updateDoc(followedUserRef, {
              followers: [auth?.authUser?.uid],
            })
              .then(() => {
                console.log("ajout d'un premier follower");
              })
              .catch((err) => {
                console.log(err.message);
              });
            // Sinon, mise à jour du tableau followers de l'utilisateur ajouté
          } else {
            updateDoc(followedUserRef, {
              followers: [...user?.followers, auth?.authUser?.uid],
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
        following: [...auth?.userData?.[0]?.following, user?.id],
      })
        .then(() => {
          console.log("ajout d'un following");
          // Si l'utilisateur ajouté n'a pas de followers, on crée un tableau avec son
          // premier follower
          if (!followers) {
            updateDoc(followedUserRef, {
              followers: [auth?.authUser?.uid],
            })
              .then(() => {
                console.log("ajout d'un premier follower");
              })
              .catch((err) => {
                console.log(err.message);
              });
            // Sinon, mise à jour du tableau followers de l'utilisateur ajouté
          } else {
            updateDoc(followedUserRef, {
              followers: [...user?.followers, auth?.authUser?.uid],
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
      following: arrayRemove(user?.id),
    });
    // Suppression du follower dans les datas de l'utilisateur supprimé
    updateDoc(followedUserRef, {
      followers: arrayRemove(auth?.authUser?.uid),
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
          {/* TODO: Rendre dynamique le subtitle */}
          <Header
            title={user?.[0]?.name}
            iconsLeft={icons.ArrowBackIcon}
            subtitle={"10 tweets"}
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
                    <img className={classes.avatar} src={images.user} alt="" />
                  </Box>
                </Box>
              )}
              <Box
                onMouseEnter={() => setTextButton("Unfollow")}
                onMouseLeave={() => setTextButton("Following")}
              >
                {auth?.userData?.[0]?.following?.includes(user?.id) ? (
                  <Button
                    className={classes.button}
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
              {tweets ? (
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
                if (user?.id === auth?.authUser?.uid) {
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
        </Box>
        <News />
      </Box>
      <BottomNavigation />
    </>
  );
};

export default ForeignProfile;
