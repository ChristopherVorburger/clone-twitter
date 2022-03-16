import { useState, useContext } from "react";

import {
  TweetLink,
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

// import images et icones
import { icons, images } from "../../constants";

import MessageIcon from "@mui/icons-material/Message";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import IosShareOutlinedIcon from "@mui/icons-material/IosShareOutlined";

// Composant MUI
import { Box, ClickAwayListener, Typography } from "@mui/material";

// Ajout de la librarie date-fns pour faciliter la manipulation de dates
import { zonedTimeToUtc } from "date-fns-tz";
import { formatDistance } from "date-fns";
import { fr } from "date-fns/locale";

// fonctions firebase
import { database } from "../../firebase-config";
import {
  serverTimestamp,
  addDoc,
  collection,
  updateDoc,
  doc,
  arrayRemove,
} from "firebase/firestore";

// hooks
import { useFirestore } from "../../utils/useFirestore";
import { AuthContext } from "../../context/authContext";

// Composants React
import TweetDialog from "./TweetDialog";
import ShareDialog from "./ShareDialog";
import { Link } from "react-router-dom";

// Fonction pour afficher un tweet
export default function Tweet({ tweet }) {
  // Récupération du contexte
  const auth = useContext(AuthContext);

  // Destructuration des données du tweet
  const { id, text, author_id, created_at } = tweet;

  // Utilisation du hook perso useFirestore pour récupérer les users
  const users = useFirestore("users");

  //Recherche de l'id du user qui match avec l'author_id du tweet
  const matchedUser = users?.filter((user) => user?.id === author_id);

  //
  //Gestion des réponses du tweet
  const [openReply, setOpenReply] = useState(false);
  const [textReply, setTextReply] = useState("");

  // On séléctionne les collection dont on a besoin
  const repliesCollection = collection(database, "replies");

  // On séléctionne les références dont on a besoin
  const selectedTweetRef = doc(database, "tweets", id);

  // Fonction pour répondre à un tweet et mettre a jour le nombre de réponses du tweet en question
  const handleReply = (e) => {
    e.preventDefault();

    addDoc(repliesCollection, {
      tweet_id: id,
      author_id: auth.authUser.uid,
      text: textReply,
      created_at: serverTimestamp(),
    })
      // Si il n'y a pas d'erreur lors de la création du tweet on passe à l'étape suivante
      .then(() => {
        setOpenReply(false);
        console.log("Reply created !");
        // On met à jour le nombre de réponses ici
        updateDoc(selectedTweetRef, {
          public_metrics: {
            ...tweet?.public_metrics,
            reply_count: parseInt(tweet?.public_metrics?.reply_count, 10) + 1,
          },
        })
          .then(() => {
            console.log("Update reply_count done !");
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  //

  // Fonctions pour liker un tweet
  const likeTweet = () => {
    // Si le tableau de likers du tweet contient déjà l'id du user connecté
    if (tweet?.likers?.includes(auth.userData?.[0]?.id)) {
      // Suppression du user et -1 pour le like_counter
      updateDoc(selectedTweetRef, {
        likers: arrayRemove(auth.userData?.[0]?.id),
        public_metrics: {
          ...tweet?.public_metrics,
          like_count: parseInt(tweet?.public_metrics?.like_count, 10) - 1,
        },
      })
        .then(() => {
          console.log("Update like_count -1 done !");
        })
        .catch((err) => {
          console.log(err.message);
        });
      // Sinon
    } else if (!tweet?.likers) {
      // Si le tweet n'a pas de likers, ajout d'un premier liker et + 1 au compteur
      updateDoc(selectedTweetRef, {
        likers: [auth.userData?.[0]?.id],
        public_metrics: {
          ...tweet?.public_metrics,
          like_count: parseInt(tweet?.public_metrics?.like_count, 10) + 1,
        },
      })
        .then(() => {
          console.log("Update like_count +1 done !");
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      // Sinon ajout du user et +1 pour le like_counter
      updateDoc(selectedTweetRef, {
        likers: [...tweet?.likers, auth.userData?.[0]?.id],
        public_metrics: {
          ...tweet?.public_metrics,
          like_count: parseInt(tweet?.public_metrics?.like_count, 10) + 1,
        },
      })
        .then(() => {
          console.log("Update like_count +1 done !");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  // State et fonctions pour la modale du bouton more
  const [openMore, setOpenMore] = useState(false);

  const handleClickMore = () => {
    setOpenMore((prev) => !prev);
  };

  const handleClickAwayMore = () => {
    setOpenMore(false);
  };

  // State et fonctions pour la modale du bouton share
  const [openShare, setOpenShare] = useState(false);

  const handleClickShare = () => {
    setOpenShare((prev) => !prev);
  };

  const handleClickAwayShare = () => {
    setOpenShare(false);
  };

  return (
    <TweetContainer>
      {matchedUser?.[0]?.profile_image_url ? (
        <Link to={`/${matchedUser?.[0]?.username}`}>
          <TweetAvatar src={matchedUser?.[0]?.profile_image_url} />
        </Link>
      ) : (
        <Link to={`/${matchedUser?.[0]?.username}`}>
          <TweetAvatar
            style={{ border: "1px solid lightgrey" }}
            src={images.user}
          />
        </Link>
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
            <ClickAwayListener onClickAway={handleClickAwayMore}>
              <Box onClick={handleClickMore}>
                <TweetMore>{icons.MoreHorizIcon.type.render()}</TweetMore>
                {openMore ? (
                  <TweetDialog id={id} open={openMore} author_id={author_id} />
                ) : null}
              </Box>
            </ClickAwayListener>
          </Box>
        </Box>
        <TweetTxt>{text}</TweetTxt>
        <TweetReactions>
          <Comments onClick={() => setOpenReply(!openReply)}>
            <MessageIcon
              style={{ color: "#535471", width: "20px", height: "20px" }}
            />
            <TweetLink to={`/status/${tweet?.id}`} state={{ state: tweet }}>
              <span>{tweet?.public_metrics?.reply_count}</span>
            </TweetLink>
          </Comments>
          <Retweets>
            <ReplyAllIcon
              style={{ color: "#535471", width: "20px", height: "20px" }}
            />
            <span>0</span>
          </Retweets>
          {/* Si l'utilisateur connecté like le tweet, le coeur est rouge */}
          {tweet?.likers?.includes(auth.userData?.[0]?.id) ? (
            <Likes onClick={likeTweet}>
              <icons.FavoriteIcon
                style={{ color: "#e11616de", width: "20px", height: "20px" }}
              />
              <span>{tweet?.public_metrics?.like_count}</span>
            </Likes>
          ) : (
            <Likes onClick={likeTweet}>
              <FavoriteBorderIcon
                style={{ color: "#535471", width: "20px", height: "20px" }}
              />
              <span>{tweet?.public_metrics?.like_count}</span>
            </Likes>
          )}
          <Share>
            {/* ClickAwayListener écoute les cliques hors modale pour fermer la modale */}
            <ClickAwayListener onClickAway={handleClickAwayShare}>
              <Box onClick={handleClickShare}>
                <IosShareOutlinedIcon
                  style={{ color: "#535471", width: "20px", height: "20px" }}
                />
                {openShare ? <ShareDialog id={id} open={openShare} /> : null}
              </Box>
            </ClickAwayListener>
          </Share>
        </TweetReactions>
      </TweetContent>
    </TweetContainer>
  );
}
