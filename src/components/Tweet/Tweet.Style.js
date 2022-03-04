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
  &:hover {
    background: #f7f7f7;
  }
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
  margin: 10px 0;
  line-height: 20px;
`;

export const TweetReactions = styled.div`
  display: flex;
  justify-content: space-between;
`;

// export const Comments = styled.div`

// `

// export const Retweets = styled.div`

// `

// export const Likes = styled.div`

// `
