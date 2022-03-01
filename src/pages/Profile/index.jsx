import React from "react";
import { Link, useParams } from "react-router-dom";

import {
  Box,
  Button,
  CircularProgress,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import Header from "../../components/Header";
import LeftNavbar from "../../components/LeftNavbar";
import News from "../../components/News";
import BottomNavigation from "../../components/BottomNavigation";

import { AuthContext } from "../../context/authContext";

//Import des icones
import { icons } from "../../constants";

//Import des images
import { images } from "../../constants";

import useStyles from "./styles";
import { useFirestoreWithQuery } from "../../utils/useFirestoreWithQuery";
import Tweet from "../../components/Tweet/Tweet";

// Liens pour la Nav Tab
function LinkTab(props) {
  return <Tab component={Link} {...props} />;
}

const Profile = () => {
  const classes = useStyles();

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
        <LeftNavbar />
        <Box
          display="flex"
          flexDirection="column"
          borderLeft="1px solid #eff3f4"
          borderRight="1px solid #eff3f4"
          maxWidth="590px"
          width="100%"
        >
          {/* TODO: Rendre dynamique le subtitle */}
          <Header iconsLeft={icons.ArrowBackIcon} subtitle={"10 tweets"} />
          {/* Premier bloc */}
          <Box maxWidth="590px" maxHeight="200px">
            <img
              className={classes.profile__cover}
              src={images.w11}
              alt=""
              width="100%"
              height="100%"
            />
          </Box>
          <Box mb="1rem" p="12px 1rem 0 1rem">
            <Box display="flex" justifyContent="space-between">
              <Box>Image profil</Box>
              <Box>
                <Button variant="outlined" className={classes.profile__button}>
                  <Typography color="black.main" fontWeight="mainBold">
                    Edit profile
                  </Typography>
                </Button>
              </Box>
            </Box>
            <Box m="4px 0 12px 0">
              <Typography
                fontSize="fontSize.large"
                lineHeight="24px"
                fontWeight="mainBold"
              >
                {auth?.userData?.[0]?.name}
              </Typography>
              <Typography fontSize="fontSize.main" color="grey.main">
                {`@${auth?.userData?.[0]?.username}`}
              </Typography>
            </Box>
            <Box mb="12px">
              <Box>
                <Typography fontSize="fontSize.main">Description</Typography>
              </Box>
              <Box>
                <Typography fontSize="fontSize.small" color="primary.main">
                  Translate bio
                </Typography>
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              fontSize="fontSize.main"
              color="grey.main"
              mb="12px"
            >
              <Box display="flex" alignItems="center" mr="12px">
                <Typography fontSize="fontSize.large" mr="4px">
                  <icons.FmdGoodOutlinedIcon />
                </Typography>
                <Typography>Caravane</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Typography fontSize="fontSize.large" mr="4px">
                  <icons.DateRangeOutlinedIcon />
                </Typography>
                <Typography>Joined February 2022</Typography>
              </Box>
            </Box>
            <Box display="flex" fontSize="fontSize.main">
              <Box mr="20px">
                <Link
                  to="/following"
                  textDecoration="none"
                  className={classes.profile__link}
                >
                  <Box display="flex" color="black.main">
                    <Typography fontWeight="mainBold" mr="4px">
                      1
                    </Typography>
                    <Typography>Following</Typography>
                  </Box>
                </Link>
              </Box>
              <Box>
                <Link to="/followers" className={classes.profile__link}>
                  <Box display="flex" color="black.main">
                    <Typography fontWeight="mainBold" mr="4px">
                      1
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
              fontSize="fontSize.main"
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
          </Box>
        </Box>
        <News />
      </Box>
      <BottomNavigation />
    </>
  );
};

export default Profile;
