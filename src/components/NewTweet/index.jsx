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
  ];
  return (
    <Box
      className={classes.new_tweet}
      sx={{
        width: "100%",
        maxWidth: "600px",
        ml: "1.5rem",
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
                  fontSize: "1.3rem!important",
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
                  fontSize: "12px",
                }}
              >
                Everyone can reply
              </Typography>
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem 0",
              width: "100%",
              borderTop: "1px solid #eff3f4",
            }}
          >
            <Box>
              <List
                sx={{ display: "flex" }}
                component="nav"
                aria-label="main mailbox folders"
              >
                {/* Loop through the 'iconsArray' array and use the render() function to display the component */}
                {iconsArray.map((icon, index) => {
                  return (
                    <ListItemButton
                      key={index}
                      sx={{
                        padding: "0 0.2rem!important",
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: "0",
                          transform: "scale(0.8)",
                          color: "primary.main",
                        }}
                      >
                        {icon.type.render()}
                      </ListItemIcon>
                    </ListItemButton>
                  );
                })}
              </List>
            </Box>
            <Box>
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
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default NewTweet;
