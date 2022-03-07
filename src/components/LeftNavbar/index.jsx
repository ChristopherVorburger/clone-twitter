import React from "react";
import {
  List,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";

import { icons, images } from "../../constants";

import useStyles from "./styles";
import AddTweetButton from "../buttons/AddTweetButton";
import { Link } from "react-router-dom";

import { Box } from "@mui/system";

import { AuthContext } from "../../context/authContext";
import ClassicButton from "../buttons/ClassicButton";

const LeftNavbar = () => {
  // Utilisation du hook useContext pour récupérer le contexte Auth
  const auth = React.useContext(AuthContext);

  const classes = useStyles();

  const iconsArray = [
    { name: icons.HomeSharpIcon, path: "/home", text: "Home" },
    { name: icons.SearchSharpIcon, path: "/explore", text: "Explore" },
    {
      name: icons.NotificationsOutlinedIcon,
      path: "/notifications",
      text: "Notifications",
    },
    { name: icons.EmailOutlinedIcon, path: "/messages", text: "Messages" },
    { name: icons.BookmarkBorderIcon, path: "/bookmarks", text: "Bookmarks" },
    { name: icons.FeaturedPlayListOutlinedIcon, path: "/", text: "Lists" },
    {
      name: icons.PersonOutlineOutlinedIcon,
      path: `/${auth?.userData?.[0]?.username}`,
      text: "Profile",
    },
    { name: icons.MoreHorizIcon, path: "", text: "More" },
  ];

  return (
    <Box className={classes.container}>
      <Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100vh"
        >
          <Box>
            <List>
              <ListItemButton sx={{ borderRadius: "50px" }}>
                <ListItemIcon
                  sx={{
                    mb: "0.5rem",
                    display: "flex",
                    justifyContent: "center",
                    transform: "scale(1.2)",
                    color: "primary.main",
                  }}
                >
                  <icons.TwitterIcon data-testid="TwitterIcon" />
                </ListItemIcon>
              </ListItemButton>
              {/* Loop through the 'iconsArray' array and use the render() function to display the component */}
              {iconsArray.map((icon, index) => {
                return (
                  <ListItemButton
                    component={Link}
                    to={icon.path}
                    key={index}
                    sx={{ borderRadius: "50px" }}
                  >
                    <ListItemIcon
                      className={classes.icons}
                      sx={{
                        mb: "0.5rem",
                        display: "flex",
                        justifyContent: "center",
                        transform: "scale(1.2)",
                        color: "black.main",
                      }}
                    >
                      {icon.name.type.render()}
                    </ListItemIcon>
                    <ListItemText
                      className={classes.icon__text}
                      sx={{
                        fontSize: "font.large",
                        color: "black.main",
                      }}
                    >
                      {icon.text}
                    </ListItemText>
                  </ListItemButton>
                );
              })}
              <ListItemButton
                className={classes.add_tweet__button}
                sx={{
                  right: "2.5rem",
                  bottom: "-8rem",
                  backgroundColor: "transparent!important",
                }}
              >
                <ListItemIcon>
                  <AddTweetButton />
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon className={classes.add_tweet__button_large}>
                  <ClassicButton text={"Tweet"} />
                </ListItemIcon>
              </ListItemButton>
            </List>
          </Box>
          <Box
            className={classes.profile_section}
            sx={{
              borderRadius: "50px",
              padding: "12px",
            }}
          >
            <Box display="flex" justifyContent="center" alignItems="center">
              <Box width="50px" height="50px" marginRight="0.5rem">
                <img
                  className={classes.profile_section__avatar_button}
                  style={{ border: "1px solid lightgrey" }}
                  src={images.user}
                  alt="user avatar"
                />
              </Box>
              <Box
                className={classes.profile_section__avatar_texts}
                flexGrow="1"
              >
                <Typography fontSize="font.main" fontWeight="mainBold">
                  {auth.userData?.[0]?.name}
                </Typography>
                <Typography fontSize="font.main" color="grey.main">
                  @{auth.userData?.[0]?.username}
                </Typography>
              </Box>
              <Box>
                <Box className={classes.profile_section__icon_more}>
                  {icons.MoreHorizIcon.type.render()}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LeftNavbar;
