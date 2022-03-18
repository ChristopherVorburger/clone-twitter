import {
  CardContent,
  CardMedia,
  Container,
  Grid,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  Divider,
  Stack,
  Tabs,
  Tab,
  TabContentPanel,
  Alert,
  TextField,
  Button,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/analytics";
// import { useAuthState } from 'react-firebase-hooks/auth';
//   import { useCollectionData } from 'react-firebase-hooks/firestore';
//   import { getFirebaseConfig } from '../../firebase-config';
//   import LeftNavbar from '../LeftNavbar';
//   import Header from '../Header';
//   import CircularProgress from '@mui/material/CircularProgress';
//   import BottomNavigation from '../BottomNavigation';
//   import AddCommentIcon from '@mui/icons-material/AddComment';
//   import Icons from '../../constants/icons';
import useStyles from "./styles";
import { icons, images } from "../../../constants";

export default function ChannelItem({ user, handleClick, channelID }) {
  const auth = firebase.auth();
  const classes = useStyles();

  const userToDisplay = user[0];

  // console.log('user', user);
  return (
    <Box
      className={classes.profile_section}
      sx={{
        padding: "12px",
      }}
      onClick={() => handleClick(channelID)}
    >
      <Box button display="flex" justifyContent="center" alignItems="center">
        <Box width="50px" height="50px" marginRight="0.5rem">
          <img
            className={classes.profile_section__avatar_button}
            style={{ border: "1px solid lightgrey" }}
            src={
              userToDisplay?.profile_image_url &&
              userToDisplay?.profile_image_url != ""
                ? userToDisplay?.profile_image_url
                : images.user
            }
            alt="user avatar"
          />
        </Box>
        <Box className={classes.profile_section__avatar_texts} flexGrow="1">
          <Typography fontSize="font.main" fontWeight="mainBold">
            {userToDisplay?.name}
          </Typography>
          <Typography fontSize="font.main" color="grey.main">
            @{userToDisplay?.username}
          </Typography>
        </Box>
        {/* <Box>
          <Box className={classes.profile_section__icon_more}>
            {icons.MoreHorizIcon.type.render()}
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
}
