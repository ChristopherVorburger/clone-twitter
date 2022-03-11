import BottomNavigation from "../../components/BottomNavigation";
import { icons } from "../../constants";
import Header from "../../components/Header";
import { Box, Divider } from "@mui/material";
import News from "../../components/News";
import { TweetPageWrapper } from "./TweetPage.Style";
import TweetLarge from "../../components/TweetLarge/TweetLarge";
import TweetInput from "../../components/TweetInput/TweetInput";
import Tweet from "../../components/Tweet/Tweet";
import { useLocation } from "react-router-dom";

export default function TweetPage() {
  const { state } = useLocation();

  return (
    <>
      <Box display='flex' justifyContent='center'>
        <Box display='flex' flexDirection='column' borderLeft='1px solid #eff3f4' borderRight='1px solid #eff3f4'>
          <Header title='Home' iconsRight={icons.AutoAwesomeSharpIcon} />
          <TweetPageWrapper>
            <TweetLarge state={state} />
            <TweetInput />
          </TweetPageWrapper>
        </Box>
        <News />
      </Box>
      <BottomNavigation />
    </>
  );
}
