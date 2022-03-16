import { TweetReplyContainer, TweetReplyContent } from "./TweetReply.Style";
import { TweetAuthor, TweetAvatar, TweetPseudo } from "../Tweet/Tweet.Style";
import { database } from "../../firebase-config";
import Skeleton from "@mui/material/Skeleton";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { images } from "../../constants";

export default function TweetReply({ dataResponseTweet, dataUser, isLoading }) {
  const [dataUserResponse, setDataUserResponse] = useState(null);
  const [isLoadingResponse, setIsLoadingResponse] = useState(true);

  //Fonction qui permet de récupérer les donnés concerant l'auteur du tweet séléctioné
  const getUser = async () => {
    const docRef = doc(database, "users", dataResponseTweet.author_id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setDataUserResponse(docSnap.data());
      setIsLoadingResponse(false);
    } else {
      console.log("No such document !");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <TweetReplyContainer>
      {isLoadingResponse ? (
        <Skeleton variant='circular' width={50} height={50} />
      ) : dataUserResponse.profile_image_url ? (
        <TweetAvatar src={dataUserResponse.profile_image_url} alt='image de profil user' />
      ) : (
        <TweetAvatar style={{ border: "1px solid lightgrey" }} src={images.user} alt='user avatar' />
      )}

      <div className='container-1'>
        <div className='container-2'>
          {isLoadingResponse ? (
            <>
              <Skeleton variant='text' width='100px' />
              <Skeleton variant='text' width='150px' />
            </>
          ) : (
            <>
              <TweetAuthor>{dataUserResponse.name}</TweetAuthor>
              <TweetPseudo>@{dataUserResponse.username}</TweetPseudo>
            </>
          )}

          {isLoading ? (
            <Skeleton variant='text' width='140px' />
          ) : (
            <p className='infos-reply'>
              En réponse à <span>@ {dataUser.username}</span>
            </p>
          )}
        </div>
        <TweetReplyContent>
          <p>{dataResponseTweet.text}</p>
        </TweetReplyContent>
      </div>
    </TweetReplyContainer>
  );
}
