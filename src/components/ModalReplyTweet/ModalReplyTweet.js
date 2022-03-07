import { useContext } from "react";
import { Overlay } from "../Login/Login.Style";
import { TweetModalContainer, TweetModal } from "../ModalAddTweets/ModalAddTweets.Style";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";
import { ModalContext } from "../../context/modalContext";
import Tweet from "../Tweet/Tweet";

export default function ModalReplyTweet() {
  //Style cross Icon
  const useStyles = makeStyles(() => ({
    iconCross: {
      position: "absolute",
      left: "20px",
      top: "20px",
      cursor: "pointer",
    },
  }));

  const classes = useStyles();

  const { setShowModal } = useContext(ModalContext);
  return (
    <Overlay>
      <TweetModalContainer>
        <CloseIcon className={classes.iconCross} onClick={() => setShowModal(false)} />
        <TweetModal>
          <Tweet />
        </TweetModal>
      </TweetModalContainer>
    </Overlay>
  );
}
