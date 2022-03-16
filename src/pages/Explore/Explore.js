import { useEffect, useState } from "react";
import { ExploreWrapper, ExploreHeader, ExploreContainer } from "./Explore.Style";
import BottomNavigation from "../../components/BottomNavigation";
import { icons } from "../../constants";
import Header from "../../components/Header";
import { Box } from "@mui/material";
import News from "../../components/News";
import ExploreRow from "../../components/ExploreRow/ExploreRow";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";

export default function Explore() {
  const [dataExplore, setDataExplore] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function getDataExplore() {
      try {
        return axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=d4b08c83bfe14672899774992fd01d3f").then((res) => {
          setDataExplore(res.data.articles);
          setIsLoading(true);
        });
      } catch (err) {
        console.log("page explore : ", err);
      }
    }
    getDataExplore();
  }, []);

  return (
    <>
      <Box display='flex' justifyContent='center'>
        <Box display='flex' flexDirection='column' borderLeft='1px solid #eff3f4' borderRight='1px solid #eff3f4'>
          <Header title='Home' iconsRight={icons.AutoAwesomeSharpIcon} />
          <ExploreWrapper>
            {isLoading ? (
              <ExploreHeader url={dataExplore[0].urlToImage}>
                <h3>{dataExplore[0].title}</h3>
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
