import React from "react";

import { Box } from "@mui/system";

import Header from "../../components/Header";

import { AuthContext } from "../../context/authContext";
import News from "../../components/News";
import { icons } from "../../constants";

const Lists = () => {
  const auth = React.useContext(AuthContext);

  return (
    <Box display="flex">
      <Box borderLeft="1px solid #eff3f4" borderRight="1px solid #eff3f4">
        <Header
          title="Lists"
          subtitle={`@${auth?.userData?.[0]?.username}`}
          iconsRight={[icons.PlaylistAddOutlinedIcon, icons.MoreHorizIcon]}
        />
      </Box>
      <Box>
        <News />
      </Box>
    </Box>
  );
};

export default Lists;
