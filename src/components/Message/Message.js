import React, { useState, useEffect, useRef } from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getFirebaseConfig } from '../../firebase-config';
import LeftNavbar from '../../components/LeftNavbar';
import Header from '../../components/Header';
import CircularProgress from '@mui/material/CircularProgress';
import BottomNavigation from '../../components/BottomNavigation';
import AddCommentIcon from '@mui/icons-material/AddComment';

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
} from '@mui/material';
import useStyles from './styles';

firebase.initializeApp(getFirebaseConfig());

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

export default function Messages() {
  // state to set dimension of the screen
  const [screenSize, getDimension] = useState({
    dynamicWidth: window.innerWidth,
    dynamicHeight: window.innerHeight,
  });

  // function to set the dimension
  const setDimension = () => {
    getDimension({
      dynamicWidth: window.innerWidth,
      dynamicHeight: window.innerHeight,
    });
  };

  // useEffect to watch the resizing of the screen
  useEffect(() => {
    window.addEventListener('resize', setDimension);

    return () => {
      window.removeEventListener('resize', setDimension);
    };
  }, [screenSize]);

  // assign a value to the width of the drawer
  const drawerWidth = screenSize.dynamicWidth < 600 ? 0 : 88;

  const classes = useStyles();
  const channelsRef = firestore.collection('channels');
  const messagesRef = firestore.collection('messages');
  // const queryChannel = channelsRef
  //   .orderBy('users', 'array-contains', auth.currentUser.uid)
  //   .onSnapshot((snapshot) => {
  //     return snapshot.docs.map((doc) => doc.data());
  //   });
  // const [channels] = useCollectionData(queryChannel);

  const [channels, setChannels] = useState([]);
  const [messages, setMessages] = useState([]);
  const [channelSelected, setChannelSelected] = useState('');
  console.log('userid => ' + auth.currentUser.uid);

  function getChannesls() {
    channelsRef.onSnapshot((queryQnapshot) => {
      const items = [];
      queryQnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });

      setChannels(items);
    });
  }

  function getMessages(idChannels) {
    messagesRef.onSnapshot((queryQnapshot) => {
      const items = [];
      queryQnapshot.forEach((doc) => {
        if (doc.data().channels_id == idChannels) {
          items.push({ id: doc.id, ...doc.data() });
        }
      });

      setMessages(items);
    });
  }

  function handleDisplayChannelMessage(idChannels) {
    console.log('id channels => ' + idChannels);
    setChannelSelected(idChannels);
    getMessages(idChannels);
  }

  const messageToAdd = useRef('');
  function handleAddNewMessage() {
    const userId = auth.currentUser.uid;
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();
    const messageChannel = messagesRef.add({
      channels_id: channelSelected,
      created_at: createdAt,
      photoUrl: null,
      sender_id: userId,
      senderName: '',
      text: messageToAdd.current,
    });
  }

  useEffect(() => {
    getChannesls();
  }, []);

  return (
    <>
      <div className="classes.container">
        <Stack direction="row">
          {/* <LeftNavbar drawerWidth={drawerWidth} /> */}
          <Box
            display="flex"
            flexDirection="column"
            borderLeft="1px solid #eff3f4"
            borderRight="1px solid #eff3f4"
            sx={{
              width: 400,

              '&:hover': {
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <Container maxWidth="md">
              <Stack display="flex" flexDirection="row" spacing={1} md={4}>
                <Typography variant="span">Messages</Typography>
                <AddCommentIcon />
              </Stack>
              <Divider sx={{ borderColor: 'background__input' }} />
              <Stack display="flex" flexDirection="row">
                <ListeChannels
                  channels={channels}
                  handleClick={(idChannels) =>
                    handleDisplayChannelMessage(idChannels)
                  }
                />
              </Stack>
            </Container>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            borderLeft="1px solid #eff3f4"
            borderRight="1px solid #eff3f4"
            sx={{
              // width: 400,
              height: 50,
              // '&:hover': {
              //   opacity: [0.9, 0.8, 0.7],
              // },
            }}
            style={{ paddingRight: '0.25em', paddingLeft: '0.25em' }}
          >
            <Message messages={messages} />

            <Divider sx={{ borderColor: 'background__input' }} />
            <Stack
              display="flex"
              flexDirection="row"
              spacing={1}
              md={4}
              justify="flex-end"
            >
              <TextField ref={messageToAdd} />

              <Button variant="contained" onClick={() => handleAddNewMessage()}>
                Add message
              </Button>
            </Stack>
          </Box>
        </Stack>
        <BottomNavigation />
      </div>
    </>
  );
}

function ListeChannels({ channels, handleClick }) {
  if (channels) {
    // console.log('channels => ');
    // console.log(channels);
    // console.log('channel id => ' + channels.id);

    return (
      <Grid container>
        {channels.map((channel, index) => (
          <Grid item key={index} xs={12}>
            <ListItemButton>
              <CardContent onClick={() => handleClick(channel.id)}>
                <Typography variant="h6">Channels</Typography>
              </CardContent>
            </ListItemButton>
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return <Typography variant="h6">Pas de conversation!</Typography>;
  }
}

function Message({ messages = [] }) {
  if (messages && messages.length > 0) {
    console.log('messages =>');
    console.log(messages);

    return (
      <Grid container>
        {messages.map((message, index) => (
          <Grid
            item
            key={index}
            xs={12}
            style={{
              marginBottom: '0.2em',
              paddingTop: '0.3em',
              paddingBottom: '0.3em',
              textAlign:
                message.sender_id == auth.currentUser.uid ? 'right' : 'left',
            }}
          >
            <Typography
              variant="span"
              style={{
                backgroundColor:
                  message.sender_id == auth.currentUser.uid
                    ? '#1d9bf0'
                    : '#ECE7E7',
                padding: '0.5em',
                borderRadius: '25px',
                paddingTop: '0.20em',
                paddingBottom: '0.20em',
              }}
            >
              {message.text}
            </Typography>
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return <Typography variant="h6">Pas de messages sélectionné!</Typography>;
  }
}
