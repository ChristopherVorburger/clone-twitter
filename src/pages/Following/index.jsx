import React from "react";
import { Link } from "react-router-dom";

// Import composants MUI
import { BottomNavigation, Box, Tab, Tabs } from "@mui/material";

// Import composants React
import Header from "../../components/Header";
import LeftNavbar from "../../components/LeftNavbar";
import News from "../../components/News";

// import AuthContext
import { AuthContext } from "../../context/authContext";

// Import images
import { icons } from "../../constants";

// Import styles
import useStyles from "./styles";
import NoFollowing from "../../components/NoFollowing";

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
          <NoFollowing />
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
