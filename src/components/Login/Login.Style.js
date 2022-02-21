import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const LoginModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 600px;
  width: 90%;
  font-family: "Lato", sans-serif;
`;

export const LoginModal = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  padding: 20px;
  max-height: 90vh;
  border-radius: 8px;
`;

export const IconTwitter = styled.img`
  width: 30px;
`;

export const LoginTitle = styled.h2`
  font-size: 23px;
  color: #0f1419;
  margin: 20px 0 45px;
  font-weight: bold;
  text-align: ${({ center }) => center && "center"};
`;

export const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ alignItem }) => (alignItem ? alignItem : "center")};
  overflow-y: auto;
  width: 100%;
  padding: 20px 0;
`;

export const ButtonLogin = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: ${({ maxWidth }) => maxWidth};
  width: 100%;
  min-height: 35px;
  border-radius: 20px;
  border: 1px solid;
  transition: all 0.2s ease;
  cursor: pointer;
  margin: ${({ margin }) => margin};
  background-color: ${({ bg }) => (bg ? bg : "#000")};
  border-color: ${({ borderColor }) => (borderColor ? borderColor : "")};
  font-weight: ${({ bold }) => (bold ? bold : "700")};

  img {
    width: 20px;
    height: 20px;
    margin-right: 7px;
    object-fit: cover;
    object-position: center;
  }

  &:hover {
    border-color: ${({ borderColorHover }) => (borderColorHover ? borderColorHover : "")};
    background-color: ${({ bgHover }) => (bgHover ? bgHover : "")};
  }

  span {
    color: ${({ color }) => (color ? color : "#000")};
    font-weight: 700;
  }
`;

export const Line = styled.p`
  margin: 20px 0;
`;

export const LoginForm = styled.form`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
  margin-bottom: 25px;
`;

export const TxtCreateAcount = styled.p`
  font-size: 15px;
  color: #536471;
  margin: 60px 0;

  a {
    color: #1d9bf0;
    text-decoration: none;
    margin-left: 5px;

    &:hover {
      text-decoration: underline;
    }
  }
`;
