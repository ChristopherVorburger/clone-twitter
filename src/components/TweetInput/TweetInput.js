import { useState } from "react";
import { useParams } from "react-router-dom";

import { TweetAvatar } from "../Tweet/Tweet.Style";
import {
  TweetInputContainer,
  Form,
  Input,
  ButtonSubmit,
} from "./TweetInput.Style";

import {
  addDoc,
  serverTimestamp,
  collection,
  updateDoc,
  doc,
} from "firebase/firestore";

import { database } from "../../firebase-config";

import { useAuth } from "../../context/authContext";
import { useTweets } from "../../context/tweetContext";

import { images } from "../../constants";

export default function TweetInput() {
  const [text, setText] = useState("");
  const { authUser, userData } = useAuth();
  const { tweets } = useTweets();

  //on récup l'id du tweet dans l'URL
  const { id } = useParams();

  // On séléctionne les références dont on a besoin
  const selectedTweetRef = doc(database, "tweets", id);

  // Recherche du tweet sélectionné
  const tweet = tweets?.filter((tweet) => {
    return tweet.id === id;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(database, "replies"), {
      author_id: authUser.uid,
      created_at: serverTimestamp(),
      text,
      tweet_id: id,
    }).then(() => {
      updateDoc(selectedTweetRef, {
        public_metrics: {
          ...tweet?.[0]?.public_metrics,
          reply_count:
            parseInt(tweet?.[0]?.public_metrics?.reply_count, 10) + 1,
        },
      }).catch((err) => {
        console.log(err.message);
      });
    });

    setText("");
  };

  return (
    <TweetInputContainer>
      {/* <TweetAvatar src={auth.userData?.[0]?.profile_image_url} alt='image de profil user' />
       */}
      {userData?.[0]?.profile_image_url ? (
        <TweetAvatar
          style={{ border: "1px solid lightgrey" }}
          src={userData?.[0]?.profile_image_url}
          alt="user avatar"
        />
      ) : (
        <TweetAvatar
          style={{ border: "1px solid lightgrey" }}
          src={images.user}
          alt="user avatar"
        />
      )}
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Tweetez votre réponse"
          type="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <ButtonSubmit type="submit" disabled={text === "" ? true : false}>
          Répondre
        </ButtonSubmit>
      </Form>
    </TweetInputContainer>
  );
}
