import styled from "styled-components";

export const TweetReplyContainer = styled.div`
  display: grid;
  grid-template-columns: 70px 1fr;
  column-gap: 15px;
  font-family: "Lato", sans-serif;
  padding: 15px 0;
  border-bottom: 1px solid #eff3f4;

  .container-1 {
    display: flex;
    flex-direction: column;
  }

  .container-2 {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    margin-bottom: 10px;

    .infos-reply {
      font-size: 14px;
      span {
        color: #1d9bf0;
        cursor: pointer;
      }
    }
  }
`;

export const TweetReplyContent = styled.div`
  p {
    color: #0f1419;
    line-height: 20px;
    font-size: 15px;
  }
`;
