import styled from "styled-components";

export const TweetModalContainer = styled.div`
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -10%);
  max-width: 595px;
  width: 90%;
  height: 275px;
  font-family: "Lato", sans-serif;
`;

export const TweetModal = styled.div`
  /* display: grid;
  grid-template-columns: max-content 1fr;
  grid-template-rows: 1fr 40px; */
  align-items: flex-start;
  gap: 12px;
  background-color: #fff;
  border-radius: 20px;
  height: 100%;
  padding: 60px 15px 15px;
`;

export const TweetModalInput = styled.textarea`
  border: 0;
  font-size: 20px;
  color: red;
  font-family: "Lato", sans-serif;
  color: #000;
  height: 100%;

  &::placeholder {
    color: #536471;
    font-size: 18px;
  }

  &:focus {
    outline: 0;
  }
`;

export const TweetModalBtn = styled.button`
  display: block;
  grid-column: 2;
  justify-self: flex-end;
  background-color: rgb(29, 155, 240);
  color: #fff;
  font-weight: bold;
  border-radius: 20px;
  border: 0;
  width: 80px;
  height: 35px;
  cursor: pointer;
`;
