import React from "react";

import { IconButton } from "@mui/material";

import { icons } from "../../../constants";

const ProfileButton = () => {
  return (
    <div>
      <IconButton size="large" aria-label="menu" sx={{ mt: 2, mr: 2 }}>
        <icons.AccountCircleIcon
          sx={{ color: "grey.main", transform: "scale(1.6)" }}
        />
      </IconButton>
    </div>
  );
};

export default ProfileButton;
