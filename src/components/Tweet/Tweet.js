import React from "react";
import {
  TweetContainer,
  TweetAvatar,
  TweetContent,
  TweetAuthor,
  TweetPseudo,
  TweetDate,
  TweetTxt,
  TweetReactions,
  TweetMore,
  Comments,
  Retweets,
  Likes,
} from "./Tweet.Style";
import { icons, images } from "../../constants";

// Ajout de la librarie date-fns pour faciliter la manipulation de dates
import { zonedTimeToUtc } from "date-fns-tz";
import { formatDistance } from "date-fns";
import { fr } from "date-fns/locale";

// hooks
import { useFirestore } from "../../utils/useFirestore";
import { Box } from "@mui/material";

export default function Tweet({ text, author_id, created_at }) {
  // Utilisation du hook perso useFirestore pour récupérer les users
  const users = useFirestore("users");

  //Recherche de l'id du user qui match avec l'author_id du tweet
  const matchedUser = users?.filter((user) => user?.id === author_id);

  return (
    <TweetContainer>
      {matchedUser?.[0]?.profile_image_url ? (
        <TweetAvatar src={matchedUser?.[0]?.profile_image_url} />
      ) : (
        <TweetAvatar
          style={{ border: "1px solid lightgrey" }}
          src={images.user}
        />
      )}
      <TweetContent>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <TweetAuthor>{matchedUser?.[0]?.name} </TweetAuthor>
            <TweetPseudo>{`@${matchedUser?.[0]?.username}`}</TweetPseudo>
            <TweetDate>
              {/* calcul de la date du tweet avec la librairie date-fns
            formateDistance permet de calculer l'interval entre deux dates
          On soustrait donc la date du tweet formatée à la date actuelle de cette manière */}
              {!created_at
                ? null
                : formatDistance(
                    new Date(zonedTimeToUtc(created_at?.toDate())),
                    new Date(),
                    // ajout du suffixe 'il y a' et traduction en français
                    // (date fns utilise i18n)
                    { addSuffix: true, locale: fr }
                  )}
            </TweetDate>
          </Box>
          <Box>
            <TweetMore>{icons.MoreHorizIcon.type.render()}</TweetMore>
          </Box>
        </Box>
        <TweetTxt>{text}</TweetTxt>
        {/* <TweetReactions>
          <Comments>26</Comments>
          <Retweets>23</Retweets>
          <Likes>181</Likes>
        </TweetReactions> */}
      </TweetContent>
    </TweetContainer>
  );
}
