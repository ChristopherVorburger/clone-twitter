import React from "react";
import { ExploreContainer, ExploreTitle } from "./ExploreRow.Style";

export default function ExploreRow({ data }) {
  return (
    <ExploreContainer>
      <a href={`${data.link}`} target='blank'>
        <ExploreTitle>{data.title}</ExploreTitle>
      </a>
    </ExploreContainer>
  );
}
