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
  text-align: center;
`;

export const LoginContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  width: 100%;
`;

export const ButtonLogin = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 290px;
  width: 100%;
  min-height: 35px;
  border-radius: 20px;
  border: 1px solid;
  transition: all 0.2s ease;
  cursor: pointer;
  margin-bottom: ${({ mb }) => mb};
  background-color: ${({ bg }) => (bg ? bg : "#000")};
  border-color: ${({ borderColor }) => (borderColor ? borderColor : "#000")};
  font-weight: ${({ bold }) => (bold ? bold : "700")};

  img {
    width: 20px;
    height: 20px;
    margin-right: 7px;
    object-fit: cover;
    object-position: center;
  }

  &:hover {
    border-color: #d2e3fc;
    border-color: ${({ borderColor }) => (borderColor ? borderColor : "#000")};
    /* background-color: rgba(66, 133, 244, 0.04); */
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
  max-width: 290px;
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
