import React from "react";
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

// Import des icones
import { icons } from "../../constants";

// Import des images
import { images } from "../../constants";

// Import hooks
import { useFirestoreWithQuery } from "../../utils/useFirestoreWithQuery";
import { useFirestore } from "../../utils/useFirestore";

// Import styles
import useStyles from "./styles";

// Liens pour la Nav Tab
function LinkTab(props) {
  return <Tab component={Link} {...props} />;
}

const Profile = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  // State pour la nav tab
  const [value, setValue] = React.useState(0);

  // Fonction de la nav tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Utilisation du hook useContext pour récupérer le contexte Auth
  const { username } = useParams();
  const auth = React.useContext(AuthContext);

  // Test si c'est la page de l'utilisateur connecté ou pas
  if (auth.userData?.[0]?.username !== username) {
    console.log("Autre utilisateur");
  }

  // Utilisation du hook perso useFirestoreWithQuery pour récupérer les tweets dans l'ordre de publication
  const tweets = useFirestoreWithQuery("tweets");

  // Utilisation du hook perso useFirestore pour récupérer les users
  const users = useFirestore("users");

  // Filtre des utilisateurs pour obtenir les non suivis
  const unfollowUsers = users?.filter((user) => {
    return !auth?.userData?.[0]?.following?.includes(user.id);
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
            title={auth.userData?.[0]?.name}
            iconsLeft={icons.ArrowBackIcon}
            subtitle={"10 tweets"}
          />
          {/* Premier bloc */}
          <Box maxWidth="590px" maxHeight="200px">
            {auth?.userData?.[0]?.cover_url ? (
              <img
                className={classes.profile__cover}
                src={auth?.userData?.[0]?.cover_url}
                alt=""
              />
            ) : (
              <img
                className={classes.profile__cover}
                src={images.w11}
                alt=""
                width="100%"
                height="100%"
              />
            )}
          </Box>
          <Box mb="1rem" p="12px 1rem 0 1rem">
            <Box display="flex" justifyContent="space-between" mb="2rem">
              {auth?.userData?.[0]?.profile_image_url ? (
                <Box>
                  <img
                    className={classes.avatar}
                    src={auth?.userData?.[0]?.profile_image_url}
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
              <Box>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/settings/profile")}
                  className={classes.profile__button}
                >
                  <Typography color="black.main" fontWeight="mainBold">
                    Edit profile
                  </Typography>
                </Button>
              </Box>
            </Box>
            <Box m="4px 0 12px 0">
              <Typography
                fontSize="font.large"
                lineHeight="24px"
                fontWeight="mainBold"
              >
                {auth?.userData?.[0]?.name}
              </Typography>
              <Typography fontSize="font.main" color="grey.main">
                {`@${auth?.userData?.[0]?.username}`}
              </Typography>
            </Box>
            <Box mb="12px">
              <Box>
                <Typography fontSize="font.main">
                  {auth?.userData?.[0]?.description}
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
                <Typography>{auth?.userData?.[0]?.location}</Typography>
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
                  to={`/${auth?.userData?.[0]?.username}/following`}
                  textDecoration="none"
                  className={classes.profile__link}
                >
                  <Box display="flex" color="black.main">
                    <Typography fontWeight="mainBold" mr="4px">
                      {auth?.userData?.[0]?.following?.length}
                    </Typography>
                    <Typography>Following</Typography>
                  </Box>
                </Link>
              </Box>
              <Box>
                <Link
                  to={`/${auth?.userData?.[0]?.username}/followers`}
                  className={classes.profile__link}
                >
                  <Box display="flex" color="black.main">
                    <Typography fontWeight="mainBold" mr="4px">
                      {auth?.userData?.[0]?.followers?.length}
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
                  to={`/${auth?.userData?.[0]?.username}`}
                  label="Tweet"
                />
                <LinkTab
                  className={classes.profile__link_nav}
                  to={`/${auth?.userData?.[0]?.username}/with_replies`}
                  label="Tweet & replies"
                />
                <LinkTab
                  className={classes.profile__link_nav}
                  to={`/${auth?.userData?.[0]?.username}/media`}
                  label="Media"
                />
                <LinkTab
                  className={classes.profile__link_nav}
                  to={`/${auth?.userData?.[0]?.username}/likes`}
                  label="Likes"
                />
              </Tabs>
            </Box>
            {/* Tweets de l'utilisateur connecté */}
            <Box>
              {tweets ? (
                <>
                  {filteredTweets.map((tweet) => (
                    <Tweet
                      key={tweet.id}
                      text={tweet.text}
                      author_id={tweet.author_id}
                      created_at={tweet.created_at}
                    />
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

export default Profile;
