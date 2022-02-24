import React from "react";
import {
  List,
  ListItemIcon,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { icons } from "../../constants";

import useStyles from "./styles";
import ProfileButton from "../buttons/ProfileButton";
import AddTweetButton from "../buttons/AddTweetButton";
import { Link } from "react-router-dom";

import { Box } from "@mui/system";

const LeftNavbar = () => {
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
    { name: icons.PersonOutlineOutlinedIcon, path: "/", text: "Profile" },
    { name: icons.MoreHorizIcon, path: "", text: "More" },
  ];
  return (
    <Box className={classes.container}>
      <Box className={classes.drawer}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100vh"
        >
          <Box display="flex" alignItems="flex-end" mr="1rem">
            <List>
              <ListItemButton sx={{ borderRadius: "50px" }}>
                <ListItemIcon
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    transform: "scale(1.2)",
                    color: "primary.main",
                    margin: "0.5rem",
                    minWidth: "20px",
                  }}
                >
                  <icons.TwitterIcon />
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
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        transform: "scale(1.2)",
                        m: "0.5rem",
                        minWidth: "20px",
                      }}
                    >
                      {icon.name.type.render()}
                    </ListItemIcon>
                    <ListItemText
                      className={classes.icon__text}
                      sx={{ ml: "1rem" }}
                    >
                      {icon.text}
                    </ListItemText>
                  </ListItemButton>
                );
              })}
              <ListItemButton
                sx={{
                  left: "1.5rem",
                  bottom: "-8.5rem",
                  backgroundColor: "white!important",
                }}
              >
                <ListItemIcon
                  sx={{
                    transform: "scale(1)",
                  }}
                >
                  <AddTweetButton />
                </ListItemIcon>
              </ListItemButton>
            </List>
          </Box>
          <Box mr="1rem">
            <ListItemButton sx={{ backgroundColor: "white!important" }}>
              <ListItemIcon
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  minWidth: "20px",
                }}
              >
                <ProfileButton />
              </ListItemIcon>
            </ListItemButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LeftNavbar;
