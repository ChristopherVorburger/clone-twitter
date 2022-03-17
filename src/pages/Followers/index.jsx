import React from "react";
import { Link, useParams } from "react-router-dom";

import Header from "../../components/Header";
import News from "../../components/News";

// Import composants MUI
import {
  BottomNavigation,
  Box,
  CircularProgress,
  Tab,
  Tabs,
} from "@mui/material";

import NoFollowers from "../../components/NoFollowers";
import WhoToFollow from "../../components/News/WhoToFollow";

// import AuthContext
import { UsersContext } from "../../context/usersContext";

// Import images
import { icons } from "../../constants";

// Import styles
import useStyles from "./styles";

// Liens pour la Nav Tab
function LinkTab(props) {
  return <Tab component={Link} {...props} />;
}

const Followers = () => {
  const classes = useStyles();

  // Contexte
  const users = React.useContext(UsersContext);

  // UseParams pour récupérer le username
  const { username } = useParams();

  // Recherche du user qui matche
  const user = users?.users?.filter((user) => {
    return user?.username === username;
  });

  // State pour la nav tab
  const [value, setValue] = React.useState(1);

  // Fonction de la nav tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // On check si il y a des following
  const followers = user?.[0]?.followers;

  // Filtre des utilisateurs pour obtenir les suivis
  const followersUsers = users?.users?.filter((userInArray) => {
    return user?.[0]?.followers?.includes(userInArray.id);
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
          title={user?.[0]?.name}
          subtitle={`@${user?.[0]?.username}`}
          iconsLeft={icons.ArrowBackIcon}
          navigatePath={`/${user?.[0]?.username}`}
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
                to={`/${user?.[0]?.username}/following`}
                label="Following"
              />
              <LinkTab
                className={classes.following__link_nav}
                to={`/${user?.[0]?.username}/followers`}
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
