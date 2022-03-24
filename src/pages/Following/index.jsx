import React from "react";
import { Link, useParams } from "react-router-dom";

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
import NoFollowing from "../../components/NoFollowing";
import WhoToFollow from "../../components/News/WhoToFollow";

// import Context
import { useUsers } from "../../context/usersContext";

// Import images
import { icons } from "../../constants";

// Import styles
import useStyles from "./styles";

// Liens pour la Nav Tab
function LinkTab(props) {
  return <Tab component={Link} {...props} />;
}

const Following = () => {
  const classes = useStyles();

  // Contexte
  const { users } = useUsers();

  // UseParams pour récupérer le username
  const { username } = useParams();

  // Recherche du user qui matche
  const user = users?.filter((user) => {
    return user?.username === username;
  });

  // State pour la nav tab
  const [value, setValue] = React.useState(0);

  // Fonction de la nav tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // On check si il y a des following
  const following = user?.[0]?.following;

  // Filtre des utilisateurs pour obtenir les suivis
  const followedUsers = users?.filter((userInArray) => {
    return user?.[0]?.following?.includes(userInArray.id);
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
