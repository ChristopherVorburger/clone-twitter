import React from "react";

import { useParams } from "react-router-dom";

import { Box } from "@mui/system";

import Header from "../../components/Header";
import News from "../../components/News";

import { AuthContext } from "../../context/authContext";

import { icons } from "../../constants";

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

  return (
    <Box display="flex">
      <Box borderLeft="1px solid #eff3f4" borderRight="1px solid #eff3f4">
        <Header
          title="Lists"
          subtitle={`@${auth?.userData?.[0]?.username}`}
          iconsRight={iconsArray}
        />
      </Box>
      <Box>
        <News />
      </Box>
    </Box>
  );
};

export default Lists;
