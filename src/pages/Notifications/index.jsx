import React from "react";
import { Link } from "react-router-dom";

import { Box } from "@mui/system";
import { Tab, Tabs } from "@mui/material";

import Header from "../../components/Header";
import News from "../../components/News";

import { icons } from "../../constants";

import { AuthContext } from "../../context/authContext";

import { useFirestoreWithQueryAndWhere } from "../../utils/useFirestoreWithQueryAndWhere";

import useStyles from "./styles";

// Liens pour la Nav Tab
function LinkTab(props) {
  return <Tab component={Link} {...props} />;
}

const Notifications = () => {
  const classes = useStyles();
  const auth = React.useContext(AuthContext);

  // State pour la nav tab
  const [value, setValue] = React.useState(0);

  // Fonction de la nav tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Utilisation du hook perso useFirestoreWithQuery pour récupérer uniquement les tweets
  // de l'utilisateur connecté dans l'ordre de publication
  const tweets = useFirestoreWithQueryAndWhere(
    "tweets",
    "author_id",
    `${auth.userData?.[0]?.id}`
  );

  console.log("tweets triés", tweets);

  return (
    <Box display="flex">
      <Box borderLeft="1px solid #eff3f4" borderRight="1px solid #eff3f4">
        <Header title="Notifications" iconsRight={icons.SettingsOutlinedIcon} />
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
                to={"/notifications"}
                label="All"
              />
              <LinkTab
                className={classes.following__link_nav}
                to={"/notifications/mentions"}
                label="Mentions"
              />
            </Tabs>
          </Box>
        </Box>
      </Box>
      <Box>
        <News />
      </Box>
    </Box>
  );
};

export default Notifications;
