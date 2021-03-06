import React from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  ClickAwayListener,
} from "@mui/material";

import { Box } from "@mui/system";

import { icons } from "../../constants";

import AddTweetButton from "../buttons/AddTweetButton";
import ClassicButton from "../buttons/ClassicButton";
import SimpleDialog from "../SimpleDialog";
import BottomAvatar from "./BottomAvatar";

import { useAuth } from "../../context/authContext";

import useStyles from "./styles";

const LeftNavbar = () => {
  const classes = useStyles();
  // Récupération du contexte Auth
  const { userData } = useAuth();

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
    {
      name: icons.FeaturedPlayListOutlinedIcon,
      path: `/${userData?.[0]?.username}/lists`,
      text: "Lists",
    },
    {
      name: icons.PersonOutlineOutlinedIcon,
      path: `/${userData?.[0]?.username}`,
      text: "Profile",
    },
    { name: icons.MoreHorizIcon, path: "", text: "More" },
  ];

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <Box className={classes.container}>
      <Box>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          height="100vh"
          maxWidth="250px"
        >
          <Box>
            <List>
              <ListItemButton
                sx={{ borderRadius: "50px" }}
                component={Link}
                to="/home"
              >
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
                  borderRadius: "50px",
                }}
              >
                <ListItemIcon>
                  <AddTweetButton />
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton className={classes.list_item_button}>
                <ListItemIcon className={classes.add_tweet__button_large}>
                  <ClassicButton path={"/home"} text={"Tweet"} />
                </ListItemIcon>
              </ListItemButton>
            </List>
          </Box>
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box onClick={handleClick}>
              <BottomAvatar />
              {open ? <SimpleDialog open={open} setOpen={setOpen} /> : null}
            </Box>
          </ClickAwayListener>
        </Box>
      </Box>
    </Box>
  );
};

export default LeftNavbar;
