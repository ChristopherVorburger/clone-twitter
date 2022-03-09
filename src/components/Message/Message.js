import React, { useState, useEffect } from 'react';

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
    getMessages(idChannels);
  }

  useEffect(() => {
    getChannesls();
  }, []);

  return (
    <>
      <div className="classes.container">
        <Stack direction="row">
          <LeftNavbar drawerWidth={drawerWidth} />
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
                {/* <ListeChannels
                  channels={channels}
                  handleClick={(idChannels) =>
                    handleDisplayChannelMessage(idChannels)
                  }
                /> */}
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

              '&:hover': {
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <Message messages={messages} />
          </Box>
        </Stack>
        <BottomNavigation />
      </div>
    </>
  );
}

function ListeChannels({ channels, handleClick }) {
  if (channels) {
    console.log('channels => ');
    console.log(channels);
    console.log('channel id => ' + channels.id);

    return (
      <Grid container spacing={4}>
        {channels.map((channel, index) => (
          <Grid item key={index} xs={12}>
            <CardContent onClick={() => handleClick(channel.id)}>
              <ListItemButton>
                <Typography variant="h6">Channels</Typography>
              </ListItemButton>
            </CardContent>
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
      <Grid container spacing={4}>
        {messages.map((message, index) => (
          <Grid item key={index} xs={12}>
            <CardContent>
              <Typography variant="h6">User name to display</Typography>
              <Typography variant="h6">{message.text}</Typography>
            </CardContent>
          </Grid>
        ))}
      </Grid>
    );
  } else {
    return <Typography variant="h6">Pas de messages!</Typography>;
  }
}
