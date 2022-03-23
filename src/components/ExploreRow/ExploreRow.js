import React from "react";
import { ExploreContainer, ExploreTitle } from "./ExploreRow.Style";

export default function ExploreRow({ data }) {
  return (
    <ExploreContainer>
      <ExploreTitle>{data.overview}</ExploreTitle>
    </ExploreContainer>
  );
}
