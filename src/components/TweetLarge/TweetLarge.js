import React from "react";
import { TweetAvatar, TweetAuthor, TweetPseudo } from "../Tweet/Tweet.Style";
import { TweetLargeWrapper, TweetLargeContainer, TweetLargeContent } from "./TweetLarge.Style";

export default function TweetLarge() {
  return (
    <TweetLargeWrapper>
      <TweetLargeContainer>
        <div className='row-1'>
          <TweetAvatar
            style={{ margin: 0 }}
            src='https://images.unsplash.com/photo-1646935234495-14335f7e6629?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
          />
          <div class='author'>
            <TweetAuthor>Cerfia </TweetAuthor>
            <TweetPseudo style={{ margin: "5px 0" }}>@CerfiaFR</TweetPseudo>
          </div>
        </div>
        <div className='row-2'>
          <TweetLargeContent>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum, soluta veniam. Reiciendis voluptatum deserunt earum in totam nihil
            debitis ab tenetur, saepe quia dignissimos suscipit, vero dolorem velit iusto tempore!
          </TweetLargeContent>
        </div>
      </TweetLargeContainer>
    </TweetLargeWrapper>
  );
}
