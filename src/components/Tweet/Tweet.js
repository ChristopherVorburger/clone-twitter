import { useState, useContext } from "react";
import {
  TweetContainer,
  TweetAvatar,
  TweetContent,
  TweetAuthor,
  TweetPseudo,
  TweetDate,
  TweetTxt,
  TweetReactions,
  Comments,
  Retweets,
  Likes,
  TweetReply,
} from "./Tweet.Style";
import { images } from "../../constants";
import MessageIcon from "@mui/icons-material/Message";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";

// Ajout de la librarie date-fns pour faciliter la manipulation de dates
import { zonedTimeToUtc } from "date-fns-tz";
import { formatDistance } from "date-fns";
import { fr } from "date-fns/locale";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  // getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";

// hooks
import { useFirestore } from "../../utils/useFirestore";
import { AuthContext } from "../../context/authContext";

export default function Tweet({ text, author_id, created_at }) {
  // Utilisation du hook perso useFirestore pour récupérer les users
  const users = useFirestore("users");

  //Recherche de l'id du user qui match avec l'author_id du tweet
  const matchedUser = users?.filter((user) => user?.id === author_id);

  //Gestion des commentaires du tweet
  const [reply, setReply] = useState(false);
  const [content, setContent] = useState("");
  const database = getFirestore();
  const tweetsCollectionRef = collection(database, "tweets");
  const payload = content;

  const auth = useContext(AuthContext);

  const handleComment = async (e) => {
    e.preventDefault();

    const data = await setDoc(doc, "tweets", )
  };

  return (
    <>
      <TweetContainer>
        {matchedUser?.[0]?.profile_image_url ? (
          <TweetAvatar src={matchedUser?.[0]?.profile_image_url} />
        ) : (
          <TweetAvatar style={{ border: "1px solid lightgrey" }} src={images.user} />
        )}
        <TweetContent>
          <div>
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
          </div>
          <TweetTxt>{text}</TweetTxt>
          <TweetReactions>
            <Comments onClick={() => setReply(!reply)}>
              <MessageIcon style={{ color: "#535471", width: "15px", height: "15px" }} />
              <span>0</span>
            </Comments>
            <Retweets>
              <ReplyAllIcon style={{ color: "#535471", width: "15px", height: "15px" }} />
              <span>0</span>
            </Retweets>
            <Likes>
              <FavoriteBorderIcon style={{ color: "#535471", width: "15px", height: "15px" }} />
              <span>0</span>
            </Likes>
          </TweetReactions>
        </TweetContent>
        {}
        {reply && (
          <TweetReply>
            <div className='container-avatar'>
              {matchedUser?.[0]?.profile_image_url ? (
                <TweetAvatar src={matchedUser?.[0]?.profile_image_url} />
              ) : (
                <TweetAvatar style={{ border: "1px solid lightgrey" }} src={images.user} />
              )}
            </div>
            <div className='content'>
              <p>
                En réponse à <span>{`@${matchedUser?.[0]?.username}`}</span>
              </p>
              <form className='answer-form' onSubmit={handleComment}>
                <label htmlFor='answer'>
                  <input type='text' name='answer' id='answer' placeholder='Tweetez votre réponse.' onChange={(e) => setContent(e.target.value)} />
                </label>
                <button type='submit'>Répondre</button>
              </form>
            </div>
          </TweetReply>
        )}
      </TweetContainer>
    </>
  );
}
