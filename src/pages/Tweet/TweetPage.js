import { useState, useEffect } from "react";
import BottomNavigation from "../../components/BottomNavigation";
import { icons } from "../../constants";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import News from "../../components/News";
import { TweetPageWrapper } from "./TweetPage.Style";
import TweetLarge from "../../components/TweetLarge/TweetLarge";
import TweetInput from "../../components/TweetInput/TweetInput";
import { doc, getDoc } from "firebase/firestore";
import { database } from "../../firebase-config";
import { useLocation, useParams } from "react-router-dom";
import TweetReply from "../../components/TweetReply/TweetReply";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

export default function TweetPage() {
  const [dataUser, setDataUser] = useState(null);
  const [dataResponsesTweet, setDataResponsesTweet] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
      console.log("No such document !");
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
