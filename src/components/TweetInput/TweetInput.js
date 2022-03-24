import { useState } from "react";
import { useParams } from "react-router-dom";

import { TweetAvatar } from "../Tweet/Tweet.Style";
import {
  TweetInputContainer,
  Form,
  Input,
  ButtonSubmit,
} from "./TweetInput.Style";

import { addDoc, serverTimestamp, collection } from "firebase/firestore";

import { database } from "../../firebase-config";

import { useAuth } from "../../context/authContext";

import { images } from "../../constants";

export default function TweetInput() {
  const [text, setText] = useState("");
  const { authUser, userData } = useAuth();
  //on récup l'id du tweet dans l'URL
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(database, "replies"), {
      author_id: authUser.uid,
      created_at: serverTimestamp(),
      text,
      tweet_id: id,
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
