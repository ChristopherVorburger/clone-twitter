import React from "react";
import { TweetAvatar } from "../Tweet/Tweet.Style";
import { TweetInputContainer, Form, Input, ButtonSubmit } from "./TweetInput.Style";

export default function TweetInput() {
  return (
    <TweetInputContainer>
      <TweetAvatar src='https://images.unsplash.com/photo-1646935234495-14335f7e6629?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' />
      <Form>
        <Input placeholder='Tweetez votre réponse' type='text' />
        <ButtonSubmit type='submit' disabled={true}>
          Répondre
        </ButtonSubmit>
      </Form>
    </TweetInputContainer>
  );
}
