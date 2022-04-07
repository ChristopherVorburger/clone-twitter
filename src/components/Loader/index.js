import React from "react";

import { Backdrop, CircularProgress } from "@mui/material";

import { useGlobal } from "../../context/globalContext";

const Loader = () => {
  const { loading } = useGlobal();

  return (
    <div>
      <Backdrop
        sx={{
          "&.MuiBackdrop-root": {
            backgroundColor: "white!important",
          },
          color: (theme) => theme.palette.primary.main,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Loader;
