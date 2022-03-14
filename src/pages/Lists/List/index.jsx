import React from "react";
import { useParams } from "react-router-dom";

import { icons } from "../../../constants";

import { useFirestore } from "../../../utils/useFirestore";

import { Box, Button, Typography } from "@mui/material";

import News from "../../../components/News";
import Header from "../../../components/Header";

import { AuthContext } from "../../../context/authContext";

import useStyles from "./styles";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { database } from "../../../firebase-config";
const List = () => {
  const classes = useStyles();
  const auth = React.useContext(AuthContext);
  const { id } = useParams();

  const [textButton, setTextButton] = React.useState("Following");

  const lists = useFirestore("lists");

  const users = useFirestore("users");

  const matchedList = lists?.filter((list) => {
    return list?.id === id;
  });

  const author = users?.filter((user) => {
    return user?.id === matchedList?.[0]?.author_id;
  });

  console.log("liste qui match", matchedList);

  const iconsArray = [
    {
      name: icons.IosShareIcon,
    },
    { name: icons.MoreHorizIcon },
  ];

  // Récupération du tableau de following de l'utilisateur connecté
  const listsCurrentUser = auth?.userData?.[0]?.lists;

  // Référence à l'id de l'utilisateur connecté à mettre à jour
  const currentUserRef = doc(database, "users", auth?.authUser?.uid);

  const followList = (e) => {
    e.preventDefault();

    // Si l'utilisateur connecté n'a pas de liste,
    // on ajoute la première dans le tableau lists
    if (!listsCurrentUser) {
      updateDoc(currentUserRef, {
        ...auth.userData?.[0],
        lists: [matchedList?.[0]?.id],
      })
        .then(() => {
          console.log("First list created");
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      updateDoc(currentUserRef, {
        ...auth.userData?.[0],
        lists: [...auth.userData?.[0]?.lists, matchedList?.[0]?.id],
      })
        .then(() => {
          console.log("List created");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  // Fonction pour unfollow
  const unfollowList = () => {
    // Suppression du following dans les datas de l'utilisateur connecté
    updateDoc(currentUserRef, {
      lists: arrayRemove(matchedList?.[0]?.id),
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
              maxWidth="590px"
              maxHeight="200px"
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            p="12px"
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
              <Box>
                <img
                  className={classes.user_list__avatar_user}
                  src={author?.[0]?.profile_image_url}
                  alt=""
                />
              </Box>
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
                  1
                </Typography>
                <Typography fontSize="font.main" color="grey.main">
                  Members
                </Typography>
              </Box>
              <Box display="flex">
                <Typography mr="4px" fontSize="font.main">
                  2
                </Typography>
                <Typography fontSize="font.main" color="grey.main">
                  Followers
                </Typography>
              </Box>
            </Box>
            <Box>
              <Box
                onMouseEnter={() => setTextButton("Unfollow")}
                onMouseLeave={() => setTextButton("Following")}
              >
                {author?.[0]?.id === auth.userData?.[0]?.id ? (
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
                    // onClick={EditList}
                  >
                    Edit List
                  </Button>
                ) : auth.userData?.[0]?.lists?.includes(
                    matchedList?.[0]?.id
                  ) ? (
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
        </Box>
      </Box>
      <Box>
        <News />
      </Box>
    </Box>
  );
};

export default List;
