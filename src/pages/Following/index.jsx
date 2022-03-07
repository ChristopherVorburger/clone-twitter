import React from "react";
import { Link } from "react-router-dom";

// Import composants MUI
import {
  BottomNavigation,
  Box,
  CircularProgress,
  Tab,
  Tabs,
} from "@mui/material";

// Import composants React
import Header from "../../components/Header";
import News from "../../components/News";

// import AuthContext
import { AuthContext } from "../../context/authContext";

// Import images
import { icons } from "../../constants";

// Import styles
import useStyles from "./styles";
import NoFollowing from "../../components/NoFollowing";
import WhoToFollow from "../../components/News/WhoToFollow";
import { useFirestore } from "../../utils/useFirestore";

// Liens pour la Nav Tab
function LinkTab(props) {
  return <Tab component={Link} {...props} />;
}

const Following = () => {
  const classes = useStyles();
  const auth = React.useContext(AuthContext);

  // State pour la nav tab
  const [value, setValue] = React.useState(0);

  // Fonction de la nav tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // On check si il y a des following
  const following = auth?.userData?.[0]?.following;

  // Utilisation du hook perso useFirestore pour récupérer les users
  const users = useFirestore("users");

  // Filtre des utilisateurs pour obtenir les suivis
  const followedUsers = users?.filter((user) => {
    return auth?.userData?.[0]?.following?.includes(user.id);
  });

  return (
    <Box display="flex" justifyContent="center">
      <Box
        display="flex"
        flexDirection="column"
        borderLeft="1px solid #eff3f4"
        borderRight="1px solid #eff3f4"
        maxWidth="590px"
        width="100%"
      >
        <Header
          title={auth.userData?.[0]?.name}
          subtitle={`@${auth.userData?.[0]?.username}`}
          iconsLeft={icons.ArrowBackIcon}
        />
        {/* Nav Tab */}
        <Box>
          <Box
            display="flex"
            justifyContent="center"
            width="100%"
            fontSize="font.main"
            textTransform="none"
          >
            <Tabs value={value} onChange={handleChange} aria-label="nav tabs">
              <LinkTab
                className={classes.following__link_nav}
                to={`/${auth?.userData?.[0]?.username}/following`}
                label="Following"
              />
              <LinkTab
                className={classes.following__link_nav}
                to={`/${auth?.userData?.[0]?.username}/followers`}
                label="Followers"
              />
            </Tabs>
          </Box>
        </Box>
        <Box>
          {followedUsers?.length === 0 ? <NoFollowing /> : null}
          {following ? (
            <>
              {followedUsers?.map((user) => (
                <Box key={user?.id}>
                  <WhoToFollow user={user} />
                </Box>
              ))}
            </>
          ) : (
            <CircularProgress />
          )}
        </Box>
      </Box>
      <Box>
        <News />
      </Box>
      <BottomNavigation />
    </Box>
  );
};

export default Following;
