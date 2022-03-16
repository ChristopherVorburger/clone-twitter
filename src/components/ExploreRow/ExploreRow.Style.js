import styled from "styled-components";

export const ExploreContainer = styled.article`
  display: flex;
  align-items: center;
  width: 100%;
  height: 110px;
  background-color: #fff;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: #f7f7f7;
  }

  a {
    text-decoration: none;
    color: #000;
  }
`;

export const ExploreTitle = styled.h4`
  font-weight: 700;
  font-size: 15px;
  padding: 15px;
  line-height: 23px;
`;
