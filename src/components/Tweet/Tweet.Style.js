import styled from "styled-components";

export const TweetContainer = styled.div`
  display: grid;
  grid-template-columns: 70px 1fr;
  max-width: 595px;
  width: 100%;
  font-size: 15px;
  background-color: #fff;
  font-family: "Lato", sans-serif;
  border: 1px solid rgb(239, 243, 244);
  padding: 15px 0;
  color: #000;
  transition: background 0.2s ease;
  cursor: pointer;
  /* &:hover {
    background: #f7f7f7;
  } */
`;

export const TweetAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  margin-left: 1rem;
`;

export const TweetContent = styled.div`
  margin-left: 1rem;
  grid-column: 2;

  div {
    display: flex;
  }
`;

export const TweetAuthor = styled.span`
  color: #000;
  font-weight: bold;
`;

export const TweetPseudo = styled.p`
  color: #536471;
  margin: 0 15px 0 6px;
`;

export const TweetDate = styled.span`
  color: #536471;
`;

export const TweetTxt = styled.p`
  margin: 10px 0 0px;
  line-height: 20px;
`;

export const TweetReactions = styled.div`
  display: flex;
  justify-content: space-around;
  color: #535471;
  font-size: 13px;
  margin: 15px 0;

  & > div {
    display: flex;
    align-items: center;

    span {
      margin-left: 5px;
    }
  }
`;

export const Comments = styled.div``;

export const Retweets = styled.div``;

export const Likes = styled.div``;

export const TweetReply = styled.div`
  display: grid;
  grid-template-columns: 75px 1fr;
  grid-column: 1/-1;
  column-gap: 20px;
  width: 100%;
  border-top: 1px solid rgb(239, 243, 244);

  .container-avatar {
    margin-top: 18px;
  }

  .content {
    padding: 20px 20px 20px 0;

    span {
      color: #1c9cef;
    }
  }

  input {
    background-color: transparent;
    border: 0;
    font-size: 17px;
    margin: 15px 0;
    width: 100%;
    &::placeholder {
      color: #536471;
    }

    &:focus {
      outline: 0;
    }
  }

  button {
    display: block;
    padding: 10px 15px;
    background-color: rgb(29, 155, 240);
    color: white;
    border-radius: 25px;
    border: 0;
    margin-left: auto;
    cursor: pointer;
  }
`;
