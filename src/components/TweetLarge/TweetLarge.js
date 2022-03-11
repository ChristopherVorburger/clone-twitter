import { TweetAvatar, TweetAuthor, TweetPseudo } from "../Tweet/Tweet.Style";
import { TweetLargeWrapper, TweetLargeContainer, TweetLargeContent } from "./TweetLarge.Style";
import Skeleton from "@mui/material/Skeleton";
import { images } from "../../constants";

export default function TweetLarge({ state, dataUser, isLoading }) {
  return (
    <TweetLargeWrapper>
      <TweetLargeContainer>
        <div className='row-1'>
          {isLoading ? (
            <Skeleton variant='circular' width={50} height={50} />
          ) : dataUser.profile_image_url === "" ? (
            <TweetAvatar style={{ border: "1px solid lightgrey", margin: 0 }} src={images.user} alt='image de profil user' />
          ) : (
            <TweetAvatar src={dataUser.profile_image_url} alt='image de profil user' />
          )}

          <div className='author'>
            {isLoading ? (
              <>
                <Skeleton variant='text' width='100px' />
                <Skeleton variant='text' width='150px' />
              </>
            ) : (
              <>
                <TweetAuthor>{dataUser.name}</TweetAuthor>
                <TweetPseudo style={{ margin: "5px 0" }}>@{dataUser.username}</TweetPseudo>
              </>
            )}
          </div>
        </div>
        <div className='row-2'>
          <TweetLargeContent>{state.state.text}</TweetLargeContent>
        </div>
      </TweetLargeContainer>
    </TweetLargeWrapper>
  );
}
