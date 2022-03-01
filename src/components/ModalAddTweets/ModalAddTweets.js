import React from "react";
import { Overlay } from "../Login/Login.Style";
import { TweetAvatar } from "../Tweet/Tweet.Style";
import { TweetModalContainer, TweetModal, TweetModalInput, TweetModalBtn } from "./ModalAddTweets.Style";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import Avatar from "../Tweet/logo-tweet-test.jpeg";

export default function ModalAddTweets() {
  //Style cross Icon
  const useStyles = makeStyles(() => ({
    iconCross: {
      position: "absolute",
      left: "20px",
      top: "20px",
      cursor: "pointer",
    },
  }));

  const classes = useStyles();

  return (
    <Overlay>
      <TweetModalContainer>
        <CloseIcon className={classes.iconCross} onClick={() => {}} />
        <TweetModal>
          <TweetAvatar src={Avatar} />
          <TweetModalInput placeholder='Quoi de neuf ?' resize='none'></TweetModalInput>
          <TweetModalBtn>Tweeter</TweetModalBtn>
        </TweetModal>
      </TweetModalContainer>
    </Overlay>
  );
}
