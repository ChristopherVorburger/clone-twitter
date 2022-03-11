import React from "react";
import { TweetAvatar } from "../Tweet/Tweet.Style";
import { TweetInputContainer, Form, Input, ButtonSubmit } from "./TweetInput.Style";
import Skeleton from "@mui/material/Skeleton";
import { images } from "../../constants";

export default function TweetInput({ dataUser, isLoading }) {
  return (
    <TweetInputContainer>
      {isLoading ? (
        <Skeleton variant='circular' width={50} height={50} />
      ) : dataUser.profile_image_url === "" ? (
        <TweetAvatar style={{ border: "1px solid lightgrey" }} src={images.user} alt='image de profil user' />
      ) : (
        <TweetAvatar src={dataUser.profile_image_url} alt='image de profil user' />
      )}
      <Form>
        <Input placeholder='Tweetez votre réponse' type='text' />
        <ButtonSubmit type='submit' disabled={true}>
          Répondre
        </ButtonSubmit>
      </Form>
    </TweetInputContainer>
  );
}
