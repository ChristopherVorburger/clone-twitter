import React from "react";
import {
  TweetContainer,
  TweetAvatar,
  TweetContent,
  TweetAuthor,
  TweetPseudo,
  TweetDate,
  TweetTxt,
  TweetReactions,
  Comments,
  Retweets,
  Likes,
} from "./Tweet.Style";
import Avatar from "./logo-tweet-test.jpeg";

export default function Tweet({ text }) {
  return (
    <TweetContainer>
      <TweetAvatar src={Avatar} />
      <TweetContent>
        <div>
          <TweetAuthor>Cerfia (Conflits France) </TweetAuthor>
          <TweetPseudo>@CerfiaFR</TweetPseudo>
          <TweetDate>32 min</TweetDate>
        </div>
        <TweetTxt>{text}</TweetTxt>
        {/* <TweetReactions>
          <Comments>26</Comments>
          <Retweets>23</Retweets>
          <Likes>181</Likes>
        </TweetReactions> */}
      </TweetContent>
    </TweetContainer>
  );
}
