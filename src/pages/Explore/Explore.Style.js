import styled from "styled-components";

export const ExploreWrapper = styled.main`
  font-family: "Lato", sans-serif;
  max-width: 600px;
`;

export const ExploreHeader = styled.header`
  position: relative;
  display: flex;
  align-items: flex-end;
  height: 335px;
  width: 100%;
  background: url(${({ url }) => url}) center / cover;
  padding: 30px;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    left: 0;
    box-shadow: 0 0px 32px 48px rgb(0 0 0 / 90%);
  }

  h3 {
    z-index: 9999;
    font-size: 23px;
    font-weight: bold;
    color: white;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const ExploreContainer = styled.div`
  max-width: 100%;
  h2 {
    font-weight: bold;
    padding: 20px;
    font-size: 20px;
  }
`;
