import React from "react";
import { List, ListItem, ListItemIcon, ListItemButton } from "@mui/material";

import { icons } from "../../constants";

import useStyles from "./styles";
import ProfileButton from "../buttons/ProfileButton";
import AddTweetButton from "../buttons/AddTweetButton";
import { Link } from "react-router-dom";

import { Box } from "@mui/system";

const LeftNavbar = ({ drawerWidth }) => {
  const classes = useStyles();

  const iconsArray = [
    { name: icons.HomeSharpIcon, path: "/home" },
    { name: icons.SearchSharpIcon, path: "/explore" },
    { name: icons.NotificationsOutlinedIcon, path: "/notifications" },
    { name: icons.EmailOutlinedIcon, path: "/messages" },
    { name: icons.BookmarkBorderIcon, path: "/bookmarks" },
    { name: icons.FeaturedPlayListOutlinedIcon, path: "/" },
    { name: icons.PersonOutlineOutlinedIcon, path: "/" },
    { name: icons.MoreHorizIcon, path: "" },
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
                      }}
                    >
                      {icon.name.type.render()}
                    </ListItemIcon>
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
                  ml: "0.8rem",
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
