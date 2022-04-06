import React from "react";
import { useNavigate, useParams } from "react-router-dom";

// MUI
import { Box, Button, Typography } from "@mui/material";

// Components
import News from "../../../components/News";
import Header from "../../../components/Header";
import Tweet from "../../../components/Tweet/Tweet";

// Contexts
import { useAuth } from "../../../context/authContext";
import { useLists } from "../../../context/listsContext";
import { useUsers } from "../../../context/usersContext";
import { useTweets } from "../../../context/tweetContext";
import { useGlobal } from "../../../context/globalContext";

// Firebase
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { database } from "../../../firebase-config";

// Constants & styles
import { icons, images } from "../../../constants";
import useStyles from "./styles";

const List = () => {
  const [textButton, setTextButton] = React.useState("Following");

  // Hooks
  const { id } = useParams();
  const classes = useStyles();
  const navigate = useNavigate();

  // Contexts hooks
  const { authUser, userData } = useAuth();
  const { lists } = useLists();
  const { users } = useUsers();
  const { tweets } = useTweets();
  const { dispatchSnackbar } = useGlobal();

  const matchedList = lists?.filter((list) => {
    return list?.id === id;
  });

  const author = users?.filter((user) => {
    return user?.id === matchedList?.[0]?.author_id;
  });

  const iconsArray = [
    {
      name: icons.IosShareIcon,
    },
    { name: icons.MoreHorizIcon },
  ];

  // Récupération du tableau de following de l'utilisateur connecté
  const listsCurrentUser = userData?.[0]?.lists;

  // Référence à l'id de l'utilisateur connecté à mettre à jour
  const currentUserRef = doc(database, "users", authUser?.uid);

  // Référence de la liste à mettre à jour
  const currentListRef = doc(database, "lists", matchedList?.[0]?.id);

  // Récupération du tableau de follwers de la liste
  const listsFollowers = matchedList?.[0]?.followers;

  const tweetsOfListMembers = tweets?.filter((tweet) => {
    return matchedList?.[0]?.members?.includes(tweet.author_id);
  });

  const followList = (e) => {
    e.preventDefault();

    // Si l'utilisateur connecté n'a pas de liste,
    // on ajoute la première dans le tableau lists
    if (!listsCurrentUser) {
      updateDoc(currentUserRef, {
        ...userData?.[0],
        lists: [matchedList?.[0]?.id],
      })
        // Si la liste n'a pas de followers,
        // on ajoute le premier dans le tableau followers
        .then(() => {
          if (!listsFollowers) {
            updateDoc(currentListRef, {
              followers: [userData?.[0]?.id],
            })
              .then(() => {
                dispatchSnackbar({
                  type: "OPEN_INFO_SNACKBAR",
                  payload: {
                    message: `${matchedList?.[0]?.name} list followed`,
                  },
                });
              })
              .catch((err) => {
                dispatchSnackbar({
                  type: "OPEN_ERROR_SNACKBAR",
                  payload: {
                    message: `An error occurred while following ${matchedList?.[0]?.name} list : ${err.message}`,
                  },
                });
              });
          } else {
            updateDoc(currentListRef, {
              followers: [...listsFollowers, authUser?.uid],
            })
              .then(() => {
                dispatchSnackbar({
                  type: "OPEN_INFO_SNACKBAR",
                  payload: {
                    message: `${matchedList?.[0]?.name} list followed`,
                  },
                });
              })
              .catch((err) => {
                dispatchSnackbar({
                  type: "OPEN_ERROR_SNACKBAR",
                  payload: {
                    message: `An error occurred while following ${matchedList?.[0]?.name} list : ${err.message}`,
                  },
                });
              });
          }
        })
        .catch((err) => {
          dispatchSnackbar({
            type: "OPEN_ERROR_SNACKBAR",
            payload: {
              message: `An error occurred while following ${matchedList?.[0]?.name} list : ${err.message}`,
            },
          });
        });
    } else {
      updateDoc(currentUserRef, {
        ...userData?.[0],
        lists: [...userData?.[0]?.lists, matchedList?.[0]?.id],
      })
        .then(() => {
          if (!listsFollowers) {
            updateDoc(currentListRef, {
              followers: [userData?.[0]?.id],
            })
              .then(() => {
                dispatchSnackbar({
                  type: "OPEN_INFO_SNACKBAR",
                  payload: {
                    message: `${matchedList?.[0]?.name} list followed`,
                  },
                });
              })
              .catch((err) => {
                dispatchSnackbar({
                  type: "OPEN_ERROR_SNACKBAR",
                  payload: {
                    message: `An error occurred while following ${matchedList?.[0]?.name} list : ${err.message}`,
                  },
                });
              });
          } else {
            updateDoc(currentListRef, {
              followers: [...listsFollowers, authUser?.uid],
            })
              .then(() => {
                dispatchSnackbar({
                  type: "OPEN_INFO_SNACKBAR",
                  payload: {
                    message: `${matchedList?.[0]?.name} list followed`,
                  },
                });
              })
              .catch((err) => {
                dispatchSnackbar({
                  type: "OPEN_ERROR_SNACKBAR",
                  payload: {
                    message: `An error occurred while following ${matchedList?.[0]?.name} list : ${err.message}`,
                  },
                });
              });
          }
        })
        .catch((err) => {
          dispatchSnackbar({
            type: "OPEN_ERROR_SNACKBAR",
            payload: {
              message: `An error occurred while following ${matchedList?.[0]?.name} list : ${err.message}`,
            },
          });
        });
    }
  };

  // Fonction pour unfollow
  const unfollowList = () => {
    // Suppression du following dans les datas de l'utilisateur connecté
    updateDoc(currentUserRef, {
      lists: arrayRemove(matchedList?.[0]?.id),
    })
      .then(() => {
        updateDoc(currentListRef, {
          followers: arrayRemove(userData?.[0]?.id),
        })
          .then(() => {
            dispatchSnackbar({
              type: "OPEN_INFO_SNACKBAR",
              payload: {
                message: `${matchedList?.[0]?.name} list unfollowed`,
              },
            });
          })
          .catch((err) => {
            dispatchSnackbar({
              type: "OPEN_ERROR_SNACKBAR",
              payload: {
                message: `An error occurred while unfollowing ${matchedList?.[0]?.name} list : ${err.message}`,
              },
            });
          });
      })
      .catch((err) => {
        dispatchSnackbar({
          type: "OPEN_ERROR_SNACKBAR",
          payload: {
            message: `An error occurred while unfollowing ${matchedList?.[0]?.name} list : ${err.message}`,
          },
        });
      });
  };

  return (
    <Box display="flex">
      <Box borderLeft="1px solid #eff3f4" borderRight="1px solid #eff3f4">
        <Header
          title={matchedList?.[0]?.name}
          iconsLeft={icons.ArrowBackIcon}
          iconsRight={iconsArray}
          subtitle={`@${author?.[0]?.username}`}
        />
        <Box>
          <Box>
            <img
              className={classes.profile__cover}
              src={matchedList?.[0]?.cover_url}
              alt=""
              maxwidth="590px"
              maxheight="200px"
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            p="12px"
            borderBottom="1px solid #eff3f4"
          >
            <Box mb="12px">
              <Typography fontSize="font.large" fontWeight="mainBold">
                {matchedList?.[0]?.name}
              </Typography>
            </Box>
            <Box mb="12px">
              <Typography fontSize="font.main">
                {matchedList?.[0]?.description}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb="12px">
              {author?.[0]?.profile_image_url ? (
                <Box>
                  <img
                    className={classes.user_list__avatar_user}
                    src={author?.[0]?.profile_image_url}
                    alt=""
                  />
                </Box>
              ) : (
                <Box>
                  <img
                    className={classes.user_list__avatar_user}
                    src={images.user}
                    alt=""
                  />
                </Box>
              )}
              <Typography p="0 4px" fontSize="font.main">
                {author?.[0]?.name}
              </Typography>
              <Typography
                fontSize="font.main"
                color="grey.main"
              >{`@${author?.[0]?.username}`}</Typography>
            </Box>
            <Box display="flex" mb="12px">
              <Box display="flex" mr="20px">
                <Typography mr="4px" fontSize="font.main">
                  {matchedList?.[0]?.members?.length}
                </Typography>
                <Typography fontSize="font.main" color="grey.main">
                  Members
                </Typography>
              </Box>
              <Box display="flex">
                <Typography mr="4px" fontSize="font.main">
                  {matchedList?.[0]?.followers?.length}
                </Typography>
                <Typography fontSize="font.main" color="grey.main">
                  Followers
                </Typography>
              </Box>
            </Box>
            <Box mb="12px">
              <Box
                onMouseEnter={() => setTextButton("Unfollow")}
                onMouseLeave={() => setTextButton("Following")}
              >
                {author?.[0]?.id === userData?.[0]?.id ? (
                  <Button
                    className={classes.button__edit}
                    variant="outlined"
                    disableElevation
                    sx={{
                      color: "black.main",
                      fontSize: "font.main",
                      fontWeight: "mainBold",
                      backgroundColor: "white.main",
                      borderColor: "grey.button",
                      borderRadius: "50px",
                      textTransform: "none",
                      minWidth: "6rem",
                    }}
                    onClick={() =>
                      navigate(`/lists/${matchedList?.[0]?.id}/info`)
                    }
                  >
                    Edit List
                  </Button>
                ) : userData?.[0]?.lists?.includes(matchedList?.[0]?.id) ? (
                  <Button
                    className={classes.button}
                    variant="contained"
                    sx={{
                      color: "black.main",
                      fontSize: "font.main",
                      fontWeight: "mainBold",
                      backgroundColor: "white.main",
                      borderColor: "grey.button",
                      borderRadius: "50px",
                    }}
                    onClick={unfollowList}
                  >
                    {textButton}
                  </Button>
                ) : (
                  <Button
                    className={classes.button_black}
                    variant="contained"
                    sx={{
                      fontSize: "font.main",
                      fontWeight: "mainBold",
                      backgroundColor: "black.main",
                      borderRadius: "50px",
                    }}
                    onClick={followList}
                  >
                    Follow
                  </Button>
                )}
              </Box>
            </Box>
          </Box>
          <Box>
            {tweetsOfListMembers?.map((tweet) => {
              return <Tweet key={tweet.id} tweet={tweet} />;
            })}
          </Box>
        </Box>
      </Box>
      <Box>
        <News />
      </Box>
    </Box>
  );
};

export default List;
