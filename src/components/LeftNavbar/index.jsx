import React from "react";
import Drawer from "@mui/material/Drawer";
import { Toolbar, List, ListItem, ListItemIcon } from "@mui/material";

import { icons } from "../../constants";

import useStyles from "./styles";
import ProfileButton from "../buttons/ProfileButton";
import AddTweetButton from "../buttons/AddTweetButton";
import { Box } from "@mui/system";

const LeftNavbar = ({ drawerWidth }) => {
  const classes = useStyles();

  const iconsArray = [
    icons.HomeSharpIcon,
    icons.SearchSharpIcon,
    icons.NotificationsOutlinedIcon,
    icons.EmailOutlinedIcon,
    icons.BookmarkBorderIcon,
    icons.FeaturedPlayListOutlinedIcon,
    icons.PersonOutlineOutlinedIcon,
    icons.MoreHorizIcon,
  ];
  return (
    <Drawer
      className={classes.drawer}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar sx={{}}>
        <List>
          <ListItem button>
            <ListItemIcon
              sx={{
                transform: "scale(1.2)",
                mb: "1rem",
                color: "primary.main",
              }}
            >
              <icons.TwitterIcon />
            </ListItemIcon>
          </ListItem>
          {/* Loop through the 'iconsArray' array and use the render() function to display the component */}
          {iconsArray.map((icon, index) => {
            return (
              <ListItem button key={index}>
                <ListItemIcon sx={{ transform: "scale(1.2)", mb: "1rem" }}>
                  {icon.type.render()}
                </ListItemIcon>
              </ListItem>
            );
          })}
          <ListItem button sx={{ bottom: "-8rem" }}>
            <ListItemIcon
              sx={{
                transform: "scale(1)",
                mb: "1rem",
              }}
            >
              <AddTweetButton />
            </ListItemIcon>
          </ListItem>
        </List>
      </Toolbar>
      <Box
        button
        sx={{
          transform: "scale(1.5)",
          position: "absolute",
          bottom: "30px",
          left: "30px",
        }}
      >
        <ListItem button>
          <ProfileButton />
        </ListItem>
      </Box>
    </Drawer>
  );
};

export default LeftNavbar;
