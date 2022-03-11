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
import { useLocation } from "react-router-dom";
import TweetReply from "../../components/TweetReply/TweetReply";

export default function TweetPage() {
  const [dataUser, setDataUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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

  //Fonction qui permet de récupérer les réponse du tweet 
  const getTweetReply = async () => {
    
  }
  useEffect(() => {
    getUser();
  }, []);

  console.log(state);
  return (
    <>
      <Box display='flex' justifyContent='center'>
        <Box display='flex' flexDirection='column' borderLeft='1px solid #eff3f4' borderRight='1px solid #eff3f4'>
          <Header title='Home' iconsRight={icons.AutoAwesomeSharpIcon} />
          <TweetPageWrapper>
            <TweetLarge state={state} dataUser={dataUser} isLoading={isLoading} />
            <TweetInput />
            <TweetReply dataUser={dataUser} isLoading={isLoading} />
          </TweetPageWrapper>
        </Box>
        <News />
      </Box>
      <BottomNavigation />
    </>
  );
}
