import React from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import LeftNavbar from "../../components/LeftNavbar";
import News from "../../components/News";

// Import composants MUI
import {
  BottomNavigation,
  Box,
  CircularProgress,
  Tab,
  Tabs,
} from "@mui/material";

// import AuthContext
import { AuthContext } from "../../context/authContext";

// Import images
import { icons } from "../../constants";

// Import styles
import useStyles from "./styles";
import { useFirestore } from "../../utils/useFirestore";
import NoFollowers from "../../components/NoFollowers";
import WhoToFollow from "../../components/News/WhoToFollow";

// Liens pour la Nav Tab
function LinkTab(props) {
  return <Tab component={Link} {...props} />;
}

const Followers = () => {
  const classes = useStyles();
  const auth = React.useContext(AuthContext);

  // State pour la nav tab
  const [value, setValue] = React.useState(1);

  // Fonction de la nav tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // On check si il y a des following
  const followers = auth?.userData?.[0]?.followers;

  // Utilisation du hook perso useFirestore pour récupérer les users
  const users = useFirestore("users");

  // Filtre des utilisateurs pour obtenir les suivis
  const followersUsers = users?.filter((user) => {
    return auth?.userData?.[0]?.followers?.includes(user.id);
  });

  return (
    <Box display="flex" justifyContent="center">
      <LeftNavbar />
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
          {followersUsers?.length === 0 ? <NoFollowers /> : null}
          {followers ? (
            <>
              {followersUsers?.map((user) => (
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

export default Followers;
