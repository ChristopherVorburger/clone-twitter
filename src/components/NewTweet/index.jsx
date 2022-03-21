import { useState, useContext, useEffect } from "react";

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

import { icons, images } from "../../constants";

import useStyles from "./styles";

import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { AuthContext } from "../../context/authContext";

const NewTweet = () => {
  const [text, setText] = useState("");
  const [textError, setTextError] = useState(false);
  const auth = useContext(AuthContext);
  const classes = useStyles();

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
      public_metrics: {
        retweet_count: 0,
        reply_count: 0,
        like_count: 0,
        quote_count: 0,
      },
      likers: [],
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

  useEffect(() => {
    setTextError(false);
    if (text.length > 280) {
      setTextError(true);
    }
  }, [text]);

  return (
    <Box className={classes.new_tweet} p="0 1rem" width="100%" maxWidth="590px">
      <Box display="flex">
        <Box mr="1rem" flexBasis="48px">
          {auth.userData?.[0]?.profile_image_url ? (
            <img
              className={classes.avatar}
              style={{ border: "1px solid lightgrey" }}
              src={auth.userData?.[0]?.profile_image_url}
              alt="user avatar"
            />
          ) : (
            <img
              className={classes.avatar}
              style={{ border: "1px solid lightgrey" }}
              src={images.user}
              alt="user avatar"
            />
          )}
        </Box>
        <Box flexGrow="1">
          <Box
            width="100%"
            sx={{
              overflowWrap: "break-word",
            }}
          >
            <TextField
              value={text}
              autoComplete="off"
              fullWidth
              multiline={true}
              helperText={`${text.length} / 280`}
              maxRows={4}
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
          {textError ? (
            <Typography color="error">Your message is too long</Typography>
          ) : null}
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
                disabled={textError}
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
        </Box>
      </Box>
    </Box>
  );
};

export default NewTweet;
