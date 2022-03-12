import React from "react";

import { useParams } from "react-router-dom";

import { Box } from "@mui/system";

import Header from "../../components/Header";
import News from "../../components/News";

import { AuthContext } from "../../context/authContext";

import { icons } from "../../constants";
import { Typography } from "@mui/material";
import List from "./List";
import { useFirestore } from "../../utils/useFirestore";

const Lists = () => {
  const { username } = useParams();

  const auth = React.useContext(AuthContext);

  const iconsArray = [
    {
      name: icons.PlaylistAddOutlinedIcon,
      path: `/${username}/lists/create`,
    },
    { name: icons.MoreHorizIcon },
  ];

  const lists = useFirestore("lists");

  console.log(
    "listes des lists",
    lists.map((list) => list.id)
  );

  const users = useFirestore("users");

  console.log("liste users", users);

  return (
    <Box display="flex">
      <Box borderLeft="1px solid #eff3f4" borderRight="1px solid #eff3f4">
        <Header
          title="Lists"
          subtitle={`@${auth?.userData?.[0]?.username}`}
          iconsRight={iconsArray}
        />
        <Box borderBottom="1px solid #eff3f4">
          <Typography
            fontSize="font.large"
            fontWeight="titleBold"
            p="12px 1rem"
          >
            Pinned Lists
          </Typography>
          <Box>
            <Typography fontSize="font.main" color="grey.main" p="2rem">
              Nothing to see here yet — pin your favorite Lists to access them
              quickly.
            </Typography>
          </Box>
        </Box>
        <Box borderBottom="1px solid #eff3f4">
          <Typography
            fontSize="font.large"
            fontWeight="titleBold"
            p="12px 1rem"
          >
            Discover new Lists
          </Typography>
          {lists?.slice(0, 3)?.map((list) => {
            const author = users?.filter(
              (user) => user?.id === list?.author_id
            );
            console.log("user qui match ", author);
            return <List list={list} author={author} />;
          })}
        </Box>
        <Box>
          <Typography
            fontSize="font.large"
            fontWeight="titleBold"
            p="12px 1rem"
          >
            Your Lists
          </Typography>
        </Box>
      </Box>
      <Box>
        <News />
      </Box>
    </Box>
  );
};

export default Lists;
