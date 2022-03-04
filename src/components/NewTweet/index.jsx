import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
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
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  // getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { AuthContext } from "../../context/authContext";

const NewTweet = () => {
  const [text, setText] = useState("");
  const auth = useContext(AuthContext);
  const classes = useStyles();
  const navigate = useNavigate();

  const iconsArray = [
    { name: icons.ImageOutlinedIcon, path: "/" },
    { name: icons.GifBoxOutlinedIcon, path: "/" },
    { name: icons.LeaderboardOutlinedIcon, path: "/" },
    { name: icons.SentimentSatisfiedAltOutlinedIcon, path: "/" },
    { name: icons.CalendarTodayOutlinedIcon, path: "/" },
    { name: icons.FmdGoodOutlinedIcon, path: "/" },
  ];

  // Initialisation de firestore
  const database = getFirestore();

  // Référence des collections
  const tweetsCollectionRef = collection(database, "tweets");

  const addTweet = (e) => {
    e.preventDefault();

    addDoc(tweetsCollectionRef, {
      text,
      // on utilise serverTimestamp() pour créer automatiquement la date de création du tweet
      created_at: serverTimestamp(),
      author_id: auth.authUser.uid,
    })
      .then(() => {
        // on nettoie l'input si ok
        setText("");
        console.log("Tweet created !");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
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
              autoComplete="off"
              sx={{
                border: "none!important",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderStyle: "none",
                },
                "& .MuiOutlinedInput-input": {
                  fontSize: "font.large",
                  padding: "16.5px 0!important",
                },
              }}
              placeholder="What's happening?"
              onChange={(e) => setText(e.target.value)}
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
                  fontWeight: "mainBold",
                  fontSize: "font.small",
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
                        {icon.name.type.render()}
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
                  width: "80px",
                }}
              >
                <Typography
                  onClick={addTweet}
                  sx={{
                    fontWeight: "mainBold",
                    color: "white.main",
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
