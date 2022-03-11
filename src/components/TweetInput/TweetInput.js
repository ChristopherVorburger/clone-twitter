import { useContext, useState } from "react";
import { TweetAvatar } from "../Tweet/Tweet.Style";
import { TweetInputContainer, Form, Input, ButtonSubmit } from "./TweetInput.Style";
import { AuthContext } from "../../context/authContext";
import { addDoc, serverTimestamp, collection } from "firebase/firestore";
import { database } from "../../firebase-config";
import { useParams } from "react-router-dom";

export default function TweetInput() {
  const [text, setText] = useState("");
  const auth = useContext(AuthContext);
  //on récup l'id du tweet dans l'URL
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(database, "replies"), {
      author_id: auth.authUser.uid,
      created_at: serverTimestamp(),
      text,
      tweet_id: id,
    });
  };

  return (
    <TweetInputContainer>
      <TweetAvatar src={auth.userData?.[0]?.profile_image_url} alt='image de profil user' />
      <Form onSubmit={handleSubmit}>
        <Input placeholder='Tweetez votre réponse' type='text' onChange={(e) => setText(e.target.value)} />
        <ButtonSubmit type='submit' disabled={text === "" ? true : false}>
          Répondre
        </ButtonSubmit>
      </Form>
    </TweetInputContainer>
  );
}
