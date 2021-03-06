import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

// MUI
import { Box } from "@mui/material";

// Components
import BottomNavigation from "../../components/BottomNavigation";
import Header from "../../components/Header";
import News from "../../components/News";
import TweetLarge from "../../components/TweetLarge/TweetLarge";
import TweetInput from "../../components/TweetInput/TweetInput";
import TweetReply from "../../components/TweetReply/TweetReply";

// Firebase
import { doc, getDoc } from "firebase/firestore";
import { database } from "../../firebase-config";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

// Context
import { useGlobal } from "../../context/globalContext";

// Icons & styles
import { icons } from "../../constants";
import { TweetPageWrapper } from "./TweetPage.Style";

export default function TweetPage() {
  const [dataUser, setDataUser] = useState(null);
  const [dataResponsesTweet, setDataResponsesTweet] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { dispatchSnackbar } = useGlobal();

  //Gestion idTweet qui est récupérer depuis l'URL
  const { id: tweetID } = useParams();
  const promise = new Promise((resolve, reject) => {
    resolve(tweetID);
    reject("erreur : tweetID ");
  });
  const { state } = useLocation();

  //Fonction qui permet de récupérer les donnés concerant l'auteur du tweet séléctioné
  const getUser = async () => {
    const docRef = doc(database, "users", state.state.author_id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setDataUser(docSnap.data());
      setIsLoading(false);
    } else {
      dispatchSnackbar({
        type: "OPEN_ERROR_SNACKBAR",
        payload: { message: "No such a document" },
      });
    }
  };

  //Fonction qui permet de récupérer les réponses du tweet
  const getTweetReply = (index) => {
    const repliesRef = collection(database, "replies");
    const q = query(
      repliesRef,
      where("tweet_id", "==", index),
      orderBy("created_at", "desc")
    );
    onSnapshot(q, (snapshot) => {
      setDataResponsesTweet(
        snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };

  useEffect(() => {
    getUser();
    promise.then((index) => getTweetReply(index));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const iconsArray = [{ name: icons.AutoAwesomeSharpIcon }];

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Box
          display="flex"
          flexDirection="column"
          borderLeft="1px solid #eff3f4"
          borderRight="1px solid #eff3f4"
        >
          <Header title="Home" iconsRight={iconsArray} />
          <TweetPageWrapper>
            <TweetLarge
              state={state}
              dataUser={dataUser}
              isLoading={isLoading}
            />
            <TweetInput />
            {dataResponsesTweet.map((dataResponseTweet) => (
              <TweetReply
                key={dataResponseTweet.id}
                dataResponseTweet={dataResponseTweet}
                dataUser={dataUser}
                isLoading={isLoading}
              />
            ))}
          </TweetPageWrapper>
        </Box>
        <News />
      </Box>
      <BottomNavigation />
    </>
  );
}
