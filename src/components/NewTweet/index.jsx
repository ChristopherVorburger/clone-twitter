import React from "react";
import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ProfileButton from "../buttons/ProfileButton";

import { icons } from "../../constants";

import useStyles from "./styles";

const NewTweet = ({ drawerWidth }) => {
  const classes = useStyles();

  const iconsArray = [
    icons.ImageOutlinedIcon,
    icons.GifBoxOutlinedIcon,
    icons.LeaderboardOutlinedIcon,
    icons.SentimentSatisfiedAltOutlinedIcon,
    icons.CalendarTodayOutlinedIcon,
    icons.FmdGoodOutlinedIcon,
    icons.PublicOutlinedIcon,
  ];
  return (
    <Box
      className={classes.new_tweet}
      sx={{
        maxWidth: "600px",
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth * 1.3}px`,
      }}
    >
      <Stack direction="row">
        <ProfileButton />
        <Stack alignItems="flex-start">
          <Box>
            <TextField
              sx={{
                border: "none!important",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderStyle: "none",
                },
                "& .MuiOutlinedInput-input": {
                  padding: "16.5px 0!important",
                },
              }}
              placeholder="What's happening?"
            />
          </Box>
          <Box>
            <Button
              sx={{
                margin: " 0 0 1rem -1rem!important",
                padding: " 0.5rem 1rem!important",
                textTransform: "none",
                borderRadius: "50px",
              }}
            >
              <icons.PublicOutlinedIcon />
              <Typography
                sx={{
                  fontWeight: "bold",
                }}
              >
                Everyone can reply
              </Typography>
            </Button>
          </Box>
          <Stack direction="row" justifyContent="space-between">
            <List
              sx={{ display: "flex" }}
              component="nav"
              aria-label="main mailbox folders"
            >
              {/* Loop through the 'iconsArray' array and use the render() function to display the component */}
              {iconsArray.map((icon, index) => {
                return (
                  <ListItemButton key={index} sx={{ padding: "0!important" }}>
                    <ListItemIcon sx={{ transform: "scale(1.2)" }}>
                      {icon.type.render()}
                    </ListItemIcon>
                  </ListItemButton>
                );
              })}
            </List>
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: "50px",
                backgroundColor: "primary.main",
                fontWeight: "bold",
                width: "80px",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                Tweet
              </Typography>
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default NewTweet;
