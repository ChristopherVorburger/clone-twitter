import { useEffect, useState } from "react";
import { ExploreWrapper, ExploreHeader, ExploreContainer } from "./Explore.Style";
import BottomNavigation from "../../components/BottomNavigation";
import { icons } from "../../constants";
import Header from "../../components/Header";
import { Box, Input, InputAdornment } from "@mui/material";
import News from "../../components/News";
import ExploreRow from "../../components/ExploreRow/ExploreRow";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import SearchIcon from "@mui/icons-material/Search";

export default function Explore() {
  const [dataExplore, setDataExplore] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const imagePath = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    function getDataExplore() {
      try {
        return axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_TMDB_KEY}`).then((res) => {
          setDataExplore(res.data.results);
          setIsLoading(true);
        });
      } catch (err) {
        console.log("page explore : ", err);
      }
    }
    getDataExplore();
  }, []);

  const iconsArray = [{ name: icons.SettingsOutlinedIcon }];

  return (
    <>
      <Box display='flex' justifyContent='center'>
        <Box display='flex' flexDirection='column' borderLeft='1px solid #eff3f4' borderRight='1px solid #eff3f4' maxWidth='590px'>
          <Box>
            <Header
              searchBar={
                <Input
                  sx={{
                    padding: "0.5rem",
                    backgroundColor: "grey.background__input",
                    borderRadius: "50px",
                    "&::before": {
                      content: "none",
                    },
                  }}
                  id='input-with-icon-adornment'
                  startAdornment={
                    <InputAdornment position='start'>
                      <SearchIcon />
                    </InputAdornment>
                  }
                  placeholder='Search Twitter'
                />
              }
              iconsRight={iconsArray}
            />
          </Box>
          <ExploreWrapper>
            {isLoading ? (
              <ExploreHeader url={imagePath + dataExplore[0].backdrop_path}>
                <h3>{dataExplore[0]?.original_title}</h3>
              </ExploreHeader>
            ) : (
              <Skeleton variant='rectangular' width={600} height={335} />
            )}

            <ExploreContainer>
              <h2>Tendances pour vous</h2>
              {isLoading ? (
                <>
                  {dataExplore.map((data, id) => (
                    <ExploreRow data={data} key={id} />
                  ))}
                </>
              ) : (
                <>
                  <Skeleton variant='text' />
                  <Skeleton variant='text' />
                  <Skeleton variant='text' />
                  <Skeleton variant='text' />
                  <Skeleton variant='text' />
                  <Skeleton variant='text' />
                </>
              )}
            </ExploreContainer>
          </ExploreWrapper>
        </Box>
        <News />
      </Box>
      <BottomNavigation />
    </>
  );
}
