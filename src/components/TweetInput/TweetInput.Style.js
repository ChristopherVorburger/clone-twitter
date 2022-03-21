import styled from "styled-components";

export const TweetInputContainer = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #eff3f4;
  border-bottom: 1px solid #eff3f4;
  padding: 15px 0;
`;

export const Form = styled.form`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 15px;
`;

export const Input = styled.input`
  border: 0;
  outline: 0;
  background-color: transparent;
  font-size: 18px;
  width: 100%;
  &::placeholder {
    font-size: 18px;
  }
`;

export const ButtonSubmit = styled.button`
  color: white;
  font-weight: bold;
  padding: 10px 15px;
  background-color: #1d9bf0;
  border-radius: 25px;
  border: 0;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
  }
`;
