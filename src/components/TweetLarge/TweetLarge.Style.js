import styled from "styled-components";

export const TweetLargeWrapper = styled.div`
  font-family: "Lato", sans-serif;
  padding: 25px 15px;
`;

export const TweetLargeContainer = styled.div`
  display: grid;
  grid-template-rows: 70px max-content;

  .row-1 {
    display: flex;

    .author {
      margin-left: 15px;
    }
  }
`;

export const TweetLargeContent = styled.p`
  font-size: 23px;
  line-height: 30px;
`;
