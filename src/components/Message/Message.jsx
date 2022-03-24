import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/analytics";
import { getFirebaseConfig } from "../../firebase-config";
import BottomNavigation from "../BottomNavigation";
import ChannelItem from "./ChannelItem/ChannelItem";
import {
  ListItem,
  ListItemText,
  Typography,
  Box,
  Divider,
  Button,
  List,
} from "@mui/material";
import useStyles from "./styles";
import { onSnapshot } from "firebase/firestore";
import ChannelAddMessage from "./ChannelAddMessage/ChannelAddMessage";
import { useNavigate } from "react-router-dom";
import { useFirestore } from "../../utils/useFirestore";
import ClassicButton from "../buttons/ClassicButton";
import InformationActionButton from "./InformationActionButton/InformationActionButton";

firebase.initializeApp(getFirebaseConfig());

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function Messages() {
  const classes = useStyles();
  const channelsRef = firestore.collection("channels");
  const messagesRef = firestore.collection("messages");
  const usersRef = firestore.collection("users");
  const [, setUsers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState(null);
  const [channelSelected, setChannelSelected] = useState("");
  const navigate = useNavigate();

  function getChannesls() {
    const queryChannels = channelsRef
      .where("users", "array-contains", auth.currentUser.uid)
      .orderBy("updated_at", "desc");

    onSnapshot(queryChannels, (queryQnapshot) => {
      const items = [];
      queryQnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });

      setChannels(items);
    });
  }

  function getUsers() {
    const queryUsers = usersRef.orderBy("name");

    onSnapshot(queryUsers, (queryQnapshot) => {
      const items = [];
      queryQnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });

      setUsers(items);
    });
  }

  function getMessages(idChannels) {
    const queryMessages = messagesRef.orderBy("created_at", "asc");

    onSnapshot(queryMessages, (queryQnapshot) => {
      const items = [];
      queryQnapshot.forEach((doc) => {
        if (doc.data().channels_id === idChannels) {
          items.push({ id: doc.id, ...doc.data() });
        }
      });

      setMessages(items);
    });
  }

  function handleDisplayChannelMessage(idChannels) {
    setChannelSelected(idChannels);
    getMessages(idChannels);
  }

  function handleAddNewMessage(newMessage) {
    const userId = auth.currentUser.uid;
    const todayDate = firebase.firestore.FieldValue.serverTimestamp();
    messagesRef.add({
      channels_id: channelSelected,
      created_at: todayDate,
      photoUrl: null,
      sender_id: userId,
      senderName: "",
      text: newMessage,
    });
  }

  useEffect(() => {
    getChannesls();
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box display="flex" justifyContent="center" width="100%">
        {/* Zone à gauche */}
        <Box
          display="flex"
          flexDirection="column"
          borderLeft="1px solid #eff3f4"
          borderRight="1px solid #eff3f4"
          minWidth="400px"
          alignContent="center"
        >
          {/* Entête */}
          <Box
            display="flex"
            flexDirection="row"
            alignContent="center"
            margin="1em"
          >
            <Box width="20px" height="20px" flexGrow={1}>
              <Typography fontSize="1.5em">Messages</Typography>
            </Box>

            <Box
              style={{
                minHeight: "36px",
              }}
            >
              <Button
                variant="outlined"
                onClick={() => navigate("/searchUser")}
                className={classes.profile__button}
                style={{
                  border: "none",
                  width: "0.5rem",
                }}
                width="20px"
                height="20px"
              >
                <svg
                  fontSize="1.5em"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="r-18jsvk2 r-4qtqp9 r-yyyyoo r-z80fyv r-dnmrzs r-bnwqim r-1plcrui r-lrvibr r-19wmn03"
                >
                  <g>
                    <path d="M23.25 3.25h-2.425V.825c0-.414-.336-.75-.75-.75s-.75.336-.75.75V3.25H16.9c-.414 0-.75.336-.75.75s.336.75.75.75h2.425v2.425c0 .414.336.75.75.75s.75-.336.75-.75V4.75h2.425c.414 0 .75-.336.75-.75s-.336-.75-.75-.75zm-3.175 6.876c-.414 0-.75.336-.75.75v8.078c0 .414-.337.75-.75.75H4.095c-.412 0-.75-.336-.75-.75V8.298l6.778 4.518c.368.246.79.37 1.213.37.422 0 .844-.124 1.212-.37l4.53-3.013c.336-.223.428-.676.204-1.012-.223-.332-.675-.425-1.012-.2l-4.53 3.014c-.246.162-.563.163-.808 0l-7.586-5.06V5.5c0-.414.337-.75.75-.75h9.094c.414 0 .75-.336.75-.75s-.336-.75-.75-.75H4.096c-1.24 0-2.25 1.01-2.25 2.25v13.455c0 1.24 1.01 2.25 2.25 2.25h14.48c1.24 0 2.25-1.01 2.25-2.25v-8.078c0-.415-.337-.75-.75-.75z"></path>
                  </g>
                </svg>
              </Button>
            </Box>
          </Box>

          <Box>
            <Divider sx={{ borderColor: "background__input" }} />
          </Box>

          {/* Affichage de la liste des conversations */}
          <Box>
            <ListeChannels
              channels={channels}
              handleDiplayMessages={(idChannels) =>
                handleDisplayChannelMessage(idChannels)
              }
              style={{
                overflowY: "scroll",
                overflowX: "hidden",
              }}
            />
          </Box>
        </Box>

        {/* Zone à droite */}
        <Box
          display="flex"
          minWidth="500px"
          minHeight="75em"
          borderRight="1px solid #eff3f4"
        >
          {/* Afficahge des messages */}

          {messages ? (
            <Message
              messages={messages}
              handleAddNewMessage={handleAddNewMessage}
            />
          ) : (
            <Box display="flex" flexDirection="vertical" alignItems="center">
              <InformationActionButton
                title={" You don't have a message selected"}
                details={
                  "Choose one from your existing messages, or start a new one."
                }
                buttonText={"New message"}
                buttonLink={"/searchUser"}
              />
            </Box>
          )}
        </Box>
      </Box>
      <BottomNavigation />
    </>
  );
}

function ListeChannels({ channels, handleDiplayMessages }) {
  const users = useFirestore("users");

  const getUser = (userId) => {
    return users?.filter((user) => {
      return user.id === userId;
    });
  };

  if (channels && channels.length > 0) {
    return (
      <Box>
        {channels.map((channel, index) => (
          <Box key={index}>
            <ChannelItem
              user={getUser(
                channel?.users[0] === auth.currentUser.uid
                  ? channel?.users[1]
                  : channel?.users[0]
              )}
              channelID={channel.id}
              handleClick={handleDiplayMessages}
            />
          </Box>
        ))}
      </Box>
    );
  } else {
    return (
      <Box display="flex" flexDirection="vertical" alignItems="center">
        <InformationActionButton
          title={"Send a message, get a message"}
          details={
            "Direct Messages are private conversations between you and other people on Twitter. Share Tweets, media, and more!"
          }
          buttonText={"Start a conversation"}
          buttonLink={"/searchUser"}
        />
      </Box>
    );
  }
}

export function Message({ messages = [], handleAddNewMessage }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="100vh"
      width="100%"
    >
      <Box
        style={{
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <List>
          {messages.map((message, index) => {
            const isUserConnectedMessage =
              message.sender_id === auth.currentUser.uid;
            return (
              <ListItem
                key={index}
                width="100%"
                sx={{
                  flexDirection: isUserConnectedMessage ? "column-reverse" : "",
                  alignItems: isUserConnectedMessage ? "flex-end" : "",
                  "&.MuiListItem-root": {
                    paddingTop: "0px",
                    paddingBottom: "0px",
                  },
                }}
              >
                <ListItemText
                  sx={{
                    "&.MuiListItemText-root": {
                      width: "20em",
                      display: "flex",
                      justifyContent: isUserConnectedMessage ? "flex-end" : "",
                    },
                    "& span": {
                      backgroundColor: isUserConnectedMessage
                        ? "#1d9bf0"
                        : "#ECE7E7",
                      width: "fit-content",
                      padding: "0.5em",
                      borderRadius: isUserConnectedMessage
                        ? "16px 16px 0px 16px"
                        : "16px 16px 16px 0px",
                    },
                  }}
                >
                  {message.text}
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box>
        <ChannelAddMessage handleAddNewMessage={handleAddNewMessage} />
      </Box>
    </Box>
  );
}
