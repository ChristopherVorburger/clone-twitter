import { TweetReplyContainer, TweetReplyContent } from "./TweetReply.Style";
import { TweetAuthor, TweetAvatar, TweetPseudo } from "../Tweet/Tweet.Style";

export default function TweetReply() {
  return (
    <TweetReplyContainer>
      <TweetAvatar src='https://pbs.twimg.com/profile_images/1498385600562569227/oVTSWZkv_400x400.jpg' />
      <div className='container-1'>
        <div className='container-2'>
          <TweetAuthor>Boubou</TweetAuthor>
          <TweetPseudo>@Boybou</TweetPseudo>
          <p className='infos-reply'>
            En réponse à <span>@Mediaavenir</span>
          </p>
        </div>

        <TweetReplyContent>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem officiis velit enim, veniam architecto dolor dolore et ipsam esse
            mollitia soluta? Accusantium ipsa aperiam aliquid voluptates vitae laudantium natus facere.
          </p>
        </TweetReplyContent>
      </div>
    </TweetReplyContainer>
  );
}
