import { useState, useContext, useEffect } from "react";
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
  TweetReply,
  Share,
} from "./Tweet.Style";
import { icons, images } from "../../constants";
import MessageIcon from "@mui/icons-material/Message";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";

// Ajout de la librarie date-fns pour faciliter la manipulation de dates
import { zonedTimeToUtc } from "date-fns-tz";
import { formatDistance } from "date-fns";
import { fr } from "date-fns/locale";

import { database } from "../../firebase-config";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";

// hooks
import { useFirestore } from "../../utils/useFirestore";
import { AuthContext } from "../../context/authContext";

import { Box, ClickAwayListener, Typography } from "@mui/material";
import TweetDialog from "./TweetDialog";

export default function Tweet({ tweet }) {
  const { id, text, author_id, created_at } = tweet;
  // Utilisation du hook perso useFirestore pour récupérer les users
  const users = useFirestore("users");

  //Recherche de l'id du user qui match avec l'author_id du tweet
  const matchedUser = users?.filter((user) => user?.id === author_id);

  //Gestion des commentaires du tweet
  const [reply, setReply] = useState(false);
  const [content, setContent] = useState("");
  const auth = useContext(AuthContext);
  const repliesRef = collection(database, "replies");

  const handleComment = (e) => {
    e.preventDefault();

    addDoc(repliesRef, {
      tweet_id: id,
      author_id: auth.authUser.uid,
      text: content,
      created_at: serverTimestamp(),
    })
      .then(() => {
        // on nettoie l'input si ok
        setReply(false);
        console.log("Reply created !");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //Gestion du compteur de réponse sur un tweet
  // const tweets = useFirestore("tweets");
  // const [tweetFilter, setTweetFilter] = useState([]);

  // const getLengthResponse = async () => {
  //   const dataTweets = await tweets;

  //   await dataTweets.map((tweet) => {
  //     const filterTweet = dataTweets.filter((tweet) => tweet.id === id);
  //     setTweetFilter([
  //       {
  //         ...tweetFilter,
  //         filterTweet,
  //       },
  //     ]);
  //   });
  // };

  // useEffect(() => {
  //   getLengthResponse();
  // }, [tweets]);

  // State et fonctions pour la modale
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
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
        <Box display="flex" justifyContent="space-between" alignItems="center">
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
            {/* ClickAwayListener écoute les cliques hors modale pour fermer la modale */}
            <ClickAwayListener onClickAway={handleClickAway}>
              <Box onClick={handleClick}>
                <TweetMore>{icons.MoreHorizIcon.type.render()}</TweetMore>
                {open ? (
                  <TweetDialog id={id} open={open} author_id={author_id} />
                ) : null}
              </Box>
            </ClickAwayListener>
          </Box>
        </Box>
        <TweetTxt>{text}</TweetTxt>
        <TweetReactions>
          <Comments onClick={() => setReply(!reply)}>
            <MessageIcon
              style={{ color: "#535471", width: "15px", height: "15px" }}
            />
            <span>0</span>
          </Comments>
          <Retweets>
            <ReplyAllIcon
              style={{ color: "#535471", width: "15px", height: "15px" }}
            />
            <span>0</span>
          </Retweets>
          <Likes>
            <FavoriteBorderIcon
              style={{ color: "#535471", width: "15px", height: "15px" }}
            />
            <span>0</span>
          </Likes>
          <Share>
            <IosShareOutlinedIcon
              style={{ color: "#535471", width: "15px", height: "15px" }}
            />
            <span>0</span>
          </Share>
        </TweetReactions>
        {reply && (
          <TweetReply>
            <Box className="container-avatar">
              {matchedUser?.[0]?.profile_image_url ? (
                <TweetAvatar src={auth.userData?.[0]?.profile_image_url} />
              ) : (
                <TweetAvatar
                  style={{ border: "1px solid lightgrey" }}
                  src={images.user}
                />
              )}
            </Box>
            <Box className="content">
              <Typography fontSize="font.main">
                En réponse à <span>{`@${matchedUser?.[0]?.username}`}</span>
              </Typography>
              <form className="answer-form" onSubmit={handleComment}>
                <label htmlFor="answer">
                  <input
                    type="text"
                    name="answer"
                    id="answer"
                    placeholder="Tweetez votre réponse."
                    onChange={(e) => setContent(e.target.value)}
                  />
                </label>
                <button type="submit">Répondre</button>
              </form>
            </Box>
          </TweetReply>
        )}
      </TweetContent>
    </TweetContainer>
  );
}
